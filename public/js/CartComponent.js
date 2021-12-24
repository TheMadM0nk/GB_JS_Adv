Vue.component('cart', {
    data() {
        return {
            showCart: false,
            cartItems: []
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${product.id_product}/${product.product_name}`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            find.quantity++;

                        }
                    })
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson(`api/cart/${product.id_product}/${product.product_name}`, prod)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.push(prod);

                        }
                    })
            }
        },
        remove(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${product.id_product}/${product.product_name}`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${product.id_product}/${product.product_name}`, product)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        } else {
                            console.log('error');
                        }
                    })
            }
        },

        count(arr) {

            let result = arr.reduce((sum, current) => sum + current.quantity, 0);
            console.log(result);
            return result;
        }

    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el)
                }
            });
    },
    template: `
            <div class="cart-btn">
                <img @click="showCart = !showCart" class="nav-menu__ico" src="img/cart.svg">
                <span class="alarm" v-if="cartItems.length">{{ count(cartItems) }}</span>
                <div class="cart-block" v-show="showCart">
                                <p v-if="!cartItems.length">Empty</p>
                                <cart-item 
                                v-for="item of cartItems" 
                                :key="item.id_product"
                                :cart-item="item"
                                :img="item.img"                                
                                @remove="remove"></cart-item>
                </div>
            </div>`
});
Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
            <div class="product-info">

                <div class="product-img">
                    <img class="card-hover_cart" :src="img" :alt="cartItem.product_name">
                </div>

                <div class="product-desc">
                    <p class="product-title">{{ cartItem.product_name }}</p>
                    <p class="product-quantity">Quantity: {{ cartItem.quantity }}</p>
                    <p class="product-single-price">Price: {{ cartItem.price }} $</p>
                    <p class="product-price">Total: {{cartItem.quantity*cartItem.price}} $</p>
                    <button class="del-btn" @click="$emit('remove', cartItem)">Remove</button>
                </div>                
            </div>`
})