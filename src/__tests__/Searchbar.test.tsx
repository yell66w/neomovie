import Searchbar from "@/components/Searchbar";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));
describe("Searchbar", () => {
  beforeEach(async () => {
    const useRouter = jest.spyOn(require("next/router"), "useRouter");
    useRouter.mockImplementation(() => ({
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }));
  });
  it("should call router.replace when the form is submitted", () => {
    const mockRouter = {
      replace: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    const onEnterMock = jest.fn();
    render(<Searchbar onEnter={onEnterMock} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "batman" } });
    fireEvent.submit(input);
    expect(mockRouter.replace).toHaveBeenCalledWith("/movies/search?q=batman");
    expect(onEnterMock).toHaveBeenCalled();
  });
});
