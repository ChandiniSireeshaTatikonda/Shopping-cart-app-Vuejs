<template>
  <div>
    <header-page></header-page>
    <div class="cartItemsSection">
        <div v-if="filterCartItems.length">
            <div class="filtered-category" v-for="filteredCategory in filterCartItems" :key="filteredCategory.id"> 
                <div class="col-xs-12 col-sm-12 col-md-12"><h3 class="fw-bold">{{ filteredCategory.category }}</h3></div>
                <div class="row align-items-center m-0 p-3 filtered-item" v-for="filteredItem in filteredCategory.cartItemsList" :key="filteredItem.id">
                    <div class="col-xs-4 col-sm-4 col-md-4">
                        <div class="fw-bold p-1">{{ filteredItem.itemName }}</div>
                        <img :src=filteredItem.itemImg :alt=filteredItem.itemName height="150px" width="150px"/>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 d-flex justify-content-center">
                        <button type="button" class="btn add-to-cart-btn d-flex justify-content-evenly" 
                        v-if="filteredItem.quantity === 0">
                        <span>Add To Cart</span>
                        </button>
                        <button v-else type="button" class="btn add-to-cart-btn add-remove-items-btn d-flex justify-content-evenly">
                            <span class="cursor" @click="removeFromCart({filteredCategoryIndex: filteredCategory.categoryId, filteredItemIndex: filteredItem.itemId })">-</span>
                            {{ filteredItem.quantity }}
                            <span class="cursor" @click="addToCart({filteredCategoryIndex: filteredCategory.categoryId, filteredItemIndex: filteredItem.itemId })">+</span>
                        </button>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4">
                        <p class="fw-bold">₹ {{ filteredItem.price }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="empty-cart"><h1 class="no-items">
            <h1 class="fw-bold">Cart is Empty!!</h1></h1>
        </div>
        <div class="total-price" v-if="filterCartItems.length">
            <h3 class="fw-bold">Total Price - {{ totalPrice }}</h3>
        </div>
        <div class="pay-amount-btn p-5" v-if="filterCartItems.length">
            <button class="btn add-to-cart-btn" @click="navigateToThankyouPage()">Pay Amount</button>
        </div>
    </div>
  </div>
</template>

<script>
import HeaderPage from '@/components/HeaderPage.vue';

export default {
    name: 'CartItems',
    components: {
        HeaderPage
    },
    data() {
        return {
            appItems: [],
        }
    },
    computed: {
        filterCartItems() {
            const filteredCategories = this.appItems.filter(category => category.itemsList.some(item => item.quantity > 0));
            console.log(filteredCategories);
            return filteredCategories.map(filteredCategory => 
            ({
                categoryId: filteredCategory.id,
                category: filteredCategory.categoryName,
                categoryImg: filteredCategory.categoryImg,
                cartItemsList: filteredCategory.itemsList.filter(item => item.quantity > 0)
            })
            );
        },
        totalPrice(){
            console.log(this.filterCartItems);
            const price = this.filterCartItems.reduce((currentValue, next) => {
                console.log('current', currentValue, 'next',next.cartItemsList);
                return currentValue + next.cartItemsList.reduce((totalPrice, item) => {
                    console.log('totalPrice', totalPrice, 'item', item);
                    return totalPrice + (item.price * item.quantity)}, 0);
            },0)
            console.log('price', price);
            return price;
        }
    },
    methods: {
        addToCart(indexObj) {
            console.log('indexObj', indexObj);
            const index = this.appItems[indexObj.filteredCategoryIndex].itemsList.findIndex(item => item.itemId === indexObj.filteredItemIndex );
            if(index > -1){
                this.appItems[indexObj.filteredCategoryIndex].itemsList[index].quantity += 1;
                sessionStorage.setItem('itemsList', JSON.stringify(this.appItems));
            }
        },
        removeFromCart(indexObj) {
            console.log('rem',indexObj);
            const index = this.appItems[indexObj.filteredCategoryIndex].itemsList.findIndex(item => item.itemId === indexObj.filteredItemIndex );
            if(index > -1){
                this.appItems[indexObj.filteredCategoryIndex].itemsList[index].quantity -= 1;
                sessionStorage.setItem('itemsList', JSON.stringify(this.appItems));
            }
        },
        navigateToThankyouPage(){
            this.$router.push({name: 'ThankyouPage'}); 
        },
    },
    created() {
        this.appItems = JSON.parse(sessionStorage.getItem('itemsList'));
    }
}
</script>

<style scoped>
    .cartItemsSection{
        margin: 100px auto auto auto;
    }
    .filtered-category{
        padding: 20px;
    }
    .filtered-item{
        background-color: white;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
    }
    .empty-cart{
        height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .no-items{
        margin: auto;
    }
    .total-price{
        text-align: right;
        padding-right:100px;
    }
</style>