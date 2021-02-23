<template>
  <div>
    <CNavbar expandable="md" color="header" fixed="top">
      <CToggler in-navbar @click="collapsed = !collapsed" />
      <CNavbarBrand @click="navigateTo('/home')"
        >NGM STAFF CONTACTS</CNavbarBrand
      >
      <CCollapse :show="collapsed" navbar>
        <CNavbarNav>
          <CNavItem @click="navigateTo('/home')">Home</CNavItem>
          <CNavItem @click="navigateTo('/home')">Academic</CNavItem>
          <CNavItem @click="navigateTo('/home')">Non-Academic</CNavItem>
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
export default {
  name: "Header",
  data: () => ({
    collapsed: false
  }),
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>
.bg-header {
  background-image: linear-gradient(to left, #ffd54f, #d500f9);
}
</style>
