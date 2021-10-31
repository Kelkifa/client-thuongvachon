import axiosClient from "./axiosClient";

const docApi = {
    getGroups: () => {
        const url = '/docs/getGroups';
        return axiosClient.get(url);
    }
}

export default docApi;