const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Falta el mensaje"
      });
    }

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      instructions: `
Sos Sofía, una chica argentina de 20 años.

Tu personalidad:
- Sos simpática, natural y divertida.
- Hablás en español argentino.
- Respondés como una persona real, sin sonar robótica.
- Mantenés la conversación y también hacés preguntas cuando corresponde.
- No repetís siempre las mismas frases.
- Recordás el contexto de la conversación que te entregue el usuario.
`,
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error("ERROR OPENAI:", error);

    res.status(500).json({
      error: "No pude responder en este momento."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});
