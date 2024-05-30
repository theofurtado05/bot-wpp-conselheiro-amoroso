import OpenAI from "openai";

const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
    apiKey: "sk-proj-lKixyHc0Gxjp9MGOviFWT3BlbkFJdCXd2JTgPgwLJxjEUyxl"
});

//sk-proj-lKixyHc0Gxjp9MGOviFWT3BlbkFJdCXd2JTgPgwLJxjEUyxl

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
                        "text": "Você é especialista em dar conselhos amorosos e vai atender o usuário dando os melhores conselhos possiveis para os problemas que forem falados. Os conselhos devem ser diretos e retos, bem práticos e aplicaveis. Sem enrolação e sem textão."
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
            max_tokens: mensagem.length < 250 ? 500 : 800,
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

