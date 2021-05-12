import client from './client';

const endpoint = '/user';

const loginUser = (username: string, password: string) => {
	return client.post(`${endpoint}/login`, { username, password });
};

const registerUser = (username: string, email: string, password: string) => {
	return client.post(`${endpoint}/register`, { username, email, password });
};

export default {
	loginUser,
	registerUser
};
