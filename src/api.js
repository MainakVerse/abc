import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchQuizQuestions = async (topic) => {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;
  
  // I improved the prompt with clearer instructions
  const prompt = `
    Create 10 multiple-choice questions about ${topic}.
    Use the following format for each question:

    Question: [Question text]
    A) [Option text]
    B) [Option text]
    C) [Option text]
    D) [Option text]
    Correct Answer: [A/B/C/D]

    Please write each question in a separate paragraph and mark the options with the letters A, B, C, D.
    The options should be realistic and relevant to the topic, do not USE default values like "option1".
  `;

  const payload = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }]
  };

  try {
    const response = await axios.post(apiUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      }
    });

    const rawText = response.data.candidates[0].content.parts[0].text;
    return parseQuestionsEnhanced(rawText);
  } catch (error) {
    console.error("Error creating quiz questions:", error);
    throw new Error("Quiz questions could not be created. Please try again.");
  }
};

const parseQuestionsEnhanced = (rawText) => {
  // Separate the questions
  const questionBlocks = rawText.split(/\n\s*\n/).filter(block => block.trim());
  
  return questionBlocks.map(block => {
    const lines = block.split('\n').map(line => line.trim());
    
    // Find the question text
    const questionLine = lines.find(line => line.startsWith('Question:'));
    const question = questionLine ? questionLine.replace('Question:', '').trim() : 'Question could not be loaded';

    // Find the options
    const options = lines
      .filter(line => /^[A-D]\)/.test(line))
      .map(line => {
        const text = line.replace(/^[A-D]\)/, '').trim();
        return {
          text: text || 'Option could not be loaded',
          isCorrect: false
        };
      });

    // Find the correct answer
    const correctAnswerLine = lines.find(line => line.startsWith('Correct Answer:'));
    if (correctAnswerLine) {
      const correctLetter = correctAnswerLine.replace('Correct Answer:', '').trim();
      const correctIndex = correctLetter.charCodeAt(0) - 'A'.charCodeAt(0);
      if (options[correctIndex]) {
        options[correctIndex].isCorrect = true;
      }
    }

    // If the options are missing or incorrect, create default options
    if (options.length !== 4) {
      return {
        question,
        options: [
          { text: 'Options could not be loaded for this question A', isCorrect: true },
          { text: 'Options could not be loaded for this question B', isCorrect: false },
          { text: 'Options could not be loaded for this question C', isCorrect: false },
          { text: 'Options could not be loaded for this question D', isCorrect: false }
        ]
      };
    }

    // If no correct answer was marked, mark the first option as correct
    if (!options.some(opt => opt.isCorrect)) {
      options[0].isCorrect = true;
    }

    return {
      question,
      options
    };
  });
};
