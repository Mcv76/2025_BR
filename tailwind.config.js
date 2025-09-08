/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Bootstrap과의 충돌을 방지하기 위해 Tailwind의 기본 스타일 초기화를 비활성화
  corePlugins: {
    preflight: false,
  },
}
