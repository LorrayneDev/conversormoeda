import { NextRequest, NextResponse } from 'next/server';

interface ConversionRequest {
  amount: number;
  from: string;
  to: string;
}

interface ExchangeRateResponse {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

export async function POST(request: NextRequest) {
  try {
    const body: ConversionRequest = await request.json();

    // Validação dos parâmetros
    if (!body.amount || body.amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'O valor deve ser maior que zero'
        },
        { status: 400 }
      );
    }

    if (!body.from || !body.to) {
      return NextResponse.json(
        {
          success: false,
          error: 'Moedas de origem e destino são obrigatórias'
        },
        { status: 400 }
      );
    }

    if (body.from === body.to) {
      return NextResponse.json({
        success: true,
        data: {
          from: body.from,
          to: body.to,
          amount: body.amount,
          result: body.amount,
          rate: 1,
          timestamp: new Date().toISOString()
        }
      });
    }

    // Consumir a Frankfurter API (gratuita, open-source, sem API key)
    // API: https://api.frankfurter.app
    const apiUrl = `https://api.frankfurter.app/latest?from=${body.from}&to=${body.to}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 400) {
        return NextResponse.json(
          {
            success: false,
            error: 'Moeda não suportada pela API de câmbio'
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: `Erro na API de câmbio (${response.status})`
        },
        { status: 500 }
      );
    }

    const data: ExchangeRateResponse = await response.json();

    // Verificar se a moeda de destino existe nas taxas
    if (!data.rates[body.to]) {
      return NextResponse.json(
        {
          success: false,
          error: `Taxa de câmbio não encontrada para ${body.to}`
        },
        { status: 404 }
      );
    }

    const rate = data.rates[body.to];
    const result = body.amount * rate;

    return NextResponse.json({
      success: true,
      data: {
        from: body.from,
        to: body.to,
        amount: body.amount,
        result: result,
        rate: rate,
        date: data.date,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Erro ao converter moedas:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao realizar conversão. Tente novamente.'
      },
      { status: 500 }
    );
  }
}
