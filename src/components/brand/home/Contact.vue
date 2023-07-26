<template>
  <div class="container mt-4">
    <div
        class="text-center"
        data-aos="fade"
        data-aos-once="true"
        data-aos-duration="1000"
    >
      <p style="font-size: 20px;font-style: normal;font-weight: 700;line-height: 28px;">Vui lòng để lại thông tin, chúng tôi sẽ liên lạc với bạn.</p>
      <p style="margin-top: -12px;font-size: 18px;font-style: normal;font-weight: 400;line-height: 32px;">Chúng tôi rất trân trọng mọi sự quan tâm mà bạn đang dành cho dịch vụ tin nhắn thương hiệu SMS Brandname của VMG MEDIA. </p>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="text-center">
          <img :src="contact" style="width: 60%" alt="" class="img-responsive">
        </div>
        <div>
          <h4>Thông tin liên hệ</h4>
          <table style="margin-top: 10px">
            <tr>
              <th style="width: 180px"></th>
              <th></th>
            </tr>
            <tr>
              <td style="vertical-align: top">Trụ sở chính:</td>
              <td>Tầng 6 Peakview Tower, 36 Hoàng Cầu, P.Ô Chợ Dừa, Q.Đống Đa, Hà Nội</td>
            </tr>
            <tr>
              <td style="vertical-align: top">Văn phòng HCM:</td>
              <td>Toà nhà Văn phòng VMG, 96-98 Đào Duy Anh, P.9, Q.Phú Nhuận, TP.HCM</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>sale.smsbrand@vmgmedia.vn</td>
            </tr>
            <tr>
              <td>Hotline:</td>
              <td>19001255</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="col-1"></div>
      <div class="col-5 form-container">
        <br>
        <form class="custom-form">
          <div class="form-group">
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Tên ">
          </div>
          <div class="form-group">
            <input type="number" class="form-control" id="exampleInputPassword1" placeholder="Số điện thoại">
          </div>
          <div class="form-group">
            <input type="email" class="form-control" id="exampleInputPassword1" placeholder="Email">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Lĩnh vực kinh doanh của bạn là gì?">
          </div>
          <div class="form-group form-check">
            <p style="font-size: 16px;font-style: normal;font-weight: 500;">Bạn là khách hàng cá nhân hay doanh nghiệp?</p>
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
  </div>
</template>

<script>
import info from "../../../../info";

export default {
  name: "Contact",
  data() {
    return {
      contact: info.contact,
    };
  },
}

</script>

<style scoped>
.img-responsive {
  max-width: 100%; /* Hình ảnh sẽ có rộng tối đa là 100% của thẻ div chứa nó */
  height: auto; /* Đảm bảo tỷ lệ chiều rộng/chiều cao không bị méo */
}
.custom-form {
  padding: 20px; /* Khoảng cách giữa nội dung và border */

}
.form-container {
  display: inline-block; /* Để div chỉ chiếm không gian cần thiết */
  padding: 10px; /* Khoảng cách giữa div và form */
  border: 1px solid #d5d5d5; /* Màu và độ dày của border */
  border-radius: 10px; /* Độ cong của border (bo góc) */
}
</style>
