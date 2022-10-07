export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export function login(id) {
    return {
        type: LOG_IN,
        id
    }
}

export function logout() {
    return {
        type: LOG_OUT,
        id: null
    }
}
