import axios from "axios"
export default {
    namespaced: true,
    state: {
        users: [],
        user: {},
    },
    mutations: {
        setUsers(state, payload) {
            state.users = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        async searchUsersEmail({ commit }, data) {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/admin/user/${data.email}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                commit('setUsers', response.data.user)
            } catch (error) {
                console.log(error)
            }
        }
    }
}