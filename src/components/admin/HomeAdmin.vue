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
            <img v-if="this.file === null" :src="getImageUrl(profile.image)">
            <img v-else :src="fileShow">
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
    <Loading :loading="loading" />
  </div>
</template>

<script>


import info from "../../../info";
import {GetDataService as getDataService} from "@/service/get-data-service";
import Swal from "sweetalert2";
import Loading from "@/components/helpers/Loading.vue";

export default {
  name: "HomeAdmin",
  components: {
    Loading
  },
  props: {
    nightMode: {
      type: Boolean,
    },
  },
  data() {
    return {
      file: null,
      fileShow: null,
      profile: null,
      homeTitle: '',
      picture: info.flat_picture,
      description: '',
      name: info.name,
      linkedin: info.links.linkedin,
      github: info.links.github,
      behance: info.links.behance,
      resume: info.links.resume,
      loading: false
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    async handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.file = file;
        this.fileShow = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxSize = Math.min(img.width, img.height);
            canvas.width = maxSize;
            canvas.height = maxSize;
            const ctx = canvas.getContext('2d');
            const offsetX = img.width > maxSize ? (img.width - maxSize) / 2 : 0;
            const offsetY = img.height > maxSize ? (img.height - maxSize) / 2 : 0;
            ctx.drawImage(img, offsetX, offsetY, maxSize, maxSize, 0, 0, maxSize, maxSize);
            const dataURL = canvas.toDataURL(file.type);
            this.fileShow = dataURL;
            // convert lại file trước khi gửi về server
            canvas.toBlob(async (blob) => {
              const fileName = file.name; // Preserve the original file name
              const newFile = new File([blob], fileName, { type: file.type });
              this.file = newFile; // Set this.file to the cropped File
            }, file.type);
          };
        };
        reader.readAsDataURL(file);
      }
    },
    getImageUrl(imageName) {
      return `https://anhcuatoi.s3.ap-southeast-1.amazonaws.com/${imageName}`;
    },
    getProfile() {
      getDataService.getProfile().then((response) => {
        this.profile = response.data;
        this.homeTitle = this.profile.title;
        this.description = this.profile.description;
      });
    },
    async update() {
      if (!this.homeTitle) {
        await Swal.fire({
          title: 'Vui lòng nhập tiêu đề',
          html: '<div class="custom-circle"><i class="fas fa-exclamation-circle" style="color: #FFCC00; font-size: 60px;"></i></div>',
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }
      if (!this.description) {
        await Swal.fire({
          title: 'Vui lòng nhập mô tả',
          html: '<div class="custom-circle"><i class="fas fa-exclamation-circle" style="color: #FFCC00; font-size: 60px;"></i></div>',
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }
      this.loading = true;
      const formData = new FormData();
      formData.append('title', this.homeTitle);
      formData.append('description', this.description);
      if (this.file) {
        formData.append('image', this.file);
      }
      await getDataService.update(formData).then(() => {
        this.loading = false;
        Swal.fire({
          title: 'Xong',
          html: '<div class="custom-circle"><i class="fas fa-check-circle" style="color: #e8237c; font-size: 60px;"></i></div>',
          showConfirmButton: false,
          timer: 2000,
        });
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
  border-color: #e8237c;
  color: #e8237c;
}

.btn:hover {
  background-color: #e8237c;
  border-color: #e8237c;
  color: white;
}

.btn:focus {
  background-color: #e8237c;
  border-color: #e8237c;
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

