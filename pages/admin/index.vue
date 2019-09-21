<template>
  <div>
    Основные настройки
  </div>
</template>
<script>
  export default {
    async fetch({ store }) {
      store.commit('breadcrumb/clear')
    }
  }
</script>
