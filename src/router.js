import Vue from 'vue'
import VueRouter from 'vue-router'


import auth from '@/util/auth'
/*offer*/
const Offer_Create = r => require.ensure([], () => r(require('@/views/Offer/pages/Create.vue')), 'offer_create')
const Offer_Detail = r => require.ensure(['@/views/Offer/pages/Detail.vue'], () => r(require('@/views/Offer/pages/Detail.vue')), 'offer_detail')


Vue.use(VueRouter)

function requireAuth(to, from, next) {
    if (!auth.loggedIn()) {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })

    } else {
        next()
    }
}
function requirePass(to,from,next) {
    next()
}


const router = new VueRouter({
    base: __dirname,
    mode: 'history',
    routes: [
        { path: '/p_create_offer', component: Offer_Create, beforeEnter: requireAuth },
        { path: '/p_manage_offer', component: Offer_Detail, beforeEnter: requireAuth },
    ]
})

let  to_path = ""
router.beforeEach((to, from, next) => {
    try{
        console.log("from: " + from.fullPath)
        console.log("to path: " + to.fullPath)
        to_path = to.fullPath
        next() // 确保一定要调用 next()
    }catch(e){
        location.href = "./" + to.fullPath
        next(e)
    }

})

router.onError(function(error){
    location.href = "./" + to_path
})
export default router
