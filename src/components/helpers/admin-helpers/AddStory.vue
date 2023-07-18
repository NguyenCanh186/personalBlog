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
                  v-model="storyName"
                  placeholder="Nhập tên Story"
                  class="pinput"
                  style="transition-delay: 0.2s;
         text-align: center;
         line-height: 1.5;"
              />
              <br>
              <label for="title">Tiêu đề:</label> <br>
              <input
                  id="title"
                  type="text"
                  name="title"
                  v-model="storyTitle"
                  placeholder="Nhập tên tiêu đề"
                  class="pinput"
                  style="transition-delay: 0.2s;
         text-align: center;
         line-height: 1.5;"
              />
              <br><br>
              <table>
                <thead>
                <tr>
                  <th style="width: 5%">Stt</th>
                  <th style="width: 30%; text-align: center">Ảnh</th>
                  <th style="width: 60%">Title</th>
                  <th style="width: 5%">Xóa</th> <!-- Add the "Xóa" header -->
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in items" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td style="width: 30%; text-align: center">
                    <div class="image-container">
                      <img v-if="item.image" :src="item.imageShow" alt="Preview" class="image-preview" />
                      <label v-if="!item.image" class="btn btn-file">
                        <span v-if="!item.image">Chọn ảnh</span>
                        <input type="file" @change="handleFileChange(index, $event)" />
                      </label>
                      <label v-else class="btn btn-file-change">
                        <span><i class="fas fa-camera"></i></span>
                        <input type="file" @change="handleFileChange(index, $event)" />
                      </label>
                    </div>
                  </td>
                  <td>
                    <input class="form-control" type="text" v-model="item.title" />
                  </td>
                  <td>
                    <!-- Hiển thị biểu tượng xóa với viền đỏ -->
                    <span class="delete-icon" @click="deleteRow(item.id)">❌</span>
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="d-flex flex-column align-items-center">
                <button class="btn-add-row mt-2 rounded-circle" @click="addRow">
                  <i class="fa fa-plus"></i>
                </button>
              </div>
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
export default {
  name: "AddStory",
  props: {
    showModal: {
      type: Boolean,
    },
  },
  data() {
    return {
      items: [],
      storyName: "",
      storyTitle: "",
      nextId: 1,
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
    deleteRow(id) {
      console.log(this.items);
      console.log(id);
      this.items = this.items.filter(item => item.id !== id);
    },
    addRow() {
      this.items.push({
        id: this.nextId, // Sử dụng biến đếm để tạo id
        title: "",
        image: null,
        imageShow: null,
      });
      this.nextId++; // Tăng biến đếm cho lần thêm phần tử kế tiếp
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
    closeSnackbar(val) {
      if (!val) {
        setTimeout(() => {
          this.showSnackbar = val;
        }, 1000);
      }
    },
    async submitData() {
      if (!this.storyName.trim() || !this.storyTitle.trim()) {
        // Kiểm tra nếu trường tên hoặc tiêu đề trống hoặc chỉ gồm khoảng trắng, thông báo lỗi
        this.showSnackbar = true;
        this.snackbarMessage = "Vui lòng nhập đầy đủ thông tin!";
        this.snackbarColor = "#64808E";
        return;
      }
      if (this.items.length === 0) {
        this.showSnackbar = true;
        this.snackbarMessage = "Vui lòng chọn ít nhất một ảnh!";
        this.snackbarColor = "#64808E";
        return;
      }

      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if (!item.image || !item.title.trim()) {
          this.showSnackbar = true;
          this.snackbarMessage = "Vui lòng điền đủ thông tin ảnh và title cho\ntất cả các mục!";
          this.snackbarColor = "#64808E";
          return;
        }
      }
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        console.log(item)
        if (item.title && item.image) {
          const formData = new FormData();
          formData.append('name', this.storyTitle);
          formData.append('title', this.storyName);
          formData.append('titleImage', item.title);

          // const imageData = this.convertBase64ToBlob(item.image);
          formData.append('image', item.image);
          try {
            const response = await GetDataService.createStory(formData);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
  },
};
</script>

<style scoped>
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
