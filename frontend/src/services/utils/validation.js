import { DEFAULT_FORM_DATA } from '../constants/scoring.js';

/**
 * Valida se a lista de produtos é válida
 * @param {Array} products - Lista de produtos a validar
 * @returns {boolean} True se a lista é válida
 */
export const isValidProductList = (products) => {
  return Array.isArray(products) && products.length > 0;
};

/**
 * Sanitiza e prepara os dados do formulário
 * @param {Object} formData - Dados do formulário
 * @returns {Object} Dados sanitizados com valores padrão
 */
export const sanitizeFormData = (formData) => {
  const safeFormData = formData || DEFAULT_FORM_DATA;
  
  return {
    selectedPreferences: safeFormData.selectedPreferences || DEFAULT_FORM_DATA.selectedPreferences,
    selectedFeatures: safeFormData.selectedFeatures || DEFAULT_FORM_DATA.selectedFeatures,
    selectedRecommendationType: safeFormData.selectedRecommendationType || DEFAULT_FORM_DATA.selectedRecommendationType
  };
};

/**
 * Verifica se há critérios de seleção ativos
 * @param {string[]} selectedPreferences - Preferências selecionadas
 * @param {string[]} selectedFeatures - Características selecionadas
 * @returns {boolean} True se há critérios ativos
 */
export const hasActiveCriteria = (selectedPreferences, selectedFeatures) => {
  return (selectedPreferences && selectedPreferences.length > 0) || 
         (selectedFeatures && selectedFeatures.length > 0);
};
