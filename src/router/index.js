import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import BookList from '../components/BookList.vue';
import BookDetail from '../components/BookDetail';
import ChapterView from '../components/ChapterView.vue';
import NotFound from '../components/NotFound.vue';

const router = new VueRouter({
    routes:[
        {
            path:'/',
            redirect:'/login',
            meta:{requireAuth:false}
        },
        {
            path:'/login',
            component:Login,
            name:'login',
            meta:{requireAuth:false}
        },
        {
            path:'/register',
            component:Register,
            name:'register',
            meta:{requireAuth:false}
        },
        {
            path:'/book-list',
            component:BookList,
            name:'book-list',
            meta:{requireAuth:true}
        },
        {
            path:'/book-detail',
            component:BookDetail,
            name:'book-detail',
            meta:{requireAuth:true},
            beforeEnter:function(to,from,next){
                let bookId = to.params.bookId ;
                if(bookId&&bookId>0){
                    next();
                }
                else{
                    next({name:'book-list'});
                }
            }
        },
        {
            path:'/chapter-view',
            component:ChapterView,
            name:'chapter-view',
            meta:{requireAuth:true},
            beforeEnter:function(to,from,next){
                let bookId = to.params.bookId ;
                if(bookId&&bookId>0){
                    next();
                }
                else{
                    next({name:'book-list'});
                }
            }
        },
        {
            path:'*',
            component:NotFound,
            name:'not-found',
            meta:{requireAuth:false}
        }
    ]
});

export default router;