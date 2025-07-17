"use client";

import { FC } from "react";
import MdEditor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import "./markdown-styles.css";

type Props = Readonly<{
  value: string;
  setContent: (value: string) => void;
}>;

export const MdEditorField: FC<Props> = ({ value, setContent }) => {
  return (
    <MdEditor
      className="md-editor"
      value={value}
      style={{ minHeight: 400 }}
      renderHTML={text => <ReactMarkdown>{text}</ReactMarkdown>}
      onChange={({ text }) => setContent(text)}
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
