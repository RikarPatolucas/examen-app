// En src/components/QuestionCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuestionCard = ({ 
  question, 
  selectedAnswer, 
  onSelectAnswer, 
  showAnswer 
}) => {
  
  // Función para formatear la justificación
  const formatJustification = (justificationText) => {
    // Buscar patrones como "A.", "B.", "C.", "D." en la justificación
    const parts = [];
    const regex = /([A-D])\.\s+(.*?)(?=\s+[A-D]\.|$)/gs;
    let match;
    
    while ((match = regex.exec(justificationText)) !== null) {
      parts.push({
        option: match[1],
        text: match[2].trim()
      });
    }
    
    // Si no encontramos el formato esperado, devolver el texto original
    if (parts.length === 0) {
      return (
        <Text style={styles.justificationText}>{justificationText}</Text>
      );
    }
    
    // Renderizar cada parte de la justificación con formato
    return parts.map((part, index) => (
      <View key={index} style={styles.justificationItem}>
        <Text style={styles.justificationOption}>{part.option}.</Text>
        <Text style={styles.justificationItemText}>{part.text}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.question}</Text>
      
      {question.options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.optionButton,
            selectedAnswer === option.id && styles.selectedOption,
            showAnswer && option.id === question.correct_answer && styles.correctOption,
            showAnswer && selectedAnswer === option.id && 
            selectedAnswer !== question.correct_answer && styles.incorrectOption
          ]}
          onPress={() => onSelectAnswer(option.id)}
          disabled={showAnswer}
        >
          <Text style={styles.optionText}>
            {option.id}. {option.text}
          </Text>
        </TouchableOpacity>
      ))}
      
      {showAnswer && (
        <View style={styles.justificationContainer}>
          <Text style={styles.justificationTitle}>Justificación:</Text>
          {formatJustification(question.justification)}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  optionButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#e6f7ff',
    borderColor: '#1890ff',
  },
  correctOption: {
    backgroundColor: '#d4edda',
    borderColor: '#28a745',
  },
  incorrectOption: {
    backgroundColor: '#f8d7da',
    borderColor: '#dc3545',
  },
  optionText: {
    fontSize: 16,
  },
  justificationContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
  },
  justificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  justificationText: {
    fontSize: 14,
    lineHeight: 20,
  },
  justificationItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  justificationOption: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
    minWidth: 20,
  },
  justificationItemText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  }
});

export default QuestionCard;
