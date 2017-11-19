import Component from "./component";

export default class Book extends Component {
    /**
     * Book Component
     *
     * @param data
     * @param popup
     * @param cart
     */
    constructor({ data, popup, cart }) {
        super();
        Object.assign(this, { data, popup, cart });
        this._build();
        this._render();
    }

    /**
     * Show details of actual instance
     * @private
     */
    _showDetails() {
        if (!this.popup) {
            return;
        }
        this.popup.show(this._details);
    }

    /**
     * Add actual instance to cart
     * @private
     */
    _addToCart() {
        if (!this.cart) {
            return;
        }
        this.cart.add({ data: this.data });
    }

    /**
     * Build the DOM elements of the book
     * @private
     */
    _build() {
        this._container = document.createElement('div');
        this._title = this._generateTitle();
        this._cartButton = this._generateButton(`Add to Cart`, this._addToCart.bind(this));
        this._cartButton.className = 'btn btn-sm btn-default';
        this._generateDetails();
    }

    _generateTitle() {
        if (this.popup) {
            return this._generateButton(`${this.data.title}`, this._showDetails.bind(this))
        }
        return document.createTextNode(this.data.title);
    }

    /**
     * Generate DOM elements of detailed view
     * @private
     */
    _generateDetails() {
        this._details = document.createElement('div');
        const image = new Image();
        image.className = 'thumbnail';
        image.src = this.data.imageLinks && this.data.imageLinks.smallThumbnail;
        this._details.appendChild(image);

        const title = document.createElement('h3');
        title.innerHTML = this.data.title;
        this._details.appendChild(title);

        const author = document.createElement('h2');
        author.innerHTML = (this.data.authors || []).join(',');
        this._details.appendChild(author);

        const description = document.createElement('p');
        description.innerHTML = this.data.description;
        this._details.appendChild(description);
    }

    /**
     * Render the elements to show into default container.
     * @private
     */
    _render() {
        this._container.appendChild(this._title);
        if (this.cart) {
            this._container.appendChild(this._cartButton);
        }
    }
}
