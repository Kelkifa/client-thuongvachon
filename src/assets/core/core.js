/** Change notifice 
 * notifice input schema: {isProcessed: Boolean, err: String}
*/
export const changeNotifice = {


    setProcessing: () => {
        return { isProcessing: true, err: undefined }
    },
    setError: (err) => {
        return { isProcessing: false, error: err === undefined ? 'Lỗi' : err }
    },
    setSuccess: () => {
        return { isProcessing: false, error: false }
    }

}