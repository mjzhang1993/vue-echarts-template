// 节流方法

export default function throttle(fn, interval) {
   const self = fn; // 保存需要被延迟执行的函数的引用
   let timer = null;
   let firstTime = true; // 是否第一次调用

   return function(...args) {
      /* eslint-disable no-new */
      const me = this;

      if (firstTime) {
         // 如果是第一次，不需要延迟执行
         self.apply(me, args);
         return (firstTime = false);
      }

      if (timer) {
         // 如果定时器还在说明前一次延迟执行还没有完成
         return false;
      }

      timer = setTimeout(function() {
         clearTimeout(timer);
         timer = null;
         self.apply(me, args);
      }, interval || 500);
   };
}
