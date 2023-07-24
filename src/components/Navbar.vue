<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-dark fixed-top p-st"
      style="background-color: white"
    >
      <div class="container">
        <a
          class="navbar-brand"
          href="/"
          @click.prevent="goToHome"
        >
          <Logo :nightMode="nightMode" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span style="color: white; font-size: 23px;"
            ><i class="fas fa-bars"></i>
            </span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item mx-2">
              <a
                class="nav-link"
                href="/portfolio"
                @click.prevent="goToHome"
                >Trang chủ</a
              >
            </li>
            <li class="nav-item mx-2 ">
              <a
                class="nav-link"
                href="/news"
                @click.prevent="goToNewsPage"
                >Tin tức</a
              >
            </li>
            <li class="nav-item mx-2">
              <a
                class="nav-link"
                href="/contact"
                @click.prevent="$emit('scroll', 'contact')"
                >API</a
              >
            </li>
            <li class="nav-item mx-2">
              <a
                  class="nav-link"
                  href=""
                  @click.prevent="goContact"
              >Liên hệ</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Snackbar
        :showSnackbar="showSnackbar"
        @close="closeSnackbar"
        :snackbarMessage="snackbarMessage"
        :snackbarColor="snackbarColor"
    />
  </div>
</template>

<script>
import Logo from "./helpers/Logo";
import info from "../../info";
import Snackbar from "@/components/helpers/Snackbar.vue";

export default {
  name: "Navbar",
  props: {
    nightMode: {
      type: Boolean,
    },
  },
  data() {
    return {
      navbarConfig: info.config.navbar,
      localNightMode: this.nightMode,
      showDesignModal: false,
      showSnackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
    };
  },
  components: {
    Logo,
    Snackbar,
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    closeSnackbar(val) {
      if (!val) {
        setTimeout(() => {
          this.showSnackbar = val;
        }, 1000);
      }
    },
    goToNewsPage() {
      this.$router.push('/news').catch(() => {});
    },
    goToHome() {
      this.$router.push('/').catch(() => {});
    },
    goContact() {
      this.$router.push('/contact').catch(() => {});
    },
    switchMode() {
      this.localNightMode = !this.localNightMode;
      this.$emit("nightMode", this.localNightMode);
    },
    closeModal() {
      this.showModal = false;
      this.showDesignModal = false;
      document.getElementsByTagName("body")[0].classList.remove("modal-open");
    },
    showDesignModalFn() {
      this.showDesignModal = true;
    },
  },
};
</script>

<style scope>
.nav-link {
  color: #3380CB !important;
  font-weight: 500;
}
.nav-link:hover{
  color: white;
}
button {
  border: none;
  outline: none;
}

button:hover {
  border: none;
  outline: none;
}

nav {
  border-bottom: 1px solid rgba(160, 159, 159, 0.336);
  position: fixed !important;
}

.navbar-blur {
  backdrop-filter: blur(12px);
}
</style>
