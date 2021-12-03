import "./Tooltip.scss";

import {
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import {
  getBottomStyles,
  getLeftStyles,
  getRightStyles,
  getTopStyles,
  getTriggerPositions,
} from "./utils/tooltipStyles";

/**
 * Minimum distance to the edge of the window
 */
const MIN_DISTANCE_BOUNDARY = 10;

/**
 * Tooltip that displays non-modal information for a component
 * @example
 * <Tooltip content="Tooltip content">...</Tooltip>
 *
 * @typedef {object} TooltipProps
 * @property {string=} id Tooltip id
 * @property {string|JSX.Element} content Tooltip content
 * @property {"bottom"|"top"|"left"|"right"=} position Tooltip position with respect to children. Default value: `bottom`
 * @property {number=} offset Tooltip offset. Default value: `0`
 * @property {object=} boundary Tooltip limits
 * @property {boolean=} asChild Render the tooltip as child of trigger. Default value `false`
 * @property {number|string=} key Tooltip key
 * @property {object=} children
 *
 * @typedef {Object} RefType
 * @property {Object} current Current reference
 * @property {() => void} current.open Open tooltip from reference
 * @property {() => void} current.close Close tooltip from reference
 * @property {() => void} current.toggle Toggle tooltip from reference
 *
 * @param {TooltipProps} tooltipProps
 * @param {RefType} ref Tooltip reference
 *
 * @returns {JSX.Element} JSX.Element
 */
const Tooltip = (tooltipProps, ref) => {
  const {
    asChild = false,
    boundary,
    children,
    content,
    id,
    key,
    offset = 0,
    position = "bottom",
  } = tooltipProps;

  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);
  const [opening, setOpening] = useState(false);
  const [limits, setLimits] = useState({
    left: MIN_DISTANCE_BOUNDARY,
    right: document.body.clientWidth - MIN_DISTANCE_BOUNDARY,
  });
  const [tooltipStyles, setTooltipStyles] = useState({});
  const [arrowStyles, setArrowStyles] = useState({});

  /**
   * @constant @type {React.MutableRefObject}
   */
  const triggerRef = useRef();

  /**
   * @constant @type {React.MutableRefObject}
   */
  const tooltipRef = useRef();

  /**
   * Listens the resize event in order to change the trigger element dimensions
   */
  useEffect(() => {
    const onTriggerChange = () => {
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

  /**
   * @constant positions Methods to execute depending on the given position
   */
  const positions = useMemo(
    () => ({
      bottom: getBottomStyles,
      top: getTopStyles,
      left: getLeftStyles,
      right: getRightStyles,
    }),
    []
  );

  /**
   * Update position and dimensions of the tooltip
   */
  const updateTooltip = useCallback(() => {
    if (show && tooltipRef.current && triggerRef.current) {
      const tooltip = tooltipRef.current.getBoundingClientRect();
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const { top, left, bottom, right } = getTriggerPositions({
        triggerRef,
        triggerRect,
        asChild,
      });

      const trigger = {
        top,
        left,
        bottom,
        right,
        width: triggerRect.width,
        height: triggerRect.height,
      };
      const styles = positions[position]({
        tooltip,
        trigger,
        offset,
        limits,
      });
      setArrowStyles(styles.arrowStyles);
      setTooltipStyles(styles.tooltipStyles);
    }
  }, [limits, offset, position, positions, show]);

  /**
   * Update tooltip position and dimensions
   */
  useEffect(() => {
    updateTooltip();
  }, [updateTooltip]);

  /**
   * Handles on open event
   */
  const handleOpen = () => {
    setShow(true);
    setClosing(false);
    setTimeout(() => {
      setOpening(true);
    });
  };

  /**
   * Handles on close event
   */
  const handleClose = () => {
    setClosing(true);
    setOpening(false);
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
      if (show) {
        handleClose();
      } else {
        handleOpen();
      }
    },
  }));
  console.log(triggerRef, children);
  return (
    <>
      {cloneElement(
        triggerRef ? (
          <span style={{ display: "inline-block" }}>{children}</span>
        ) : (
          children
        ),
        {
          "aria-describedby": id,
          onMouseEnter: handleOpen,
          onMouseLeave: handleClose,
          onFocus: handleOpen,
          onBlur: handleClose,
          ref: triggerRef,
          key,
        }
      )}
      {show &&
        createPortal(
          <div
            id={id}
            className={`fukku-tooltip${
              closing ? " fukku-tooltip--closing" : ""
            }${
              opening ? " fukku-tooltip--opening" : ""
            } fukku-tooltip-${position}`}
            role="tooltip"
            style={{
              visibility: show ? "visible" : "hidden",
            }}
          >
            <div
              className="fukku-tooltip-content"
              style={tooltipStyles}
              ref={tooltipRef}
            >
              {content}
            </div>
            <span
              className={`fukku-tooltip-arrow fukku-tooltip-arrow--${position}`}
              style={arrowStyles}
            />
          </div>,
          asChild ? triggerRef.current : document.body
        )}
    </>
  );
};

export default forwardRef(Tooltip);
