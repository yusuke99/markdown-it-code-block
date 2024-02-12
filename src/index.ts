import type MarkdownIt from 'markdown-it';
import Prism from 'prismjs';

const parseLanguage = (info: string) => {
  const RE = /^(?<language>\w{0,15})/;
  const matched = RE.exec(info);
  return matched?.groups?.language || 'txt';
};

const parseTitle = (info: string) => {
  const RE = /\[(?<title>.*)\]/;
  const matched = RE.exec(info);
  return matched?.groups?.title || '';
};

const calculateHighlightRange = (ranges: string) => {
  const highlightRange = [];
  for (const range of ranges.split(',')) {
    if (!range.includes('-')) {
      highlightRange.push(parseInt(range));
    }
    const [start, end] = range.split('-').map((r) => parseInt(r));
    for (let i = start; i <= end; i++) {
      highlightRange.push(i);
    }
  }
  return highlightRange;
};

const parseHighlight = (info: string) => {
  const RE = /\{(?<highlight>(?:\d+(?:-\d+)?(?:,\d+(?:-\d+)?)*)|\d+)\}/;
  const matched = RE.exec(info);
  return matched?.groups?.highlight
    ? calculateHighlightRange(matched.groups.highlight)
    : [];
};

const parseLineNumber = (info: string) => {
  const RE = /line-number/;
  return RE.test(info);
};

const parseInfo = (info: string) => {
  return {
    language: parseLanguage(info),
    title: parseTitle(info),
    highlight: parseHighlight(info),
    isLineNumber: parseLineNumber(info),
  };
};

const markDownItCodeBlock = (md: MarkdownIt) => {
  md.renderer.rules.fence = (tokens, idx) => {
    const { info, content } = tokens[idx];
    const { language, title, highlight, isLineNumber } = parseInfo(info);

    const codeBlock = Prism.highlight(
      content.trim(),
      Prism.languages[language],
      language,
    )
      .split('\n')
      .map((code, idx) => {
        let line = code;

        if (line === '') {
          line = `<span class="md-code-block__line"></span>`;
        }

        const isHighlight =
          highlight.length && highlight.includes(idx + 1)
            ? 'data-highlight="true"'
            : '';

        if (isLineNumber) {
          // biome-ignore format: preformatted text
          return `
<span class="md-code-block__line-container" data-line-number="${idx + 1}" ${isHighlight}>
  <span class="md-code-block__line">${line}</span>
</span>
`.replace(/\n {2}/, '').trim();
        }

        // biome-ignore format: preformatted text
        return `
<span class="md-code-block__line-container" ${isHighlight}>
  <span class="md-code-block__line">${line}</span>
</span>
`.replace(/\n {2}/, '').trim();
      })
      .join('');

    if (title) {
      return `
<div class="md-code-block__container">
  <div class="md-code-block__title">${title}</div>
  <pre><code class="language-${language}">${codeBlock}</code></pre>
</div>
`.trim();
    }

    return `
<div class="md-code-block__container">
  <pre><code class="language-${language}">${codeBlock}</code></pre>
</div>
`.trim();
  };
};

export default markDownItCodeBlock;
