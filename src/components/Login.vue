<template>


    <div class="container-body">
    
        <a-row class="row">
            <a-col offset="8" span="4">
                <a @click="changeLoginType"><a-icon type="swap" />切换</a>
            </a-col>
            <a-col  span="4">
                <b>{{loginType}}登录</b>
            </a-col>
            
            <a-col  span="4" >
                <a @click="toRegister"><a-icon type="user-add" />注册</a>
            </a-col>
        </a-row>

        <div v-if='emailLogin'>

            <a-row class="row">
                <a-col offset="4" span="4">
                    <label>
                        {{loginType}}
                        <a-tooltip>
                            <template #title>
                                请输入正确的邮箱
                            </template>
                            <a-icon type="info-circle" />
                        </a-tooltip>
                    </label>
                </a-col>
                <a-col span="12">
                    <a-input allowClear :maxLength='30' v-model.trim="userEmail" >
                        <a-icon slot='suffix' type="mail" />
                    </a-input>
                </a-col>
            </a-row>

            <a-row class="row">
                 <a-col offset="4" :maxLength='30' span="4">
                    <label>
                        密码
                        <a-tooltip>
                            <template #title>
                                请输入正确的密码
                            </template>
                            <a-icon type="info-circle" />
                        </a-tooltip>
                    </label>
                </a-col>
                <a-col span="12" >
                    <a-input-password allowClear  v-model.trim="userPwd"  />
                </a-col>
            </a-row>

            <a-row class="row">
                <a-col offset="8" span="12">
                    <a-button-group>
                        <a-button class="btn" type="primary" :disabled="canLoginWithEmail" @click="loginWithEmail" >登录<a-icon type="login" /></a-button>
                        <a-button class="btn" @click="clearUserInfo" type="danger">清除<a-icon type="delete" /></a-button>
                    </a-button-group>
                </a-col>
            </a-row>

        </div>

        <div v-else>

            <a-row class="row">
                <a-col offset="4" span="4">
                    <label>
                        {{loginType}}
                        <a-tooltip>
                            <template #title>
                                请输入正确的号码
                            </template>
                            <a-icon type="info-circle" />
                        </a-tooltip>
                    </label>
                </a-col>
                <a-col span="12">
                    <a-input allowClear :maxLength='11' v-model.trim="userPhone" >
                        <a-icon slot='suffix' type="phone" />
                    </a-input>
                </a-col>
            </a-row>

            <a-row class="row">
                 <a-col offset="4" span="4">
                    <label>
                        密码
                        <a-tooltip>
                            <template #title>
                                请输入正确的密码
                            </template>
                            <a-icon type="info-circle" />
                        </a-tooltip>
                    </label>
                </a-col>
                <a-col span="12" >
                    <a-input-password :maxLength='30' allowClear v-model.trim="userPwd" />
                </a-col>
            </a-row>

            <a-row class="row">
                <a-col offset="8" span="12">
                    <a-button-group>
                        <a-button class="btn" type="primary" :disabled="canLoginWithPhone" @click="loginWithPhone" >登录<a-icon type="login" /></a-button>
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
import {VALID_PHONE,VALID_EMAIL,VALID_PWD} from '../resources/valid.js'

export default {
    name:'Login',

    data:function(){
        return {
            loginType:EMAIL_CHN,
            emailLogin:true,
            userEmail:'',
            userPhone:'',
            userPwd:'',
            emailLoginUrl:'/reader/user/login/email',
            phoneLoginUrl:'/reader/user/login/phone',
        }
    },

    computed:{
        canLoginWithEmail:function(){
            return !(this.validEmail() && this.validPwd());
        },
        canLoginWithPhone:function(){
            return !(this.validPhone() && this.validPwd());
        }
    },

    

    methods:{
        changeLoginType:function(){
            if(this.loginType === EMAIL_CHN){
                this.loginType = PHONE_CHN;
                this.emailLogin = false;
            }else{
                this.loginType = EMAIL_CHN;
                this.emailLogin = true;
            }
        },

        toRegister:function(){
            this.$router.replace("/register")
        },

        validEmail:function(){
            return VALID_EMAIL(this.userEmail);
        },

        validPhone:function(){
            return VALID_PHONE(this.userPhone);
        },

        validPwd:function(){
            return VALID_PWD(this.userPwd);
        },

        login:function(url,fd,cfg){
            this.axios.post(url,fd,cfg).then((response)=>{
                let userList = response.data;
                if(userList&&userList.length>0){
                    this.loginSuccess(userList[0]);
                }
                else{
                    this.loginFail();
                }
            }).catch((e)=>{
                console.log(e);
                this.loginFail();
            });
        },

        loginWithEmail:function(){
            let fd = new FormData();

            fd.append('userEmail',this.userEmail);
            fd.append('userPwd',this.userPwd);

            this.login(this.emailLoginUrl,fd,AXIOS_POST_CONFIG);
        },

        loginWithPhone:function(){
            let fd = new FormData();
            fd.append('userPhone',this.userPhone);
            fd.append('userPwd',this.userPwd);

            this.login(this.phoneLoginUrl,fd,AXIOS_POST_CONFIG);
        },

        loginSuccess:function({id,userName}){
            this.$store.dispatch('login',{uid:id, userName:userName});
            this.$router.replace('/book-list')
        },

        loginFail:function(){
            alert("账号密码错误");
            this.clearUserInfo();
        },

        clearUserInfo:function(){
            this.userEmail='';
            this.userPhone='';
            this.userPwd='';
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