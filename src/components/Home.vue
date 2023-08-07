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
        <div class="col-xl-6 col-bg-6 col-md-6 col-sm-12 text-center">
          <div class="image-container">
            <img :src="`https://anhcuatoi.s3.ap-southeast-1.amazonaws.com/image/${picture}`"/>
          </div>
        </div>
        <div class="col-xl-6 col-bg-6 col-md-6 col-sm-12 pt-5">
          <span
            class="home-title"
            :class="{ pgray: !nightMode, 'text-light': nightMode }"
            >{{ homeTitle }}</span
          >
          <div>
            <div>
              <p v-html="description"></p>
            </div>
            <div class="text-center pb-4">
              <button
                  class="btn btn-outline-success mx-2 "
                  @click="open('linkedin')"
                  v-tooltip.bottom="'Facebook'"
              >
                <i class="fa-brands fa-square-facebook"></i>
              </button>
              <button
                  class="btn btn-outline-info mx-2"
                  @click="open('github')"
                  v-tooltip.bottom="'Tóp tóp'"
              >
                <i class="fa-brands fa-tiktok"></i>
              </button>
              <button
                  class="btn btn-outline-info mx-2"
                  @click="open('behance')"
                  v-tooltip.bottom="'Skype'"
              >
                <i class="fa-brands fa-skype"></i>
              </button>
              <button
                  class="btn btn-outline-info mx-2"
                  @click="open('resume')"
                  v-tooltip.bottom="'Telegram'"
              >
                <i class="fa-brands fa-telegram"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import info from "../../info";
import {GetDataService as getDataService} from "@/service/get-data-service";


export default {
  name: "Home",
  components: {
  },
  props: {
    nightMode: {
      type: Boolean,
    },
  },
  data() {
    return {
      profile: null,
      homeTitle: '',
      picture: info.flat_picture,
      description: '',
      name: info.name,
      linkedin: info.links.linkedin,
      github: info.links.github,
      behance: info.links.behance,
      resume: info.links.resume
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      getDataService.getProfile().then((response) => {
        this.profile = response.data;
        this.picture = this.profile.image;
        this.homeTitle = this.profile.title;
        this.description = this.profile.description;
      });
    },
    update() {
      let form = document.querySelector('#form');
      console.log(form)
      getDataService.update(form).then(() => {
        this.getProfile();
      });
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

.home-title {
  font-size: 55px;
  font-weight: 500;
}

img {
  max-width: 800px;
  max-height: 500px;
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
