"use client";

export default function Input({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
      {...props}
    />
  );
}
