import { createStore } from 'vuex'

interface PageData {
  [key: string]: any;
}

interface State {
  pageData: PageData;
}

export default createStore<State>({
  state: {
    pageData: {} as PageData
  },
  mutations: {
    SET_PAGE_DATA(state: State, payload: { page: string; data: any }) {
      state.pageData[payload.page] = payload.data;
    },
    LOAD_STORED_DATA(state: State) {
      const storedData = localStorage.getItem('pageData');
      if (storedData) {
        state.pageData = JSON.parse(storedData);
      }
    }
  },
  actions: {
    savePageData({ commit, state }, payload: { page: string; data: any }) {
      commit('SET_PAGE_DATA', payload);
      localStorage.setItem('pageData', JSON.stringify(state.pageData));
    },
    loadStoredData({ commit }) {
      commit('LOAD_STORED_DATA');
    }
  },
  getters: {
    getPageData: (state: State) => (page: string): any | null => {
      return state.pageData[page] || null;
    }
  }
})
