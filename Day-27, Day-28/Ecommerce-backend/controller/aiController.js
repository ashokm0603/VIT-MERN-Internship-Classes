const AIModels = require("../model/AIModels");
const AIContent = require("../model/AIModels");

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.API_Key });

const givePrompt = async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: req.body.prompt,
    });

    await AIModels.insertOne({
      input: req.body.prompt,
      output: response.text,
    });

    res.status(200).json({ AIResponse: response.text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to generate input" });
  }
};

module.exports = givePrompt;
