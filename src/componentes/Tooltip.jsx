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
 * Minimum distance to boundary
 */
const MIN_DISTANCE_BOUNDARY = 10;

/**
 * Use case
 * ```
 * <Tooltip content="Tooltip content">...</Tooltip>
 * ```
 *
 * @typedef {object} TooltipProps
 * @property {string=} id - tooltip id
 * @property {string|JSX.Element} content - Content of the tooltip
 * @property {"bottom"|"top"|"left"|"right"=} position - tooltip position with respect to children. Default value: `bottom`
 * @property {number=} offset - tooltip offset
 * @property {object=} boundaryRef - tooltip limits
 * @property {number|string=} key
 * @property {object=} children
 *
 * @typedef {object} RefType
 * @property {object} current
 * @property {() => void} current.open
 * @property {() => void} current.close
 * @property {() => void} current.toggle
 *
 * @param {TooltipProps} tooltipProps
 * @param {RefType} ref
 * @returns {JSX.Element} JSX.Element
 */
const Tooltip = (tooltipProps, ref) => {
  const {
    content,
    position = "bottom",
    offset = 0,
    boundaryRef,
    id,
    children,
    key,
  } = tooltipProps;

  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);
  const [boundary, setBoundary] = useState({
    left: MIN_DISTANCE_BOUNDARY,
    right: document.body.clientWidth - MIN_DISTANCE_BOUNDARY,
  });
  const [tooltipStyles, setTooltipStyles] = useState({});
  const [arrowStyles, setArrowStyles] = useState({});

  /** @constant
   * @type {React.MutableRefObject}
   */
  const triggerRef = useRef();

  /** @constant
   * @type {React.MutableRefObject}
   */
  const tooltipRef = useRef();

  /**
   * Listens the resize event in order to change the trigger element dimensions
   */
  useEffect(() => {
    const onTriggerChange = () => {
      let left = MIN_DISTANCE_BOUNDARY;
      let right = document.body.clientWidth - MIN_DISTANCE_BOUNDARY;

      if (boundaryRef && boundaryRef.current) {
        const clientRect = boundaryRef.current.getBoundingClientRect();
        left = clientRect.left;
        right = clientRect.right;
      }
      setBoundary({ left, right });
    };

    onTriggerChange();

    window.addEventListener("resize", onTriggerChange);

    return () => {
      window.removeEventListener("resize", onTriggerChange);
    };
  }, [boundaryRef, show]);

  const positions = useMemo(
    () => ({
      bottom: getBottomStyles,
      top: getTopStyles,
      left: getLeftStyles,
      right: getRightStyles,
    }),
    []
  );

  const updateTooltip = useCallback(() => {
    if (show && tooltipRef.current && triggerRef.current) {
      const tooltip = tooltipRef.current.getBoundingClientRect();
      const trigger = triggerRef.current.getBoundingClientRect();
      const { arrowStyles, tooltipStyles } = positions[position]({
        tooltip,
        trigger,
        offset,
        boundary,
      });
      setArrowStyles(arrowStyles);
      setTooltipStyles(tooltipStyles);
    }
  }, [boundary, offset, position, positions, show, tooltipRef, triggerRef]);

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
              closing ? "closing" : ""
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
