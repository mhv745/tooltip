import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Tooltip.scss';
/**
 * NO onClose = metodo a llamar cuando se cierra el tooltip
 * content = el contenido del tooltip
 * position = "bottom", "top", "right", "left"
 * offsetArrow = Separación entre la flechita y el children
 * boundary
 */

/**
 * Distance between Element and Tooltip. (Half of the hipotenuse of the arrow)
 */
const ARROW_SIDE = 8;
const ARROW_HYPOTENUSE = 11.31;

const MIN_DISTANCE_BOUNDARY = 10

function Tooltip({ content, position = 'bottom', offsetArrow = 0, children }) {
  const [show, setShow] = useState(true);
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


  const onElementChange = () => {
    if(elementRef.current){
      setElementDimensions(elementRef.current.getBoundingClientRect())
    }
  }

  useEffect(() => {
    setElementDimensions(elementRef.current.getBoundingClientRect())
    window.addEventListener("resize", onElementChange)
    return () => window.addEventListener("resize", onElementChange)
  }, [elementRef])

  useEffect(() => {
    calcularPosiciones();
  }, [position, elementDimensions, tooltipDimensions]);

  const calcularPosiciones = () => {
    if (tooltipDimensions && elementDimensions) {
      if (position === 'bottom') {
        const topArrow = elementDimensions.bottom + offsetArrow + ARROW_SIDE / 4;
        const leftArrow = elementDimensions.left + elementDimensions.width / 2 - ARROW_HYPOTENUSE / 2;
        setArrowStyles({
          top: `${topArrow}px`,
          left: `${leftArrow}px`,
        });
        let leftTooltip = leftArrow - tooltipDimensions.width / 2;
        leftTooltip = leftTooltip <= MIN_DISTANCE_BOUNDARY ? MIN_DISTANCE_BOUNDARY : leftTooltip
        setTooltipStyles({
          top: `${topArrow + ARROW_HYPOTENUSE / 2 - ARROW_SIDE / 4}px`,
          left: `${leftTooltip}px`,
        });
      } else if (position === 'top') {
        const topArrow = elementDimensions.top - offsetArrow - ARROW_SIDE - ARROW_SIDE / 4;
        const leftArrow = elementDimensions.left + elementDimensions.width / 2 - ARROW_HYPOTENUSE / 2;
        setArrowStyles({
          transform: 'rotate(225deg)',
          top: `${topArrow}px`,
          left: `${leftArrow}px`,
        });
        let leftTooltip = leftArrow - tooltipDimensions.width / 2;
        const boundaryRight = window.innerWidth - MIN_DISTANCE_BOUNDARY;
        const isInBoundary = tooltipDimensions.right > boundaryRight;
        leftTooltip = isInBoundary ? boundaryRight - tooltipDimensions.width + MIN_DISTANCE_BOUNDARY : leftTooltip
        setTooltipStyles({
          top: `${elementDimensions.top - offsetArrow - tooltipDimensions.height - ARROW_HYPOTENUSE / 2}px`,
          left: `${leftTooltip}px`,
          marginRight: isInBoundary ? `${MIN_DISTANCE_BOUNDARY}px` : 0
        });
      } else if (position === 'left') {
        const topArrow = elementDimensions.top + elementDimensions.height / 2 - ARROW_SIDE / 2;
        const leftArrow = elementDimensions.left - offsetArrow - ARROW_HYPOTENUSE + ARROW_SIDE / 4;
        setArrowStyles({
          transform: 'rotate(135deg)',
          top: `${topArrow}px`,
          left: `${leftArrow}px`,
        });
        setTooltipStyles({
          top: `${topArrow - tooltipDimensions.height / 2 + ARROW_SIDE / 2}px`,
          left: `${leftArrow - tooltipDimensions.width + ARROW_SIDE / 2}px`,
        });
      } else if (position === 'right') {
        const topArrow = elementDimensions.top + elementDimensions.height / 2 - ARROW_SIDE / 2;
        const leftArrow = elementDimensions.right + offsetArrow + ARROW_SIDE / 4;
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
    }
  };

  return (
    <div className="tooltip">
      <div
        className="tooltip-element"
        role="tooltip"
        onMouseEnter={() => {
          setShow(true);
        }}
        onMouseLeave={() => {
          setShow(true);
        }}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        ref={elementRef}
      >
        {children}
      </div>
      {show && (
        <>
          <div className={`tooltip-wrapper tooltip-${position}`} style={tooltipStyles} ref={tooltipRef}>
            {content}
          </div>
          <span className="arrow" style={arrowStyles} />
        </>
      )}
    </div>
  );
}

export default Tooltip;

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
