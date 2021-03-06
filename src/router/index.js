import {createRouter, createWebHistory} from 'vue-router'
import AppHeader from "@/components/AppShared/AppHeader";
import store from "@/store";

const routes = [
    {
        path: "/",
        name: "HomeView",
        // component: () => import("@/views/HomeView")
        components: {
            default: () => import("@/views/HomeView"),
            AppHeader
        }
    },
    {
        path: "/question/:id",
        name: "QuestionDetailView",
        // component: () => import("@/views/QuestionDetailView")
        components: {
            default: () => import("@/views/QuestionDetailView"),
            AppHeader
        }
    },
    {
        path: "/favorites",
        name: "MyFavoritesView",
        meta: {authRequired: true},
        // component: () => import("@/views/User/Authenticated/FavoritesView"),
        components: {
            default: () => import("@/views/User/Authenticated/MyFavoritesView"),
            AppHeader
        }
    },
    {
        path: "/my-account",
        name: "MyAccountView",
        meta: {authRequired: true},
        // component: () => import("@/views/User/Authenticated/MyAccountView"),
        components: {
            default: () => import("@/views/User/Authenticated/MyAccountView"),
            AppHeader
        }
    },
    {
        path: "/my-questions",
        name: "MyQuestionsView",
        meta: {authRequired: true},
        // component: () => import("@/views/User/Authenticated/MyQuestionsView"),
        components: {
            default: () => import("@/views/User/Authenticated/MyQuestionsView"),
            AppHeader
        }
    },
    {
        path: "/new-question",
        name: "NewQuestionView",
        meta: {authRequired: true},
        // component: () => import("@/views/User/Authenticated/NewQuestionView"),
        components: {
            default: () => import("@/views/User/Authenticated/NewQuestionView"),
            AppHeader
        }
    },
    // No Header
    {
        path: "/login",
        name: "LoginView",
        component: () => import("@/views/User/LoginView")
    },
    {
        path: "/register",
        name: "RegisterView",
        component: () => import("@/views/User/RegisterView")
    },
    {
        path: "/change-category",
        name: "ChangeCategoryView",
        meta: {authRequired: true, adminRequired: true},
        component: () => import("@/views/User/Authenticated/ChangeCategorieView")

    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, _, next) => {
    const isAuthenticated = store.getters["users/isAuthenticated"]
    const authRequired = to.meta?.authRequired;
    // E??er Gidilmek istenen Sayfa Auth gerekiyorsa ve Kullan??c?? Giri?? Yapm????sa o zaman devam et
    if (authRequired) {
        if (isAuthenticated) return next();
        return next({name: "LoginView"})
    }

    if (isAuthenticated) {
        if (["LoginView", "RegisterView"].includes(to.name)) {
            return next({ name : "HomeView"})
        }
    }
    if (!authRequired) next(); // E??er Gidilmek istenen Sayfa Auth GEREKM??YORSA  o zaman ba??ka bir ??eye bakmadan devam et

})

export default router
