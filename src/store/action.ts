import { ActionTree } from 'vuex';

const actions: ActionTree<any, any> = {
    // 更新用户信息
    updateUser({ state, commit }, payload) {
        commit('UPDATE_USER', payload);
    },

};

export default actions;
