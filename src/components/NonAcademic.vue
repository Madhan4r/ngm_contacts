<template>
  <div
    class="d-flex flex-column"
    :style="`min-height: ${getScreen.availHeight - 170}px`"
  >
    <div class="box-container col-11 col-sm-8 p-0 pt-3 pb-4">
      <h5 class="text-center mb-4">Non-Academic Staffs</h5>
      <CRow>
        <CCol
          md="6"
          class="content-center"
          v-for="(data, index) in getNonAcademicDept"
          :key="index"
        >
          <CButton
            class="btn-dept-color"
            :style="`background-color:${getRandomColor}`"
            @click="navigateTo(`/dynamic-sub-dept/non-academic/${data.id}`)"
            >{{ data.id | formatDepartment }}</CButton
          >
        </CCol>
        <CCol md="6" class="content-center">
          <CButton
            class="btn-dept-color"
            :style="`background-color:${getRandomColor}`"
            @click="createMainDept()"
            >+ DEPARTMENT</CButton
          >
        </CCol>
      </CRow>
    </div>
    <add-department
      v-if="showAddDepartmentModal"
      :isShowPopup="showAddDepartmentModal"
      @modalCallBack="addmodalCallBack"
      :existingDepartments="getNonAcademicDept"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddDepartment from "./reusable/AddDepartment.vue";

export default {
  components: { AddDepartment },
  name: "NonAcademic",
  data: () => ({
    showAddDepartmentModal: false
  }),
  computed: {
    ...mapGetters(["getScreen", "getNonAcademicDept", "getRandomColor"])
  },
  filters: {
    formatDepartment(value) {
      return value.toUpperCase().replaceAll("_", " ");
    }
  },
  methods: {
    ...mapActions(["createDepartment"]),
    createMainDept() {
      this.showAddDepartmentModal = true;
    },
    addmodalCallBack(action, value) {
      if (action) {
        this.createDepartment({ collection: "non_academic", doc_id: value });
      }
      this.showAddDepartmentModal = false;
    },
    navigateTo(path) {
      this.$router.push(path);
    }
  }
};
</script>
