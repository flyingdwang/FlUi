<template>
  <div id="app">
        <fl-router-taps :options.sync="routeTaps" @change="routerTapsChange"></fl-router-taps>
        <div style="height:50px"></div>
        <div class="cascader-btn" @click="cascaderVisible=true" > 移动端vue组件-级联选择器 </div>
        <fl-cascader v-model="cascaderOption" :visible.sync="cascaderVisible" :options="options"    popper-class='flyingdwang-cascader'   @change="cascaderFun" 
        ></fl-cascader>
        <flCheckboxRadioGroup v-model="radios" type="checkbox" selectedValue="label" :data="[{label:'测试'},{label:'产品',disabled:true }, {label:'项目'} ]"> </flCheckboxRadioGroup>
        <flDraggableGroup v-model="draggable" @change="draggableChange" :clearable="true" > </flDraggableGroup>
        <fl-transfer-group :data="audienceOption" :configData.sync="custom.crowd" name="可选人群包" selectedValue="label"></fl-transfer-group>
  </div>
</template>

<script>
// import flCascader  from './component/modules/cascader.vue';
// import flCheckboxRadioGroup from "./component/modules/checkbox-radio-group.vue";
// import flDraggableGroup from "./component/modules/draggable-group.vue";
// import flTransfer from "./component/modules/transfer.vue";
// import routerTaps from "./component/modules/router-taps.vue";
// import { FlCascader } from '../dist/FlUi.min';
// console.log(FlCascader);
// import FlUi from "./component/main";
// console.log(FlUi);
export default {
  name: 'app',
  components:{
    // flCascader,
    // flCheckboxRadioGroup,
    // flDraggableGroup,
    // flTransfer,
    // routerTaps,
    // FlCascader
  },
  data () {
    return {
      options: [
          {
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致',
              disabled:true,
              }, {
              value: 'fankui',
              label: '反馈'
              }, {
              value: 'xiaolv',
              label: '效率'
              }, {
              value: 'kekong',
              label: '可控'
              }]
          }, {
              value: 'daohang',
              label: '导航',
              disabled:true,
              children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
              }, {
              value: 'dingbudaohang',
              label: '顶部导航'
              }]
          }]
          }, {
          value: 'zujian',
          label: '组件',
          children: [{
              value: 'basic',
              label: 'Basic',
              children: [{
              value: 'layout',
              label: 'Layout 布局'
              }, {
              value: 'color',
              label: 'Color 色彩'
              }, {
              value: 'typography',
              label: 'Typography 字体'
              }, {
              value: 'icon',
              label: 'Icon 图标'
              }, {
              value: 'button',
              label: 'Button 按钮'
              }]
          }, {
              value: 'form',
              label: 'Form',
              children: [{
              value: 'radio',
              label: 'Radio 单选框'
              }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
              }, {
              value: 'input',
              label: 'Input 输入框'
              }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
              }, {
              value: 'select',
              label: 'Select 选择器'
              }, {
                  value: 'cascader',
                  label: 'Cascader 级联选择器'
                    
              }, {
              value: 'switch',
              label: 'Switch 开关'
              }, {
              value: 'slider',
              label: 'Slider 滑块'
              }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
              }, {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器',
                  children: [{
                      value: 'axure',
                      label: 'Axure Components'
                  }, {
                      value: 'sketch',
                      label: 'Sketch Templates'
                  }, {
                      value: 'jiaohu',
                      label: '组件交互文档'
                  }]
              }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
              }, {
              value: 'upload',
              label: 'Upload 上传'
              }, {
              value: 'rate',
              label: 'Rate 评分'
              }, {
              value: 'form',
              label: 'Form 表单'
              }]
          }, {
              value: 'data',
              label: 'Data',
              children: [{
              value: 'table',
              label: 'Table 表格'
              }, {
              value: 'tag',
              label: 'Tag 标签'
              }, {
              value: 'progress',
              label: 'Progress 进度条'
              }, {
              value: 'tree',
              label: 'Tree 树形控件'
              }, {
              value: 'pagination',
              label: 'Pagination 分页'
              }, {
              value: 'badge',
              label: 'Badge 标记'
              }]
          }, {
              value: 'notice',
              label: 'Notice',
              children: [{
              value: 'alert',
              label: 'Alert 警告'
              }, {
              value: 'loading',
              label: 'Loading 加载'
              }, {
              value: 'message',
              label: 'Message 消息提示'
              }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
              }, {
              value: 'notification',
              label: 'Notification 通知'
              }]
          }, {
              value: 'navigation',
              label: 'Navigation',
              children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
              }, {
              value: 'tabs',
              label: 'Tabs 标签页'
              }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
              }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
              }, {
              value: 'steps',
              label: 'Steps 步骤条'
              }]
          }, {
              value: 'others',
              label: 'Others',
              children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
              }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
              }, {
              value: 'popover',
              label: 'Popover 弹出框'
              }, {
              value: 'card',
              label: 'Card 卡片'
              }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
              }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
              }]
          }]
          }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
              value: 'axure',
              label: 'Axure Components'
          }, {
              value: 'sketch',
              label: 'Sketch Templates'
          }, {
              value: 'jiaohu',
              label: '组件交互文档'
          }]
          }
      ],
      cascadervalue:'value',
      cascaderlabel:'label',
      cascaderchildren:'children',
      cascaderOption:['zujian'],
      cascaderPlaceholder:['选择功能','选择组件','请选择参数'],
      cascaderVisible:false,
      radios:'',
      draggable:{
        arr:[{label:'测试1'},{label:'测试2'},{label:'测试3'}],
        arr2:['会加大及','假大空','钾测定','绝对是卡']
      },
      audienceOption:[ {label:'哈哈哈', disabled:true },{label:'hihihihi'},{label:'呜呜呜呜哇哇哇'} ],
      custom:{
          crowd:{
              customAudience:{
                  name:'定向人群',
                  btnName:'添加定向人群',
                  value:["hihihihi"],
              },
              excludedCustomAudience:{
                  name:'排除人群',
                  btnName:'添加排除人群',
                  value:[],
              },
          },
      },
      routeTaps:[
        { path:'/hhajaj',title:'测试页的' },
        { path:'/esda',title:'非的第三' },
        { path:'/vdssa',title:'测试页才' },
      ],
    }
  },
  created(){
  },
  methods: {
    /** 公用文件 */
    // ...commonMain,
    cascaderFun:function (option){
      console.log(option,this.cascaderOption);
    },
    draggableChange(v){
      console.log('change=',v);
    },
    routerTapsChange(item){
      this.$router.push(item.path);
    },
  },
  watch:{
    draggable(v){
      console.log(v);
    },
    custom:{
      handler(v){
        console.log(v);
      },
      deep:true,
    },
    routeTaps(v){
      console.log(v);
    }
  }
}
</script>

<style>
/* html,
body {
  max-width: 700px;
  margin: 0 auto;
  min-width: 320px;
} */
* {
  box-sizing: border-box;
  font-family: 'PingFang-SC-Bold', 'Avenir', Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}
body * {
  font-size: 0.3rem;
}
.cascader-btn{
  width: 80%;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  line-height: 1;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  text-align: center;
  box-sizing: border-box;
  margin: .2rem auto ;
  -webkit-appearance: none;
  white-space: nowrap;
  outline: none;
  transition: .1s;
  font-weight: 500;
  padding: 0.24rem .4rem;
  border-radius: 0.08rem;
}
</style>
