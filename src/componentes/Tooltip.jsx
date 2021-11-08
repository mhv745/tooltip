import React, {
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
import {
  getBottomStyles,
  getLeftStyles,
  getRightStyles,
  getTopStyles,
} from "./helpers/getTooltipStyles";

import "./Tooltip.scss";

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
 *
 * @typedef {object} TooltipProps
 * @property {string=} id Tooltip id
 * @property {string|JSX.Element} content Tooltip content
 * @property {"bottom"|"top"|"left"|"right"=} position Tooltip position with respect to children. Default value: `bottom`
 * @property {number=} offset Tooltip offset. Default value: `0`
 * @property {object=} boundary Tooltip limits
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
/**

 * @returns {JSX.Element} JSX.Element
 */
const Tooltip = (tooltipProps, ref) => {
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
    [limits, offset, position, positions, show],
  )

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
      {cloneElement(children, {
        "aria-describedby": id,
        onMouseEnter: handleOpen,
        onMouseLeave: handleClose,
        onFocus: handleOpen,
        onBlur: handleClose,
        ref: triggerRef,
        key: key,
      })}
      {show &&
        createPortal(
          <div
            id={id}
            className={`tooltip-wrapper ${
              closing ? "tooltip-wrapper--closing" : ""
            } tooltip-${position}`}
            role="tooltip"
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
};

export default forwardRef(Tooltip);
