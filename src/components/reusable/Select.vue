<template>
  <div>
    <div v-if="label" class="mb-2">{{ label }}</div>
    <v-select
      :name="name"
      :value="selectedValueCustom"
      :placeholder="placeholder"
      @input="input"
      :label="option_label"
      :options="options"
      :taggable="taggable"
      :multiple="multiple"
      :clearable="clearable"
      :disabled="disabled"
      :class="{ 'is-danger': error }"
      @search="handleFetchOption"
      :selectable="
        () => (multiple && limit ? selectedValueCustom.length < limit : true)
      "
    />
    <small class="has-error" v-if="error">{{ error }}</small>
  </div>
</template>

<script>
import { isObject, isEmptyObjectCheck } from "@/modules/helpers";

export default {
  name: "Select",
  props: {
    name: {
      type: String,
      default: "SelectBox"
    },
    placeholder: {
      type: String,
      default: ""
    },
    value: {
      type: [Object, String, Number, Array],
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: undefined
    },
    taggable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    error: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fetchOptions: {
      type: Function,
      default: () => {}
    },
    option_label: {
      type: String,
      default: undefined
    },
    limit: {
      type: Number,
      default: null
    }
  },
  watch: {
    options(newOptions, oldOptions) {
      if (
        this.options &&
        this.options.find &&
        this.value &&
        oldOptions.length > 0 &&
        (Array.isArray(this.value) ? this.value.length : true)
      ) {
        const { code, label } = this.value;
        const result = this.options.find(
          o => o.code === code && o.label === label
        );
        if (!result && !this.multiple) {
          this.$emit("change", this.name, null);
          this.$emit("input", this.name, null);
        }
      }
    }
  },
  computed: {
    selectedValueCustom() {
      if (isObject(this.value) && isEmptyObjectCheck(this.value)) {
        return [];
      }
      return this.value;
    }
  },
  methods: {
    input(value) {
      this.$emit("change", this.name, value);
      this.$emit("input", this.name, value);
    },
    handleFetchOption(search, loading) {
      this.fetchOptions(search, loading, this.name);
    }
  }
};
</script>
<style lang="scss">
.has-error {
  color: red;
}
.is-danger {
  .vs__dropdown-toggle {
    border-color: red;
    box-shadow: none;
    outline: none;
  }
}
.vs__selected {
  color: grey;
}
</style>
