<template>
    <router-view name="AppHeader" :car="this.menuOpened" />
    <router-view/>
    <AppLoading />
</template>

<script>


import AppLoading from "@/components/AppShared/AppLoading"
export default {
  data() {
    return {
      menuOpened: false
    }
  },
  components: {AppLoading},
  methods: {
    myClick(event) {    
      if(event.target.className !== "nav-link dropdown-toggle"){
        var element = document.getElementById('2992')
        if(element.classList.contains("show")){
          element.classList.remove("show");    
          }
        }  
    },
  },
  beforeMount() {
    document.addEventListener("click", this.myClick);
  },
  mounted() {
    this.$store.dispatch("initApp")
  },
  provide() {
    return {
      menuOpened: false,
    }
  },
}
</script>
