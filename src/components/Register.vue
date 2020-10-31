<template>


    <div class="container-body">
    
        <a-row class="row">
            <a-col offset="8" span="4">
                <a @click="changeRegisterType"><a-icon type="swap" />切换</a>
            </a-col>
            <a-col  span="4">
                <b>{{registerType}}注册</b>
            </a-col>
            
            <a-col  span="4" >
                <a @click="toLogin"><a-icon type="login" />登录</a>
            </a-col>
        </a-row>

        <div v-if='emailRegister'>

            <a-row class="row">
                <a-col offset="4" span="4">
                    <label>{{registerType}}</label>
                </a-col>
                <a-col span="12">
                    <a-input allowClear v-model.trim="userEmail" >
                        <a-icon slot='suffix' type="mail" />
                    </a-input>
                </a-col>
            </a-row>

            <a-row class="row">
                <a-col offset="4" span="4">
                    <label>昵称</label>
                </a-col>
                <a-col span="12">
                    <a-input allowClear v-model.trim="userName" >
                        <a-icon slot='suffix' type="user" />
                    </a-input>
                </a-col>
            </a-row>

            <a-row class="row">
                 <a-col offset="4" span="4">
                    <label>密码</label>
                </a-col>
                <a-col span="12" >
                    <a-input-password allowClear  v-model.trim="userPwd"  />
                </a-col>
            </a-row>

            <a-row class="row">
                <a-col offset="4" span="4">
                    <label>确认密码</label>
                </a-col>
                <a-col span="12">
                    <a-input-password allowClear v-model.trim="confirmPwd" />
                </a-col>
            </a-row>

            <a-row class="row">
                <a-col offset="8" span="12">
                    <a-button-group>
                        <a-button class="btn" type="primary" :disabled="canRegisterWithEmail" @click="registerWithEmail" >注册<a-icon type="user-add" /></a-button>
                        <a-button class="btn" @click="clearUserInfo" type="danger">清除<a-icon type="delete" /></a-button>
                    </a-button-group>
                </a-col>
            </a-row>

        </div>

        <div v-else>

            <a-row class="row">
                <a-col offset="4" span="4">
                    <label>{{registerType}}</label>
                </a-col>
                <a-col span="12">
                    <a-input allowClear v-model.trim="userPhone" >
                        <a-icon slot='suffix' type="phone" />
                    </a-input>
                </a-col>
            </a-row>

            <a-row class="row">
                <a-col offset="4" span="4">
                    <label>昵称</label>
                </a-col>
                <a-col span="12">
                    <a-input allowClear v-model.trim="userName" >
                        <a-icon slot='suffix' type="user" />
                    </a-input>
                </a-col>
            </a-row>

            <a-row class="row">
                 <a-col offset="4" span="4">
                    <label>密码</label>
                </a-col>
                <a-col span="12" >
                    <a-input-password allowClear v-model.trim="userPwd" />
                </a-col>
            </a-row>

            <a-row class="row">
                <a-col offset="4" span="4">
                    <label>确认密码</label>
                </a-col>
                <a-col span="12">
                    <a-input-password allowClear v-model.trim="confirmPwd" />
                </a-col>
            </a-row>

            <a-row class="row">
                <a-col offset="8" span="12">
                    <a-button-group>
                        <a-button class="btn" type="primary" :disabled="canRegisterWithPhone" @click="registerWithPhone" >注册<a-icon type="user-add" /></a-button>
                        <a-button class="btn" @click="clearUserInfo" type="danger">清除<a-icon type="delete" /></a-button>
                    </a-button-group>
                </a-col>
            </a-row>

        </div>

    </div>
</template>

<script>


const EMAIL_CHN = "邮箱";
const PHONE_CHN = "手机";

import { AXIOS_POST_CONFIG } from '../resources/config.js';

export default {
    name:'Login',

    data:function(){
        return {
            registerType:EMAIL_CHN,
            emailRegister:true,
            userEmail:'',
            userPhone:'',
            userName:'',
            userPwd:'',
            confirmPwd:'',
            emailRegisterUrl:'/reader/user/register/email',
            phoneRegisterUrl:'/reader/user/register/phone',
        }
    },

    computed:{
        canRegisterWithEmail:function(){
            return !(this.validEmail() && this.validPwd());
        },
        canRegisterWithPhone:function(){
            return !(this.validPhone() && this.validPwd());
        }
    },

    

    methods:{
        changeRegisterType:function(){
            if(this.registerType === EMAIL_CHN){
                this.registerType = PHONE_CHN;
                this.emailRegister = false;
            }else{
                this.registerType = EMAIL_CHN;
                this.emailRegister = true;
            }
        },

        toLogin:function(){
            this.$router.replace("/login")
        },

        validEmail:function(){
            return this.userEmail.length > 0 ;
        },

        validPhone:function(){
            return this.userPhone.length > 0;
        },

        validName:function(){
            return this.userName.length > 0;
        },

        validPwd:function(){
            let equal = this.userPwd === this.confirmPwd;
            return equal && this.userPwd.length > 0;
        },

        register:function(url,fd,cfg){
            this.axios.post(url,fd,cfg).then((response)=>{
                let userList = response.data;
                if(userList&&userList.length>0){
                    this.registerSuccess(userList[0]);
                }
                else{
                    this.registerFail();
                }
            }).catch((e)=>{
                console.log(e);
                this.registerFail();
            });
        },

        registerWithEmail:function(){
            let fd = new FormData();

            fd.append('userEmail',this.userEmail);
            fd.append('userName',this.userName);
            fd.append('userPwd',this.userPwd);

            this.register(this.emailRegisterUrl,fd,AXIOS_POST_CONFIG);
        },

        registerWithPhone:function(){
            let fd = new FormData();
            fd.append('userPhone',this.userPhone);
            fd.append('userName',this.userName);
            fd.append('userPwd',this.userPwd);

            this.register(this.phoneRegisterUrl,fd,AXIOS_POST_CONFIG);
        },

        registerSuccess:function({id,userName}){
            this.$store.dispatch('login',{uid:id, userName:userName});
            this.$router.replace('/book-list')
        },

        registerFail:function(){
            alert("账号密码错误");
            this.clearUserInfo();
        },

        clearUserInfo:function(){
            this.userEmail = '' ;
            this.userPhone = '' ;
            this.userName = '' ;
            this.userPwd= '' ;
            this.confirmPwd='';
        },

    },
    
}
</script>

<style scoped>


.container-body{
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 10%;
    border: 2px solid skyblue;
    border-radius: 10px;
    box-shadow: 1px;
}

.btn{
    margin: 10px;
}

.row{
    margin: 20px;
}
</style>