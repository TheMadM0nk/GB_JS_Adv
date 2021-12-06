const products = [
    { id: 1, title: 'Notebook', price: 2000, image: 'img/notebook.jpeg' },
    { id: 2, title: 'Mouse', price: 20, image: 'img/mouse.jpeg' },
    { id: 3, title: 'Keyboard', price: 200, image: 'img/keyboard.jpeg' },
    { id: 4, title: 'Gamepad', price: 50, image: 'img/gamepad.jpeg' },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (obj) => {
    return `<div class="product-item">
                <img src="${obj.image}" alt="product-image" class="card">
                <h3 class="marg_05">${obj.title}</h3>
                <p class="marg_05">${obj.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {

    // Т.к. метод map() всегда возвращает массив, при выводе информации в документ мы получим
    // не нужныем нам запятые. Для того чтоб запятых не было, нужно использовать метод join(),
    // что позволит привести наш массив к строке. 
    const productsList = list.map(item => renderProduct(item)).join("");
    console.log(productsList);
    document.querySelector('.product').innerHTML = productsList;
};

renderPage(products);