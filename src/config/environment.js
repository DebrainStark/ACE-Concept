// src/config/environment.js

const environments = {
    development: {
      apiUrl: 'http://localhost:5000/api',
      usesMockData: true, // Use mock data in development
    },
    production: {
      apiUrl: 'https://api.aceconcepts.com/api',
      usesMockData: false,
    }
  };
  
  // Determine which environment to use
  const currentEnv = process.env.NODE_ENV || 'development';
  
  export default environments[currentEnv];