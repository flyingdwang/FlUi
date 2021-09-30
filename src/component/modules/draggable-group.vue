<template>
    <div id="fl-draggable-group" @drop.prevent="groupingDrop($event)" data-type="grouping-drop" @dragover.prevent=" ev => ev.preventDefault() ">
        <template v-for="(item,key,index) in selecteds">
            <div class="draggable-main" v-if="item.length" :key="index">
                <div class="group-label" v-if="isShowGroupLabel">
                    组合{{index+1}}
                </div>
                <div class="draggable-group">
                    <div class="draggable-item" v-for="(v,i) in item" :key="i"
                        draggable="true" 
                        @dragstart="itemDragStart(v,$event,key)"
                        @dragend="dragEnd"
                    >{{ typeof v == "object" ? v.label : v }}
                        <div
                            class="bl-top"
                            @dragover.prevent="overItem('top',key,v,i,$event)"
                            @drop.prevent="dropItem('top',key,v,i,$event)"
                        ></div>
                        <div
                            class="bl-bottom"
                            @dragover.prevent="overItem('bottom',key,v,i,$event)"
                            @drop.prevent="dropItem('bottom',key,v,i,$event)"
                        ></div>
                        <div class="close-btn" v-if="clearable" @click="item.splice(i,1)">×</div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>

/** 拖拽组件 - 可分组 */
const NAME = 'FlDraggableGroup';
export default {
    name:NAME,
    props:{
        value:{
            type:Object,
            required:true,
        },
        isGrouping:{
            type:Boolean,
            default:false,
        },
        width:{
            default:'400px',
        },
        visible:{
            type:Boolean,
            default:false,
        },
        isShowGroupLabel:{
            default:false,
        },
        clearable:{
            default:false,
        }
    },
    data(){
        return {
            selecteds:{},
        }
    },
    watch:{
        value(v){
            this.selecteds = v;
        }
    },
    created(){
        this.selecteds = this.value;
    },
    methods:{
        changeItem(){
            const { selecteds } = this;
            let data = {};
            Object.keys(selecteds).forEach(v=>{
                if(selecteds[v].length){
                    data[v] = selecteds[v]
                }
            })
            this.$emit('input',data);
            this.$emit('change',data);
        },
        close(){
            this.$emit('close');
            this.selecteds = this.value;
            this.changeItem();
        },
        _getDropId(dir, item, index,key) {
            let oldOverItem = this._overOldItem;
            // 获取抓起的项目的Id
            let startId = this.selecteds[this._$event.key].findIndex(
                e => e.label === this._dragStartItem.label
            );
            // 当前要放下的id
            let dropId = index;
            if (dir == "bottom") {
                dropId++;
            }
            /** 判断是否当前组操作 */
            if(this._$event.key == key){
                // 因为拿起的项目大于后面项目，所以要相应的减去一个
                if (dropId > startId) {
                    dropId--;
                }
            }
            return { dropId, startId, oldOverItem };
        },
        overItem(dir, key, v, index, event) {
            let { dropId, startId } = this._getDropId(dir, v, index,key);
            let oldOverItem = this._overOldItem;
            if (dropId === startId) {
                this._overOldItem &&
                    this._overOldItem.classList.remove("in-hover");
            } else if (oldOverItem != event.target) {
                event.target && event.target.classList.add("in-hover");

                oldOverItem && oldOverItem.classList.remove("in-hover");

                this._overOldItem = event.target;
            }
        },
        dropItem(dir, key, v, index, event){
            let { dropId, startId } = this._getDropId(dir, v, index,key);

            this._overOldItem && this._overOldItem.classList.remove("in-hover");

            
            /** 是否当前组操作 */
            if(this._$event.key == key){
                if (dropId === startId) {
                    // 拖拽给原来的定位就算了
                    return;
                }
                // 将旧位置删除，添加到新位置
                let selecteds = JSON.parse(JSON.stringify(this.selecteds));
                let [target] = selecteds[key].splice(startId, 1);
                selecteds[key].splice(dropId, 0, target);
                this.selecteds = selecteds;
                return
            }

            /** 否则 */
            {
                // 将旧位置删除，添加到新位置
                let selecteds = JSON.parse(JSON.stringify(this.selecteds));
                let [ item ] = selecteds[this._$event.key].splice(startId, 1);
                selecteds[key].splice(dropId, 0, item);
                this.selecteds = selecteds;
            }

            this.changeItem();
        },
        /** 进行分组 */
        groupingDrop(event){
            const { type } = event.target.dataset;
            if(type != 'grouping-drop'|| !this.isGrouping )  return ;
            const sid = Date.now();
            let { dropId, startId } = this._getDropId('top', null , 0 , sid );
            let [ item ] = this.selecteds[this._$event.key].splice(startId, 1);
            Object.assign(this.selecteds,{[sid]:[item]})
            this.changeItem();
        },
        itemDragStart(item, e,key) {
            this._$event = { key, item,  event:e };
            this._dragStartItem = item;
            this._dragStartEle = e.target;
            this._dragStartEle.classList.add("drag-start");
        },
        dragEnd() {
            this._overOldItem && this._overOldItem.classList.remove("in-hover");
            this._dragStartEle &&
                this._dragStartEle.classList.remove("drag-start");
        },
    },
}
</script>

<style lang="scss" scoped>
    #draggable-dialog /deep/ {
        .el-dialog__body{
            padding: 0;
            width: 100%;
        }
        .el-dialog__footer{
            padding-top: 0;
        }
    }
    #fl-draggable-group{
        width: 100%;
        height: auto;
        padding: 20px;
        overflow-y: auto;
        max-height: 600px;
        box-sizing: border-box;
    }
    .draggable-main {
        display: flex;
        align-items: center;
        border: 1px solid #eee;
        padding: 5px;
        border-radius: 4px;
        margin-bottom: 10px;
        .group-label{
            width: 66px;
        }
        .draggable-group{
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            .draggable-item {
                display: flex;
                position: relative;
                padding-left: 25px;
                margin-bottom: 10px;
                font-size: 14px;
                cursor: move;
                height: 40px;
                background: #f8f9fd;
                align-items: center;
                &:hover .close-btn {
                    display: flex;
                }
                &.drag-start {
                    animation: hover_line_indrag_anime ease-in-out 3s infinite;
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
                &:last-child{
                    margin-bottom:0;
                }
                .bl-top,
                .bl-bottom {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 50%;
                    &.in-hover {
                        &:before {
                            display: block;
                            position: absolute;
                            left: 0;
                            top: -6px;
                            width: 100%;
                            height: 2px;
                            background-color: #fb4747;
                            content: "";
                            animation: hover_line_anime linear 1s infinite alternate;
                        }
                    }
                }
                .bl-bottom {
                    top: 50%;
                    &.in-hover {
                        &:before {
                            top: auto;
                            bottom: -6px;
                            background-color: #fb4747;
                        }
                    }
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
    @keyframes hover_line_indrag_anime {
        0%,
        100% {
            opacity: 1;
            transform: translate(0, 0);
        }

        25% {
            transform: translate(0, 3px);
            opacity: 0.5;
        }
        75% {
            transform: translate(0, -3px);
            opacity: 0.5;
        }
        50% {
            opacity: 1;
        }
    }
</style>