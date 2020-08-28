import { on, off } from '@/utils/dom';
import { throttle } from '@/utils/utils';

const lazy = (el) => {

  // 加载图片
  const showImg = (cb) => {
    const img = new Image();
    img.src = el.dataSrc;
    img.onload = () => {
      el.src = el.dataSrc;
      cb();
    }
  }

  if(typeof IntersectionObserver === 'function') {
    const observe = new IntersectionObserver(entries => {
      entries.forEach(item => {
        if(item.isIntersecting) {
          showImg(() => {
            observe.unobserve(el);
          })
        }
      })
    })
    observe.observe(el)
  } else {
    const listener = throttle(200, () => {
      const h = document.documentElement.clientHeight;
      const e_h = el.getBoundingClientRect().top;
      if(e_h < h) {
        showImg(() => {
          off(document, 'scroll', listener);
        });
      }
    }, false);
    on(document, 'scroll', listener);
    listener();
  }
}


export default {
  name: 'BaseLazy',
  inserted(el, binding) {
    el.dataSrc = binding.value;
    lazy(el);
  }
}
