import ChatLayout from "../chat/layout";

export default function TuningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatLayout>
      <div className="min-h-screen">{children}</div>
    </ChatLayout>
  );
}
