<template>
  <div
    class="d-flex flex-column"
    :style="`min-height: ${getScreen.availHeight - 170}px`"
  >
    <div class="box-container col-11 col-sm-8 p-0 pt-3 pb-4"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DynamicSubDepartment",
  data: () => ({
    mainDepartment: "",
    subDepartment: ""
  }),
  computed: {
    ...mapGetters(["getScreen"])
  },
  mounted() {
    const {
      params: { mainDept, dept }
    } = this.$route;
    this.mainDepartment = mainDept;
    this.subDepartment = dept;
  }
};
</script>
