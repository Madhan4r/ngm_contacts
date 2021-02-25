<template>
  <div class="login-style">
    <div class="container px-4 py-3 mx-auto">
      <div class="card card0">
        <div class="d-flex flex-lg-row justify-content-center">
          <div class="card card1">
            <div class="row justify-content-center my-auto">
              <div class="col-md-8 col-10 my-5">
                <div class="row justify-content-center px-3 mb-3">
                  <img id="logo" src="/img/ngm_logo.gif" alt="logo" />
                </div>
                <h3 class="mb-5 text-center heading">NGM STAFF CONTACTS</h3>
                <h6 class="msg-info text-center">Please enter your email</h6>
                <CForm @submit.prevent="reset()">
                  <div class="form-group">
                    <label class="form-control-label text-muted"
                      >Username</label
                    >
                    <input
                      name="username"
                      placeholder="Email"
                      class="form-control"
                      v-model="username"
                    />
                  </div>
                  <div class="row justify-content-center my-3 px-3">
                    <button type="submit" class="btn-block btn-color">
                      Reset
                    </button>
                  </div>
                </CForm>
                <div class="row justify-content-center my-2">
                  <a @click="navigateToLogin()" style="cursor: pointer"
                    ><small class="text-muted">Back To Login</small></a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Forgot",
  data: () => ({
    username: ""
  }),
  methods: {
    ...mapActions(["resetPassword"]),
    reset() {
      this.resetPassword(this.username);
    },
    navigateToLogin() {
      this.$router.push("/login");
    }
  }
};
</script>
