import { ReactNodeViewRenderer } from "@tiptap/react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import CodeBlockNodeView from "./NodeView";

import lowlight from "lowlight";

console.log(lowlight);

const CodeBlockExtended = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockNodeView);
  },
}).configure({ lowlight });

export default CodeBlockExtended;
