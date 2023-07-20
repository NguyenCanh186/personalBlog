<template>
  <div
      :class="{ 'bg-white': !nightMode, 'bg-dark': nightMode }"
      class="p-st"
      style="position: relative;"
  >
    <img :src="picture" style="width: 100%; height: auto;" />
    <div
        class="container custom-container"
        data-aos="fade"
        data-aos-once="true"
        data-aos-duration="1000"
        style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.5); /* Đặt nền mờ cho phần tử con */
        color: #ffffff;
        padding: 20px;
        /* Đặt các thuộc tính khác cho phần tử con */
      "
    >
      <h1>Hệ thống tin nhắn SMS quảng cáo và <br> chăm sóc khách hàng</h1>
      <h5>
        Sử dụng đơn giản, dễ dàng ngay trên Web. Hỗ trợ hiển thị tên thương hiệu
        (Brandname) <br> Tích hợp được với Website, phần mềm sẵn có của doanh nghiệp
        thông qua API.
      </h5>
      <div class="mt-4">
        <button class="btn" style="margin-right: 15px;">
          Đăng ký ngay
        </button>
        <button class="btn">
          Tìm hiểu thêm
        </button>
      </div>
    </div>
    <div style="text-align: right; margin-top: -50px; color: white">
      <h5 style="margin-right: 200px"><strong>HOTLINE: 123456789</strong></h5>
    </div>
  </div>

</template>

<style scoped>

</style>

<script>
import info from "../../info";
export default {
  name: "Home",
  components: {
  },
  data() {
    return {
      picture: info.flat_picture,
    };
  },
};
</script>

<style scoped>
.custom-container {
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
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
