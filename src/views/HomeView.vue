<template>
  <div class="home" v-if="errorVisible">
    <pre>{{jsError.stack}}</pre>
    <ElCollapse v-model="activeNames">
      <ElCollapseItem v-for="(item, index) in jsError.stackFrames" :key="index" :name="index" :title="item.source">
        <ElRow :gutter="20">
          <ElCol :span="20">
            <div>{{ item.fileName }}</div>
          </ElCol>
          <ElCol :span="4">
            <ElButton type="primary" size="small" @click="handleDialog(item, index)">
              映射源码
            </ElButton>
          </ElCol>
          <el-row :gutter="20">
            <template v-if="item.origin">
              <PreView :orgin="item.origin"></PreView>
            </template>
            <template v-else>
              <div>{{ item.fileName }}</div>
            </template>
          </el-row>
        </ElRow>
      </ElCollapseItem>
    </ElCollapse>
    <ElDialog v-model="dialogVisible" title="sourcemap源码映射" width="500">
      <ElTabs v-model="activeTab" class="demo-tabs">
        <ElTabPane label="本地上传" name="local">
          <ElUpload drag :beforeUpload="uploadSourcemap">
            <i class="el-icon-upload"></i>
            <div>将sourcemap文件拖到此处，或<em>点击上传</em></div>
          </ElUpload>
        </ElTabPane>
        <ElTabPane label="远程加载" name="request">远程加载</ElTabPane>
      </ElTabs>
    </ElDialog>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import sourceMap from "source-map-js";
import { 
  ElMessage, 
  ElDialog, 
  ElTabs, 
  ElTabPane, 
  ElUpload, 
  ElCollapse, 
  ElCollapseItem,
  ElRow,
  ElCol
} from "element-plus";

import PreView from './PreView.vue';

const errorVisible = ref(false);
const jsError = ref<any>(null);
const dialogVisible = ref(false);
const activeTab = ref('local');
const activeNames = ref<string[]>(["1"]);

let stackFrameObj = {
  line: 0,
  column: 0,
  index: 0,
};

onMounted(()=>{
  try{
    const jsErrorList = localStorage.getItem('jsErrorList');
    console.log("jsErrorList",jsErrorList);
    
    if(jsErrorList){
      jsError.value = JSON.parse(jsErrorList);
      errorVisible.value = true
    }
  }catch(e){
    console.log("jsError",e);
  }
});

function handleDialog(item: any, index: number){
  dialogVisible.value = true;
  stackFrameObj = {
    line: item.lineNumber,
    column: item.columnNumber,
    index
  }
}

// 上传sourcemap文件
function uploadSourcemap(file: any){
  // 判断当前是否为map文件
  if(!file.name.endsWith('.map')){
    ElMessage.error("请上传sourcemap文件");
    return;
  };
  const reader = new FileReader();
  reader.readAsText(file, "utf-8");
  reader.onload = async (event) => {
    const { line, column } = stackFrameObj;
    const code = await getSource(event.target?.result, line, column);
    jsError.value.stack_frames[stackFrameObj.index].origin = code;
  }
}

// 根据sourcemap还原代码
async function getSource(sourcemap: any, line: number, column: number){
  try{
    const consumer = await new sourceMap.SourceMapConsumer(JSON.parse(sourcemap));
    // 通过报错位置查找对应的源文件的名称和行数
    const originalPosition = consumer.originalPositionFor({
      line,
      column
    });
    // 通过sourceContentFor获取对应的源文件
    const source = consumer.sourceContentFor(originalPosition.source);
    return {
      source,
      line: originalPosition.line,
      column: originalPosition.column
    }
  }catch(e){
    ElMessage.error(`代码还原失败，${e}`);
  }
}

</script>
<style lang="scss" scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>