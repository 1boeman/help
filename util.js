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


const clck = function(el,callback){
    el.addEventListener('click',function(e){
        e.stopPropagation()
        callback.apply(this,[e]); 
    });
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


const listen = function(el, eventName, eventHandler, selector) {
  if (selector) {
    const wrappedHandler = (e) => {
      if (!e.target) return;
      const el = e.target.closest(selector);
      if (el) {
        eventHandler.call(el, e);
      }
    };
    el.addEventListener(eventName, wrappedHandler);
    return wrappedHandler;
  } else {
    const wrappedHandler = (e) => {
      eventHandler.call(el, e);
    };
    el.addEventListener(eventName, wrappedHandler);
    return wrappedHandler;
  }
}


const u = {"q":q, "ready":ready, "parents":parents, "clck":clck, "CSS":CSS, "bodyClassCallbacks":bodyClassCallbacks, "listen":listen, clickHandlers};

export default u;
