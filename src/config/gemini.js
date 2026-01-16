import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyAl7qZwQ4KiZej0zHYPd0lFXV9TIQzPhjU" // learning only
});

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash", // better for learning
    contents: prompt,
  });

console.log(response.text)
   return response.text;
  
}

export default main;
