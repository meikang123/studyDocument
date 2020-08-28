import Vue from 'vue';
import BaseLazy from './lazy/lazy';
import BaseWaves from './waves/waves';

const directives = [
  BaseLazy,
  BaseWaves
];

directives.forEach(item => {
  Vue.directive(item.name, item);
})
