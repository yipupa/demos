export const aboutModal = {
    state: { count: 0, list: [] },
    mutations: {
        increment(state) {
            // 这里的 `state` 对象是模块的局部状态
            state.count++
        },
        getList(state) {
            // 这里的 `state` 对象是模块的局部状态
            state.list = [1111111111, 22222222]
        }
    },

    actions: {
        increment({commit}) {
            commit('increment');
        },
        getList({commit}) {
            setTimeout(() => {
                commit('getList');
            }, 3000)
        },
    },

    getters: {
        doubleCount(state) {
            return state.count * 2
        }
    }
}