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
    // const Think = () =>
    //     import ('../page/Home/Think/Think.vue')
const Detail = () =>
    import ('../components/Detail/Detail.vue')
const Login = () =>
    import ('../page/Login/Login.vue')
    // import Home from '../page/Home/Home.vue'
    // import Bug from '../page/Home/Bug/Bug.vue'
import Think from '../page/Home/Think/Think.vue'
// import Edit from '../page/Edit/Edit.vue'
// import Example from '../page/Home/Example/Example.vue'
Vue.use(VueRouter)


const router = new VueRouter({
    routes: [{
            path: '/home',
            component: Home,
            children: [
                { path: '/home/bug', component: Bug },
                { path: '/home/note', component: Bug },
                { path: '/home/js', component: Bug },
                { path: '/home/example', component: Bug },
                { path: '/home/think', component: Think },
                { path: '/home/all', component: All },
            ]
        },
        { path: '/', redirect: '/home/all' },
        {
            path: '/edit',
            component: Edit,
            beforeEnter: (to, from, next) => {
                // ...
                if (store.state.userinfo.data) {
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
        }
    ]
})


export default router