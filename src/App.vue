<template>
  <div id="app">
    <Header />
    <router-view />
    <toaster />
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import toaster from "./components/reusable/Toaster";

export default {
  components: { toaster, Header, Footer },
  name: "App"
};
</script>

<style lang="scss">
@import "assets/scss/custom";

#app {
  margin-top: 65px;
  margin-bottom: 30px;
}
</style>
