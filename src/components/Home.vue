<template>
  <div>
    <div class="home col-11 col-sm-9 p-0">
      <div class="container p-3 text-center">
        <img src="/img/ngm_logo.gif" alt="logo" width="100" height="100" />
        <div class="d-flex justify-content-center px-5 mb-3">
          <div class="search">
            <input
              type="text"
              class="search-input"
              placeholder="Search contacts..."
              v-model="search"
            />
            <a href="#" class="search-icon">
              <fas-icon :icon="['fas', 'search']"></fas-icon>
            </a>
          </div>
        </div>
        <div class="container">
          <CRow> <user-card :userDetail="getPrincipal[0]" /> </CRow>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "./UserCard";
export default {
  components: { UserCard },
  name: "Home",
  data: () => ({
    search: ""
  }),
  computed: {
    ...mapGetters(["getPrincipal"])
  }
};
</script>

<style lang="scss" scoped>
.home {
  border: 1px solid #d8dbe0;
  margin: auto;
  background-color: #fff;
  .container {
    .search {
      width: 100%;
      margin-bottom: auto;
      margin-top: 20px;
      height: 50px;
      background-color: #fff;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid;
    }

    .search-input {
      color: white;
      border: 0;
      outline: 0;
      background: none;
      width: 0;
      margin-top: 5px;
      caret-color: transparent;
      line-height: 20px;
      transition: width 0.4s linear;
    }

    .search .search-input {
      padding: 0 10px;
      width: 100%;
      caret-color: #536bf6;
      font-size: 19px;
      font-weight: 300;
      color: black;
      transition: width 0.4s linear;
    }

    .search-icon {
      height: 34px;
      width: 34px;
      float: right;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      background-color: #536bf6;
      font-size: 10px;
      bottom: 30px;
      position: relative;
      border-radius: 5px;
    }

    .search-icon:hover {
      color: #fff !important;
    }

    a:link {
      text-decoration: none;
    }
  }
}
</style>
