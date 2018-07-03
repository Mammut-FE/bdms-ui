export const scrollAnimation = (el, orientation: 'up' | 'down', targetScroll) => {
  const timeinterval = setInterval(() => {
    if (orientation === 'down') {
      el.scrollTop += 10;
      if (el.scrollTop >= targetScroll) {
        el.scrollTop = targetScroll;
        clearInterval(timeinterval);
      }
    } else {
      el.scrollTop -= 10;
      if (el.scrollTop <= targetScroll) {
        el.scrollTop = targetScroll;
        clearInterval(timeinterval);
      }
    }
  }, 10);
};
