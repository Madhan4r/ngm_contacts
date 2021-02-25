<template>
  <div
    class="d-flex flex-column"
    :style="`min-height: ${getScreen.availHeight - 170}px`"
  >
    <div class="home col-11 col-sm-9 p-0">
      <div class="container p-3 pt-4 text-center">
        <img src="/img/ngm_logo.gif" alt="logo" width="100" height="100" />
        <div class="d-flex justify-content-center px-5 mb-3">
          <div class="search">
            <input
              type="text"
              class="search-input"
              placeholder="Search contacts..."
              v-model="searchTerm"
              @keyup.enter="searchUser()"
            />
            <a @click="searchUser()" class="search-icon">
              <fas-icon :icon="['fas', 'search']"></fas-icon>
            </a>
          </div>
        </div>
        <div class="container mb-5" v-if="!showSearchPage">
          <CRow style="justify-content: center">
            <user-card :userDetail="getPrincipal[0]" />
            <div class="col-md-4">
              <div
                class="d-flex flex-column justify-content-center h-100"
                style="max-height: 280px"
              >
                <CButton class="btn-color" @click="navidateTo('/academic')"
                  >ACADEMIC</CButton
                >
                <CButton class="btn-color" @click="navidateTo('/non-academic')"
                  >NON ACADEMIC</CButton
                >
              </div>
            </div>
          </CRow>
        </div>
        <div v-else>
          <search :searchTerm="searchTerm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "./UserCard";
import Search from "./Search";

export default {
  components: { UserCard, Search },
  name: "Home",
  data: () => ({
    searchTerm: "",
    showSearchPage: false
  }),
  computed: {
    ...mapGetters(["getPrincipal", "getScreen"])
  },
  methods: {
    navidateTo(path) {
      this.$router.push(path);
    },
    searchUser() {
      if (this.searchTerm) {
        this.showSearchPage = true;
      } else {
        this.showSearchPage = false;
      }
    }
  }
};
</script>
