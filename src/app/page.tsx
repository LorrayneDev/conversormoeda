'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRightLeft, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useSound } from '@/hooks/use-sound';

interface Currency {
  code: string;
  name: string;
  symbol?: string;
}

interface ConversionResult {
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
  date: string;
  timestamp: string;
}

export default function Home() {
  const { playSound, isEnabled, toggleEnabled } = useSound();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState(false);
  const [amount, setAmount] = useState<string>('1000');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('BRL');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string>('');

  // Carregar lista de moedas
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('/api/currencies');
        const data = await response.json();

        if (data.success) {
          setCurrencies(data.data);
        } else {
          setError('Erro ao carregar moedas');
        }
      } catch (err) {
        setError('Erro ao carregar moedas');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  // Converter moedas
  const handleConvert = async () => {
    setError('');
    setResult(null);

    const amountValue = parseFloat(amount);
    if (!amountValue || amountValue <= 0) {
      setError('Por favor, insira um valor válido');
      playSound('error');
      return;
    }

    setConverting(true);
    playSound('loading');

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountValue,
          from: fromCurrency,
          to: toCurrency,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
        playSound('success');
      } else {
        setError(data.error || 'Erro ao converter');
        playSound('error');
      }
    } catch (err) {
      setError('Erro ao converter. Tente novamente.');
      playSound('error');
    } finally {
      setConverting(false);
    }
  };

  // Inverter moedas
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    playSound('click');
  };

  // Format number with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const getCurrencySymbol = (code: string) => {
    const currency = currencies.find((c) => c.code === code);
    return currency?.symbol || code;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="w-full border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl font-bold text-white">CurrencyX</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              toggleEnabled();
              playSound('click');
            }}
            className="text-slate-400 hover:text-cyan-400 hover:bg-slate-800"
          >
            {isEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 shadow-2xl shadow-cyan-500/10">
          <div className="p-6 space-y-6">
            {/* Title */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Conversor de Moedas
              </h2>
              <p className="text-slate-400 text-sm">
                Taxas de câmbio em tempo real
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
                <p className="mt-4 text-slate-400">Carregando moedas...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Valor
                  </label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      playSound('click');
                    }}
                    placeholder="Digite o valor"
                    className="bg-slate-800 border-slate-700 text-white text-lg font-semibold focus:border-cyan-500 focus:ring-cyan-500/20 transition-all"
                  />
                </div>

                {/* Currency Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto,1fr] gap-2 items-end">
                  {/* From Currency */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">
                      De
                    </label>
                    <Select
                      value={fromCurrency}
                      onValueChange={(value) => {
                        setFromCurrency(value);
                        playSound('click');
                      }}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white hover:border-cyan-500/50 transition-all">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 max-h-64 overflow-y-auto">
                        {currencies.map((currency) => (
                          <SelectItem
                            key={currency.code}
                            value={currency.code}
                            onMouseEnter={() => playSound('hover')}
                            className="text-white hover:bg-cyan-500/20 focus:bg-cyan-500/20"
                          >
                            {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Swap Button */}
                  <Button
                    onClick={handleSwap}
                    variant="outline"
                    size="icon"
                    className="mb-0.5 bg-slate-800 border-slate-700 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500 hover:text-cyan-300 transition-all"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </Button>

                  {/* To Currency */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">
                      Para
                    </label>
                    <Select
                      value={toCurrency}
                      onValueChange={(value) => {
                        setToCurrency(value);
                        playSound('click');
                      }}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white hover:border-emerald-500/50 transition-all">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 max-h-64 overflow-y-auto">
                        {currencies.map((currency) => (
                          <SelectItem
                            key={currency.code}
                            value={currency.code}
                            onMouseEnter={() => playSound('hover')}
                            className="text-white hover:bg-emerald-500/20 focus:bg-emerald-500/20"
                          >
                            {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Convert Button */}
                <Button
                  onClick={handleConvert}
                  disabled={converting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold py-6 text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all disabled:opacity-50"
                >
                  {converting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Convertendo...</span>
                    </div>
                  ) : (
                    'Converter'
                  )}
                </Button>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Result */}
                {result && (
                  <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-800/50 border border-cyan-500/30 rounded-lg p-6 space-y-4">
                      <div className="text-center space-y-2">
                        <p className="text-slate-400 text-sm">Resultado</p>
                        <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                          {getCurrencySymbol(result.to)}{' '}
                          {formatNumber(result.result)}
                        </p>
                      </div>

                      <div className="border-t border-slate-700 pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">
                            {getCurrencySymbol(result.from)} {formatNumber(result.amount)}
                          </span>
                          <span className="text-white">
                            {getCurrencySymbol(result.to)} {formatNumber(result.result)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Taxa</span>
                          <span className="text-cyan-400 font-medium">
                            1 {result.from} = {result.rate.toFixed(6)} {result.to}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Atualizado em</span>
                          <span>
                            {new Date(result.date).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-slate-500 text-sm">
            Desenvolvido com{' '}
            <span className="text-cyan-400">Next.js</span> &{' '}
            <span className="text-emerald-400">Tailwind CSS</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
