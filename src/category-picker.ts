document.addEventListener("DOMContentLoaded", async () => {
  const triggers = document.querySelectorAll("[pxm-category-picker='trigger']");
  const contentEl = document.querySelector<HTMLElement>(
    "[pxm-category-picker='content']"
  );
  const titleEl = document.querySelector("[pxm-category-picker='title']");
  const itemsEl = document.querySelector<HTMLElement>(
    "[pxm-category-picker='items']"
  );
  const itemEl = document.querySelector<HTMLAnchorElement>(
    "[pxm-category-picker='item']"
  );
  const loaderEl = document.querySelector<HTMLElement>(
    "[pxm-category-picker='loader']"
  );

  for (const trigger of triggers) {
    if (!itemsEl || !titleEl || !contentEl || !itemEl || !loaderEl) return;

    loaderEl.style.display = "flex";
    itemsEl.style.display = "none";

    trigger.addEventListener("mouseenter", async () => {
      contentEl.style.display = "block";

      const handle = trigger.getAttribute("pxm-collection-handle");

      if (!handle) return;

      loaderEl.style.display = "flex";
      itemsEl.style.display = "none";

      itemsEl.innerHTML = "";

      titleEl.textContent = trigger.textContent;

      const relatedCollections = [];

      const res = await fetch(`/collections/${handle}`);
      const dataHtml = await res.text();
      const parser = new DOMParser();
      const dataDoc = parser.parseFromString(dataHtml, "text/html");

      const relatedCollectionsEls = dataDoc.querySelectorAll(
        "[pxm-data='related-collection-item']"
      );

      for (const relatedCollectionEl of relatedCollectionsEls) {
        const titleEl = relatedCollectionEl.querySelector("[pxm-item='title']");
        const urlEl = relatedCollectionEl.querySelector("[pxm-item='url']");

        relatedCollections.push({
          title: titleEl?.textContent,
          url: urlEl?.textContent,
        });

        const item = itemEl.cloneNode(true) as HTMLAnchorElement;

        if (!item || !titleEl || !urlEl) continue;

        item.textContent = titleEl.textContent;
        item.setAttribute("href", urlEl.textContent || "");

        itemsEl.appendChild(item);
      }

      loaderEl.style.display = "none";
      itemsEl.style.display = "grid";
      itemsEl.classList.remove("hidden");
    });
  }
});
