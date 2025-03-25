// src/screens/ExamScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ExamContext } from '../contexts/ExamContext';
import QuestionCard from '../components/QuestionCard';

const ExamScreen = ({ navigation }) => {
  const { 
    currentExam, 
    currentQuestionIndex,
    userAnswers, 
    answerQuestion, 
    nextQuestion,
    prevQuestion,
    calculateScore
  } = useContext(ExamContext);
  
  const [showAnswer, setShowAnswer] = useState(false);
  
  if (!currentExam || currentExam.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No hay examen activo. Inicia uno nuevo.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const currentQuestion = currentExam[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestion.id];
  
  const handleSelectAnswer = (answerId) => {
    if (!showAnswer) {
      answerQuestion(currentQuestion.id, answerId);
    }
  };
  
  const handleShowAnswer = () => {
    setShowAnswer(true);
  };
  
  const handleNextQuestion = () => {
    setShowAnswer(false);
    nextQuestion();
  };
  
  const handlePrevQuestion = () => {
    setShowAnswer(false);
    prevQuestion();
  };

  const handleFinishExam = () => {
    navigation.navigate('Results');
  };

  const answeredQuestions = Object.keys(userAnswers).length;
  const progress = (answeredQuestions / currentExam.length) * 100;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
        <Text style={styles.progressText}>
          {answeredQuestions} de {currentExam.length} respondidas
        </Text>
      </View>

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
        showAnswer={showAnswer}
        currentIndex={currentQuestionIndex}
        totalQuestions={currentExam.length}
      />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.navigationButton]}
          onPress={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <Text style={styles.buttonText}>Anterior</Text>
        </TouchableOpacity>
        
        {!showAnswer && selectedAnswer && (
          <TouchableOpacity
            style={[styles.button, styles.showAnswerButton]}
            onPress={handleShowAnswer}
          >
            <Text style={styles.buttonText}>Mostrar Respuesta</Text>
          </TouchableOpacity>
        )}
        
        {currentQuestionIndex < currentExam.length - 1 ? (
          <TouchableOpacity
            style={[styles.button, styles.navigationButton]}
            onPress={handleNextQuestion}
          >
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.finishButton]}
            onPress={handleFinishExam}
          >
            <Text style={styles.buttonText}>Finalizar</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  progressContainer: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  progressText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationButton: {
    backgroundColor: '#2196f3',
    flex: 1,
    marginHorizontal: 5,
  },
  showAnswerButton: {
    backgroundColor: '#ff9800',
    flex: 2,
    marginHorizontal: 5,
  },
  finishButton: {
    backgroundColor: '#4caf50',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExamScreen;
