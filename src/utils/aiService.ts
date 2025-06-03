import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
  baseURL: 'https://api.groq.com'  // Use the direct API URL
});

export const generateContentFromAI = async (prompt: string): Promise<string> => {
  try {
    console.log('Sending request to Groq with prompt:', prompt);
    
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null
    });

    console.log('Received response from Groq:', chatCompletion);

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) {
      console.error('No content in Groq response:', chatCompletion);
      throw new Error('No content generated');
    }

    return content;
  } catch (error) {
    console.error('Error generating content from AI:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate content: ${error.message}`);
    }
    throw new Error('Failed to generate content. Please try again.');
  }
};