<template>
  <div
      :class="{ 'bg-white': !nightMode, 'bg-dark': nightMode }"
      class="p-st"
      style="position: relative;"
  >
    <img :src="picture" style="width: 100%; height: auto; margin-top: -15px" />
    <div
        class="container1 custom-container"
        data-aos="fade"
        data-aos-once="true"
        data-aos-duration="1000"
        style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #ffffff;
        padding: 20px;
        /* Đặt các thuộc tính khác cho phần tử con */
      "
    >
      <h1 style="font-size: 50px">Hệ thống tin nhắn SMS quảng cáo và <br> chăm sóc khách hàng</h1>
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
    <div style="text-align: left; margin-top: -50px; color: white">
      <h5 style="margin-left: 140px"><strong>HOTLINE: 123456789</strong></h5>
    </div>
  </div>

</template>

<style scoped>

</style>

<script>
import info from "../../../info";
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
.container1 {
  margin-left: -400px !important;
  text-align: left;
}
.custom-container {

  color: #ffffff;
}

.btn {
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
