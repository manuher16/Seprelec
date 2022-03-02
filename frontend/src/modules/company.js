import axiso from 'axios'
export default {
    namespaced: true,
    state: {
        companies: [],
        selectedCompany: null,
        company: {},
    },
    mutations: {
        setCompanies(state, companies) {
            state.companies = companies
        },
        setSelectedCompany(state, company) {
            state.selectedCompany = company
        }
    },
    actions: {
        async getCompanies({ commit }) {
            try {
                const response = await axiso.get(`${process.env.VUE_APP_API_URL}/api/admin/companies`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                commit('setCompanies', response.data.companies)
            } catch (error) {
                console.log(error)
            }
        },
    }
}