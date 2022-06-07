//import css from './page-loader.css' assert { type: 'css' };
class PageLoader extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>          
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
            transition: .5s ease;
            opacity: 1;
          }
          
          .barra-preloader {
            width: 50px;
            height: 20vh;
            margin: 20px;
            background: #fff;
            animation: pulso 1.2s linear infinite;
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
          @keyframes pulso {
              0% {
                transform: scaleY(1);
              }
            
              10% {
                transform: scaleY(1.3);
              }
            
              100% {
                transform: scaleY(1);
              }
            }
        </style>
        `

        for (let i = 0; i < 3; i++) {
            let barra = document.createElement('div')
            barra.classList.add('barra-preloader')
            this.shadowRoot.appendChild(barra)
        }
    }

    connectedCallback() {

        window.addEventListener('load', e => {
          console.log("loaded")
          this.style.opacity = 0;
          setTimeout(() => {
            this.remove()
          }, 1000)
        })
    }
}

window.customElements.define('page-loader', PageLoader);