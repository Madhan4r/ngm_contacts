<template>
  <div class="col-md-4">
    <div class="card user-card">
      <div class="card-header">
        <h5>{{ toTitleCase(getUserName) }}</h5>
      </div>
      <div class="card-block">
        <div class="user-image">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar7.png"
            class="img-radius"
            alt="User-Profile-Image"
          />
        </div>
        <p class="text-muted">
          {{ toTitleCase(getStaffRole) }} | {{ toTitleCase(getGender) }}
          {{ getDOB ? `| Born ${getDOB}` : "" }}
        </p>
        <hr class="mb-1" v-if="getDept" />
        <p v-if="getDept" class="text-muted m-0 p-0">
          Department: {{ getDept }}
        </p>
        <hr class="mt-1" />
        <div class="row justify-content-center user-social-link">
          <div class="col-auto">
            <a :href="`tel:+91${getPhone}`">
              <fas-icon
                :icon="['fas', 'phone']"
                class="text-facebook"
              ></fas-icon>
            </a>
          </div>
          <div class="col-auto">
            <a href="https://api.whatsapp.com/send?phone=+*918883997203*">
              <fas-icon
                :icon="['fas', 'comment']"
                class="text-whatsapp"
              ></fas-icon>
            </a>
          </div>
          <div class="col-auto">
            <a href="#!" @click="openMail()">
              <fas-icon
                :icon="['fas', 'envelope-open']"
                class="text-mail"
              ></fas-icon>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: ["userDetail"],
  computed: {
    getUserName() {
      return (
        `${this.userDetail?.first_name} ${this.userDetail?.last_name}` || ""
      );
    },
    getStaffRole() {
      return this.userDetail?.staff_role || "";
    },
    getGender() {
      return this.userDetail?.gender;
    },
    getDOB() {
      let date = this.userDetail?.dob ? new Date(this.userDetail?.dob) : "";
      return date
        ? `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        : "";
    },
    getDept() {
      return this.userDetail?.dept || "";
    },
    getPhone() {
      return this.userDetail?.phone_no || "";
    }
  },
  methods: {
    toTitleCase(str) {
      return str?.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
    openMail() {
      window.location.href = "mailto:user@example.com";
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  margin-top: 20px;
  background: #f3f3f3;
}

.card.user-card {
  border-top: none;
  -webkit-box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.05),
    0 -2px 1px -2px rgba(0, 0, 0, 0.04), 0 0 0 -1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.05),
    0 -2px 1px -2px rgba(0, 0, 0, 0.04), 0 0 0 -1px rgba(0, 0, 0, 0.05);
  -webkit-transition: all 150ms linear;
  transition: all 150ms linear;
}

.card {
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
  box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
  border: none;
  margin-bottom: 30px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.card .card-header {
  background-color: transparent;
  border-bottom: none;
  padding: 25px;
}

.card .card-header h5 {
  margin-bottom: 0;
  color: #222;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
  line-height: 1.4;
}

.card .card-header + .card-block,
.card .card-header + .card-block-big {
  padding-top: 0;
}

.user-card .card-block {
  text-align: center;
}

.card .card-block {
  padding: 25px;
}

.user-card .card-block .user-image {
  position: relative;
  margin: 0 auto;
  display: inline-block;
  padding: 5px;
  width: 110px;
  height: 110px;
}

.user-card .card-block .user-image img {
  z-index: 20;
  position: absolute;
  top: 5px;
  left: 5px;
  width: 100px;
  height: 100px;
}

.img-radius {
  border-radius: 50%;
}

.f-w-600 {
  font-weight: 600;
}

.m-b-10 {
  margin-bottom: 10px;
}

.m-t-25 {
  margin-top: 25px;
}

.m-t-15 {
  margin-top: 15px;
}

.card .card-block p {
  line-height: 1.4;
}

.text-muted {
  color: #919aa3 !important;
}

.user-card .card-block .activity-leval li.active {
  background-color: #2ed8b6;
}

.user-card .card-block .activity-leval li {
  display: inline-block;
  width: 15%;
  height: 4px;
  margin: 0 3px;
  background-color: #ccc;
}

.user-card .card-block .counter-block {
  color: #fff;
}

.user-card .card-block .user-social-link i {
  font-size: 30px;
}

.text-phone {
  color: #3b5997;
}

.text-whatsapp {
  color: green;
}

.text-mail {
  color: #ec4a89;
}

.user-card .card-block .user-image:before {
  bottom: 0;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
}

.user-card .card-block .user-image:after,
.user-card .card-block .user-image:before {
  content: "";
  width: 100%;
  height: 48%;
  border: 2px solid #4099ff;
  position: absolute;
  left: 0;
  z-index: 10;
}

.user-card .card-block .user-image:after {
  top: 0;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
}

.user-card .card-block .user-image:after,
.user-card .card-block .user-image:before {
  content: "";
  width: 100%;
  height: 48%;
  border: 2px solid #4099ff;
  position: absolute;
  left: 0;
  z-index: 10;
}
</style>
