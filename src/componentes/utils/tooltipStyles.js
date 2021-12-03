/**
 * Height of the arrow
 */
const ARROW_HYPOTENUSE = 11.3137;

/**
 * @typedef {object} TooltipStyleProps
 * @property {number} offset
 * @property {object} limits
 * @property {object} tooltip
 * @property {object} trigger
 */

/**
 * @typedef {object} TooltipArrowStyle
 * @property {string} left Left position style in pixels
 * @property {string} top Top position style in pixels
 */

/**
 * @typedef {object} TooltipContentStyle
 * @property {string} left Left position style in pixels
 * @property {string} top Top position style in pixels
 * @property {string} width Width style in pixels
 * @property {string=} maxWidth Max width style in pixels
 * @property {string=} transform Transform style in X axis
 */

/**
 * @typedef {object} TooltipStyleResult
 * @property {TooltipArrowStyle} TooltipArrowStyle
 * @property {TooltipContentStyle} TooltipContentStyle
 */
/**
 * Get the bottom tooltip styles
 *
 * @param {TooltipStyleProps} tooltipStyleProps
 * @returns {TooltipStyleResult}
 */
export const getBottomStyles = ({ trigger, tooltip, offset, limits }) => {
  const topArrow = trigger.bottom + offset;
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
    width: `${tooltip.width}px`,
  };

  return { arrowStyles, tooltipStyles };
};

/**
 * Get the top tooltip styles
 *
 * @param {TooltipStyleProps} tooltipStyleProps
 * @returns {TooltipStyleResult}
 */
export const getTopStyles = ({ trigger, tooltip, offset, limits }) => {
  const topArrow = trigger.top - offset - ARROW_HYPOTENUSE;
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
    width: `${tooltip.width}px`,
  };

  return { arrowStyles, tooltipStyles };
};

/**
 * Get the right tooltip styles
 *
 * @param {TooltipStyleProps} tooltipStyleProps
 * @returns {TooltipStyleResult}
 */
export const getRightStyles = ({ trigger, tooltip, offset }) => {
  const topArrow = trigger.top + trigger.height / 2 - ARROW_HYPOTENUSE / 2;
  const leftArrow = trigger.right + offset + ARROW_HYPOTENUSE / 2;
  const arrowStyles = {
    top: `${topArrow}px`,
    left: `${leftArrow}px`,
  };
  const tooltipStyles = {
    top: `${topArrow - tooltip.height / 2 + ARROW_HYPOTENUSE / 2}px`,
    left: `${leftArrow}px`,
    width: `${tooltip.width}px`,
  };
  return { arrowStyles, tooltipStyles };
};

/**
 * Get the left tooltip styles
 *
 * @param {TooltipStyleProps} tooltipStyleProps
 * @returns {TooltipStyleResult}
 */
export const getLeftStyles = ({ trigger, tooltip, offset }) => {
  const topArrow = trigger.top + trigger.height / 2 - ARROW_HYPOTENUSE / 2;
  const leftArrow = trigger.left - offset - ARROW_HYPOTENUSE / 2;
  const arrowStyles = {
    top: `${topArrow}px`,
    left: `${leftArrow}px`,
  };
  const tooltipStyles = {
    top: `${topArrow - tooltip.height / 2 + ARROW_HYPOTENUSE / 2}px`,
    left: `${leftArrow - tooltip.width}px`,
    width: `${tooltip.width}px`,
  };
  return { arrowStyles, tooltipStyles };
};

/**
 * @typedef {object} TriggerPositions
 * @property {string} top Top position
 * @property {string} left Left position
 * @property {string} bottom Bottom position
 * @property {string} right Right position
 */

/**
 * Get the trigger top, left, bottom, and right positions by its reference, client rectangle, and if it is child or not.
 *
 * @param {object} triggerRef Trigger reference
 * @param {object} triggerRect Trigger bounding client rectangle
 * @param {boolean} asChild If it is child component
 * @returns {TriggerPositions}
 */
export const getTriggerPositions = ({ triggerRef, triggerRect, asChild }) => {
  const bottom = !asChild
    ? triggerRect.bottom + document.documentElement.scrollTop
    : triggerRef.current.offsetTop + triggerRect.height;
  const top = !asChild
    ? triggerRect.top + document.documentElement.scrollTop
    : triggerRef.current.offsetTop;
  const left = !asChild ? triggerRect.left : triggerRef.current.offsetLeft;
  const right = !asChild
    ? triggerRect.right
    : triggerRef.current.offsetLeft + triggerRect.width;

  return {
    top,
    left,
    bottom,
    right,
  };
};
