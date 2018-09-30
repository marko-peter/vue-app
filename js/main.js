const FirstRoute = { template: '<home></home>' }
const SecondRoute = { template: '<detail></detail>' }
const App = { template: '<div id="app" class="container"><router-view/></div>' }

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {path:'/', component: FirstRoute},
    {path: '/detail/:id', component: SecondRoute}
  ]
})

new Vue({
router,
render: h => h(App)
}).$mount("#app");