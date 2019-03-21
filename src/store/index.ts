import Vue from 'vue';
import actions from './action';
import mutations from './mutation';
import Vuex,  { ActionTree, MutationTree, StoreOptions } from 'vuex';

Vue.use(Vuex);

const state: any = {

};

export default new Vuex.Store({
    state,
    actions,
    mutations,
});

