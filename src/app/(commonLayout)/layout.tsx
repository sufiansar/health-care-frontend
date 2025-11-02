import Footer from "@/components/modules/Footer/Footer";
import PublicNavbar from "@/components/modules/shared/PublicNavbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PublicNavbar />
      <main className="min-h-dvh">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
