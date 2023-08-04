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
            <span>
                Chỉnh sửa bài viết
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
              <img v-if="!cover" style="width: 100%" :src="`http://localhost:8080/image/${coverShow}`" alt="Preview" />
              <img v-else style="width: 100%" :src="coverShow" alt="Preview" />
              <br><br>
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
                  <select class="pinput" :value="category" id="selectOption" style="width: 80%"  v-model="category">
                    <option value="1">Tin khuyến mại</option>
                    <option value="2">Tin khách hàng</option>
                    <option value="3">Tin quảng cáo</option>
                  </select>
                </div>

              </div>

              <br><br>
              <table>
                <tbody>
                <tr v-for="(item, index) in items" :key="item.id">
                  <td style="width: 100%; text-align: center">
                    <!-- Image container and input -->
                    <div class="image-container">
                      <img v-if="!item.imageShow && item.image" :src="`http://localhost:8080/image/${item.image}`" alt="Preview" class="image-preview" />
                      <img v-else class="image-preview" :src="item.imageShow" alt="">
                      <label v-if="!item.image" class="btn btn-file">
                        <span v-if="!item.image">Thêm ảnh</span>
                        <input type="file" @change="handleFileChange(index, $event)" />
                      </label>
                      <div v-else>
                        <label  class="btn btn-file-change">
                          <span><i class="fas fa-camera"></i></span>
                          <input type="file" @change="handleFileChange(index, $event)" />
                        </label>
                        <label style="margin-left: 65px"  class="btn btn-file-change">
                          <span><i class="fas fa-trash" @click="deleteFileChange(index)"></i></span>
                        </label>
                      </div>
                    </div>
                    <div class="textarea-container">
                      <textarea rows="6" style="margin-top: 15px" class="form-control" type="text" v-model="item.title" />
                      <span class="delete-icon" @click="deleteRow(item.id)">❌</span>
                    </div>
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
import Snackbar from "@/components/Snackbar.vue";
import { GetDataService } from "@/service/get-data-service";
import Swal from 'sweetalert2';
export default {
  name: "EditStory",
  props: {
    showModal: {
      type: Boolean,
    },
    data: {
      type: Object,
    },
  },
  data() {
    return {
      category: null,
      cover: null,
      coverShow: null,
      items: [],
      storyTitle: "",
      nextId: 1,
      listIdPicture: "",
      showSnackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
      currentStory: [],
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
    this.convertData()
    GetDataService.getNews().then((response) => {
      this.currentStory = response.data
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
    async deleteFileChange(index) {
      this.items[index].imageShow = null;
      this.items[index].image = null;
      if (this.items[index].idRow !== null) {
        this.items[index].isDeletePicture = 'delete';
      }
    },
    close() {
      this.$emit("close");
    },
    deleteRow(id) {
      let itemcheck = null;
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].idRow === id) {
          itemcheck = this.items[i];
          break;
        }
      }
      console.log(itemcheck);
      if (itemcheck !== null) {
        this.listIdPicture += itemcheck.id + ",";
      }
      console.log(this.listIdPicture);
      this.items = this.items.filter(item => item.id !== id);
    },
    async convertData() {
      this.coverShow = this.data.cover;
      this.items = this.data.newsPictures;
      this.category = this.data.category;
      this.storyTitle = this.data.title;
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].idRow = this.items[i].id;
        this.items[i].imageShow = null;
        this.items[i].isDeletePicture = null;
        this.items[i].change = false;
        if (this.items.length -1 === i) {
          this.nextId = this.items[i].id +1
        }
      }
    },
    addRow() {
      this.items.push({
        idRow: null, // Sử dụng biến đếm để tạo id
        title: "",
        image: null,
        imageShow: null,
        change: false,
        id: this.nextId,
      });
      this.nextId++; // Tăng biến đếm cho lần thêm phần tử kế tiếp
    },
    async handleFileChange(index, event) {
      const file = event.target.files[0];
      if (file) {
        if( this.items[index].idRow !== null ) {
          this.items[index].isDeletePicture = null;
        }
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
      if (this.items.length === 0) {
        this.showSnackbar = true;
        this.snackbarMessage = "Vui lòng điền ít nhất một nội dung!";
        this.snackbarColor = "#64808E";
        return;
      }

      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if (!item.title.trim()) {
          this.showSnackbar = true;
          this.snackbarMessage = "Vui lòng điền nội dung cho tất cả các mục!";
          this.snackbarColor = "#64808E";
          return;
        }
      }
      console.log(this.items)
      if (this.items.length >0) {
        for (let i = 0; i < this.items.length; i++) {
          const item = this.items[i];
            const formData = new FormData();
            formData.append('id', this.data.id);
            if (this.cover) {
              formData.append('cover', this.cover);
            }
            if (item.isDeletePicture === 'delete') {
              formData.append('isDeletePicture', 'delete');
            }
            formData.append('category', this.category);
            formData.append('title', this.storyTitle);
            formData.append('titleImage', item.title);
            if (item.idRow) {
              formData.append('pictureId', item.idRow);
            }
            if (item.image && item.image instanceof File) {
              formData.append('image', item.image);
            }
            if (this.listIdPicture.length > 0) {
              formData.append('listIdPicture', this.listIdPicture);
            }
            try {
              const response = await GetDataService.updateNews(formData);
              console.log(response.data);
            } catch (error) {
              console.error(error);
            }

          this.listIdPicture = "";
          if (i === this.items.length - 1) {
            this.$emit("close", true);
            await Swal.fire({
              title: 'Xong',
              html: '<div class="custom-circle"><i class="fas fa-check-circle" style="color: #00CCCC; font-size: 60px;"></i></div>',
              showConfirmButton: false,
              timer: 2000,
            });
          }
        }
      } else {
        const formData = new FormData();
        formData.append('id', this.data.id);
        if (this.cover) {
          formData.append('cover', this.cover);
        }
        formData.append('category', this.category);
        formData.append('title', this.storyTitle);
        if (this.listIdPicture.length > 0) {
          formData.append('listIdPicture', this.listIdPicture);
        }
        try {
          const response = await GetDataService.updateNews(formData);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
        this.$emit("close", true);
        await Swal.fire({
          title: 'Xong',
          html: '<div class="custom-circle"><i class="fas fa-check-circle" style="color: #00CCCC; font-size: 60px;"></i></div>',
          showConfirmButton: false,
          timer: 2000,
        });
        this.listIdPicture = "";
      }

    }
  },
};
</script>

<style scoped>
.textarea-container {
  display: flex;
  align-items: center;
}

.textarea-container textarea {
  flex: 1; /* Dãn tỷ lệ flex cho textarea để chiếm phần còn lại của container */
  margin-right: 5px; /* Khoảng cách giữa textarea và icon xóa */
}

.delete-icon {
  cursor: pointer;
  font-size: 20px;
}

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
  width: 60%;
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
