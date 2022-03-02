import axios from "axios";
export default {
    namespaced: true,
    state: {
        materials: [],
        material: {},
        selectedMaterials: [],
        selectedMaterial: {},
    },
    mutations: {
        setMaterials: (state, materials) => {
            state.materials = materials;
        },
        setMaterial: (state, material) => {
            state.material = material;
        },
        setSelectedMaterials: (state, materials) => {
            state.selectedMaterials = materials;
        },
        pushSelectedMaterials: (state, material) => {
            if (state.selectedMaterials.length > 0) {
                let index = state.selectedMaterials.findIndex(m => m._id == material._id);
                if (index == -1) {
                    state.selectedMaterials.push(material);
                }
                if (index > -1) {
                    state.selectedMaterials[index].quantity2 = parseInt(state.selectedMaterials[index].quantity2) + parseInt(material.quantity2);
                }

            } else {
                state.selectedMaterials.push(material);
            }

        },
        setSelectedMaterial: (state, material) => {
            state.selectedMaterial = material;
        },
        removeSelectedMaterial: (state, material) => {
            let index = state.selectedMaterials.findIndex(m => m._id == material._id);
            if (index != -1) {
                state.selectedMaterials.splice(index, 1);
            }
        },
    },
    actions: {
        getMaterials: async ({ commit }) => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/admin/materials`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                commit('setMaterials', response.data.materials);
            } catch (error) {
                console.log(error);
            }
        },
    }
}