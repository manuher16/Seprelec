import axios from "axios"
export default {
    namespaced: true,
    state: {
        suppliers: [],
        supplier: {
            name: "",
            telephone: "",
            email: "",
            address: "",
            heading: "",
            website: "",
            materials: [],
        },
        selectedSupplier: {},
    },
    mutations: {
        setSuppliers(state, payload) {
            state.suppliers = payload
        },
        setSupplier(state, payload) {
            state.supplier = payload
        },
        setSelectedSupplier(state, payload) {
            state.selectedSupplier = payload
        },
    },
    actions: {
        getSuppliers({ commit }) {
            axios.get(`${process.env.VUE_APP_API_URL}/api/admin/suppliers`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                commit("setSuppliers", res.data.suppliers)
            })
        },
    },

}