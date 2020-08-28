import hoc from '@/utils/hoc';
import { FormItem, Input } from 'element-ui';

const HocFormItem = hoc(FormItem);
const HocInput = hoc(Input);

console.log(FormItem)

const KFormItem = {
  mounted() {},
  inheritAttrs: false,

  components: { HocFormItem, HocInput },

  render() {
    // console.log(this.$attrs)
    return (<div>
      <HocFormItem props={ this.$attrs }>
        <hoc-input props={ this.$attrs } />;
      </HocFormItem>
    </div>);
  }
};

export default KFormItem;
