<template>
  <div>
    <!-- Các trường nhập dữ liệu -->
    <div class="col-xl-6 col-bg-6 col-md-6 col-sm-12 pt-5">
      <div class="d-flex flex-column align-items-end">
        <input type="text" name="title" style="font-size: 20px" id="title" class="form-control" v-model="storyTitle">
      </div>
      <br>
      <div>
        <div class="d-flex flex-column align-items-end">
          <textarea v-model="storyName" name="description" id="description" class="form-control" rows="6"></textarea>
        </div>
      </div>
    </div>

    <!-- Bảng hiển thị các hàng -->
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
          <span class="delete-icon" @click="deleteRow(item.id)">
      ❌
    </span>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Nút "Thêm mới" -->
    <button @click="addRow">Thêm mới</button>
    <br>
    <!-- Nút "Gửi dữ liệu" -->
    <button @click="submitData()">Gửi dữ liệu</button>
  </div>
</template>

<script>
import { GetDataService } from "@/service/get-data-service";
import index from "vuex";

export default {
  name: "StoryManagement",
  computed: {
    index() {
      return index
    }
  },
  data() {
    return {
      items: [],
      storyName: "",
      storyTitle: "",
      nextId: 1,
    };
  },
  methods: {
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
    async submitData() {
      console.log(123)
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
          console.log(234)
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
.delete-icon {
  cursor: pointer;
  font-size: 20px;
}

.delete-icon-active {
  color: red;
  border: 1px solid red;
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
  background-color: #424141 !important;
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
