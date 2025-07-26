import { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false, },
};

const MusicPage = () => {
  return (
    <div className="container mx-auto px-5 lg:px-0 py-10">
      <p>Music Page</p>
    </div>
  );
};

export default MusicPage;
