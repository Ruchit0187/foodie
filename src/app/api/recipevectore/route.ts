import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(request: NextRequest) {
  try {
    const { textToEmbed } = await request.json();

    if (!textToEmbed) {
      return NextResponse.json(
        { error: "Please provide text to embed" },
        { status: 400 },
      );
    }

    const embeddingResponse = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: textToEmbed,
    });

    if (!embeddingResponse.embeddings || embeddingResponse.embeddings.length === 0) {
      return NextResponse.json(
        { error: "Failed to generate embeddings" },
        { status: 500 },
      );
    }

    const embeddingVector = embeddingResponse.embeddings[0].values;

    return NextResponse.json({
      success: true,
      embeddingVector,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}