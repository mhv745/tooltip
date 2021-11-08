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
 * Minimum distance to the edge of the window
 */
const MIN_DISTANCE_BOUNDARY = 10;

/**
 * Tooltip that displays non-modal information for a component
 * @example
 * ```
 * <Tooltip content="Tooltip content">...</Tooltip>
 * ```
 * @typedef {object} TooltipProps
 * @property {string=} id - tooltip id
 * @property {string|JSX.Element} content - Content of the tooltip
 * @property {"bottom"|"top"|"left"|"right"=} position - tooltip position with respect to children. Default value: `bottom`
 * @property {number=} offset - tooltip offset
 * @property {React.ElementRef=} boundary - tooltip limits
 * @property {number|string=} key tooltip key
 * 
 * @typedef {Object} RefType
 * @property {Object} current - current reference
 * @property {() => void} current.open - open tooltip from reference
 * @property {() => void} current.close - close tooltip from reference
 * @property {() => void} current.toggle - toggle tooltip from reference
 * 
 * @param {TooltipProps} tooltipProps
 * @param {RefType} ref - tooltip reference
/**

 * @returns {JSX.Element} JSX.Element
 */
function Tooltip(tooltipProps, ref) {
  const {
    content,
    position = "bottom",
    offset = 0,
    boundary,
    id,
    children,
    key,
  } = tooltipProps;

  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);
  const [limits, setLimits] = useState({
    left: MIN_DISTANCE_BOUNDARY,
    right: window.innerWidth - MIN_DISTANCE_BOUNDARY,
  });
  const [tooltipStyles, setTooltipStyles] = useState({});
  const [arrowStyles, setArrowStyles] = useState({});

  const { getBottomStyles, getTopStyles, getRightStyles, getLeftStyles } =
    useTooltipStyles();

  const triggerRef = useRef();
  const tooltipRef = useRef();

  /**
   * Listens the resize event in order to change the trigger element dimensions
   */
   useEffect(() => {
    const onTriggerChange = (e) => {
      let left = MIN_DISTANCE_BOUNDARY;
      let right = window.innerWidth - MIN_DISTANCE_BOUNDARY;
      if (boundary && boundary.current) {
        const clientRect = boundary.current.getBoundingClientRect();
        left = clientRect.left;
        right = clientRect.right;
      }
      setLimits({ left, right });
    };
    onTriggerChange();
    window.addEventListener("resize", onTriggerChange);
    return () => window.removeEventListener("resize", onTriggerChange);
  }, [boundary, show]);
  
  const positions = useMemo(
    () => ({
      bottom: getBottomStyles,
      top: getTopStyles,
      left: getLeftStyles,
      right: getRightStyles,
    }),
    [getBottomStyles, getTopStyles, getLeftStyles, getRightStyles]
  );

  /**
   * Update position and dimensions of the tooltip
   */
  const updateTooltip = useCallback(
    () => {
      if (show && tooltipRef.current && triggerRef.current) {
        const tooltip = tooltipRef.current.getBoundingClientRect()
        const trigger = triggerRef.current.getBoundingClientRect()
        const { arrowStyles, tooltipStyles } = positions[position]({
          tooltip,
          trigger,
          offset,
          limits,
        });
        setArrowStyles(arrowStyles);
        setTooltipStyles(tooltipStyles);
      }
    },
    [limits, offset, position, positions, show, tooltipRef, triggerRef],
  )

  /**
   * Update tooltip position and dimensions
   */
  useEffect(() => {
    updateTooltip()
  }, [updateTooltip]);

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
      setShow(false);
    }, 140);
  };

  /**
   * Exposes the API in component reference
   */
  useImperativeHandle(ref, () => ({
    /**
     * Open the tooltip
     */
    open: () => {
      handleOpen();
    },
    /**
     * Close the tooltip
     */
    close: () => {
      handleClose();
    },
    /**
     * Toggle the tooltip
     */
    toggle: () => {
      show ? handleClose() : handleOpen();
    },
  }));

  return (
    <>
      {
        cloneElement(children, { 
          "aria-describedby": id,  
          onMouseEnter: handleOpen,
          onMouseLeave:handleClose,
          onFocus:handleOpen,
          onBlur:handleClose,
          ref:triggerRef,
          key: key
        })
      }
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
    </>
  );
}

export default forwardRef(Tooltip);
