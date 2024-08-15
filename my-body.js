class MyBody extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open'})
        
        Promise.all([
            // Load and inject the CSS.
            fetch('my-body.css')
                .then(response => response.text())
                .then(css => {
                    const style = document.createElement('style')
                    style.textContent = css
                    this.shadowRoot.appendChild(style)
                }),

            // Load and inject the HTML
            fetch('my-body.html')
                .then(response => response.text())
                .then(html => {
                    const template = document.createElement('template')
                    template.innerHTML = html
                    this.shadowRoot.appendChild(template.content.cloneNode(true))
                })
        ])
            .then(() => this.afterLoad())
    }

    afterLoad() {
        var timer = setInterval(function () {timerTick()}, 1000);

        var hourElement = this.shadowRoot.querySelector('#hour')
        var minElement = this.shadowRoot.querySelector('#min')
        var secElement = this.shadowRoot.querySelector('#sec')
		var pb1 = this.shadowRoot.getElementById("pb1")
		var pb2 = this.shadowRoot.getElementById("pb2")
		var pb3 = this.shadowRoot.getElementById("pb3")

		var date;var hour;var min;var sec;

		function timerTick(){
			date = new Date();
			hour = date.getHours()
			min = date.getMinutes()
		    sec = date.getSeconds()
			hourElement.children[1].innerHTML = hour
			minElement.children[1].innerHTML = min
			secElement.children[1].innerHTML = sec
			pb1.style.height = 500 / 24 * hour + "px"
			pb1.style.marginTop = 500 - (500 / 24 * hour) + "px"
			pb2.style.height = 500 / 59 * min + "px"
			pb2.style.marginTop = 500 - (500 / 59 * min) + "px"
			pb3.style.height = 500 / 59 * sec + "px"
			pb3.style.marginTop = 500 - (500 / 59 * sec) + "px"
      //59 instead of 60 so there is no space at the top left 
        }
    }
}

customElements.define('my-body', MyBody)
