import Vue from 'vue';
import SvgIcon from './SvgIcon/index.js';

const components = [
  SvgIcon
];

const install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}

install(Vue);
