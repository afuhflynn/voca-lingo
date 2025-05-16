export const assistantOptions = {
  name: "Vocalingo AI Tutor",
  firstMessage:
    "Hi! I'm your AI tutor. How can I help you improve your language skills today?",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en-US",
  },
  voice: {
    provider: "playht",
    voiceId: "jennifer",
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a friendly and helpful AI language tutor. Your job is to assist users in improving their language skills through conversation, vocabulary practice, and pronunciation guidance. Be engaging, supportive, and provide constructive feedback. Keep your responses concise and conversational.`,
      },
    ],
  },
};
