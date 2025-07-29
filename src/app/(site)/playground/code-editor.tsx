/* eslint-disable @typescript-eslint/no-unused-vars */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { toast } from "@/hooks/use-toast";
import { Editor, Monaco } from "@monaco-editor/react";
import { Code, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import OneDarkPro from "./one-dark-pro.json";

type Props = {
  title: string;
  subtitle?: string;
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  placeholder?: string;
  height?: string;
  showActions?: boolean;
  showLineNumber?: boolean;
};

export default function CodeEditor({
  title,
  subtitle,
  value,
  onChange,
  language = "json",
  readOnly = false,
  placeholder,
  height = "400px",
  showActions = false,
  showLineNumber = true,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const handleEditorDidMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("OneDarkPro", {
      base: "vs-dark",
      inherit: true,
      ...OneDarkPro,
      rules: [],
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy clipboard");
    }
  };

  const handleFormat = () => {};

  return (
    <section className="border overflow-hidden rounded-lg">
      <div className="border-b px-4 py-2 flex items-center justify-between grainy-light">
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {language.toUpperCase()}
          </Badge>
          {showActions && value && (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8 w-8 p-0"
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFormat}
                className="h-8 w-8 p-0"
              >
                <Code className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="relative">
        <Editor
          beforeMount={handleEditorDidMount}
          onMount={() => setIsLoading(false)}
          language={language}
          value={value}
          onChange={(val) => onChange?.(val || "")}
          theme="OneDarkPro"
          height={height}
          width={"100%"}
          options={{
            readOnly,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            fontFamily: "JetBrains Mono, Monaco, Consolas, monospace",
            lineNumbers: showLineNumber ? "on" : "off",
            padding: { bottom: 20, top: 20 },
            folding: true,
            wordWrap: "on",
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            formatOnPaste: true,
            formatOnType: true,
            bracketPairColorization: { enabled: true },
            guides: {
              indentation: true,
              bracketPairs: true,
            },
            suggest: {
              showKeywords: true,
              showSnippets: true,
            },
          }}
          loading={
            <div className="flex items-center justify-center h-full bg-editor-background">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          }
        />
        {placeholder && !value && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-muted-foreground text-sm">{placeholder}</p>
          </div>
        )}
      </div>
    </section>
  );
}
