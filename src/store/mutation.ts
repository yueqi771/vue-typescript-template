import { MutationTree } from 'vuex';

const mutations: MutationTree<any> = {
    UPDATE_USER: (state, payload) => {
        state.userData = payload;
    },
};

export default mutations;
