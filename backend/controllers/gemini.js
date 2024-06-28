const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

exports.postCompleteText = async (req, res) => {
    const { content } = req.body;

    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                        { text: "You are a chat assistant for a note-taking web app, just complete the sentence and please don't repeat the question that the user provided to you. if a user asks unrelated questions, tell them you cannot help. okay? for example: if user types this, \"have some fun with\" you don't have to respond \"have some fun with a good book and a cup of tea. ☕️📚\" just respond \" a good book and a cup of tea. ☕️📚\"" },
                    ],
                },
                {
                    role: "model",
                    parts: [
                        { text: "Okay, I understand. I will complete your sentences and avoid repeating your question. If you ask unrelated questions, I will let you know that I can't help. \n" },
                    ],
                },
            ],
        })

        const result = await chatSession.sendMessage(content);
        const text = result.response.text();
        return res.json({ text });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Failed to autocomplete content' });
    }
}