const path = require('path');
const { resolvePkg } = require('./../utils/index');

module.exports = class Service{
  constructor(context, { plugins, pkg, inlineOptions, useBuiltIn } = {}) {
    process.VUE_CLI_SERVICE = this
    this.initialized = false
    this.context = context;
    this.inlineOptions = inlineOptions

    this.webpackChainFns = []; // 每一项 chain able webpack 配置函数
    this.webpackRawConfigFns = [];
    this.devServerConfigFns = []

    this.commands = {}
    this.pkgContext = context
    this.pkg = this.resolvePkg(pkg);

    this.plugins = this.resolvePlugins(plugins, useBuiltIn);
    this.pluginsToSkip = new Set()
    this.modes = this.plugins.reduce((modes, { apply: { defaultModes }}) => {
      return Object.assign(modes, defaultModes)
    }, {})

  }

  resolvePkg(inlinePck, context = this.context) {
    if(inlinePck) return inlinePck;
    const pkg = resolvePkg(context);
    if(pkg.vuePlugins && pkg.vuePlugins.resolveFrom) {
      this.pkgContext = path.resolve(context, pkg.vuePlugins.resolveFrom)
      return this.resolvePkg(null, this.pkgContext);
    }

    return pkg;
  }

  init(mode = process.env.VUE_CLI_MODE) {
    if(this.initialized) return;
    this.initialized = true;

  }

  resolvePlugins(inLinePlugins, useBuiltIn) {
    // 加载插件
    const idToPlugin = id => ({
      id: id.replace(/^.\//, 'built-in:'),
      apply: require(id)
    })

    let plugins

    const builtPlugins = [
      './commands/serve',
      './commands/help'
    ].map(idToPlugin);

    if(inLinePlugins) {
      plugins = useBuiltIn !== false ? builtPlugins.concat(inLinePlugins) : inLinePlugins;
    } else {
      // 项目插件
      // const projectPlugins = Object.keys(this.pkg.devDe)
      plugins = builtPlugins;
    }

    return plugins

  }

  async run(name, args = {}, rawArgv = []) {
    let command = this.commonds[name];
    if(!command && !name) {
      console.log('----------------------quit');
      process.exit(1)
    }
    return Promise.resolve();
  }
}
