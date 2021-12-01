
const sidebar = {
    state: {
       // opened: localStorage.getItem('sidebarOpened') === 'true',
       opened:true 
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            if (state.opened ){
                localStorage.setItem('sidebarOpened', false)
            } else {
                localStorage.setItem('sidebarOpened', true)
            }
            state.opened = ! state.opened
        },
        CLOSE_SIDEBAR: (state) => {
            localStorage.setItem('sidebarOpened', false)
            state.opened = false
        },
    },
    actions: {
        ToggleSideBar: ({ commit }) => {
            commit('TOGGLE_SIDEBAR')
        },
        CloseSideBar({ commit }){
            commit('CLOSE_SIDEBAR')
        },
    }
}

export default sidebar
