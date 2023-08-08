<template>
  <div
      class="py-4 p-st"
      :class="{
      'bg-light': !nightMode,
      'bg-dark2': nightMode,
      'text-light': nightMode,
    }"
  >
    <div class="container">
      <div
          class="text-center"
          data-aos="fade"
          data-aos-once="true"
          data-aos-duration="1000"
      >
        <span
            class="title text-center"
            :class="{ pgray: !nightMode, 'text-light': nightMode }"
        >Blog</span
        >
      </div>
      <hr
          width="50%"
          :class="{ pgray: !nightMode, 'bg-secondary': nightMode }"
      />
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
          <tr>
            <th class="centered">Stt</th>
            <th class="centered">Ảnh</th>
            <th>Tiêu đề</th>
            <th class="centered">Action</th>
          </tr>
          </thead>
          <tbody>
          <!-- Sử dụng v-for để lặp qua danh sách các mục -->
          <tr v-for="(item, index) in items" :key="item.id">
            <td style="width: 4%">{{ index + 1 }}</td>
            <td style="width: 20%">
              <!-- Hiển thị ảnh -->
              <img :src="getImageUrl(item.image)" alt="Ảnh" width="100" height="100" />
            </td>
            <td style="width: 50%;" class="left-aligned">{{ item.title }}</td>
            <td style="width: 25%; text-align: center !important;">
              <div class="button-container">
                <!-- Button with edit icon -->
                <button class="action-button edit" @click="showEditModalModalFn(item)">
                  <i class="fa fa-pencil"></i>
                </button>
                <!-- Button with delete icon -->
                <button class="action-button delete" @click="deleteItem(item)">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="d-flex flex-column align-items-center">
          <button class="btn mt-2 rounded-circle" @click.prevent="showDesignModalFn()">
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
    <AddBlog
        :showModal="showDesignModal"
        @close="closeModal"
        v-if="showDesignModal"
    />
    <EditBlog
        :showModal="showEditModal"
        @close="closeModalEdit"
        :data="blog"
        v-if="showEditModal"
    />
    <Loading :loading="loading" />
  </div>
</template>

<script>
import {GetDataService} from "@/service/get-data-service";

import Swal from "sweetalert2";
import AddBlog from "@/components/helpers/admin-helpers/AddBlog.vue";
import EditBlog from "@/components/helpers/admin-helpers/EditBlog.vue";
import Loading from "@/components/helpers/Loading.vue";

export default {
  name: "BlogAdmin",
  components: {Loading, AddBlog, EditBlog},
  data() {
    return {
      loading: false,
      blog: {},
      showEditModal: false,
      showDesignModal: false,
      showSnackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
      items: [],
    };
  },
  created() {
    this.getBlog()
  },
  methods: {
    showDesignModalFn() {
      this.showDesignModal = true;
    },
    async showEditModalModalFn(item) {
      await this.findByIdBlog(item.id)
      this.showEditModal = true;
    },
    closeModal(check) {
      if (check === true) {
        this.getBlog()
      }
      this.showModal = false;
      this.showDesignModal = false;
      document.getElementsByTagName("body")[0].classList.remove("modal-open");
    },
    closeModalEdit(check) {
      if (check === true) {
        this.getBlog()
      }
      this.showModal = false;
      this.showEditModal = false;
      document.getElementsByTagName("body")[0].classList.remove("modal-open");
    },
    getBlog() {
      GetDataService.getBlog().then((response) => {
        this.items = response.data
      });
    },
    async findByIdBlog(id) {
      await GetDataService.getBlogById(id).then((response) => {
        this.blog = response.data
        console.log(this.blog)
      });
    },
    getImageUrl(imageName) {
      return `https://anhcuatoi.s3.ap-southeast-1.amazonaws.com/${imageName}`;
    },
    async deleteItem(item) {
      const swalResult = await Swal.fire({
        title: 'Xóa thật hả',
        html: '<div class="custom-circle"><i class="fas fa-exclamation-circle" style="color: #bb4949; font-size: 60px;"></i></div>',
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
        this.loading = true;
        // Nút Xóa được nhấn
        await GetDataService.deleteBlogById(item.id).then((response) => {
          this.loading = false;
          Swal.fire({
            title: 'Đã xóa',
            html: '<div class="custom-circle"><i class="fas fa-check-circle" style="color: #00CCCC; font-size: 60px;"></i></div>',
            showConfirmButton: false,
            timer: 2000,
          });
          this.getBlog();
          console.log(response);
        });
      }
    },
  },
};
</script>

<style scoped>
/* New styles for custom table and centering */
.custom-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #d3d0d0; /* Add a border to the table */
}
.swal-button--confirm {
  background-color: #00CCCC !important;
  color: white !important;
}
.custom-table th {
  background-color: #17a2b8;
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

.centered {
  text-align: center;
}


.custom-circle {
  display: inline-block;
  width: 100px; /* Điều chỉnh kích thước vòng tròn tại đây */
  height: 100px; /* Điều chỉnh kích thước vòng tròn tại đây */
  border-radius: 50%; /* Tạo vòng tròn */
  border: 3px solid #00CCCC; /* Màu viền vòng tròn */
  text-align: center;
}

.btn {
  border-color: #17a2b8;
  color: #17a2b8;
}
.btn:hover {
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: white;
}

.btn:focus {
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: white;
}
/* Định dạng hình ảnh trong cột ảnh */
.table img {
  max-width: 100px;
  height: auto;
}
.title {
  font-size: 30px;
  font-weight: 500;
}
.table td:nth-child(3) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px; /* Điều chỉnh giá trị này nếu cần để kiểm soát chiều rộng của tiêu đề đã cắt */
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 7px; /* 7px spacing between buttons */
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

/* Responsive layout for the buttons */
@media (max-width: 576px) {
  .button-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .action-button {
    margin-right: 0; /* Remove the horizontal spacing between buttons */
    margin-bottom: 3px; /* 3px spacing between buttons when stacked vertically */
    width: 30px;
    height: 30px;
    font-size: 13px;
  }
}
.left-aligned {
  text-align: left;
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
</style>

