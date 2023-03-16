<template>
  <div>
    <nav class="navbar fixed-top header">
        <div class="col-xs-6 col-sm-6 d-flex align-items-center">
          <a class="navbar-brand text-white" href="#" @click="navigateToDashboard()">Shopping Cart</a>
        </div>
        
        <div class="col-xs-6 col-sm-6 d-flex align-items-center justify-content-end">
          <button class="btn cart-btn" @click="navigateToDashboard()">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16"
            style="color: #fff;">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
            </svg>
          </button>
        
          <button class="btn cart-btn" @click="navigateToCartPage()">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16"
              style="color: #fff;">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
          </button>
      </div>
    </nav>

    <div v-if="$route.name == 'Layout'" class="row category-section">
      <div class="col-xs-2 col-sm-2 col-md-2 p-0" v-for="(category, index) in appItems" :key="category.id"> 
        <img :src="category.categoryImg" :alt="category.categoryName" height="70px" width="70px" style="cursor: pointer;"
        @click="filterCategory(index)"/>
        <p>{{ category.categoryName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/main';

export default {
  name: 'HeaderPage',
  data() {
    return{
      appItems: [],
      filterCategories: [],
    }
  },
  methods: {
    filterCategory(categoryId) {
      this.filterCategories = this.appItems[categoryId]; 
      // // sessionStorage.setItem('filterCategories', JSON.stringify(this.filterCategories));
      // console.log(this.appItems); 
      console.log(this.filterCategories);
      eventBus.$emit('filterCategoriesData', this.filterCategories);
    },
    navigateToCartPage() {
      this.$router.push({name: 'CartItems'})
    },
    navigateToDashboard() {
      this.$router.push({name: 'Layout'})
    }
  },
  created() {
    this.appItems = JSON.parse(sessionStorage.getItem('itemsList'));
  },

}
</script>

<style scoped>
.header{
  background-color: #4C9E45;
  padding: 20px;
}
.category-section{
  margin: 80px 0px 0px 0px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
}
.cart-btn{
  border: none;
  background-color: #4C9E45;
}
</style>
