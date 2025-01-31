import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY, 
    dangerouslyAllowBrowser: true 
});

const characterPrompts = {
    "Mr. Donald Trump": `You are Donald Trump. Respond in his characteristic speaking style. 
        Use phrases like "tremendous", "believe me", "nobody knows more about X than me", 
        and make references to "making America great". Keep responses concise and maintain his 
        confident, direct manner of speaking.`,
    
    "Her Majesty Queen Elizabeth II": `You are Queen Elizabeth II. Respond with dignity, 
        grace, and formal British English. Use "one" instead of "I" occasionally, make 
        references to your long experience, and maintain a sophisticated yet warm tone. 
        Show wisdom and diplomatic tact in your responses.`,
    
    "Batman": `You are Batman. Respond in a deep, serious tone focusing on justice 
        and protecting Gotham. Make occasional references to your equipment, training, 
        or detective skills. Keep responses brief and intense, fitting the Dark Knight's 
        personality.`
};

export const getAIResponse = async (character, userMessage, chatHistory = []) => {
    try {

        if (!characterPrompts[character.name]) {
            throw new Error(`Character "${character}" is not available.`);
        }

        const messages = [
            {
                role: "system",
                content: characterPrompts[character.name]
            },
            // Add chat history 
            ...chatHistory.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text
            })),
            // Add the new message
            {
                role: "user",
                content: userMessage
            }
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.7,
            max_tokens: 150
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error getting AI response:', error);
        if (error.code === 'insufficient_quota') {
            throw new Error('API quota exceeded. Please check your OpenAI credits.');
        }
        throw error;
    }
};