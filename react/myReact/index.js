
class Component {
    constructor(props = {}) {
        this.state = {};
        this.props = props;
    }

    setState(stateChange) {
        Object.assign(this.state, stateChange);
        renderComponent(this);
    }
}

function createComponent(component, props) {
    let instance;
    if (component.prototype && component.prototype.render) {
        instance = new component(props);
    } else {
        instance = new Component(props);
        instance.constructor = component;
        instance.render = function () {
            return this.constructor(props);
        }
    }
    return instance;
}

function renderComponent(component) {
    if (component.dom && component.shouldComponentUpdate) {
        const shouldUpdate = component.shouldComponentUpdate();
        if (!shouldUpdate) {
            return;
        }
    }

    if (component.dom && component.componentWillUpdate) {
        component.componentWillUpdate();
    }

    const renderer = component.render();
    const dom = createElement(renderer);

    if (component.dom) {
        component.dom.parentNode.replaceChild(dom, component.dom);

        if (component.componentDidUpdate) {
            component.componentDidUpdate();
        }
    } else {
        if (component.componentDidMount) {
            component.componentDidMount();
        }
    }

    component.dom = dom;
}

function setComponentProps(component, props) {
    if (!component.dom) {
        if (component.componentWillMount) {
            component.componentWillMount();
        }
    } else if (component.componentWillReceiveProps) {
        component.componentWillReceiveProps(props);
    }
    component.props = props;

    renderComponent(component);
}

function createElement(vnode) {
    if (!vnode || typeof vnode === 'boolean') {
        vnode = '';
    }

    if (typeof vnode === 'string') {
        const textNode = document.createTextNode(vnode);
        return textNode;
    }

    const { tagName, attrs, children } = vnode;
    if (typeof tagName === 'function') {
        const component = createComponent(tagName, attrs);
        setComponentProps(component, attrs);
        return component.dom;
    }

    const element = document.createElement(tagName);

    if (attrs) {
        for (const key in attrs) {
            if (attrs.hasOwnProperty(key)) {
                const value = attrs[key];
                setAttribute(element, key, value);
            }
        }
    }

    if (Array.isArray(children) && children.length) {
        for (let index = 0; index < children.length; index++) {
            const child = children[index];
            render(child, element);
        }
    } else {
        render(children, element)
    }

    return element;
}

function setAttribute(dom, key, value) {
    if (key === 'className') {
        key = 'class';
    }

    if (/^on\w+/.test(key)) {
        key = key.toLowerCase();
        // let event = name.split('on')[1];
        // event = event && event.toLowerCase();
        dom[key] = value;
    } else if (key === 'style') {
        if (!value || typeof value === 'string') {
            dom.style.cssText = value || '';
        } else if (typeof value === 'object') {
            for (const name in value) {
                if (value.hasOwnProperty(name)) {
                    dom.style[name] = value[name];
                }
            }
        }
    } else {
        dom.setAttribute(key, value);
    }
}

function render(vnode, container) {
    container.appendChild(createElement(vnode));
}

const ReactDom = {
    render
};

const React = {
    Component
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 1
        }
    }

    componentWillMount() {
        console.log('App componentWillMount');
    }

    componentDidMount() {
        console.log('App componentDidMount');
    }

    componentWillReceiveProps(newProps) {
        console.log('App componentWillReceiveProps', newProps);
    }

    shouldComponentUpdate() {
        console.log('App shouldComponentUpdate');
        return true;
    }

    componentWillUpdate() {
        console.log('App componentWillUpdate');
    }

    componentDidUpdate() {
        console.log('App componentDidUpdate');
    }

    onClick = (e) => {
        this.setState({
            num: this.state.num + 1
        });
    }

    render() {
        const { num } = this.state;
        return {
            tagName: 'div',
            attrs: {
                className: 'app'
            },
            children: [
                {
                    tagName: Header,
                    attrs: {
                        num
                    }
                },
                {
                    tagName: 'div',
                    attrs: {
                        className: 'content'
                    },
                    children: 'content'
                },
                {
                    tagName: 'button',
                    attrs: {
                        className: 'button',
                        onClick: this.onClick
                    },
                    children: 'change app state'
                }
            ]
        }
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instance: 'header'
        }
    }

    componentWillMount() {
        console.log('header componentWillMount');
    }

    componentDidMount() {
        console.log('header componentDidMount');
    }

    componentWillReceiveProps(newProps) {
        console.log('header componentWillReceiveProps', newProps);
    }

    shouldComponentUpdate() {
        console.log('header shouldComponentUpdate');
        return true;
    }

    componentWillUpdate() {
        console.log('header componentWillUpdate');
    }

    componentDidUpdate() {
        console.log('header componentDidUpdate');
    }

    render() {
        const { num } = this.props;
        const { instance } = this.state;
        return {
            tagName: 'div',
            attrs: {
                className: 'header'
            },
            children: [
                {
                    tagName: 'div',
                    attrs: {
                        className: 'header_content'
                    },
                    children: `${instance} get props from parent ${num}`
                }
            ]
        }
    }
}


// const vnode = {
//     tagName: 'div',
//     attrs: {
//         className: 'layout',
//         style: {
//             width: '500px',
//             height: '500px',
//             boxShadow: '0 0 10px 0 rgba(0,0,0,0.3)'
//         },
//         onClick: function () {
//             console.log('click layout');
//         }
//     },
//     children: [
//         {
//             tagName: 'h1',
//             attrs: {
//                 style: 'color:red;font-size:100px;'
//             },
//             children: 'this is h1',
//         },
//         {
//             tagName: 'function',
//             attr: {
//                 msg: 'hh'
//             },
//             children: [

//             ]
//         },
//         {
//             tagName: 'ul',
//             attrs: {
//                 className: 'list_wrap',
//                 style: {
//                     listStyle: 'none'
//                 }
//             },
//             children: [
//                 {
//                     tagName: 'li',
//                     attrs: {
//                         className: 'item'
//                     },
//                     children: 'item 1'
//                 },
//                 {
//                     tagName: 'li',
//                     attrs: {
//                         className: 'item'
//                     },
//                     children: 'item 2'
//                 }
//             ],
//         },
//     ]
// }

const vnode = {
    tagName: App
}

ReactDom.render(
    vnode,
    document.getElementById('app')
)