/// <reference types="vite/client" />

import { describe, expect, test } from 'vitest';
import markdownIt from 'markdown-it';
import mdCodeBlock from '../../dist/index.js';

describe('markdown-it-code-block', () => {
  const files = import.meta.glob('./input/*.md', { as: 'raw', eager: true });

  const md = markdownIt();
  md.use(mdCodeBlock);

  for (const [path, content] of Object.entries(files)) {
    test(path, () => {
      expect(md.render(content)).toMatchFileSnapshot(
        path.replace('input', 'output').replace('.md', '.html'),
      );
    });
  }
});
