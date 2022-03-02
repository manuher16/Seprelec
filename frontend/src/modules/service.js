import axios from "axios"
export default {
    namespaced: true,
    state: {
        services: [],
        service: {},
        selectedServices: [],
        totalServices: 0,
        totalMaterials: 0,
        totalPrice: 0,
    },
    mutations: {
        setServices(state, payload) {
            state.services = payload
        },
        setService(state, payload) {
            state.service = payload
        },
        pushSelectedServices: (state, service) => {
            if (state.selectedServices.length > 0) {
                let index = state.selectedServices.findIndex(m => m._id == service._id);
                if (index == -1) {
                    state.selectedServices.push(service);
                }

            } else {
                state.selectedServices.push(service);
            }

        },
        removeSelectedService: (state, service) => {
            let index = state.selectedServices.findIndex(m => m._id == service._id);
            if (index != -1) {
                state.selectedServices.splice(index, 1);
            }
        },
        setSelectedService(state, payload) {
            state.selectedService = payload
        },
        setTotalServices(state, payload) {
            state.totalServices = payload
        },
        setTotalMaterials(state, payload) {
            state.totalMaterials = payload
        },
        setTotalPrice(state, payload) {
            state.totalPrice = payload
        },
    },
    actions: {
        async getServices({ commit }) {
            const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/admin/services`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            commit("setServices", response.data.services)
        },
        calculateTotal({ commit, state }) {
            let totalServices = 0;
            let totalMaterials = 0;
            state.selectedServices.forEach(service => {
                totalServices += parseFloat(service.price)
                service.materials.forEach(material => {
                    totalMaterials += parseFloat(material.price) * parseFloat(material.quantity)
                })

            })
            let totalPrice = totalServices + totalMaterials
            commit('setTotalMaterials', totalMaterials)
            commit("setTotalServices", totalServices)
            commit("setTotalPrice", totalPrice)
        }

    }
}