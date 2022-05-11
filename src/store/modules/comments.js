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
        commentLike({rootGetters}, commentId) {
            const userId = rootGetters["users/currentUser"]?.id;
            if (!userId) {
                return false;
            }
            const url = `/comments/${commentId.commentId}`;
            appAxios.get(url).then(({data: comment}) => {
                comment.like.includes(userId) ?
                    appAxios.put(`${url}`, {...comment, like: [...comment.like.slice(0, comment.like.indexOf(userId)), ...comment.like.slice(comment.like.indexOf(userId) + 1)]}) :
                    appAxios.put(`${url}`, {...comment, like: [...comment.like, userId]});
            });
        },
        commentDislike({rootGetters}, commentId) {
            const userId = rootGetters["users/currentUser"]?.id;
            if (!userId) {
                return false;
            }
            const url = `/comments/${commentId.commentId}`;
            appAxios.get(url).then(({data: comment}) => {
                comment.dislike.includes(userId) ?
                    appAxios.put(`${url}`, {...comment, dislike: [...comment.dislike.slice(0, comment.dislike.indexOf(userId)), ...comment.dislike.slice(comment.dislike.indexOf(userId) + 1)]}) :
                    appAxios.put(`${url}`, {...comment, dislike: [...comment.dislike, userId]});
            });
        }
    },
    getters: {
        commentList: state => state.list
    }
}
