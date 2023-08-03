<template>
  <div>
    <button class="btn logout-btn" @click="logOut">Đăng xuất</button>
    <div
        class="pt-5 p-st"
    >
      <div
          class="container"
          data-aos="fade"
          data-aos-once="true"
          data-aos-duration="1000"
      >
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
                <td style="width: 20%">
                  <!-- Hiển thị ảnh -->
                  <img :src="getImageUrl(item.cover)" alt="Ảnh" width="100" height="100" />
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
      </div>
    </div>
    <AddStory
        :showModal="showDesignModal"
        @close="closeModal"
        v-if="showDesignModal"
    />
    <EditStory
        :showModal="showEditModal"
        @close="closeModalEdit"
        :data="story"
        v-if="showEditModal"
    />
  </div>
</template>

<script>


import {GetDataService} from "@/service/get-data-service";
import Swal from "sweetalert2";
import EditStory from "@/components/helpers/admin-helpers/EditStory.vue";
import AddStory from "@/components/helpers/admin-helpers/AddStory.vue";

export default {
  name: "HomeAdmin",
  components: {
    AddStory,
    EditStory
  },
  props: {
    nightMode: {
      type: Boolean,
    },
  },
  data() {
    return {
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
    this.getNews()
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
    showDesignModalFn() {
      this.showDesignModal = true;
    },
    async showEditModalModalFn(item) {
      await this.findByIdBlog(item.id)
      this.showEditModal = true;
    },
    closeModal(check) {
      if (check === true) {
        this.getNews()
      }
      this.showModal = false;
      this.showDesignModal = false;
      document.getElementsByTagName("body")[0].classList.remove("modal-open");
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
      GetDataService.getNews().then((response) => {
        this.items = response.data
      });
    },
    async findByIdBlog(id) {
      await GetDataService.getNewsById(id).then((response) => {
        this.blog = response.data
        console.log(this.blog)
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
        await GetDataService.deleteBlogById(item.id).then((response) => {
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
.custom-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #d3d0d0; /* Add a border to the table */
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

.btn:focus {
  outline: none !important;
}

p {
  text-align: justify;
  font-weight: 400;
}

/* LEAVES */
</style>

