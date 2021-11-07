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
     * @param {object} data {name, title, content, groupId}
     * @returns 
     */
    createDoc: (data) => {
        const url = '/docs/createDoc';
        return axiosClient.post(url, data);
    },

    /**
     * 
     * @param {object} data {groupId, docId, title, content}
     */
    createContent: (data) => {
        const url = '/docs/createContent';
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
    },

    /**
     * 
     * @param {object} data {docId, groupId}
     * @returns 
     */
    deleteDoc: (data) => {
        const url = '/docs/deleteDoc';
        return axiosClient.patch(url, data)
    },

    /**
     * 
     * @param {object} data {docId, contentId}
     */
    deleteContent: (data) => {
        const url = '/docs/deleteContent';

        return axiosClient.patch(url, data)
    }
}

export default docApi;