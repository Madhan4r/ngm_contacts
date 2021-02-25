<template>
  <div>
    <CModal
      color="warning"
      :show.sync="isShowPopup"
      :closeOnBackdrop="true"
      :centered="true"
    >
      <template #header> <h5>Change Password</h5> </template>
      <template #footer>
        <div>
          <CButton class="btn-secondary mr-2" @click="close()">Cancel</CButton>
          <CButton class="btn-warning" @click="confrim()">Confirm</CButton>
        </div>
      </template>

      <div>
        <ValidationObserver ref="forgot" v-slot="{ handleSubmit }">
          <form
            id="forgot"
            @submit.prevent="handleSubmit()"
            v-on:keypress.enter.prevent
          >
            <CRow class="m-3">
              <label style="width: 30%">Old Password</label>
              <ValidationProvider rules="required" v-slot="{ errors }">
                <input
                  type="password"
                  name="oldPassword"
                  class="ml-2"
                  v-model="oldPassword"
                />
                <p class="ml-1" style="color: red">{{ errors[0] }}</p>
              </ValidationProvider>
            </CRow>
            <CRow class="m-3">
              <label style="width: 30%">New Password</label>
              <ValidationProvider
                name="password"
                :rules="{
                  required: true,
                  password_length: 8,
                  password_strength: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                }"
                v-slot="{ errors }"
              >
                <input
                  type="password"
                  name="newPassword"
                  class="ml-2"
                  v-model="newPassword"
                />
                <p class="ml-1" style="color: red">{{ errors[0] }}</p>
              </ValidationProvider>
            </CRow>
            <CRow class="m-3">
              <label style="width: 30%">Re-Password</label>
              <ValidationProvider
                rules="required|confirmed:password"
                v-slot="{ errors }"
              >
                <input
                  type="password"
                  name="confirmPassword"
                  class="ml-2"
                  v-model="confirmPassword"
                />
                <p class="ml-1" style="color: red">{{ errors[0] }}</p>
              </ValidationProvider>
            </CRow>
            <small class="hint">
              Password format: 8 characters - containing upper & lower case
              letters, numbers and a special character. No words.
            </small>
          </form>
        </ValidationObserver>
      </div>
    </CModal>
  </div>
</template>

<script>
import { extend } from "vee-validate";
import { required, confirmed, regex, min } from "vee-validate/dist/rules";
import { mapActions } from "vuex";
extend("required", { ...required, message: "This field is required" });
extend("password_length", {
  ...min,
  message: "Password be atleast 8 characters"
});
extend("password_strength", {
  ...regex,
  message: "Password must have capitals, numbers and special characters"
});
extend("confirmed", {
  ...confirmed,
  message: "This field should match password"
});

export default {
  name: "ChangePasswordModal",
  props: {
    isShowPopup: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  }),
  methods: {
    ...mapActions(["showToast", "changePassword"]),
    async confrim() {
      const isValid = await this.$refs.forgot.validate();
      if (!isValid) {
        this.showToast({
          class: "bg-danger text-white",
          message: "Please fill mandatory fields!"
        });
        return;
      } else {
        const res = await this.changePassword({
          oldPwd: this.oldPassword,
          newPwd: this.newPassword
        });
        if (res) this.$emit("modalCallBack");
      }
    },
    close() {
      this.$emit("modalCallBack");
    }
  }
};
</script>
