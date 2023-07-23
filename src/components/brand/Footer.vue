<template>
  <div style="background-color: #3380CB">
    <div class="container py-3">
      <div class="row">
        <div class="col-md-5 col-12">
          <h5 style="color: white">LIÊN HỆ VỚI CHÚNG TÔI</h5>
          <br>
          <div class="d-flex flex-column">
            <div class="form-group">
              <label style="color: white" for="formGroupExampleInput">Email</label>
              <input type="text" class="form-control" id="formGroupExampleInput" placeholder="">
            </div>
            <div class="form-group">
              <label style="color: white" for="formGroupExampleInput2">Số điện thoại</label>
              <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="">
            </div>
            <div class="d-flex justify-content-end"> <!-- Container chứa nút và dịch sang bên phải -->
              <button style="width: 150px; height: 40px; color: #3380CB; background-color: white" type="submit" class="btn mb-2">Gửi</button>
            </div>
          </div>

        </div>
        <br><br>
        <div class="col-1"></div>
        <div class="col-md-6 col-12">
          <h5 style="color: white">CÔNG TY CỔ PHẦN TRUYỀN THÔNG VMG</h5>
          <br>
          <p style="color: #cbe9ff">
            Trụ sở chính <br>
            Địa chỉ: Tầng 6 Peakview Tower, 36 Hoàng Cầu, P.Ô Chợ Dừa, Q.Đống Đa, Hà Nội <br>
            Điện thoại: (04) 3 537 8820 | 19001255 | 0961027266 <br>
            Fax: (04) 3 772 6091 <br>
            Email: sale.smsbrand@vmgmedia.vn
          </p>
          <div class="text-center">
            <button
                class="btn btn-outline-secondary mx-2 "
                @click="open('linkedin')"
                v-tooltip.bottom="'Facebook'"
            >
              <i class="fa-brands fa-square-facebook"></i>
            </button>
            <button
                class="btn btn-outline-secondary mx-2"
                @click="open('github')"
                v-tooltip.bottom="'Tóp tóp'"
            >
              <i class="fa-brands fa-tiktok"></i>
            </button>
            <button
                class="btn btn-outline-secondary mx-2"
                @click="open('behance')"
                v-tooltip.bottom="'Skype'"
            >
              <i class="fa-brands fa-skype"></i>
            </button>
            <button
                class="btn btn-outline-secondary mx-2"
                @click="open('resume')"
                v-tooltip.bottom="'Telegram'"
            >
              <i class="fa-brands fa-telegram"></i>
            </button>
          </div>
        </div>
<!--        <div class="col-1"></div>-->

      </div>
    </div>
  </div>
</template>

<script>
import info from "../../../info";

export default {
  name: "Footer",
  data() {
    return {
      logo: info.httm2,
      linkedin: info.links.linkedin,
      github: info.links.github,
      behance: info.links.behance,
      resume: info.links.resume,
    };
  },
  methods: {
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
span {
  font-weight: 500;
}

.btn {
  border-color: white;
  color: white;
}

.btn:hover {
  background-color: white;
  border-color: white;
  color: gray;
}

.btn:focus {
  background-color: white;
  border-color: white;
  color: gray;
}
@media screen and (max-width: 767px) {
  .col-md-6 {
    /* Đặt kích thước cột 100% chiều rộng trên thiết bị nhỏ hơn 768px */
    width: 100%;
  }
}
@media screen and (max-width: 580px) {
  .pbelow {
    padding-bottom: 20px;
    text-align: center;
  }
}
</style>
