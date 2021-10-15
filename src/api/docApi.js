import axiosClient from "./axiosClient";

const docApi = {
    getTypeList: () => {
        const url = '/docs/getTypes';
        return axiosClient.get(url);
    },
    createContent: (data) => {
        const url = '/docs/createContent';
        return axiosClient.post(url, data);
    },
    createDoc: (data) => {
        const url = '/docs/createDoc';
        return axiosClient.post(url, data);
    },
    getContent: (data) => {
        const url = '/docs/getContent';
        return axiosClient.post(url, data);
    },
    deleteDoc: (data) => {
        const url = '/docs/deleteDoc';
        return axiosClient.delete(url, { data });
    },
    deleteContent: (data) => {
        const url = '/docs/deleteContent';
        return axiosClient.delete(url, { data });
    }
}

export default docApi;