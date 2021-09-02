(mobileBreakpoint => {
  "use srict";
  let visibleParagraphs;
  const addClass = (el, cssClass) => el.classList.add(cssClass);
  const removeClass = (el, cssClass) => el.classList.remove(cssClass);
  const hideElements = (elements, hideFrom = 0) => {
    if (Array.isArray(elements)) {
      elements.forEach((el, index) => {
        index >= hideFrom ? addClass(el, "hidden") : removeClass(el, "hidden");
      });
    } else {
      addClass(elements, "hidden");
    }
  };
  const paragraphs = Array.from(document.getElementsByClassName("paragraph"));
  const loadMoreButton = document.querySelector("#load-more");
  const hideLoadMoreButton = () => hideElements(loadMoreButton);

  const handleClick = () => {
    if (visibleParagraphs + 1 <= paragraphs.length) {
      visibleParagraphs++;
      hideElements(paragraphs, visibleParagraphs);
    }
  };
  const isMobile = () => window.innerWidth < mobileBreakpoint;

  const handleResize = () => {
    if (isMobile()) {
      removeClass(loadMoreButton, 'hidden')
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
