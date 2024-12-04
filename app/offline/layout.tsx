import Navbar from "@/components/navbar/Navbar";

export default function OfflinePageLayout({ children }) {
  return (
    <div className="mainWrap">
      <Navbar />
      <section>
        <div style={{ height: "500px" }} className="pageWrap">
          {children}
        </div>
      </section>
    </div>
  );
}
