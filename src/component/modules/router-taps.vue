<template>
    <div class="fl-router-taps">
        <div class="taps-btn-next" @click="upper" :class="{'is-disabled': transfLeft == 0 }"> <span class="iconfont icon-youjiantou" style="transform: rotate(180deg);" ></span> </div>
        <div class="taps-body" ref="taps-body">
            <div class="taps-main" ref="taps-main" :style="{ transform:`translateX( ${transfLeft}px)` }">
                <div class="taps-btn" v-if="showHome" @click="$router.push(homePath)" :class="{ 'is-active': homePath == $route.path }">首页</div>
                <div class="taps-btn" v-for="(item, index) in options" @click="$emit('change',item)" :class="{ 'is-active': item.path == $route.path }" :key="index">{{item.title}} <span class="iconfont icon-guanbi icon-close" @click="clickDeletes(item.path)"></span></div>
            </div>
        </div>
        <div class="taps-right">
            <span class="taps-btn-next iconfont icon-youjiantou" @click="next" :class="{'is-disabled': nextDisabled }"></span>
            <dropdown @command="handleCommand" >
                <span class="el-dropdown-link">
                    <i class="dropdown-btn-icon taps-btn-next el-icon-arrow-down iconfont icon-xiajiantou"></i>
                </span>
                <dropdown-menu slot="dropdown">
                    <dropdown-item command="other"> <i class="iconfont icon-guanbi" style="font-size:13px"></i> 关闭其他</dropdown-item>
                    <dropdown-item command="right"> <i class="iconfont icon-zhixiangyou"></i> 关闭右侧</dropdown-item>
                    <dropdown-item command="left"> <i class="iconfont icon-zhixiangzuo"></i> 关闭左侧</dropdown-item>
                    <dropdown-item command="whole"> <i class="iconfont icon-guanbi1"></i> 关闭全部</dropdown-item>
                </dropdown-menu>
            </dropdown>
            
        </div>
    </div>
</template>

<script>

