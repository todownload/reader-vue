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
                    <label>
                        {{registerType}}
                        <a-tooltip>
                            <template #title>
                                请输入正确的邮箱
                            </template>
                            <a-icon type="info-circle" />
                        </a-tooltip>
                    </label>
                </a-col>
                <a-col span="12">
                    <a-input :maxLength='30' allowClear v-model.trim="userEmail" placeholder="请输入邮箱" >
                        <a-icon slot='suffix' type="mail" />
                    </a-input>
                </a-col>
            </a-row>

            <a-row class="row">
                <a-col offset="4" span="4">
                    <label>
                        昵称
                        <a-tooltip>
                            <template #title>
                                请输入昵称
                            </template>
                            <a-icon type="info-circle" />
                        </a-tooltip>
                    </label>
                </a-col>
                <a-col span="12">
                    <a-input :maxLength='30' allowClear v-model.trim="userName" placeholder="请输入昵称" >
                        <a-icon slot='suffix' type="user" />
                    </a-input>
                </a-col>
            </a-row>

            <a-row class="row">
                 <a-col offset="4" span="4">
                    <label>
                        密码
                        <a-tooltip>
                            <template #title>
                                密码必须包含大写字母,小写字母,数字,和特殊符号[!@#$%^&*]
                            </template>
                            <a-icon type="info-circle" />
                        </a-tooltip>
                    </label>
                </a-col>
                <a-col span="12" >
                    <a-input-password :maxLength='30' allowClear  v-model.trim="userPwd" placeholder="请输入密码"  />
                </a-col>
            </a-row>

            <a-row class="row">
                <a-col offset="4" span="4">
                   <label>
                        确认密码
                        <a-tooltip>
                            <template #title>
                                密码必须包含大写字母,小写字母,数字,和特殊符号[!@#$%^&*]
                            </template>
                            <a-icon type="info-circle" />
                        </a-tooltip>
                    </label>
                </a-col>
                <a-col span="12">
                    <a-input-password :maxLength='30' allowClear v-model.trim="confirmPwd" placeholder="请确认密码" />
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
                    <label>
                        {{registerType}}
                        <a-tooltip>
                            <template #title>
                                请输入正确的号码
                            </template>
                            <a-icon type="info-circle" />
                        </a-tooltip>
                    </label>
                </a-col>
                <a-col span="12">
                    <a-input allowClear :maxLength='11' v-model.trim="userPhone" placeholder="请输入号码" >
                        <a-icon slot='suffix' type="phone" />
                    </a-input>
                </a-col>
            </a-row>

            <a-row class="row">
                <a-col offset="4" span="4">
                    <label>
                        昵称
                        <a-tooltip>
                            <template #title>
                                请输入昵称
                            </template>
                            <a-icon type="info-circle" />
                        </a-tooltip>
                    </label>
                </a-col>
                <a-col span="12">
                    <a-input allowClear :maxLength='30' v-model.trim="userName" placeholder="请输入昵称" >
                        <a-icon slot='suffix' type="user" />
                    </a-input>
                </a-col>
            </a-row>

            <a-row class="row">
                 <a-col offset="4" span="4">
                    <label>
                        密码
                        <a-tooltip>
                            <template #title>
                                密码必须包含大写字母,小写字母,数字,和特殊符号[!@#$%^&*]
                            </template>
                            <a-icon type="info-circle" />
                        </a-tooltip>
                    </label>
                </a-col>
                <a-col span="12" >
                    <a-input-password :maxLength='30' allowClear v-model.trim="userPwd" placeholder="请输入密码" />
                </a-col>
            </a-row>

            <a-row class="row">
                <a-col offset="4" span="4">
                    <label>
                        确认密码
                        <a-tooltip>
                            <template #title>
                                密码必须包含大写字母,小写字母,数字,和特殊符号[!@#$%^&*]
                            </template>
                            <a-icon type="info-circle" />
                        </a-tooltip>
                    </label>
                </a-col>
                <a-col span="12">
                    <a-input-password :maxLength='30' allowClear v-model.trim="confirmPwd" placeholder="请确认密码" />
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
import { VALID_PHONE, VALID_EMAIL, VALID_PWD } from '../resources/valid.js';
import { REGISTER_USER_EMAIL,  REGISTER_USER_PHONE } from '../resources/url.js';


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
            return VALID_EMAIL(this.userEmail);
        },

        validPhone:function(){
            return VALID_PHONE(this.userPhone);
        },

        validName:function(){
            return this.userName.length > 0;
        },

        validPwd:function(){
            let equal = this.userPwd === this.confirmPwd;
            return equal && VALID_PWD(this.userPwd)
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

            this.register(REGISTER_USER_EMAIL,fd,AXIOS_POST_CONFIG);
        },

        registerWithPhone:function(){
            let fd = new FormData();
            fd.append('userPhone',this.userPhone);
            fd.append('userName',this.userName);
            fd.append('userPwd',this.userPwd);

            this.register(REGISTER_USER_PHONE,fd,AXIOS_POST_CONFIG);
        },

        registerSuccess:function({id,userName}){
            this.$store.dispatch('login',{uid:id, userName:userName});
            this.$router.replace('/book-list')
        },

        registerFail:function(){
            alert("注册信息错误,请输入正确的信息,注意密码必须包含大写字母,小写字母,数字,和特殊符号[!@#$%^&*]");
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