// getRecommendations.js

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [], selectedRecommendationType: 'MultipleProducts' },
  products
) => {
  if (!products || products.length === 0) {
    return [];
  }

  const safeFormData = formData || { selectedPreferences: [], selectedFeatures: [], selectedRecommendationType: 'MultipleProducts' };
  const { selectedPreferences = [], selectedFeatures = [], selectedRecommendationType = 'MultipleProducts' } = safeFormData;

  if (selectedPreferences.length === 0 && selectedFeatures.length === 0) {
    return products.map(product => ({
      ...product,
      relevanceScore: 0,
      matchDetails: {
        preferences: [],
        features: [],
        totalMatches: 0
      }
    }));
  }

  // Calcular score para cada produto
  const productsWithScores = products.map(product => {
    let score = 0;
    
    const PREFERENCE_WEIGHT = 3;
    const FEATURE_WEIGHT = 2;
    
    // Calcular score baseado em preferências
    if (selectedPreferences.length > 0) {
      const productPreferences = product.preferences || [];
      const preferenceMatches = selectedPreferences.filter(pref => 
        productPreferences.includes(pref)
      );
      const preferenceScore = (preferenceMatches.length / selectedPreferences.length) * 100;
      score += preferenceScore * PREFERENCE_WEIGHT;
    }
    
    // Calcular score baseado em features
    if (selectedFeatures.length > 0) {
      const productFeatures = product.features || [];
      const featureMatches = selectedFeatures.filter(feature => 
        productFeatures.includes(feature)
      );
      const featureScore = (featureMatches.length / selectedFeatures.length) * 100;
      score += featureScore * FEATURE_WEIGHT;
    }
    
    // Normalizar score para 0-100
    const totalWeight = PREFERENCE_WEIGHT + FEATURE_WEIGHT;
    const relevanceScore = Math.round(score / totalWeight);
    
    const productPreferences = product.preferences || [];
    const productFeatures = product.features || [];
    
    return {
      ...product,
      relevanceScore,
      matchDetails: {
        preferences: selectedPreferences.filter(pref => productPreferences.includes(pref)),
        features: selectedFeatures.filter(feature => productFeatures.includes(feature)),
        totalMatches: selectedPreferences.filter(pref => productPreferences.includes(pref)).length + 
                     selectedFeatures.filter(feature => productFeatures.includes(feature)).length
      }
    };
  });

  // Ordenar por score de relevância e depois por total de matches
  const sortedProducts = productsWithScores.sort((a, b) => {
    if (b.relevanceScore !== a.relevanceScore) {
      return b.relevanceScore - a.relevanceScore;
    }
    if (b.matchDetails.totalMatches !== a.matchDetails.totalMatches) {
      return b.matchDetails.totalMatches - a.matchDetails.totalMatches;
    }
    return b.id - a.id;
  });

  if (selectedRecommendationType === 'SingleProduct') {
    return sortedProducts.length > 0 ? [sortedProducts[0]] : [];
  } else if (selectedRecommendationType === 'MultipleProducts') {
    return sortedProducts.filter(product => product.relevanceScore > 0);
  }

  return sortedProducts;
};

const recommendationService = { getRecommendations };

export default recommendationService;
