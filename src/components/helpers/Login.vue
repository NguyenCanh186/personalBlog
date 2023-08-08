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
                Đăng nhập
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
          <div class="text-center">
            <div
                data-aos="fade-up"
                data-aos-once="true"
                data-aos-duration="1000"
            >
              <img :src="getImageUrl(picture)" /> <br>
              <input
                  type="password"
                  name="user_name"
                  v-model="password"
                  placeholder="Mời bố Cảnh nhập mật khẩu"
                  class="pinput"
                  :class="{
                  pgray: !nightMode,
                  'pgray-dark': nightMode,
                  'text-light': nightMode,
                  }"
                  style="transition-delay: 0.2s;
         text-align: center;
         line-height: 1.5;"
              />
            </div>

            <button
                @click="login()"
                class="mt-2 btn"
                data-aos="fade"
                data-aos-once="true"
                data-aos-duration="1000"
                data-aos-offset="50"
            >
              Đăng nhập
            </button>
            <p class="mt-5">Không phải Cảnh, vui lòng đóng popup</p>
          </div>
        </div>
      </div>
    </div>
    <Loading
        :loading="loading"
    />
  </div>
</template>

<script>
import info from "../../../info";
import {GetDataService as getDataService} from "@/service/get-data-service";
import Loading from "@/components/helpers/Loading.vue";
export default {
  name: "Login",
  components: {Loading},
  props: {
    showModal: {
      type: Boolean,
    },
  },
  data() {
    return {
      password: "",
      loading: false,
      picture: info.flat_picture,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/admin/home');
    }
    this.getProfile()
  },
  methods: {
    getImageUrl(imageName) {
      return `https://anhcuatoi.s3.ap-southeast-1.amazonaws.com/${imageName}`;
    },
    getProfile() {
      getDataService.getProfile().then((response) => {
        this.picture = response.data.image;
      });
    },
    open(url) {
      window.open(url, "_blank");
    },
    close() {
      this.$emit("close");
      this.password = "";
    },
    login() {
      this.$emit("login", this.password);
      console.log(this.password)
    },
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
    height: 90%;
  }
}

@media screen and (max-width: 1200px) {
  .modal-container {
    width: 80%;
    height: 90%;
  }
}

@media screen and (max-width: 580px) {
  .modal-container {
    width: 90%;
    height: 100%;
  }
}

.modal-body {
  margin: 20px 0;
  overflow-y: scroll;
  max-height: inherit;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.title {
  font-size: 30px;
  font-weight: 500;
}
.title1 {
  font-size: 24px;
  font-weight: 400;
}

.title2 {
  font-size: 20px;
  font-weight: 400;
}

.title3 {
  font-size: 16px;
  font-weight: 500;
}

.badge {
  background-color: #bbd4dd;
  transition: all 0.5s;
  font-weight: 500;
}

.badge:hover {
  transition: all 0.5s;
  box-shadow: 2px 2px 5px rgb(179, 179, 179);
}

.btn {
  border-color: #759CC9;
  color: #759CC9;
}

.btn:hover {
  background-color: #759CC9;
  border-color: #759CC9;
  color: white;
}

.btn:focus {
  background-color: #759CC9;
  border-color: #759CC9;
  color: white;
}

.bg-dark4 {
  background-color: #494e55 !important;
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
  border-color: #00CCCC;
  color: #00CCCC;
  width: 50%;
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

.pgray-dark {
  background-color: #3c4148 !important;
}
img {
  object-fit: cover;
  max-width: 250px;
  max-height: 250px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 50%;
}

@media only screen and (max-width: 580px) {
  img {
    object-fit: cover;
    border-radius: 50%;
    height: 200px;
    width: 200px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 2px solid rgb(205, 205, 205);
  }
}
@media screen and (max-width: 1000px) {
  .pinput {
    width: 90%;
  }
  .pinput {
    width: 90%;
  }

  .btn {
    width: 90%;
  }
}
</style>
