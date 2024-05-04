// Mock the entire @tanstack/react-query module
jest.mock("@tanstack/react-query", () => ({
  useQueries: jest.fn(),
}));
import { useQueries } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import TodoListQueries from "./index";

describe("ToDoListQueries component:", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("displays loading state when data is being fetch", () => {
    useQueries.mockReturnValue({
      data: undefined,
      pending: true, // simulating load state
    });
    render(<TodoListQueries />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("displays data when query is successful ", () => {
    useQueries.mockReturnValue({
      data: [
        { id: 1, title: "to do 1", isCompleted: false },
        { id: 2, title: "to do 2", isCompleted: true },
      ],
      pending: false, // simulating success fetch
    });
    render(<TodoListQueries />);
    expect(screen.getByText("to do 1")).toBeInTheDocument();
    expect(screen.getByText("to do 2")).toBeInTheDocument();
  });
});
