/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss"), require.resolve("prettier-plugin-prisma")],
  printWidth: 140,
};

module.exports = config;
