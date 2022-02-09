import http from '../http-common'

const getUsers = () => {
    return http.get("/data")
}

const createUser = data => {
    return http.post("/data", data)
}

const updateUser = (id, data) => {
    return http.put(`/data/${id}`, data)
}

const deleteUser = (id) => {
    return http.delete(`/data/${id}`)
}

const UserService = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}

export default UserService