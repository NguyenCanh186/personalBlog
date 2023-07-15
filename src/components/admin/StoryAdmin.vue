<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
      <tr>
        <th>STT</th>
        <th>Ảnh</th>
        <th>Tiêu đề</th>
        <th>Thao tác</th>
      </tr>
      </thead>
      <tbody>
      <!-- Sử dụng v-for để lặp qua danh sách các mục -->
      <tr v-for="(item, index) in items" :key="item.id">
        <td>{{ index + 1 }}</td>
        <td>
          <!-- Hiển thị ảnh -->
          <img :src="getImageUrl(item.storyPictures[0].image)" alt="Ảnh" width="100" height="100" />
        </td>
        <td>{{ item.title }}</td>
        <td>
          <!-- Thêm các nút và thao tác cần thiết -->
          <button @click="editItem(item)">Sửa</button>
          <button @click="deleteItem(item)">Xóa</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {GetDataService} from "@/service/get-data-service";

export default {
  name: "StoryAdmin",
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.getStory()
  },
  methods: {
    getStory() {
      GetDataService.getStory().then((response) => {
        this.items = response.data
        console.log(this.items)
      });
    },
    getImageUrl(imageName) {
      return `http://localhost:8080/image/${imageName}`;
    },
    deleteItem() {
      // Xử lý sự kiện xóa mục
    },
  },
};
</script>

<style scoped>
/* Định dạng các phần tử trong bảng */
.table {
  width: 100%;
}

/* Định dạng hình ảnh trong cột ảnh */
.table img {
  max-width: 100px;
  height: auto;
}
</style>
