class Router {

    constructor(main, scripts) {
        /**
         *
         * @type {Array<Component>}
         */
        this.routes = [];

        /**
         *
         * @type {HTMLElement | HTMLSelectElement | HTMLLegendElement | HTMLTableCaptionElement | HTMLTextAreaElement | HTMLModElement | HTMLHRElement | HTMLOutputElement | HTMLPreElement | HTMLEmbedElement | HTMLCanvasElement | HTMLFrameSetElement | HTMLMarqueeElement | HTMLScriptElement | HTMLInputElement | HTMLUnknownElement | HTMLMetaElement | HTMLStyleElement | HTMLObjectElement | HTMLTemplateElement | HTMLBRElement | HTMLAudioElement | HTMLIFrameElement | HTMLMapElement | HTMLTableElement | HTMLAnchorElement | HTMLMenuElement | HTMLPictureElement | HTMLParagraphElement | HTMLTableDataCellElement | HTMLTableSectionElement | HTMLQuoteElement | HTMLTableHeaderCellElement | HTMLProgressElement | HTMLLIElement | HTMLTableRowElement | HTMLFontElement | HTMLSpanElement | HTMLTableColElement | HTMLOptGroupElement | HTMLDataElement | HTMLDListElement | HTMLFieldSetElement | HTMLSourceElement | HTMLBodyElement | HTMLDirectoryElement | HTMLDivElement | HTMLUListElement | HTMLHtmlElement | HTMLAreaElement | HTMLMeterElement | HTMLAppletElement | HTMLFrameElement | HTMLOptionElement | HTMLImageElement | HTMLLinkElement | HTMLHeadingElement | HTMLSlotElement | HTMLVideoElement | HTMLBaseFontElement | HTMLTitleElement | HTMLButtonElement | HTMLHeadElement | HTMLParamElement | HTMLTrackElement | HTMLOListElement | HTMLDataListElement | HTMLLabelElement | HTMLFormElement | HTMLTimeElement | HTMLBaseElement | null}
         */
        this.main = document.querySelector(main);

        this.lastUrl = '';
    }

    addRoute(routePath, route) {
        this.routes[routePath] = route;
    }

    listen() {
        let hash = window.location.hash.substring(1);

        window.onhashchange = hashEvent => {
            let hash = window.location.hash.substring(1);
            this.notify('/' + hash);
        };

        this.notify('/' + hash);
    }

    notify(url) {
        if (!this.routes.hasOwnProperty(url)) {
            return;
        }

        if (this.routes.hasOwnProperty(this.lastUrl)) {
            this.routes[this.lastUrl].detachEvents();
        }

        fetch(this.routes[url].getTemplate())
            .then(response => response.text())
            .then(html => {
                this.main.innerHTML = html;
                this.routes[url].attachEvents();
            });

        this.lastUrl = url;
    }
}
