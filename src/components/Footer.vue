<template>
  <div class="bg-e8237c">
    <div class="container py-3">
      <div class="row pt-1 align-items-center">
        <div
          class="col-xl-6 col-bg-6 col-md-6 col-sm-12 pbelow"
          style="color: white;"
        >
          <span>© 2023 Bản quyền của Cảnh Nguyễn</span>
        </div>

        <div class="col-xl-6 col-bg-6 col-md-6 col-sm-12">
          <div class="text-center">
            <button
                class="btn btn-outline-secondary mx-2 "
                @click="open('linkedin')"
                v-tooltip.bottom="'Facebook'"
            >
              <i class="fa-brands fa-square-facebook"></i>
            </button>
            <button
                class="btn btn-outline-secondary mx-2"
                @click="open('github')"
                v-tooltip.bottom="'Tóp tóp'"
            >
              <i class="fa-brands fa-tiktok"></i>
            </button>
            <button
                class="btn btn-outline-secondary mx-2"
                @click="open('behance')"
                v-tooltip.bottom="'Skype'"
            >
              <i class="fa-brands fa-skype"></i>
            </button>
            <button
                class="btn btn-outline-secondary mx-2"
                @click="open('resume')"
                v-tooltip.bottom="'Telegram'"
            >
              <i class="fa-brands fa-telegram"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import info from "../../info";

export default {
  name: "Footer",
  data() {
    return {
      linkedin: info.links.linkedin,
      github: info.links.github,
      behance: info.links.behance,
      resume: info.links.resume,
    };
  },
  methods: {
    open(link) {
      switch (link) {
        case "linkedin":
          window.open(this.linkedin, "_blank");
          break;
        case "github":
          window.open(this.github, "_blank");
          break;
        case "behance":
          window.open(this.behance, "_blank");
          break;
        case "resume":
          window.open(this.resume, "_blank");
          break;
      }
    },
  },
};
</script>

<style scoped>
span {
  font-weight: 500;
}

.btn {
  border-color: white;
  color: white;
}

.btn:hover {
  background-color: white;
  border-color: white;
  color: gray;
}

.btn:focus {
  background-color: white;
  border-color: white;
  color: gray;
}

.bg-e8237c {
  background-color: #e8237c;
}
@media screen and (max-width: 580px) {
  .pbelow {
    padding-bottom: 20px;
    text-align: center;
  }
}
</style>
