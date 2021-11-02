import axiosClient from "./axiosClient";

const groupApi = {
    getDemo: () => {
        const url = '/groups/getDemo';
        return axiosClient.get(url);
    },
    get: () => {
        const url = '/groups/get';
        return axiosClient.get(url);
    },
    create: (data) => {
        const url = '/groups/create';
        return axiosClient.post(url, data)
    },
    addMember: (data) => {
        const url = '/groups/addMember';
        return axiosClient.post(url, data);
    }

}

export default groupApi;