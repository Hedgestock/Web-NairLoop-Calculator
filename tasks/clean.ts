import transpileOptions from "./transpile-options.ts"

try {
  await Deno.remove(transpileOptions.outdir, { recursive: true });
} catch (error) {
}