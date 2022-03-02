import axios from "axios";
export default {
    namespaced: true,
    state: {
        loading: false,
        tableUser: {
            itemsTable: [],
            selectedItem: {},
            headers: []
        },
        tableRole: {
            itemsTable: [],
            selectedItem: {},
            headers: []
        }
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },

        setItemsTableUser(state, payload) {
            state.tableUser.itemsTable = payload;
        },
        setSelectedItemTableUser(state, payload) {
            state.tableUser.selectedItem = payload;
        },
        setHeadersTableUser(state, payload) {
            state.tableUser.headers = payload;
        },
        deleteItemTableUser(state, payload) {
            state.tableUser.itemsTable = state.tableUser.itemsTable.filter(item => item._id !== payload._id);
        },
        setItemsTableRole(state, payload) {
            state.tableRole.itemsTable = payload;
        },
        setSelectedItemTableRole(state, payload) {
            state.tableRole.selectedItem = payload;
        },
        setHeadersTableRole(state, payload) {
            state.tableRole.headers = payload;
        },



    },
    actions: {
        async getItemsTableUser({ commit }) {
            commit('setLoading', true);
            const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/admin/all-user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            commit('setItemsTableUser', response.data.users);
            commit('setHeadersTableUser', response.data.headers);
            commit('setLoading', false);
        },
        async getItemsTableRole({ commit }) {
            commit('setLoading', true);

            const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/admin/all-role`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            commit('setItemsTableRole', response.data.roles);
            commit('setHeadersTableRole', response.data.headers);
            commit('setLoading', false);
        },
    }

}