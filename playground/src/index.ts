import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import url from 'node:url';
import markdownIt from 'markdown-it';
import mdCodeBlock from '../../dist/index.js';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const defaultStyle = fs
  .readdirSync(path.resolve(`${__dirname}/../../styles`), {
    withFileTypes: true,
  })
  .map((file) => fs.readFileSync(`${file.path}/${file.name}`, 'utf-8'))
  .join('');

const playgroundStyle = fs.readFileSync(
  path.resolve(`${__dirname}/style.css`),
  'utf-8',
);

const createPlayground = (content: string) =>
  `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter&family=Source+Code+Pro&display=swap"
    />
    <title>🚀 Playground</title>
    <style>
      ${defaultStyle}
      ${playgroundStyle}
    </style>
  </head>
  <body>
    <div class="header__container">
      <div class="header__content">
        <h1>🚀 Playground</h1>
        <button id="header__btn" aria-label="Toggle appearance">
          <svg
            id="header__btn--light-mode"
            role="button"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <title>Toggle light mode</title>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
          <svg
            id="header__btn--dark-mode"
            role="button"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <title>Toggle dark mode</title>
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </button>
      </div>
    </div>
    <div class="container">
      <main>${content}</main>
      <footer>
        👉
        <a
          href="https://github.com/yusuke99/markdown-it-code-block"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          GitHub Source Code
        </a>
      </footer>
    </div>
    <script>
      const headerBtn = document.getElementById("header__btn");
      const darkModeBtn = document.getElementById("header__btn--dark-mode");
      const lightModeBtn = document.getElementById("header__btn--light-mode");

      const toggleDarkMode = () => {
        lightModeBtn.style.display = "none";
        darkModeBtn.style.display = "block";
        localStorage.playgroundTheme = "dark";
        document.documentElement.classList.add("dark");
      };

      const toggleLightMode = () => {
        lightModeBtn.style.display = "block";
        darkModeBtn.style.display = "none";
        localStorage.playgroundTheme = "light";
        document.documentElement.classList.remove("dark");
      };

      if (
        localStorage.playgroundTheme === "dark" ||
        (!("playgroundTheme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        toggleDarkMode();
      } else {
        toggleLightMode();
      }

      headerBtn.addEventListener("click", () => {
        if (document.documentElement.className === "dark") {
          toggleLightMode();
        } else {
          toggleDarkMode();
        }
      });
    </script>
  </body>
</html>
`.trim();

const startServer = (port: number) => {
  http
    .createServer((_req, res) => {
      const md = markdownIt();
      md.use(mdCodeBlock);

      const content = fs.readFileSync('./src/playground.md', 'utf-8');
      const playground = createPlayground(md.render(content));

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(playground);
    })
    .listen(port, () => {
      console.log(`Server running on: http://localhost:${port}`);
    })
    .on('error', (err) => {
      if (err.message.includes('EADDRINUSE')) {
        console.error('Address in use, retrying...');
        return startServer(port + 1);
      }
      throw new Error(err.message);
    });
};

startServer(3000);
