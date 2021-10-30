import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { wrapperStyles } from "./styles";

const CodeBlock = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
  editor,
}) => (
  <NodeViewWrapper className={wrapperStyles}>
    <select
      contentEditable={false}
      disabled={!editor.isEditable}
      defaultValue={defaultLanguage}
      onChange={(event) => {
        updateAttributes({ language: event.target.value });
      }}
    >
      <option value="null">auto</option>
      <option disabled>—</option>
      {extension.options.lowlight.listLanguages().map((lang, index) => (
        <option key={index} value={lang}>
          {lang}
        </option>
      ))}
    </select>
    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
);
export default CodeBlock;
