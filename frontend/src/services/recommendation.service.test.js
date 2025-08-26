import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('recommendationService', () => {
  test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
    expect(recommendations[0].relevanceScore).toBeGreaterThan(0);
  });

  test('Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
    expect(recommendations[0].relevanceScore).toBeGreaterThan(recommendations[1].relevanceScore);
  });

  test('Retorna apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
    expect(recommendations[0].relevanceScore).toBeGreaterThan(0);
  });

  test('Retorna o último match em caso de empate para SingleProduct', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing', 'Integração com chatbots'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
    expect(recommendations[0].relevanceScore).toBeGreaterThan(0);
  });

  test('Retorna todos os produtos quando não há seleções', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(4);
    expect(recommendations[0].relevanceScore).toBe(0);
  });

  test('Inclui score de relevância e detalhes de matches nos resultados', () => {
    const formData = {
      selectedPreferences: ['Integração fácil com ferramentas de e-mail'],
      selectedFeatures: ['Gestão de leads e oportunidades'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations[0].relevanceScore).toBeDefined();
    expect(recommendations[0].matchDetails).toBeDefined();
    expect(recommendations[0].matchDetails.preferences).toContain('Integração fácil com ferramentas de e-mail');
    expect(recommendations[0].matchDetails.features).toContain('Gestão de leads e oportunidades');
  });

  test('Retorna array vazio quando não há produtos', () => {
    const formData = {
      selectedPreferences: ['Integração fácil com ferramentas de e-mail'],
      selectedFeatures: ['Gestão de leads e oportunidades'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(formData, []);
    expect(recommendations).toHaveLength(0);
  });

  test('Retorna array vazio quando produtos é undefined', () => {
    const formData = {
      selectedPreferences: ['Integração fácil com ferramentas de e-mail'],
      selectedFeatures: ['Gestão de leads e oportunidades'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(formData, undefined);
    expect(recommendations).toHaveLength(0);
  });

  test('Retorna array vazio quando produtos é null', () => {
    const formData = {
      selectedPreferences: ['Integração fácil com ferramentas de e-mail'],
      selectedFeatures: ['Gestão de leads e oportunidades'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(formData, null);
    expect(recommendations).toHaveLength(0);
  });

  test('Lida com formData undefined usando valores padrão', () => {
    const recommendations = recommendationService.getRecommendations(undefined, mockProducts);
    
    expect(recommendations).toHaveLength(4);
    expect(recommendations[0].relevanceScore).toBe(0);
  });

  test('Lida com formData null usando valores padrão', () => {
    const recommendations = recommendationService.getRecommendations(null, mockProducts);
    
    expect(recommendations).toHaveLength(4);
    expect(recommendations[0].relevanceScore).toBe(0);
  });

  test('Retorna produto com apenas matches de preferências', () => {
    const formData = {
      selectedPreferences: ['Integração fácil com ferramentas de e-mail'],
      selectedFeatures: [],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(formData, mockProducts);
    
    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station CRM');
    expect(recommendations[0].relevanceScore).toBeGreaterThan(0);
  });

  test('Retorna produto com apenas matches de features', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: ['Gestão de leads e oportunidades'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(formData, mockProducts);
    
    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station CRM');
    expect(recommendations[0].relevanceScore).toBeGreaterThan(0);
  });

  test('Lida com tipo de recomendação inválido retornando todos os produtos', () => {
    const formData = {
      selectedPreferences: ['Integração fácil com ferramentas de e-mail'],
      selectedFeatures: ['Gestão de leads e oportunidades'],
      selectedRecommendationType: 'TipoInvalido',
    };

    const recommendations = recommendationService.getRecommendations(formData, mockProducts);
    
    expect(recommendations).toHaveLength(4);
    expect(recommendations[0].relevanceScore).toBeGreaterThan(0);
  });

  test('Lida com produtos sem arrays de preferences ou features', () => {
    const productsWithoutArrays = [
      {
        id: 1,
        name: 'Produto Teste',
        category: 'Teste',
        preferences: undefined,
        features: null,
      },
    ];

    const formData = {
      selectedPreferences: ['Preferência'],
      selectedFeatures: ['Feature'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(formData, productsWithoutArrays);
    
    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].relevanceScore).toBe(0);
  });

});
