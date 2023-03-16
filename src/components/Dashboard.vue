<template>
  <div>
    <div>
      <div class="row appItems-section" v-for="category in appItems" :key="category.id">
      <div class="col-xs-3 col-sm-3 col-md-3 p-0" v-for="menuItem in category.itemsList" :key="menuItem.id"> 
        <div class="card m-3">
          <div class="appItems-img-section">
            <img class="card-img-top" :src="menuItem.itemImg" :alt="menuItem.itemName">
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ menuItem.itemName }}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <button class="btn view-details-btn" @click="getSelectedItem({categoryId: category.id, itemId: menuItem.itemId })">View Details</button>
              <!-- <button class="btn view-details-btn" data-bs-toggle="modal" data-bs-target="#itemDetailsModal">View Details</button> -->
          </div>
        </div>
      </div>
    </div>
    </div>

    <!-- <item-details-modal :selectedItemData = selectedItemData></item-details-modal> -->
  </div>
</template>

<script>
import { eventBus } from '@/main';
// import itemDetailsModal from '../Modals/itemDetailsModal.vue';


export default {
    name: 'Dashboard',
    components: {
        // itemDetailsModal
    },
    data() {
    return{
      appItems: [],
      // selectedItemData: {},
      // categoryIndex: 0
    }
  },
  methods: {
    getSelectedItem(indexObj){
      this.$router.push(`/itemDetailsPage/${indexObj.itemId}-${indexObj.categoryId}`);
    }
  },
  created() {
    this.appItems = JSON.parse(sessionStorage.getItem('itemsList'));
    eventBus.$on('filterCategoriesData', (filteredCategories) => {
      console.log('filteredCategories', filteredCategories);
      this.appItems = [filteredCategories]
    });

  }
}
</script>

<style scoped>
.appItems-section{
  margin: 30px;
}
.card-img-top{
  max-width: 100%;
  min-width: 100%;
  height: 200px;
  object-fit: contain;
}
.appItems-img-section{
  margin: auto;
}
.card{
  border: none;
  background-color: white;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  padding-top: 10px;
}
.card-body{
  padding-top: 60px;
}
.view-details-btn{
  background-color: #4C9E45;
  color: #fff;
}
</style>