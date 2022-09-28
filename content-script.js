
var execute = (options) => { 

    const getApiKey = () => {
        const images = document.getElementsByTagName("img");
        const [apiKey] = Array.from(images).filter(image => {
            return image.className.includes('builder-pixel');
        }).map(image => {
            return image.currentSrc.replace('https://cdn.builder.io/api/v1/pixel?apiKey=', '');
        })
        return apiKey;
    };

    // get funnel id
    const getFunnelId = () => {
        return document.querySelector('meta[name="funnel-id"]')?.content;
    };

    // get product selector id
    const getProductSelectorId = () => {
        return document.querySelector('meta[name="product-selector-id"]')?.content;
    };

    // get product selector id
    const getMainUrl = (defaultUrl) => {
        return document.querySelector('meta[name="main-domain"]')?.content || defaultUrl;
    };

    // container
    const container = document.createElement("div"); 
    container.id="petlab-devtool-chrome-ext";
    container.style.position = "fixed";
    container.style.width = "30px";
    container.style.top = "400px";
    container.style.right = "0px";
    container.style.display = "block";
    container.style.zIndex = 9999;

    // button
    const button = document.createElement("a");
    button.style.backgroundColor = "white";
    button.style.borderWidth = "1px 0px 1px 1px";
    button.style.borderTopStyle = "solid";
    button.style.borderRightStyle = "initial";
    button.style.borderLeftStyle = "solid";
    button.style.borderBottomStyle = "solid";
    button.style.borderTopColor = "black";
    button.style.borderRightColor = "initial";
    button.style.borderLeftColor = "black";
    button.style.borderBottomColor = "black";
    button.style.boxShadow = "#000 0px 0px 10px 0px;";
    button.style.width = "30px";
    button.style.margin = "5px 0px";
    button.style.padding = "5px";
    button.style.borderTopLeftRadius = "10px";
    button.style.borderBottomLeftRadius = "10px";
    button.style.display = "block";
    button.style.fontSize = "18px";
    button.style.lineHeight = "0";
    button.style.cursor = "pointer";

    // edit button
    const editJsonButton = button.cloneNode(true);
    editJsonButton.innerHTML = `<img src="${chrome.extension.getURL('images/doc.svg')}" width="15" />`;;
    editJsonButton.href = `https://cdn.builder.io/api/v2/content/funnel?query.id=${getFunnelId()}&limit=1&includeRefs=true&apiKey=${getApiKey()}`;
    editJsonButton.target = "_blank";

    // edit button
    const configJsonButton = button.cloneNode(true);
    configJsonButton.innerHTML = `<img src="${chrome.extension.getURL('images/doc.svg')}" width="15" />`;;
    configJsonButton.href = `https://cdn.builder.io/api/v2/content/product-selector?query.id=${getProductSelectorId()}&limit=1&includeRefs=true&apiKey=${getApiKey()}`;
    configJsonButton.target = "_blank";

    // edit button
    const editButton = button.cloneNode(true);
    editButton.innerHTML = `<img src="${chrome.extension.getURL('images/pencil.svg')}" width="15" />`;
    editButton.href = `https://builder.io/content/${getFunnelId()}`;
    editButton.target = "_blank";

    // config button
    const configButton = button.cloneNode(true);
    configButton.innerHTML = `<img src="${chrome.extension.getURL('images/gears.svg')}" width="15" />`;
    configButton.href = `https://builder.io/content/${getProductSelectorId()}`;
    configButton.target = "_blank";

    // localhost button
    const localhost = "http://localhost:8000"
    const localButton = button.cloneNode(true);
    localButton.innerHTML = `<img src="${chrome.extension.getURL('images/desktop.svg')}" width="15" />`;
    localButton.href = localhost + window.location.pathname;
    localButton.target = '_blank';

    // staging button
    const stagingurl = "https://funnel-dev.thepetlabco.com";
    const stagingButton = button.cloneNode(true);
    stagingButton.innerHTML = `<img src="${chrome.extension.getURL('images/dev.svg')}" width="15" />`;
    stagingButton.href = stagingurl + window.location.pathname;
    stagingButton.target = '_blank';

    // live button
    const liveurl = getMainUrl("https://offer.thepetlabco.com");
    const liveButton = button.cloneNode(true);
    liveButton.innerHTML = `<img src="${chrome.extension.getURL('images/globe.svg')}" width="15" />`;
    liveButton.href = liveurl + window.location.pathname;
    liveButton.target = '_blank';

    // devtool button
    const devtoolButton = button.cloneNode(true);
    devtoolButton.innerHTML = `<img src="${chrome.extension.getURL('images/cogs.svg')}" width="15" />`;
    devtoolButton.href = '/devtools/funnels-list';
    devtoolButton.target = '_blank';

    // append
    
    if( getFunnelId() ) {
        container.appendChild(editButton);
        setTimeout(() => {
            container.appendChild(editJsonButton);
        },1000);
    }
    if( getProductSelectorId() ) {
        container.appendChild(configButton);
        setTimeout(() => {
            container.appendChild(configJsonButton);
        },1000);
    }
    container.appendChild(localButton);
    container.appendChild(stagingButton);
    container.appendChild(liveButton);
    container.appendChild(devtoolButton);
    
    if( getFunnelId() || getProductSelectorId() ) {
        if(document.querySelectorAll('#petlab-devtool-chrome-ext').length <= 0) {
            document.body.appendChild(container); 
            console.log("Petlab Builder Tool: tool successfully inserted!");
        }
    } else {
        console.log("Petlab Builder Tool: no ids found!");
    }

    console.log("Petlab Builder Tool... clicked!")
}

window.addEventListener("onload", execute);
window.addEventListener("pageshow", execute);

chrome.storage.sync.get({
        localhost: 'http://localhost:8000',
    }, function(options) {

    //Do all my webpage processing here, 
    //basically writing my entire Extension inside
    // this call to chrome.storage.sync.get()

    execute(options);

})
