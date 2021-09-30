##  基于vue功能组件

[查看GitHub仓库最新文档(源码)](https://github.com/flyingdwang/flyingd-ui.git)

` https://github.com/flyingdwang/flyingd-ui.git`

### 安装

` cnpm install flyingd-ui -S ` 

### 快速使用

```  js
import Vue from 'vue'
import FlUi from 'flyingd-ui';

Vue.use(FlUi);

// or
import {
  FlCascader,
  FlTransferGroup
  // ...
} from 'flyingd-ui'

Vue.component(FlCascader.name, FlCascader)
Vue.component(FlTransferGroup.name, FlTransferGroup)

```

### 组件

#### 1. FlCascader 级联选择器(移动端)

#### 2. FlCheckboxRadioGroup 多选与单选tab按钮组合

####  3. FlDraggableGroup 拖拽组件--多组

####  4. FlTransferGroup  穿梭框 - 多组

####  5. FlRouterTaps  路由tab栏



###  一. FlCascader 参数说明 :

| 参数                | 说明                                    | 类型    | 默认值   |
| ------------------- | --------------------------------------- | ------- | -------- |
| visible             | 是否显示 cascader                       | boolean | false    |
| options             | 可选项数据源，键名可通过 props 属性配置 | array   | -        |
| value / v-model     | 选中项绑定值                            | array   | -        |
| cascadervalue       | 指定选项的值为选项对象的某个属性值      | string  | value    |
| cascaderlabel       | 指定选项标签为选项对象的某个属性值      | string  | label    |
| cascaderchildren    | 指定选项的子选项为选项对象的某个属性值  | string  | children |
| disabled            | 指定选项的禁用为选项对象的某个属性值    | Boolean | false    |
| popper-class        | 自定义浮层类名                          | string  | -        |
| cascaderPlaceholder | 占位文本                                | array   | -        |

### props

| 参数     | 说明       | 类型    | 默认值 |
| -------- | ---------- | ------- | ------ |
| value    | 对象属性值 | string  | -      |
| label    | 对象属性值 | string  | -      |
| children | 子选项     | Array   | -      |
| disabled | 是否禁用   | Boolean | -      |

### Events

| 事件名称 | 说明                                           | 回调参数 |
| -------- | ---------------------------------------------- | -------- |
| change   | 当绑定值变化时触发的事件 ==>  function(option) | 所有值   |
| close    | 关闭弹窗回调                                   |          |

### 二. FlCheckboxRadioGroup 参数说明

| 参数            | 说明                                    | 类型         | 可选值           | 默认值 |
| --------------- | --------------------------------------- | ------------ | ---------------- | ------ |
| value / v-model | 选中项绑定值                            | -            | -                | -      |
| type            | 类型                                    | String       | radio / checkbox | -      |
| name            | 名称                                    | String       | -                | -      |
| data            | 可选项数据源，键名可通过 props 属性配置 | Array,Object | -                | -      |
| plusData        | 在data数据前面加入参数                  | Array        | -                | -      |
| selectedValue   | 指定选项的值为选项对象的某个属性值      | String       | -                | value  |
| selectedLabel   | 指定选项标签为选项对象的某个属性值      | String       | -                | label  |
| width           | name名称 宽度                           | Number       | -                | 68     |
| disabled        | 是否禁用                                | Boolean      |                  | false  |

###  props

| 参数     | 说明       | 类型    | 默认值 |
| -------- | ---------- | ------- | ------ |
| value    | 对象属性值 | string  | -      |
| label    | 对象属性值 | string  | -      |
| disabled | 是否禁用   | Boolean | -      |

### Events

| 事件名称 | 说明                                           | 回调参数 |
| -------- | ---------------------------------------------- | -------- |
| change   | 当绑定值变化时触发的事件 ==>  function(option) | 所有值   |

###  三. FlDraggableGroup 参数说明

| 参数             | 说明             | 类型    | 默认值 |
| ---------------- | ---------------- | ------- | ------ |
| value / v-model  | 选中项绑定值     | Object  | -      |
| isGrouping       | 是否开启分组     | Boolean | false  |
| isShowGroupLabel | 是否显示分组序号 | Boolean | false  |
| clearable        | 是否可以清除选项 | Boolean | false  |
| width            | 宽度             | string  | 400px  |

### Events

| 事件名称 | 说明                                           | 回调参数 |
| -------- | ---------------------------------------------- | -------- |
| change   | 当绑定值变化时触发的事件 ==>  function(option) | 所有值   |

###  四. FlTransferGroup 参数说明

| 参数             | 说明                                    | 类型          | 默认值 |
| ---------------- | --------------------------------------- | ------------- | ------ |
| data             | 可选项数据源，键名可通过 props 属性配置 | Array,Object  | -      |
| :configData.sync | 穿梭组数据绑定                          | Object        | --     |
| name             | 名称                                    | String        | -      |
| selectedValue    | 指定选项的值为选项对象的某个属性值      | String        | value  |
| selectedLabel    | 指定选项标签为选项对象的某个属性值      | String        | label  |
| width            | 宽度                                    | String,Number | "650"  |
| height           | 高度                                    | String,Number | -      |
| disabled         | 是否禁用                                | Boolean       | -      |

### props

| 参数    | 说明       | 类型   | 默认值 |
| ------- | ---------- | ------ | ------ |
| value   | 对象绑定值 | Array  | -      |
| name    | 组名称     | string | -      |
| btnName | 按钮文字   | string | -      |

###  演示代码

```html
<template>
	<fl-transfer-group :data="audienceOption" :configData.sync="crowd" name="可选人群包" 	selectedValue="label"></fl-transfer-group>
</template>
```

```js
<script>
  export default {
    data() {
      return {
          audienceOption:[ {label:'测试数据1', disabled:true },{label:'测试数据2'},					{label:'测试数据3'} ],
          crowd:{
              customAudience:{
                  name:'定向人群',
                  btnName:'添加定向人群',
                  value:["测试数据2"],
              },
              excludedCustomAudience:{
                  name:'排除人群',
                  btnName:'添加排除人群',
                  value:[],
              },
          },

      }
    }
  }
</script>
```

### 五. FlRouterTaps 参数说明

| 参数                      | 说明                                    | 类型    | 默认值     |
| ------------------------- | --------------------------------------- | ------- | ---------- |
| :options.sync="routeTaps" | 可选项数据源，键名可通过 props 属性配置 | array   | -          |
| prohibitData              | 禁用数据                                | array   | [ "/404" ] |
| homePath                  | 首页路径                                | String  | "/"        |
| showHome                  | 是否显示首页标签                        | Boolean | true       |

### Events

| 事件名称 | 说明                                           | 回调参数 |
| -------- | ---------------------------------------------- | -------- |
| change   | 当绑定值变化时触发的事件 ==>  function(option) | 所有值   |