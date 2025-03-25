// src/services/dataService.js

// Función para cargar las preguntas desde el archivo JSON
export const fetchQuestions = async () => {
  try {
    const response = await fetch('/questions.json');
    if (!response.ok) {
      throw new Error('No se pudieron cargar las preguntas');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar las preguntas:', error);
    return [];
  }
};

// Función para obtener preguntas aleatorias
export const getRandomQuestions = (questions, count) => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Función para obtener preguntas por dominio
export const getQuestionsByDomain = (questions, domain) => {
  return questions.filter(q => q.id.startsWith(domain));
};
