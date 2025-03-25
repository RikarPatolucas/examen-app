// src/screens/HomeScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ExamContext } from '../contexts/ExamContext';
import { getQuestionsByDomain, getRandomQuestions } from '../services/dataService';

const HomeScreen = ({ navigation }) => {
  const { questions, loading, error, startExam } = useContext(ExamContext);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [questionCount, setQuestionCount] = useState(10);

  const handleStartExam = () => {
    let examQuestions;
    
    if (selectedDomain) {
      examQuestions = getQuestionsByDomain(questions, selectedDomain);
      if (examQuestions.length > questionCount) {
        examQuestions = getRandomQuestions(examQuestions, questionCount);
      }
    } else {
      examQuestions = getRandomQuestions(questions, questionCount);
    }
    
    startExam(examQuestions);
    navigation.navigate('Exam');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando preguntas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Examen CISA</Text>
        <Text style={styles.subtitle}>Preparación para la certificación</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selecciona un dominio</Text>
        <View style={styles.domainButtons}>
          <TouchableOpacity
            style={[styles.domainButton, selectedDomain === 'A1' && styles.selectedDomain]}
            onPress={() => setSelectedDomain('A1')}
          >
            <Text style={styles.domainButtonText}>Dominio 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.domainButton, selectedDomain === 'A2' && styles.selectedDomain]}
            onPress={() => setSelectedDomain('A2')}
          >
            <Text style={styles.domainButtonText}>Dominio 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.domainButton, selectedDomain === 'A3' && styles.selectedDomain]}
            onPress={() => setSelectedDomain('A3')}
          >
            <Text style={styles.domainButtonText}>Dominio 3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.domainButton, selectedDomain === 'A4' && styles.selectedDomain]}
            onPress={() => setSelectedDomain('A4')}
          >
            <Text style={styles.domainButtonText}>Dominio 4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.domainButton, selectedDomain === 'A5' && styles.selectedDomain]}
            onPress={() => setSelectedDomain('A5')}
          >
            <Text style={styles.domainButtonText}>Dominio 5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.domainButton, selectedDomain === null && styles.selectedDomain]}
            onPress={() => setSelectedDomain(null)}
          >
            <Text style={styles.domainButtonText}>Todos los dominios</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Número de preguntas</Text>
        <View style={styles.countButtons}>
          {[10, 20, 30, 50].map(count => (
            <TouchableOpacity
              key={count}
              style={[styles.countButton, questionCount === count && styles.selectedCount]}
              onPress={() => setQuestionCount(count)}
            >
              <Text style={styles.countButtonText}>{count}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={handleStartExam}
      >
        <Text style={styles.startButtonText}>Comenzar Examen</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ecf0f1',
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  domainButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  domainButton: {
    width: '48%',
    padding: 12,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedDomain: {
    backgroundColor: '#3498db',
  },
  domainButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  countButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  countButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCount: {
    backgroundColor: '#3498db',
  },
  countButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
    color: '#e74c3c',
  },
});

export default HomeScreen;
