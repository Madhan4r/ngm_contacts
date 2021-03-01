<template>
  <div>
    <CNavbar expandable="md" color="header" fixed="top">
      <CToggler in-navbar @click="collapsed = !collapsed" v-if="getUserEmail" />
      <CNavbarBrand to="/home">NGM STAFF CONTACTS</CNavbarBrand>
      <CCollapse :show="collapsed" navbar v-if="getUserEmail">
        <CNavbarNav>
          <CNavItem to="/home">Home</CNavItem>
          <CNavItem to="/academic">Academic</CNavItem>
          <CNavItem to="/non-academic">Non-Academic</CNavItem>
        </CNavbarNav>

        <!-- Right aligned nav items -->
        <CNavbarNav class="ml-auto">
          <CDropdown
            nav
            :togglerText="'Hi ' + getUserName"
            placement="bottom-end"
          >
            <CDropdownItem @click="editProfile()">Edit Profile</CDropdownItem>
            <CDropdownItem @click="changePassword()"
              >Change Password</CDropdownItem
            >
            <CDropdownItem @click="clearLocalStorage()">Logout</CDropdownItem>
          </CDropdown>
        </CNavbarNav>
      </CCollapse>
    </CNavbar>
    <change-password-modal
      v-if="isShowPasswordModal"
      :isShowPopup="isShowPasswordModal"
      @modalCallBack="modalCallBack()"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ChangePasswordModal from "./ChangePasswordModal.vue";

export default {
  name: "Header",
  components: {
    ChangePasswordModal
  },
  data: () => ({
    collapsed: false,
    isShowPasswordModal: false
  }),
  computed: {
    ...mapGetters(["getUserEmail", "getUserData"]),
    getUserName() {
      return this.getUserData?.first_name || "";
    }
  },
  methods: {
    ...mapActions(["initialFetchAfterLogin", "logout"]),
    clearLocalStorage() {
      this.logout();
    },
    changePassword() {
      this.isShowPasswordModal = true;
    },
    modalCallBack() {
      this.isShowPasswordModal = false;
    },
    editProfile() {
      this.$router.push("/edit-profile");
    }
  },
  created() {
    this.initialFetchAfterLogin();
  },
  watch: {
    "$route.name"() {
      this.collapsed = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.bg-header {
  background-image: linear-gradient(to left, #ffd54f, #d500f9);
}
</style>
