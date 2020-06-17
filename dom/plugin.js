;(function(global) {
    let Vue, installed = false;

    const View = {
        name: 'RouterView',
        functional: true,
        props: {
            name: {
                type: String,
                default: 'default'
            }
        },
        render(_, { props, children, parent, data }) {
            data.routerView = true;
            const h = parent.$createElement;
            const name = props.name;
            const route = parent.$route;

            console.log(route);

            // const matched = route.matched

            return h('div', '123456');
        }
    }

    const Link = {
        name: 'RouterLink'
    }

    const createRouteMap = function(routes, oldPathMap, oldNameMap) {
        const pathMap = oldPathMap || {};
        const nameMap = oldNameMap || {};

        routes.forEach(route => {
            pathMap[route.path] = route.component;
            nameMap[route.name] = route.component;
        })

        return { pathMap, nameMap }
    }

    const createMatcher = function(routes, router) {
        const { pathMap, nameMap } = createRouteMap(routes);

        function match() {

        }

        function addRouters(routes) {
            createRouteMap(routes, pathMap, nameMap)
        }

        return { match, addRouters }
    }

    class VueRouter {
        constructor(options) {

            this.matcher = createMatcher(options.routes || [], this); // 生成匹配器

            let mode = options.mode || 'hash';
            this.mode = mode;
            switch(mode) {
                case 'history':
                    this.history = new HTML5History(this, options.base);
                    break;

                case 'hash':
                    this.history = new HashHistory(this, options.base);
                    break;

                default:
                    console.log(`错误的mode: ${mode}`);
            }
        }

        init(app) {

        }
    }

    class HTML5History { // history模式
        constructor() {
            this.current = '123';
        }
    }

    class HashHistory { // hash模式
        constructor() {
            this.current = '123';
        }
    }

    VueRouter.install = function(_vue) {
        if(installed && Vue === _vue) return;
        installed = true;
        Vue = _vue;

        const isDef = v => v !== undefined;

        Vue.mixin({
            beforeCreate() {
                console.log(this, 123);
                if(isDef(this.$options.router)) { // 根
                    this._routerRoot = this;
                    this._router = this.$options.router;
                    this._router.init(this);
                    Vue.util.defineReactive(this, '_route', this._router.history);
                } else {
                    this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
                }
            }
        })

        Object.defineProperty(Vue.prototype, '$router', {
            get () {
                return this._routerRoot._router
            }
        })

        Object.defineProperty(Vue.prototype, '$route', {
            get () {
                return this._routerRoot._route
            }
        })

        Vue.component('RouterView', View);
        Vue.component('RouterLink', Link);
    }

    global.VueRouter = VueRouter;

})(window)
