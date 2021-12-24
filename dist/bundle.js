/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/CartComponent.js":
/*!************************************!*\
  !*** ./public/js/CartComponent.js ***!
  \************************************/
/***/ (() => {

eval("Vue.component('cart', {\n    data() {\n        return {\n            showCart: false,\n            cartItems: []\n        }\n    },\n    methods: {\n        addProduct(product) {\n            let find = this.cartItems.find(el => el.id_product === product.id_product);\n            if (find) {\n                this.$parent.putJson(`/api/cart/${product.id_product}/${product.product_name}`, { quantity: 1 })\n                    .then(data => {\n                        if (data.result) {\n                            find.quantity++;\n\n                        }\n                    })\n            } else {\n                let prod = Object.assign({ quantity: 1 }, product);\n                this.$parent.postJson(`api/cart/${product.id_product}/${product.product_name}`, prod)\n                    .then(data => {\n                        if (data.result) {\n                            this.cartItems.push(prod);\n\n                        }\n                    })\n            }\n        },\n        remove(product) {\n            if (product.quantity > 1) {\n                this.$parent.putJson(`/api/cart/${product.id_product}/${product.product_name}`, { quantity: -1 })\n                    .then(data => {\n                        if (data.result) {\n                            product.quantity--;\n                        }\n                    })\n            } else {\n                this.$parent.delJson(`/api/cart/${product.id_product}/${product.product_name}`, product)\n                    .then(data => {\n                        if (data.result) {\n                            this.cartItems.splice(this.cartItems.indexOf(product), 1);\n                        } else {\n                            console.log('error');\n                        }\n                    })\n            }\n        },\n\n        count(arr) {\n\n            let result = arr.reduce((sum, current) => sum + current.quantity, 0);\n            console.log(result);\n            return result;\n        }\n\n    },\n    mounted() {\n        this.$parent.getJson(`/api/cart`)\n            .then(data => {\n                for (let el of data.contents) {\n                    this.cartItems.push(el)\n                }\n            });\n    },\n    template: `\n            <div class=\"cart-btn\">\n                <img @click=\"showCart = !showCart\" class=\"nav-menu__ico\" src=\"img/cart.svg\">\n                <span class=\"alarm\" v-if=\"cartItems.length\">{{ count(cartItems) }}</span>\n                <div class=\"cart-block\" v-show=\"showCart\">\n                                <p v-if=\"!cartItems.length\">Empty</p>\n                                <cart-item \n                                v-for=\"item of cartItems\" \n                                :key=\"item.id_product\"\n                                :cart-item=\"item\"\n                                :img=\"item.img\"                                \n                                @remove=\"remove\"></cart-item>\n                </div>\n            </div>`\n});\nVue.component('cart-item', {\n    props: ['cartItem', 'img'],\n    template: `\n            <div class=\"product-info\">\n\n                <div class=\"product-img\">\n                    <img class=\"card-hover_cart\" :src=\"img\" :alt=\"cartItem.product_name\">\n                </div>\n\n                <div class=\"product-desc\">\n                    <p class=\"product-title\">{{ cartItem.product_name }}</p>\n                    <p class=\"product-quantity\">Quantity: {{ cartItem.quantity }}</p>\n                    <p class=\"product-single-price\">Price: {{ cartItem.price }} $</p>\n                    <p class=\"product-price\">Total: {{cartItem.quantity*cartItem.price}} $</p>\n                    <button class=\"del-btn\" @click=\"$emit('remove', cartItem)\">Remove</button>\n                </div>                \n            </div>`\n})\n\n//# sourceURL=webpack://final-work/./public/js/CartComponent.js?");

/***/ }),

/***/ "./public/js/ErrorComponent.js":
/*!*************************************!*\
  !*** ./public/js/ErrorComponent.js ***!
  \*************************************/
/***/ (() => {

eval("Vue.component('error', {\r\n   data(){\r\n      return {\r\n         text: ''\r\n      }\r\n   },\r\n   methods: {\r\n      setText(value){\r\n         this.text = value;\r\n      }\r\n   },\r\n   template: `<div class=\"error-block\" v-if=\"text\">\r\n                    <p class=\"error-msg\">\r\n                    <button class=\"close-btn\" @click=\"setText('')\">&times;</button>\r\n                    {{text}}\r\n                    </p>\r\n                </div>`\r\n})\n\n//# sourceURL=webpack://final-work/./public/js/ErrorComponent.js?");

/***/ }),

