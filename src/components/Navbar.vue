<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-info fixed-top p-st"
    >
      <div class="container">
        <a
          class="navbar-brand"
          href="/"
          @click.prevent="$emit('scroll', 'home')"
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
          <span style="color: gray; font-size: 23px;"
            ><i class="fas fa-bars"></i>
            </span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item mx-2">
              <a
                class="nav-link"
                href="/portfolio"
                @click.prevent="$emit('scroll', 'portfolio')"
                :class="{ 'text-light': nightMode }"
                >Story</a
              >
            </li>
<!--            <li class="nav-item mx-2">-->
<!--              <a-->
<!--                class="nav-link"-->
<!--                href="/skills"-->
<!--                @click.prevent="$emit('scroll', 'skills')"-->
<!--                :class="{ 'text-light': nightMode }"-->
<!--                >Skills</a-->
<!--              >-->
<!--            </li>-->
            <li class="nav-item mx-2 ">
              <a
                class="nav-link"
                href="/about"
                @click.prevent="$emit('scroll', 'about')"
                :class="{ 'text-light': nightMode }"
                >Blog</a
              >
            </li>
            <li class="nav-item mx-2">
              <a
                class="nav-link"
                href="/contact"
                @click.prevent="$emit('scroll', 'contact')"
                :class="{ 'text-light': nightMode }"
                >Contact</a
              >
            </li>
            <li class="nav-item mx-2">
              <a
                  class="nav-link"
                  @click.prevent="showDesignModalFn()"
                  :class="{ 'text-light': nightMode }"
              >Login</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Login
        :showModal="showDesignModal"
        @close="closeModal"
        v-if="showDesignModal"
        :nightMode="nightMode"
    />
  </div>
</template>

<script>
import Logo from "./helpers/Logo";
import info from "../../info";
import Login from "@/components/helpers/Login.vue";

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
    };
  },
  components: {
    Logo,
    Login,
  },
  methods: {
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

<style scoped>
.nav-link {
  color: white;
  font-weight: 500;
}
.nav-link:hover{
  background-color: rgba(160, 159, 159, 0.336);
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
