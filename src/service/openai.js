import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//sk-proj-fK4UiYEMTkFTg7b1thpXT3BlbkFJn6JMW6LqwVUkSwrNsypl

export const darConselhosAmorosos = async (mensagem) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
            {
                "role": "system",
                "content": [
                    {
                        "type": "text",
                        "text": "Você é especialista em dar conselhos amorosos e vai atender o usuário dando os melhores conselhos possiveis para os problemas que forem falados."
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": mensagem
                    }
                ]
            },
            ],
            temperature: 1,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
    
        // console.log(JSON.stringify(response.choices[0].message), " response da openai")
        return response.choices[0].message.content;
    } catch (error) {
        throw error
    }
    
}

