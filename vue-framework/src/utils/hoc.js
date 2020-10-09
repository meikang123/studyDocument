const hoc = (WrappedComponent) => {
  return {
    mounted() { },
    props: WrappedComponent.props,
    render(h) {
      const slots = Object.keys(this.$slots).reduce((arr, key) => arr.concat(this.$slots[key]), []).map(vnode => {
        vnode.context = this._self;
        return vnode;
      })

      console.log(this);

      return h(WrappedComponent, {
        on: this.$listeners,
        props: this.$props,
        attrs: this.$attrs
      }, slots)
    }
  }
}

export default hoc;
