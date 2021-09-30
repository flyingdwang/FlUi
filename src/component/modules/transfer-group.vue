<template>
    <div id="fl-transfer">
        <div class="transfer-main" :style="{width:`${width}px`,height:`${height}px`}">
            <div class="transfer-panel">
                <div class="transfer-panel-header"><span>{{name}}</span> <span @click="disabled ? null : selectAll()" class="checkbox" 
                :class="{'is-checked':(selectedData.length + disabledNum) == optionData.length,'is-disabled':disabled}
                ">全选</span></div>
                <div class="transfer-panel-body">
                    <div class="checkbox-group">
                        <template v-for="(item, index) in optionData">
                            <div  :key="index" @click="(disabled || item.disabled) ? null : selected(item)" class="transfer-panel-item" :class="{ 'is-checked': addClass(item), 'is-disabled':disabled || item.disabled }">
                                <span class="checkbox-inner"></span>
                                <span class="checkbox-label text1">{{ typeof item == "object" ? item[selectedLabel] : item }}</span>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="transfer-selected-panel">
                <div class="selected-group" v-for="(item,key, index) in configData" :key="index">
                    <div class="button-wrap">
                        <div @click="selectedData.length ? clickMove(key) : null" class="button-primary" :class="{'is-disabled': !selectedData.length  }"> <span>{{item.btnName}}</span> <i class="iconfont icon-youjiantou"></i> </div>
                    </div>
                    <div class="transfer-panel">
                        <div class="transfer-panel-header"><span>{{item.name}}</span> <span @click="disabled ? null : deleteAll(key)" class="checkbox" :class="{ 'is-disabled':disabled }">清空</span></div>
                        <div class="transfer-panel-body">
                            <div class="checkbox-group">
                                <template v-for="(item, index) in data">
                                    <div :key="index"  class="transfer-panel-item" v-if="selectedItemShow(key,item)">
                                        <span class="checkbox-label text1">{{ typeof item == "object" ? item[selectedLabel] : item }}</span>
                                        <div class="close-btn" @click="clickRemove(key,item)">×</div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/** 穿梭框 */
const NAME = 'FlTransferGroup';
export default {
    name:NAME,
    props:{
        data:{
            type:[Array,Object],
            required:true,
        },
        configData:{
            type:Object,
            required:true,
        },
        name:{
            default:'',
        },
        width:{
            default:"650",
        },
        height:{
            default:"",
        },
        selectedValue:{
            type:String,
            default:'value',
        },
        selectedLabel:{
            type:String,
            default:'label',
        },
        disabled:{
            default:false,
        }
    },
    data(){
        return {
            optionData:[],
            selectedData:[],
            disabledNum:0,
        }
    },
    watch:{
        data(){
            this.init();
        },
        selectedData(v){
            // console.log(v);
        }
    },
    created(){
        this.init();
    },
    methods:{
        selectAll(){
            let is = (this.selectedData.length + this.disabledNum) == this.optionData.length;
            if(is){
                this.selectedData = [];
                return ;
            }

            this.selectedData = this.optionData.filter(item => {
                if((typeof item == "object" && !item.disabled)){
                    return true;
                }else if(typeof item != "object"){
                    return true
                }
            }).map(ev => typeof ev == "object" ? ev[this.selectedValue] : ev );
        },
        /** 分组中的清空按钮 */
        deleteAll(type){
            let removeData = [];
            const value = this.configData[type].value.map(String);
            for (const iterator of this.datas) {
                if(value.indexOf(iterator[this.selectedValue] || iterator)>-1){
                    removeData.push(iterator);
                }
            }
            this.optionData = this.optionData.concat(removeData);
            this.configData[type].value = [];

        },
        /** 去掉某一个 */
        clickRemove(type,item){
            this.configData[type].value = this.configData[type].value.filter(event => event != ( item[this.selectedValue] || item ) );
            this.optionData = this.optionData.concat(item);
        },
        /** 移动 */
        clickMove(type){
            let selected =  [];
            let optionData = [];
            for (const item of this.optionData) {
                let value = typeof item == "object" ? item[this.selectedValue] : item ;
                const index = this.selectedData.indexOf(value) ;
                if(index>-1){
                     selected.push(value);
                }
                else {
                    optionData.push(item);
                }
            }
            this.configData[type].value = this.configData[type].value.concat(selected);
            this.optionData = optionData;
            this.selectedData = [];
        },
        init(){
            let { data } = this;
            let datas = [];
            /** 处理可用数组 */
            if(!Array.isArray(data) && typeof data == "object" ){
                for (const key in data) {
                    const label = data[key];
                    datas.push({label,value:key})
                }
            }else{
                datas = data;
            }
            this.datas = datas;
            /** 取出所有选中参数 */
            let selected = [];
            for (const key in this.configData) {
                const value = this.configData[key].value ;
                selected.push(...value.map(String));
            }

            let optionData = [];
            for (const iterator of datas) {
                const v = iterator[this.selectedValue] || iterator;
                if(selected.indexOf(v) < 0 ){
                    optionData.push(iterator);
                }
            }


            this.optionData = optionData;

            this.disabledNum = (optionData.filter(ev => typeof ev == 'object' && ev.disabled )).length;

            this.selectedData = [];


        },
        selected(item){
            let value = typeof item == "object" ? item[this.selectedValue] : item ;
            if(value){
                let selected = [].concat(this.selectedData);
                const index = this.selectedData.indexOf(value) ;
                if(index < 0){
                    selected.push(value);
                }else{
                    selected.splice(index,1);
                }
                this.selectedData = selected;
            }
        },
        addClass(item){
            let value = typeof item == "object" ? item[this.selectedValue] : item ;
            if(this.selectedData == value){
                return true;
            }
           
           if(this.selectedData.map(String).indexOf(value) > -1 && Array.isArray(this.selectedData) ){
               return true;
           }

           return false;
        },
        selectedItemShow(type,item){
            let value = typeof item == "object" ? item[this.selectedValue] : item ;
            let configData = this.configData[type].value.map(String);
            if(configData == value){
                return true;
            }
            if(configData.indexOf(value) > -1 && Array.isArray(configData) ){
               return true;
           }
           return false;
        },
    }
}
</script>

