const http = require("http");
const parseCookies = require("./parseCookies");

const server = http.createServer((request, response) => {
  // read cookies
  const cookies = parseCookies(request);
  if (cookies.mycookie !== "test") {
    response.writeHead(200, {
      "Content-Type": "text/plain",
      // set cookie
      "Set-Cookie": "mycookie=test",
    });
    response.write("<h1>Hello, First time!</h1>");
    response.end();
    return;
  }
  response.write("<h1>Hello, again!</h1>");
  response.end();
});

const port = 8000;
server.listen(port);
console.log(`Server listening on port ${port}`);
