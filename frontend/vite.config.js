import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    theme: {
        extend: {
            maxWidth: {
                'screen-2xl': '1440px',
                'custom-1200': '1200px',
                'custom-900': '900px'
            },
            colors: {
                primary: '#ed3849',
                'primary-dark': '#d23141',
                'primary-light': '#f4e5ec',
                'text-dark': '#0f172a',
                'text-light': '#64748b',
                'extra-light': '#f8fafc'
            }
        }
    }
});
