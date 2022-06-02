//import css from './page-loader.css' assert { type: 'css' };
class PageLoader extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
        @keyframes pulso {
            0% {
              transform: scaleY(1);
            }
          
            10% {
              transform: scaleY(1.1);
            }
          
            100% {
              transform: scaleY(1);
            }
          }
          
          :host {
            background-color: var(--thm-base);
            width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: .3s;
          }
          
          .barra-preloader {
            width: 100px;
            height: 20vh;
            margin: 20px;
            background: #fff;
            animation: pulso .9s linear infinite;
          }
          
          .barra-preloader:nth-child(1) {
            animation-delay: .3s;
          }
          
          .barra-preloader:nth-child(2) {
            animation-delay: .6s;
          }
          
          .barra-preloader:nth-child(3) {
            animation-delay: .9s;
          }
        </style>
        `

        for (let i = 0; i < 3; i++) {
            let barra = document.createElement('div')
            barra.classList.add('barra-preloader')
            this.shadowRoot.appendChild(barra)
        }
        
        document.body.style.opacity = 1;
    }

    connectedCallback() {

        window.addEventListener('load', e => {
            this.remove()
        })
    }
}

window.customElements.define('page-loader', PageLoader);