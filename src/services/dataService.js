// src/services/dataService.js

export const fetchQuestions = async () => {
  try {
    console.log('Intentando cargar preguntas...');
    // Detectar si estamos en producción (GitHub Pages) o desarrollo local
    const isProduction = window.location.hostname !== 'localhost';
    const basePath = isProduction ? '/examen-app' : '';
    const response = await fetch(`${basePath}/questions.json`);

    
    if (!response.ok) {
      console.error('Error al cargar preguntas:', response.status, response.statusText);
      throw new Error(`No se pudieron cargar las preguntas: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Preguntas cargadas: ${data.length}`);
    return data;
  } catch (error) {
    console.error('Error al cargar las preguntas:', error);
    return [];
  }
};

export const getRandomQuestions = (questions, count) => {
  if (!questions || questions.length === 0) {
    console.error('No hay preguntas disponibles para seleccionar aleatoriamente');
    return [];
  }
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, questions.length));
};

export const getQuestionsByDomain = (questions, domain) => {
  if (!questions || questions.length === 0) {
    console.error('No hay preguntas disponibles para filtrar por dominio');
    return [];
  }
  return questions.filter(q => q.id.startsWith(domain));
};

