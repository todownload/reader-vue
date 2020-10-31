import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = ()=>({
    auth:false,
    uid:-1,
    userName:'',
});

const getters = {
    isAuth:(state)=>{
        if(state.auth){
            return true;
        }
        let auth =  localStorage.getItem("auth");
        return (!!auth)&&(auth==='true');
    },

    getUid:(state,getters)=>{
        if(getters.isAuth){
            if(state.uid>0){
                return state.uid;
            }
            let id = localStorage.getItem('uid');
            return id?parseInt(id):-1;
        }
        return -1;
    },

    getUserName:(state,getters)=>{
        if(getters.isAuth){
            if(state.userName.length > 0){
                return state.userName;
            }
            let name = localStorage.getItem("userName");
            return name?name:'';
        }
        return "";
    },
};

const mutations = {
    Auth:(state,payload)=>{
        if(typeof payload.auth === 'boolean'){
            state.auth = payload.auth;
        }
    },

    changeUser:(state,payload)=>{
        if(typeof payload.uid === 'number'){
            state.uid = payload.uid;
        }
    },

    changeUserName:(state,payload)=>{
        if(typeof payload.userName === 'string'){
            state.userName = payload.userName;
        }
    }

};

const actions = {
    login:({commit},payload)=>{
        if(typeof payload.uid === 'number' && typeof payload.userName === 'string'){
            localStorage.setItem("auth","true");
            localStorage.setItem("uid",payload.uid.toString());
            localStorage.setItem("userName",payload.userName);

            commit('Auth',{auth:true});
            commit('changeUser',{uid:payload.uid});
            commit('changeUserName',{userName:payload.userName});
        }
    },

    logout:({commit})=>{
        localStorage.setItem("auth","false");
        localStorage.removeItem("uid");
        localStorage.removeItem("userName");

        commit('Auth',{auth:false});
        commit('changeUser',{uid:-1});
        commit('changeUserName',{userName:''});
    },

    refresh:({commit})=>{
        let au = localStorage.getItem('auth');
        let id = localStorage.getItem('uid');
        let name = localStorage.getItem('userName');

        let auth = (au&&au==='true');
        let uid = id?parseInt(id):-1;
        let userName = name?name:'';

        commit('Auth',{auth:auth});
        commit('changeUser',{uid:uid});
        commit('changeUserName',{userName:userName});
    }

};

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    strict:debug
})

export default store;