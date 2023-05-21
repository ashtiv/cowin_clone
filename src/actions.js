export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';

export function updateUserData(uid, phoneNumber) {
    return {
        type: UPDATE_USER_DATA,
        payload: {
            uid: uid,
            phoneNumber: phoneNumber
        }
    };
}