
import Vue from 'vue';

/**
 * Globally load axios in vue, use as this.axios
 */
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios,axios);


Vue.config.productionTip = false

import { Button,Icon,Row,Col,Input,Tooltip,Layout,List,Card,Modal,Divider,
    Pagination,Space,PageHeader,Drawer} from 'ant-design-vue';

Vue.use(Button);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(Tooltip);

Vue.use(Layout);
Vue.use(List);
Vue.use(Card);
Vue.use(Modal);
Vue.use(Divider);
Vue.use(Pagination);
Vue.use(PageHeader);
Vue.use(Drawer);
Vue.use(Space)


import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js'

/**
 * Global Route Filter
 */
router.beforeEach((to,from,next)=>{
    let isAuth = store.getters.isAuth;
    if(to.meta.requireAuth && !isAuth){
        next({name:'login'});
    }
    else if(!to.meta.requireAuth && isAuth){
        alert("您已登录...")
        next({name:'book-list'});
    }
    else{
        next();
    }
});


new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
