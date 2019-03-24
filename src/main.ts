import Vue from 'vue'
import * as ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@static/css/common.less';
import store from './store/index';
import axios from '@utils/http';
import filters from '@utils/filter';
import App from './App.vue'
import router from './router'
import session from '@utils/session.js'
import parse from '@utils/parse'

Vue.config.productionTip = false;

Vue.config.productionTip = false;
Vue.use((axios as any));
Vue.use(ElementUI);

(window as any).vuex = store;
window.session = session;

router.beforeEach((to, from, next) => {
	// 这里将ast数据存储到store中；
	next()
});


(window as any).vm = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');


