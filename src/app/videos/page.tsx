import { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false, },
};

const VideosPage = () => {
  return (
    <div className="container mx-auto px-5 lg:px-0 py-10">
      <p>Videos Page</p>
    </div>
  );
};

export default VideosPage;
