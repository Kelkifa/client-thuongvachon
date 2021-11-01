import axiosClient from "./axiosClient";

const groupApi = {
    getDemo: () => {
        const url = '/groups/getDemo';
        return axiosClient.get(url);
    },
    get: () => {
        const url = '/groups/get';
        return axiosClient.get(url);
    }

}

export default groupApi;