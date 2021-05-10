import { create } from 'apisauce';
import { BACKEND_URL } from '../../constants';

const apiClient = create({
	baseURL: BACKEND_URL,
	headers:
		{
			Authorization:
				`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZGY1ZmNmZTBjYTdjNTUyY2QxMzUyOSIsImlhdCI6MTYyMDYyODI0NCwiZXhwIjoxNjIxMjMzMDQ0fQ.SJpLs387CESsd6x6mSYZXlBNFU-zE8PFbNSgzoKF2Rw`
		}
});

export default apiClient;
