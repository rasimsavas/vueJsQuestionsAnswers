import appAxios from "@/axios/appAxios";


export default {
    namespaced: true,
    state: {
        list: [],
    },
    mutations: {
        setList(state, list) {
            state.list = list;
        }
    },
    actions: {
        fetchList({commit, rootGetters}) {
            appAxios.get("/categories").then(({data: categoryList}) => {
                const currentUser = rootGetters["users/currentUser"];
                const userCategoryID = currentUser?.categoryId;
                const updatedList = categoryList?.map(c => ({ ...c, selected : userCategoryID === c.id }))
                commit("setList", updatedList || [])})
        },
        addCategory({commit}, categoryIds) {
            appAxios.get("/categories").then(({data: categoryList}) => {
                const updatedList = categoryList?.map((c)=>{
                    if (categoryIds.data.includes(c.id)) {
                        c.selected = true;
                    }
                    return c;
                });
                commit("setList", updatedList || [])
            });
        },
    },
    getters: {
        categoryList : state => state.list,
        
        // categoryList(state, getters, rootStates) {
        //     const userCategoryID = rootStates?.users?.user?.categoryId;
        //     return state.list?.map(c => {
        //         return {
        //             ...c,
        //             selected : userCategoryID === c.id
        //         }
        //     })
        // }
    }
}
