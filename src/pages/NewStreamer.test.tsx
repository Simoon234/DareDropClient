import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import NewStreamer from "./NewStreamer";

const queryClient = new QueryClient();

const MOCKS_PROPS = {
  openForm: vi.fn(),
  closeModal: vi.fn(),
};

describe("new-streamer", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <NewStreamer {...MOCKS_PROPS} />;
      </QueryClientProvider>
    );
  });
  describe("streamer-name", () => {
    let streameraNameInput: HTMLElement;

    beforeEach(() => {
      streameraNameInput = screen.getByLabelText(/streamer-name/);
    });

    it("streamer name should be type text", () => {
      expect(streameraNameInput).toHaveAttribute("type", "text");
    });

    it("name should have text Pago", () => {
      fireEvent.change(streameraNameInput, {
        target: {
          value: "Pago",
        },
      });
      expect(streameraNameInput).toHaveValue("Pago");
    });
    it("check if input field was focused and than if the focus was removed", async () => {
      fireEvent.focus(streameraNameInput);
      fireEvent.blur(streameraNameInput);

      await waitFor(() => {
        const error = screen.getByText("Please fill this field");
        expect(error).toBeInTheDocument();
      });
    });
    it("check if input field was focused and than if the focus was removed and got an error", async () => {
      fireEvent.focus(streameraNameInput);
      fireEvent.change(streameraNameInput, {
        target: {
          value: "Pa",
        },
      });
      fireEvent.blur(streameraNameInput);

      await waitFor(() => {
        const error = screen.getByText(
          "The given value is too short! (Min. 3 characters)"
        );
        expect(error).toBeInTheDocument();
      });
    });
    it("check if input field was focused and than if the focus was removed", async () => {
      fireEvent.focus(streameraNameInput);
      fireEvent.change(streameraNameInput, {
        target: {
          value: "123456789112345678911234567891123456789112345678911",
        },
      });
      fireEvent.blur(streameraNameInput);

      await waitFor(() => {
        const error = screen.getByText("Too many characters!");
        expect(error).toBeInTheDocument();
      });
    });
  });

  describe("streaming-description", () => {
    let streamingDescription: HTMLElement;

    beforeEach(() => {
      streamingDescription = screen.getByLabelText(/streamer-description/);
    });

    it("streamer description should be type of text", () => {
      expect(streamingDescription).toHaveAttribute(
        "name",
        "streamerDescription"
      );
    });

    it("name should have text Great streamer with so much love", () => {
      fireEvent.change(streamingDescription, {
        target: {
          value: "Great streamer with so much love",
        },
      });
      expect(streamingDescription).toHaveValue(
        "Great streamer with so much love"
      );
    });
    it("check if input field was focused and than if the focus was removed", async () => {
      fireEvent.focus(streamingDescription);
      fireEvent.blur(streamingDescription);

      await waitFor(() => {
        const error = screen.getByText("Please fill this field");
        expect(error).toBeInTheDocument();
      });
    });
    it("check if input field was focused and than if the focus was removed. Expected error", async () => {
      fireEvent.focus(streamingDescription);
      fireEvent.change(streamingDescription, {
        target: {
          value: "Pa",
        },
      });
      fireEvent.blur(streamingDescription);

      await waitFor(() => {
        const error = screen.getByText(
          "The given value is too short! (Min. 10 characters)"
        );
        expect(error).toBeInTheDocument();
      });
    });
  });

  describe("select field", () => {
    let select: HTMLElement;
    let options: HTMLElement[];

    beforeEach(() => {
      select = screen.getByRole("combobox");
      options = screen.getAllByRole("option");
    });

    it("should be type select", () => {
      expect(select).toBeInTheDocument();
      expect(select).toBeDefined();
      expect(select).toBeTruthy();
    });

    it("type select should have 4 options", () => {
      expect(options.length).toBe(6);
    });
    it("first type select should be empty", () => {
      expect(options[0]).toHaveValue("");
    });
    it("check option values", () => {
      expect(options[0]).toHaveValue("");
      expect(options[1]).toHaveValue("Twitch");
      expect(options[2]).toHaveValue("TikTok");
      expect(options[3]).toHaveValue("Rumble");
      expect(options[4]).toHaveValue("YouTube");
      expect(options[5]).toHaveValue("Kick");
    });
    it("check if select was touched", async () => {
      fireEvent.focus(select);
      fireEvent.blur(select);

      await waitFor(() => {
        const error = screen.getByText("Please fill this field");
        expect(error).toBeInTheDocument();
      });
    });

    it("paragraph should be empty when first option is an empty string and should be defined in the document", () => {
      const emptyDescription = screen.getByLabelText(
        "description"
      ) as HTMLElement;
      expect(emptyDescription).toBeInTheDocument();
      expect(emptyDescription).toHaveTextContent("");
    });

    it("paragraph should NOT be empty", async () => {
      const emptyDescription = screen.getByLabelText(
        "description"
      ) as HTMLElement;

      act(() => {
        fireEvent.change(select, {
          target: {
            value: "Twitch",
          },
        });
      });

      await waitFor(() => {
        expect(emptyDescription).not.toHaveTextContent(/Twitch/i);
      });
    });
  });

  describe("submit button", () => {
    it("should be add button", () => {
      const button = screen.getByRole("button", {
        name: "Add",
      });

      expect(button).toBeInTheDocument();
    });

    it("should throw 3 errors when user submits without any values", () => {
      const button = screen.getByRole("button", {
        name: "Add",
      });

      fireEvent.click(button);

      waitFor(() => {
        const error = screen.getAllByText("Please fill this field");
        expect(error).toBe(3);
      });
    });

    it("should create new streamer", () => {
      const button = screen.getByRole("button", {
        name: "Add",
      });

      const streamerName = screen.getByLabelText(/streamer-name/);
      const streamerDesc = screen.getByLabelText(/streamer-description/);
      const select = screen.getByRole("combobox");

      fireEvent.change(streamerName, {
        target: {
          value: "Izak",
        },
      });

      fireEvent.change(streamerDesc, {
        target: {
          value: "Great streamer. Please let me",
        },
      });

      fireEvent.change(select, {
        target: {
          value: "Twitch",
        },
      });
      fireEvent.click(button);

      waitFor(() => {
        const button = screen.getByText("Submitting");
        expect(button).toHaveTextContent("Submitting");
      });
    });
    it("should create new streamer and close component", () => {
      const button = screen.getByRole("button", {
        name: "Add",
      });
      const component = screen.getByLabelText("isVisible");

      const streamerName = screen.getByLabelText(/streamer-name/);
      const streamerDesc = screen.getByLabelText(/streamer-description/);
      const select = screen.getByRole("combobox");

      fireEvent.change(streamerName, {
        target: {
          value: "Izak",
        },
      });

      fireEvent.change(streamerDesc, {
        target: {
          value: "Great streamer. Please let me",
        },
      });

      fireEvent.change(select, {
        target: {
          value: "Twitch",
        },
      });
      fireEvent.click(button);

      waitFor(() => {
        expect(component).not.toBeInTheDocument();
      });
    });
  });
});
