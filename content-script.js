
var execute = () => { 
    // get funnel id
    const getFunnelId = () => {
        return document.querySelector('meta[name="funnel-id"]')?.content;
    };

    // get product selector id
    const getProductSelectorId = () => {
        return document.querySelector('meta[name="product-selector-id"]')?.content;
    };

    // container
    const container = document.createElement("div"); 
    container.id="petlab-devtool-chrome-ext";
    container.style.position = "fixed";
    container.style.top = "235px";
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
    const editButton = button.cloneNode(true);
    editButton.innerHTML = "<i class='fa fa-pencil'></i>";
    editButton.href = `https://builder.io/content/${getFunnelId()}`;
    editButton.target = "_blank";

    // config button
    const configButton = button.cloneNode(true);
    configButton.innerHTML = "<i class='fa fa-cogs'></i>";
    configButton.href = `https://builder.io/content/${getProductSelectorId()}`;
    configButton.target = "_blank";

    // append
    if( getFunnelId() ) {
        container.appendChild(editButton);
    }
    if( getProductSelectorId() ) {
        container.appendChild(configButton);
    }

    
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

execute();