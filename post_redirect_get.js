const http = require("http");
const parseCookies = require("./parseCookies");

const server = http.createServer(function (request, response) {
  if (request.method == "GET") {
    const cookie = parseCookies(request);
    if (!cookie.name) {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(`
      <form action="/cookie-test" method="POST" >
        <input type="text" name="user_neve">
        <button type="submit">subscribe</button>
      </form>
      `);
    }
    if (cookie.name) {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(`<h1>Hello ${cookie.name}!<h1>`);
    }
    response.end();
  }
  if (request.method == "POST" && request.url === "/cookie-test") {
    console.log("POST request");
    let body = "";

    // https://stackoverflow.com/questions/14551194/how-are-parameters-sent-in-an-http-post-request
    request.on("data", function (data) {
      body += data;
    });

    request.on("end", function () {
      console.log("raw data sent to the server: " + body);
      const post = new URLSearchParams(body);
      // const post_obj = Object.fromEntries(new URLSearchParams(body));

      response.writeHead(303, {
        Location: "http://127.0.0.1:8000/",
        "Set-Cookie": `name=${post.get("name")}`,
        "Content-Type": "text/html",
      });
      response.end();
    });
  }
});

const port = 8000;
server.listen(port);
console.log(`Server running at http://127.0.0.1:${port}/`);