<style lang="scss" scoped>
    #fl-transfer{
        .transfer-main{
            display: flex;
            height: auto;
            min-height: 300px;
        }
        .button-primary{
            display: flex;
            align-items: center;
            background: linear-gradient(
            95deg, #0089ff, #2b3eff);
            border: none;
            border-radius: 40px;
            color: #FFFFFF;
            padding: 8px 12px;
            font-size: 13px;
            cursor: pointer;
            width: 80px;
        }
        .is-disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }

    }

    .transfer-panel{
        border: 1px solid #ebeef5;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        display: inline-block;
        vertical-align: middle;
        width: 230px;
        max-height: 100%;
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-flow: column;
        .transfer-panel-header{
            height: 40px;
            line-height: 40px;
            background: #f5f7fa;
            margin: 0;
            padding-left: 15px;
            padding-right: 5px;
            border-bottom: 1px solid #ebeef5;
            box-sizing: border-box;
            color: #000;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .checkbox{
                border: 1px solid #b3d8ff;
                border-radius: 4px;
                height: 25px;
                line-height: 25px;
                width: 38px;
                text-align: center;
                z-index: 2;
                position: relative;
                font-size: 12px;
                cursor: pointer;
                &.is-checked{
                    background-color: #409eff;
                    border-color: #409eff;
                    color: #fff;
                }
                &:hover{
                    background-color: #409eff;
                    border-color: #409eff;
                    color: #fff;
                }
            }
        }
        .transfer-panel-body{
            flex: 1;
            .checkbox-group{
                margin: 0;
                padding: 6px 0;
                list-style: none;
                height: 100%;
                overflow: auto;
                box-sizing: border-box;
                max-height: 460px;
            }
            .transfer-panel-item{
                color: #606266;
                height: 30px;
                line-height: 30px;
                padding-left: 15px;
                display: block!important;
                cursor: pointer;
                font-size: 14px;
                position: relative;
                &:hover .close-btn {
                    display: flex;
                }
                &.is-checked{
                    .checkbox-inner{
                        background-color: #409eff;
                        border-color: #409eff;
                        &:after{
                            transform: rotate(45deg) scaleY(1);
                        }
                    }
                    .checkbox-label{
                        color: #409eff;
                    }
                }
                .checkbox-inner{
                    height: 14px;
                    width: 14px;
                    border-radius: 3px;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    display: inline-block;
                    border: 1px solid #dcdfe6;
                    background-color: #fff;
                    z-index: 1;
                    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
                    &:after {
                        box-sizing: content-box;
                        content: "";
                        border: 1px solid #fff;
                        border-left: 0;
                        border-top: 0;
                        height: 7px;
                        left: 4px;
                        position: absolute;
                        top: 1px;
                        transform: rotate( 45deg) scaleY(0);
                        width: 3px;
                        transition: transform .15s ease-in .05s;
                        transform-origin: center;
                    }
                }
                .checkbox-label{
                    padding-left: 24px;
                    padding-right: 10px;
                }
            }
        }
    }
    .transfer-selected-panel{
        display: flex;
        flex-flow: column;
        .selected-group{
            width: 100%;
            display: flex;
            margin-bottom: 20px;
            min-height: 200px;
            max-height: 290px;
            &:first-child{
                flex: 1;
            }
            &:last-child{
                margin-bottom: 0;
            }
            .button-wrap{
                width: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .transfer-panel-body{
                overflow: hidden;
            }
            .checkbox-group{
                padding: 6px 10px;
                max-height: 100%;
            }
            .transfer-panel-item{
                // background: #f8f9fd;
                color: #409eff;
                cursor: inherit;
                .checkbox-label{
                    padding-left: 10px;
                }
                &:before {
                        position: absolute;
                        left: 7px;
                        top: 50%;
                        transform: translateY(-50%);
                        display: block;
                        content: "";
                        margin-right: 8px;
                        width: 8px;
                        height: 8px;
                        background: linear-gradient(90deg, #62a3ff 0%, #6e7bff 100%);
                        border-radius: 2px;
                    }
            }
        }
    }

    .close-btn {
        // display: flex;
        display: none;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 10px;
        top: 10px;
        width: 20px;
        height: 20px;
        cursor: pointer;
        &:hover {
            background-color: #eee;
        }
    }
</style>