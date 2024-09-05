/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      mobile: '640px',
      pc: '1024px'
    },
    extend: {}
  },
  corePlugins: {
    preflight: false, // 关闭默认样式
  },
  plugins: []
}