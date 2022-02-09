import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESSFUL,
    FETCH_USERS_ERROR,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER
} from './userTypes'

export const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

export const fetchUsersSuccessful = (users) => {
    return {
        type: FETCH_USERS_SUCCESSFUL,
        payload: users
    }
}

export const fetchUsersError = (message) => {
    return {
        type: FETCH_USERS_ERROR,
        payload: message
    }
}

export const createUser = (userData) => {
    return {
        type: CREATE_USER,
        payload: userData
    }
}

export const updateUser = (id, userData) => {
    return {
        type: UPDATE_USER,
        payload: userData,
        id: id
    }
}

export const deleteUser = (id) => {
    return {
        type: DELETE_USER,
        payload: id
    }
}