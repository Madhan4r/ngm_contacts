<template>
  <div id="app">
    <Header />
    <router-view />
    <loader v-if="isLoading" />
    <toaster />
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import toaster from "./components/reusable/Toaster";
import Loader from "./Loader.vue";

export default {
  components: { toaster, Header, Footer, Loader },
  name: "App",
  computed: {
    ...mapGetters(["isLoading"])
  }
};
</script>

<style lang="scss">
@import "assets/scss/custom";

#app {
  margin-top: 65px;
  margin-bottom: 30px;
}
</style>
