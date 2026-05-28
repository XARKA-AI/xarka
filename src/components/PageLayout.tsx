import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => (
  <>
    <Navbar />
    <main className="pt-16">{children}</main>
    <Footer />
  </>
);

export default PageLayout;
