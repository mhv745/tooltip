import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Tooltip.scss';

/**
 * Arrow side size in px
 */
const ARROW_SIDE = 8;

/**
 * Distance between Element and Tooltip. (Half of the hipotenuse of the arrow)
 */
const ARROW_HYPOTENUSE = 11.31;
const MIN_DISTANCE_BOUNDARY = 10

//TODO Borrar
const ESTADO_POR_DEFECTO = false

/**
 * Tooltip
 * 
 * Use case
 * ```
 * <Tooltip content="Tooltip content">...</Tooltip>
 * ```
 * 
 * @param {string|JSX.Element} content - Content of the tooltip
 * @param {"bottom"= | "top"= | "left"= | "right"=} position - tooltip position with respect to children
 * @param {number=} offset - tooltip offset
 * @param {React.ElementRef=} boundary - tooltip limits
 * @returns JSX.Element
 */
function Tooltip({ content, position = 'bottom', offset = 0, children }) {
  const [show, setShow] = useState(ESTADO_POR_DEFECTO);
  const [closing, setClosing] = useState(false)
  const [tooltipStyles, setTooltipStyles] = useState({});
  const [arrowStyles, setArrowStyles] = useState({});

  const [trigger, setTrigger] = useState();
  const [tooltip, setTooltip] = useState();

  const elementRef = useRef()
  const tooltipRef = useCallback((domNode) => {
    if (domNode) {
      setTooltip(domNode.getBoundingClientRect());
    }
  }, []);

  useEffect(() => {
    const onElementChange = () => {
      if(elementRef.current){
        setTrigger(elementRef.current.getBoundingClientRect())
      }
    }
    onElementChange()
    window.addEventListener("resize", onElementChange)
    return () => window.addEventListener("resize", onElementChange)
  }, [elementRef])

  useEffect(() => {
    updatePosition();
  }, [position, trigger, tooltip]);

  /**
   * Update the position of the tooltip
   */
  const updatePosition = () => {
    if (tooltip && trigger) {
      if (position === 'bottom') {
        updateTooltipBotton()
      } else if (position === 'top') {
        updateTooltipTop()
      } else if (position === 'left') {
        updateTooltipLeft()
      } else if (position === 'right') {
        updateTooltipRight()
      }
    }
  };

  /**
   * Updates the position of the tooltip when its position is bottom
   */
  const updateTooltipBotton = () => {
    const topArrow = trigger.bottom + offset + ARROW_SIDE / 4;
    const leftArrow = trigger.left + trigger.width / 2 - ARROW_HYPOTENUSE / 2;
    const leftTooltip = leftArrow - tooltip.width / 2;
    const isInBoundaryLeft = leftTooltip <= MIN_DISTANCE_BOUNDARY
    const isInBoundaryRight = leftArrow + tooltip.width / 2 > window.innerWidth - MIN_DISTANCE_BOUNDARY
    const isInBoundaryBoth = tooltip.width + MIN_DISTANCE_BOUNDARY* 2 >= window.innerWidth
    const translateX = isInBoundaryBoth || isInBoundaryLeft ? MIN_DISTANCE_BOUNDARY : isInBoundaryRight ? -MIN_DISTANCE_BOUNDARY : 0
    const arrow = {
      top: `${topArrow}px`,
      left: `${leftArrow}px`,
    }
    setArrowStyles(arrow);
    setTooltipStyles({
      top: `${topArrow + ARROW_HYPOTENUSE / 2 - ARROW_SIDE / 4}px`,
      left: `${isInBoundaryLeft ? 0 : leftTooltip}px`,
      transform: `translateX(${translateX}px)`,
      //width: `${isInBoundaryBoth ? window.innerWidth - MIN_DISTANCE_BOUNDARY * 2 : tooltip.width}px`,  
    });
  }

  /**
   * Updates the position of the tooltip when its position is top
   */
  const updateTooltipTop = () => {
    const topArrow = trigger.top - offset - ARROW_SIDE - ARROW_SIDE / 4;
    const leftArrow = trigger.left + trigger.width / 2 - ARROW_HYPOTENUSE / 2;
    setArrowStyles({
      transform: 'rotate(225deg)',
      top: `${topArrow}px`,
      left: `${leftArrow}px`,
    });
    let leftTooltip = leftArrow - tooltip.width / 2;
    const boundaryRight = window.innerWidth - MIN_DISTANCE_BOUNDARY;
    const isInBoundary = tooltip.right >= boundaryRight;
    setTooltipStyles({
      top: `${trigger.top - offset - tooltip.height - ARROW_HYPOTENUSE / 2}px`,
      left: `${isInBoundary ? window.innerWidth - tooltip.width :  leftTooltip}px`,
      transform: `translateX(${isInBoundary ? -MIN_DISTANCE_BOUNDARY : 0}px)`
    });
  }

  /**
   * Updates the position of the tooltip when its position is left
   */
  const updateTooltipLeft = () => {
    const topArrow = trigger.top + trigger.height / 2 - ARROW_SIDE / 2;
    const leftArrow = trigger.left - offset - ARROW_HYPOTENUSE + ARROW_SIDE / 4;
    setArrowStyles({
      transform: 'rotate(135deg)',
      top: `${topArrow}px`,
      left: `${leftArrow}px`,
    });
    setTooltipStyles({
      top: `${topArrow - tooltip.height / 2 + ARROW_SIDE / 2}px`,
      left: `${leftArrow - tooltip.width + ARROW_SIDE / 2}px`,
    });
  }

  /**
   * Updates the position of the tooltip when its position is right
   */
  const updateTooltipRight = () => {
    const topArrow = trigger.top + trigger.height / 2 - ARROW_SIDE / 2;
    const leftArrow = trigger.right + offset + ARROW_SIDE / 4;
    setArrowStyles({
      transform: 'rotate(315deg)',
      top: `${topArrow}px`,
      left: `${leftArrow}px`,
    });
    setTooltipStyles({
      top: `${topArrow - tooltip.height / 2 + ARROW_SIDE / 2}px`,
      left: `${leftArrow + ARROW_HYPOTENUSE / 2 - ARROW_SIDE / 4}px`,
    });
  }

  const mouseEnter = () => {
    setShow(true)
    setClosing(false)
  }

  const mouseLeave = () => {
    setClosing(true)
    setTimeout(() => {
      setShow(ESTADO_POR_DEFECTO)
    }, 140);
  }

  return (
    <div className="tooltip">
      <div
        className="tooltip-element"
        role="tooltip"
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onFocus={mouseEnter}
        onBlur={mouseLeave}
        ref={elementRef}
      >
        {children}
      </div>
      {show && (
        <div className={`tooltip-wrapper ${closing ? "cerrando" : ""}`}>
          <div className={`tooltip-content tooltip-${position}`} style={tooltipStyles} ref={tooltipRef}>
            {content}
          </div>
          <span className="arrow" style={arrowStyles} />
        </div>
      )}
    </div>
  );
}

export default Tooltip;


// const useTooltipHook = () => {

//   const getArrowStyles

// }

// const App = () => (
//   <div className="">
//     <>

//       {hola.map((h) => (
//         <Tooltip content="esto es un tooltip" position="top" arrowOffset={ARROW_HEIGHT}>
//           <p>I</p>
//         </Tooltip>
//       ))}
//     </>
//   </div>
// );
