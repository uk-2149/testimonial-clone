(async function () {
  const script = document.currentScript;
  const projectId = script?.getAttribute("data-project-id");
  const container = document.getElementById("review-widget");
  const src = script?.getAttribute("src");
  const backend_url = src?.replace("/embed/embed.js", "");

  const width = script?.getAttribute("data-widget-width") || "100%";
  const layoutType = script?.getAttribute("data-layout") || "fixed";

  const borderRadius = script?.getAttribute("data-border-radius") || "10px";
  const borderColor = script?.getAttribute("data-border-color") || "lightgray";
  const borderThickness = script?.getAttribute("data-border-thickness") || "1px";

  const hideDate = script?.getAttribute("data-hide-date") === "true";

  const shadowSize = script?.getAttribute("data-shadow-size") || "0px";
  const shadowColor = script?.getAttribute("data-shadow-color") || "#333333";
  const shadowBlur = script?.getAttribute("data-shadow-blur") || "0px";

  if (!projectId || !container) return;

  // Initial loading state
  container.innerHTML = `<div class="review-head"><h1>Loading...</h1></div>`;

  try {
    const res = await fetch(`${backend_url}/api/review/use/${projectId}`);
    if (!res.ok) throw new Error("Failed to fetch reviews");
    const reviews = await res.json();

    function formattedDate(r) {
      const date = new Date(r.createdAt);
      const day = date.getDate();
      const month = date.toLocaleString("en-GB", { month: "long" });
      const year = date.getFullYear();
      return `${day} ${month}, ${year}`;
    }

    // Cache style element
    let style = document.querySelector("#review-widget-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "review-widget-style";
      style.innerHTML = `
        .review-head {
          text-align: center;
          margin-bottom: 1.5rem;
          font-family: 'IBM Plex Mono', monospace;
        }

        .review-head h1 {
          font-size: clamp(1.5rem, 5vw, 1.75rem);
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .reviews.fixed {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(0.5rem, 2vw, 1rem);
          justify-items: center;
          font-family: 'IBM Plex Mono', monospace;
        }

        @media (min-width: 640px) {
          .reviews.fixed {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 1024px) {
          .reviews.fixed {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        .reviews.carousel {
          position: relative;
          display: flex;
          padding: 1rem;
          gap: clamp(0.5rem, 2vw, 1rem);
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 0.5rem;
          font-family: 'IBM Plex Mono', monospace;
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 transparent;
        }

        .reviews.carousel::-webkit-scrollbar {
          height: 6px;
        }

        .reviews.carousel::-webkit-scrollbar-thumb {
          background-color: #3b82f6;
          border-radius: 3px;
        }

        .reviews.carousel > .review-box {
          scroll-snap-align: start;
          flex: 0 0 min(90vw, 350px);
        }

        .review-box {
          background: white;
          border-style: solid;
          border-radius: ${borderRadius};
          border-color: ${borderColor};
          border-width: ${borderThickness};
          padding: clamp(0.75rem, 2vw, 1rem);
          height: fit-content;
          width: 100%;
          min-width: 150px;
          max-width: ${width === "100%" ? "400px" : width};
          box-shadow: ${shadowSize} ${shadowSize} ${shadowBlur} ${shadowColor};
          font-family: 'IBM Plex Mono', monospace;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .review-box:hover {
          transform: translateY(-2px);
          box-shadow: ${parseFloat(shadowSize) * 1.5 || 0}px ${parseFloat(shadowSize) * 1.5 || 0}px ${shadowBlur} ${shadowColor};
        }

        .review-avatar {
          width: clamp(2rem, 5vw, 2.5rem);
          height: clamp(2rem, 5vw, 2.5rem);
          background-color: #3b82f6;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-right: 0.75rem;
          flex-shrink: 0;
        }

        .review-avatar::before {
          content: attr(data-initial);
          color: white;
          font-size: clamp(0.9rem, 3vw, 1.1rem);
          font-weight: 700;
          font-family: 'IBM Plex Mono', monospace;
        }

        .review-name {
          font-weight: 700;
          font-size: clamp(0.9rem, 2.5vw, 1rem);
          margin-bottom: 0.25rem;
          color: #1e293b;
        }

        .review-message {
          font-size: clamp(0.85rem, 2.5vw, 0.95rem);
          margin: 0.5rem 0;
          color: #374151;
          line-height: 1.5;
        }

        .review-stars {
          color: #facc15;
          font-size: clamp(1rem, 3vw, 1.25rem);
          margin-bottom: 0.25rem;
        }

        .review-date {
          font-size: clamp(0.75rem, 2vw, 0.85rem);
          color: #6b7280;
          margin-top: 0.5rem;
        }

        .error-message {
          text-align: center;
          color: #ef4444;
          font-size: clamp(0.9rem, 2vw, 1rem);
          padding: 1rem;
        }
      `;
      document.head.appendChild(style);
    }

    const fontLink = document.createElement("link");
    fontLink.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    container.innerHTML = `<div class="review-head"><h1>Reviews</h1></div>`;
    const reviewContainer = document.createElement("div");
    reviewContainer.className = `reviews ${layoutType}`;
    container.appendChild(reviewContainer);

    reviews.forEach((r) => {
      const el = document.createElement("div");
      el.className = "review-box";
      el.setAttribute("tabindex", "0");
      el.setAttribute("aria-label", `Review by ${r.name} with ${r.rating} stars`);
      el.innerHTML = `
        <div class="review-name"><div class="review-avatar" data-initial="${r.name[0]}"></div>${r.name}</div>
        <div class="review-stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
        <div class="review-message">${r.message}</div>
        ${!hideDate ? `<div class="review-date">${formattedDate(r)}</div>` : ""}
      `;
      reviewContainer.appendChild(el);
    });
  } catch (err) {
    console.error("Failed to fetch or render reviews:", err);
    container.innerHTML = `<div class="review-head"><div class="error-message">Failed to load reviews. Please try again later.</div></div>`;
  }
})();