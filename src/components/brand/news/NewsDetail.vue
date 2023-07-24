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
        >
          {{ detail.name }}
        </span>
        <br>
        <span style="font-style: italic;">{{ detail.category }} | {{detail.date}}</span>
      </div>
      <hr
          width="50%"
          :class="{ pgray: !nightMode, 'bg-secondary': nightMode }"
      />
      <div style="text-align: center;">
        <img style="width: 90%; margin-left: auto" :src="detail.pictures[0].img">
      </div>
      <br />
      <p>{{ detail.description}}</p>
    </div>
  </div>
</template>

<script>

import info from "../../../../info";
export default {
  name: "CustomerNews",
  components: {
  },
  props: {
    nightMode: {
      type: Boolean,
    },
  },
  data() {
    return {
      all_info: info.portfolio,
      detail: {},
      id: ''
    };
  },
  created() {
    this.convertData();
  },
  methods: {
    convertData() {
      const fullPath = this.$route.fullPath;
      this.id = fullPath.split("/")[2];
      for (let i = 0; i < this.all_info.length; i++) {
        const idFromInfo = parseInt(this.id); // Chuyển đổi sang số
        if (idFromInfo === this.all_info[i].id) {
          this.detail = this.all_info[i];
          break;
        }
      }
    }
  },
};
</script>

<style scoped>
.title {
  font-size: 30px;
  font-weight: 500;
}

</style>
