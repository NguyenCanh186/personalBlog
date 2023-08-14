<template>
  <div>
    <vue-tinymce-editor
      v-model="editorContent"
      :init="tinymceInitConfig"
      id="34534"/>
  </div>
</template>

<script>
import VueTinymceEditor from 'vue-tinymce-editor'

export default {
  components: {
    VueTinymceEditor
  },
  data() {
    return {
      editorContent: '<p>This is the initial content.</p>',
      tinymceInitConfig: {
        // Cấu hình cho TinyMCE
        // Xem thêm tại: https://www.tiny.cloud/docs/configure/
      }
    }
  }
}
</script>

<style>
/* Add your styles here if needed */
</style>
