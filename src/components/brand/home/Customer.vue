<template>
  <div
    class="py-4 p-st"
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
          >Đối tác sử dụng dịch vụ </span
        >
      </div>
      <br />
      <div class="image-container">
        <div
            v-for="image in listImg"
            :key="image.name"
            class="image-item"
        >
          <img :src="image.img" :alt="image.name" />
          <p class="image-name">{{ image.name }}</p>
        </div>
      </div>
      <p
          class="title text-center mt-5"
      >Liên hệ với chúng tôi </p
      >
      <div class="row">
        <div class="col-6" style="display: flex; align-items: center; flex-direction: column; justify-content: center;">
          <p style="font-size: 22px; font-style: normal; font-weight: 700; line-height: 32px;">
            Chúng tôi luôn sẵn sàng giải đáp yêu cầu của bạn
          </p>
          <p>
            Chúng tôi rất trân trọng mọi sự quan tâm mà bạn đang dành cho dịch vụ tin nhắn thương hiệu SMS Brandname của VMG MEDIA. Vui lòng để lại thông tin, chúng tôi sẽ liên lạc với bạn.
          </p>
        </div>
        <div class="col-1"></div>
        <div class="col-5">
          <form>
            <div class="form-group">
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Tên ">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Số điện thoại">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Email">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Lĩnh vực kinh doanh của bạn là gì?">
            </div>
            <div class="form-group form-check">
              <p style="font-size: 18px;font-style: normal;font-weight: 500;">Bạn là khách hàng cá nhân hay doanh nghiệp?</p>
              <div class="ml-4">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Cá nhân</label><br>
                <input type="checkbox" class="form-check-input" id="exampleCheck2">
                <label class="form-check-label" for="exampleCheck2">Doanh nghiệp</label>
              </div>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Địa chỉ công ty bạn ở đâu?">
            </div>
            <div class="d-flex justify-content-end">
              <button type="submit" class="btn btn-primary" style="width: 100px; background-color: #3380CB">Gửi</button>

            </div>
          </form>
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
import Snackbar from "../../helpers/Snackbar.vue";
import info from "../../../../info";

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
.image-name {
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  text-align: center;
}
.image-container {
  display: flex;
  flex-wrap: wrap; /* To wrap images into multiple lines if needed */
  justify-content: center; /* Horizontally center the images */
  align-items: center; /* Vertically center the images */
}

/* Tuỳ chỉnh kích thước của hình ảnh nếu cần thiết */
.image-container img {
  width: 180px; /* Ví dụ: đặt kích thước 100px cho hình ảnh */
  height: auto; /* Để tự động điều chỉnh chiều cao dựa trên tỷ lệ */
  margin: 20px; /* Add a 40px spacing between each image */
}
.title {
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 52px;
}
</style>
