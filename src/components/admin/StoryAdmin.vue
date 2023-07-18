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
        >Story</span
        >
      </div>
      <hr
          width="50%"
          :class="{ pgray: !nightMode, 'bg-secondary': nightMode }"
      />
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Stt</th>
            <th>Ảnh</th>
            <th>Tiêu đề</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <!-- Sử dụng v-for để lặp qua danh sách các mục -->
          <tr v-for="(item, index) in items" :key="item.id">
            <td style="width: 4%">{{ index + 1 }}</td>
            <td style="width: 20%">
              <!-- Hiển thị ảnh -->
              <img :src="getImageUrl(item.storyPictures[0].image)" alt="Ảnh" width="100" height="100" />
            </td>
            <td style="width: 50%">{{ item.title }}</td>
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
import AddStory from "@/components/helpers/admin-helpers/AddStory.vue";
import EditStory from "@/components/helpers/admin-helpers/EditStory.vue";

export default {
  name: "StoryAdmin",
  components: {EditStory, AddStory},
  data() {
    return {
      story: {},
      showEditModal: false,
      showDesignModal: false,
      showSnackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
      items: [],
    };
  },
  created() {
    this.getStory()
  },
  methods: {
    showDesignModalFn() {
      this.showDesignModal = true;
    },
    async showEditModalModalFn(item) {
      this.findByIdStory(item.id)
      this.showEditModal = true;
    },
    closeModal(check) {
      if (check === true) {
        this.getStory()
      }
      this.showModal = false;
      this.showDesignModal = false;
      document.getElementsByTagName("body")[0].classList.remove("modal-open");
    },
    closeModalEdit(check) {
      if (check === true) {
        this.getStory()
      }
      this.showModal = false;
      this.showEditModal = false;
      document.getElementsByTagName("body")[0].classList.remove("modal-open");
    },
    getStory() {
      GetDataService.getStory().then((response) => {
        this.items = response.data
        console.log(this.items)
      });
    },
    async findByIdStory(id) {
      await GetDataService.getStoryById(id).then((response) => {
        this.story = response.data
        console.log(this.story)
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

.table th {
  background-color: #17a2b8;
  color: white;
  text-align: center;
}
.table td {
  justify-items: center;
  justify-content: center;
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
  /*.table {*/
  /*  width: 95%;*/
  /*}*/
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
