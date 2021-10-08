import axiosClient from "./axiosClient";

const docApi = {
    getTypeList: () => {
        const url = '/docs/getTypes';
        return axiosClient.get(url);
    },
    create: (data) => {
        const url = '/docs/create';
        return axiosClient.post(url, data);
    },
    getContent: (data) => {
        const url = '/docs/getContent';
        return axiosClient.post(url, data);
    }
}

export default docApi;