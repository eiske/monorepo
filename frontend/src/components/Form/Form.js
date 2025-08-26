// Form.js

import React, { useCallback } from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';

function Form({ onSubmit }) {
  const { preferences, features } = useProducts();
  console.log({preferences, features});
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: 'MultipleProducts',
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    // Validar se há pelo menos uma seleção
    if (formData.selectedPreferences.length === 0 && formData.selectedFeatures.length === 0) {
      alert('Por favor, selecione pelo menos uma preferência ou funcionalidade para obter recomendações.');
      return;
    }
    
    // Validar se o tipo de recomendação foi selecionado
    if (!formData.selectedRecommendationType) {
      alert('Por favor, selecione um tipo de recomendação.');
      return;
    }
    
    // Chamar a função onSubmit passada como prop
    if (onSubmit) {
      onSubmit(formData);
    }
  }, [formData, onSubmit]);

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={preferences}
        selectedPreferences={formData.selectedPreferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />
      <Features
        features={features}
        selectedFeatures={formData.selectedFeatures}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
      <RecommendationType
        selectedValue={formData.selectedRecommendationType}
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />
      <SubmitButton text="Obter recomendação" />
    </form>
  );
}

export default Form;
