import { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false, },
};

const NewsPage = () => {
  return (
    <div className="container mx-auto px-5 lg:px-0 py-10">
      <p>News Page</p>
    </div>
  );
};

export default NewsPage;
