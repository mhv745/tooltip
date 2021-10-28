import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Tooltip.scss';
/**
 * NO onClose = metodo a llamar cuando se cierra el tooltip
 * content = el contenido del tooltip
 * position = "bottom", "top", "right", "left"
 * offset = Separación entre la flechita y el children
 * boundary
 */

/**
 * Distance between Element and Tooltip. (Half of the hipotenuse of the arrow)
 */
const ARROW_SIDE = 8;
const ARROW_HYPOTENUSE = 11.31;
const MIN_DISTANCE_BOUNDARY = 10

//TODO Borrar
const ESTADO_POR_DEFECTO = true


function Tooltip({ content, position = 'bottom', offset = 0, children }) {
  const [show, setShow] = useState(ESTADO_POR_DEFECTO);
  const [closing, setClosing] = useState(false)
  const [tooltipStyles, setTooltipStyles] = useState({});
  const [arrowStyles, setArrowStyles] = useState({});

  const [elementDimensions, setElementDimensions] = useState();
  const [tooltipDimensions, setTooltipDimensions] = useState();

  const elementRef = useRef()
  const tooltipRef = useCallback((domNode) => {
    if (domNode) {
      setTooltipDimensions(domNode.getBoundingClientRect());
    }
  }, []);



  useEffect(() => {
    const onElementChange = () => {
      if(elementRef.current){
        setElementDimensions(elementRef.current.getBoundingClientRect())
      }
    }
    onElementChange()
    window.addEventListener("resize", onElementChange)
    return () => window.addEventListener("resize", onElementChange)
  }, [elementRef])

  useEffect(() => {
    calcularPosiciones();
  }, [position, elementDimensions, tooltipDimensions]);

  const calcularPosiciones = () => {
    if (tooltipDimensions && elementDimensions) {
      if (position === 'bottom') {
        updateTooltipButton()
      } else if (position === 'top') {
        updateTooltipTop()
      } else if (position === 'left') {
        updateTooltipLeft()
      } else if (position === 'right') {
        updateTooltipRight()
      }
    }
  };

  const updateTooltipButton = () => {
    const topArrow = elementDimensions.bottom + offset + ARROW_SIDE / 4;
    const leftArrow = elementDimensions.left + elementDimensions.width / 2 - ARROW_HYPOTENUSE / 2;
    const leftTooltip = leftArrow - tooltipDimensions.width / 2;
    const isInBoundaryLeft = leftTooltip <= MIN_DISTANCE_BOUNDARY
    const isInBoundaryRight = leftArrow + tooltipDimensions.width / 2 > window.innerWidth - MIN_DISTANCE_BOUNDARY
    const isInBoundaryBoth = tooltipDimensions.width + MIN_DISTANCE_BOUNDARY* 2 >= window.innerWidth
    const translateX = isInBoundaryBoth || isInBoundaryLeft ? MIN_DISTANCE_BOUNDARY : isInBoundaryRight ? -MIN_DISTANCE_BOUNDARY : 0
    console.log(tooltipDimensions.width, isInBoundaryBoth)
    const arrow = {
      top: `${topArrow}px`,
      left: `${leftArrow}px`,
    }
    const tooltip = {
      top: `${topArrow + ARROW_HYPOTENUSE / 2 - ARROW_SIDE / 4}px`,
      left: `${isInBoundaryLeft ? 0 : leftTooltip}px`,
      transform: `translateX(${translateX}px)`,
      //width: `${isInBoundaryBoth ? window.innerWidth - MIN_DISTANCE_BOUNDARY * 2 : tooltipDimensions.width}px`,  
    }
    setArrowStyles(arrow);
    setTooltipStyles(tooltip);
  }

  const updateTooltipTop = () => {
    const topArrow = elementDimensions.top - offset - ARROW_SIDE - ARROW_SIDE / 4;
    const leftArrow = elementDimensions.left + elementDimensions.width / 2 - ARROW_HYPOTENUSE / 2;
    setArrowStyles({
      transform: 'rotate(225deg)',
      top: `${topArrow}px`,
      left: `${leftArrow}px`,
    });
    let leftTooltip = leftArrow - tooltipDimensions.width / 2;
    const boundaryRight = window.innerWidth - MIN_DISTANCE_BOUNDARY;
    const isInBoundary = tooltipDimensions.right >= boundaryRight;
    setTooltipStyles({
      top: `${elementDimensions.top - offset - tooltipDimensions.height - ARROW_HYPOTENUSE / 2}px`,
      left: `${isInBoundary ? window.innerWidth - tooltipDimensions.width :  leftTooltip}px`,
      transform: `translateX(${isInBoundary ? -MIN_DISTANCE_BOUNDARY : 0}px)`
    });
  }

  const updateTooltipLeft = () => {
    const topArrow = elementDimensions.top + elementDimensions.height / 2 - ARROW_SIDE / 2;
    const leftArrow = elementDimensions.left - offset - ARROW_HYPOTENUSE + ARROW_SIDE / 4;
    setArrowStyles({
      transform: 'rotate(135deg)',
      top: `${topArrow}px`,
      left: `${leftArrow}px`,
    });
    setTooltipStyles({
      top: `${topArrow - tooltipDimensions.height / 2 + ARROW_SIDE / 2}px`,
      left: `${leftArrow - tooltipDimensions.width + ARROW_SIDE / 2}px`,
    });
  }

  const updateTooltipRight = () => {
    const topArrow = elementDimensions.top + elementDimensions.height / 2 - ARROW_SIDE / 2;
    const leftArrow = elementDimensions.right + offset + ARROW_SIDE / 4;
    setArrowStyles({
      transform: 'rotate(315deg)',
      top: `${topArrow}px`,
      left: `${leftArrow}px`,
    });
    setTooltipStyles({
      top: `${topArrow - tooltipDimensions.height / 2 + ARROW_SIDE / 2}px`,
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
