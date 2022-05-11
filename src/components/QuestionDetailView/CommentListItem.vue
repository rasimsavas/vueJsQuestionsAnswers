<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      comment: this.item,
    }
  },
  methods: {
    likeBtn() {
      if(this.comment.dislike.includes(this.currentUser.id)) {
        return false;
      }
      this.comment.like.includes(this.currentUser.id) ? 
        this.comment.like.splice(this.comment.like.indexOf(this.currentUser.id), 1) : 
        this.comment.like.push(this.currentUser.id);
      this.$store.dispatch("comments/commentLike", {
        commentId: this.comment.id,
      });
    },
    dislikeBtn() {
      if(this.comment.like.includes(this.currentUser.id)) {
        return false;
      }
      this.comment.dislike.includes(this.currentUser.id) ?
        this.comment.dislike.splice(this.comment.dislike.indexOf(this.currentUser.id), 1) :
        this.comment.dislike.push(this.currentUser.id);
      this.$store.dispatch("comments/commentDislike", {
        commentId: this.comment.id,
      });
    }
  },
  computed: {
    ...mapGetters({
      currentUser : "users/currentUser",
    }),
  },
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {
      }
    }
  }
}
</script>
<template>
  <div class="card text-left mb-3 ms-1 w-100">
    <div class="card-body">
      <div class="mt-3">
        <p class="text-muted" v-html="item.details"></p>
      </div>
    </div>
    <div
        class="card-footer text-muted py-2 question-footer d-flex justify-content-between align-items-center"
    >
      <div class="custom-text-light">
        <i class="fa fa-user-circle me-1"></i>
        {{  _createdAtInfo(item.user?.full_name, item?.created_at, 'cevapladı') }}
      </div>
      <div class="question-action-container">
        <a @click="likeBtn" class="like-btn text-muted me-2"><i class="fa fa-thumbs-up text-success"></i>({{ item.like.length ?? 0}})</a>
        <a @click="dislikeBtn" class="dislike-btn text-muted">
          <i class="fa fa-thumbs-down"></i> {{ item.dislike.length ?? 0 }}
        </a>
      </div>
    </div>
  </div>
</template>
