<template>
  <div
    class="d-flex flex-column"
    :style="`min-height: ${getScreen.availHeight - 170}px`"
  >
    <div class="box-container col-11 col-sm-8 p-0 pt-3 pb-5">
      <h5 class="mb-4 text-center">{{ getDepartment }}</h5>
      <CRow class="content-center">
        <user-card
          v-for="(data, index) in getUsers"
          :userDetail="data"
          :key="index"
        />
      </CRow>
      <CRow>
        <CCol v-if="!getUsers.length" class="content-center">
          <h5>No Users Found!</h5>
        </CCol>
      </CRow>
      <CRow v-if="isAdmin">
        <CCol class="content-center">
          <CButton
            class="btn-dept-color"
            :style="`background-color:${getRandomColor}`"
            @click="addUser()"
            >Add User</CButton
          >
        </CCol>
      </CRow>
    </div>
    <add-modify-user
      v-if="addModifyUserModal"
      :isShowPopup="addModifyUserModal"
      :userDetail="{
        department: getDepartment,
        reference: `${mainDepartment}/${subDepartment}/${department}`
      }"
      @modalCallBack="addModifyUserCallBack"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddModifyUser from "../AddModifyUser.vue";
import UserCard from "../UserCard.vue";

export default {
  name: "ListUsers",
  components: { AddModifyUser, UserCard },
  data: () => ({
    mainDepartment: "",
    subDepartment: "",
    department: "",
    addModifyUserModal: false
  }),
  computed: {
    ...mapGetters([
      "getUsersByReference",
      "getScreen",
      "isAdmin",
      "getRandomColor"
    ]),
    getUsers() {
      if (this.subDepartment && this.mainDepartment && this.department) {
        return this.getUsersByReference(
          `${this.mainDepartment}/${this.subDepartment}/${this.department}`
        );
      }
      return [];
    },
    getDepartment() {
      return this.department.toUpperCase().replaceAll("_", " ") || "";
    }
  },
  methods: {
    ...mapActions(["createUser"]),
    addUser() {
      this.addModifyUserModal = true;
    },
    addModifyUserCallBack(action, value) {
      if (action) {
        if (!value.id) {
          this.createUser(value).then(() => {
            this.addModifyUserModal = false;
          });
        }
      } else {
        this.addModifyUserModal = false;
      }
    }
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
