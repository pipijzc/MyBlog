import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/public/global.css'

// import './ele/index'
// import 'element-ui/lib/theme-chalk/index.css'


import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
// import 'highlight.js/styles/vs2015.css'
// import 'highlight.js/styles/atelier-forest-light.css'
import VueQuillEditor from 'vue-quill-editor'
import waterfall from 'vue-waterfall2'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
Vue.use(waterfall)
Vue.use(VueQuillEditor)


import axios from 'axios'
Vue.config.productionTip = false
    // axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true
Vue.prototype.$http = axios
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')