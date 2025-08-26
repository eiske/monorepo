import React from 'react';
import Checkbox from '../../shared/Checkbox';

function RecommendationType({ selectedValue = 'MultipleProducts', onRecommendationTypeChange }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Tipo de Recomendação:</h2>
      <div className="flex items-center">
        <Checkbox
          type="radio"
          name="recommendationType"
          value="SingleProduct"
          checked={selectedValue === 'SingleProduct'}
          onChange={() => onRecommendationTypeChange('SingleProduct')}
          className="mr-2"
        />
        <label htmlFor="SingleProduct" className="mr-4">Produto Único</label>
        <Checkbox
          type="radio"
          name="recommendationType"
          value="MultipleProducts"
          checked={selectedValue === 'MultipleProducts'}
          onChange={() => onRecommendationTypeChange('MultipleProducts')}
          className="mr-2"
        />
        <label htmlFor="MultipleProducts">Múltiplos Produtos</label>
      </div>
    </div>
  );
}

export default RecommendationType;
