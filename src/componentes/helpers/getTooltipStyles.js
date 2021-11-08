const ARROW_HYPOTENUSE = 11.3137;

/**
 * Get the bottom tooltip styles
 */
export const getBottomStyles = ({ trigger, tooltip, offset, limits }) => {
  const topArrow = trigger.bottom + offset + document.documentElement.scrollTop;
  const leftArrow = trigger.left + trigger.width / 2;
  const leftTooltip = leftArrow - tooltip.width / 2;
  let translateX = 0;
  if (leftTooltip < limits.left) {
    translateX = Math.abs(leftTooltip - limits.left);
  } else if (leftTooltip + tooltip.width > limits.right) {
    translateX = limits.right - leftTooltip - tooltip.width;
  }

  const arrowStyles = {
    top: `${topArrow}px`,
    left: `${leftArrow}px`,
  };
  const tooltipStyles = {
    top: `${Math.floor(topArrow + ARROW_HYPOTENUSE / 2)}px`,
    left: `${leftTooltip}px`,
    transform: `translateX(${translateX}px)`,
    maxWidth: `${limits.right - limits.left}px`,
    width: `${tooltip.width}px`
  };

  return { arrowStyles, tooltipStyles };
};

/**
 * Get the top tooltip styles
 */
export const getTopStyles = ({ trigger, tooltip, offset, limits }) => {
  const topArrow = trigger.top - offset - ARROW_HYPOTENUSE + document.documentElement.scrollTop;
  const leftArrow = trigger.left + trigger.width / 2;
  const leftTooltip = leftArrow - tooltip.width / 2;
  let translateX = 0;
  if (leftTooltip < limits.left) {
    translateX = Math.abs(leftTooltip - limits.left);
  } else if (leftTooltip + tooltip.width > limits.right) {
    translateX = limits.right - leftTooltip - tooltip.width;
  }
  const arrowStyles = {
    top: `${topArrow}px`,
    left: `${leftArrow}px`,
  };
  const tooltipStyles = {
    top: `${Math.ceil(topArrow - tooltip.height + ARROW_HYPOTENUSE / 2)}px`,
    left: `${leftTooltip}px`,
    transform: `translateX(${translateX}px)`,
    maxWidth: `${limits.right - limits.left}px`,
    width: `${tooltip.width}px`
  };

  return { arrowStyles, tooltipStyles };
};

/**
 * Get the right tooltip styles
 */
export const getRightStyles = ({ trigger, tooltip, offset }) => {
  const topArrow = trigger.top + trigger.height / 2 - ARROW_HYPOTENUSE / 2 + document.documentElement.scrollTop;
  const leftArrow = trigger.right + offset + ARROW_HYPOTENUSE / 2;
  const arrowStyles = {
    top: `${topArrow}px`,
    left: `${leftArrow}px`,
  };
  const tooltipStyles = {
    top: `${topArrow - tooltip.height / 2 + ARROW_HYPOTENUSE / 2}px`,
    left: `${leftArrow}px`,
    width: `${tooltip.width}px`
  };
  return { arrowStyles, tooltipStyles };
};

/**
 * Get the left tooltip styles
 */
export const getLeftStyles = ({ trigger, tooltip, offset }) => {
  const topArrow = trigger.top + trigger.height / 2 - ARROW_HYPOTENUSE / 2 + document.documentElement.scrollTop;
  const leftArrow = trigger.left - offset - ARROW_HYPOTENUSE / 2;
  const arrowStyles = {
    top: `${topArrow}px`,
    left: `${leftArrow}px`,
  };
  const tooltipStyles = {
    top: `${topArrow - tooltip.height / 2 + ARROW_HYPOTENUSE / 2}px`,
    left: `${leftArrow - tooltip.width}px`,
    width: `${tooltip.width}px`
  };
  return { arrowStyles, tooltipStyles };
};
