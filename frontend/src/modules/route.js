import axios from 'axios';
export default {
    namespaced: true,
    state: {
        routes: [],
        selectedRoute: null,
        route: null,
    },
    mutations: {
        setRoutes(state, routes) {
            state.routes = routes;
        },
        setSelectedRoute(state, selectedRoute) {
            state.selectedRoute = selectedRoute;
        }
    },
    actions: {
        async getRoutes({ commit }) {
            const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/admin/routes`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            commit('setRoutes', response.data.routes);
        },
        async getRoute({ commit }, id) {
            const response = await axios.get('/api/routes/' + id);
            commit('setSelectedRoute', response.data);
        },
    }

}