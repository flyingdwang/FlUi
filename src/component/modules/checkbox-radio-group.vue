<template>
    <div id="fl-checkbox-radio-group">
        <div class="checkbox-radio-main">
            <label v-if="name" :style="{width:`${width}px`}"> {{name}} </label>
            <div class="select-group">
                <template v-for="(item, index) in configData">
                    <div  :key="index" @click="(disabled || item.disabled) ? null : selected(item)" class="button-inner" :class="{ 'is-checked': addClass(item), 'is-disabled': (disabled || item.disabled) }">
                        {{ typeof item == "object" ? item[selectedLabel] : item }}
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
/** 多选与单选tab按钮组合 */
const NAME = 'FlCheckboxRadioGroup';
export default {
    name:NAME,
    props:{
        type:{
            type:String,
           required:true, 
        },
        name:{
            type:String,
            default:'', 
        },
        data:{
            type:[Array,Object],
            required:true, 
        },
        plusData:{
            type:Array,
            default:Array,
        },
        selectedValue:{
            type:String,
            default:'value',
        },
        selectedLabel:{
            type:String,
            default:'label',
        },
        value:{
            // required:true,
            default:'',
        },
        width:{
            default:68
        },
        disabled:{
            default:false,
        }

    },
    data(){
        return {
            configData:[],
        }
    },
    watch:{
        data(){
            this.init();
        }
    },
    created(){
        this.init();
    },

    methods:{
        init(){
            let { data,plusData } = this;
            if(!Array.isArray(data) && typeof data == "object" ){
                let datas = [];
                for (const key in data) {
                    const label = data[key];
                    datas.push({label,value:key})
                }
                this.configData = plusData.concat(datas);
                return ;
            }
            this.configData = plusData.concat(data);
        },
        selected(item){
            let value = typeof item == "object" ? item[this.selectedValue] : item ;
            
            const is = typeof this.value == 'string' ;

            if(this.type == 'radio'){
                // if(this.value == value){
                //     this.$emit('input','');
                //     return ;
                // }
                this.$emit('input',value);
                this.$emit('change',value);
            }
            else if(this.type == 'checkbox'){
                if(value){
                    let selected = [].concat(this.value);
                    const index = this.value.indexOf(value) ;
                    if(index < 0){
                        selected.push(value);
                    }else{
                        selected.splice(index,1);
                    }
                    this.$emit('input',selected);
                    this.$emit('change',selected);

                    return ;
                }
                this.$emit('input',[]);
                this.$emit('change',[]);

            }
        },
        addClass(item){
            let value = typeof item == "object" ? item[this.selectedValue] : item ;
            if(this.value == value){
                return true;
            }
           
           if(this.value.indexOf(value) > -1 && Array.isArray(this.value) ){
               return true;
           }

           return false;
        }
    }
}
</script>

<style lang="scss" scoped>
    #fl-checkbox-radio-group{
        display: block;
        .checkbox-radio-main{
            display: flex;
            align-items: center;
            label{
                font-weight: bold;
                padding-right:15px ;
                min-width: 68px;
                box-sizing: border-box;
                text-align:center;
            }
        }
        .is-disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }
    }
    .select-group{
        display: flex;
    }
    .button-inner{
        line-height: 1;
        font-weight: 500;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        border-left: 0;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
        padding: 10px 20px;
        font-size: 14px;
        border-radius: 0;
        &:last-child{
            border-radius: 0 4px 4px 0;
        }
        &:first-child{
            border-left: 1px solid #dcdfe6;
            border-radius: 4px 0 0 4px;
            box-shadow: none!important;
        }
        &.is-checked{
            &:first-child{
                border-left-color: #409eff;
            }
            color: #fff;
            background-color: #409eff;
            border-color: #409eff;
            box-shadow: -1px 0 0 0 #8cc5ff;
        }
    }
    
</style>