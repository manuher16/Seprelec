import axios from "axios"
export default {
    namespaced: true,
    state: {
        roles: [],
        selectedRole: [],
        permissions: [],

    },
    mutations: {
        setRoles(state, payload) {
            state.roles = payload
        },
        setSelectedRole(state, payload) {
            state.selectedRole = payload
        },
        setPermissions(state, payload) {
            state.permissions = payload
        }
    },
    actions: {
        async getRoles({ commit }) {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/admin/all-role`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                commit('setRoles', response.data.roles)
            } catch (error) {
                console.log(error)
            }
        }
    }
}