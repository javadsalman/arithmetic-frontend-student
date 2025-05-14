import iaxios from './axiosInstance'
import { useAuthStore } from '../stores/authStore';

// Authentication methods
export const login = async (userID: string, userToken: string) => {
    return await iaxios.post('/v1/students/authenticate', {
        user_id: +userID,
        user_token: userToken
    })
}

export const getCurrentStudent = async ({token}: {token?: string}) => {
    token = token || useAuthStore.getState().token || '';
    return await iaxios.get('/v1/students/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// Export the configured axios instance
export default iaxios
