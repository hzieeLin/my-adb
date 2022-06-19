export default {
    namespaced: true,
    state: () => ({
        todaylist: JSON.parse(localStorage.getItem('todaylist')||'[]')
    }),
    mutations: {
        addToDayList(state, list) {
            console.log("list")
            console.log(list)
            console.log("list")
            state.todaylist.push(list)
            this.commit('m_task/saveToDayListStorage')
        },
        saveToDayListStorage(state) {
            console.log('save')
            localStorage.setItem('todaylist', JSON.stringify(state.todaylist))
        },
        clearToDayListStorage(state,index) {
            state.todaylist.splice(index,1)
            localStorage.setItem('todaylist', JSON.stringify(state.todaylist))
        },
        editToDayListStorage(state,index) {
            state.todaylist[index].isDelete = !state.todaylist[index].isDelete
            localStorage.setItem('userinfo', JSON.stringify(state.userinfo))
        },
        clearAllToDayListStorage(state) {
            state.todaylist = []
            localStorage.setItem('todaylist', JSON.stringify(state.todaylist))
        },
    }
}
