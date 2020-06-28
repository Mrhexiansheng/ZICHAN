import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/Login'
import Main from './pages/Main'
import Property from './pages/Property'
import Recipients from './pages/Recipients'
import Assetslist from './pages/Assetslist'
import Borrow from './pages/Borrow'
import Repair from './pages/Repair'
import Dashboader from './pages/Dashboader'
import Message from './pages/Message'
import Scrap from './pages/Scrap'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/main",
      name: "main",
      component: Main,
      children: [
        {
          path: "property",
          name:"property",
          component: Property
        },
        {
          path: "recipients",
          name:"recipients",
          component: Recipients
        },
        {
          path:"assetslist",
          name:"assetslist",
          component:Assetslist
        },
        {
          path:"borrow",
          name:"borrow",
          component:Borrow
        },
        {
          path:"repair",
          name:"repair",
          component:Repair
        },
        {
          path:"dashboader",
          name:"dashboader",
          component:Dashboader
        },
        {
          path:"message",
          name:"message",
          component:Message
        },
        {
          path:"sarap",
          name:"sarap",
          component:Scrap
        },
      ]
    },
  ]
})
