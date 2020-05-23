import { USER_STORAGE_KEY } from '../config/constants'

export function useUser() {
    let userId = localStorage.getItem(USER_STORAGE_KEY)

    if (!userId) {
        userId = `Anonymous${+new Date()}`
        localStorage.setItem(USER_STORAGE_KEY, userId)
    }

    return userId
}