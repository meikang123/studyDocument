/**
 * @description 递归查找最近的一个form
 * @param {*} parent
 */
const findParentForm = parent => {
  if (parent._vnode.tag === 'form') {
    return parent;
  }
  return findParentForm(parent.$parent);
};

const KFormItem = {
  parentForm: null,
  name: 'k-form-item',
  model: {
    prop: 'gtFormItemValue',
    event: 'change'
  },
  inheritAttrs: false,
  props: {
    gtFormItemValue: null,
    isDetail: {
      type: Boolean,
      default: undefined
    }
  },

  data() {
    return {
      itemValue: this.gtFormItemValue
    };
  },

  watch: {
    itemValue(value) {
      this.$emit('change', value);
    },
    gtFormItemValue(value) {
      this.itemValue = value;
    }
  },

  created() {
    this.parentForm = findParentForm(this.$parent);
  },

  render() {
    const {
      $attrs: {
        label, prop, rules, type, placeholder, 'item-style': itemStyle,
        'type-options': typeOptions = { clearable: true }
      }
    } = this;

    // 优先取item isDetail，如果没有取最近一个form的
    let { isDetail } = this;
    if (typeof isDetail === 'undefined') {
      isDetail = this.parentForm.$attrs['is-detail'];
    }
    const { style = {} } = typeOptions;

    const { show, edit, label: defaultLabel } = this.$slots;
    // 用case 解决嵌套过深问题

    const itemContent = () => {
      switch (type) {
        case 'input':
          return isDetail
            ? <div>{this.itemValue}</div>
            : <el-input
              v-model={this.itemValue}
              placeholder={placeholder}
              style={{ style }}
              {...{ attrs: { ...typeOptions } }}
            />;

        case 'select':
          const { itemValue } = this;
          const { defaultOptions = [] } = typeOptions;
          const showValue = defaultOptions.filter(option => {
            // 单选
            if (option.value === itemValue) {
              return true;
            }
            // 多选
            if (itemValue instanceof Array && itemValue.indexOf(option.value) !== -1) {
              return true;
            }
            return false;
          }).map(option => option.label);
          return isDetail
            ? (show || <div>{showValue.join(',')}</div>)
            : <gt-select
              v-model={this.itemValue}
              style={{ style }}
              placeholder={placeholder}
              {...{ attrs: { ...typeOptions } }}
            />;
        case 'tinymce':
          return isDetail
            ? (<span>fdsafds</span>)
            : <gt-tinymce
              v-model={this.itemValue}
              style={{ style }}
              placeholder={placeholder}
              {...{ attrs: { ...typeOptions } }}
            />;
        case 'custom':
          return isDetail
            ? show
            : edit;
        default:
          return <span>gt-form-item: type no exists</span>;
      }
    };
    return (
      <el-form-item prop={prop} rules={rules} style={ itemStyle }>
        {
          itemContent()
        }
        <template slot="label">{ label || defaultLabel }</template>
      </el-form-item>
    );
  }
};

export default KFormItem;
