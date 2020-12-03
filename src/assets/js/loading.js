import { Loading } from 'element-ui';
 
let loadingCount = 0;
let loading;
 
const startLoading = (mes) => {
  loading = Loading.service({
    lock: true,
    text: mes!=''?mes:'正在加载中，请稍等...',//可以自定义文字
    spinner:'el-icon-loading',//自定义加载图标类名
    background: 'rgba(0, 0, 0, 0.7)'//遮罩层背景色
  });
};
 
const endLoading = () => {
  loading.close();
};
 
export const showLoading = (mes) => {
  if (loadingCount === 0) {
    startLoading(mes);
  }
  loadingCount += 1;
};
 
export const hideLoading = () => {
  if (loadingCount <= 0) {
    return;
  }
  loadingCount -= 1;
  if (loadingCount === 0) {
    endLoading();
  }
}