import axios from 'axios'

async function getSourceMap(url: string){
  const res = await axios.get(url);
  return res
}

async function findCodeBySourceMap(stackFrame:any){
  // 获取map
  const sourceMap = await getSourceMap(stackFrame.fileName + ".map");
  const fileContent= stackFrame.data;
  // 解析map
  const sourceMapConsumer = new sourceMap.SourceMapConsumer(fileContent);
  // 通过报错位置查找对应的源文件的名称和行数
  const originalPosition = sourceMapConsumer.originalPositionFor({
    line: stackFrame.line,
    column: stackFrame.column || 0,
  });
  // 通过sourceContentFor获取对应的源文件
  const code = sourceMapConsumer.sourceContentFor(originalPosition.source);
  console.log("还原之后的代码", code);
  
}

export {
  findCodeBySourceMap
}