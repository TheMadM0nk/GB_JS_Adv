const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = data;
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });

    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}

let itemClass = 'product-item';


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;

    }
    render() {
        return `<div class="${itemClass}" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class CrateList {
    constructor(container = '.crate') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getBasket()
            .then(data => { //data - объект js
                this.goods = data.contents;
                this.render()
            });
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new CrateItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }



    _getBasket() {

        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
}

class CrateItem {
    constructor(product, quantity = '1') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.quantity = quantity;

    }
    render() {
        return `<div class="cart" data-id="${this.id}">                
                <div class="cartBox">                    
                    <div class="cart-item">
                        <h3>${this.title}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn">Купить</button>
                    </div>
                    <div class="cart-item">
                        <p>Количество: ${this.quantity}</p>
                        <button class="buy-btn">Удалить</button>
                    </div>
                </div>
            </div>`
    }
}


// ========== cart button ==============
let crate = document.querySelector('.crate');
let btn_cart = document.querySelector('.btn-cart');

function toggleMenu() {
    crate.classList.toggle('hide');
};

btn_cart.addEventListener('click', toggleMenu);
// =========================================

let list = new ProductsList();
let cart = new CrateList();
console.log(list.allProducts);

