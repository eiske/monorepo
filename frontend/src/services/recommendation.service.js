// getRecommendations.js

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products
) => {
  if (!products || products.length === 0) {
    return [];
  }

  const { selectedPreferences = [], selectedFeatures = [] } = formData;

  // Se não há seleções, retornar todos os produtos
  if (selectedPreferences.length === 0 && selectedFeatures.length === 0) {
    return products;
  }

  // Calcular score para cada produto
  const productsWithScores = products.map(product => {
    let score = 0;
    
    const PREFERENCE_WEIGHT = 3;
    const FEATURE_WEIGHT = 2;
    
    // Calcular score baseado em preferências
    if (selectedPreferences.length > 0) {
      const preferenceMatches = selectedPreferences.filter(pref => 
        product.preferences.includes(pref)
      );
      const preferenceScore = (preferenceMatches.length / selectedPreferences.length) * 100;
      score += preferenceScore * PREFERENCE_WEIGHT;
    }
    
    // Calcular score baseado em features
    if (selectedFeatures.length > 0) {
      const featureMatches = selectedFeatures.filter(feature => 
        product.features.includes(feature)
      );
      const featureScore = (featureMatches.length / selectedFeatures.length) * 100;
      score += featureScore * FEATURE_WEIGHT;
    }
    
    // Normalizar score para 0-100
    const totalWeight = PREFERENCE_WEIGHT + FEATURE_WEIGHT;
    const relevanceScore = Math.round(score / totalWeight);
    
    return {
      ...product,
      relevanceScore,
      matchDetails: {
        preferences: selectedPreferences.filter(pref => product.preferences.includes(pref)),
        features: selectedFeatures.filter(feature => product.features.includes(feature)),
        totalMatches: selectedPreferences.filter(pref => product.preferences.includes(pref)).length + 
                     selectedFeatures.filter(feature => product.features.includes(feature)).length
      }
    };
  });

  // Ordenar por score de relevância e depois por total de matches
  const sortedProducts = productsWithScores.sort((a, b) => {
    if (b.relevanceScore !== a.relevanceScore) {
      return b.relevanceScore - a.relevanceScore;
    }
    return b.matchDetails.totalMatches - a.matchDetails.totalMatches;
  });

  return sortedProducts;
};

export default { getRecommendations };
