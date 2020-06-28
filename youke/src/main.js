import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false;
Vue.use(ElementUI);
router.beforeEach((to, from, next) => {
    if (window.sessionStorage.login === "admin" || to.name === "login") {
    next();
  } else {
    next({name: "login"});
  }
});
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

