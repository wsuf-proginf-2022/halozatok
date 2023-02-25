module.exports = function parseCookies(request) {
  console.log("cookies: " + request.headers.cookie);
  const list = {},
    rc = request.headers.cookie;
  rc &&
    rc.split(";").forEach(function (cookie) {
      const parts = cookie.split("=");
      list[parts.shift().trim()] = decodeURI(parts.join("="));
    });
  return list;
};
