import Component from "./component";

export default class Popup extends Component {
    /**
     * Popup Component constructor
     * @param containerId
     */
    constructor(containerId) {
        super();
        this._container = document.getElementById(containerId);
        this._contents = this._container.getElementsByClassName('content')[0];
        this._hide = this._container.getElementsByClassName('close')[0];
        this._hide.onclick = this.hide.bind(this);
        this._items = {}
    }

    /**
     * Show the popup with given content in it
     * @param content
     */
    show(content) {
        this._container.className = [...new Set([...this._container.className.split(' ').filter((item) => item !== 'hidden')])].join(' ');
        this._contents.innerHTML = '';
        this._contents.appendChild(content);
    }

    /**
     * Hide the popup
     */
    hide() {
        this._contents.innerHTML = '';
        this._container.className = [...new Set(['hidden', ...this._container.className.split(' ')])].join(' ');
    }
}
