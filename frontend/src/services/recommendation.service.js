import { SCORING_WEIGHTS } from './constants/scoring.js';
import { isValidProductList, sanitizeFormData, hasActiveCriteria } from './utils/validation.js';
import { 
  calculatePreferenceScore, 
  calculateFeatureScore, 
  normalizeScore, 
  createMatchDetails 
} from './utils/scoring.js';
import { sortProductsByRelevance, filterByRecommendationType } from './utils/sorting.js';

const createProductWithZeroScore = (product) => ({
  ...product,
  relevanceScore: 0,
  matchDetails: {
    preferences: [],
    features: [],
    totalMatches: 0
  }
});

const calculateProductScore = (product, selectedPreferences, selectedFeatures) => {
  const preferenceScore = calculatePreferenceScore(product, selectedPreferences, SCORING_WEIGHTS.PREFERENCE);
  const featureScore = calculateFeatureScore(product, selectedFeatures, SCORING_WEIGHTS.FEATURE);
  
  const totalScore = preferenceScore + featureScore;
  const totalWeight = SCORING_WEIGHTS.PREFERENCE + SCORING_WEIGHTS.FEATURE;
  const relevanceScore = normalizeScore(totalScore, totalWeight);
  
  const matchDetails = createMatchDetails(product, selectedPreferences, selectedFeatures);
  
  return {
    ...product,
    relevanceScore,
    matchDetails
  };
};

const getRecommendations = (formData, products) => {
  if (!isValidProductList(products)) {
    return [];
  }

  const { selectedPreferences, selectedFeatures, selectedRecommendationType } = sanitizeFormData(formData);

  // Se não tem critérios ativos, retorna todos os produtos com score zero
  if (!hasActiveCriteria(selectedPreferences, selectedFeatures)) {
    return products.map(createProductWithZeroScore);
  }

  const productsWithScores = products.map(product => 
    calculateProductScore(product, selectedPreferences, selectedFeatures)
  );

  const sortedProducts = sortProductsByRelevance(productsWithScores);

  return filterByRecommendationType(sortedProducts, selectedRecommendationType);
};

const recommendationService = { getRecommendations };

export default recommendationService;
