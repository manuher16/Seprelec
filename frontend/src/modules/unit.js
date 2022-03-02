import axios from 'axios'
export default {
    namespaced: true,
    state: {
        units: [],
        unit: {},
        selectedUnit: {},
    },
    mutations: {
        setUnits(state, units) {
            state.units = units
        },
        setUnit(state, unit) {
            state.unit = unit
        },
        setSelectedUnit(state, unit) {
            state.selectedUnit = unit
        },
    },
    actions: {
        async getUnits({ commit }) {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/public/units`)
                commit('setUnits', response.data.units);
            } catch (error) {
                console.log(error.message)
            }
        },
        async getUnit({ commit }, id) {
            try {
                const response = await axios.get(`/ api / units / ${id}`);
                commit('setUnit', response.data);
            } catch (error) {
                console.log(error.message)
            }
        },
    }


}