<template>
  <div
      :class="{ 'bg-white': !nightMode, 'bg-dark': nightMode }"
      class="p-st"
      style="position: relative;"
  >
    <img :src="picture" style="width: 100%; height: auto; margin-top: -15px" />
    <div
        class="container custom-container"
        data-aos="fade"
        data-aos-once="true"
        data-aos-duration="1000"
        style="position: absolute;top: 12%;left: 50%;transform: translate(-50%, -50%);color: #ffffff;height: auto;">
      <h1 class="slide-title">Hệ thống tin nhắn thương hiệu SMS Brandname VMG </h1>
      <h5 class="slide-content">
        Hỗ trợ hiển thị tên thương hiệu (Brandname) khi gửi tin nhắn Quảng cáo và <br> tin nhắn Chăm sóc khách hàng
      </h5>
      <div class="mt-4">
        <button class="btn" style="margin-right: 15px;" @click="goContact">
          ĐĂNG KÝ NGAY
        </button>
        <button class="btn">
          TIN KHUYẾN MÃI
        </button>
      </div>
    </div>
    <DetailServive />
    <Customer />
  </div>
</template>

<style scoped>

</style>

<script>
import info from "../../../../info";
import Customer from "@/components/brand/home/Customer.vue";
import DetailServive from "@/components/brand/home/DetailServive.vue";
export default {
  name: "Home",
  components: {
    DetailServive,
    Customer,
  },
  data() {
    return {
      picture: info.flat_picture,
    };
  },
  methods: {
    goContact() {
      this.$router.push('/contact').catch(() => {});
    },
  },
};
</script>

<style scoped>
.custom-container {

  color: #ffffff;
}

.btn {
  width: 218px;
  padding: 16px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-color: #ffffff;
  background-color: white;
  color: #3380CB;
}
.btn:hover {
  background-color: #3380CB;
  border-color: white;
  color: white;
}

.btn:focus {
  background-color: #3380CB;
  border-color: #3380CB;
  color: white;
}
.slide-title {
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 42px;
}
.slide-content {
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
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

/* LEAVES */
</style>
