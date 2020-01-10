export const homeModal = {
    state: { name: 'dzq' },
    mutations: {
        change(state) {
            // 这里的 `state` 对象是模块的局部状态
            state.name = 'lxw'
        }
    },

    getters: {

    }
}