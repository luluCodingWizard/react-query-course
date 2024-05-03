jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));
import { render, screen } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";

import ToDoList from "./index";

describe("testing my ToDoList component:", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it(" displays the loading state:", async () => {
    useQuery.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      isSuccess: false,
      error: null,
      fetchStatus: "loading",
    });

    render(<ToDoList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("displays the error state", async () => {
    useQuery.mockReturnValue({
      data: undefined,
      isError: true,
      isPending: false,
      isSuccess: false,
      error: { message: "Failed to fetch" },
      fetchStatus: "error",
    });

    render(<ToDoList />);
    expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
  });
  it("displays todos data", async () => {
    useQuery.mockReturnValue({
      data: [{ id: 1, title: "Test Todo", isCompleted: false }],
      isPending: false,
      isError: false,
      isSuccess: true,
      error: null,
      fetchStatus: "success",
    });

    render(<ToDoList />);
    expect(screen.getByText(/Test Todo/i)).toBeInTheDocument();
  });
});
