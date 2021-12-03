import {
  getBottomStyles,
  getLeftStyles,
  getRightStyles,
  getTopStyles,
} from "./tooltipStyles";

describe("Tooltip Styles", () => {
  const trigger = {
    left: 0,
    top: 0,
    right: 10,
    bottom: 10,
    width: 10,
    height: 10,
  };
  const tooltip = {
    width: 10,
    height: 10,
  };
  const limits = {
    left: 0,
    right: 100,
  };

  it("should get the tooltip and arrow bottom styles", () => {
    const styles = getBottomStyles({ trigger, tooltip, offset: 0, limits });
    expect(styles.arrowStyles.top).toBe("10px");
    expect(styles.arrowStyles.left).toBe("5px");
    expect(styles.tooltipStyles.top).toBe("15px");
    expect(styles.tooltipStyles.left).toBe("0px");
    expect(styles.tooltipStyles.transform).toBe("translateX(0px)");
    expect(styles.tooltipStyles.maxWidth).toBe("100px");
    expect(styles.tooltipStyles.width).toBe("10px");
  });

  it("should transform the bottom tooltip when left or right overflow", () => {
    let styles = getBottomStyles({
      trigger: { ...trigger, left: -10 },
      tooltip,
      offset: 0,
      limits,
    });
    expect(styles.tooltipStyles.transform).toBe("translateX(10px)");
    styles = getBottomStyles({
      trigger: { ...trigger, left: 100 },
      tooltip,
      offset: 0,
      limits,
    });
    expect(styles.tooltipStyles.transform).toBe("translateX(-10px)");
  });

  it("should get the tooltip and arrow top styles", () => {
    const styles = getTopStyles({ trigger, tooltip, offset: 0, limits });
    expect(styles.arrowStyles.top).toBe("-11.3137px");
    expect(styles.arrowStyles.left).toBe("5px");
    expect(styles.tooltipStyles.top).toBe("-15px");
    expect(styles.tooltipStyles.left).toBe("0px");
    expect(styles.tooltipStyles.transform).toBe("translateX(0px)");
    expect(styles.tooltipStyles.maxWidth).toBe("100px");
    expect(styles.tooltipStyles.width).toBe("10px");
  });

  it("should transform the top tooltip when left or right overflow", () => {
    let styles = getTopStyles({
      trigger: { ...trigger, left: -10 },
      tooltip,
      offset: 0,
      limits,
    });
    expect(styles.tooltipStyles.transform).toBe("translateX(10px)");
    styles = getTopStyles({
      trigger: { ...trigger, left: 100 },
      tooltip,
      offset: 0,
      limits,
    });
    expect(styles.tooltipStyles.transform).toBe("translateX(-10px)");
  });

  it("should get the tooltip and arrow left styles", () => {
    const styles = getLeftStyles({ trigger, tooltip, offset: 0, limits });
    expect(styles.arrowStyles.top).toBe("-0.6568500000000004px");
    expect(styles.arrowStyles.left).toBe("-5.65685px");
    expect(styles.tooltipStyles.top).toBe("0px");
    expect(styles.tooltipStyles.left).toBe("-15.65685px");
    expect(styles.tooltipStyles.width).toBe("10px");
  });

  it("should get the tooltip and arrow right styles", () => {
    const styles = getRightStyles({ trigger, tooltip, offset: 0, limits });
    expect(styles.arrowStyles.top).toBe("-0.6568500000000004px");
    expect(styles.arrowStyles.left).toBe("15.65685px");
    expect(styles.tooltipStyles.top).toBe("0px");
    expect(styles.tooltipStyles.left).toBe("15.65685px");
    expect(styles.tooltipStyles.width).toBe("10px");
  });

  it("should apply an offset", () => {
    const newProps = {
      trigger,
      tooltip,
      offset: 10,
      limits,
    };
    const stylesBottom = getBottomStyles(newProps);
    const stylesTop = getTopStyles(newProps);
    const stylesLeft = getLeftStyles(newProps);
    const stylesRight = getRightStyles(newProps);
    expect(stylesBottom.arrowStyles.top).toBe("20px");
    expect(stylesBottom.tooltipStyles.top).toBe("25px");
    expect(stylesTop.arrowStyles.top).toBe("-21.3137px");
    expect(stylesTop.tooltipStyles.top).toBe("-25px");
    expect(stylesLeft.arrowStyles.left).toBe("-15.65685px");
    expect(stylesLeft.tooltipStyles.left).toBe("-25.65685px");
    expect(stylesRight.arrowStyles.left).toBe("25.65685px");
    expect(stylesRight.tooltipStyles.left).toBe("25.65685px");
  });
});
