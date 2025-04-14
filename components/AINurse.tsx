'use client';

import { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaRobot } from 'react-icons/fa';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export default function AINurse() {
  const [isListening, setIsListening] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserMessage(transcript);
        handleAIResponse(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    synthesisRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleAIResponse = async (message: string) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `As a medical AI assistant, provide a comprehensive response to the following health concern: "${message}". 
      Include:
      1. Possible diagnosis
      2. Recommended medications (if any)
      3. Prevention techniques
      4. When to seek immediate medical attention
      
      Format the response in a clear, easy-to-understand manner.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setAiResponse(text);
      speakResponse(text);
    } catch (error) {
      console.error('Error generating response:', error);
      setAiResponse('I apologize, but I encountered an error. Please try again or consult a healthcare professional.');
    }
  };

  const speakResponse = (text: string) => {
    if (synthesisRef.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      synthesisRef.current.speak(utterance);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <FaRobot className="text-4xl text-primary mr-4" />
        <h2 className="text-2xl font-bold text-dark">AI Nurse Assistant</h2>
      </div>

      <div className="mb-6">
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="text-gray-700">{userMessage || 'Your message will appear here...'}</p>
        </div>
        <div className="bg-primary bg-opacity-10 p-4 rounded-lg">
          <p className="text-primary">{aiResponse || 'AI response will appear here...'}</p>
        </div>
      </div>

      <button
        onClick={startListening}
        className={`flex items-center justify-center w-full py-3 px-6 rounded-full ${
          isListening ? 'bg-red-500' : 'bg-primary'
        } text-white font-semibold transition-colors`}
      >
        <FaMicrophone className="mr-2" />
        {isListening ? 'Listening...' : 'Start Speaking'}
      </button>

      <div className="mt-4 text-sm text-gray-500">
        <p>Click the button and speak to interact with the AI nurse.</p>
        <p>Try describing your symptoms or asking health-related questions.</p>
      </div>
    </div>
  );
} 