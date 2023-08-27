<template>
  <div>
    <el-button type="danger" class="btn logout-btn" @click="logOut">Đăng xuất</el-button>
    <div
        class="p-st"
        style="margin-top: -30px"
    >
      <div
          class="container"
          data-aos="fade"
          data-aos-once="true"
          data-aos-duration="1000"
      >
        <div class="text-center">
          <h3 class="brand-title">Quản lý trang tin tức Brandname</h3>
        </div>
        <br><br>
        <div class="row">
          <div class="col-6">
            <el-input placeholder="Nhập tên bài viết" v-model="request.title" style="margin-left: -15px"></el-input>
          </div>
          <div class="col-6 text-right">
            <el-button type="primary" @click="getNews" icon="el-icon-search">Tìm kiếm</el-button>
            <el-button icon="el-icon-plus" style="margin-right: -15px" type="success" @click.prevent="showDesignModalFn()">Thêm mới</el-button>
          </div>
        </div>
        <br>
        <div class="row align-items-center">
          <div class="table-responsive">
            <table class="custom-table">
              <thead>
              <tr>
                <th class="centered">Stt</th>
                <th class="centered">Ảnh bìa</th>
                <th>Tên bài viết</th>
                <th class="centered">Action</th>
              </tr>
              </thead>
              <tbody>
              <!-- Sử dụng v-for để lặp qua danh sách các mục -->
              <tr v-for="(item, index) in items" :key="item.id">
                <td style="width: 4%">{{ index + 1 }}</td>
                <td style="width: 15%">
                  <!-- Hiển thị ảnh -->
                  <img :src="getImageUrl(item.cover)" alt="Ảnh" style="width: 100px; max-height: 60px" />
                </td>
                <td style="width: 50%;" class="left-aligned">{{ item.title }}</td>
                <td style="width: 15%; text-align: center !important;">
                  <div>
                    <!-- Button with edit icon -->
                    <el-button style="background-color: #eecc0b; color: white" icon="el-icon-edit" circle @click="showEditModalModalFn(item)"></el-button>
                    <!-- Button with delete icon -->
                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteItem(item)"></el-button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
            <div>
              <Pagination
                  class="align-items-end pagination"
                  v-show="total>0"
                  style="margin-right: 0"
                  :total="total"
                  :page.sync="request.page"
                  :limit.sync="request.size"
                  @pagination="getNews"
              />
<!--              <button class="btn mt-2 rounded-circle" @click.prevent="showDesignModalFn()">-->
<!--                <i class="fa fa-plus"></i>-->
<!--              </button>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import {GetDataService} from "@/service/get-data-service";
import Swal from "sweetalert2";
import EditStory from "@/components/helpers/admin-helpers/Edit.vue";
import Pagination from "@/components/tinymce/tinymce/components/Pagination/index.vue";

export default {
  name: "HomeAdmin",
  components: {
    EditStory, Pagination
  },
  props: {
    nightMode: {
      type: Boolean,
    },
  },
  data() {
    return {
      request: {
        page: 1,
        size: 5,
        title: '',
      },
      total: 0,
      news: {},
      showEditModal: false,
      showDesignModal: false,
      showSnackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
      items: [],
    };
  },
  created() {
    this.getNews()
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
    showDesignModalFn() {
      this.$router.push('/admin/create');
    },
    showEditModalModalFn(item) {
      this.$router.push('/admin/edit/' + item.id);
    },
    closeModalEdit(check) {
      if (check === true) {
        this.getNews()
      }
      this.showModal = false;
      this.showEditModal = false;
      document.getElementsByTagName("body")[0].classList.remove("modal-open");
    },
    getNews() {
      GetDataService.getNews(this.request).then((response) => {
        this.items = response.data.content
        this.total = response.data.totalElements
      });
    },
    async findByIdBlog(id) {
      await GetDataService.getNewsById(id).then((response) => {
        this.news = response.data
      });
    },
    getImageUrl(imageName) {
      return `http://localhost:8080/image/${imageName}`;
    },
    async deleteItem(item) {
      const swalResult = await Swal.fire({
        title: 'Xóa thật hả',
        html: '<div class="custom-circle"><i class="fas fa-exclamation-circle" style="color: #FF0000; font-size: 60px;"></i></div>',
        showCancelButton: true,
        confirmButtonText: 'Ừ',
        cancelButtonText: 'Thôi :(',
        reverseButtons: true,
        customClass: {
          cancelButton: 'swal-button',
          confirmButton: 'swal-button swal-button--confirm',
        },
      });

      if (swalResult.isConfirmed) {
        // Nút Xóa được nhấn
        await GetDataService.deleteByNewsById(item.id).then((response) => {
          Swal.fire({
            title: 'Đã xóa',
            html: '<div class="custom-circle"><i class="fas fa-check-circle" style="color: #00CCCC; font-size: 60px;"></i></div>',
            showConfirmButton: false,
            timer: 2000,
          });
          this.getNews();
          console.log(response);
        });
      }
    },
  },
};
</script>

<style scoped>
.brand-title {
  color: #605f5f; /* Màu chữ */
  font-size: 50px; /* Kích thước chữ */
  /* Thêm các thuộc tính CSS khác nếu cần */
}
.custom-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #d3d0d0; /* Add a border to the table */
}
.custom-table th {
  background-color: #409EFF;
  color: white;
  text-align: center;
  padding: 8px; /* Add padding to the table headers */
  border: 1px solid #d3d0d0; /* Add a border to the table headers */
}

.custom-table td {
  padding: 8px; /* Add padding to the table cells */
  border: 1px solid #d3d0d0; /* Add a border to the table headers */
  text-align: center;
}
.logout-btn {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 9999;
  color: #fff;
}
.action-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 7px; /* 7px spacing between buttons */
  background-color: #e9ecef;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.edit {
  border-color: #ffc800;
  border: 2px solid #ffc107;
  color: #ffc800;
  background-color: white;
}

.delete {
  border-color: #d54444;
  border: 2px solid #d54444;
  color: #d54444;
  background-color: white;
}

.image-container input[type="file"] {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.image-container .camera-icon {
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-top: 50%;
  background: transparent;
  cursor: pointer;
  padding: 0px 20px;
  transform: translate(-50%, -50%);
  font-size: 24px;
  background-color: rgba(65, 63, 63, 0.5);
  color: #ffffff;
}


img {
  max-width: 800px;
  max-height: 500px;
}

@media only screen and (max-width: 580px) {
  img {
    object-fit: cover;
    height: 200px;
    width: 200px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 2px solid rgb(205, 205, 205);
  }
}


.btn:focus {
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: white;
}

.btn:focus {
  outline: none !important;
}

p {
  text-align: justify;
  font-weight: 400;
}
.pagination {
  background-color: transparent; /* Xóa bỏ nền */
  /* Thêm các thuộc tính CSS khác nếu cần */
}
/* LEAVES */
</style>

