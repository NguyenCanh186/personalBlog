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
import config from "../../../config";
import emailjs from "emailjs-com";

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
    sendEmail() {
      if (!this.email || !this.name || !this.text) {
        this.showSnackbar = true;
        if (!this.email && !this.name && !this.text){
          this.snackbarMessage = "Không nhập cái gì thì gửi bằng niềm tin à";
        } else if (!this.name){
          this.snackbarMessage = "Không nhập tên thì tôi biết bạn là ai :(";
        } else if (!this.email){
          this.snackbarMessage = "Quên không nhập mail kìa bạn êiiii";
        } else if (!this.text){
          this.snackbarMessage = "Định gửi cho tôi cái mail trắng trơn hả " + this.name;
        }
        this.snackbarColor = "#64808E";
      } else {
        var obj = {
          user_email: this.email,
          from_name: this.name,
          message_html: this.text,
          to_name: "Cảnh Nguyễn",
        };

        emailjs
          .send(
            config.emailjs.serviceID,
            config.emailjs.templateID,
            obj,
            config.emailjs.userID
          )
          .then(
            (result) => {
              result.text === "OK"
                ? console.log("Email sent successfully")
                : console.log(result.text);
              this.showSnackbar = true;
              this.snackbarMessage = "Cảm ơn " + this.name + " nha!" +  "Mình sẽ phản hồi sớm nhất.";
              this.snackbarColor = "#1aa260";

              this.email = "";
              this.text = "";
              this.name = "";
            },
            (error) => {
              error.text === "Opps! Something went wrong"
                ? console.log("Email sent failed")
                : console.log(error.text);
              this.showSnackbar = true;
              this.snackbarMessage = "Ôi bạn ơi! Lỗi này Cảnh chưa kịp fix.";
              this.snackbarColor = "#64808E";
            }
          );
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
.title1 {
  font-size: 24px;
  font-weight: 400;
}

.title2 {
  font-size: 20px;
  font-weight: 400;
}

.title3 {
  font-size: 16px;
  font-weight: 400;
}

.pinput {
  font-size: 18px;
  outline: none;
  border: none;
  border-radius: 7px;
  padding: 10px;
  width: 50%;
  transition: all 1s;
  background-color: #97FFFF;
}

.btn {
  border-color: #00CCCC;
  color: #00CCCC;
  width: 50%;
}

.btn:hover {
  background-color: #00CCCC;
  border-color: #00CCCC;
  color: white;
}

.btn:focus {
  background-color: #00CCCC;
  border-color: #00CCCC;
  color: white;
}

.pgray-dark {
  background-color: #3c4148 !important;
}

@media screen and (max-width: 1000px) {
  .pinput {
    width: 90%;
  }
  .pinput {
    width: 90%;
  }

  .btn {
    width: 90%;
  }
}
</style>
