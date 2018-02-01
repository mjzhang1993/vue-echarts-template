/*
   日期格式化
*/
class FmDate {
   constructor(date) {
      this.date = +date ? new Date(+date) : new Date();
      this.dateMap = {};
      this.timeMap = {};
      this.W = null;
      this.init();
   }
   init() {
      this.dateMap = {
         Y: this.date.getFullYear(),
         M: this.date.getMonth() + 1,
         D: this.date.getDate()
      };
      this.timeMap = {
         h: this.date.getHours(),
         m: this.date.getMinutes(),
         s: this.date.getSeconds()
      };
      this.W = this.date.getDay();
   }
   formate(template) {
      if (!template) {
         return `${Object.values(this.dateMap).join('.')} ${Object.values(this.timeMap).join(':')}`;
      }
      const regs = this.regTest();

      Object.keys(regs.duble).forEach(attr => {
         template = template.replace(attr, regs.duble[attr]());
      });
      Object.keys(regs.single).forEach(attr => {
         template = template.replace(attr, regs.single[attr]());
      });
      return template;
   }
   regTest() {
      return {
         single: {
            YYYY: () => this.dateMap.Y,
            M: () => this.dateMap.M,
            D: () => this.dateMap.D,
            h: () => this.timeMap.h,
            m: () => this.timeMap.m,
            s: () => this.timeMap.s,
            W: () => this.W
         },
         duble: {
            MM: () => this.addToDecade(this.dateMap.M),
            DD: () => this.addToDecade(this.dateMap.D),
            hh: () => this.addToDecade(this.timeMap.h),
            mm: () => this.addToDecade(this.timeMap.m),
            ss: () => this.addToDecade(this.timeMap.s),
            WW: () => this.changeWeekToChinese(this.W)
         }
      };
   }
   changeWeekToChinese(week) {
      const map = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

      return map[week];
   }
   // 十位 + 0
   addToDecade(num) {
      return num < 10 ? `0${num}` : num;
   }
}

export default FmDate;
