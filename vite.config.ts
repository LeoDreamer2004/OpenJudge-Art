import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        author: 'LeoDreamer',
        icon: 'https://i1.hdslb.com/bfs/face/c08b00534afc32a256a7f8b4442ef92ed181b471.jpg@128w_128h_1c_1s.webp',
        description: 'Beautify your OpenJudge experience.',
        namespace: 'leodreamer/openjudge-art',
        match: ['*://*.openjudge.cn/*'],
        connect: ['pku.edu.cn'],
        license: 'MIT',
        $extra: {
          'author-blog': 'https://LeoDreamer2004.github.io'
        }
      },
    }),
  ],
});
