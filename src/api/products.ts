import client from './client';

const endpoint = '/product';

const getProducts = (token: string | null) => {
	client.setHeader('Authorization', `Bearer ${token}`);
	return client.get(`${endpoint}`);
};

export default {
	getProducts
};
