<template>
  <div class="components-container">
    <div>
      <tinymce v-model="content" :height="300" />
    </div>
  </div>
</template>

<script>
import Tinymce from './tinymce/index.vue'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content:
        ``
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>
