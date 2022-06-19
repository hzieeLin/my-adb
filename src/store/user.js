export default {
    namespaced: true,
    state: () => ({
        userinfo: JSON.parse(sessionStorage.getItem('userinfo')|| '[]'),
        visit: JSON.parse(localStorage.getItem('visit')|| '[]'),
    }),
    mutations: {
        addToUserInfo(state, user) {
            this.commit('m_user/clearUserInfoStorage')
                state.userinfo.push(user)
            this.commit('m_user/saveToUserInfoStorage')
        } ,
        addToVisitCount(state) {
            for (let i = 0; i < 12; i++) {
                state.visit.push(0)
            }
            this.commit('m_user/saveToVisitStorage')
        },
        saveToUserInfoStorage(state) {
            sessionStorage.setItem('userinfo', JSON.stringify(state.userinfo))
        },
        saveToVisitStorage(state) {
            localStorage.setItem('visit', JSON.stringify(state.visit))
        },
        clearUserInfoStorage(state) {
                state.userinfo = []
            sessionStorage.setItem('userinfo', JSON.stringify(state.userinfo))
        },
        editVisitStorage(state, index) {
            console.log(state.visit)
            state.visit[index] = state.visit[index] + 1
            localStorage.setItem('visit', JSON.stringify(state.visit))
        }
    }
}
