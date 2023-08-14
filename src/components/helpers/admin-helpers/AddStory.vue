<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div
            class="modal-container"
            :class="{
            'bg-light': !nightMode
          }"
        >
          <div class="title1 px-4 pt-3">
            <span>
                Thêm mới bài viết
              </span>
            <a
                class="pull-right"
                style="font-size: 18px;"
                @click="close()"
            >
              <i class="fas fa-times"></i>
            </a>
            <hr
                class="my-1"
            />
          </div>
          <div style="padding: 30px" class="modal-body my-0 pb-0 px-4 pt-0">
            <div
                data-aos="fade-up"
                data-aos-once="true"
                data-aos-duration="1000"
            >
              <img style="width: 100%" v-if="cover" :src="coverShow" alt="Preview" /><br><br>
              <label style="margin-left: 46% !important;" class="btn btn-file">
                <span>Thêm ảnh bìa</span>
                <input type="file" @change="handleFileCoverChange($event)" />
              </label>
              <br><br>
              <div class="row">
                <div class="col-6">
                  <label for="title">Tên bài viết:</label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    v-model="storyTitle"
                    placeholder="Nhập tên bài viết"
                    class="pinput"
                    style="transition-delay: 0.2s;
                  text-align: center;
                  line-height: 1.5;
                  width: 80%"
                />
                </div>
                <div class="col-6">
                  <label for="selectOption">Thể loại:</label>
                  <select class="pinput" id="selectOption" style="width: 80%"  v-model="category">
                    <option value="1">Tin khuyến mại</option>
                    <option value="2">Tin khách hàng</option>
                    <option value="3">Tin quảng cáo</option>
                  </select>
                </div>

              </div>

              <br><br>
              <tinymce v-model="content" ref="content" />
            </div>

          </div>
          <div class="text-center pb-3">
            <hr
                class="mt-1 mb-4"
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
import Snackbar from "@/components/Snackbar.vue";
import Swal from "sweetalert2";
import Tinymce from "@/components/tinymce/index.vue";
export default {
  name: "AddStory",
  props: {
    showModal: {
      type: Boolean,
    },
  },
  data() {
    return {
      category: null,
      cover: null,
      coverShow: null,
      content: '',
      items: [],
      storyTitle: "",
      nextId: 1,
      showSnackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
      currentNews: [],
    };
  },
  components: {
    Snackbar, Tinymce
  },
  computed: {
    index() {
      return index
    }
  },
  created() {
    GetDataService.getNews().then((response) => {
      this.currentNews = response.data
    });
  },
  methods: {
    async handleFileCoverChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.cover = file;
        this.coverShow = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageURL = e.target.result;
          this.coverShow = imageURL;
        };
        reader.readAsDataURL(file);
      }
    },
    close() {
      this.$emit("close");
    },
    async handleFileChange(index, event) {
      const file = event.target.files[0];
      if (file) {
        const imageData = {
          ...this.items[index],
          title: this.items[index].title,
          image: file, // Gán URL cho thuộc tính image
        };
        this.$set(this.items, index, imageData);
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageURL = e.target.result;
          this.items[index].imageShow = imageURL;
        };
        reader.readAsDataURL(file);
      }
    },
    async deleteFileChange(index) {
          this.items[index].imageShow = null;
          this.items[index].image = null;
    },
    closeSnackbar(val) {
      if (!val) {
        setTimeout(() => {
          this.showSnackbar = val;
        }, 1000);
      }
    },
    async submitData() {
      for (let i = 0; i < this.currentNews.length; i++) {
        if (this.storyTitle.trim() === this.currentNews[i].title.trim()) {
          this.showSnackbar = true;
          this.snackbarMessage = "Tên đã tồn tại!";
          this.snackbarColor = "#64808E";
          return;
        }
      }
      if (!this.category) {
        // Kiểm tra nếu trường tên hoặc tiêu đề trống hoặc chỉ gồm khoảng trắng, thông báo lỗi
        this.showSnackbar = true;
        this.snackbarMessage = "Vui lòng chọn thể loại tin!";
        this.snackbarColor = "#64808E";
        return;
      }

          const formData = new FormData();
          formData.append('cover', this.cover);
          formData.append('title', this.storyTitle);
          formData.append('content', this.$refs.content.content);
          formData.append('category', this.category);
          try {
            await GetDataService.createNews(formData).then((res) => {
              if (!res) {
                // If there was an error in adding the item, show a snackbar and return
                this.showSnackbar = true;
                this.snackbarMessage = "Đã có lỗi xảy ra!";
                this.snackbarColor = "#64808E";
                return;
              }
              this.$emit("close", true);
              Swal.fire({
                title: 'Xong',
                html: '<div class="custom-circle"><i class="fas fa-check-circle" style="color: #00CCCC; font-size: 60px;"></i></div>',
                showConfirmButton: false,
                timer: 2000,
              });
            });
          } catch (error) {
            // Handle any exceptions during the API call (optional)
            console.error(error);
            this.showSnackbar = true;
            this.snackbarMessage = "Đã có lỗi xảy ra!";
            this.snackbarColor = "#64808E";
            return;
          }
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
  width: 80%;
  max-height: 90%;
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
}

th,
td {
  text-align: center;
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
  max-width: 30%;
  max-height: 30%;
}
@media only screen and (max-width: 580px) {
  .image-preview {
    max-width: 100%;
    max-height: 100%;
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
  left: 48%;
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
  width: 120px;
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
