// Mocking useQueryClient
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: jest.fn(),
  useMutation: jest.fn(),
}));

import {
  render,
  fireEvent,
  waitFor,
  getByLabelText,
} from "@testing-library/react";
import { useMutation } from "@tanstack/react-query";
import Index from "./index";

describe("create post component:", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("renders form elements", () => {
    useMutation.mockReturnValue({
      mutate: jest.fn(),
    });
    const { getByLabelText, getByText } = render(<Index />);
    expect(getByLabelText(/Title/i)).toBeInTheDocument();
    expect(getByLabelText(/Description/i)).toBeInTheDocument();
    expect(getByText(/Submit/i)).toBeInTheDocument();
  });

  test("submit the form on button click", async () => {
    const mutate = jest.fn();
    useMutation.mockReturnValue({
      mutate,
    });
    const { getByLabelText, getByText } = render(<Index />);

    fireEvent.change(getByLabelText(/Title/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(getByLabelText(/Description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.click(getByText(/Submit/i));
    await waitFor(() => {
      expect(mutate).toHaveBeenCalledTimes(1);

      expect(mutate).toHaveBeenCalledWith({
        title: "Test Title",
        body: "Test Description",
      });
    });
  });
});
