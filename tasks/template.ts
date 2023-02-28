import * as path from "https://deno.land/std/path/mod.ts";
import * as pug from "https://cdn.jsdelivr.net/gh/lumeland/pug@master/mod.ts";

import templateOptions from "./template-options.ts";

async function template() {
  console.log("templating...");

  Deno.mkdir(templateOptions.outDir, { recursive: true });

  for (const file in templateOptions.outFiles) {
    const filename = path.join(templateOptions.srcDir, file);
    const outputname = path.join(
      templateOptions.outDir,
      templateOptions.outFiles[file]
    );
    if (Deno.args.includes("verbose")) {
      console.log(`rendering ${filename} in ${outputname}`);
    }
    const html = pug.renderFile(filename) as string;
    await Deno.writeTextFile(outputname, html);
  }

  console.log("templating done");
}

await template();
if (Deno.args.includes("watch")) {
  let lastChange = Date.now();
  const watcher = Deno.watchFs("./templates");
  for await (const event of watcher) {
    if (Date.now() - lastChange > 1000) {
      await template();
      lastChange = Date.now();
    }
  }
}
