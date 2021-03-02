<template>
  <div>
    <CModal
      color="info"
      :show.sync="isShowPopup"
      :closeOnBackdrop="true"
      :centered="true"
      size="xl"
    >
      <template #header>
        <h5>{{ userDetail.id ? "Modify User" : "Add User" }}</h5>
        <CButtonClose @click="close()" class="text-black" />
      </template>
      <template #footer>
        <div>
          <CButton
            v-if="userDetail.id"
            class="btn-danger mr-2"
            @click="deleteProfile()"
            >Delete</CButton
          >
          <CButton class="btn-secondary mr-2" @click="close()">Cancel</CButton>
          <CButton class="btn-warning" @click="updateProfile()">{{
            userDetail.id ? "Save Changes" : "Add User"
          }}</CButton>
        </div>
      </template>

      <div class="pt-3 text-left" v-if="isFetching">
        <ValidationObserver ref="modifyUser" v-slot="{ handleSubmit }">
          <form
            id="modifyUser"
            @submit.prevent="handleSubmit()"
            v-on:keypress.enter.prevent
            class="form"
          >
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <strong>Personal Information</strong>
                </div>
                <CRow>
                  <CCol md="6">
                    <div class="form-group">
                      <label class="required">First Name</label>
                      <ValidationProvider
                        rules="required|alpha_spaces"
                        v-slot="{ errors }"
                      >
                        <input
                          class="form-control"
                          type="text"
                          name="name"
                          placeholder="First Name"
                          v-model="profile.first_name"
                          required
                        />
                        <small class="has-error" v-if="errors[0]">{{
                          errors[0]
                        }}</small>
                      </ValidationProvider>
                    </div>
                  </CCol>
                  <CCol md="6">
                    <div class="form-group">
                      <label class="required">Last Name</label>
                      <ValidationProvider
                        rules="required|alpha_spaces"
                        v-slot="{ errors }"
                      >
                        <input
                          class="form-control"
                          type="text"
                          name="last_name"
                          placeholder="Last Name"
                          v-model="profile.last_name"
                          required
                        />
                        <small class="has-error" v-if="errors[0]">{{
                          errors[0]
                        }}</small>
                      </ValidationProvider>
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <div class="form-group">
                      <label class="required">Email</label>
                      <ValidationProvider
                        rules="required|email"
                        v-slot="{ errors }"
                      >
                        <input
                          class="form-control"
                          type="text"
                          placeholder="user@example.com"
                          v-model="profile.email"
                          :disabled="userDetail.id ? true : false"
                        />
                        <small class="has-error" v-if="errors[0]">{{
                          errors[0]
                        }}</small>
                      </ValidationProvider>
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="6">
                    <div class="form-group">
                      <label>Date of Birth</label>
                      <ValidationProvider
                        name="dob"
                        rules="date_validate|no_future_date"
                        v-slot="{ errors }"
                      >
                        <input
                          class="form-control"
                          type="date"
                          v-model="profile.dob"
                        />
                        <small class="has-error" v-if="errors[0]">{{
                          errors[0]
                        }}</small>
                      </ValidationProvider>
                    </div>
                  </CCol>
                  <CCol md="6">
                    <div class="form-group">
                      <label class="required">Gender</label>
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <Select
                          name="gender"
                          :value="profile.gender"
                          @input="handleSelect"
                          :options="
                            options && options['gender']
                              ? options['gender']
                              : []
                          "
                          :taggable="false"
                          :multiple="false"
                          :clearable="false"
                        />
                        <small class="has-error" v-if="errors[0]">{{
                          errors[0]
                        }}</small>
                      </ValidationProvider>
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="6">
                    <div class="form-group">
                      <label class="required">Phone</label>
                      <ValidationProvider
                        ref="phone"
                        :rules="{
                          required: true,
                          numeric: true,
                          length: 10
                        }"
                        v-slot="{ errors }"
                      >
                        <input
                          class="form-control"
                          type="text"
                          placeholder="xxxxx xxxxx"
                          v-model="profile.phone_no"
                        />
                        <small class="has-error" v-if="errors[0]">{{
                          errors[0]
                        }}</small>
                      </ValidationProvider>
                    </div>
                  </CCol>
                  <CCol md="6">
                    <div class="form-group">
                      <label>Whatsapp</label>
                      <ValidationProvider
                        ref="phone"
                        :rules="{
                          numeric: true,
                          length: 10
                        }"
                        v-slot="{ errors }"
                      >
                        <input
                          class="form-control"
                          type="text"
                          placeholder="xxxxx xxxxx"
                          v-model="profile.whatsapp"
                        />
                        <small class="has-error" v-if="errors[0]">{{
                          errors[0]
                        }}</small>
                      </ValidationProvider>
                    </div>
                  </CCol>
                </CRow>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <strong>Professional Information</strong>
                </div>
                <CRow>
                  <CCol md="6">
                    <div class="form-group">
                      <label class="required">Department</label>
                      <input
                        class="form-control"
                        type="text"
                        v-model="profile.department"
                        :disabled="true"
                      />
                    </div>
                  </CCol>
                  <CCol md="6">
                    <div class="form-group">
                      <label class="required">Role</label>
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <input
                          class="form-control"
                          type="text"
                          v-model="profile.staff_role"
                          :disabled="isAdmin ? false : true"
                        />
                        <small class="has-error" v-if="errors[0]">{{
                          errors[0]
                        }}</small>
                      </ValidationProvider>
                    </div>
                  </CCol>
                </CRow>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </CModal>
  </div>
