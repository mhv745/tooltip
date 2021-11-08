import React from 'react';
import { render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import Tooltip from './Tooltip';
import '@testing-library/jest-dom'

describe('Tooltip', () => {

  it('should render the trigger component as tooltip children', () => {
    const trigger = "Text with tooltip";
    render(<Tooltip content="">{trigger}</Tooltip>);
    expect(screen.getByText(trigger)).toBeInTheDocument()
  });

  it('should render the tooltip content on hover', () => {
    const content = "Tooltip content";
    render(<Tooltip content={content} >Trigger</Tooltip>);
    userEvent.hover(screen.getByText("Trigger"))
    const tooltip = screen.getByText(content)
    expect(tooltip).toBeInTheDocument()
  });

  it('should not render the tooltip on trigger unhover', async() => {
    const content = "Tooltip content";
    render(<Tooltip content={content}>Trigger</Tooltip>);
    const trigger = screen.getByText("Trigger");
    userEvent.hover(trigger)
    const tooltip = screen.getByText(content)
    expect(tooltip).toBeInTheDocument()
    userEvent.unhover(trigger)
    await waitForElementToBeRemoved(() => screen.queryByText(content))
  });

  it('should not render the tooltip on tooltip content hover', async() => {
    const content = "Tooltip content";
    render(<Tooltip content={content}>Trigger</Tooltip>);
    const trigger = screen.getByText("Trigger");
    userEvent.hover(trigger)
    const tooltip = screen.getByText(content)
    expect(tooltip).toBeInTheDocument()
    userEvent.unhover(trigger)
    userEvent.hover(tooltip)
    await waitForElementToBeRemoved(() => screen.queryByText(content))
  });

  it('should render a component as tooltip', () => {
    const trigger = "Text with tooltip";
    render(<Tooltip content="" children={<><p>{trigger}</p><p>{trigger}</p></>} />);
    expect(screen.getAllByText(trigger).length).toBe(2)
  });

  it('should render the tooltip on top of the component', async () => {
    const tooltipText = "Tooltip"
    render(<Tooltip position="top" content={tooltipText} children={<div>Trigger</div>} />);
    const content = screen.getByText("Trigger")
    userEvent.hover(content)
    const tooltip = await screen.findByText(tooltipText)
    const top = window.getComputedStyle(tooltip).top

    expect(parseInt(top)).toBeLessThan(0)
  });

  it('should render the tooltip on bottom of the component', async () => {
    const tooltipText = "Tooltip"
    render(<Tooltip position="bottom" content={tooltipText} children={<div>Trigger</div>} />);
    const content = screen.getByText("Trigger")
    userEvent.hover(content)
    const tooltip = await screen.findByText(tooltipText)
    const top = window.getComputedStyle(tooltip).top
    expect(parseInt(top)).toBeGreaterThan(0)
  });

  it('should render the tooltip on left of the component', async () => {
    const tooltipText = "Tooltip"
    render(<Tooltip position="left" content={tooltipText} children={<div>Trigger</div>} />);
    const content = screen.getByText("Trigger")
    userEvent.hover(content)
    const tooltip = await screen.findByText(tooltipText)
    const left = window.getComputedStyle(tooltip).left
    expect(parseInt(left)).toBeLessThan(0)
  });
  
  it('should render the tooltip on right of the component', async () => {
    const tooltipText = "Tooltip"
    render(<Tooltip position="right" content={tooltipText} children={<div>Trigger</div>} />);
    const content = screen.getByText("Trigger")
    userEvent.hover(content)
    const tooltip = await screen.findByText(tooltipText)
    const left = window.getComputedStyle(tooltip).left
    expect(parseInt(left)).toBeGreaterThan(0)
  });
});
