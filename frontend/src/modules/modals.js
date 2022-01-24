export default {
    namespaced: true,
    state: {
        modalConsultProject: {
            show: false,
        }
    },
    mutations: {
        showModalConsultProject(state) {
            state.modalConsultProject.show = true;
        },
        hideModalConsultProject(state) {
            state.modalConsultProject.show = false;
        }

    }
}