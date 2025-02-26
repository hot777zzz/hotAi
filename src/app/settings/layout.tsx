import ChatLayout from "../chat/layout";

export default function SettingsLayout({
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
