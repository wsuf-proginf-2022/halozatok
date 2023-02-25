const http = require("http");
const parseCookies = require("./parseCookies");

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("Hello, World!");
  response.end();
});

const port = 8000;
server.listen(port);
console.log(`Server listening on port ${port}`);
