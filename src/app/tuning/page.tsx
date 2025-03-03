"use client";

export default function TuningPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">AI 调优</h1>
      <div className="grid gap-6">
        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-4">模型参数</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                模型(Model)
              </label>
              <select className="w-full rounded-md border px-3 py-2">
                <option value="gpt-4o">GPT-4o</option>
                <option value="deepseek-r1">Deepseek R1</option>
                <option value="claude-3-5-sonnet">Claude3.5-sonnet</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-4">
            全局系统提示词(Global System Prompt)
          </h2>
          <textarea
            className="w-full min-h-[200px] rounded-md border px-3 py-2"
            placeholder="输入系统提示词..."
            defaultValue=""
          />
        </div>
      </div>
    </div>
  );
}
