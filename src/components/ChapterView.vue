<template>
    <div>
        This is chapter view
    </div>
</template>

<script>
export default {
    name:'ChapterView',
    props:{
        bookId:-1,
    },
    
    data:function(){
        return {
            chapterList:[],
            chapter:{}
        }
    }
    
}
</script>