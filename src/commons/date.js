/**
 * 选择时间段
 * @param {*} type
 */
const selectTimeSlot = (type) => {
  let t, t1 = new Date();
  t.setHours(0);
  t.setMinutes(0);
  t.setSeconds(0);
  type = Number(type);

  switch (type) {
    case 1: // 今日   // 可去掉
      // t.getTime();
      break;
    case 2: // 本周
      t.setDate(t.getDate() - t.getDay() + 1);
      break;
    case 3: // 本月
      t.setDate(1);
      break;
    case 4: // 最近10分钟
      t = t1.setMinutes(t1.getMinutes() - 10);
      break;
    case 5: // 最近30分钟
      t = t1.setMinutes(t1.getMinutes() - 30);
      break;
    case 6: // 最近1小时
      t = t1.setHours(t1.getHours() - 1);
      break;
    case 7: // 最近3小时
      t = t1.setHours(t1.getHours() - 3);
      break;
    case 8: // 最近6小时
      t = t1.setHours(t1.getHours() - 6);
      break;
    case 9: // 最近12小时
      t = t1.setHours(t1.getHours() - 12);
      break;
    case 10: // 最近24小时
      t = t1.setDate(t1.getDate() - 1);
      break;
    case 11: // 最近3天
      t = t1.setDate(t1.getDate() - 3);
      break;
    case 12: // 最近一周
      t = t1.setDate(t1.getDate() - 7);
      break;
    case 13:// 最近一个月
      t = t1.setMonth(t1.getMonth() - 1);
      break;
    case 14: // 最近三个月
      t = t1.setMonth(t1.getMonth() - 3);
      break;
    case 15:// 最近六个月
      t = t1.setMonth(t1.getMonth() - 6);
      break;
    case 16://最近一年
      t = t1.setFullYear(t1.getFullYear() - 1);
      break;
    case 17: // 今年
      t.setMonth(0);
      t.setDate(1);
      break;
    case 18: // 自定义
      // 自定义可选控制字段为true
      break;
  }

  return {
    type: type,
    start: t,
    end: new Date().getTime()
  }
  // this.params.startTime = t;
  // this.params.endTime = new Date().getTime();
  // this.params.type = type;
}

/**
 * 时间格式转换
 * @param {*} t 时间戳
 * @param {*} type 显示的事件格式类型
 * @param {*} isZeroFill 是否补零
 */
const timeFormat = (t,type, isZeroFill = true) => {
  switch(String(t.length)){
    case 10:
      t = t * 1000;
      break;
    case 16:
      t = parseInt(t / 1000);
      break;
    default:
  };
  if (!t) {
      return '--'
  }
  let date = new Date(Number(t));
  let Y = date.getFullYear();
  let M = date.getMonth() + 1;
  let D = date.getDate();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  if(isZeroFill){
    M = M < 10 ? '0' + M : M;
    D = D < 10 ? '0' + D : D;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
  }
  return `${Y}-${M}-${D} ${h}:${m}:${s}`
}
