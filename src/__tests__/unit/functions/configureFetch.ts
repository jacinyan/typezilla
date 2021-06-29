import { setupServer } from "msw/node";
import { configureFetch } from "api";
import { rest } from "msw";

const api_URL = process.env.REACT_APP_API_URL;
const server = setupServer();

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test("configureFetch makes async requests", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  server.use(
    rest.get(`${api_URL}/${endpoint}`, (req, res, ctx) =>
      res(ctx.json(mockResult))
    )
  );

  const result = await configureFetch(endpoint);

  expect(result).toEqual(mockResult);
});

test("when configureFetch is making requests, a token is embedded", async () => {
  const token = "MOCK_TOKEN";
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  let request: any;

  server.use(
    rest.get(`${api_URL}/${endpoint}`, (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  //it's obviously before the callback(middleware) in server.use gets run
  await configureFetch(endpoint, { token });

  expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
});
