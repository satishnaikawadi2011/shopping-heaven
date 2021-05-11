import client from './client';

const endpoint = '/category';

const getCategories = (token: string | null) => {
	client.setHeader('Authorization', `Bearer ${token}`);
	return client.get(`${endpoint}`);
};

export default {
	getCategories
};
