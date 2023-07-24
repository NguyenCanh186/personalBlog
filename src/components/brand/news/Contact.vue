<template>
  <div class="container">
    <div
        class="text-center"
        data-aos="fade"
        data-aos-once="true"
        data-aos-duration="1000"
    >
        <span
            class="title text-center"
        >
          Liên hệ
        </span>
      <p>Vì đặc thù mỗi tính năng và nhóm đối tượng khác nhau, bạn hãy liên hệ với chúng tôi để có giá tốt nhất.</p>
    </div>
    <hr
        width="50%"
    />
    <div class="row">
      <div class="col-6">
        <img :src="contact" alt="" class="img-responsive">
      </div>
      <div class="col-6" style="padding: 5%">
        <br>
        <form>
          <div style="text-align: center">
              <h5 style="color:#3380CB;">ĐĂNG KÝ NHẬN TƯ VẤN MIỄN PHÍ</h5><br>
          </div>

          <div class="form-group">
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nhập tên của bạn *">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Nhập email của bạn *">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Nhập số điện thoại của bạn *">
          </div>
          <div class="form-group">
            <textarea type="text" class="form-control" id="exampleInputPassword1" placeholder="Thêm tin nhắn của bạn" rows="4"></textarea>
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
.title {
  font-size: 30px;
  font-weight: 500;
}
</style>
