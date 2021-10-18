import App from "../App";
import Home from "../components/home";
import "@testing-library/jest-dom";
import {userEvent} from "@testing-library/user-event";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

describe("<App />", () => {
test("chequear que todos sus children se monten correctamente", () => {
    render(<App />);
    const componenteHomeUno = render(<Home />);
    //const componenteHome = screen.getByTestId("home-component");
    expect(componenteHomeUno).toBeDefined();
});
});