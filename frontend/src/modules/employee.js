import axios from "axios"
export default {
    namespaced: true,
    state: {
        employees: [],
        employee: {},
        selectedEmployees: [],
        totalWorkforce: 0,
    },
    mutations: {
        setEmployees(state, employees) {
            state.employees = employees
        },
        setEmployee(state, employee) {
            state.employee = employee
        },
        setSelectedEmployees(state, selectedEmployees) {
            state.selectedEmployees = selectedEmployees
        },
        pushSelectedEmployees(state, employee) {
            if (state.selectedEmployees.length > 0) {
                let index = state.selectedEmployees.findIndex(m => m._id == employee._id);
                if (index == -1) {
                    state.selectedEmployees.push(employee);
                }

            } else {
                state.selectedEmployees.push(employee);
            }

        },
        removeSelectedEmployees(state, employee) {
            let index = state.selectedEmployees.findIndex(m => m._id == employee._id);
            if (index != -1) {
                state.selectedEmployees.splice(index, 1);
            }
        },
        setTotalWorkforce(state, totalWorkforce) {
            state.totalWorkforce = totalWorkforce
        },
    },
    actions: {
        async getEmployees({ commit }) {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/admin/all-employees`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                commit('setEmployees', response.data.employees)
            } catch (error) {
                console.log(error)
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
        }
    }

}