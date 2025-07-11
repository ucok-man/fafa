import { GoogleGenAI } from "@google/genai";

export enum GeminiModel {
  GEMINI_2_0_FLASH = "gemini-2.0-flash",
}

export const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
