<template>
  <div class="col-md-4" v-if="!isLoading">
    <div class="card user-card">
      <div class="card-header">
        <h5>{{ toTitleCase(getUserName) }}</h5>
      </div>
      <div class="card-block">
        <div class="user-image">
          <img
            :src="getGenderImage"
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
              <fas-icon :icon="['fas', 'phone']" class="text-phone"></fas-icon>
            </a>
          </div>
          <div class="col-auto" v-if="getWhatsapp">
            <a
              :href="`https://api.whatsapp.com/send?phone=+*91${getWhatsapp}*`"
              target="_blank"
            >
              <svg
                enable-background="new 0 0 24 24"
                height="18"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m20.52 3.449c-2.28-2.204-5.28-3.449-8.475-3.449-9.17 0-14.928 9.935-10.349 17.838l-1.696 6.162 6.335-1.652c2.76 1.491 5.021 1.359 5.716 1.447 10.633 0 15.926-12.864 8.454-20.307z"
                  fill="#eceff1"
                />
                <path
                  d="m12.067 21.751-.006-.001h-.016c-3.182 0-5.215-1.507-5.415-1.594l-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-8.793 10.745-13.19 16.963-6.975 6.203 6.15 1.848 16.875-7.026 16.875z"
                  fill="#4caf50"
                />
                <path
                  d="m17.507 14.307-.009.075c-.301-.15-1.767-.867-2.04-.966-.613-.227-.44-.036-1.617 1.312-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.293-.506.32-.578.878-1.634.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.576-.05-.997-.042-1.368.344-1.614 1.774-1.207 3.604.174 5.55 2.714 3.552 4.16 4.206 6.804 5.114.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z"
                  fill="#fafafa"
                />
              </svg>
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
          <div class="col-auto" v-if="isAdmin">
            <a href="#!" @click="editUserAsAdmin()">
              <fas-icon :icon="['fas', 'edit']" style="color: black"></fas-icon>
            </a>
          </div>
        </div>
      </div>
    </div>
    <add-modify-user
      v-if="addModifyUserModal"
      :isShowPopup="addModifyUserModal"
      :userDetail="userDetail"
    />
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import AddModifyUser from "./AddModifyUser.vue";

export default {
  name: "UserCard",
  components: { AddModifyUser },
  props: ["userDetail"],
  data: () => ({
    addModifyUserModal: false
  }),
  computed: {
    ...mapGetters(["isAdmin", "isLoading"]),
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
    getGenderImage() {
      switch (this.userDetail?.gender) {
        case "male":
          return "https://bootdey.com/img/Content/avatar/avatar7.png";
        case "female":
          return "https://bootdey.com/img/Content/avatar/avatar8.png";
        case "others":
          return "https://bootdey.com/img/Content/avatar/avatar8.png";

        default:
          return "";
      }
    },
    getDOB() {
      let date = this.userDetail?.dob;
      return date ? moment(date).format("DD MMM YYYY") : "";
    },
    getDept() {
      return this.userDetail?.department || "";
    },
    getPhone() {
      return this.userDetail?.phone_no || "";
    },
    getWhatsapp() {
      return this.userDetail?.whatsapp || "";
    }
  },
  methods: {
    toTitleCase(str) {
      return str?.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
    openMail() {
      window.location.href = `mailto:${this.userDetail?.email}`;
    },
    editUserAsAdmin() {
      this.addModifyUserModal = true;
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
