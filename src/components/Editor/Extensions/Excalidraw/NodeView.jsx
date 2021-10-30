import { NodeViewWrapper } from "@tiptap/react";
import Excalidraw from "@excalidraw/excalidraw";
import { css } from "@emotion/css";

const containerStyles = css`
  height: 400px;
`;

const ExcalidrawNodeView = ({ editor }) => {
  return (
    <NodeViewWrapper className="Excalidraw">
      <div className={containerStyles}>
        <Excalidraw
          //   ref={excalidrawRef}
          //   initialData={{ elements }}
          viewModeEnabled={!editor.isEditable}
          //   onChange={onChange}
        />
      </div>
    </NodeViewWrapper>
  );
};
export default ExcalidrawNodeView;
