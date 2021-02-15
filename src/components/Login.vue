<template>
  <div class="login-style">
    <div class="container px-4 py-5 mx-auto">
      <div class="card card0">
        <div class="d-flex flex-lg-row flex-column-reverse">
          <div class="card card1">
            <div class="row justify-content-center my-auto">
              <div class="col-md-8 col-10 my-5">
                <div class="row justify-content-center px-3 mb-3">
                  <img id="logo" src="/img/ngm_logo.gif" />
                </div>
                <h3 class="mb-5 text-center heading">ngm contacts</h3>
                <h6 class="msg-info">Please login to your account</h6>
                <div class="form-group">
                  <label class="form-control-label text-muted">Username</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Phone no or email id"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-label text-muted">Password</label>
                  <input
                    type="password"
                    id="psw"
                    name="psw"
                    placeholder="Password"
                    class="form-control"
                  />
                </div>
                <div class="row justify-content-center my-3 px-3">
                  <button class="btn-block btn-color">Login</button>
                </div>
                <div class="row justify-content-center my-2">
                  <a href="#"
                    ><small class="text-muted">Forgot Password?</small></a
                  >
                </div>
              </div>
            </div>
            <div class="bottom text-center mb-5">
              <p href="#" class="sm-text mx-auto mb-3">
                Don't have an account?<button class="btn btn-white ml-2">
                  Create new
                </button>
              </p>
            </div>
          </div>
          <div class="card card2">
            <div class="my-auto mx-md-5 px-md-5 right">
              <h3 class="text-white">
                Welcome to Nallamuthu Gounder Mahalingam College
              </h3>
              <small class="text-white"
                >Nallamuthu Gounder Mahalingam College an Institution engaged in
                providing quality education to the youth has been growing
                consistently spreading its wings far and wide to offer a variety
                of educational programmes under one roof for over 60+ years. To
                provide facilities for higher education for students from high
                schools of Pollachi and Udumalpet Taluks, an organisation called
                “Pollachi Kalvi Kazhagam” was constituted in 1957 under the
                Presidentship of Shri S.P. Nallamuthu Gounder and the
                Secretaryship of Arutchelvar Dr. N. Mahalingam
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      testCollection: [],
      id: "PzsfNYqxyeoi3klwJJMZ",
      name: "madhan"
    };
  },
  mounted() {
    const db = this.$firebase.firestore();
    db.collection("users")
      .get()
      .then(snap => {
        const testCollection = [];
        snap.forEach(doc => {
          testCollection.push({ [doc.id]: doc.data() });
        });
        this.testCollection = testCollection;
      });
  },
  methods: {
    createContact() {
      const db = this.$firebase.firestore();
      db.collection("users")
        .add({ name: "madhan", phno: 12345678 })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        });
    },
    updateContact() {
      const db = this.$firebase.firestore();
      let id = this.id;
      db.collection("users")
        .doc(id)
        .update({
          name: "name",
          phno: 123456789
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch(error => {
          console.error("Error updating document: ", error);
        });
    },
    deleteContact() {
      const db = this.$firebase.firestore();
      let id = this.id;
      db.collection("users")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch(error => {
          console.error("Error removing document: ", error);
        });
    },
    getContactByField() {
      const db = this.$firebase.firestore();
      db.collection("users")
        .where("name", "==", this.name)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(doc.id, " => ", doc.data());
            this.name = doc.data().name;
            this.phno = doc.data().phno;
          });
        });
    },
    getContactById() {
      const db = this.$firebase.firestore();
      db.collection("users")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.id == this.id) {
              console.log(doc.id, " =>  founded : ", doc.data());
            }
          });
        });
    }
  }
};
</script>
