import React from 'react';

function RecommendationList({ recommendations }) {
  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 70) return 'Alta Relevância';
    if (score >= 30) return 'Média Relevância';
    if (score > 0) return 'Baixa Relevância';
    return 'Sem Relevância';
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Lista de Recomendações:</h2>

      {recommendations.length === 0 && <p>Nenhuma recomendação encontrada.</p>}

      <ul>
        {recommendations.map((recommendation, index) => (
          <li key={index} className="mb-4 p-3 border border-gray-200 rounded">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{recommendation.name}</h3>
              {recommendation.relevanceScore !== undefined && (
                <span className={`text-sm font-medium ${getScoreColor(recommendation.relevanceScore)}`}>
                  {recommendation.relevanceScore}% - {getScoreLabel(recommendation.relevanceScore)}
                </span>
              )}
            </div>
            
            {recommendation.matchDetails && recommendation.matchDetails.totalMatches > 0 && (
              <div className="text-sm text-gray-600 mb-2">
                <p>Matches encontrados: {recommendation.matchDetails.totalMatches}</p>
                {recommendation.matchDetails.preferences.length > 0 && (
                  <p>Preferências: {recommendation.matchDetails.preferences.join(', ')}</p>
                )}
                {recommendation.matchDetails.features.length > 0 && (
                  <p>Funcionalidades: {recommendation.matchDetails.features.join(', ')}</p>
                )}
              </div>
            )}
            
            <p className="text-sm text-gray-500">{recommendation.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationList;
