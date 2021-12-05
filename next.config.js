/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    ENDPOINT: 'https://o0qub4k0kg.execute-api.ap-northeast-1.amazonaws.com/dev',
    IS_LOCAL: process.env.NODE_ENV == 'development',
  },
};
