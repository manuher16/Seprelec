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
        employees: [],
        selectedMaterials: [],
        selectedServices: [],
        workforce: [],
        selectedEmployees: [],
    },
    mutations: {
        setProjects(state, projects) {
            state.projects = projects;
        },
        setSelectedServices(state, selectedServices) { state.selectedServices = selectedServices; },
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
        pushMaterialsForProject(state, material) {
            let index = state.selectedMaterials.findIndex(m => m._id === material._id);
            if (index === -1) {
                state.selectedMaterials.push(material);
            }
        },
        pushServicesForProject(state, service) {
            let index = state.selectedServices.findIndex(s => s._id === service._id);
            if (index === -1) {
                state.selectedServices.push(service);
            } else {
                state.selectedServices[index].quantity = service.quantity;
            }
        },
        pushWorkforce(state, workforce) {
            let index = state.workforce.findIndex(w => w._id === workforce._id);
            if (index === -1) {
                state.workforce.push(workforce);
            }
        },
        popServices(state, service) {
            let index = state.selectedServices.findIndex(s => s._id === service._id);
            if (index !== -1) {
                state.selectedServices[index].materials.forEach(material => {
                    let indexMaterial = state.selectedMaterials.findIndex(m => m._id === material._id);
                    if (indexMaterial !== -1) {
                        if (state.selectedMaterials[indexMaterial].quantity - parseInt(material.quantity) == 0) {
                            state.selectedMaterials.splice(indexMaterial, 1);
                        } else {
                            state.selectedMaterials[indexMaterial].quantity = state.selectedMaterials[indexMaterial].quantity - parseInt(material.quantity);
                        }

                    }
                });
                state.selectedServices.splice(index, 1);
            }
        },
        pushSelectedEmployees(state, employee) {
            if (state.employees.length > 0) {
                let index = state.employees.findIndex(m => m._id == employee._id);
                if (index == -1) {
                    state.employees.push(employee);
                }

            } else {
                state.employees.push(employee);
            }

        },
        removeSelectedEmployees(state, employee) {
            let index = state.employees.findIndex(m => m._id == employee._id);
            if (index != -1) {
                state.employees.splice(index, 1);
            }
        },
        pushSelectedMaterialsForProject: (state, material) => {
            if (state.selectedMaterials.length > 0) {
                let index = state.selectedMaterials.findIndex(m => m._id == material._id);
                if (index == -1) {
                    state.selectedMaterials.push(material);
                }
                if (index > -1) {
                    state.selectedMaterials[index].quantity = parseInt(state.selectedMaterials[index].quantity) + parseInt(material.quantity);
                }

            } else {
                state.selectedMaterials.push(material);
            }

        },
        removeSelectedMaterial: (state, material) => {
            let index = state.selectedMaterials.findIndex(m => m._id == material._id);
            if (index != -1) {
                state.selectedMaterials.splice(index, 1);
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
            if (state.selectedServices.length > 0) {
                let total = 0;
                state.selectedServices.forEach(service => {
                    total += service.price * service.quantity;
                });
                commit('setTotalServices', total);
                return total;
            } else {
                commit('setTotalServices', 0);
                return 0;
            }
        },
        calculteTotalWorkforce({ commit, state }) {
            let total = 0;
            state.selectedEmployees.forEach(employee => {
                if (employee.price == "" || !employee.price || employee.price == null || employee.price < 0) {
                    employee.price = 0;
                    total += 0;
                } else {

                    total += parseFloat(employee.price)
                }
            });
            commit('setTotalWorkforce', total)
        },
        calculteTotalMaterials({ commit, state }) {

            let total = 0;
            state.selectedMaterials.forEach(material => {
                total += material.price * material.quantity * (material.serviceQuantity || 1);
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