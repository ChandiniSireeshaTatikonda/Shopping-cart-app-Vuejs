<template>
    <div >
      <header-page></header-page>
        <div class="card item-details-section">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src= appItems[selectedCategoryId].itemsList[selectedItemIndex].itemImg class="img-fluid rounded-start" 
                :alt=appItems[selectedCategoryId].itemsList[selectedItemIndex].itemName height="400px" width="400px">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h3 class="card-title">{{ appItems[selectedCategoryId].itemsList[selectedItemIndex].itemName }}</h3>
                <h5 class="card-text">Price</h5>
                <h5 class="card-text fw-bold">₹{{ appItems[selectedCategoryId].itemsList[selectedItemIndex].price }}</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                <button type="button" class="btn add-to-cart-btn d-flex justify-content-evenly" 
                  v-if="appItems[selectedCategoryId].itemsList[selectedItemIndex].quantity === 0" @click="addToCart()">
                  <span>Add To Cart</span>
                </button>
                <button type="button" class="btn add-to-cart-btn add-remove-items-btn d-flex justify-content-evenly" v-else>
                  <span class="cursor" @click="removeFromCart()">-</span>{{ appItems[selectedCategoryId].itemsList[selectedItemIndex].quantity }}<span class="cursor" @click="addToCart()">+</span>
                </button>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>
<script>
import HeaderPage from '@/components/HeaderPage.vue';

export default {
    name: 'ItemDetailsPage',
    components: {
        HeaderPage 
    },
    data() {
        return {
            appItems: [],
            selectedCategoryId: '',
            selectedItemIndex: '',
        }
    },
    methods: {
      addToCart() {
        this.appItems[this.selectedCategoryId].itemsList[this.selectedItemIndex].quantity += 1;
        sessionStorage.setItem('itemsList', JSON.stringify(this.appItems));
        console.log('appItems',this.appItems);
    },
      removeFromCart() {
        this.appItems[this.selectedCategoryId].itemsList[this.selectedItemIndex].quantity -= 1;
        sessionStorage.setItem('itemsList', JSON.stringify(this.appItems));
        console.log('appItems',this.appItems);
      }
    },
    created() {
      this.appItems = JSON.parse(sessionStorage.getItem('itemsList'));
      const paramsId = this.$route.params.id.split('-');
      this.selectedCategoryId = paramsId[1];
      this.selectedItemIndex = this.appItems[this.selectedCategoryId].itemsList.findIndex(list => list.itemId === paramsId[0])
    },
}
</script>

<style scoped>
.item-details-section{
  margin: 130px auto auto auto;
  padding: 30px;
  border: none;
  background-color: white;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
}
.card-body{
  text-align: left;
}
</style> 