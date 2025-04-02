"use client";

import { memo } from "react";
// 注意：需要安装以下依赖
// pnpm add react-markdown rehype-highlight rehype-raw remark-gfm
// 以下导入将在安装依赖后生效
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

// 用memo优化MarkdownContent组件，避免不必要的重渲染
export const MarkdownContent = memo(({ content }: { content: string }) => {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          pre: ({ children, ...props }) => (
            <pre
              className="bg-gray-800 rounded-md p-3 my-2 overflow-x-auto text-gray-200"
              {...props}
            >
              {children}
            </pre>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            return (
              <code
                className={match ? `language-${match[1]} text-sm` : "text-sm"}
                {...props}
              >
                {children}
              </code>
            );
          },
          p: ({ children, ...props }) => (
            <p className="mb-2" {...props}>
              {children}
            </p>
          ),
          h1: ({ children, ...props }) => (
            <h1 className="text-2xl font-bold mb-3 mt-6" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-xl font-bold mb-2 mt-5" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-lg font-bold mb-2 mt-4" {...props}>
              {children}
            </h3>
          ),
          ul: ({ children, ...props }) => (
            <ul className="list-disc ml-6 mb-3" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal ml-6 mb-3" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="mb-1" {...props}>
              {children}
            </li>
          ),
          a: ({ children, ...props }) => (
            <a
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-gray-300 pl-3 py-1 my-2 text-gray-700 dark:text-gray-300"
              {...props}
            >
              {children}
            </blockquote>
          ),
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-3">
              <table className="border-collapse table-auto w-full" {...props}>
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th
              className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className="border border-gray-300 dark:border-gray-700 px-4 py-2"
              {...props}
            >
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});
MarkdownContent.displayName = "MarkdownContent";
