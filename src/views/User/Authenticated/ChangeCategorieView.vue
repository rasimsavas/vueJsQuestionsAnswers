<template>
    <AppHeader/>
    <div class="row mt-3">
    <div class="col-2">
    <div class="list-group">
      <a
          v-for="(category, index) in categoryList"
          :key="category.id" href="#"
          :class="{ active : category.selected }"
          @click="(category.selected = !category.selected)"
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center category-item"
          aria-current="true">
        <div>
          <i :class="{ [colorMap[index % 8]] : true }" class="fa fa-hashtag custom-text-light me-2"></i>
          <span> {{ category.title }} </span>
        </div>
        <i v-if="category.selected" class="check-icon fa fa-check-circle"></i>
      </a>
           </div>
    </div>
        <div class="col-4 offset-4">
          <div class="card">
            <div class="card-header text-center">Kategori Ekle</div>
            <div class="card-body">
              <div class="mb-3">
                <label class="form-label">Kategori Adi</label>
                <input type="text" v-model="ekleCategorie" class="form-control" placeholder="silmek icin sol taraftan seciniz..">
                </div>
                <div class="mb-3">
                  </div><div class="mb-3">
                    <label class="form-label"></label>
                    <button @click="ekle" class="btn btn-sm btn-primary">Ekle</button>
                    <button @click="sil" class="btn btn-sm btn-primary">Sil</button>
                </div>
              </div>
              <router-link @click="kaydet" :to="{ name : 'HomeView'}" class="btn btn-primary me-0 mb-2">Kaydet</router-link>
          </div>
        </div>                
    </div>
</template>


<script>
import AppHeader from "@/components/AppShared/AppHeader";
import {mapGetters} from "vuex";
import appAxios from "@/axios/appAxios";

export default {
  data(){
    return {
      removeCategorie : null,
      ekleCategorie : [],

    }
  },
  computed: {
    ...mapGetters({
      currentUser : "users/currentUser",
      categoryList: "categories/categoryList",
      isAuthenticated: "users/isAuthenticated",
      isAdmin: "users/isAdmin"
    }),
    colorMap() {
      return [
        "text-primary",
        "text-secondary",
        "text-danger",
        "text-info",
        "text-warning",
        "text-success",
        "text-dark",
        "text-muted",
      ]
    }
  },

  methods : {
    kaydet(){
      
      this.$router.push({ name : "HomeView"});

    },
    ekle(){
      if(!this.ekleCategorie.length > 0){
        alert("kategori adi bos olamaz");
      }
      else{
        appAxios.get("/categories").then(() => {

        var time = new Date().getTime();
        appAxios.post("/categories", {title: this.ekleCategorie, id: time } ).then(() => {
          this.$store.dispatch("categories/fetchList");
      })
    }).then(() => {this.ekleCategorie = null;})
      }
      
    
    },
    sil(){
      
      let removeCategorie = this.categoryList.filter(category => category.selected).map(category => category.id);
      if(removeCategorie.length > 0){
        removeCategorie.forEach(element => {
        appAxios.delete(`/categories/${element}`).then(setTimeout(() => this.$store.dispatch("categories/fetchList"), 300) )});
        
          }
        
      else{
        alert("silmek icin sol taraftan seciniz..");
        }
        
      }
      
  },
  name: 'ChangeCategoryView',
  components: {
    AppHeader
  } 
}
</script>

<style scoped>
  .col-4 {
    margin-top: 2rem;
  }
  .btn{
    margin: 1rem;
    
  }
</style>