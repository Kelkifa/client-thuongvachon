import axiosClient from "./axiosClient";

const docApi = {
    /**
     * @param {object} data {groupId}
     * @returns [post] /docs/getDocs
     */
    getDocs: (data) => {
        const url = '/docs/getDocs';
        return axiosClient.post(url, data);
    },

    /**
     * 
     * @param {*} data {name, title, content, groupId}
     * @returns 
     */
    createDoc: (data) => {
        const url = '/docs/createDoc';
        return axiosClient.post(url, data);
    },


    /**
     * Get doc detail
     * @param {object} data {docId, groupId}
     * @returns 
     */
    getDetail: (data) => {
        const url = '/docs/getDetail';
        return axiosClient.post(url, data);
    }
}

export default docApi;