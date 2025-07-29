/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import BtnLinkPrimary from "@/components/btn-link-primary";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Download,
  Loader2,
  Play,
  RefreshCcw,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import CodeEditor from "./code-editor";
import { SAMPLE_INPUT_DATA, SAMPLE_TARGET_JSON } from "./constant";

export default function PlaygroundPage() {
  const [inputData, setInputData] = useState("");
  const [targetFormat, setTargetFormat] = useState("");

  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null | undefined>(null);

  const handleTransformData = async () => {
    if (!inputData.trim()) {
      toast.error("Input data is required");
      return;
    }
    if (!targetFormat.trim()) {
      toast.error("Target format is required");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse("");

    try {
      const formatjson = JSON.parse(targetFormat);
      const startTime = Date.now();

      const { data } = await axios.post<{ result: any }>("/api/v1/json", {
        data: inputData,
        format: formatjson,
      });

      const endTime = Date.now();
      setResponse(JSON.stringify(data.result, null, 2));
      setLastRequestTime(endTime - startTime);
    } catch (err) {
      if (err instanceof SyntaxError) {
        // handles JSON.parse errors
        setError(`Invalid Target Format: ${err.message}`);
        setStatusCode(400); // Bad Request
      } else if (err instanceof AxiosError) {
        const status = err.response?.status ?? 500;
        setStatusCode(status);
        // Client-side errors (e.g., 400, 422) show a specific message
        if (status < 500) {
          setError(
            err.response?.data?.message || "A client-side error occurred."
          );
        } else {
          // Server-side errors (5xx) show a generic toast
          toast.error(
            "Sorry, there's a problem with our server. Please try again later!"
          );
        }
      } else {
        // Handle other unexpected errors
        toast.error("An unexpected error occurred. Please try again.");
        setStatusCode(500);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSample = () => {
    setInputData(SAMPLE_INPUT_DATA);
    setTargetFormat(SAMPLE_TARGET_JSON);
  };

  const handleResetData = () => {
    setInputData("");
    setTargetFormat("");
    setResponse("");
    setLastRequestTime(null);
    setError(null);
  };

  return (
    <div className="pb-4">
      {/* Header */}
      <MaxWidthWrapper className="flex flex-col items-center gap-y-6 mb-8">
        <div className="w-full flex justify-between items-center max-sm:flex-col max-sm:gap-y-6">
          <h1 className="text-6xl sm:self-end text-center font-patrick">
            <span className="text-red-700">API</span>{" "}
            <span className="text-green-500">Playground</span>
          </h1>
          <BtnLinkPrimary
            href="/apidocs"
            variant="red"
            className="flex gap-1 max-[480]:w-full items-center justify-center font-patrick max-sm:py-2 text-2xl! max-sm:text-2xl!"
          >
            See The Api <ArrowRight />
          </BtnLinkPrimary>
        </div>

        <Button
          onClick={handleLoadSample}
          disabled={isLoading}
          variant="default"
          size="lg"
          className="gap-2 max-[480px]:w-full rounded-xl"
        >
          <Download className="h-4 w-4 text-yellow-500" />
          Load Sample
        </Button>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* DATA INPUT */}
          <div>
            <CodeEditor
              title="Input Data"
              subtitle="Enter your raw data (CSV, text, etc.)"
              value={inputData}
              onChange={setInputData}
              language="plaintext"
              placeholder="Paste your data here..."
              height="350px"
              showLineNumber={false}
            />
          </div>

          {/* JSON TARGET */}
          <div>
            <CodeEditor
              title="Target Format"
              subtitle="Define your desired JSON structure"
              value={targetFormat}
              onChange={setTargetFormat}
              language="json"
              placeholder="Define your JSON schema..."
              height="350px"
              showActions
            />
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Action Buttons */}
      <MaxWidthWrapper>
        <div className="flex items-center justify-between my-4 p-4 max-sm:flex-col w-full max-sm:gap-y-4">
          <div className="flex items-center gap-4 max-[480px]:flex-col max-[480px]:w-full">
            <Button
              onClick={handleResetData}
              disabled={isLoading}
              variant="default"
              size="lg"
              className="gap-2 max-[480px]:w-full rounded-xl"
            >
              <RefreshCcw className="h-4 w-4 text-red-500" />
              Reset Data
            </Button>

            <Button
              onClick={handleTransformData}
              disabled={isLoading}
              variant="default"
              size="lg"
              className="gap-2 max-[480px]:w-full rounded-xl"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4 text-green-600" />
              )}
              {isLoading ? "Processing..." : "Transform Data"}
            </Button>

            {lastRequestTime && !isLoading && (
              <Badge variant="secondary" className="gap-1">
                <CheckCircle className="h-3 w-3" />
                {lastRequestTime}ms
              </Badge>
            )}
          </div>

          <div className="text-sm font-semibold text-muted-foreground">
            API Status:{" "}
            <span
              className={cn("text-red-500", {
                "text-green-500": !statusCode || statusCode === 200,
              })}
            >
              {(() => {
                if (!statusCode) return "Connected";
                if (statusCode >= 500) return "500 (Internal Server)";
                if (statusCode == 400) return "400 (Bad Request)";
                if (statusCode == 422) return "422 (Unproccesable Entity)";
                if (statusCode == 200) return "200 (Status OK)";
                return "500 (Internal Server)";
              })()}
            </span>
          </div>
        </div>
      </MaxWidthWrapper>

      {error && (
        <MaxWidthWrapper>
          <p className="mb-6 text-red-500 text-sm flex gap-2 items-center px-4 justify-center">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </p>
        </MaxWidthWrapper>
      )}

      {/* Response */}
      <MaxWidthWrapper>
        <div>
          <CodeEditor
            title="API Response"
            subtitle="Transformed JSON output"
            value={response}
            language="json"
            readOnly
            placeholder="Run the transformation to see results..."
            height="400px"
            showActions={!!response}
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
