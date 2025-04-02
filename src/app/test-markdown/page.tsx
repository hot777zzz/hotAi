"use client";

import React, { useState } from "react";
import { MarkdownContent } from "@/components/chat/markdown-content";

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

export default function MarkdownTestPage() {
  const [markdown, setMarkdown] = useState(markdownExample);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Markdown 渲染测试</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">输入Markdown</h2>
          <textarea
            className="w-full h-[600px] p-2 border border-gray-300 rounded-md"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">预览</h2>
          <div className="border border-gray-300 rounded-md p-4 h-[600px] overflow-auto bg-gray-100 dark:bg-gray-800">
            <MarkdownContent content={markdown} />
          </div>
        </div>
      </div>
    </div>
  );
}
