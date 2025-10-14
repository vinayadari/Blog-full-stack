import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

export const response = async (system, content) => {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-001" });

  const prompt = `You are an ${system} expert. 
  Answer the following strictly in valid JSON only:
  ${content}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error("No JSON object found in response:\n" + text);
  }

  try {
    const json = JSON.parse(match[0]);
    return json;
  } catch (err) {
    console.error("JSON parse failed:", err.message, "\nRaw:", text);
    throw new Error("Gemini returned invalid JSON");
  }
};
