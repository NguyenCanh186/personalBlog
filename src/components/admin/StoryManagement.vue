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
        <th>Thứ tự</th>
        <th>Ảnh</th>
        <th>Title</th>
        <th>Xóa</th> <!-- Add the "Xóa" header -->
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="item.id">
        <td>{{ index + 1 }}</td>
        <td>
          <div class="image-container">
          <img v-if="item.image" :src="item.image" alt="Preview" class="image-preview" /><br>
          <input type="file" @change="handleFileChange(index, $event)" />
          </div>
        </td>
        <td>
          <input type="text" v-model="item.title" />
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
    <button @click="submitData">Gửi dữ liệu</button>
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
      });
      this.nextId++; // Tăng biến đếm cho lần thêm phần tử kế tiếp
    },
    // async handleFileChange(index, event) {
    //   const file = event.target.files[0];
    //   const reader = new FileReader();
    //
    //   reader.onload = () => {
    //     const imageData = {
    //       ...this.items[index], // Copy các thuộc tính của item hiện tại
    //       title: this.items[index].title, // Giữ title
    //       image: reader.result, // Cập nhật ảnh mới
    //     };
    //     this.$set(this.items, index, imageData);
    //   };
    //
    //   if (file) {
    //     reader.readAsDataURL(file);
    //   }
    // },

    async handleFileChange(index, event) {
      const file = event.target.files[0];
      if (file) {
        const imageURL = URL.createObjectURL(file); // Tạo URL tạm thời cho ảnh
        const imageData = {
          ...this.items[index],
          title: this.items[index].title,
          image: imageURL, // Gán URL cho thuộc tính image
        };
        this.$set(this.items, index, imageData);
      }
    },
    async submitData() {
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if (item.title && item.image) {
          const formData = new FormData();
          formData.append('name', this.storyTitle);
          formData.append('title', this.storyName);
          formData.append('titleImage', item.title);

          const imageData = this.convertBase64ToBlob(item.image);
          formData.append('image', imageData, "image.jpg");

          try {
            const response = await GetDataService.createStory(formData);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        }
      }
    },
    convertBase64ToBlob(base64Data) {
      const parts = base64Data.split(";base64,");
      const contentType = parts[0].split(":")[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], { type: contentType });
    },
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
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
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
  max-width: 10%;
  max-height: 10%;
}
.image-container {
  position: relative;
  display: inline-block;
}

.image-container .camera-icon {
  position: absolute;
  bottom: 0;
  left: 50%;
  background: transparent;
  cursor: pointer;
  padding: 0px 20px;
  transform: translate(-50%, -50%);
  font-size: 24px;
  background-color: rgba(65, 63, 63, 0.5);
  color: #ffffff;
}
</style>