/** 路由标签 */
const NAME = "FlRouterTaps";
import { Dropdown, DropdownMenu, DropdownItem } from "element-ui"; 
export default {
    name:NAME,
    components:{ Dropdown, DropdownMenu, DropdownItem },
    props:{
        options:{
            type:Array,
            default:Array,
        },
        homePath:{
            type:String,
            default:'/'
        },
        prohibitData:{
            type:Array,
            default:Array,
        },
        showHome:{
            type:Boolean,
            default:true,
        }
    },
    data(){
        return {
            transfLeft:0,
        }
    },
    computed:{
        nextDisabled(){
            if(this.$refs["taps-body"]){
                const parentW = this.$refs["taps-body"].offsetWidth;
                const mainW =  document.querySelector('.taps-main').offsetWidth; 
                if(mainW - parentW > - this.transfLeft) return false;
                return true;
            }else return true;
        },
    },
    watch:{
        $route(to,from){
            this.setRouterTaps(to);
        }
    },
    created(){
        this.setRouterTaps(this.$route,true);
    },
    methods:{
        handleCommand(value){
            let data = [], index = null ;
            const { path } = this.$route;
            
            switch(value){
                case "other" : 
                    data = this.options.filter( ev => ev.path == path );
                    break;
                case "right" :
                    index = this.options.findIndex(ev => ev.path == path);
                    data = this.options.filter( (ev,ind) => ind <= index );
                    break;
                case "left"  :
                    index = this.options.findIndex(ev => ev.path == path);
                    data = this.options.filter( (ev,ind) => ind >= index );
                    break;
                case "whole" :
                    break;
            }
            // this.$store.commit("SET_ROUTERTAPS",data);
            this.$emit('update:options',data)
        },
        upper(){
            let parentW = this.$refs["taps-body"].offsetWidth;
            if(this.transfLeft < 0){
                const v = parseInt(this.transfLeft  +  parentW - 127);
                if( v < 0  ){
                    this.transfLeft = v;
                }else {
                    this.transfLeft = 0;
                }
            }
        },
        next(){
            const parentW = this.$refs["taps-body"].offsetWidth;
            const mainW =  document.querySelector('.taps-main').offsetWidth; 
            if(mainW - parentW > - this.transfLeft){
                const v = parseInt( - this.transfLeft  +  parentW - 127);
                if( v <  mainW - parentW){
                    this.transfLeft = -v;
                }else{
                    this.transfLeft = -(mainW - parentW);
                }
            }
        },
        setRouterTaps(route,isInit = false){
            const { path } = route; 
            let prohibit = this.prohibitData.concat(["/404",this.homePath,]).filter(ev => ( ev.path || ev ) );
            if(!prohibit.includes(path)){
                const { title } = route.meta;
                const selected = this.options.filter(ev => ev.path == path );
                if(!selected.length){
                    let data = this.options.concat({ path, title });
                    // this.$store.commit("SET_ROUTERTAPS",data)
                    this.$emit('update:options',data)
                }
            }
            if(isInit) return;
            
            let parentW = this.$refs["taps-body"].offsetWidth;
            setTimeout(()=>{
                const event = document.querySelector('.taps-main>.is-active');
                let Left = parentW - (event.offsetLeft + event.offsetWidth);
                if((event.offsetLeft + event.offsetWidth) > parentW){
                    if(this.transfLeft > Left){
                        this.transfLeft = Left;
                    }
                }
                else if(event.offsetLeft + event.offsetWidth - (parentW + this.transfLeft) > 10){
                    Left = event.offsetLeft;
                    this.transfLeft = -Left;
                }

            },0)
        },
        clickDeletes(path){
            let data = this.options.filter(ev => ev.path != path );
            this.$emit('update:options',data)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '/src/assets/iconfont/iconfont.css' ;
@import '~element-ui/lib/theme-chalk/index.css';
    .fl-router-taps{
        width :100%;
        height: 40px;
        position: absolute;
        top:0;
        left:0;
        display: flex;
        box-shadow: 0 1px 3px #eee;
        transition: left .3s ease-in-out;
        background-color :rgba(255,255,255,.3);
        box-sizing : border-box;
        .taps-body{
            flex: 1;
            overflow: hidden;
            .taps-main{
                height: 100%;
                white-space: nowrap;
                position: relative;
                transition: transform .3s;
                float: left;
                z-index: 2;
                .taps-btn{
                    display : inline-block;
                    text-align :center;
                    line-height: 40px;
                    &:hover{
                        background-color: #c6e2ff;
                        &:before{
                            background-color: #53a8ff;
                        }
                    }
                    &:before {
                        content: "";
                        width: 9px;
                        height: 9px;
                        margin-right: 8px;
                        display: inline-block;
                        background-color: #ddd;
                        border-radius: 50%;
                        transition: background-color .2s;
                        
                    }
                    &.is-active{
                        color: #409eff;
                        background-color: #c6e2ff;
                        &:before{
                            background-color: #53a8ff;
                        }
                    }
                }
                .icon-close{
                    border-radius: 50%;
                    text-align: center;
                    transition: all .3s cubic-bezier(.645,.045,.355,1);
                    margin-left: 5px;
                    line-height :14px;
                    width :14px;
                    height :14px;
                    font-size: 12px;
                    &:before{
                        // vertical-align middle;
                    }
                    &:hover{
                        color: #fff;
                        background-color: #ff4d4f;
                    }
                }
            }
        }
        .taps-btn,.taps-btn-next{
            padding: 0 15px;
            display: flex;
            align-items: center;
            border-right: 1px solid #eee;
            height: 40px;
            cursor: pointer;
        }
        .taps-btn-next{
            width: 40px;
            box-sizing: border-box;
            padding: 0;
            justify-content: center;
            &.is-disabled{
                cursor: not-allowed;
            }
        }
        .taps-right{
            display : flex;
            border-left: 1px solid #f4f4f4;
            .dropdown-btn-icon{
                border: none;
                margin: 0;
                font-size: 21px;
            }
        }

    }
</style>
