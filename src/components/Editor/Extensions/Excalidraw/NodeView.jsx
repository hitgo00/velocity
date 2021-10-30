import React, { useCallback, useEffect } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import Excalidraw from "@excalidraw/excalidraw";
import { css } from "@emotion/css";
import debounce from "lodash/debounce";
import isEqual from "lodash/isEqual";

const containerStyles = css`
  height: 400px;
`;

const ExcalidrawNodeView = ({ editor, node, updateAttributes }) => {
  const { elements } = node.attrs;
  const excalidrawRef = React.useRef(null);

  const setElements = useCallback(
    (elements) => {
      updateAttributes({ elements });
    },
    [updateAttributes]
  );

  const onChange = debounce((_elements, _appState) => {
    const sceneElements = excalidrawRef.current.getSceneElements();

    if (sceneElements) setElements(sceneElements);
  }, 300);

  useEffect(() => {
    if (excalidrawRef.current) {
      const sceneElements = excalidrawRef.current.getSceneElements();
      const appState = excalidrawRef.current.getAppState();

      if (
        !isEqual(sceneElements, elements) &&
        appState.cursorButton !== "down" &&
        !appState.editingElement
      ) {
        excalidrawRef.current.updateScene({ elements });
      }
    }
  }, [elements]);

  return (
    <NodeViewWrapper className="Excalidraw">
      <div className={containerStyles}>
        <Excalidraw
          ref={excalidrawRef}
          initialData={{ elements }}
          viewModeEnabled={!editor.isEditable}
          onChange={onChange}
        />
      </div>
    </NodeViewWrapper>
  );
};
export default ExcalidrawNodeView;
