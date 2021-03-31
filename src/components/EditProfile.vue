<template>
  <div
    class="d-flex flex-column"
    :style="`min-height: ${getScreen.availHeight - 170}px`"
  >
    <div class="box-container col-11 col-sm-9 p-0 pt-3" v-if="isFetching">
      <div class="container">
        <div class="row flex-lg-nowrap">
          <div class="col">
            <div class="row">
              <div class="col mb-3">
                <div class="card">
                  <div class="card-body">
                    <div class="e-profile">
                      <div class="row">
                        <!-- <div class="col-12 col-sm-auto mb-3">
                          <div class="mx-auto" style="width: 140px">
                            <div
                              class="d-flex justify-content-center align-items-center rounded"
                              style="
                                height: 140px;
                                background-color: rgb(233, 236, 239);
                              "
                            >
                              <span
                                style="
                                  color: rgb(166, 168, 170);
                                  font: bold 8pt Arial;
                                "
                                >140x140</span
                              >
                            </div>
                          </div>
                        </div> -->
                        <div
                          class="col d-flex flex-column flex-sm-row justify-content-between mb-3"
                        >
                          <div class="text-center text-sm-left mb-2 mb-sm-0">
                            <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap">
                              {{ getUserData.full_name }}
                            </h4>
                            <!-- <p class="mb-0">@johnny.s</p>
                            <div class="text-muted">
                              <small>Last seen 2 hours ago</small>
                            </div> -->
                            <!-- <div class="mt-2">
                              <button class="btn btn-primary" type="button">
                                <i class="fa fa-fw fa-camera"></i>
                                <span>Change Photo</span>
                              </button>
                            </div> -->
                          </div>
                          <div class="text-center text-sm-right">
                            <span class="badge badge-secondary">{{
                              toTitleCase(getUserData.staff_role)
                            }}</span>
                            <div class="text-muted">
                              <small
                                >Joined
                                {{ formatDate(getUserData.created_on) }}</small
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul class="nav nav-tabs">
                        <li class="nav-item">
                          <a href="#" class="active nav-link">Settings</a>
                        </li>
                      </ul>
                      <div class="tab-content pt-3">
                        <div class="tab-pane active">
                          <ValidationObserver
                            ref="editProfile"
                            v-slot="{ handleSubmit }"
                          >
                            <form
                              id="editProfile"
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
                                        <label class="required"
                                          >First Name</label
                                        >
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
                                          <small
                                            class="has-error"
                                            v-if="errors[0]"
                                            >{{ errors[0] }}</small
                                          >
                                        </ValidationProvider>
                                      </div>
                                    </CCol>
                                    <CCol md="6">
                                      <div class="form-group">
                                        <label class="required"
                                          >Last Name</label
                                        >
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
                                          <small
                                            class="has-error"
                                            v-if="errors[0]"
                                            >{{ errors[0] }}</small
                                          >
                                        </ValidationProvider>
                                      </div>
                                    </CCol>
                                  </CRow>
                                  <CRow>
                                    <CCol>
                                      <div class="form-group">
                                        <label class="required">Email</label>
                                        <input
                                          class="form-control"
                                          type="text"
                                          placeholder="user@example.com"
                                          v-model="profile.email"
                                          :disabled="true"
                                        />
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
                                          <small
                                            class="has-error"
                                            v-if="errors[0]"
                                            >{{ errors[0] }}</small
                                          >
                                        </ValidationProvider>
                                      </div>
                                    </CCol>
                                    <CCol md="6">
                                      <div class="form-group">
                                        <label class="required">Gender</label>
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
                                          <small
                                            class="has-error"
                                            v-if="errors[0]"
                                            >{{ errors[0] }}</small
                                          >
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
                                          <small
                                            class="has-error"
                                            v-if="errors[0]"
                                            >{{ errors[0] }}</small
                                          >
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
                                        <label>Department</label>
                                        <input
                                          class="form-control"
                                          type="text"
                                          v-model="profile.dept"
                                          :disabled="true"
                                        />
                                      </div>
                                    </CCol>
                                    <CCol md="6">
                                      <div class="form-group">
                                        <label>Role</label>
                                        <input
                                          class="form-control"
                                          type="text"
                                          v-model="profile.staff_role"
                                          :disabled="true"
                                        />
                                      </div>
                                    </CCol>
                                  </CRow>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col d-flex justify-content-end">
                                  <button
                                    class="btn btn-secondary mr-2"
                                    type="submit"
                                    @click="back()"
                                  >
                                    Back
                                  </button>
                                  <button
                                    class="btn btn-primary"
                                    type="submit"
                                    @click="updateProfile()"
                                  >
                                    Save Changes
                                  </button>
                                </div>
                              </div>
                            </form>
                          </ValidationObserver>
                        </div>
                      </div>
                    </div>
                  </div>
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
import { mapActions, mapGetters } from "vuex";
import { deepClone, isEmptyObjectCheck } from "../modules/helpers";
import { extend } from "vee-validate";
import {
  alpha_spaces,
  required,
  numeric,
  length
} from "vee-validate/dist/rules";
import moment from "moment";
import Select from "./reusable/Select.vue";

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

export default {
  name: "EditProfile",
  components: { Select },
  data() {
    return {
      profile: {}
    };
  },
  computed: {
    ...mapGetters(["getScreen", "getUserData"]),
    isFetching() {
      if (!isEmptyObjectCheck(this.getUserData)) {
        this.setUserData(this.getUserData);
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
    ...mapActions(["showToast", "updateUser"]),
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
    formatDate(date) {
      return date ? moment(date).format("DD MMM YYYY") : "--";
    },
    handleSelect(name, value) {
      this.profile[name] = value;
    },
    async updateProfile() {
      const isValid = await this.$refs.editProfile.validate();
      const errors = Object.values(this.$refs.editProfile.errors).flat();
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
          gender: this.profile.gender?.code,
          dob: this.profile.dob,
          phone_no: this.profile?.phone_no,
          whatsapp: this.profile?.whatsapp || ""
        };
        this.updateUser({ payload: payload, id: this.profile.id });
      }
    },
    back() {
      this.$router.push("/home");
    }
  }
};
</script>
