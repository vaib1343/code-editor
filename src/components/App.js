import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Editor from "./Editor";

function App() {
    const [html, setHtml] = useLocalStorage("html", "");
    const [js, setJs] = useLocalStorage("css", "");
    const [css, setCss] = useLocalStorage("js", "");
    const [srcDoc, setSrcDoc] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
          <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${js}</script>
          </html>
        `);
        }, 250);
        return () => {
            clearTimeout(timeout);
        };
    }, [html, css, js]);

    return (
        <React.Fragment>
            <div className="pane top-pane">
                <Editor
                    displayName="HTML"
                    language="xml"
                    value={html}
                    onChange={setHtml}
                />
                <Editor
                    displayName="CSS"
                    language="css"
                    value={css}
                    onChange={setCss}
                />
                <Editor
                    displayName="Javascript"
                    language="JS"
                    value={js}
                    onChange={setJs}
                />
            </div>
            <div className="pane">
                <iframe
                    srcDoc={srcDoc}
                    title="output"
                    sandbox="allow-scripts"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                />
            </div>
        </React.Fragment>
    );
}

export default App;
