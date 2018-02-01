// 方便测试，暂时没用 vuex 接入数据
import { get } from './request';

export function getLine() {
   return get('/line').then(res => res.data);
}

export function getData(path) {
   return get(path).then(res => res.data);
}
