/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        mongodburl: "mongodb+srv://madhur:madhur07@cluster0.zcgn6.mongodb.net/finculator?retryWrites=true&w=majority",
        SECRET: "test",
    },
};

module.exports = nextConfig;
