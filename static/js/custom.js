// Custom JS for Fluxio
// - Infinite scroll-style loading on /news list pages

(function () {
  function initNewsInfiniteScroll() {
    var list = document.getElementById("news-list");
    if (!list) return;

    var items = Array.prototype.slice.call(
      list.querySelectorAll(".news-list-item")
    );
    if (!items.length) return;

    var pageSize = parseInt(list.getAttribute("data-page-size") || "5", 10);
    var current = 0;

    function hideAll() {
      items.forEach(function (el) {
        el.classList.add("news-list-item--hidden");
      });
    }

    function showNext() {
      var next = Math.min(current + pageSize, items.length);
      for (var i = current; i < next; i++) {
        items[i].classList.remove("news-list-item--hidden");
      }
      current = next;
    }

    hideAll();
    showNext();

    var loading = false;

    function onScroll() {
      if (loading) return;
      if (current >= items.length) {
        window.removeEventListener("scroll", onScroll);
        return;
      }

      var scrollPos = window.innerHeight + window.scrollY;
      var threshold = document.body.offsetHeight - 200;

      if (scrollPos >= threshold) {
        loading = true;
        // Small delay to keep scrolling smooth
        setTimeout(function () {
          showNext();
          loading = false;
        }, 100);
      }
    }

    window.addEventListener("scroll", onScroll);
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    initNewsInfiniteScroll();
  } else {
    document.addEventListener("DOMContentLoaded", initNewsInfiniteScroll);
  }
})();

