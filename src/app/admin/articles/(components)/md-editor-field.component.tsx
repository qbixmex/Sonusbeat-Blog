"use client";

import { FC } from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import markdownItTable from "markdown-it-multimd-table";
import "react-markdown-editor-lite/lib/index.css";
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.min.css";
import "./markdown-styles.css";
import uploadContentImage from "../(actions)/upload-content-image.action";
import markdownItYoutube from "@/components/markdown-it-youtube";
import { ArticleImage } from "@/interfaces/article.interface";

const mdParser = new MarkdownIt({
  html: true, // Allows embedded HTML
  highlight: (str, lang) => {
    const languageClass = lang ? `language-${lang}` : '';
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre><code class="hljs ${languageClass}">` +
          hljs.highlight(str, { language: lang }).value
          + "</code></pre>";
      } catch (error) {
        console.error("Highlight.js error:", error);
      }
    }
    let output = "";
    output = `<pre><code class="hljs">` +
      mdParser.utils.escapeHtml(str) +
      "</code></pre>";
    return output;
  },
})
  .use(markdownItTable)
  .use(markdownItYoutube);

type Props = Readonly<{
  value: string;
  setContent: (value: string) => void;
  updateContentImage: (articleImage: ArticleImage) => void;
  articleId?: string;
}>;

export const MdEditorField: FC<Props> = ({
  value,
  setContent,
  updateContentImage,
  articleId
}) => {
  const handleImageUpload = async (file: File) => {
    const response = await uploadContentImage(file, articleId!);
    if (!response) throw new Error("No image URL returned");
    const { cloudinaryResponse } = response;
    updateContentImage({
      publicId: cloudinaryResponse.publicId,
      imageUrl: cloudinaryResponse.secureUrl,
    });
    return cloudinaryResponse.secureUrl;
  };

  return (
    <MdEditor
      className="md-editor"
      value={value}
      style={{ minHeight: 400 }}
      renderHTML={text => mdParser.render(text)}
      onChange={({ text }) => setContent(text)}
      onImageUpload={handleImageUpload}
      imageUrl="/images/sonusbeat-logo.png"
      config={{
        view: {
          menu: true,
          md: true,
          html: false,
        },
      }}
    />
  );
};

export default MdEditorField;
