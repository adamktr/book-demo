export default class Search {
    /**
     * Search Component constructor
     * @param formId
     * @param resultsId
     * @param resultHandler - this handler should generate a Component instance from
     * the fetched results
     */
    constructor(formId, resultsId, resultHandler) {
        this._form = document.getElementById(formId);
        this._results = document.getElementById(resultsId);
        this._form.onsubmit = (e) => {
            e.preventDefault();
            this._results.innerHTML = '';
            this._search(resultHandler);
        }
    }

    /**
     * Get the query from the input element, and show the results
     * @param handler
     * @private
     */
    _search(handler) {
        const query = this._form.elements.query.value;
        this._download(query)
            .then((books) => {
                books.forEach((book) => {
                    const bookElement = handler(book);
                    this._results.appendChild(bookElement.getElement());
                })
            });
    }

    /**
     * Download the matching books from google
     * @param query
     * @returns {Promise.<TResult>}
     * @private
     */
    _download(query) {
        return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
            .then(data => data.json())
            .then(data => data.items.map((item) => item.volumeInfo));
    }
}
