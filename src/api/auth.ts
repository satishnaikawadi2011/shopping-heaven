import client from './client';

const endpoint = '/user';

const loginUser = (username: string, password: string) => {
	return client.post(`${endpoint}/login`, { username, password });
};

export default {
	loginUser
};
