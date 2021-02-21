import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    arrReports: [],
    savedArrReports: JSON.parse(localStorage.getItem('reports')) || []
  },
  mutations: {
    CHANGE_REPORTS: ( state, data ) => {
      state.arrReports = data
    },
    SAVE_REPORTS: ( state, rep ) => {
      if (!state.savedArrReports.find( el => el.id === rep.id)) {
        state.savedArrReports.push(rep)
        localStorage.setItem('reports', JSON.stringify(state.savedArrReports))
      }
    },
    CREATE_REPORT: ( state, rep ) => {
      // created new id
      let id = state.arrReports.length - 1
      let isNewId = false
      do {
        id++
        isNewId = !state.arrReports.find( r => r.id === id)
        isNewId = !state.savedArrReports.find( r => r.id === id)
      } while (!isNewId)

      // parsing tags to array
      
      let tags = rep.tags.replace(/ +/g, ' ').trim().split(/,|\s/)
      tags = tags.filter( t => t !== '')

      //push new report to saved reports array and LS
      const newReport = {
        id,
        title: rep.title,
        tags,
        description: rep.desc
      }
      state.savedArrReports.push(newReport)
      localStorage.setItem('reports', JSON.stringify(state.savedArrReports))
    }
  },
  actions: {
    GET_REPORTS: async ({ commit }) => {
      const data = await api.getReportsFromAPI()
      commit('CHANGE_REPORTS', data)
    },
  },
  getters: {
    allTags: state => {
      const arrTags = []
      state.arrReports.forEach( el => {
        el.tags.forEach( t => arrTags.push(t))
      })
      return [...new Set(arrTags)]
    },
    allSaveTags: state => {
      const arrTags = []
      state.savedArrReports.forEach( el => {
        el.tags.forEach( t => arrTags.push(t))
      })
      return [...new Set(arrTags)]
    },
    getReport: state => id => {
      return state.arrReports.find( r => r.id === id)
    },
    getSavedReport: state => id => {
      return state.savedArrReports.find( r => r.id === id)
    },
  }
})
