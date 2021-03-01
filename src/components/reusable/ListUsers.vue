<template>
  <div
    class="d-flex flex-column"
    :style="`min-height: ${getScreen.availHeight - 170}px`"
  >
    <div class="box-container col-11 col-sm-8 p-0 pt-3 pb-5">
      <CRow style="justify-content: center">
        <user-card
          v-for="(data, index) in getUsers"
          :userDetail="data"
          :key="index"
        />
      </CRow>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ListUsers",
  data: () => ({
    mainDepartment: "",
    subDepartment: ""
  }),
  computed: {
    ...mapGetters(["getUsersByReference", "getScreen"]),
    getUsers() {
      if (this.subDepartment && this.mainDepartment && this.department) {
        return this.getUsersByReference(
          `${this.mainDepartment}/${this.subDepartment}/${this.department}`
        );
      }
      return [];
    }
  },
  methods: {
    ...mapActions([""])
  },
  mounted() {
    const {
      params: { mainDept, subDept, dept }
    } = this.$route;
    this.mainDepartment = mainDept;
    this.subDepartment = subDept;
    this.department = dept;
  }
};
</script>
