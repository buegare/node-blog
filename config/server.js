const config = {
	favicon: 'favicon.ico',
	server: {
		port: 8080
	},
	admin: {
		username: process.env.ADMIN_USERNAME,
		password: process.env.ADMIN_PASSWORD
	}
};

module.exports = config;