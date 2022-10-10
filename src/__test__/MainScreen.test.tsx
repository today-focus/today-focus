import "react-native";
import { render, screen, waitFor } from "@testing-library/react-native";

import renderer from "react-test-renderer";

import MainScreen from "../screens/MainScreen";

describe("Testing MainScreen", () => {
  beforeEach(() => {
    render(<MainScreen />);
  });

  jest.useFakeTimers();
  Date.now = jest.fn(() => 1665373596677);

  it("MainScreen renders correctly", async () => {
    const tree = await waitFor(() => renderer.create(<MainScreen />).toJSON());
    expect(tree).toMatchSnapshot();
  });

  it("MainScreen contains title and subtitle", async () => {
    const title = await screen.findByText(/today's title/i);
    const subtitle = await screen.findByText(/today routine/i);

    expect(title).toBeTruthy();
    expect(subtitle).toBeTruthy();
  });
});
