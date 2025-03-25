// src/screens/ResultsScreen.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ExamContext } from '../contexts/ExamContext';

const ResultsScreen = ({ navigation }) => {
  const { currentExam, userAnswers, calculateScore } = useContext(ExamContext);
  
  if (!currentExam) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No hay resultados disponibles</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const { total, correct, score } = {
    total: currentExam.length,
    correct: currentExam.filter(q => userAnswers[q.id] === q.correct_answer).length,
    score: calculateScore()
  };
  
  const getScoreColor = () => {
    if (score >= 80) return '#4caf50';
    if (score >= 70) return '#8bc34a';
    if (score >= 60) return '#ffeb3b';
    if (score >= 50) return '#ff9800';
    return '#f44336';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreTitle}>Resultado del examen</Text>
        <View style={[styles.scoreCircle, { borderColor: getScoreColor() }]}>
          <Text style={[styles.scoreText, { color: getScoreColor() }]}>
            {Math.round(score)}%
          </Text>
        </View>
        <Text style={styles.scoreDetails}>
          {correct} correctas de {total} preguntas
        </Text>
      </View>
      
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Resumen por dominio</Text>
        {['A1', 'A2', 'A3', 'A4', 'A5'].map(domain => {
          const domainQuestions = currentExam.filter(q => q.id.startsWith(domain));
          if (domainQuestions.length === 0) return null;
          
          const domainCorrect = domainQuestions.filter(
            q => userAnswers[q.id] === q.correct_answer
          ).length;
          const domainScore = (domainCorrect / domainQuestions.length) * 100;
          
          return (
            <View key={domain} style={styles.domainRow}>
              <Text style={styles.domainName}>Dominio {domain.replace('A', '')}</Text>
              <Text style={styles.domainScore}>{Math.round(domainScore)}%</Text>
              <Text style={styles.domainDetails}>
                {domainCorrect}/{domainQuestions.length}
              </Text>
            </View>
          );
        })}
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.reviewButton]}
          onPress={() => navigation.navigate('Exam')}
        >
          <Text style={styles.buttonText}>Revisar preguntas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.homeButton]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Nuevo examen</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scoreContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scoreTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  scoreDetails: {
    fontSize: 18,
  },
  summaryContainer: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  domainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  domainName: {
    fontSize: 16,
    flex: 2,
  },
  domainScore: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  domainDetails: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewButton: {
    backgroundColor: '#2196f3',
    marginRight: 5,
  },
  homeButton: {
    backgroundColor: '#4caf50',
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ResultsScreen;
