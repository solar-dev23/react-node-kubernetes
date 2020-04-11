import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_baseAPIURL,
	withCredentials: true,
	headers: {	
		'Content-Type': 'application/json',		
		'Accept': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
		'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
		'Access-Control-Allow-Credentials': true,
	}
});

axiosInstance.interceptors.response.use(
	res => {
		return res;
	},
	error => {
		return Promise.reject(error.response)
	}
);

export const peopleListApi = () => {	
	return axiosInstance.get('/swapi/people').then(res => {
		return res.data
	})
}