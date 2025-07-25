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

const mdParser = new MarkdownIt({
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
}).use(markdownItTable);

type Props = Readonly<{
  value: string;
  setContent: (value: string) => void;
  updateContentImage: (imageUrl: string) => void;
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
    if (!response?.imageURL) throw new Error("No image URL returned");
    updateContentImage(response.imageURL);
    return response.imageURL;
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
