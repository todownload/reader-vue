<template>
    <div>
        This is book list
        <a-button @click="$store.dispatch('logout'); $router.replace('login')" >退出登录</a-button>
    </div>
</template>

<script>
export default {
    name:'BookList',

    data:function(){
        return {
            bookList:[]
        }
    }
}
</script>