<template>
  <div id="app">
    <router-view />
    <toaster />
  </div>
</template>

<script>
import toaster from "./components/reusable/Toaster";
export default {
  components: { toaster },
  name: "App"
};
</script>

<style lang="scss">
@import "assets/scss/custom";
</style>
