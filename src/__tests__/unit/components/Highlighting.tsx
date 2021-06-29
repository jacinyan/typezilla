import { screen, render } from "@testing-library/react";
import Highlighting from "app/components/kanban/Highlighting";

test("Highlighting correct keywords", () => {
  const name = "equipment management";
  const keyword = "management";

  render(<Highlighting name={name} keyword={keyword} />);

  expect(screen.getByText(keyword)).toBeInTheDocument();
  expect(screen.getByText(keyword)).toHaveStyle("color:#257afd");
  expect(screen.getByText("equipment")).not.toHaveStyle("color:#257afd");
});
