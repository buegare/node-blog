let featured_limit = 5;

const config = {
	post: {
		featured: {
			skip: 0,
			limit: featured_limit
		},
		skip: featured_limit,
		limit: 2
	}
};

module.exports = config;