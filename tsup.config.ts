import { Options, defineConfig } from 'tsup';

export default defineConfig((options): Options[] => {
  const commonOptions: Options = {
    entry: ['src/index.ts'],
    sourcemap: true,
    dts: true,
    ...options,
  };

  return [
    {
      ...commonOptions,
      format: ['cjs','esm'],
      // outExtension: () => ({ js: '.cjs' }),
      clean: true,
      outDir: './dist',
    },
  ];
});
