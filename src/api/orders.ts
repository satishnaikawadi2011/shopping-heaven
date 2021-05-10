import client from './client';

const endpoint = '/order';

const getOrdersRelatedToUser = (token: string | null) =>
	client.get(`${endpoint}/me`, {
		headers:
			{
				Authorization: `Bearer ${token}`
			}
	});

export default {
	getOrdersRelatedToUser
};
