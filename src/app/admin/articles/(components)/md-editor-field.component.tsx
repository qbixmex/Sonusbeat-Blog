"use client";

import { FC } from "react";
import MdEditor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import "./markdown-styles.css";
import uploadContentImage from "../(actions)/upload-content-image.action";

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
      renderHTML={text => <ReactMarkdown>{text}</ReactMarkdown>}
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
