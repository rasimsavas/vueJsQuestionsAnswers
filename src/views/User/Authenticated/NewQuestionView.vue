<script>
import {mapGetters} from "vuex";
export default {
  data: () => ({
    selectCategory: false,
    selectedCategories: [],
    userData: {
      title : null,
      details : null,
      categoryId : null,
    }
  }),
  methods : {
    onSubmit(){
      const userData = {
        ...this.copy(this.userData),
        created_at : new Date(),
        userId : this.currentUser.id
      }
      console.log(this.categoryList);
      this.$appAxios.post("/questions", userData).then(({ status }) => {
        if(status === 201) {
          const cats = JSON.parse(JSON.stringify(this.selectedCategories));
          cats.includes(userData.categoryId) ? null : cats.push(userData.categoryId);
          this.$store.dispatch("categories/addCategory", {  data:cats });
          this.$router.push({ name : 'HomeView'});
        }
        // else .... Alert... $data.error
      });
    }
  },
  computed: {
    ...mapGetters({
      categoryList: "categories/categoryList",
      currentUser : "users/currentUser"
    })
  },
  beforeMount() {
    const data = JSON.parse(JSON.stringify(this.categoryList)).filter(c => c.selected);
    data.forEach(c => this.selectedCategories.push(c.id));
    this.selectCategory = (data.length == 1) ? data[0].id : false;
  },
  mounted() {
    document.getElementById('question-category').value = (this.selectCategory) ? this.selectCategory : "";
  }
}
</script>
<template>
  <div class="container">
    <div class="row mt-3">
      <div class="col-8 offset-2">
        <div class="card">
          <div class="card-header">
            Yeni Soru
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="question-title" class="form-label"
              >Kısa bir başlık</label
              >
              <input v-model="userData.title" type="text" class="form-control" id="question-title" placeholder="Bu soru çokomelli"/>
            </div>
            <div class="mb-3">
              <label class="form-label">Detaylar</label>
              <quill-editor v-model:value="userData.details"/>
            </div>
            <div class="mb-3">
              <label for="question-category" class="form-label">Kategori</label>
              <select v-model="userData.categoryId" class="form-select" id="question-category">
                <option value="">Lütfen bir kategori seçiniz</option>
                <option v-for="category in categoryList" :value="category.id" :selected="this.selectCategory == category.id" :key="category.id">{{category.title }}</option>
              </select>
            </div>
          </div>

          <div class="card-footer text-muted d-flex justify-content-end align-items-center">
            <button @click="onSubmit" class="btn btn-sm btn-primary">Kaydet</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
