require("dotenv").config();

(async function () {
  const script = document.currentScript;
  const projectId = script?.getAttribute("data-project-id");
  const container = document.getElementById("review-widget");
  const backend_url = process.env.BACKEND_URL;

  console.log("Script loaded with projectId:", projectId);
  console.log("Container found:", !!container);

  if (!projectId || !container) return;

  try {
    const res = await fetch(
      `${backend_url}/api/review/use/${projectId}`
    );
    const reviews = await res.json();

    console.log("Fetched reviews:", reviews);

    const style = document.createElement("style");
    style.innerHTML = `
      .review-head { text-align: center; }
      .reviews { display: flex; width: full; align-items: center; justify-content: center; gap: 15px; }
      .review-box { background: #f9fafb; border-radius: 10px; padding: 1em; margin: 1em 0; border: 1px solid #ddd; width: 20vw; height: 130px;}
      .review-name { font-weight: bold; margin-bottom: 0.2em; }
      .review-message { margin: 0.5em 0; }
      .review-stars { color: #facc15; }
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
        <div class="review-stars">${"★".repeat(r.rating)}${"☆".repeat(
        5 - r.rating
      )}</div>
        <div class="review-message">${r.message}</div>
      `;
      rel.appendChild(el);
    });
  } catch (err) {
    console.error("Failed to fetch or render reviews:", err);
  }
})();
