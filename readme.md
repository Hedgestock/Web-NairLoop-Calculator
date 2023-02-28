This is a mess but it's my mess and I like it.

# Layout

`./templates` is where the Pug templates for the HTML is stored.
`./src` is where the source TS files for the client side code lies.
`./styles` is where the CSS is. (One day I'll use a nice CSS framework)

`./html` is where the HTML files are generated.
`./scripts` is where the bundled JS is put for the server to serve and the browser to use.

`./server` is where the code for the server is written.

# Building

```deno task template``` turns the all `.pug` files in `./templates` to `.html` files in `./html`.
```deno task transpile``` turns the all `.ts` files in `./src` to `.js` files in `./scripts`.

Both commands above can watch their respective folder if given the `watch` parameter.

```deno task build``` launches all above commands.

# Running

```deno task serve``` runs the server. Make sure to build before.