<template>
    <div>
        <div class="empty-height-space" />
        <div class="empty-height-space" />
        <a-row v-if="book">
            <a-col offset="4" span="16">
                <a-card :title="book.bookName" style="width: 300px">
                    <p><label><b>作者</b></label> {{book.bookAuthor}}</p>
                    <p><label><b>描述</b></label> {{book.bookDescription}}</p>
                </a-card>
                <a-space>
                    <a-button @click="backBookList">
                        <a-icon type="double-left" />返回
                    </a-button>
                    <a-button type="primary" @click="toChapterView">
                        阅读<a-icon type="double-right" />
                    </a-button>
                </a-space>
            </a-col>
        </a-row>
        <div v-else>Book Not Found</div>
    </div>
</template>

<script>

import {AXIOS_POST_CONFIG} from '../resources/config'
import {FIND_BOOK_ID} from '../resources/url'

export default {
    name:'BookDetail',

    data:function(){
        return {
            book:{},
            bookId:-1,
        }
    },

    methods:{
        handleData:function(book){
            this.book = book;
        },

        handleFail:function(){
            alert("未找到书籍");
            this.book = {};
        },

        getBook:function(){
            let fd = new FormData();
            fd.append('bookId',this.bookId);
            this.axios.post(FIND_BOOK_ID,fd,AXIOS_POST_CONFIG).then((response)=>{
                let books = response.data;
                if(books){
                    this.handleData(books[0]);
                }
                else{
                    this.handleFail();
                }
            }).catch((e)=>{
                console.log(e);
                this.handleFail();
            });
        },

        backBookList:function(){
            this.$router.replace({
                name:'book-list',
            });
        },

        toChapterView:function(){
            this.$router.push({
                name:'chapter-view',
                params:{
                    bookId:this.bookId
                }
            });
        }
    },

    created:function(){
        this.bookId = this.$route.params.bookId;
        this.getBook();
    }
}
</script>


<style scoped>
.empty-height-space{
    height: 20px;
}

.empty-width-space{
    width: 20px;
}

</style>