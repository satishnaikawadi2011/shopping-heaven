import { create } from 'apisauce';

import cache from '../utils/cache';
import { BACKEND_URL } from '../../constants';

const apiClient = create({
	baseURL: BACKEND_URL,
	headers:
		{
			Authorization:
				`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZGY1ZmNmZTBjYTdjNTUyY2QxMzUyOSIsImlhdCI6MTYyMDYyODI0NCwiZXhwIjoxNjIxMjMzMDQ0fQ.SJpLs387CESsd6x6mSYZXlBNFU-zE8PFbNSgzoKF2Rw`
		}
});

const get = apiClient.get as any;
apiClient.get = async (url, params, axiosConfig) => {
	const response = await get(url, params, axiosConfig);
	if (response.ok) {
		cache.store(url, response.data);
		return response;
	}

	const data = await cache.get(url);
	if (data) {
		return { ok: true, data };
	}
	return response;
};

export default apiClient;
