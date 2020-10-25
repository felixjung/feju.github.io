import mdxRaw from '@mdx-js/mdx';
import { transformAsync } from '@babel/core';

export async function parseMDX(source: string): Promise<string> {
  const jsx = await mdxRaw(source, { skipExport: true });

  const res = await transformAsync(jsx.trim(), {
    plugins: ['@babel/plugin-transform-react-jsx'],
    presets: ['minify'],
  });

  if (res === null) {
    throw new Error('failed to parse mdx');
  }

  return res.code || '';
}
