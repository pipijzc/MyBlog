import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

const Home = () =>
    import ('../page/Home/Home.vue')
const Bug = () =>
    import ('../page/Home/Bug/Bug.vue')
const Edit = () =>
    import ('../page/Edit/Edit.vue')
const All = () =>
    import ('../page/Home/All/All.vue')

const Detail = () =>
    import ('../components/Detail/Detail.vue')
const Login = () =>
    import ('../page/Login/Login.vue')
const FriendMessage = () =>
    import ('../page/Home/FriendMessage/FriendMessage.vue')
const Replay = () =>
    import ('../page/Edit/Replay/Replay.vue')

const Music = () =>
    import ('../page/Home/music/Music.vue')

import Think from '../page/Home/Think/Think.vue'

Vue.use(VueRouter)


const router = new VueRouter({
    routes: [{
            path: '/home',
            component: Home,
            children: [
                { path: '/home/bug', component: Bug, },
                { path: '/home/note', component: Bug, },
                { path: '/home/js', component: Bug, },
                { path: '/home/example', component: Bug, },
                { path: '/home/daily', component: Bug, },
                { path: '/home/think', component: Think, },
                { path: '/home/all', component: All, },
                { path: '/home/friendmessage', component: FriendMessage, },
                {
                    path: '/home/music',
                    component: Music
                }
            ]
        },
        { path: '/', redirect: '/home/all' },
        {
            path: '/edit',
            component: Edit,
            beforeEnter: (to, from, next) => {
                let token = localStorage.getItem('Authorization')
                if (token) {
                    next()
                } else {
                    next('/')
                }
            }
        },
        {
            path: '/edit/replay',
            component: Replay,
            beforeEnter: (to, from, next) => {
                let token = localStorage.getItem('Authorization')

                if (token) {
                    next()
                } else {
                    next('/')
                }
            }
        },
        {
            path: '/detail',
            component: Detail
        },
        {
            path: '/login',
            component: Login
        },

    ]
})


export default router