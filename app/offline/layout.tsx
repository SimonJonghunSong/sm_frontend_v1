import Navbar from "@/components/navbar/Navbar";

export default function OfflinePageLayout({ children }) {
  return (
    <div className="mainWrap">
      <Navbar />
      <section>
        <div className="pageWrap">{children}</div>
      </section>
    </div>
  );
}
