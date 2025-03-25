// src/App.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { ExamProvider } from './contexts/ExamContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ExamScreen from './screens/ExamScreen';
import ResultsScreen from './screens/ResultsScreen';

const Stack = createStackNavigator();

const AppContent = () => {
  const { isAuthenticated } = useContext(AuthContext);
  
  return (
    <ExamProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {!isAuthenticated ? (
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ title: 'Examen CISA' }} 
              />
              <Stack.Screen 
                name="Exam" 
                component={ExamScreen} 
                options={{ title: 'Preguntas' }} 
              />
              <Stack.Screen 
                name="Results" 
                component={ResultsScreen} 
                options={{ title: 'Resultados' }} 
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ExamProvider>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
