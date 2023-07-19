<template>
  <div
    :class="{ 'bg-white': !nightMode, 'bg-dark': nightMode }"
    class=" p-st"
  >
    <img :src="picture"/>
    <div
        class="container"
        data-aos="fade"
        data-aos-once="true"
        data-aos-duration="1000"
    >
      <h2>Hệ thống tin nhắn SMS quảng cáo và
        chăm sóc khách hàng</h2>
      <h5>Sử dụng đơn giản, dễ dàng ngay trên Web. Hỗ trợ hiển thị tên thương hiệu (Brandname)
        Tích hợp được với Website, phần mềm sẵn có của doanh nghiệp thông qua API.</h5>
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
  max-width: 100%;
  max-height: 100%;
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
