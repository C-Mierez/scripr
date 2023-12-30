import DashboardHeader from "./_components/DashboardHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}
