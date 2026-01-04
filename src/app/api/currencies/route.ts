import { NextRequest, NextResponse } from 'next/server';

// Moedas suportadas pela Frankfurter API (33 moedas)
interface Currency {
  code: string;
  name: string;
  symbol?: string;
}

const CURRENCIES: Currency[] = [
  { code: 'AUD', name: 'Dólar Australiano', symbol: '$' },
  { code: 'BRL', name: 'Real Brasileiro', symbol: 'R$' },
  { code: 'CAD', name: 'Dólar Canadense', symbol: '$' },
  { code: 'CHF', name: 'Franco Suíço', symbol: 'Fr' },
  { code: 'CNY', name: 'Yuan Chinês', symbol: '¥' },
  { code: 'CZK', name: 'Coroa Checa', symbol: 'Kč' },
  { code: 'DKK', name: 'Coroa Dinamarquesa', symbol: 'kr' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'Libra Esterlina', symbol: '£' },
  { code: 'HKD', name: 'Dólar de Hong Kong', symbol: '$' },
  { code: 'HUF', name: 'Forint Húngaro', symbol: 'Ft' },
  { code: 'IDR', name: 'Rúpia Indonésia', symbol: 'Rp' },
  { code: 'ILS', name: 'Shekel Israelense', symbol: '₪' },
  { code: 'INR', name: 'Rúpia Indiana', symbol: '₹' },
  { code: 'ISK', name: 'Coroa Islandesa', symbol: 'kr' },
  { code: 'JPY', name: 'Iene Japonês', symbol: '¥' },
  { code: 'KRW', name: 'Won Sul-Coreano', symbol: '₩' },
  { code: 'MXN', name: 'Peso Mexicano', symbol: '$' },
  { code: 'MYR', name: 'Ringgit Malaio', symbol: 'RM' },
  { code: 'NOK', name: 'Coroa Norueguesa', symbol: 'kr' },
  { code: 'NZD', name: 'Dólar Neozelandês', symbol: '$' },
  { code: 'PHP', name: 'Peso Filipino', symbol: '₱' },
  { code: 'PLN', name: 'Złoty Polonês', symbol: 'zł' },
  { code: 'RON', name: 'Leu Romeno', symbol: 'lei' },
  { code: 'SEK', name: 'Coroa Sueca', symbol: 'kr' },
  { code: 'SGD', name: 'Dólar de Singapura', symbol: '$' },
  { code: 'THB', name: 'Baht Tailandês', symbol: '฿' },
  { code: 'TRY', name: 'Lira Turca', symbol: '₺' },
  { code: 'USD', name: 'Dólar Americano', symbol: '$' },
  { code: 'ZAR', name: 'Rand Sul-Africano', symbol: 'R' },
];

export async function GET(request: NextRequest) {
  try {
    // Ordenar moedas por código para facilitar a busca
    const sortedCurrencies = CURRENCIES.sort((a, b) =>
      a.code.localeCompare(b.code)
    );

    return NextResponse.json({
      success: true,
      data: sortedCurrencies,
      count: sortedCurrencies.length
    });
  } catch (error) {
    console.error('Erro ao buscar moedas:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao buscar lista de moedas'
      },
      { status: 500 }
    );
  }
}
