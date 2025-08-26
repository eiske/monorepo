export const SCORING_WEIGHTS = {
  PREFERENCE: 3,
  FEATURE: 2
};

export const RECOMMENDATION_TYPES = {
  SINGLE_PRODUCT: 'SingleProduct',
  MULTIPLE_PRODUCTS: 'MultipleProducts'
};

export const DEFAULT_FORM_DATA = {
  selectedPreferences: [],
  selectedFeatures: [],
  selectedRecommendationType: RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS
};

export const MINIMUM_RELEVANCE_SCORE = 0;
