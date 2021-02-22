<template>
  <CToaster position="bottom-right">
    <template v-for="toast in getToasters">
      <CToast :key="'toast' + toast.id" :class="toast.class" :show="true">{{
        toast.message
      }}</CToast>
    </template>
  </CToaster>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Toaster",
  computed: {
    ...mapGetters(["getToasters"])
  }
};
</script>
