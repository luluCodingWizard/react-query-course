jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));
import { render, fireEvent, waitFor } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import Index from "./index";

const myData = [
  { id: 1, title: "Post 1", body: "Body 1" },
  { id: 2, title: "Post 2", body: "Body 2" },
];

describe("tetsing my paginated component", () => {
  test("render laoding state:", () => {
    useQuery.mockReturnValue({ isPending: true });
    const { getByText } = render(<Index page={1} setPage={() => {}} />);
    expect(getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state", () => {
    const errorMessage = "Failed to fetch data";
    useQuery.mockReturnValue({
      isError: true,
      error: { message: errorMessage },
    });

    const { getByText } = render(<Index page={1} setPage={() => {}} />);
    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  // check my data rendering

  test("renders data", () => {
    useQuery.mockReturnValue({ data: myData });

    const { getByText } = render(<Index page={1} setPage={() => {}} />);
    expect(getByText("Post 1")).toBeInTheDocument();
    expect(getByText("Post 2")).toBeInTheDocument();
  });

  test("handles next page", () => {
    const setPage = jest.fn();
    useQuery.mockReturnValue({ data: myData });

    const { getByText } = render(<Index page={1} setPage={setPage} />);
    waitFor(async () => {
      fireEvent.click(getByText("Next Page"));
      expect(setPage).toHaveBeenCalled();
      expect(setPage).toHaveBeenCalledWith(2);
      expect(getByText("Current page is: 2")).toBeInTheDocument();
    });
  });
});
