import Component from "./component";

export default class Cart extends Component {
    /**
     * Cart Component constructor
     *
     * @param containerId
     * @param Element - the class of the instances in the cart
     */
    constructor(containerId, Element) {
        super();
        this._container = document.getElementById(containerId);
        this._items = {};
        this._Element = Element;
        this._storagePrefix = `x-book-cart-`;
        this._initByStorage();
    }

    /**
     * Add item to cart
     * Save it into memory and session storage as well.
     *
     * @param item
     */
    add(item) {
        const book = new this._Element(item);
        const id = this._generateId(book);
        if (!this._items[id]) {
            book.DOMElement = this._generateDOMElement(book);
            this._items[id] = book;
            this._container.appendChild(book.DOMElement);
            this._updateStorage()
        }
    }

    /**
     * Remove item from cart
     * @param item
     */
    remove(item) {
        const id = this._generateId(item);
        this._container.removeChild(this._items[id].DOMElement);
        delete this._items[id];
        this._updateStorage(id);
    }

    /**
     * Generate unique id for given item
     *
     * @param item
     * @returns {string}
     * @private
     */
    _generateId(item) {
        return item.data.title.replace(/\W+/g, '');
    }

    /**
     * Generates DOM element from given item
     * @param item
     * @returns {Element}
     * @private
     */
    _generateDOMElement(item) {
        const element = document.createElement('div');
        element.appendChild(item.getElement());
        const removeButton = this._generateButton('remove', this.remove.bind(this, item));
        removeButton.className='btn btn-sm btn-danger'
        element.appendChild(removeButton);
        return element;
    }

    /**
     * Updates the session storage from memory
     * @private
     */
    _updateStorage() {
        sessionStorage.setItem(`${this._storagePrefix}`, JSON.stringify(Object.entries(this._items).map(([, item]) => item.data)));
    }

    /**
     * Initializes the memory and the view based on session storage.
     * @private
     */
    _initByStorage() {
        const storedItems = JSON.parse(sessionStorage.getItem(`${this._storagePrefix}`)) || [];
        this._items = [...storedItems].reduce((items, item) => {
            const book = new this._Element({ data: item });
            book.DOMElement = this._generateDOMElement(book);
            this._container.appendChild(book.DOMElement);
            return Object.assign(items, { [this._generateId(book)]: book });
        }, {});
    }
}
