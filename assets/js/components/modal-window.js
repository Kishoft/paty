class ModalWindow extends HTMLElement {

    static get observedAttributes() {
        return ['open', 'open-button-text', 'template-url'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        import('./modal-window.css', { assert: { type: 'css' } })
            .then(css => {
                this.shadowRoot.adoptedStyleSheets = [css.default];
            })
    }

    connectedCallback() {

        this.addEventListener('click', e => {
            e.preventDefault();
            if (e.path[0] === this) {
                this.toggleModal();
            }
        })

        let slot  = document.createElement('slot');

        let open_button = document.createElement('a');
        open_button.classList.add('open-button');
        open_button.innerHTML = this.getAttribute('open-button-text') || 'Abrir';
        open_button.addEventListener('click', e => {
            e.preventDefault();
            this.toggleModal();
        })

        let modal_content = document.createElement('div');
        modal_content.classList.add('modal-content');
        this.shadowRoot.appendChild(modal_content);

        modal_content.appendChild(slot)

        let close_button = document.createElement('button');
        close_button.classList.add('close-button');
        close_button.innerHTML = '&times;';
        close_button.addEventListener('click', e => {
            e.preventDefault();
            this.toggleModal();
        })

        this.shadowRoot.append(modal_content, open_button, close_button);

        fetch(`./assets/js/components/templates/${this.getAttribute('template-url')}.html`)
            .then(response => response.text())
            .then(template => {
                this.insertAdjacentHTML('beforeend', template);
            })

    }
    toggleModal() {
        this.toggleAttribute('open');
        if (this.hasAttribute('open')) {
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            document.querySelector(".sigma_header-absolute").style.zIndex = 1;
        }
        else {
            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = 'auto';
            document.querySelector(".sigma_header-absolute").style.zIndex = 8;
        }
    }
}

window.customElements.define('modal-window', ModalWindow);