import { useCallback } from "react";

/**
 * Arrow side size in px
 */
const ARROW_SIDE = 8;

/**
 * Distance between Element and Tooltip. (Half of the hipotenuse of the arrow)
 */
const ARROW_HYPOTENUSE = 11.31;
const MIN_DISTANCE_BOUNDARY = 10

/**
 * 
 */
const useTooltipStyles = () => {

    const getBottomStyles = useCallback(({ trigger, tooltip, offset }) => {
        const topArrow = trigger.bottom + offset + ARROW_SIDE / 4;
        const leftArrow = trigger.left + trigger.width / 2 - ARROW_HYPOTENUSE / 2;
        const leftTooltip = leftArrow - tooltip.width / 2;
        const isInBoundaryLeft = leftTooltip <= MIN_DISTANCE_BOUNDARY
        const isInBoundaryRight = leftArrow + tooltip.width / 2 > window.innerWidth - MIN_DISTANCE_BOUNDARY
        const isInBoundaryBoth = tooltip.width + MIN_DISTANCE_BOUNDARY* 2 >= window.innerWidth
        const translateX = isInBoundaryBoth || isInBoundaryLeft ? MIN_DISTANCE_BOUNDARY : isInBoundaryRight ? -MIN_DISTANCE_BOUNDARY : 0
        const arrowStyles = {
            top: `${topArrow}px`,
            left: `${leftArrow}px`,
        }
        const tooltipStyles = {
            top: `${topArrow + ARROW_HYPOTENUSE / 2 - ARROW_SIDE / 4}px`,
            left: `${isInBoundaryLeft ? 0 : leftTooltip}px`,
            transform: `translateX(${translateX}px)`,
            //width: `${isInBoundaryBoth ? window.innerWidth - MIN_DISTANCE_BOUNDARY * 2 : tooltip.width}px`,  
        }
        return { arrowStyles, tooltipStyles}
    }, [])


      /**
   * Updates the position of the tooltip when its position is top
   */
  const getTopStyles = useCallback(({ trigger, tooltip, offset }) => {
        const topArrow = trigger.top - offset - ARROW_SIDE - ARROW_SIDE / 4;
        const leftArrow = trigger.left + trigger.width / 2 - ARROW_HYPOTENUSE / 2;
        const arrowStyles = {
            transform: 'rotate(225deg)',
            top: `${topArrow}px`,
            left: `${leftArrow}px`,
        }
        let leftTooltip = leftArrow - tooltip.width / 2;
        const boundaryRight = window.innerWidth - MIN_DISTANCE_BOUNDARY;
        const isInBoundary = tooltip.right >= boundaryRight;
        const tooltipStyles = {
            top: `${trigger.top - offset - tooltip.height - ARROW_HYPOTENUSE / 2}px`,
            left: `${isInBoundary ? window.innerWidth - tooltip.width :  leftTooltip}px`,
            transform: `translateX(${isInBoundary ? -MIN_DISTANCE_BOUNDARY : 0}px)`
        }

        return { arrowStyles, tooltipStyles}
    }, [])

    /**
   * Updates the position of the tooltip when its position is right
   */
     const getRightStyles = useCallback(({ trigger, tooltip, offset }) => {
        const topArrow = trigger.top + trigger.height / 2 - ARROW_SIDE / 2;
        const leftArrow = trigger.right + offset + ARROW_SIDE / 4;
        const arrowStyles = {
            transform: 'rotate(315deg)',
            top: `${topArrow}px`,
            left: `${leftArrow}px`,
          }
        const tooltipStyles = {
            top: `${topArrow - tooltip.height / 2 + ARROW_SIDE / 2}px`,
            left: `${leftArrow + ARROW_HYPOTENUSE / 2 - ARROW_SIDE / 4}px`,
          }
        return { arrowStyles, tooltipStyles}
    }, [])

   /**
   * Updates the position of the tooltip when its position is left
   */
  const getLeftStyles = useCallback(({ trigger, tooltip, offset }) => {
        const topArrow = trigger.top + trigger.height / 2 - ARROW_SIDE / 2;
        const leftArrow = trigger.left - offset - ARROW_HYPOTENUSE + ARROW_SIDE / 4;
        const arrowStyles = {
            transform: 'rotate(135deg)',
            top: `${topArrow}px`,
            left: `${leftArrow}px`,
        }
        const tooltipStyles = {
            top: `${topArrow - tooltip.height / 2 + ARROW_SIDE / 2}px`,
            left: `${leftArrow - tooltip.width + ARROW_SIDE / 2}px`,
        }
        return { arrowStyles, tooltipStyles}
    }, [])


    return { getLeftStyles, getRightStyles, getTopStyles, getBottomStyles };
}
    

export default useTooltipStyles;