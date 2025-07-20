import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Gemini API key not configured" });
    }

    // Use Gemini default model (gemini-pro)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an AI assistant for a developer portfolio website. Answer questions about the developer's skills, projects, and experience.\n${message}`,
              },
            ],
          },
        ],
      }),
    });
    const data = await response.json();
    console.log("Gemini API raw response:", data);
    const aiResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't find an answer.";
    res.status(200).json({ response: aiResponse, debug: data });
  } catch (error) {
    res.status(500).json({ error: "Failed to connect to Gemini API" });
  }
}
