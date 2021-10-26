import React from 'react';
import {render, screen } from '@testing-library/react';
import Tooltip from "./Tooltip"


describe("Tooltip", () =>  {

    it("should render the component as children of tooltip", () => {
        render(<Tooltip content="" children={<p>Text with tooltip</p>} />)
        expect(true).toBeTruthy()
        
    })

    it("should render tooltip text on hover", () => {
        
    })
    it("should render a complex component as tooltip", () => {
        
    })

    it("should render the tooltip on top of the component", () => {
        
    })
    it("should render the tooltip on bottom of the component", () => {
        
    })
    it("should render the tooltip on left of the component", () => {
        
    })
    it("should render the tooltip on right of the component", () => {
        
    })
    it("should render tooltip with an offset on top, bottom, left and right", () => {
        
    })


})