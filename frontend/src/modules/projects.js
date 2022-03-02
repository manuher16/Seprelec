import axios from 'axios';
export default {
    namespaced: true,
    state: {
        projects: [],
        selectedProject: {},
        project: {
            idCompany: null,
            idQuote: null,
            idInvoice: null,
            services: [],
            workforce: [],
            startDate: null,
            endDate: null,
            materials: [],
            budget: 0,
            payDay: null,
            status: 'En espera',

        },
        totals: {
            materials: 0,
            workforce: 0,
            services: 0,

            discount: 0,
            totalWithDiscount: 0,
            total: 0,
        },
        materials: [],
        services: [],
        workforce: [],
    },
    mutations: {
        setProjects(state, projects) {
            state.projects = projects;
        },
        setSelecteProject(state, project) {
            state.selectedProject = project;
        },
        setTotalWorkforce(state, total) {
            state.totals.workforce = total;
        },
        setTotalServices(state, total) {
            state.totals.services = total;
        },
        setTotalMaterials(state, total) {
            state.totals.materials = total;
        },
        setTotal(state, total) {
            state.totals.total = total;
        },
        setTotalDiscount(state, total) {
            state.totals.discount = total;
        },
        setTotalWithDiscount(state, total) {
            state.totals.totalWithDiscount = total;
        },
        setProject(state, project) {
            state.project = project;
        },
        pushMaterials(state, material) {
            let index = state.materials.findIndex(m => m._id === material._id);
            if (index === -1) {
                state.materials.push(material);
            } else {
                state.materials[index].quantity += parseInt(material.quantity);
            }
        },
        pushServices(state, service) {
            let index = state.services.findIndex(s => s._id === service._id);
            if (index === -1) {
                state.services.push(service);
            } else {
                state.services[index].quantity += parseInt(service.quantity);
            }
        },
        pushWorkforce(state, workforce) {
            let index = state.workforce.findIndex(w => w._id === workforce._id);
            if (index === -1) {
                state.workforce.push(workforce);
            }
        },
        popServices(state, service) {
            let index = state.services.findIndex(s => s._id === service._id);
            if (index !== -1) {
                state.services.materials.forEach(material => {
                    let indexMaterial = state.materials.findIndex(m => m._id === material._id);
                    if (indexMaterial !== -1) {
                        state.materials[indexMaterial].quantity -= parseInt(material.quantity);
                    }
                });
                state.services.splice(index, 1);
            }
        },

    },
    actions: {
        async getProjects({ commit }) {
            try {
                const res = await axios.get(`${process.env.VUE_APP_API_URL}/api/admin/projects`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                commit('setProjects', res.data.projects);
            } catch (error) {
                console.log(error);
            }
        },
        async getProject({ commit }, id) {
            const res = await axios.get(`${process.env.VUE_APP_API_URL}/api/admin/project/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            });
            commit('setProjects', res.data.project);
        },
        calculteTotalServices({ commit, state }) {
            let total = 0;
            state.project.services.forEach(service => {
                total += service.price;
            });
            commit('setTotalServices', total);
            return total;
        },
        calculteTotalWorkforce({ commit, state }) {
            let total = 0;
            state.project.workforce.forEach(employee => {
                total += employee.price;
            });
            commit('setTotalWorkforce', total);
            return total;
        },
        calculteTotalMaterials({ commit, state }) {
            let total = 0;
            state.project.materials.forEach(material => {
                total += material.price;
            });
            commit('setTotalMaterials', total);
            return total;
        },
        calculteTotal({ commit, state }) {
            let total = 0;
            total = state.totals.materials + state.totals.workforce + state.totals.services;
            commit('setTotal', total);
            return total;
        },
        calculteTotalDiscount({ commit, state }) {
            let total = 0;
            total = state.totals.total * (state.project.discount / 100);
            commit('setTotalDiscount', total);
            return total;
        },

    },
    getters: {
        projects(state) {
            return state.projects;
        },
    }
}