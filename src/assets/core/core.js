
export const defaulNotifice = {
    isProcessing: false,
    error: undefined,
};
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
/**
 * Handle notifice and dispatch async action 
 * Notifice State defind : {isProcessing, error}
 * 
 * @param {function} setNotifice Set notifice function of state notifice
 * @param {function} dispatch dispath function of redux
 * @param {string} action action use with dispath of redux
 * @param {function} callback is called when dispatch response success
 * @returns undefined
 */
export const handleNotificeWithResponse = async (setNotifice, dispatch, action, callback) => {
    if (!setNotifice || !dispatch || !action) return;

    try {
        setNotifice(changeNotifice.setProcessing());
        const response = await dispatch(action);

        if (response.error) {
            setNotifice(changeNotifice.setError(response.error.message))
            return
        }
        if (!response.payload.success) {
            setNotifice(changeNotifice.setError(response.payload.message))
            return;
        }

        setNotifice(changeNotifice.setSuccess());
        if (typeof callback === 'function')
            callback();

    } catch (err) {
        console.log(`[error]`, err);
        setNotifice(changeNotifice.setError(err.message))
    }
}