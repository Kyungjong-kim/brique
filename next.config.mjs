/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
		// Only modify webpack config for client-side (browser) code
		if (!isServer) {
			// Exclude 'fs' module from client-side bundle
			config.resolve.fallback = {
				fs: false,
			};
		}

		// Return the modified webpack configuration
		return config;
	},
	async rewrites() {
		return [
			{
				source: '/socket.io/:path*',
				destination: 'http://localhost:8080/socket.io/:path*',
			},
		];
	},
};

export default nextConfig;
