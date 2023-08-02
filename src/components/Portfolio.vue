<template>
  <div
    class="py-4 p-st"
    style="background-color: white"
  >
    <div class="container">
      <div
        class="text-center"
        data-aos="fade"
        data-aos-once="true"
        data-aos-duration="1000"
      >
        <div class="title1 px-4 pt-3">
            <span :class="{ 'text-light': nightMode }">
                Đăng nhập
              </span>
          <hr
              class="my-1"
          />
        </div>
        <div class="text-center">
          <div
              data-aos="fade-up"
              data-aos-once="true"
              data-aos-duration="1000"
          >
            <img :src="picture" /> <br>
            <input
                type="password"
                name="user_name"
                v-model="password"
                placeholder="Mời nhập mật khẩu"
                class="pinput"
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
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import info from "../../info";
export default {
  name: "Login",
  props: {
    showModal: {
      type: Boolean,
    },
  },
  data() {
    return {
      password: "",
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
  },
  methods: {
    open(url) {
      window.open(url, "_blank");
    },
    close() {
      this.$emit("close");
      this.password = "";
    },
    login() {
      this.$store.dispatch('auth/login', this.password).then(
          () => {
            this.$router.push('/admin/home');
            this.showDesignModal = false;
          },
          error => {
            this.a = (error.response && error.response.data)
            this.showSnackbar = true;
            this.snackbarMessage = "Sai mật khẩu.";
            this.snackbarColor = "#64808E";
          }
      );
    },
  },
};
</script>

<style scoped>


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

.title1 {
  font-size: 24px;
  font-weight: 400;
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
  max-width: 500px;
  max-height: 500px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 50%;
  transform: rotateY(180deg);
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
