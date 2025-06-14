
(async function () {
  const script = document.currentScript;
  const projectId = script?.getAttribute("data-project-id");
  const container = document.getElementById("review-widget");
  const src = script?.getAttribute("src");
  const backend_url = src?.replace("/embed/embed.js", "");

  const width = script?.getAttribute("data-widget-width") || "100%";

  const borderRadius = script?.getAttribute("data-border-radius") || "10px" ;
  const borderColor = script?.getAttribute("data-border-color") || "black";
  const borderThickness = script?.getAttribute("data-border-thickness") || "1px";

  const hideDate = script?.getAttribute("data-hide-date") === "true";

  const shadowSize = script?.getAttribute("data-shadow-size") || "0px";
  const shadowColor = script?.getAttribute("data-shadow-color") || "#333333";
  const shadowBlur = script?.getAttribute("data-shadow-blur") || "0px";

  console.log("Script loaded with projectId:", projectId);
  console.log("Container found:", !!container);

  if (!projectId || !container) return;

  try {
    const res = await fetch(
      `${backend_url}/api/review/use/${projectId}`
    );
    const reviews = await res.json();

    console.log("Fetched reviews:", reviews);

    function formattedDate(r) {
      console.log("Raw createdAt:", r.createdAt);
      const dateStr = r.createdAt;
      const date = new Date(dateStr);
      const day = date.getDate();
      const month = date.toLocaleString("en-GB", { month: "long" });
      const year = date.getFullYear();

      return `${day} ${month}, ${year}`;
    }

    const style = document.createElement("style");
    style.innerHTML = `
      .review-head { text-align: center; }
      .reviews { display: flex; width: ${width}; align-items: start; justify-content: center; gap: 15px; }
      .review-box { background: #dedede; border-style: solid; border-radius: ${borderRadius}; border-color: ${borderColor}; border-width: ${borderThickness}; padding: 1em; margin: 1em 0; width: 20vw; height: content-fit; box-shadow: ${shadowSize} ${shadowSize} ${shadowBlur} ${shadowColor};}
      .review-name { font-weight: bold; margin-bottom: 0.2em; }
      .review-message { margin: 0.5em 0; }
      .review-stars { color: #facc15; }
      .review-date { font-size: 12px; color: gray; margin-top: 4px; }
    `;
    document.head.appendChild(style);

    container.innerHTML = '<div class="review-head"><h1>Reviews</h1></div>';
    const rel = document.createElement("div");
    rel.className = "reviews";
    container.appendChild(rel);

    reviews.forEach((r) => {
      const el = document.createElement("div");
      el.className = "review-box";
      el.innerHTML = `
        <div class="review-name">${r.name}</div>
        <div class="review-stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
        <div class="review-message">${r.message}</div>
        ${!hideDate ? `<div class="review-date">${formattedDate(r)}</div>` : ""}
      `;
      rel.appendChild(el);
    });
  } catch (err) {
    console.error("Failed to fetch or render reviews:", err);
  }
})();
