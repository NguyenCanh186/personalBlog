<template>
  <div class="container">
      <div class="col-12">
        <PromotionsNews />
        <CustomerNews />
      </div>
  </div>
</template>

<script>
import CustomerNews from "@/components/brand/news/CustomerNews.vue";
import PromotionsNews from "@/components/brand/news/PromotionsNews.vue";

export default {
  name: "News",
  components: {CustomerNews, PromotionsNews}
}
</script>

<style scoped>

</style>
