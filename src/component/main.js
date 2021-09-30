/**
 *  
 * version 0.0.1
 * dete 2020-07-26
 *  author : flyingd
 */ 

/** 级联选择器 */
import FlCascader from './modules/cascader.vue';
FlCascader.install = Vue => Vue.component(FlCascader.name,FlCascader)

/** 多选与单选tab按钮组合 */
import FlCheckboxRadioGroup from "./modules/checkbox-radio-group.vue";
FlCheckboxRadioGroup.install = Vue => Vue.component(FlCheckboxRadioGroup.name,FlCheckboxRadioGroup)

/** 拖拽组件 - 可分组 */
import FlDraggableGroup from "./modules/draggable-group.vue";
FlDraggableGroup.install = Vue => Vue.component(FlDraggableGroup.name,FlDraggableGroup)

/** 穿梭框 - 可多组 */
import FlTransferGroup from "./modules/transfer-group.vue";
FlTransferGroup.install = Vue => Vue.component(FlTransferGroup.name,FlTransferGroup)

/** 路由tab栏 */
import FlRouterTaps from "./modules/router-taps.vue";
FlRouterTaps.install = Vue => Vue.component(FlRouterTaps.name,FlRouterTaps)



let FlUi = {
    FlCascader,
    FlCheckboxRadioGroup,
    FlDraggableGroup,
    FlTransferGroup,
    FlRouterTaps,
}

 export  {
    FlCascader,
    FlCheckboxRadioGroup,
    FlDraggableGroup,
    FlTransferGroup,
    FlRouterTaps,
}


const install = function (Vue, opts = {}) {
    Object.keys(FlUi).forEach(key => {
        const component = FlUi[key];
        Vue.component(component.name, component)
    })
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default  { 
    version: '0.0.1',
    install,
    ...FlUi
 }
