<template>
    <div>
        This is book detail
    </div>
</template>

<script>
export default {
    name:'BookDetail',

    props:{
        bookId:-1,
    },

    data:function(){
        return {
            book:{}
        }
    }
}
</script>