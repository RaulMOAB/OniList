/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
	images: {
		domains: ["s4.anilist.co"],
		formats: ["image/avif", "image/webp"],
	},
	nextConfig,
};
