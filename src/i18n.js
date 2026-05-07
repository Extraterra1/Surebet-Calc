import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      headerTitle: '3WaySurebet',
      enterDetails: 'Enter your details',
      totalBudget: 'Total Budget',
      budgetHelper: 'Amount available to stake across all outcomes',
      budgetError: 'Enter a valid amount',
      homeOdds: 'Home Odds',
      homeOddsError: 'Must be greater than 1.00',
      drawOdds: 'Draw Odds',
      drawOddsError: 'Must be greater than 1.00',
      awayOdds: 'Away Odds',
      awayOddsError: 'Must be greater than 1.00',
      clearAll: 'Clear all',
      yourResults: 'Your results',
      emptyState: 'Enter your budget and all three odds to see your optimal stakes.',
      worstCaseReturn: 'Worst case return',
      homeWins: 'Home wins',
      draw: 'Draw',
      awayWins: 'Away wins',
      totalStaked: 'Total staked',
      language: 'Language'
    }
  },
  'pt-PT': {
    translation: {
      headerTitle: '3WaySurebet',
      enterDetails: 'Insira os dados',
      totalBudget: 'Orçamento Total',
      budgetHelper: 'Montante disponível para distribuir pelas apostas',
      budgetError: 'Insira um valor válido',
      homeOdds: 'Odd Casa',
      homeOddsError: 'Deve ser maior que 1.00',
      drawOdds: 'Odd Empate',
      drawOddsError: 'Deve ser maior que 1.00',
      awayOdds: 'Odd Fora',
      awayOddsError: 'Deve ser maior que 1.00',
      clearAll: 'Limpar tudo',
      yourResults: 'Os seus resultados',
      emptyState: 'Insira o orçamento e as três odds para ver as suas apostas.',
      worstCaseReturn: 'Pior caso',
      homeWins: 'Casa ganha',
      draw: 'Empate',
      awayWins: 'Fora ganha',
      totalStaked: 'Total apostado',
      language: 'Idioma'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;