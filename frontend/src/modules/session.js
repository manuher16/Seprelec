export default {
    namespaced: true,
    state: {
        isLogin: localStorage.getItem('isLogin') == 'true' ? true : false,
        token: localStorage.getItem('token') || null,
    },
    mutations: {
        setLogin(state, payload) {
            state.isLogin = payload;
        },
        setToken(state, payload) {
            state.token = payload;
        }
    },
    actions: {
        logout: function ({ commit }) {
            commit('setLogin', false);
            commit('setToken', null);
            localStorage.setItem('isLogin', false);
            localStorage.setItem('token', null);
        }

    }
}