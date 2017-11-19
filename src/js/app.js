'use strict';

import Book from "./components/book";
import Cart from "./components/cart";
import Search from "./components/search";
import Popup from "./components/popup";

const popup = new Popup('popup');
const cart = new Cart('cart', Book);

const search = new Search('searchform', 'main', (data) => new Book({
    data,
    popup,
    cart,
}));





