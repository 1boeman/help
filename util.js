const doFetch = async(url,
                        params={},
                        method="GET",
                        callback=async (response)=>{
                            const result = await response.json();
                            console.log(result);
                        },errorHandler=(error)=>{
                            alert("An error has occurred. Please try again later.")
                        })=>
{ try {
    const response = await fetch(url, {method:method});
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    callback(response)
  } catch (error) {
    console.error(error.message);
    errorHandler(error)
  }
}


// if it's not a array, put it in an array
function listify(elementOrArray){
    if (!Array.isArray(elementOrArray)){
        elementOrArray = [elementOrArray]
    }
    return elementOrArray;
}


// select elements based on css selector
const q = function(selector, rootElement=false){
    let _parent = rootElement || document; 
    let items = _parent.querySelectorAll(selector);
    return [...items]
};


// get parents of element el filtered by css selector 
const parents = function(el, selector, firstParent=false) {
    const parents = [];
    while ((el = el.parentNode) && el !== document) {
        if (!selector || el.matches(selector)) {
            parents.push(el);
            if (firstParent){
                break;
            }
        }
    }
    return parents;
}


// add click event listener to element of array of elements
const clck = function(elOrArray, callback){
    elOrArray = listify(elOrArray)
    elOrArray.forEach(el => {
        el.addEventListener('click',function(e){
            e.preventDefault();
            e.stopPropagation();
            callback.apply(this,[e]);
        });
    })
    return elOrArray;
};


const ready = function(fn) {
    if (document.readyState !== 'loading') {
        fn();
        return;
    }
    document.addEventListener('DOMContentLoaded', fn);
}


const CSS = css => {
    let el = document.createElement('style');
    el.type = 'text/css';
    el.innerText = css;
    document.head.appendChild(el);
    return el;
};


const CSSLink = (url) => {
    const head = document.head;
    let  link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    head.appendChild(link);
}


const bodyClassCallbacks = bodyClassHandlers => {
    const classList = [...document.body.classList];

    classList.map((name) => {if (typeof bodyClassHandlers[name] == 'function'){
        bodyClassHandlers[name]()}
    });
}


const clickHandlers = (functionContainer, rootElement=false) => {
    q('[data-clck]', rootElement).forEach((el) => {
        if (el.dataset.clck
            && !el.classList.contains('clck-listening') 
            && typeof functionContainer[el.dataset.clck] == 'function'){
            el.classList.add('clck-listening');
            u.clck(el, functionContainer[el.dataset.clck]);
        }
    });
}


const listen = function(elOrArray, eventName, eventHandler) {
    elOrArray = listify(elOrArray);
    elOrArray.forEach(el => {
        const wrappedHandler = (e) => {
            eventHandler.call(el, e);
        };
        el.addEventListener(eventName, wrappedHandler);
    })
    return elOrArray;
}


const u = { q, ready,parents, clck, 
            CSS, CSSLink, bodyClassCallbacks, 
            listen, clickHandlers, doFetch};

export { q, parents, clck, ready, u}
export default u;
