<template>
    <a-layout :style="{ marginLeft: '20px', marginRight: '20px' }">
        <a-layout-header :style="{ background: '#fff', padding: 0, width:'100%' }" >
            <a-row>
                <a-col span='4'>
                    <a-button :disabled='cannotPre' @click="prevChapter">
                        <a-icon type="left" />上一章
                    </a-button>
                </a-col>
                <a-col span='12' >
                    <h1 :style="{textAlign:'center'}">{{chapter.chapterName}}</h1>
                </a-col>
                <a-col span='4'>
                    <a-button  @click="showDrawer" >
                        目录<a-icon type="ordered-list" />
                    </a-button>
                </a-col>
                <a-col span='4'>
                    <a-button :disabled='cannotNext' @click="nextChapter">
                        下一章<a-icon type="right" />
                    </a-button>
                </a-col>
            </a-row>
        </a-layout-header>

        <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial',width:'95%' }">
            <pre class="content-container">
                {{chapter.chapterContent}}
            </pre>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center' }">
            <a-row>
                <a-col offset="2" span="4">
                    <a-button :disabled='cannotPre' @click="prevChapter">
                        <a-icon type="left" />上一章
                    </a-button>
                </a-col>
                <a-col offset='2' span='4'>
                    <a-button  @click="showDrawer" >
                        目录<a-icon type="ordered-list" />
                    </a-button>
                </a-col>
                <a-col offset="2" span="4">
                    <a-button :disabled='cannotNext' @click="nextChapter">
                        下一章<a-icon type="right" />
                    </a-button>
                </a-col>
            </a-row>
            <br />
            Small Reader &copy;LHK
        </a-layout-footer>
        <div>
            <a-drawer
            title="目录"
            placement="left"
            :closable="false"
            :visible="drawerVisible"
            @close="onDrawerClose"
            >
                <a-list item-layout="horizontal" :data-source="chapterList" :pagination="pagination">
                    <template #renderItem="chapter,index">
                        <a-list-item @click="toChapterWithIndex(index,chapter.id)">
                            <a-list-item-meta>
                                <template #title>
                                    {{chapter.chapterName}}
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </template>
                </a-list>
            </a-drawer>
        </div>
    </a-layout>
</template>

<script>

import { AXIOS_POST_CONFIG } from '../resources/config.js';
import { FIND_CHAPTER_BOOK_ID, FIND_CHAPTER_ID, FIND_CHAPTER_BOOK_ID_KEYWORD } from '../resources/url.js';

export default {
    name:'ChapterView',

    computed:{
        cannotPre:function(){
            return this.index <= 0;
        },
        cannotNext:function(){
            return this.index >= this.chapterList.length;
        }
    },
    
    data:function(){
        return {
            chapterList:[],
            chapter:{},
            lines:[],
            keyword:'',
            bookId:-1,
            index:0,
            drawerVisible:false,

            pagination:{
                simple:true,
                pageSize:12,
                size:'small'
            },

        }
    },

    methods:{
        backToBookDetail:function(){
            this.$router.replace({
                name:'book-detail',
                params:{
                    bookId:this.bookId
                }
            });
        },

        clearInfo:function(){
            this.keyword = '';
        },

        showDrawer:function(){
            this.drawerVisible = true;
        },

        onDrawerClose:function(){
            this.drawerVisible = false;
        },

        handleChapters:function(chapters){
            this.chapterList = chapters;
            this.clearInfo();
        },

        handleChapter:function(chapter){
            this.chapter = chapter;
            this.chapter.chapterContent = this.decodeContent(chapter.chapterContent);
            this.clearInfo();
        },

        handleFail:function(){
            alert("获取章节失败");
            this.clearInfo();
        },

        getChapters:function(url,fd,cfg){
            this.axios.post(url,fd,cfg).then((response)=>{
                let chapters = response.data;
                if(chapters){
                    this.handleChapters(chapters);
                }
                else{
                    this.handleFail();
                }
            }).catch((e)=>{
                console.log(e);
                this.handleFail();
            });
        },

        getChaptersDefault:function(url,fd,cfg){
            this.axios.post(url,fd,cfg).then((response)=>{
                let chapters = response.data;
                if(chapters){
                    this.handleChapters(chapters);
                    this.getChapterById(chapters[0].id);
                }
                else{
                    this.handleFail();
                }
            }).catch((e)=>{
                console.log(e);
                this.handleFail();
            });
        },

        getChapter:function(url,fd,cfg){
            this.axios.post(url,fd,cfg).then((response)=>{
                let chapters = response.data;
                if(chapters){
                    this.handleChapter(chapters[0]);
                }
                else{
                    this.handleFail();
                }
            }).catch((e)=>{
                console.log(e);
                this.handleFail();
            });
        },

        getChaptersByBookId:function(){
            let fd = new FormData();
            fd.append("bookId",this.bookId);
            this.getChapters(FIND_CHAPTER_BOOK_ID,fd,AXIOS_POST_CONFIG);
        },

        getChapterById:function(chapterId){
            let fd = new FormData();
            fd.append("chapterId",chapterId);
            this.getChapter(FIND_CHAPTER_ID,fd,AXIOS_POST_CONFIG);
            this.moveToTop();
        },

        getChapterByBookIdAndKeyword:function(){
            let fd = new FormData();
            fd.append("bookId",this.bookId);
            fd.append("chapterKeyword",this.keyword);
            this.getChapters(FIND_CHAPTER_BOOK_ID_KEYWORD,fd,AXIOS_POST_CONFIG);
        },

        init:function(){
            let fd = new FormData();
            fd.append("bookId",this.bookId);
            this.getChaptersDefault(FIND_CHAPTER_BOOK_ID,fd,AXIOS_POST_CONFIG);
        },

        moveToTop:function(){
            window.scrollTo(top);
        },

        prevChapter:function(){
            if(!this.cannotPre){
                this.index -= 1;
                let id = this.chapterList[this.index].id;
                this.getChapterById(id);
                
            }
        },

        nextChapter:function(){
            if(!this.cannotNext){
                this.index += 1;
                let id = this.chapterList[this.index].id;
                this.getChapterById(id);
            }
        },

        toChapterWithIndex:function(index,id){
            this.index = index;
            this.getChapterById(id);
            this.onDrawerClose();
        },

        decodeContent(content){
            let lines = content.split('\n');
            lines.forEach((value,index)=>{
                lines[index] = "  "+value.trim()+"\n";
            });
            return lines.join("");
        }
    },

    created:function(){
        this.bookId = this.$route.params.bookId;
        this.init();
    }
    
}
</script>

<style>

.content-container{
    white-space: pre-wrap;
    background-color:inherit;
    color: #000;
}

</style>