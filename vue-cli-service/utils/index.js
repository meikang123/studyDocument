[
  'pkg'
].forEach(m => {
  Object.assign(exports, require(`./lib/${m}`));
})
