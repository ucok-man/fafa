import { GoogleGenAI } from "@google/genai";

export enum GeminiModel {
  GEMINI_1_5_FLASH = "gemini-1.5-flash",
}

export const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
