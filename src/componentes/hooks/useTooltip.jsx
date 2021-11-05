import { useCallback } from "react";

/**
 * Distance between Element and Tooltip. (Half of the hipotenuse of the arrow)
 */
const ARROW_HYPOTENUSE = 11.3137;

/**
 * Custom hook in order to get the arrow and tooltip styles related to the given trigger position
 */
const useTooltipStyles = () => {
  /**
   * Get the bottom tooltip styles
   */
  const getBottomStyles = useCallback(
    ({ trigger, tooltip, offset, boundary }) => {
      const topArrow = trigger.bottom + offset;
      const leftArrow = trigger.left + trigger.width / 2;
      const leftTooltip = leftArrow - tooltip.width / 2;
      console.log(trigger.bottom, topArrow)
      let translateX = 0;
      if (leftTooltip < boundary.left) {
        translateX = Math.abs(leftTooltip) + boundary.left;
      } else if (leftTooltip + tooltip.width > boundary.right) {
        translateX = boundary.right - leftTooltip - tooltip.width;
      }

      const arrowStyles = {
        top: `${topArrow}px`,
        left: `${leftArrow}px`,
      };
      const tooltipStyles = {
        top: `${Math.floor(topArrow + ARROW_HYPOTENUSE / 2)}px`,
        left: `${leftTooltip}px`,
        transform: `translateX(${translateX}px)`,
        maxWidth: `${boundary.right - boundary.left}px`,
        width: `${tooltip.width}px`
      };

      return { arrowStyles, tooltipStyles };
    },
    []
  );

  /**
   * Get the top tooltip styles
   */
  const getTopStyles = useCallback(({ trigger, tooltip, offset, boundary }) => {
    const topArrow = trigger.top - offset - ARROW_HYPOTENUSE;
    const leftArrow = trigger.left + trigger.width / 2;
    const leftTooltip = leftArrow - tooltip.width / 2;
    let translateX = 0;
    if (leftTooltip < boundary.left) {
      translateX = Math.abs(leftTooltip) + boundary.left;
    } else if (leftTooltip + tooltip.width > boundary.right) {
      translateX = boundary.right - leftTooltip - tooltip.width;
    }
    const arrowStyles = {
      top: `${topArrow}px`,
      left: `${leftArrow}px`,
    };
    const tooltipStyles = {
      top: `${Math.ceil(topArrow - tooltip.height + ARROW_HYPOTENUSE / 2)}px`,
      left: `${leftTooltip}px`,
      transform: `translateX(${translateX}px)`,
      maxWidth: `${boundary.right - boundary.left}px`,
      width: `${tooltip.width}px`
    };

    return { arrowStyles, tooltipStyles };
  }, []);

  /**
   * Get the right tooltip styles
   */
  const getRightStyles = useCallback(({ trigger, tooltip, offset }) => {
    const topArrow = trigger.top + trigger.height / 2 - ARROW_HYPOTENUSE / 2;
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
  }, []);

  /**
   * Get the left tooltip styles
   */
  const getLeftStyles = useCallback(({ trigger, tooltip, offset }) => {
    const topArrow = trigger.top + trigger.height / 2 - ARROW_HYPOTENUSE / 2;
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
  }, []);

  return { getLeftStyles, getRightStyles, getTopStyles, getBottomStyles };
};

export default useTooltipStyles;
