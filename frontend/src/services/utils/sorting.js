
import { RECOMMENDATION_TYPES, MINIMUM_RELEVANCE_SCORE } from '../constants/scoring.js';

/**
 * Função de comparação para ordenar produtos por relevância
 * @param {Object} productA - Primeiro produto
 * @param {Object} productB - Segundo produto
 * @returns {number} Valor de comparação para ordenação
 */
const compareProductsByRelevance = (productA, productB) => {
  if (productB.relevanceScore !== productA.relevanceScore) {
    return productB.relevanceScore - productA.relevanceScore;
  }
  
  if (productB.matchDetails.totalMatches !== productA.matchDetails.totalMatches) {
    return productB.matchDetails.totalMatches - productA.matchDetails.totalMatches;
  }
  
  return productB.id - productA.id;
};

/**
 * Ordena produtos por relevância usando critérios múltiplos
 * @param {Array} products - Lista de produtos com scores calculados
 * @returns {Array} Lista ordenada de produtos
 */
export const sortProductsByRelevance = (products) => {
  return [...products].sort(compareProductsByRelevance);
};

/**
 * Filtra produtos baseado no tipo de recomendação
 * @param {Array} sortedProducts - Lista ordenada de produtos
 * @param {string} recommendationType - Tipo de recomendação desejado
 * @returns {Array} Lista filtrada de produtos
 */
export const filterByRecommendationType = (sortedProducts, recommendationType) => {
  switch (recommendationType) {
    case RECOMMENDATION_TYPES.SINGLE_PRODUCT:
      return sortedProducts.length > 0 ? [sortedProducts[0]] : [];
      
    case RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS:
      return sortedProducts.filter(product => product.relevanceScore > MINIMUM_RELEVANCE_SCORE);
      
    default:
      return sortedProducts;
  }
};
