export class PythonClient {
  // <- [reference](https://stackoverflow.com/a/59571016/1375972)
  // We redirect stdout to an IO string buffer so that it can be read later
  setStdoutToOutput = `
      import sys
      import io
      sys.stdout = io.StringIO()
    `;
  pyodide = null;

  constructor(pyodide) {
    this.pyodide = pyodide;
    pyodide.runPython(this.setStdoutToOutput);
  }

  async run({ code }) {
    await this.loadPackages(code);
    const output = this.pyodide.runPython(code) ?? "";
    // Prepend the value of stdout before returning
    const stdout = this.pyodide.runPython("sys.stdout.getvalue()");
    console.log(stdout + output);
    return stdout + output;
  }

  loadPackages(code) {
    if (typeof this.pyodide.loadPackagesFromImports === "function") {
      console.log("Loading Python dependencies from code");
      return this.pyodide.loadPackagesFromImports(code);
    }
    return this.pyodide.loadPackage([]);
  }
}

const createPythonClient = (pyodide) => {
  return new PythonClient(pyodide);
};

export { createPythonClient };
