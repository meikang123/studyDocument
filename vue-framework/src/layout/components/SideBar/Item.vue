<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    elIcon: {
      type: String,
      default: ''
    }
  },
  render(createElement, context) {
    const { icon, title, elIcon } = context.props;

    const vnodes = [];

    if (icon) {
      const svgIcon = createElement('svg-icon', {
        attrs: {
          'icon-class': icon
        }
      });
      vnodes.push(svgIcon);
    } else if (elIcon) {
      const elIconEL = createElement('i', {
        attrs: {
          class: elIcon
        }
      });
      vnodes.push(elIconEL);
    }

    if (title) {
      const itemTitle = createElement('span', {
        slot: 'title'
      }, title);

      vnodes.push(itemTitle);
    }

    return vnodes;
  }
};
</script>
