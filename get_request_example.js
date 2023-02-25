const http = require("http");
const url = require("url");

const server = http.createServer((request, response) => {
  console.log("request.url: " + request.url);
  if (request.url === "/" || request.url === "") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(`
      <form action="/results" method="GET">
        <input type="text" name="search"/>
        <button type="submit">Search</button>
      </form>`);
    response.end();
  }
  if (request.url.startsWith("/results")) {
    const query = url.parse(request.url, true).query;
    console.log("query: " + JSON.stringify(query));
    if (query) {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(`
        <h1>Search results for: ${query.search}</h1>
        `);
      response.end();
    } else {
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end();
    }
  }
});

const port = 8000;
server.listen(port);
console.log(`Server listening on port ${port}`);
