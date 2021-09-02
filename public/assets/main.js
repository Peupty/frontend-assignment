(mobileBreakpoint => {
  "use srict";
  let visibleParagraphs;
  // toggles .hidden css class on elements with index >= hideFrom
  const hideElements = (elements, hideFrom) =>
    elements.forEach((element, index) => {
      index >= hideFrom
        ? element.classList.add("hidden")
        : element.classList.remove("hidden");
    });
  const paragraphs = Array.from(document.getElementsByClassName("paragraph"));
  const loadMoreButton = document.querySelector("#load-more");
  const hideLoadMoreButton = () => hideElements([loadMoreButton], 0);

  const handleClick = () => {
    if (visibleParagraphs + 1 <= paragraphs.length) {
      visibleParagraphs++;
      hideElements(paragraphs, visibleParagraphs);
    }
  };
  const isMobile = () => window.innerWidth < mobileBreakpoint;

  const handleResize = () => {
    if (isMobile()) {
      loadMoreButton.classList.remove("hidden");
      loadMoreButton.addEventListener("click", handleClick);
      hideElements(paragraphs, visibleParagraphs);
    } else {
      visibleParagraphs = paragraphs.length;
      hideElements(paragraphs, visibleParagraphs);
      hideLoadMoreButton();
    }
  };

  const listenerList = [
    { type: "click", callback: handleClick, element: loadMoreButton },
    { type: "resize", callback: handleResize, element: window },
  ];

  const addListeners = listeners =>
    listeners.forEach(({ type, callback, element }) =>
      element.addEventListener(type, callback)
    );

  const removeListeners = listeners =>
    listeners.forEach(({ type, callback, element }) =>
      element.removeEventListener(type, callback)
    );

  const init = () => {
    visibleParagraphs = isMobile() ? 1 : paragraphs.length;

    addListeners(listenerList);
    handleResize();
  };

  init();

  window.addEventListener("resize", handleResize);
  window.onbeforeunload = () => removeListeners(listenerList);
})(1064);
