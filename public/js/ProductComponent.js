Vue.component('products', {
    data() {
        return {
            catalogUrl: `/catalogData.json`,
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `<div class="grid-box">
            <product 
            v-for="product of filtered" 
            :key="product.id_product"
            :product="product"
            :img="product.img"></product>
        </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `           
            <div class="cards">
                <div class="card-img">
                    <img :src="img" :alt="product.product_name" class="card-hover">
                    <div class="hover-cart">
                        <button class="hover-button" @click="$root.$refs.cart.addProduct(product)">                        
                            <img src="img/cart.svg" alt="cart-ico" class="cart-ico">
                            <p>Add to Cart</p>
                        </button>
                    </div>
                </div>
                <div class="card-txt-box">
                    <p class="card-name pl-18">{{ product.product_name }}</p>
                    <p class="card-txt pl-18">Known for her sculptural takes on traditional tailoring,
                        Australian
                        arbiter
                        of cool Kym Ellery teams up with Moda Operandi.</p>
                    <p class="card-price pl-18">$\{{ product.price }}</p>
                </div>
            </div>`
})