// src/contexts/ExamContext.js
import React, { createContext, useState, useEffect } from 'react';
import { fetchQuestions } from '../services/dataService';

export const ExamContext = createContext();

export const ExamProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const loadedQuestions = await fetchQuestions();
        setQuestions(loadedQuestions);
      } catch (err) {
        setError('Error al cargar las preguntas');
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const startExam = (selectedQuestions) => {
    setCurrentExam(selectedQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
  };

  const answerQuestion = (questionId, answerId) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentExam.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    if (!currentExam) return 0;
    const correctAnswers = currentExam.filter(q => 
      userAnswers[q.id] === q.correct_answer
    ).length;
    return (correctAnswers / currentExam.length) * 100;
  };

  return (
    <ExamContext.Provider
      value={{
        questions,
        currentExam,
        currentQuestionIndex,
        userAnswers,
        loading,
        error,
        startExam,
        answerQuestion,
        nextQuestion,
        prevQuestion,
        calculateScore
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};
