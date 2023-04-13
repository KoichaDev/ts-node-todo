import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Default config for the axios instance
const axiosParams = {
	baseURL: 'http://localhost:3000',
};

// Create axios instance with default params
const axiosInstance = axios.create(axiosParams);

// Main api function
const api = (axios: AxiosInstance) => {
	const getRequest = <T>(url: string, config: AxiosRequestConfig = {}) => {
		return axios
			.get<T>(url, config)
			.then((response) => response)
			.catch((error) => error);
	};

	const deleteRequest = <T>(url: string, config: AxiosRequestConfig = {}) => {
		return axios.delete<T>(url, config);
	};

	const postRequest = <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => {
		return axios.post<T>(url, body, config);
	};

	const patchRequest = <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => {
		return axios.patch<T>(url, body, config);
	};

	const putRequest = <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => {
		return axios.put<T>(url, body, config);
	};

	return {
		get: getRequest,
		delete: deleteRequest,
		post: postRequest,
		patch: patchRequest,
		put: putRequest,
	};
};
export default api(axiosInstance);
