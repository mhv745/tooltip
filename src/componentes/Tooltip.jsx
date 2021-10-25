import React, { useState, useRef, useEffect, useCallback } from 'react';
import "./Tooltip.scss"
/**
 * NO onClose = metodo a llamar cuando se cierra el tooltip
 * content = el contenido del tooltip
 * position = "bottom", "top", "right", "left"
 * offsetArrow = Separación entre la flechita y el children
 *
 */

/**
 * Distance between Element and Tooltip. (Half of the hipotenuse of the arrow)
 */
const ARROW_SIDE = 7.78;
const ARROW_HYPOTENUSE = 11;

function Tooltip({
  content, position = 'bottom', offsetArrow = 0, children,
}) {
  const [show, setShow] = useState(true);
  const [tooltipStyles, setTooltipStyles] = useState({})
  const [arrowStyles, setArrowStyles] = useState({})
  
  const [elementDimensions, setElementDimensions] = useState()
  const [tooltipDimensions, setTooltipDimensions] = useState()

  const tooltipRef = useCallback(domNode => {
    if (domNode) {
        setTooltipDimensions(domNode.getBoundingClientRect());
    }
  }, []);
  const elementRef = useCallback(domNode => {
    if (domNode) {
        setElementDimensions(domNode.getBoundingClientRect());
    }
  }, []);

  useEffect(() => {
      if( tooltipDimensions && elementDimensions){
        if(position === "bottom"){
          const topArrow = elementDimensions.bottom + offsetArrow + ARROW_SIDE / 4;
          const leftArrow = elementDimensions.left + elementDimensions.width / 2 - ARROW_HYPOTENUSE / 2;
          setArrowStyles({
            top: `${ topArrow}px`,
            left: `${leftArrow}px`
          });
          setTooltipStyles({
            top: `${topArrow + ARROW_HYPOTENUSE / 2 - ARROW_SIDE / 4}px`,
            left: `${leftArrow - tooltipDimensions.width / 2}px`,
          })
        }else if(position === "top"){
          const topArrow = elementDimensions.top - offsetArrow - ARROW_SIDE - ARROW_SIDE / 4;
          const leftArrow = elementDimensions.left + elementDimensions.width / 2 - ARROW_HYPOTENUSE / 2;
          setArrowStyles({
            transform: "rotate(225deg)",
            top: `${ topArrow }px`,
            left: `${ leftArrow }px`
          })
          setTooltipStyles({
            top: `${0}px`,
            left: `${0}px`,
          })
        }else if(position === "left"){
          setArrowStyles({
            transform: "rotate(135deg)",
            top: `${elementDimensions.top + elementDimensions.height / 2 - ARROW_SIDE / 2}px`,
            left: `${elementDimensions.left - offsetArrow - ARROW_HYPOTENUSE + ARROW_SIDE / 4}px`
          })
          setTooltipStyles({
            top: `${0}px`,
            left: `${0}px`,
          })

        }else if(position === "right"){
          setArrowStyles({
            transform: "rotate(315deg)",
            top: `${elementDimensions.top + elementDimensions.height / 2 - ARROW_SIDE / 2}px`,
            left:`${elementDimensions.right + offsetArrow + ARROW_SIDE / 4}px`,
          })
          setTooltipStyles({
            top: `${0}px`,
            left: `${0}px`,
          })

        }
      }
      
  }, [position, tooltipDimensions, elementDimensions])


  return (
    <div className="tooltip">
      <div
        className="tooltip-element"
        role="tooltip"
        onMouseEnter={() => {
            setShow(true)
        }}
        onMouseLeave={() => {
            setShow(true)
        }}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(true)}
        ref={elementRef}
      >
        {children}
      </div>
      {show && (
          <>
            <div
              className={`tooltip-wrapper tooltip-${position}`}
              style={tooltipStyles}
              ref={tooltipRef}
            >
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
