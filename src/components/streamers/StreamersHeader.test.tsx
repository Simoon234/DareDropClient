import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import StreamersHeader from "./StreamersHeader";
import { QueryClient, QueryClientProvider } from "react-query";
import NewStreamer from "../../pages/NewStreamer";

const MOCKS = {
  openForm: vi.fn(),
  isLoading: false,
  streamers: 2,
};

const queryClient = new QueryClient();

const MOCKS_PROPS = {
  openForm: vi.fn(),
  closeModal: vi.fn(),
};

describe("Streamers Header", () => {
  beforeEach(() => {
    render(<StreamersHeader {...MOCKS} />);
  });
  it("paragraph should be defined", () => {
    const paragraph = screen.getByText(/List of all/i);
    expect(paragraph).toBeInTheDocument();
  });
  it("paragraph should be define and have streamers exactly 2", () => {
    const span = screen.getByTestId("quantity");
    expect(span).toHaveTextContent("2");
  });
  it("should click the button", () => {
    const newStreamer = screen.getByRole("button", {
      name: "add-new-streamer",
    });

    expect(newStreamer).toBeInTheDocument();
    expect(newStreamer).toBeDefined();

    fireEvent.click(newStreamer);

    render(
      <QueryClientProvider client={queryClient}>
        <NewStreamer {...MOCKS_PROPS} />;
      </QueryClientProvider>
    );

    const isV = screen.getByLabelText("isVisible");

    expect(isV).toBeInTheDocument();
  });
});
