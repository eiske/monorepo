/**
 * Calcula quais itens de uma lista de critérios selecionados 
 * estão presentes nos critérios do produto
 * @param {string[]} selectedCriteria - Critérios selecionados pelo usuário
 * @param {string[]} productCriteria - Critérios do produto
 * @returns {string[]} Lista de critérios que fazem match
 */
export const findMatchingCriteria = (selectedCriteria, productCriteria) => {
  if (!selectedCriteria || !productCriteria) return [];
  return selectedCriteria.filter(criteria => productCriteria.includes(criteria));
};

/**
 * Calcula o score percentual baseado no número de matches
 * @param {number} matchCount - Número de matches encontrados
 * @param {number} totalSelected - Total de critérios selecionados
 * @returns {number} Score percentual (0-100)
 */
export const calculatePercentageScore = (matchCount, totalSelected) => {
  if (totalSelected === 0) return 0;
  return (matchCount / totalSelected) * 100;
};

/**
 * Calcula o score de preferências para um produto
 * @param {Object} product - Produto a ser avaliado
 * @param {string[]} selectedPreferences - Preferências selecionadas
 * @param {number} weight - Peso das preferências no cálculo final
 * @returns {number} Score ponderado das preferências
 */
export const calculatePreferenceScore = (product, selectedPreferences, weight) => {
  if (!selectedPreferences || selectedPreferences.length === 0) return 0;
  
  const productPreferences = product.preferences || [];
  const matches = findMatchingCriteria(selectedPreferences, productPreferences);
  const percentageScore = calculatePercentageScore(matches.length, selectedPreferences.length);
  
  return percentageScore * weight;
};

/**
 * Calcula o score de características para um produto
 * @param {Object} product - Produto a ser avaliado
 * @param {string[]} selectedFeatures - Características selecionadas
 * @param {number} weight - Peso das características no cálculo final
 * @returns {number} Score ponderado das características
 */
export const calculateFeatureScore = (product, selectedFeatures, weight) => {
  if (!selectedFeatures || selectedFeatures.length === 0) return 0;
  
  const productFeatures = product.features || [];
  const matches = findMatchingCriteria(selectedFeatures, productFeatures);
  const percentageScore = calculatePercentageScore(matches.length, selectedFeatures.length);
  
  return percentageScore * weight;
};

/**
 * Normaliza o score total para uma escala de 0-100
 * @param {number} totalScore - Score total calculado
 * @param {number} totalWeight - Peso total usado no cálculo
 * @returns {number} Score normalizado e arredondado
 */
export const normalizeScore = (totalScore, totalWeight) => {
  if (totalWeight === 0) return 0;
  return Math.round(totalScore / totalWeight);
};

/**
 * Cria os detalhes de match para um produto
 * @param {Object} product - Produto avaliado
 * @param {string[]} selectedPreferences - Preferências selecionadas
 * @param {string[]} selectedFeatures - Características selecionadas
 * @returns {Object} Detalhes dos matches encontrados
 */
export const createMatchDetails = (product, selectedPreferences, selectedFeatures) => {
  const productPreferences = product.preferences || [];
  const productFeatures = product.features || [];
  
  const preferenceMatches = findMatchingCriteria(selectedPreferences, productPreferences);
  const featureMatches = findMatchingCriteria(selectedFeatures, productFeatures);
  
  return {
    preferences: preferenceMatches,
    features: featureMatches,
    totalMatches: preferenceMatches.length + featureMatches.length
  };
};
