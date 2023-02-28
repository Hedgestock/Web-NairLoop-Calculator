import * as path from "https://deno.land/std/path/mod.ts";

const server = Deno.listen({ port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

const config = {
  htmlFolder: "html",
};

for await (const conn of server) {
  serveHttp(conn);
}

async function serveHttp(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    const { pathname } = new URL(requestEvent.request.url);

    if (pathname.startsWith("/index.js")) {
      console.log("serving js");

      const file = await Deno.readFile("scripts/index.js");
      requestEvent.respondWith(
        new Response(file, {
          status: 200,
        })
      );
    } else if (pathname.startsWith("/index.html")) {
      console.log("serving html");

      const index = await Deno.readFile("html/index.html");
      requestEvent.respondWith(
        new Response(index, {
          status: 200,
        })
      );
    } else if (pathname.startsWith("/index.css")) {
      console.log("serving css");

      const css = await Deno.readFile("styles/index.css");
      requestEvent.respondWith(
        new Response(css, {
          status: 200,
        })
      );
    }
  }
}
