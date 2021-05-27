const path = require("path");
const jsonServer = require("json-server");
const server = jsonServer.create();
const defaultMiddleWare = jsonServer.defaults();
const middleware = require("./middleware");
const router = jsonServer.router(path.join(__dirname, "db.json"));

server.use(jsonServer.bodyParser);
server.use(defaultMiddleWare);
server.use(middleware);

server.use(router);

const PORT = 3030;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
