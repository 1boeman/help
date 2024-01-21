// if it's not a array, put it in an array
function listify(elementOrArray){
    if (!Array.isArray(elementOrArray)){
        elementOrArray = [elementOrArray]
    }
    return elementOrArray;
}


const q = function(selector, rootElement=false){
    let _parent = rootElement || document; 
    let items = _parent.querySelectorAll(selector);
    return [...items]
};


const parents = function(el, selector) {
    const parents = [];
    while ((el = el.parentNode) && el !== document) {
        if (!selector || el.matches(selector)) parents.push(el);
    }
    return parents;
}


const clck = function(elOrArray,callback){
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



const bodyClassCallbacks = bodyClassHandlers => {
    const classList = [...document.body.classList];

    classList.map((name) => {if (typeof bodyClassHandlers[name] == 'function'){
        bodyClassHandlers[name]()}
    });
}


const clickHandlers = functionContainer => {
    q('[data-clck]').forEach((el) => {
        if (el.dataset.clck
            && typeof functionContainer[el.dataset.clck] == 'function'){
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


const u = {"q":q, "ready":ready, "parents":parents, "clck":clck, "CSS":CSS, "bodyClassCallbacks":bodyClassCallbacks, "listen":listen, clickHandlers};

export { q, parents, clck, ready, u}
export default u;
