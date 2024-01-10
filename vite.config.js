import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
        json: {
            limit: '50mb', // Increase the limit here
        },
    },
});
