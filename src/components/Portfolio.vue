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
          >Chi tiết các dịch vụ</span
        >
      </div>
      <hr
        width="50%"
        :class="{ pgray: !nightMode, 'bg-secondary': nightMode }"
      />
      <br>
      <div class="row">
        <div class="col-2">
          <label style="text-align: center" for="" class="label-number ">1</label>
        </div>
        <div class="col-10">
          <h2 style="margin-left: -20px" class="mt-2">Dịch vụ SMS Marketing & Chăm sóc khách hàng...</h2>
        </div>
      </div>
    </div>
    <br><br>
    <div class="image-container">
      <img v-for="image in listImg" :key="image.id" :src="image.img" :alt="image.alt" />
    </div>
    <br><br>
    <div class="container mt-5">
      <div
          class="text-left"
          data-aos="fade"
          data-aos-once="true"
          data-aos-duration="1000"
      >
      <br>
      <div class="row">
        <div class="col-5">
          <img :src="httm" alt="" class="fit-image" />
        </div>
        <div class="col-1"></div>
        <div class="col-6 mt-5">
          <label style="text-align: left" for="" class="label-number">2</label> <br>
          <h2 class="mt-2">Hệ thống thông minh – Hỗ trợ xử lý dựa trên thuật toán AI</h2>
          <p>Lập lịch chiến dịch - Thống kê báo cáo.
            Lưu trữ data - Phân tích nhóm đối tượng khách hàng.
            Công nghệ Big Data mới nhất được ứng dụng trực tiếp.
            Cung cấp API tất cả các dịch vụ trên hệ thống.</p>
        </div>
      </div>
    </div>
  </div>
    <br>
    <br>
    <div class="container mt-5">
      <div
          class="text-left"
          data-aos="fade"
          data-aos-once="true"
          data-aos-duration="1000"
      >
        <br>
        <div class="row">
          <div class="col-6 mt-5">
            <label style="text-align: left" for="" class="label-number">3</label> <br>
            <h2 class="mt-2">Tính năng mới - Và duy nhất</h2>
            <p>VMG luôn cập nhật xu hướng Marketing và triển khai các tính năng mới hỗ trợ khách hàng đạt hiệu quả cao nhất trong các chiến dịch tiếp cận mục tiêu kinh doanh của mình.
              <br>
              Vì là một hệ thống SMS Global, nên VMG luôn hỗ trợ hết mình cho khách hàng ở mọi góc độ là đại lý SMS hay người dùng cuối.</p>
          </div>

          <div class="col-1"></div>

          <div class="col-5">
            <img :src="httm" alt="" class="fit-image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import info from "../../info";
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
    };
  },
};
</script>

<style scoped>
.col-5 {
  width: 50%; /* Độ rộng 50% của phạm vi cha (chẳng hạn nếu cha là dạng Grid hoặc Flexbox) */
  max-width: 100%; /* Độ rộng tối đa là 100% phạm vi cha */
}

.fit-image {
  max-width: 100%; /* Hạn chế chiều rộng tối đa của hình ảnh */
  max-height: 100%; /* Hạn chế chiều cao tối đa của hình ảnh */
}
.image-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 240px; /* Cách lề 2 bên 20px */
}

/* Tuỳ chỉnh kích thước của hình ảnh nếu cần thiết */
.image-container img {
  width: 250px; /* Ví dụ: đặt kích thước 100px cho hình ảnh */
  height: 330px; /* Để tự động điều chỉnh chiều cao dựa trên tỷ lệ */
}
.label-number {
  margin: 0 0 15px 20px;
  width: 50px;
  height: 50px;
  position: relative;
  background-color: #17a2b8;
  color: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 6;
  font-size: 26px;
  font-weight: 600;
}
.label-number:after {
  content: '';
  width: 90px;
  height: 90px;
  position: absolute;
  background-color: rgba(67, 194, 194, 0.17);
  z-index: -1;
  border-radius: 50%;
}
.title {
  font-size: 37px;
  font-weight: 500;
}
</style>
