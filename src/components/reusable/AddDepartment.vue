<template>
  <div>
    <CModal
      color="warning"
      :show.sync="isShowPopup"
      :closeOnBackdrop="true"
      :centered="true"
    >
      <template #header>
        <h5>Add Department</h5>
        <CButtonClose @click="close()" class="text-black" />
      </template>
      <template #footer>
        <div>
          <CButton class="btn-secondary mr-2" @click="close()">Cancel</CButton>
          <CButton class="btn-warning" @click="add()">Add</CButton>
        </div>
      </template>

      <div>
        <ValidationObserver ref="dept" v-slot="{ handleSubmit }">
          <form
            id="dept"
            @submit.prevent="handleSubmit()"
            v-on:keypress.enter.prevent
          >
            <CRow class="m-3">
              <label class="required" style="width: 30%">Department Name</label>
              <ValidationProvider
                rules="required|alpha_spaces"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  class="ml-2"
                  v-model="department_name"
                  style="text-transform: uppercase"
                />
                <p class="ml-1" style="color: red">{{ errors[0] }}</p>
              </ValidationProvider>
            </CRow>
          </form>
        </ValidationObserver>
      </div>
    </CModal>
  </div>
</template>

<script>
import { extend } from "vee-validate";
import { alpha_spaces, required } from "vee-validate/dist/rules";
import { mapActions } from "vuex";
extend("required", { ...required, message: "This field is required" });
extend("alpha_spaces", {
  ...alpha_spaces,
  message: "Only Alphabets are allowed"
});

export default {
  name: "AddDepartment",
  props: {
    isShowPopup: {
      type: Boolean,
      default: false
    },
    existingDepartments: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    department_name: ""
  }),
  methods: {
    ...mapActions(["showToast"]),
    close() {
      this.$emit("modalCallBack", false);
    },
    async add() {
      const isValid = await this.$refs.dept.validate();
      if (!isValid) {
        this.showToast({
          class: "bg-danger text-white",
          message: "Please fill mandatory fields!"
        });
        return;
      } else {
        if (this.existingDepartments?.length) {
          if (
            this.existingDepartments.some(
              value =>
                value.id ==
                this.department_name.toLowerCase().replaceAll(" ", "_")
            )
          ) {
            this.showToast({
              class: "bg-danger text-white",
              message: "Department Already exist!"
            });
            return;
          }
        }
        this.$emit(
          "modalCallBack",
          true,
          this.department_name.toLowerCase().replaceAll(" ", "_")
        );
      }
    }
  }
};
</script>
