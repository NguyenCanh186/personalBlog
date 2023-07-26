<template>
  <div class="mt-5" style="background-color: #3380CB; color: white">
    <div class="container py-3">
      <div class="row">
        <div class="col-md-6 col-12">
          <h4 style="color: white"><strong>SMS BRANDNAME</strong></h4>
          <p><strong>CÔNG TY CỔ PHẦN TRUYỀN THÔNG VMG</strong></p>
          <ul>
            <li>Top 1 sản lượng tin nhắn quảng cáo tại thị trường Việt Nam</li>
            <li>Top 10 sản lượng tin nhắn CSKH</li>
          </ul>
          <div>
            <button class="btn mx-2"
                @click="open('linkedin')"
                v-tooltip.bottom="'Facebook'"
            >
              <i class="fa-brands fa-facebook"></i>
            </button>
            <button
                class="btn mx-2"
                @click="open('github')"
                v-tooltip.bottom="'Tóp tóp'"
            >
              <i class="fa-brands fa-skype"></i>
            </button>
            <button
                class="btn mx-2"
                @click="open('behance')"
                v-tooltip.bottom="'Skype'"
            >
              <i class="fa-regular fa-envelope"></i>
            </button>
            <button
                class="btn mx-2"
                @click="open('resume')"
                v-tooltip.bottom="'Telegram'"
            >
              <i class="fa-solid fa-globe"></i>
            </button>
            <button
                class="btn mx-2"
                @click="open('resume')"
                v-tooltip.bottom="'Telegram'"
            >
              <i class="fa-solid fa-phone"></i>  <span style="font-size: 15px !important;">19001255</span>
            </button>
          </div>
          <br>
          <p><strong>MENU</strong></p>
          <ul>
            <li>Trang chủ</li>
            <li>Tin tức</li>
            <li>API</li>
            <li>Liên hệ</li>
          </ul>
        </div>
        <br><br>
        <div class="col-md-6 col-12">
          <h5><strong>Thông tin liên hệ</strong></h5>
          <p><strong>Trụ sở chính</strong></p>
          <table style="margin-top: -10px">
            <tr>
              <th style="width: 140px"></th>
              <th></th>
            </tr>
            <tr>
              <td style="vertical-align: top">Địa chỉ:</td>
              <td>Tầng 6 Peakview Tower, 36 Hoàng Cầu, P.Ô Chợ Dừa, Q.Đống Đa, Hà Nội</td>
            </tr>
            <tr>
              <td>Điện thoại:</td>
              <td>(04) 3 537 8820 | 19001255 | 0961027266</td>
            </tr>
            <tr>
              <td>Fax:</td>
              <td>(04) 3 772 6091</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>sale.smsbrand@vmgmedia.vn</td>
            </tr>
          </table>
          <br>
          <p><strong>Trụ sở Hồ Chí Minh</strong></p>
          <table style="margin-top: -10px">
            <tr>
              <th style="width: 140px"></th>
              <th></th>
            </tr>
            <tr>
              <td style="vertical-align: top">Địa chỉ:</td>
              <td>Tòa nhà Văn phòng VMG, 96-98 Đòa Duy Anh, P.9, Q.Phú Nhuận, TP.HCM</td>
            </tr>
            <tr>
              <td>Điện thoại:</td>
              <td>(08) 3 999 0998</td>
            </tr>
            <tr>
              <td>Fax:</td>
              <td>(08) 3 930 9037</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>sale.smsbrand@vmgmedia.vn</td>
            </tr>
          </table>
        </div>
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
  color: white;
  background-color: #3380cb;
  font-size: 30px;
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
