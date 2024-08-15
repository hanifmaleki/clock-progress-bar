class MyHeader extends HTMLElement {
    constructor() {
        super();
        // Attach a shadow DOM to the element
        this.attachShadow({ mode: 'open' });

        // Create and inject some HTML content into the shadow DOM
        const container = document.createElement('div');
        const style = document.createElement('style');
        container.className = 'container';

        Promise.all([
            fetch('my-header.html')
            .then(response => response.text())
            .then(html => { 
                container.innerHTML = html
            }),
            fetch('my-header.css')
            .then(response => response.text())
            .then(css => {
                style.textContent = css
            })
        ])
            .then(() => {
                // Append style and container to the shadow root
                this.shadowRoot.append(style, container);
            })
            .then(() => this.afterLoad())
    }

    // Use connectedCallback to safely access elements after they are connected
    afterLoad() {
    }
}

customElements.define('my-header', MyHeader)
