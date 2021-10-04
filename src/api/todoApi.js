import axiosClient from './axiosClient';

export const todoApi = {
    get: () => {
        const url = '/todos/get';
        return axiosClient.get(url);
    },

    add: (data) => {
        const url = '/todos/add';
        return axiosClient.post(url, data)
    },
    delete: (data) => {
        // console.log(`[api data]`, data);
        const url = '/todos/delete';
        return axiosClient.delete(url, { data });
    }

}
