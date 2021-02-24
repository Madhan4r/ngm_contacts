<template>
  <div>
    <CNavbar expandable="md" color="header" fixed="top">
      <CToggler in-navbar @click="collapsed = !collapsed" />
      <CNavbarBrand to="/home">NGM STAFF CONTACTS</CNavbarBrand>
      <CCollapse :show="collapsed" navbar v-if="getUserEmail">
        <CNavbarNav>
          <CNavItem to="/home">Home</CNavItem>
          <CNavItem to="/home">Academic</CNavItem>
          <CNavItem to="/home">Non-Academic</CNavItem>
        </CNavbarNav>

        <!-- Right aligned nav items -->
        <CNavbarNav class="ml-auto">
          <CDropdown nav togglerText="User" placement="bottom-end">
            <CDropdownItem>Edit Profile</CDropdownItem>
            <CDropdownItem>Logout</CDropdownItem>
          </CDropdown>
        </CNavbarNav>
      </CCollapse>
    </CNavbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Header",
  data: () => ({
    collapsed: false
  }),
  computed: {
    ...mapGetters(["getUserEmail"])
  }
};
</script>

<style lang="scss" scoped>
.bg-header {
  background-image: linear-gradient(to left, #ffd54f, #d500f9);
}
</style>
