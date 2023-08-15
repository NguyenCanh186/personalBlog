<template>
  <div style="margin-top: -50px">
      <div class="modal-wrapper">
        <div
            class="container"
        >
          <div class="title1">
            <span>
                Chỉnh sửa bài viết
              </span>
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
              <div class="row">
                <div class="col-8">
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
                          style="width: 80%"
                      />
                    </div>
                    <div class="col-6 "> <!-- Sử dụng lớp text-right để căn phải -->
                      <label for="selectOption">Thể loại:</label><br>
                      <select class="pinput" id="selectOption" style="width: 80%;"  v-model="category">
                        <option value="1">Tin khuyến mại</option>
                        <option value="2">Tin khách hàng</option>
                        <option value="3">Tin quảng cáo</option>
                      </select>
                    </div>
                  </div>
                  <label for="description">Mô tả:</label>
                  <textarea
                      class="text"
                      id="description"
                      type="text"
                      name="description"
                      v-model="description"
                      rows="3"
                      placeholder="Nhập mô tả"
                  style="width: 100%"
                  ></textarea>
                </div>
                <div class="col-4">
                  <div class="image-container">
                    <img v-if="!cover" style="width: 100%" :src="`http://localhost:8080/image/${coverShow}`" alt="Preview" />
                    <img v-else style="width: 100%" :src="coverShow" alt="Preview" />
                    <label class="btn btn-file image-button">
                      <i class="fas fa-camera"></i>
                      <input type="file" @change="handleFileCoverChange($event)" />
                    </label>
                  </div>
                </div>

              </div>
              <tinymce v-model="content" ref="content" />
            </div>

          </div>
          <div class="text-center pb-3">
            <hr
                class="mt-1 mb-4"
            />
            <button class="btn-add w-25" @click="submitData">Chỉnh sửa</button>
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
import Tinymce from "@/components/tinymce/tinymce/index.vue";
import Snackbar from "@/components/Snackbar.vue";
import { GetDataService } from "@/service/get-data-service";
import Swal from 'sweetalert2';
export default {
  name: "EditStory",
  data() {
    return {
      data: {},
      category: null,
      cover: null,
      coverShow: null,
      storyTitle: "",
      description: '',
      content: ``,
      showSnackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
      currentStory: [],
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
    this.getNewsById()
    GetDataService.getNews().then((response) => {
      this.currentStory = response.data
    });
    },
  methods: {
    async getNewsById() {
      const fullPath = this.$route.fullPath;
      this.id = fullPath.split("/")[3];
      await GetDataService.getNewsById(this.id).then((response) => {
        this.data = response.data
        console.log(this.data)
      });
      await this.convertData()

    },
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
    async convertData() {
      this.coverShow = this.data.cover;
      this.content = this.data.content;
      this.category = this.data.category;
      this.storyTitle = this.data.title;
      this.description = this.data.description;
    },
    closeSnackbar(val) {
      if (!val) {
        setTimeout(() => {
          this.showSnackbar = val;
        }, 1000);
      }
    },
    async submitData() {
      for (let i = 0; i < this.currentStory.length; i++) {
        if (this.storyTitle.trim() === this.currentStory[i].title && this.storyTitle.trim() !== this.data.title) {
          this.showSnackbar = true;
          this.snackbarMessage = "Tên đã tồn tại!";
          this.snackbarColor = "#64808E";
          return;
        }
      }
      if (!this.category) {
        this.showSnackbar = true;
        this.snackbarMessage = "Vui lòng chọn thể loại tin!";
        this.snackbarColor = "#64808E";
        return;
      }
      if (!this.storyTitle.trim()) {
        // Kiểm tra nếu trường tên hoặc tiêu đề trống hoặc chỉ gồm khoảng trắng, thông báo lỗi
        this.showSnackbar = true;
        this.snackbarMessage = "Vui lòng nhập đầy đủ thông tin!";
        this.snackbarColor = "#64808E";
        return;
      }
      if (!this.content.trim()) {
        // Kiểm tra nếu trường nội dung trống hoặc chỉ gồm khoảng trắng, thông báo lỗi
        this.showSnackbar = true;
        this.snackbarMessage = "Vui lòng nhập nội dung!";
        this.snackbarColor = "#64808E";
        return;
      }
      if (!this.description) {
        // Kiểm tra nếu trường nội dung trống hoặc chỉ gồm khoảng trắng, thông báo lỗi
        this.showSnackbar = true;
        this.snackbarMessage = "Vui lòng nhập mô tả!";
        this.snackbarColor = "#64808E";
        return;
      }
      console.log(123)
            const formData = new FormData();
            formData.append('id', this.data.id);
            if (this.cover) {
              formData.append('cover', this.cover);
            }
            formData.append('category', this.category);
            formData.append('description', this.description);
            formData.append('title', this.storyTitle);
            formData.append('content', this.content);
            try {
              await GetDataService.updateNews(formData).then((res) => {
                if (!res) {
                  // If there was an error in adding the item, show a snackbar and return
                  this.showSnackbar = true;
                  this.snackbarMessage = "Đã có lỗi xảy ra!";
                  this.snackbarColor = "#64808E";
                  return;
                }
                Swal.fire({
                  title: 'Xong',
                  html: '<div class="custom-circle"><i class="fas fa-check-circle" style="color: #00CCCC; font-size: 60px;"></i></div>',
                  showConfirmButton: false,
                  timer: 2000,
                });
                this.$router.back()
              });
            } catch (error) {
              console.error(error);
            await Swal.fire({
              title: 'Xong',
              html: '<div class="custom-circle"><i class="fas fa-check-circle" style="color: #00CCCC; font-size: 60px;"></i></div>',
              showConfirmButton: false,
              timer: 2000,
            });
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

.title1 {
  font-size: 24px;
  font-weight: 400;
}
.pinput {
  font-size: 18px;
  outline: none;
  border: none;
  border-radius: 7px;
  padding: 10px;
  width: 50%;
  height: 39px;
  transition: all 1s;
  background-color: #97d4ff;
}

.text {
  font-size: 18px;
  outline: none;
  border: none;
  border-radius: 7px;
  padding: 10px;
  transition: all 1s;
  background-color: #97d4ff;
}

.btn {
  color: #00CCCC;
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
.image-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: white;
  width: 60px;
  background-color: #17a2b8 !important;
  padding: 5px 10px;
  cursor: pointer;
}

.image-container .btn-file {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: white;
  background-color: #6b6b6b !important;
  padding: 5px 10px;
  cursor: pointer;
}

.btn-file {
  position: relative;
  overflow: hidden;
  width: 50px;
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
