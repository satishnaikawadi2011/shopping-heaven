import client from './client';

const endpoint = '/order';

const getOrdersRelatedToUser = (token: string | null) => {
	client.setHeader('Authorization', `Bearer ${token}`);
	return client.get(`${endpoint}/me`);
};

export default {
	getOrdersRelatedToUser
};
