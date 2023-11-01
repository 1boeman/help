const q = function(selector){
    let items = document.querySelectorAll(selector);
    return [...items]
};

const parents = function(el, selector) {
    const parents = [];
    while ((el = el.parentNode) && el !== document) {
        if (!selector || el.matches(selector)) parents.push(el);
    }
    return parents;
}

const clck = function(elementOrArray,callback){
    if (!Array.isArray(elementOrArray)){
        elementOrArray = [elementOrArray]
    }

    elementOrArray.forEach(el => {
        el.addEventListener('click',function(e){
            e.stopPropagation()
            callback.apply(this,[e]); 
        });
    })
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

const u = {"q":q, "ready":ready,"parents":parents,"clck":clck,"CSS":CSS};

export { q, parents, clck, ready, u}
export default u;
