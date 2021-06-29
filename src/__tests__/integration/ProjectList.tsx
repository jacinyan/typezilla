import { setupServer } from "msw/node";
import { rest } from "msw";
import { render, screen, waitFor } from "@testing-library/react";
import { AppProviders } from "contexts";
import ProjectListScreen from "app/screens/project-list";
import { ReactNode } from "react";

const mockedData = {
  users: [
    {
      id: 1,
      name: "Zoe Crumbley",
    },
    {
      id: 2,
      name: "Loris Briner",
    },
    {
      id: 3,
      name: "Alycia Nelligan",
    },
    {
      id: 4,
      name: "Daniell Mortenson",
    },
  ],
  projects: [
    {
      id: 1,
      name: "Drivers Management",
      projectLeadId: 1,
      team: "Delivery",
      createdAt: 1604989757139,
    },
    {
      id: 2,
      name: "Bulk Buying Management",
      projectLeadId: 2,
      team: "Bulk Buying",
      createdAt: 1604989757139,
    },
    {
      id: 3,
      name: "Equipment Management",
      projectLeadId: 2,
      team: "Equipment",
      createdAt: 1546300800000,
    },
    {
      id: 4,
      name: "Headquarters Management",
      projectLeadId: 3,
      team: "Headquarters",
      createdAt: 1604980000011,
    },
    {
      id: 5,
      name: "Route Planning System",
      projectLeadId: 4,
      team: "Delivery",
      createdAt: 1546900800000,
    },
  ],
};

export const renderScreen = (ui: ReactNode, { route = "/projects" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(<AppProviders children={ui} />);
};

const api_URL = process.env.REACT_APP_API_URL;
const server = setupServer(
  rest.get(`${api_URL}/me`, (req, res, ctx) =>
    res(
      ctx.json({
        id: 1,
        name: "Jack",
        token: 123,
      })
    )
  ),
  rest.get(`${api_URL}/users`, (req, res, ctx) =>
    res(ctx.json(mockedData.users))
  ),
  rest.get(`${api_URL}/projects`, (req, res, ctx) => {
    const { name = "", projectLeadId = undefined } = Object.fromEntries(
      req.url.searchParams
    );
    const searchResults = mockedData.projects.filter((project) => {
      return (
        project.name.includes(name) &&
        (projectLeadId ? project.projectLeadId === +projectLeadId : true)
      );
    });
    return res(ctx.json(searchResults));
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test("project list renders without error", async () => {
  renderScreen(<ProjectListScreen />, { route: "/projects" });

  await waitFor(() =>
    expect(screen.getByText("Drivers Management")).toBeInTheDocument()
  );
  // including the table header row
  expect(screen.getAllByRole("row").length).toBe(
    mockedData.projects.length + 1
  );
});

test("search projects", async () => {
  renderScreen(<ProjectListScreen />, { route: "/projects?name=Drivers" });

  await waitFor(() =>
    expect(screen.getByText("Drivers Management")).toBeInTheDocument()
  );

  expect(screen.getAllByRole("row").length).toBe(2);
});
