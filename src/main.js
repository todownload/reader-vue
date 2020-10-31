
import Vue from 'vue';

/**
 * Globally load axios in vue, use as this.axios
 */
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios,axios);


Vue.config.productionTip = false

import { Button,Dropdown,Menu,Icon,Row,Col,Layout,List,Card,Modal,Form,Input,Select,FormModel,
    Divider,Radio,Upload,Steps,Checkbox,InputNumber,Progress,Table,Pagination} from 'ant-design-vue';

Vue.use(Button);
Vue.use(Dropdown);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Layout);
Vue.use(List);
Vue.use(Card);
Vue.use(Modal);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(FormModel);
Vue.use(Divider);
Vue.use(Radio);
Vue.use(Upload);
Vue.use(Steps);
Vue.use(Checkbox);
Vue.use(InputNumber);
Vue.use(Progress);
Vue.use(Table);
Vue.use(Pagination);


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
        next(false);
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
