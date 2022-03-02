import Vue from 'vue'
import Vuex from 'vuex'
import modals from "../modules/modals"
import session from "../modules/session"
import notification from "../modules/notification"
import tables from "../modules/tables"
import project from "../modules/projects"
import role from "../modules/role"
import user from "../modules/user"
import employee from "../modules/employee"
import company from "../modules/company"
import route from "../modules/route"
import supplier from "../modules/supplier"
import unit from "../modules/unit"
import service from "../modules/service"
import material from "../modules/material"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    modals,
    session,
    notification,
    tables,
    project, role, user,
    employee,
    company,
    route,
    supplier,
    unit,
    service,
    material
  }
})
