<template>
  <div class="slide_wrapper">
    <div class="slide_back" :style="{'background-image': 'linear-gradient('+bbc+')',height: height + 'px', width: width + 'px'}">
      <span class="slide_back_text min">{{min}}</span>
      <span class="slide_back_text max">{{max}}</span>
    </div>
    <div v-if="isShowMin" :style="minStyle"  @mousedown="dargStart"  class="slide-track slide-top">
      <span class="glyphicon glyphicon-triangle-left top"></span>
      <div v-if="isShowTip && isShowTop" class="track_tip_text">{{minVal}}</div>
    </div>
    <div v-if="isShowMax" :style="maxStyle"  @mousedown="dargStart" class="slide-track slide-bot">
      <span class="glyphicon glyphicon-triangle-left bot"></span>
      <div v-if="isShowTip && isShowBot" class="track_tip_text">{{maxVal}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      boxBackColor: {   // 背景渐变色
        type: String,
        default: '#ff0000,#008000',   // 16进制颜色码组成的字符串
      },
      height: {   // 高度
        type:Number,
        default: 300,
      },
      width: {   // 宽度
        type:Number,
        default: 10,
      },
      min:{         // 最小值
        type: Number,
        default: 50
      },
      max:{         // 最大值
        type: Number,
        default: 300
      },
      isGetNewVal:{  // 是否实时获取新数据
        type: Boolean,
        default: true
      },
      isShowTip: {  // 三角滑块的数值提示
        type: Boolean,
        default: true
      },
      isShowMax: {  //上三角滑块是否显示
        type: Boolean,
        default: true,
      },
      isShowMin: {  //下三角滑块是否显示
        type: Boolean,
        default: true,
      }
    },
    data(){
      return {
          bbc: '',// 背景盒子渐变颜色
          minVal: 0,  // 最小值
          maxVal: 300, // 最大值
          backColor: [],  // 所有颜色值
          minStyle: {  // 上面滑块样式
            top: '0px',
            left: '10px',
            color: '#ff0000',
            zIndex: 1000
          },
          maxStyle: { //下面滑块样式
            top: '300px',
            left: '10px',
            color: '#008000',
            zIndex: 1000
          },
          isMin: '',  // 是否是最小值的滑块
          isShowTop: false,  // 是否显示上面的滑块
          isShowBot: false, // 是否显示下面的滑块
      }
    },
    mounted(){
      this.bbc = this.boxBackColor;
      this.minVal = this.min;
      this.maxVal = this.max;
      this.maxStyle.top = this.height + 'px';
      this.maxStyle.left = this.minStyle.left = this.width + 'px';
        //  要根据顶点值和底处值计算当前所在值以及背景颜色变换
        //  300 渐变box的高度  建议拆分成的颜色数量和高度一致
        // 数据量比较大时，计算每移动1px时所在位置的数据
        // this.boxBackColor = '#ff0000, #008000, #ffffff, #000000';
        this.backColor = this.getColors(this.bbc, this.height, 300);

    },
    methods:{
        getColors(colors, height, step){
          // colors 渐变的16进制颜色组字符串， '#000000，#111111'   height:渐变模快的高度固定为300
          const colorsArr = colors.split(',');
          const allColors = [];
          const _allColors = [];
          // 获取颜色时会生成一个数组allColors, 他的长度是渐变颜色的数量减一
          const colorsNum = Math.floor(step / (colorsArr.length-1));
          // 相邻连个颜色值之间需要生成的颜色码数量 不一定为整 ，会有余数，
          const mod = step % (colorsArr.length-1);
          // 数组allColors二维数组中后面几个数组添加一个本数组中最后一个颜色码（比如生成300个颜色码，但数值是从0-300，实际上有301个颜色值）
          const noMod = colorsArr.length-1 - mod;
          let _colors = [];
          for(let i = 0; i < colorsArr.length-1; i++){
            _colors = this.gradient(colorsArr[i],colorsArr[i+1], colorsNum);
            if(i+1 > noMod){
              _colors = [..._colors,_colors[_colors.length-1]]
            }
            allColors.push(..._colors)

          }
          // 补充颜色码
          // for(let j = 0; j < allColors.length; j++){
          //   if(j+1 > noMod){
          //     allColors[j] = [...allColors[j],allColors[allColors[j].length-1]]
          //   }
          //   _allColors.push(...allColors[j])
          // }
          const colorsObj = {
            allColors: [...allColors, colorsArr[colorsArr.length-1]],    // 在颜色数组中添加最后一个颜色值
            interval: step/height
          }
          return colorsObj
        },
        rgbToHex(r, g, b){
          // rgb 转16进制
          let hex = ((r<<16) | (g<<8) | b).toString(16);
          let color = "#" + new Array(Math.abs(hex.length-7)).join("0") + hex;
          return color;
        },

        // hex to rgb
        hexToRgb(hex){
          // 16进制转换成rgb
          let rgb = [];
          for(let i=1; i<7; i+=2){
              rgb.push(parseInt("0x" + hex.slice(i,i+2)));
          }
          return rgb;
        },

        // 计算渐变过渡色 /
        gradient (startColor,endColor,step){
          // 将 hex 转换为rgb
          let sColor = this.hexToRgb(startColor);
          let eColor = this.hexToRgb(endColor);
          // 计算R\G\B每一步的差值
          let r = (eColor[0] - sColor[0]) / step;
          let g = (eColor[1] - sColor[1]) / step;
          let b = (eColor[2] - sColor[2]) / step;
          let gradientColorArr = [];
          for(let i=0;i<step;i++){
            // 將rgb颜色值转换成16进制（不转换也可以）
            let color = this.rgbToHex(parseInt(r*i+sColor[0]),parseInt(g*i+sColor[1]),parseInt(b*i+sColor[2]))
            // 计算每一步的hex值
            gradientColorArr.push(color);
          }
          return gradientColorArr;
        },
        dargStart(e){
          e.preventDefault();
          if(e.target.className.indexOf('top') > -1){
            this.isMin = true;
            this.isShowTop = true;
          }else {
            this.isMin = false;
            this.isShowBot = true;
          }
          window.addEventListener('mousemove', this.drag);
          window.addEventListener('mouseup', this.dragEnd)
        },
        drag(e){
          e.preventDefault();
          let _this = this;
          let isMin = _this.isMin;
          let h = this.height;
          let y, ey , style , val;
          y = e.pageY - 50;
          let bc = _this.backColor;
          let max = _this.max - _this.min;
          ey = y <= 0 ? 0 : y >= h ? h : y;
          val = Math.round((ey / h) * max + _this.min);
          style = {
              color: bc.allColors[Math.floor(ey*Number(bc.interval))],
              top: ey + 'px',
              left: _this.width + 'px',
              zIndex: 1001
            };
          if(isMin){
            _this.minVal = val;
            _this.minStyle = style;
            _this.maxStyle.zIndex = 1000;
            _this.isShowTop = true;
          }else {
            _this.maxVal = val;
            _this.maxStyle = style;
            _this.minStyle.zIndex = 1000;
            _this.isShowBot = true;
          }
          // 向父组件传递最大值和最小值
          if(_this.isGetNewVal){
            _this.$emit('getDiffVal', {minVal: _this.minVal, maxVal: _this.maxVal})
          }
        },
        dragEnd(e){
          e.preventDefault();
          window.removeEventListener('mousemove', this.drag);
          window.removeEventListener('mouseup', this.dragEnd);
          this.isShowTop = false;
          this.isShowBot = false;
          // 向父组件传递最大值和最小值
          if(!this.isGetNewVal){
            this.$emit('getDiffVal', {minVal: this.minVal, maxVal: this.maxVal})
          }
        },
    },
    beforeDestroy(){

    },
    watch:{
      width(val,old){
        this.maxStyle.left = this.minStyle.left = val + 'px';
      },
      height(val,old){
        this.maxStyle.top = val + 'px';
      }
    }
  }
</script>

<style scoped>
.slide_wrapper {
  position: absolute;
  top: 30px;
  left: 30px;
  height: 320px;
  width: 40px;
  /* border: 1px solid blue; */
  /* background-color: ; */
}

.slide_back {
  position: absolute;
  height: 300px;
  width: 10px;
  left: 0;
  top: 12px;

}

.slide-track {
  position: absolute;
  left: 10px;
  font-size:20px;
  cursor: pointer;
}
.slide-top{
  top: 0;
  z-index: 1000;
}
.slide-bot {
  top:300px;
  z-index: 1000;

}

.slide_back_text{
  display: inline-block;
  position: absolute;
  left: 0;
  color: #fff;
}

.slide_back_text.min {
  top: -30px;
}

.slide_back_text.max {
  bottom: -30px;
}

.track_tip_text {
  width: 40px;
  position: absolute;
  top: -2px;
  right: -40px;
  text-align: center;
  border-radius: 2px;
  background-color: #ccc;
}
</style>
