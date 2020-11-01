<template>
    <div>
        <div class="empty-height-space"></div>
        <div class="empty-height-space"></div>

        <a-row >
            <a-col offset="20" span="4"> 
                <a-button @click="logout" >退出登录</a-button>
            </a-col>
        </a-row>

        <div class="empty-height-space"></div>

        <a-row>

            <a-col offset="2" span='4'>
            </a-col>

            <a-col span='8'>
                <a-input v-model.trim="keyword" :maxLength='15' allowClear placeholder="请输入关键字进行搜索" >
                    <template #suffix>
                        <a-icon type='search' />
                    </template>
                </a-input>
            </a-col>

            <a-col span='1'></a-col>

            <a-col span='5'>
                <a-space>
                    <a-tooltip>
                        <template #title>
                            关键字作为书名的关键字来搜索
                        </template>
                        <a-button type='primary' @click="getBykeyword" :disabled="cannotSearch" >书名<a-icon type='search' /></a-button>
                    </a-tooltip>
                
                    <a-tooltip>
                        <template #title>
                            关键字作为作者名的关键字来搜索
                        </template>
                        <a-button  type='primary' @click="getByAuthorKeyword"  :disabled="cannotSearch" >作者<a-icon type='search' /></a-button>
                    </a-tooltip>
                </a-space>
            </a-col>
        </a-row>

        <div class="empty-height-space"></div>

        <a-row>
            <a-col offset="6" span="18">
                <a-list item-layout="horizontal" :data-source="bookList" :pagination="pagination" >
                    <template #renderItem="book" >
                        <a-list-item @click="toBookDetail(book.id)">
                            <a-list-item-meta :description="'作者: '+book.bookAuthor"  >
                                <template #title>
                                    <a >{{book.bookName}}</a>
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </template>
                </a-list>
            </a-col>
        </a-row>

        <div class="empty-height-space"></div>

    </div>
</template>

<script>

import {AXIOS_POST_CONFIG} from '../resources/config.js';

import {FIND_BOOK_ALL,FIND_BOOK_KEYWORD,FIND_BOOK_AUTHOR_KEYWORD} from '../resources/url.js'

export default {
    name:'BookList',

    computed:{
        uid:function(){
            return this.$store.getters.getUid;
        },
        userName:function(){
            return this.$store.getters.getUserName;
        },
        count:function(){
            return this.bookList.length;
        },
        cannotSearch:function(){
            return !this.validKeyword();
        }
    },

    data:function(){
        return {
            keyword:'',
            bookList:[{
                id:1,
                bookAuthor:'HHH',
                bookName:'LHK',
                description:'Hello',
            }],
            pagination:{
                simple:true,
                pageSize:10
            },
        }
    },

    methods:{

        logout:function(){
            this.$store.dispatch('logout');
            this.$router.replace('login');
        },

        validKeyword:function(){
            return this.keyword.length>0;
        },

        clearInfo:function(){
            this.keyword='';
        },

        handleData:function(books){
            this.clearInfo();
            this.bookList = books;
        },

        handleFail:function(){
            alert("未找到书籍");
            this.clearInfo();
            this.bookList = [];
        },

        getData:function(url,fd,cfg){
            this.axios.post(url,fd,cfg).then((response)=>{
                let books = response.data;
                if(books){
                    this.handleData(books);
                }
                else{
                    this.handleFail();
                }
            }).catch((e)=>{
                console.log(e);
                this.handleFail();
            });
        },

        getAll:function(){
            let fd = new FormData();
            this.getData(FIND_BOOK_ALL,fd,AXIOS_POST_CONFIG);
        },

        getBykeyword:function(){
            let fd = new FormData();
            fd.append("keyword",this.keyword);
            this.getData(FIND_BOOK_KEYWORD,fd,AXIOS_POST_CONFIG);
        },

        getByAuthorKeyword:function(){
            let fd = new FormData();
            fd.append("authorKeyword",this.keyword);
            this.getData(FIND_BOOK_AUTHOR_KEYWORD,fd,AXIOS_POST_CONFIG);
        },

        toBookDetail:function(bookId){
            this.$router.push({
                name:'book-detail',
                params:{ bookId:bookId }
            });
        },

    },

    created:function(){
        this.getAll();
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