</template>

<script>
import { deepClone, isEmptyObjectCheck } from "../modules/helpers";
import Select from "./reusable/Select.vue";
import { extend } from "vee-validate";
import {
  alpha_spaces,
  required,
  numeric,
  length,
  email
} from "vee-validate/dist/rules";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";

extend("required", { ...required, message: "This field is required" });
extend("numeric", { ...numeric, message: "Only numbers are allowed" });
extend("length", { ...length, message: "Number should 10 digits" });
extend("alpha_spaces", {
  ...alpha_spaces,
  message: "Only Alphabets are allowed"
});
extend("no_future_date", value => {
  let input_date = new Date(value);
  let today_date = new Date();
  if (input_date > today_date) {
    return "Given date should not be greater than today!";
  }
  return true;
});
extend("date_validate", value => {
  if (moment(value).isValid()) {
    return true;
  }
  return "Invalid date! Enter a valid date";
});
extend("email", { ...email, message: "Invalid email" });

export default {
  name: "AddModifyUser",
  props: {
    isShowPopup: {
      type: Boolean,
      default: false
    },
    userDetail: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Select
  },
  data: () => ({
    profile: {}
  }),
  computed: {
    ...mapGetters(["isAdmin"]),
    isFetching() {
      if (!isEmptyObjectCheck(this.userDetail)) {
        this.setUserData(this.userDetail);
      }
      return true;
    },
    options() {
      return {
        gender: [
          { label: "Male", code: "male" },
          { label: "Female", code: "female" },
          { label: "Others", code: "others" }
        ]
      };
    }
  },
  methods: {
    ...mapActions(["showToast"]),
    setUserData(data) {
      let profileData = deepClone(data);
      this.profile = {
        ...profileData,
        gender: profileData?.gender
          ? {
              label: this.toTitleCase(profileData?.gender),
              code: profileData?.gender
            }
          : [],
        staff_role: this.toTitleCase(profileData?.staff_role)
      };
    },
    toTitleCase(str) {
      return str?.replace(/\w\S*/g, function(txt) {
        return txt?.charAt(0).toUpperCase() + txt?.substr(1).toLowerCase();
      });
    },
    handleSelect(name, value) {
      this.profile[name] = value;
    },
    close() {
      this.$emit("modalCallBack", false);
    },
    async updateProfile() {
      const isValid = await this.$refs.modifyUser.validate();
      const errors = Object.values(this.$refs.modifyUser.errors).flat();
      if (!isValid) {
        let el = this.$el.getElementsByClassName("has-error")[0];
        el.scrollIntoView(true);
        window.scrollBy(0, -140);
        this.showToast({
          class: "bg-danger text-white",
          message: errors[0] || "Please fill mandatory fields!"
        });
        return;
      } else {
        let payload = {
          first_name: this.profile.first_name,
          last_name: this.profile.last_name,
          full_name: `${this.profile.first_name} ${this.profile.last_name}`,
          email: this.profile.email,
          gender: this.profile.gender?.code,
          phone_no: this.profile.phone_no,
          staff_role: this.toTitleCase(this.profile.staff_role.toLowerCase()),
          whatsapp: this.profile.whatsapp || "",
          dob: this.profile.dob || "",
          reference: this.profile.reference || "",
          department: this.profile.department
        };
        if (this.profile.id) {
          payload = {
            ...payload,
            id: this.profile.id
          };
        } else {
          payload = {
            ...payload,
            created_on: moment().format("YYYY-MM-DD")
          };
        }
        this.$emit("modalCallBack", true, payload);
      }
    },
    deleteProfile() {
      let cnfm = confirm("Are you Sure to delete this user?");
      if (cnfm) {
        console.log("confirm");
      }
    }
  }
};
</script>
