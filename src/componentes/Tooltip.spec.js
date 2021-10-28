import React from 'react';
import { render, fireEvent, waitForElementToBeRemoved, waitFor} from '@testing-library/react';
import Tooltip from './Tooltip';
import '@testing-library/jest-dom'

describe('Tooltip', () => {
//   it('should render the component as children of tooltip', () => {
//     const text = "Text with tooltip";
//     const {getByText} = render(<Tooltip content="" children={<p>{text}</p>} />);
//     expect(getByText(text)).toBeInTheDocument()
//   });

  it('should render tooltip text on hover', async () => {
    const text = "Tooltip text";
    const {getByText} = render(<Tooltip content={text} children={<p>Content</p>} />);
    // añadir userEvent en vez de fireEvent
    fireEvent.mouseOver(getByText("Content"))
    await waitFor(() => expect(getByText(text)).toBeInTheDocument())
  });

  it('should not render tooltip text on leave hover', async() => {
    const text = "Tooltip text";
    const {getByText, findByText, queryByText} = render(<Tooltip content={text} children={<p>Content</p>} />);
    fireEvent.mouseOver(getByText("Content"))
    expect(await findByText(text)).toBeInTheDocument()
    fireEvent.mouseOut(getByText("Content"))
    await waitFor(() => expect(queryByText(text)).not.toBeInTheDocument())
    //await waitForElementToBeRemoved(() => queryByText(text))
  });
  it('should render a component as tooltip', () => {
    const text = "Paragraph";
    const {getAllByText} = render(<Tooltip content="" children={<><p>{text}</p><p>{text}</p></>} />);
    expect(getAllByText(text).length).toBe(2)
  });

  it('should render the tooltip on top of the component', () => {

  });
  it('should render the tooltip on bottom of the component', () => {});
  it('should render the tooltip on left of the component', () => {});
  it('should render the tooltip on right of the component', () => {});
  it('should render tooltip with an offset on top, bottom, left and right', () => {});
});
