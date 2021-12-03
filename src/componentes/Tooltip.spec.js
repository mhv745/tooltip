import "@testing-library/jest-dom";

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { act } from "react-dom/test-utils";

import Tooltip from "./Tooltip";

describe("Tooltip", () => {
  it("should render the trigger component as tooltip children", () => {
    const trigger = "Text with tooltip";
    render(
      <Tooltip content="">
        <p>{trigger}</p>
      </Tooltip>
    );
    expect(screen.getByText(trigger)).toBeInTheDocument();
  });

  it("should render the tooltip content on hover", () => {
    const content = "Tooltip content";
    render(
      <Tooltip content={content}>
        <p>Trigger</p>
      </Tooltip>
    );
    userEvent.hover(screen.getByText("Trigger"));
    const tooltip = screen.getByText(content);
    expect(tooltip).toBeInTheDocument();
  });

  it("should not render the tooltip on trigger unhover", async () => {
    const content = "Tooltip content";
    render(
      <Tooltip content={content}>
        <p>Trigger</p>
      </Tooltip>
    );
    const trigger = screen.getByText("Trigger");
    userEvent.hover(trigger);
    userEvent.unhover(trigger);
    await waitForElementToBeRemoved(() => screen.queryByText(content));
  });

  it("should not render the tooltip on tooltip content hover", async () => {
    const content = "Tooltip content";
    render(
      <Tooltip content={content}>
        <p>Trigger</p>
      </Tooltip>
    );
    const trigger = screen.getByText("Trigger");
    userEvent.hover(trigger);
    const tooltip = screen.getByText(content);
    userEvent.unhover(trigger);
    userEvent.hover(tooltip);
    await waitForElementToBeRemoved(() => screen.queryByText(content));
  });

  it("should render a component as tooltip", () => {
    const trigger = "Text with tooltip";
    render(
      <Tooltip content="">
        <>
          <p>{trigger}</p>
          <p>{trigger}</p>
        </>
      </Tooltip>
    );
    expect(screen.getAllByText(trigger).length).toBe(2);
  });

  it("should render the tooltip on top of the component", async () => {
    const tooltipText = "Tooltip";
    render(
      <Tooltip position="top" content={tooltipText}>
        <div>Trigger</div>
      </Tooltip>
    );
    const content = screen.getByText("Trigger");
    userEvent.hover(content);
    const tooltip = await screen.findByText(tooltipText);
    const { top } = window.getComputedStyle(tooltip);
    expect(parseInt(top, 10)).toBeLessThan(0);
  });

  it("should render the tooltip on top of the component as child", async () => {
    const tooltipText = "Tooltip";
    render(
      <Tooltip position="top" content={tooltipText} asChild>
        <div>Trigger</div>
      </Tooltip>
    );
    const content = screen.getByText("Trigger");
    userEvent.hover(content);
    const tooltip = await screen.findByText(tooltipText);
    const { top } = window.getComputedStyle(tooltip);
    expect(parseInt(top, 10)).toBeLessThan(0);
  });

  it("should render the tooltip on bottom of the component", async () => {
    const tooltipText = "Tooltip";
    render(
      <Tooltip position="bottom" content={tooltipText}>
        <div>Trigger</div>
      </Tooltip>
    );
    const content = screen.getByText("Trigger");
    userEvent.hover(content);
    const tooltip = await screen.findByText(tooltipText);
    const { top } = window.getComputedStyle(tooltip);
    expect(parseInt(top, 10)).toBeGreaterThan(0);
  });

  it("should render the tooltip on bottom of the component as child", async () => {
    const tooltipText = "Tooltip";
    render(
      <Tooltip position="bottom" content={tooltipText} asChild>
        <div>Trigger</div>
      </Tooltip>
    );
    const content = screen.getByText("Trigger");
    userEvent.hover(content);
    const tooltip = await screen.findByText(tooltipText);
    const { top } = window.getComputedStyle(tooltip);
    expect(parseInt(top, 10)).toBeGreaterThan(0);
  });

  it("should render the tooltip on left of the component", async () => {
    const tooltipText = "Tooltip";
    render(
      <Tooltip position="left" content={tooltipText}>
        <div>Trigger</div>
      </Tooltip>
    );
    const content = screen.getByText("Trigger");
    userEvent.hover(content);
    const tooltip = await screen.findByText(tooltipText);
    const { left } = window.getComputedStyle(tooltip);
    expect(parseInt(left, 10)).toBeLessThan(0);
  });

  it("should render the tooltip on left of the component as child", async () => {
    const tooltipText = "Tooltip";
    render(
      <Tooltip position="left" content={tooltipText} asChild>
        <div>Trigger</div>
      </Tooltip>
    );
    const content = screen.getByText("Trigger");
    userEvent.hover(content);
    const tooltip = await screen.findByText(tooltipText);
    const { left } = window.getComputedStyle(tooltip);
    expect(parseInt(left, 10)).toBeLessThan(0);
  });

  it("should render the tooltip on right of the component", async () => {
    const tooltipText = "Tooltip";
    render(
      <Tooltip position="right" content={tooltipText}>
        <div>Trigger</div>
      </Tooltip>
    );
    const content = screen.getByText("Trigger");
    userEvent.hover(content);
    const tooltip = await screen.findByText(tooltipText);
    const { left } = window.getComputedStyle(tooltip);
    expect(parseInt(left, 10)).toBeGreaterThan(0);
  });

  it("should render the tooltip on right of the component as child", async () => {
    const tooltipText = "Tooltip";
    render(
      <Tooltip position="right" content={tooltipText} asChild>
        <div>Trigger</div>
      </Tooltip>
    );
    const content = screen.getByText("Trigger");
    userEvent.hover(content);
    const tooltip = await screen.findByText(tooltipText);
    const { left } = window.getComputedStyle(tooltip);
    expect(parseInt(left, 10)).toBeGreaterThan(0);
  });

  it("should open and close the tooltip with a reference", async () => {
    const tooltipText = "Tooltip";
    const tooltipRef = React.createRef();
    render(
      <Tooltip ref={tooltipRef} position="right" content={tooltipText}>
        <p>Trigger</p>
      </Tooltip>
    );
    expect(screen.queryByText(tooltipText)).not.toBeInTheDocument();
    act(() => {
      tooltipRef.current.open();
    });
    expect(screen.getByText(tooltipText)).toBeInTheDocument();
    act(() => {
      tooltipRef.current.close();
    });
    await waitForElementToBeRemoved(() => screen.queryByText(tooltipText));
  });

  it("should toggle the tooltip with a reference", async () => {
    const tooltipText = "Tooltip";
    const tooltipRef = React.createRef();
    render(
      <Tooltip ref={tooltipRef} position="right" content={tooltipText}>
        <p>Trigger</p>
      </Tooltip>
    );
    expect(screen.queryByText(tooltipText)).not.toBeInTheDocument();
    act(() => {
      tooltipRef.current.toggle();
    });
    expect(screen.getByText(tooltipText)).toBeInTheDocument();
    act(() => {
      tooltipRef.current.toggle();
    });
    await waitForElementToBeRemoved(() => screen.queryByText(tooltipText));
  });

  it("should apply custom boundary", async () => {
    const tooltipText = "Tooltip text";
    const boundaryRef = React.createRef();
    render(
      <div
        ref={boundaryRef}
        style={{
          left: "30px",
          height: "10px",
          width: "10px",
          position: "absolute",
        }}
      >
        <Tooltip boundary={boundaryRef} content={tooltipText}>
          <p>Trigger</p>
        </Tooltip>
      </div>
    );
    const content = screen.getByText("Trigger");
    userEvent.hover(content);
    const tooltip = await screen.findByText(tooltipText);
    const { left } = window.getComputedStyle(tooltip);
    expect(parseInt(left, 10)).toBe(0);
  });
});
