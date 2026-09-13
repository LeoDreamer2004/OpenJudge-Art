import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import { beginPageLoading } from './src/page-loading.ts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rolldownOptions: {
      output: { codeSplitting: false },
    },
  },
  plugins: [
    monkey({
      entry: 'src/main.ts',
      build: { systemjs: 'inline' },
      generate: ({ userscript, mode }) => mode === 'meta'
        ? userscript
        : `${userscript}\n;(${beginPageLoading.toString()})();\n`,
      userscript: {
        author: 'LeoDreamer',
        icon: 'https://i1.hdslb.com/bfs/face/c08b00534afc32a256a7f8b4442ef92ed181b471.jpg@128w_128h_1c_1s.webp',
        description: 'Beautify your OpenJudge experience.',
        namespace: 'leodreamer/openjudge-art',
        match: ['*://*.openjudge.cn/*'],
        grant: ['GM_getValue', 'GM_setValue'],
        connect: ['pku.edu.cn'],
        license: 'MIT',
        updateURL: 'https://github.com/LeoDreamer2004/OpenJudge-Art/releases',
        supportURL: 'https://github.com/LeoDreamer2004/OpenJudge-Art/issues',
        'run-at': 'document-start',
        'inject-into': 'page',
        $extra: {
          'author-blog': 'https://LeoDreamer2004.github.io'
        }
      },
      server: { mountGmApi: true },
    }),
  ],
});
