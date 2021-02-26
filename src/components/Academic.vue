<template>
  <div
    class="d-flex flex-column"
    :style="`min-height: ${getScreen.availHeight - 170}px`"
  >
    <div class="box-container col-11 col-sm-9 p-0"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Academic",
  computed: {
    ...mapGetters(["getScreen"])
  }
};
</script>
