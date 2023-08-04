<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div
            class="modal-container"
            :class="{
            'bg-light': !nightMode,
            'bg-dark': nightMode,
            'text-light': nightMode,
          }"
        >
          <div class="title1 px-4 pt-3">
            <span :class="{ 'text-light': nightMode }">
                Thêm mới Story
              </span>
            <a
                class="pull-right"
                style="font-size: 18px;"
                @click="close()"
            ><i class="fas fa-times"></i
            ></a>
            <hr
                class="my-1"
                :class="{ pgray: !nightMode, 'bg-secondary': nightMode }"
            />
          </div>
          <div style="padding: 30px" class="modal-body my-0 pb-0 px-4 pt-0">
            <div
                data-aos="fade-up"
                data-aos-once="true"
                data-aos-duration="1000"
            >
              <label for="name">Tên:</label> <br>
              <input
                  id="name"
                  type="text"
                  name="name"
                  v-model="name"
                  placeholder="Nhập tên Blog"
                  class="pinput"
                  style="transition-delay: 0.2s;
         text-align: center;
         line-height: 1.5;"
              />
              <br>
              <label for="file">Chọn ảnh:</label>
              <br>
              <img v-if="fileShow" :src="fileShow" alt="Ảnh" class="image-preview"/>
              <input type="file" id="file" @change="handleFileChange($event)">
              <br>
              <label for="title">Nội dung:</label> <br>
              <textarea
                  id="title"
                  type="text"
                  name="title"
                  v-model="content"
                  placeholder="Nhập nội dung"
                  class="pinput"
                  style="transition-delay: 0.2s; width: 100%;
  text-align: center;
  line-height: 1.5;"
                  rows="6"
              ></textarea>
            </div>
          </div>
          <div class="text-center pb-3">
            <hr
                class="mt-1 mb-4"
                :class="{ pgray: !nightMode, 'bg-secondary': nightMode }"
            />
            <button class="btn-add w-25" @click="submitData">Thêm mới</button>
          </div>
        </div>
      </div>
    </div>
    <Snackbar
        :showSnackbar="showSnackbar"
        @close="closeSnackbar"
        :snackbarMessage="snackbarMessage"
        :snackbarColor="snackbarColor"
    />
  </div>
</template>

