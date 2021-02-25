<template>
  <div>
    <CRow style="justify-content: space-between" class="mb-4">
      <h5 class="ml-5 pt-2">
        <strong>Search Results: {{ getSearchedUsers.length }}</strong>
      </h5>
      <CButton class="mr-5 btn-back small" @click="backToHome()"
        >Back to Home</CButton
      >
    </CRow>
    <CRow v-if="getSearchedUsers.length">
      <user-card
        v-for="(data, index) in getSearchedUsers"
        :userDetail="data"
        :key="index"
      />
    </CRow>
    <CRow style="justify-content: center" v-else>
      <h3 class="mt-5">No Users Found</h3>
    </CRow>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "./UserCard.vue";

export default {
  components: { UserCard },
  name: "Search",
  props: ["searchTerm"],
  computed: {
    ...mapGetters(["getUsers"]),
    getSearchedUsers() {
      return this.getUserByName(this.searchTerm);
    }
  },
  methods: {
    getUserByName(name) {
      return (
        this.getUsers?.filter(val => {
          let full_name = val.full_name?.toLowerCase() || "";
          name = name.toLowerCase();
          return full_name.includes(name);
        }) || []
      );
    },
    backToHome() {
      this.$parent.searchTerm = "";
      this.$parent.showSearchPage = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-back {
  background-color: grey;
  color: white;
  font-weight: 500;
}
</style>
