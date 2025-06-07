import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import "./Terminal.css";
import { processCommand } from "../../util/cmd-handler";
import COMMANDS from "../../util/commands";

export const CURSOR_BLINK_INTERVAL_MS = 600;
export const PS1 = "wash> ";

export default function Terminal() {
  const [content, setContent] = useState<ReactNode>();
  const [inputContent, setInputContent] = useState<string>("");
  const [cursorVisible, setCursorVisible] = useState<boolean>(true);
  const inputRef = useRef<string>(inputContent);
  const focusThiefRef = useRef<HTMLTextAreaElement>(null);

  const userIsSelecting = useCallback((): boolean => {
    const sel = document.getSelection();
    return (sel != null && !sel.isCollapsed);
  }, []);

  useEffect(() => {
    inputRef.current = inputContent;
  }, [inputContent]);

  useEffect(() => {
    setContent(COMMANDS.motd.fn([]).output);
  }, [])

  useEffect(() => {}, [userIsSelecting])

  useEffect(() => {
    const cursorAnim = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, CURSOR_BLINK_INTERVAL_MS);

    const refocus = setInterval(() => {
      if (focusThiefRef.current == null || userIsSelecting()) return;
      focusThiefRef.current.focus();
    }, 300);

    // we split this into two listeners because the keypress
    // event makes it easier to check for printable keys.
    // it's slightly more overhead but there's basically
    // no overhead anywhere else so it's fine
    const charKeyListener = (e: KeyboardEvent) => {
      if (userIsSelecting()) return;

      if (e.key === "Enter") {
        setInputContent("");
        focusThiefRef.current!.value = "";

        let includeCmd = true;

        for (const cmd of inputRef.current.trim().split("&&")) {
          const res = processCommand(cmd);

          // clear the terminal if needed
          if (res.clear) {
            setContent(null);
          }

          if (res.output != null) {
            // this fixes a race condition where includeCmd is overwritten before it's used
            const actuallyIncludeCmd = includeCmd;

            setContent(prev => (
              <div>
                {res.clear ? null : prev}
                {
                  actuallyIncludeCmd && !res.clear
                    ? (<div role="group" aria-label={`Command: ${inputRef.current}`}>
                        <span aria-hidden="true">{PS1}</span>
                        <span>{inputRef.current}</span><br/>
                      </div>)
                    : null
                }
                <div
                  role="group"
                  aria-label={`Command output${res.output ? "" : "(empty)"}`}
                >{res.output}</div>
              </div>
            ));
          }

          includeCmd = false;
        }

        return;
      }

      setInputContent(prev => prev + e.key);
    };

    const modKeyListener = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Backspace":
          setInputContent(prev => prev.slice(0, prev.length - 1));
          break;
        default:
          break;
      }
    };

    addEventListener("keypress", charKeyListener);
    addEventListener("keydown", modKeyListener);

    return () => {
      clearInterval(cursorAnim);
      clearInterval(refocus);
      removeEventListener("keypress", charKeyListener);
      removeEventListener("keydown", modKeyListener);
    }
  }, [userIsSelecting]);

  return (
    <>
      <div className="terminal">
        <div
          aria-live="assertive"
          aria-atomic="false"
          className="term-content"
        >{content}</div>
        <div className="prompt" onClick={() => focusThiefRef.current?.focus()}>
          <span className="prompt" aria-hidden="true">{PS1}</span>
          <span className="prompt input" aria-hidden="true">{inputContent}</span>
          <span className="cursor" aria-hidden="true" style={{
            color: (userIsSelecting() || !cursorVisible)
              ? "rgba(0, 0, 0, 0)"
              : "inherit"
          }}>▉</span>
        </div>
      </div>
      <textarea
        aria-label="Terminal input"
        id="focus-thief"
        ref={focusThiefRef}
        onBlur={() => focusThiefRef.current!.focus()}
      ></textarea>
    </>
  );
}
