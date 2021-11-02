import { useState, useRef, useEffect, useCallback, useMemo, useImperativeHandle, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import './Tooltip.scss';
import useTooltipStyles from './hooks/useTooltip';


//TODO Borrar
// const ESTADO_POR_DEFECTO = false

/**
 * Tooltip
 * 
 * Use case
 * ```
 * <Tooltip content="Tooltip content">...</Tooltip>
 * ```
 * @typedef {object} TooltipProps
 * @property {string|JSX.Element} content - Content of the tooltip
 * @property {"bottom"= | "top"= | "left"= | "right"=} position - tooltip position with respect to children
 * @property {number=} offset - tooltip offset
 * @property {React.ElementRef=} boundary - tooltip limits
 * 
 * @typedef {Object} RefType
 * @property {Object} current
 * @property {() => void} current.open
 * @property {() => void} current.close
 * @property {() => void} current.toggle
 * 
 * @param {TooltipProps} tooltipProps
 * @param {RefType} ref
/**

 * @returns {JSX.Element} JSX.Element
 */
function Tooltip(tooltipProps, ref) {
  const {
    content,
    position = 'bottom',
    offset = 0,
    children
  } = tooltipProps;

  const [show, setShow] = useState(true);
  const [closing, setClosing] = useState(false)
  const [tooltipStyles, setTooltipStyles] = useState({});
  const [arrowStyles, setArrowStyles] = useState({});
  const [trigger, setTrigger] = useState();
  const [tooltip, setTooltip] = useState();

  const { getBottomStyles, getTopStyles, getRightStyles, getLeftStyles } = useTooltipStyles()

  const triggerRef = useRef()

  /**
   * Tooltip reference which sets the tooltip dimensions on init
   */
  const tooltipRef = useCallback((domNode) => {
    if (domNode) {
      setTooltip(domNode.getBoundingClientRect());
    }
  }, []);


  /**
   * Listens the resize event in order to change the trigger element dimensions
   */
  useEffect(() => {
    const onTriggerChange = () => {
      setTrigger(triggerRef.current.getBoundingClientRect())
    }
    onTriggerChange()

    window.addEventListener("resize", onTriggerChange)
    return () => window.removeEventListener("resize", onTriggerChange)
  }, [])

  const positions = useMemo(() => ({
    'bottom': getBottomStyles,
    'top': getTopStyles,
    'left': getLeftStyles,
    'right': getRightStyles
  }), [getBottomStyles, getTopStyles, getLeftStyles, getRightStyles]);

  useEffect(() => {
    if (tooltip && trigger) {
      const { arrowStyles, tooltipStyles } = positions[position]({tooltip, trigger, offset})
      setArrowStyles(arrowStyles)
      setTooltipStyles(tooltipStyles)
    }
  }, [position, trigger, tooltip, positions, offset]);

  /**
   * Handles on open event
   */
  const handleOpen = () => {
    setShow(true)
    setClosing(false)
  }

    /**
   * Handles on close event
   */
  const handleClose = () => {
    setClosing(true)
    setTimeout(() => {
      setShow(false)
    }, 140);
  }

  /**
   * Exposes the API in component reference
   */
  useImperativeHandle(ref, () => ({
    open: () => {
      handleOpen()
    },
    close: () => {
      handleClose()
    },
    toggle: () => {
      show ? handleClose() : handleOpen()
    }
  }));

  return (
      <div
        className="tooltip"
        role="tooltip"
        onMouseEnter={handleOpen}
        // onMouseLeave={handleClose}
        onFocus={handleOpen}
        onBlur={handleClose}
        ref={triggerRef}
      >
        {children}
        {show && createPortal(
        <div className={`tooltip-wrapper ${closing ? "cerrando" : ""} tooltip-${position}`}>
          <div className={`tooltip-content`} style={tooltipStyles} ref={tooltipRef}>
            {content}
          </div>
          <span className={`arrow arrow--${position}`} style={arrowStyles} />
        </div>, document.body)}
      </div>
  );
}

export default forwardRef(Tooltip);


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
