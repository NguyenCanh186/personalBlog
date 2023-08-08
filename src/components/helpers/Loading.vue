<template>
  <div v-if="loading" class="loading-overlay">
    <i class="fas fa-spinner fa-spin"></i> Đang xử lý...
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    loading: {
      type: Boolean,
    },
  },
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 24px;
  z-index: 9999;
}
</style>
