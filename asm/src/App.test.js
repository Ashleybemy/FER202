import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";

test("renders login heading", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const heading = screen.getByRole("heading", { name: /personalbudget/i });
  expect(heading).toBeInTheDocument();
});
