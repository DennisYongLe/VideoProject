// public/hash.js
self.importScripts("/spark-md5.min.js"); // 导入脚本
// 生成文件 hash
self.onmessage = (e) => {
  const { fileChunkList } = e.data;
  const spark = new self.SparkMD5.ArrayBuffer();
  let percentage = 0; // 用来记录转换进度
  let count = 0; // 用来记录读取到了第几个切片
  const loadNext = (index) => {
    // 新建读取器
    const reader = new FileReader();
    // 设定读取数据格式并开始读取
    reader.readAsArrayBuffer(fileChunkList[index].file);
    // 监听读取完成
    reader.onload = (e) => {
      count++;
      // 获取读取结果并交给spark计算hash
      spark.append(e.target.result);
      if (count === fileChunkList.length) {
        self.postMessage({
          percentage: 100,
          // 获取最终hash
          hash: spark.end(),
        });
        self.close();
      } else {
        percentage += 100 / fileChunkList.length;
        self.postMessage({
          percentage,
        });
        // 递归计算下一个切片
        loadNext(count);
      }
    };
  };
  loadNext(0);
};
