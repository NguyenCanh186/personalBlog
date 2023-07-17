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
            <img :src="getImageUrl(profile.image)">
            <input type="file" name="image" id="image" @change="handleFileChange($event)">
            <label class="camera-icon">
              <i class="fas fa-camera"></i>
            </label>
          </div>
        </div>
        <div class="col-xl-6 col-bg-6 col-md-6 col-sm-12 pt-5">
          <div class="d-flex flex-column align-items-end">
            <input type="text" name="title" style="font-size: 20px" id="title" class="form-control" v-model="homeTitle">
          </div>
          <br>
          <div>
            <div class="d-flex flex-column align-items-end">
              <textarea v-model="description" name="description" id="description" class="form-control" rows="6"></textarea>
              <button class="btn mt-2" @click="update">Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import info from "../../../info";
import {GetDataService as getDataService} from "@/service/get-data-service";

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
      file: null,
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
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    getImageUrl(imageName) {
      return `http://localhost:8080/image/${imageName}`;
    },
    getProfile() {
      getDataService.getProfile().then((response) => {
        this.profile = response.data;
        this.homeTitle = this.profile.title;
        this.description = this.profile.description;
      });
    },
    async update() {
      const formData = new FormData();
      formData.append('title', this.homeTitle);
      formData.append('description', this.description);
      if (this.file) {
        formData.append('image', this.file);
      }
      await getDataService.update(formData).then(() => {
        this.getProfile();
      });
    },
  },
};
</script>

<style scoped>
.image-container {
  position: relative;
  display: inline-block;
}

.image-container {
  position: relative;
}

.image-container input[type="file"] {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.image-container .camera-icon {
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-top: 50%;
  background: transparent;
  cursor: pointer;
  padding: 0px 20px;
  transform: translate(-50%, -50%);
  font-size: 24px;
  background-color: rgba(65, 63, 63, 0.5);
  color: #ffffff;
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

