import React from 'react';

const Statistics = ({ good, neutral, bad, totalFeedback, averageScore, positivePercentage }) => {
  return (
    <div>
      <h3>Estadísticas</h3>
      <p>Total de Comentarios: {totalFeedback}</p>
      <p>Puntuación Promedio: {averageScore.toFixed(2)}</p>
      <p>Porcentaje de Comentarios Positivos: {positivePercentage.toFixed(2)}%</p>
      <p>
        Bueno: {good} | Neutral: {neutral} | Malo: {bad}
      </p>
    </div>
  );
};

export default Statistics;
