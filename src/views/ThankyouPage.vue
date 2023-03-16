<template>
  <div class="thank-you-section">
    <header-page></header-page>
    <h1 class="fw-bold">Thank you for Shopping with us!</h1>
  </div>
</template>

<script>
import HeaderPage from '@/components/HeaderPage.vue';
export default {
    name: 'ThankyouPage',
    components: {
      HeaderPage
    },
    created() {
        sessionStorage.setItem('itemsList', JSON.stringify([]));
    }
}
</script>

<style scoped>
.thank-you-section{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
}
</style>