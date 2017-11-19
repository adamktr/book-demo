export default class Component {

    /**
     * Return the base element of actual component
     * @returns {*}
     */
    getElement() {
        return this._container;
    }

    /**
     * Generate a button element with given text and handler
     * @param text
     * @param handler
     * @returns {Element}
     * @private
     */
    _generateButton(text, handler) {
        const a = document.createElement('a');
        const linkText = document.createTextNode(text);
        a.appendChild(linkText);
        a.onclick = handler;
        return a;
    }

}
