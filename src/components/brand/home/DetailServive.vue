<template>
  <div
    class="py-4 p-st"
    :class="{
      'bg-light': !nightMode,
      'bg-dark2': nightMode,
      'text-light': nightMode,
    }"
  >
    <div class="container mt-3">
      <div
          class="text-center"
          data-aos="fade"
          data-aos-once="true"
          data-aos-duration="1000"
      >
    <span
        class="title text-center"
        :class="{ pgray: !nightMode, 'text-light': nightMode }"
    >
      Dịch vụ tin nhắn thương hiệu (SMS brandname)
    </span>
        <p class="text-center mt-2">SMS Brandname (Tin nhắn thương hiệu) là dịch vụ gửi tin nhắn hàng loạt, cho phép các doanh nghiệp gửi tin nhắn chăm sóc khách hàng và quảng bá đến hàng trăm ngàn người trong khoảng thời gian ngắn và hiển thị tên thương hiệu của doanh nghiệp ở mục người gửi.</p>
      </div>
      <br>
      <div class="row">
        <div class="col-md-12 col-12">
          <h2 class="title text-center mt-5">Các dịch vụ SMS Brandname của VMG</h2>
        </div>
      </div>
    </div>
    <br><br>
    <div class="image-container mt-4">
      <div
          v-for="image in listImg"
          :key="image.name"
          class="image-item"
      >
        <img :src="image.img" :alt="image.name" />
        <span class="image-name">{{ image.name }}</span>
      </div>
    </div>
    <br><br>
    <div class="row">
      <div class="col-md-12 col-12">
        <h2 class="title text-center mt-5">Lý do lựa chọn sử dụng dịch vụ</h2>
      </div>
    </div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-6 text-center">
          <h5 class="h5-spacing">Vì chúng tôi mà số 2 thì không ai số 1</h5>
          <h5 class="h5-spacing">Chúng tôi có những phẩm chất tốt đẹp =)</h5>
          <h5 class="h5-spacing">Chúng tôi có kinh nghiệm chuyên môn =)</h5>
        </div>
        <div class="col-6 text-center">
          <h5 class="h5-spacing">Vì chúng tôi mà số 2 thì không ai số 1</h5>
          <h5 class="h5-spacing">Chúng tôi có những phẩm chất tốt đẹp =)</h5>
          <h5 class="h5-spacing">Chúng tôi có kinh nghiệm chuyên môn =)</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import info from "../../../../info";
export default {
  name: "Portfolio",
  components: {
  },
  props: {
    nightMode: {
      type: Boolean,
    },
  },
  data() {
    return {
      listImg: info.smsMkt,
      httm: info.httm,
      httm2: info.httm2,
    };
  },
};
</script>

<style scoped>
.h5-spacing {
  margin-bottom: 40px; /* Tuỳ chỉnh khoảng cách giữa các thẻ h5 */
}
.image-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 240px; /* Cách lề 2 bên 20px */
}

.image-item {
  position: relative;
  text-align: center;
}

.image-item img {
  width: 250px; /* Tuỳ chỉnh kích thước ảnh theo nhu cầu */
  height: 250px; /* Để tự động điều chỉnh chiều cao dựa trên tỷ lệ */
}

.image-name {
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  padding: 5px 10px; /* Tuỳ chỉnh padding */
  border-radius: 5px; /* Tuỳ chỉnh góc bo tròn */
}

/* Tuỳ chỉnh kích thước của hình ảnh nếu cần thiết */
.image-container img {
  width: 250px; /* Ví dụ: đặt kích thước 100px cho hình ảnh */
  height: 250px; /* Để tự động điều chỉnh chiều cao dựa trên tỷ lệ */
}
.title {
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 52px;
}
</style>
