import axiosClient from './axiosClient';

export const todoApi = {

    /**
     * 
     * @param {object} data {groupId }
     * @returns 
     */
    get: (data) => {
        const url = '/todos/get';
        return axiosClient.post(url, data);
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
