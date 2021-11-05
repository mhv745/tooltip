import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useImperativeHandle,
  forwardRef,
  cloneElement,
} from "react";
import { createPortal } from "react-dom";
import "./Tooltip.scss";
import useTooltipStyles from "./hooks/useTooltip";

/**
 * Minimum distance to boundary
 */
const MIN_DISTANCE_BOUNDARY = 10;

//TODO Borrar
const ESTADO_POR_DEFECTO = true;

/**
 * Tooltip
 * 
 * Use case
 * ```
 * <Tooltip content="Tooltip content">...</Tooltip>
 * ```
 * @typedef {object} TooltipProps
 * @property {string=} id - tooltip id
 * @property {string|JSX.Element} content - Content of the tooltip
 * @property {"bottom"|"top"|"left"|"right"=} position - tooltip position with respect to children. Default value: `bottom`
 * @property {number=} offset - tooltip offset
 * @property {React.ElementRef=} boundary - tooltip limits
 * @property {number|string=} key
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
    position = "bottom",
    offset = 0,
    boundaryRef,
    id,
    children,
    key,
  } = tooltipProps;

  const [show, setShow] = useState(ESTADO_POR_DEFECTO);
  const [closing, setClosing] = useState(false);
  const [boundary, setBoundary] = useState({
    left: MIN_DISTANCE_BOUNDARY,
    right: window.innerWidth - MIN_DISTANCE_BOUNDARY,
  });
  const [tooltipStyles, setTooltipStyles] = useState({});
  const [arrowStyles, setArrowStyles] = useState({});

  const [tooltip, setTooltip] = useState();

  const { getBottomStyles, getTopStyles, getRightStyles, getLeftStyles } =
    useTooltipStyles();

  const triggerRef = useRef();

  /**
   * Tooltip reference which sets the tooltip dimensions on init
   */
  const tooltipRef = useCallback((domNode) => {
    if (domNode) {
      console.log(domNode.getBoundingClientRect());
      setTooltip(domNode.getBoundingClientRect());
    }
  }, []);

  /**
   * Listens the resize event in order to change the trigger element dimensions
   */
  useEffect(() => {
    const onTriggerChange = (e) => {
      let left = MIN_DISTANCE_BOUNDARY;
      let right = window.innerWidth - MIN_DISTANCE_BOUNDARY;

      if (boundaryRef && boundaryRef.current) {
        const clientRect = boundaryRef.current.getBoundingClientRect();
        left = clientRect.left;
        right = clientRect.right;
      }
      setBoundary({ left, right });
    };
    onTriggerChange();

    window.addEventListener("resize", onTriggerChange);
    return () => window.removeEventListener("resize", onTriggerChange);
  }, [boundaryRef]);

  const positions = useMemo(
    () => ({
      bottom: getBottomStyles,
      top: getTopStyles,
      left: getLeftStyles,
      right: getRightStyles,
    }),
    [getBottomStyles, getTopStyles, getLeftStyles, getRightStyles]
  );

  useEffect(() => {
    const trigger = triggerRef.current.getBoundingClientRect();
    if (tooltip && trigger) {
      const { arrowStyles, tooltipStyles } = positions[position]({
        tooltip,
        trigger,
        offset,
        boundary,
      });
      setArrowStyles(arrowStyles);
      setTooltipStyles(tooltipStyles);
    }
  }, [position, tooltip, positions, offset, boundary, triggerRef]);

  /**
   * Handles on open event
   */
  const handleOpen = () => {
    setShow(true);
    setClosing(false);
  };

  /**
   * Handles on close event
   */
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShow(ESTADO_POR_DEFECTO);
    }, 140);
  };

  /**
   * Exposes the API in component reference
   */
  useImperativeHandle(ref, () => ({
    open: () => {
      handleOpen();
    },
    close: () => {
      handleClose();
    },
    toggle: () => {
      show ? handleClose() : handleOpen();
    },
  }));

  return (
    <div
      className="tooltip"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
      ref={triggerRef}
      key={key}
    >
      {cloneElement(children, { "aria-describedby": id })}
      {show &&
        createPortal(
          <div
            className={`tooltip-wrapper ${
              closing ? "closing" : ""
            } tooltip-${position}`}
            role="tooltip"
            id={id}
          >
            <div
              className={`tooltip-content`}
              style={tooltipStyles}
              ref={tooltipRef}
            >
              {content}
            </div>
            <span className={`arrow arrow--${position}`} style={arrowStyles} />
          </div>,
          document.body
        )}
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
