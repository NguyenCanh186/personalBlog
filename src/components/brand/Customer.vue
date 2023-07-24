<template>
  <div
    class="py-4 p-st"
    :class="{
      'bg-light': !nightMode,
      'bg-dark2': nightMode,
      'text-light': nightMode,
    }"
  >
    <div class="container">
      <div
        class="text-center"
        data-aos="fade"
        data-aos-once="true"
        data-aos-duration="1000"
      >
        <span
          class="title text-center"
          :class="{ pgray: !nightMode, 'text-light': nightMode }"
          >KHÁCH HÀNG CỦA CHÚNG TÔI</span
        >
        <p>Được sự tin tưởng của hơn 68.000 khách hàng trong đó có cả khách hàng cá nhân và doanh nghiệp,<br> luôn nhận được sự ưu tiên triển khai dịch vụ từ khách hàng so với các hệ thống khác.</p>
      </div>
      <hr
        width="50%"
        :class="{ pgray: !nightMode, 'bg-secondary': nightMode }"
      />
      <br />
      <div class="text-center">
        <div class="image-container">
          <img v-for="image in listImg" :key="image.id" :src="image.img" :alt="image.alt" />
        </div>
      </div>


      <Snackbar
        :showSnackbar="showSnackbar"
        @close="closeSnackbar"
        :snackbarMessage="snackbarMessage"
        :snackbarColor="snackbarColor"
      />
    </div>
  </div>
</template>

<script>
import Snackbar from "../helpers/Snackbar.vue";
import info from "../../../info";

export default {
  name: "Contact",
  components: {
    Snackbar,
  },
  props: {
    nightMode: {
      type: Boolean,
    },
  },
  data() {
    return {
      listImg: info.customer,
      email: "",
      name: "",
      text: "",
      showSnackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
    };
  },
  methods: {
    closeSnackbar(val) {
      if (!val) {
        setTimeout(() => {
          this.showSnackbar = val;
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
.image-container {
  display: flex;
  flex-wrap: wrap; /* To wrap images into multiple lines if needed */
  justify-content: center; /* Horizontally center the images */
  align-items: center; /* Vertically center the images */
}

/* Tuỳ chỉnh kích thước của hình ảnh nếu cần thiết */
.image-container img {
  width: 100px; /* Ví dụ: đặt kích thước 100px cho hình ảnh */
  height: auto; /* Để tự động điều chỉnh chiều cao dựa trên tỷ lệ */
  margin: 20px; /* Add a 40px spacing between each image */
}
.title {
  font-size: 30px;
  font-weight: 500;
}
</style>
