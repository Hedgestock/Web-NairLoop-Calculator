import * as esbuild from "https://deno.land/x/esbuild@v0.17.5/mod.js";
import transpileOptions from "./transpile-options.ts"


async function transpile() {
    console.log("transpiling...");
    try {
        await esbuild.build(transpileOptions);
        esbuild.stop();
    } catch (error) {
        console.error(error);
        return;
    }
    console.log("transpiling done");
}

await transpile();
if (Deno.args.includes("watch")) {
    let lastChange = Date.now();
    const watcher = Deno.watchFs("./src");
    for await (const event of watcher) {
        if (Date.now() - lastChange > 1000) {
            await transpile();
            lastChange = Date.now();
        }
    }
}
