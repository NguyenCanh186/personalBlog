<template>
  <div class="row">
    <div class="col-8">
      <PromotionsNews />
      <CustomerNews />
    </div>
    <div class="col-4">
      <p style="font-size: 20px;font-style: normal;font-weight: 700;line-height: 28px;">Tin nổi bật</p>
      <div class="row">
        <div class="col-11 card  mt-1" v-for="item in desgin_info" :key="item.id" @click="showModalDetail(item.id)">
          <div>
            <div class="card-body">
              <div class="row justify-content-center">
                <div class="col-4 image-container">
                  <img :src="item.pictures[0].img" alt="Image" class="img-fluid" />
                </div>
                <div class="col-8">
                  <h5 class="card-title">{{ item.name }}</h5>
                    <p>Ngày đăng: {{item.date}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import CustomerNews from "@/components/brand/news/CustomerNews.vue";
import PromotionsNews from "@/components/brand/news/PromotionsNews.vue";
import info from "../../../../info";

export default {
  name: "News",
  components: {CustomerNews, PromotionsNews},
  data() {
    return {
      desgin_info: info.portfolio,
    };
  },
  methods: {
    showModalDetail(portfolioId) {
      this.$router.push('/newsDetail/' + portfolioId);
    },
  }
}
</script>

<style scoped>
.card:hover {
  opacity: 0.7; /* You can adjust the opacity as per your preference */
  cursor: pointer;
}
.image-container {
  overflow: hidden; /* Hide any overflow from the image */
}

.image-container img {
  height: 100%; /* Set the height of the image to 100% to fill the container */
  object-fit: cover; /* Maintain the aspect ratio and cover the container */
}
</style>

