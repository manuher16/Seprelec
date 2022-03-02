export default {
    namespaced: true,
    state: {
        btnContact: {
            show: true,
        },
        showSnackbar: false,
        snackbar: {
            show: false,
            text: '',
            color: 'primary',
            timeout: 3000,
        },

    },
    mutations: {
        setSnackbarShow: (state, payload) => {
            state.showSnackbar = payload;
            state.snackbar.show = payload;
        },
        setSnackbarText: (state, payload) => {
            state.snackbar.text = payload;
        },
        setSnackbarColor: (state, payload) => {
            state.snackbar.color = payload;
        },

    },
    actions: {
        showSnackbar: ({ state, commit }, payload) => {
            if (state.snackbar.show) return;
            commit('setSnackbarText', payload.text ? payload.text : '');
            commit('setSnackbarColor', payload.color ? payload.color : 'primary');
            commit('setSnackbarShow', true);
            setTimeout(() => {
                commit('setSnackbarShow', false);
            }, payload.timeout ? payload.timeout : state.snackbar.timeout);

        }
        ,
        hideSnackbar: ({ commit }) => {
            commit('setSnackbarShow', false);
        }
    }
}