<template>
  <div id="app" :class="{ 'text-dark': !nightMode, 'text-light': nightMode }">
    <!-- Các phần tử khác ở đây -->
    <div class="chat-bubble">
      <!-- Thêm biểu tượng tin nhắn ở đây -->
      <i class="fa-regular fa-comment-dots fa-beat"></i>
    </div>
    <div class="call-bubble">
      <!-- Thêm biểu tượng tin nhắn ở đây -->
      <i class="fa-solid fa-phone fa-beat"></i>
    </div>
  </div>
</template>



<script>
export default {
  name: "Chat"
}
</script>

<style scoped>
.chat-bubble {
  font-size: 40px;
  position: fixed !important;
  bottom: 20px !important;
  right: 20px !important;
  color: #3380CB;
  background-color: #ffffff;
  padding: 10px 20px;
  border-radius: 60px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  transition: opacity 0.3s ease;
}

.call-bubble {
  font-size: 40px;
  position: fixed !important;
  bottom: 20px !important;
  right: 120px !important;
  color: #3380CB;
  background-color: #ffffff;
  padding: 10px 20px;
  border-radius: 60px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  transition: opacity 0.3s ease;
}


/* Ẩn bong bóng chat khi không hover hiển thị lại bong bóng chat khi người dùng hover */
.chat-bubble:hover {
  opacity: 0.8;
}
</style>

