<template>
  <div id="app" :class="{ 'text-dark': !nightMode, 'text-light': nightMode }">
    <div class="parent">
      <div v-if="currentUser === null">
        <Portfolio :nightMode="nightMode" id="portfolio" />
      </div>
    </div>
    <div v-if="currentUser !== null">
      <HomeAdmin v-if="isHomeRoute" :nightMode="nightMode" />
      <Create v-if="isCreate" :nightMode="nightMode" />
      <Edit v-if="isEdit" :nightMode="nightMode" />
    </div>
  </div>
</template>

<script>
import Portfolio from "./components/Portfolio";

import info from "../info";
import HomeAdmin from "@/components/HomeAdmin.vue";
import Create from "@/components/helpers/admin-helpers/Create.vue";
import Edit from "@/components/helpers/admin-helpers/Edit.vue";

export default {
  name: "App",
  components: {
    HomeAdmin,
    Portfolio,
    Create,
    Edit
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isHomeRoute() {
      return this.$route.path === "/admin/home";
    },
    isCreate() {
      return this.$route.path === "/admin/create";
    },
    isEdit() {
      return this.$route.path.startsWith("/admin/edit/");
    },
  },
  data() {
    return {
      nightMode: false,
      config: info.config,
    };
  },
  created() {
    console.log(this.$store.state.auth.user)
  },
  mounted() {
    ["about", "contact", "skills", "portfolio"].forEach((l) => {
      if (window.location.href.includes(l)) {
        var elementPosition = document.getElementById(l).offsetTop;
        window.scrollTo({ top: elementPosition - 35, behavior: "smooth" });
      }
    });
  },
  methods: {
    switchMode(mode) {
      if (this.config.use_cookies) {
        this.$cookie.set("nightMode", mode);
      }
      this.nightMode = mode;
    },
    scrollTo(ele) {
      if (ele == "home") {
        this.$router.push(`/`).catch(()=>{});
        window.scrollTo({ top: -80, behavior: "smooth" });
      } else {
        var elementPosition = document.getElementById(ele).offsetTop;
        window.scrollTo({ top: elementPosition - 35, behavior: "smooth" });
        if (this.$router.history.current.path !== `/${ele}`)
          this.$router.push(`/${ele}`);
      }
    },
  },
};
</script>

<style>
/*@import url('https://fonts.googleapis.com/css?family=Lobster');*/
#app {
  font-family: "Lobster", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
}

@media screen and (max-width: 580px) {
  #app {
    width: fit-content;
  }
}

.parent {
  margin-top: 38px;
  padding-top: 40px;
  position: relative;
}

/* To set scrollbar width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 9px;
  border: 2px solid white; /* Use your background color instead of White */
  background-clip: content-box;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #AEAEAE;
  border-radius: 9px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #949494;
}





</style>