<script>
import index from "vuex";
import { GetDataService } from "@/service/get-data-service";
import Snackbar from "@/components/helpers/Snackbar.vue";
import Swal from "sweetalert2";
export default {
  name: "AddBlog",
  props: {
    showModal: {
      type: Boolean,
    },
  },
  data() {
    return {
      name: "",
      content: "",
      file: null,
      fileShow: null,
      showSnackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
    };
  },
  components: {
    Snackbar,
  },
  computed: {
    index() {
      return index
    }
  },
  created() {
  },
  methods: {
    close() {
      this.$emit("close");
    },
    handleFileChange(event) {
      const file = event.target.files[0];

      if (file) {
        this.file = file; // Gán file được chọn cho thuộc tính file
        this.fileShow = URL.createObjectURL(file); // Gán URL của ảnh cho thuộc tính fileShow
      } else {
        this.fileShow = null; // Nếu không có ảnh được chọn, gán giá trị null cho fileShow
      }
    },
    closeSnackbar(val) {
      if (!val) {
        setTimeout(() => {
          this.showSnackbar = val;
        }, 1000);
      }
    },
    async submitData() {
      if (!this.name.trim() || !this.content.trim()) {
        // Kiểm tra nếu trường tên hoặc tiêu đề trống hoặc chỉ gồm khoảng trắng, thông báo lỗi
        this.showSnackbar = true;
        this.snackbarMessage = "Vui lòng nhập đầy đủ thông tin!";
        this.snackbarColor = "#64808E";
        return;
      }
      if (!this.file) {
        this.showSnackbar = true;
        this.snackbarMessage = "Vui lòng chọn ít nhất một ảnh!";
        this.snackbarColor = "#64808E";
        return;
      }
      const formData = new FormData();
      formData.append("title", this.name);
      formData.append("fileImage", this.file);
      formData.append("content", this.content);
      GetDataService.createBlog(formData).then(async (response) => {
        if (response === "done") {
          this.$emit("close", true);
          await Swal.fire({
            title: 'Xong',
            html: '<div class="custom-circle"><i class="fas fa-check-circle" style="color: #00CCCC; font-size: 60px;"></i></div>',
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          this.showSnackbar = true;
          this.snackbarMessage = "Tiêu đề đã tồn tại!";
          this.snackbarColor = "#64808E";
        }

      });
    }
  },
};
</script>

<style scoped>
.custom-circle {
  display: inline-block;
  width: 100px; /* Điều chỉnh kích thước vòng tròn tại đây */
  height: 100px; /* Điều chỉnh kích thước vòng tròn tại đây */
  border-radius: 50%; /* Tạo vòng tròn */
  border: 3px solid #00CCCC; /* Màu viền vòng tròn */
  text-align: center;
}
body.modal-open {
  overflow: hidden;
}

a {
  text-decoration: none;
  color: black;
  transition: all 0.2s;
  cursor: pointer;
}

a:hover {
  transition: all 0.2s;
  color: gray;
}
.date {
  font-size: 14px;
  font-weight: 400;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.5s ease;
}

.modal-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.modal-container {
  width: 50%;
  max-height: 80%;
  min-height: 80%;
  margin: 0px auto;
  border-radius: 7px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  flex-direction: column;
  display: flex; /*added*/
}

@media screen and (max-width: 1600px) {
  .modal-container {
    width: 60%;
    height: 80%;
  }
}

@media screen and (max-width: 1200px) {
  .modal-container {
    width: 80%;
    height: 80%;
  }
}

@media screen and (max-width: 580px) {
  .modal-container {
    margin-top: -80px;
    width: 95%;
    height: 60%;
    min-height: 60%;
  }
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.title1 {
  font-size: 24px;
  font-weight: 400;
}

.modal-body {
  margin: 20px 0;
  overflow-y: scroll;
  max-height: inherit;
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
  color: #00CCCC;
}

.btn-add-row {
  border: 1px solid #00CCCC;
  color: #00CCCC;
  background-color: white;
}

.btn-add {
  margin-top: -20px;
  width: 150px;
  height: 40px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #00CCCC;
  color: #00CCCC;
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

@media screen and (max-width: 1000px) {
  .pinput {
    width: 100%;
  }
}

.delete-icon {
  cursor: pointer;
  font-size: 20px;
}
/* Định dạng cho bảng */
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: center;
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

/* Định dạng cho nút "Thêm mới" */
button {
  margin-top: 10px;
}

/* Định dạng kích thước ảnh */
.image-preview {
  max-width: 20%;
  max-height: 20%;
}
@media only screen and (max-width: 580px) {
  .image-preview {
    max-width: 45%;
    max-height: 45%;
  }
}
/* ... */
.image-container {
  position: relative;
  display: inline-block;
}

.image-container .btn-file {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: white;
  background-color: #17a2b8 !important;
  padding: 5px 10px;
  cursor: pointer;
}

.btn-file-change {
  position: relative;
  overflow: hidden;
  width: 70px;
  height: 28px;
  font-size: 12px;
  color: white;
  background-color: #606060 !important;
}

.btn-file-change {
  position: relative;
  overflow: hidden;
  width: 50px;
  height: 28px;
  font-size: 17px;
  color: white;
  background-color: #606060 !important;

}

.image-container .btn-file-change {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: white;
  background-color: #757575 !important;
  padding: 5px 10px;
  cursor: pointer;
}
/* ... */


.btn-file {
  position: relative;
  overflow: hidden;
  width: 70px;
  height: 28px;
  font-size: 12px;
  color: white;
  background-color: #17a2b8 !important;
}
.btn-file input[type=file] {
  /*color: #00CCCC;*/
  position: absolute;
  top: 0;
  right: 0;
  min-width: 10%;
  min-height: 10%;
  font-size: 10px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  background: white;
  cursor: inherit;
  display: block;
}

.btn-file-change input[type=file] {
  /*color: #00CCCC;*/
  position: absolute;
  top: 0;
  right: 0;
  min-width: 10%;
  min-height: 10%;
  font-size: 10px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  background: white;
  cursor: inherit;
  display: block;
}
</style>
