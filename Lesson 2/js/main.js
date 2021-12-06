class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();//вывод товаров на страницу
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000, img: 'img/notebook.jpeg' },
            { id: 2, title: 'Mouse', price: 20, img: 'img/mouse.jpeg' },
            { id: 3, title: 'Keyboard', price: 200, img: 'img/keyboard.jpeg' },
            { id: 4, title: 'Gamepad', price: 50, img: 'img/gamepad.jpeg' },
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }

    _calcTotal() {

        this.goods.forEach(item => {
            total = item.price + total;
        });

        const totalPrice = document.querySelector(this.container);
        totalPrice.insertAdjacentHTML("afterend",

            `<div class="products-item total">
                <h3 class="marg_05">Общая Стоимость товаров: ${total}</h3>
            </div>`
        );
    }
}

class ProductItem {
    constructor(product) {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = product.img;
    }
    render() {
        return `<div class="products-item">
                        <img src="${this.img}" alt="product-image" class="card">
                        <h3 class="marg_05">${this.title}</h3>
                        <p class="marg_05">${this.price}</p>
                        <button class="buy-btn">Купить</button>
                    </div>`
    }
}

let total = 0

let list = new ProductList();

list._calcTotal();

console.log(total);


// // // =========================== Корзина и методы =====================================

// class Cart {

//     constructor()

//     addToCart()

//     removeFromCart()

//     cartTotal()

//     checkout()

//     discount()
// };

// class cartItem {

//     constructor()

//     increaseAmount()

//     decreaseAmont()

// };