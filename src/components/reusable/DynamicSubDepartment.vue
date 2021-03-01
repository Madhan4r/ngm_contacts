<template>
  <div
    class="d-flex flex-column"
    :style="`min-height: ${getScreen.availHeight - 170}px`"
  >
    <div class="box-container col-11 col-sm-8 p-0 pt-3 pb-5">
      <h5 class="text-center">
        {{ `${mainDepartment}-${subDepartment}` | formatDepartment }}
      </h5>
      <CRow>
        <CCol
          col="6"
          class="content-center"
          v-for="(data, index) in getSubDepartment"
          :key="index"
        >
          <CButton
            class="btn-sub-dept-color"
            :style="`background-color:${getRandomColor}`"
            @click="
              navigateTo(
                `/list-users/${mainDepartment}/${subDepartment}/${data.id}`
              )
            "
            >{{ data.id | formatDepartment }}</CButton
          >
        </CCol>
      </CRow>
      <CRow v-if="isAdmin">
        <CCol md="6" class="content-center">
          <CButton
            class="btn-dept-color"
            :style="`background-color:${getRandomColor}`"
            @click="createSubDept()"
            >+ DEPARTMENT</CButton
          >
        </CCol>
        <CCol md="6" class="content-center">
          <CButton
            class="btn-dept-color"
            :style="`background-color:${getRandomColor}`"
            @click="addUser()"
            >+ USER</CButton
          >
        </CCol>
      </CRow>
    </div>
    <add-department
      v-if="showAddDepartmentModal"
      :isShowPopup="showAddDepartmentModal"
      @modalCallBack="addDepartmentCallBack"
      :existingDepartments="getSubDepartment"
    />
    <add-modify-user
      v-if="addModifyUserModal"
      :isShowPopup="addModifyUserModal"
      @modalCallBack="addUserCallBack"
      :existingDepartments="getSubDepartment"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddDepartment from "./AddDepartment.vue";
export default {
  components: { AddDepartment },
  name: "DynamicSubDepartment",
  data: () => ({
    mainDepartment: "",
    subDepartment: "",
    showAddDepartmentModal: false,
    addModifyUserModal: false
  }),
  computed: {
    ...mapGetters([
      "getScreen",
      "getSubDepartment",
      "getRandomColor",
      "isAdmin"
    ])
  },
  methods: {
    ...mapActions(["fetchSubDepartment", "createSubDepartment"]),
    createSubDept() {
      this.showAddDepartmentModal = true;
    },
    addDepartmentCallBack(action, value) {
      if (action) {
        this.createSubDepartment({
          mainCollection: this.mainDepartment,
          doc_id: this.subDepartment,
          dept_name: value
        });
      }
      this.showAddDepartmentModal = false;
    },
    navigateTo(path) {
      this.$router.push(path);
    },
    addUser() {
      this.addModifyUserModal = true;
    },
    addUserCallBack(action, value) {
      console.log(action, value);
    }
  },
  filters: {
    formatDepartment(value) {
      return value.toUpperCase().replaceAll("_", " ");
    }
  },
  mounted() {
    const {
      params: { mainDept, subDept }
    } = this.$route;
    this.mainDepartment = mainDept;
    this.subDepartment = subDept;
    this.fetchSubDepartment(`${mainDept}/${subDept}/${subDept}`);
  }
};
</script>