/***/ "./public/js/ProductComponent.js":
/*!***************************************!*\
  !*** ./public/js/ProductComponent.js ***!
  \***************************************/
/***/ (() => {

eval("Vue.component('products', {\n    data() {\n        return {\n            catalogUrl: `/catalogData.json`,\n            products: [],\n            filtered: [],\n        }\n    },\n    methods: {\n        filter(value) {\n            let regexp = new RegExp(value, 'i');\n            this.filtered = this.products.filter(el => regexp.test(el.product_name));\n        }\n    },\n    mounted() {\n        this.$parent.getJson(`/api/products`)\n            .then(data => {\n                for (let el of data) {\n                    this.products.push(el);\n                    this.filtered.push(el);\n                }\n            });\n    },\n    template: `<div class=\"grid-box\">\n            <product \n            v-for=\"product of filtered\" \n            :key=\"product.id_product\"\n            :product=\"product\"\n            :img=\"product.img\"></product>\n        </div>`\n});\nVue.component('product', {\n    props: ['product', 'img'],\n    template: `           \n            <div class=\"cards\">\n                <div class=\"card-img\">\n                    <img :src=\"img\" :alt=\"product.product_name\" class=\"card-hover\">\n                    <div class=\"hover-cart\">\n                        <button class=\"hover-button\" @click=\"$root.$refs.cart.addProduct(product)\">                        \n                            <img src=\"img/cart.svg\" alt=\"cart-ico\" class=\"cart-ico\">\n                            <p>Add to Cart</p>\n                        </button>\n                    </div>\n                </div>\n                <div class=\"card-txt-box\">\n                    <p class=\"card-name pl-18\">{{ product.product_name }}</p>\n                    <p class=\"card-txt pl-18\">Known for her sculptural takes on traditional tailoring,\n                        Australian\n                        arbiter\n                        of cool Kym Ellery teams up with Moda Operandi.</p>\n                    <p class=\"card-price pl-18\">$\\{{ product.price }}</p>\n                </div>\n            </div>`\n})\n\n//# sourceURL=webpack://final-work/./public/js/ProductComponent.js?");

/***/ }),

/***/ "./public/js/SearchComponent.js":
/*!**************************************!*\
  !*** ./public/js/SearchComponent.js ***!
  \**************************************/
/***/ (() => {

eval("Vue.component('search-form', {\r\n   data() {\r\n      return {\r\n         userSearch: '',\r\n         showSearch: false\r\n      }\r\n   },\r\n   template: `\r\n         <div class=\"search-form\" >\r\n            <img @click=\"showSearch=!showSearch\" src=\"img/search.svg\" alt=\"search\">\r\n            <form class=\"search-box\" action=\"#\" v-if=\"showSearch\" method=\"post\" @submit.prevent=\"$parent.$refs.products.filter(userSearch)\">\r\n                <input type=\"text\" class=\"search-field\" v-model=\"userSearch\">\r\n                <button class=\"btn-search\" type=\"submit\">Search</button>\r\n            </form>\r\n         </div>`\r\n});\n\n//# sourceURL=webpack://final-work/./public/js/SearchComponent.js?");

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/***/ (() => {

eval("const app = new Vue({\n    el: '#app',\n    data: {\n\n        show: false,\n        totalQuantity: 0\n    },\n    methods: {\n        getJson(url) {\n            return fetch(url)\n                .then(result => result.json())\n                .catch(error => this.$refs.error.setText(error))\n        },\n        postJson(url, data) {\n            return fetch(url, {\n                method: 'POST',\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify(data)\n            })\n                .then(result => result.json())\n                .catch(error => this.$refs.error.setText(error))\n        },\n        putJson(url, data) {\n            return fetch(url, {\n                method: 'PUT',\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify(data)\n            })\n                .then(result => result.json())\n                .catch(error => this.$refs.error.setText(error))\n        },\n        delJson(url, data) {\n            return fetch(url, {\n                method: 'DELETE',\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify(data)\n            })\n                .then(result => result.json())\n                .catch(error => this.$refs.error.setText(error))\n        },\n    },\n});\n\n//# sourceURL=webpack://final-work/./public/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./public/js/SearchComponent.js"]();
/******/ 	__webpack_modules__["./public/js/CartComponent.js"]();
/******/ 	__webpack_modules__["./public/js/ProductComponent.js"]();
/******/ 	__webpack_modules__["./public/js/ErrorComponent.js"]();
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/main.js"]();
/******/ 	
/******/ })()
;