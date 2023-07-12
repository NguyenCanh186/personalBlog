<template>
  <div
      :class="{ 'bg-white': !nightMode, 'bg-dark': nightMode }"
      class="pt-5 p-st"
  >
    <div
        class="container"
        data-aos="fade"
        data-aos-once="true"
        data-aos-duration="1000"
    >
      <div class="row align-items-center">
        <form style="width: 100%">
          <div class="row align-items-center">
            <div class="col-xl-6 col-bg-6 col-md-6 col-sm-12 text-center" v-if="currentUser !== null">
              <div class="image-container">
                <img :src="picture" :style="getImageStyle" />
                <button @click="changePicture" class="camera-button">
                  <i class="fas fa-camera"></i>
                </button>
              </div>
            </div>
            <div class="col-xl-6 col-bg-6 col-md-6 col-sm-12 pt-5">
              <div v-if="currentUser !== null" class="d-flex flex-column align-items-end">
                <input type="text" style="font-size: 20px" class="form-control" v-model="homeTitle">
                <button class="btn btn-outline-success mt-2 mb-2" @click="updateDescription">Update Title</button>
              </div>
              <div>
                <div class="d-flex flex-column align-items-end">
                  <textarea v-model="description" class="form-control" rows="6"></textarea>
                  <button class="btn btn-outline-success mt-2" @click="updateDescription">Update</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import info from "../../info";


import info from "../../../info";

export default {
  name: "HomeAdmin",
  components: {
  },
  props: {
    nightMode: {
      type: Boolean,
    },
  },
  data() {
    return {
      homeTitle: "Welcome to my World.",
      picture: info.flat_picture,
      description: info.description,
      name: info.name,
      linkedin: info.links.linkedin,
      github: info.links.github,
      behance: info.links.behance,
      resume: info.links.resume
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    changePicture() {
      this.picture = 'new_picture.jpg';
    },
    open(link) {
      switch (link) {
        case "linkedin":
          window.open(this.linkedin, "_blank");
          break;
        case "github":
          window.open(this.github, "_blank");
          break;
        case "behance":
          window.open(this.behance, "_blank");
          break;
        case "resume":
          window.open(this.resume, "_blank");
          break;
      }
    },
  },
};
</script>

<style scoped>
.image-container {
  position: relative;
  display: inline-block;
}

.camera-button {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: transparent;
  border: none;
  color: #fff;
  font-size: 25px;
  cursor: pointer;
  padding: 0px 20px;
  border-radius: 4px;
  background-color: rgba(65, 63, 63, 0.5);
  backdrop-filter: blur(8px);
}
.home-title {
  font-size: 55px;
  font-weight: 500;
}

img {
  max-width: 800px;
  max-height: 500px;
  transform: rotateY(180deg);
}

@media only screen and (max-width: 580px) {
  img {
    object-fit: cover;
    border-radius: 50%;
    height: 200px;
    width: 200px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 2px solid rgb(205, 205, 205);
  }
}

.fa {
  font-size: 15px;
}

.btn {
  border-color: #17a2b8;
  color: #17a2b8;
}

.btn:hover {
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: white;
}

.btn:focus {
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: white;
}

.btn:focus {
  outline: none !important;
}

p {
  text-align: justify;
  font-weight: 400;
}

/* LEAVES */
</style>

