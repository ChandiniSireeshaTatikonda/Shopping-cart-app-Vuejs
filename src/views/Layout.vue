<template>
  <div>
    <header-page></header-page>
    <dashboard></dashboard>
  </div>
</template>

<script>
import itemsList from '../../public/data/appItems.json';
import HeaderPage from '@/components/HeaderPage.vue'
import Dashboard from '@/components/Dashboard.vue';

export default {
  name: 'Layout',
  components: {
    HeaderPage,
    Dashboard
  },
  created() {
    const data = JSON.parse(sessionStorage.getItem('itemsList')) ? JSON.parse(sessionStorage.getItem('itemsList')) : [] ;
    if(!data.length) {
      sessionStorage.setItem('itemsList', JSON.stringify(itemsList));
    }
  }
}
</script>
