// 测试用的Markdown示例内容
const markdownExample = `
# Markdown 支持测试

这是一个段落，包含 **粗体** 和 *斜体* 文本。

## 代码块测试

\`\`\`javascript
// 这是一个JavaScript代码块
function hello() {
  console.log("Hello, World!");
  return 42;
}
\`\`\`

## 列表测试

无序列表:
- 项目 1
- 项目 2
  - 嵌套项目 2.1
  - 嵌套项目 2.2

有序列表:
1. 第一项
2. 第二项
3. 第三项

## 表格测试

| 名称 | 年龄 | 职业 |
|------|------|------|
| 张三 | 25   | 工程师 |
| 李四 | 30   | 设计师 |

## 引用测试

> 这是一个引用块
> 可以有多行

## 链接和图片

[这是一个链接](https://example.com)

![这是一个图片描述](https://via.placeholder.com/150)

## 任务列表

- [x] 已完成任务
- [ ] 未完成任务

---

这是一个水平线上的内容。
`;

// 将示例Markdown内容复制到剪贴板
async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(markdownExample);
    console.log("Markdown示例已复制到剪贴板");
  } catch (err) {
    console.error("无法复制到剪贴板:", err);
  }
}

// 在浏览器控制台中运行此函数
// copyToClipboard();

// 使用方法:
// 1. 在浏览器控制台中加载此脚本
// 2. 调用 copyToClipboard() 函数
// 3. 粘贴内容到聊天框进行测试

console.log(
  "Markdown测试脚本已加载。调用copyToClipboard()函数以复制示例内容。"
);

// 导出示例供其他地方使用
module.exports = { markdownExample };
