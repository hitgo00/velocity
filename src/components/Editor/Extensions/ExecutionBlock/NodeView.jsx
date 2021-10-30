import React, { useCallback } from "react";
import { createPythonClient } from "./clients/pyhton";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import Editor, { Monaco } from "@monaco-editor/react";

const initialCode = `# Implementation of the Sieve of Eratosthenes
# https://stackoverflow.com/questions/3939660/sieve-of-eratosthenes-finding-primes-python

# Finds all prime numbers up to n
def eratosthenes(n):
    multiples = []
    for i in range(2, n+1):
        if i not in multiples:
            print (i)
            for j in range(i*i, n+1, i):
                multiples.append(j)

eratosthenes(100)`;

const CodeBlock = ({ editor, node }) => {
  const [pyodide, setPyodide] = React.useState(null);
  const [output, setOutput] = React.useState("");

  const onRunCode = useCallback(
    async (code) => {
      let pythonClient = createPythonClient(pyodide);
      return await pythonClient.run({ code });
    },
    [pyodide]
  );

  const runCode = useCallback(
    async (code) => {
      const output = await onRunCode(node.textContent);
      if (output) {
        setOutput(output);
      }
    },
    [onRunCode, node]
  );

  // Note that window.loadPyodide comes from the beforeInteractive pyodide.js Script
  React.useEffect(() => {
    window
      .loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
      })
      .then((pyodide) => {
        setPyodide(pyodide);
      });
  }, []);

  return (
    <NodeViewWrapper>
      <button disabled={!pyodide} onClick={() => runCode(initialCode)}>
        Execute code
      </button>
      <pre>
        <NodeViewContent as="code" />
      </pre>

      <div>
        <Editor
          value={output?.toString()}
          height="20rem"
          defaultLanguage="python"
          theme="vs-dark"
          options={{ readOnly: true }}
        />
      </div>
    </NodeViewWrapper>
  );
};
export default CodeBlock;
