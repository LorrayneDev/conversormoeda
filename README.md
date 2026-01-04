# CurrencyX - Conversor de Moedas Web

## 🎯 Visão Geral

Um Conversor de Moedas moderno e interativo com design **Cyberpunk Suave** e micro-interações auditivas. Desenvolvido com Next.js 15, Tailwind CSS 4 e Web Audio API.

## ✨ Características

- **Tema Escuro**: Design cyberpunk suave com acentos em ciano e esmeralda
- **Micro-interações com Sons**: Feedback tátil e auditivo satisfatório
- **Taxas em Tempo Real**: Integração com Frankfurter API
- **Responsivo**: Funciona perfeitamente em mobile e desktop
- **30+ Moedas**: Cobertura global de moedas principais

## 🚀 Tecnologias

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript 5
- **Estilização**: Tailwind CSS 4
- **UI Components**: Radix UI (@radix-ui)
- **Ícones**: Lucide React
- **API de Câmbio**: Frankfurter API (gratuita e open-source)
- **Sons**: Web Audio API (nativa do browser)

## 📦 Instalação

```bash
# Instalar dependências
bun install

# Iniciar servidor de desenvolvimento
bun run dev

# Build para produção
bun run build

# Iniciar em produção
bun run start

# Lint
bun run lint
```

## 🌐 Acesse

Após iniciar o servidor, acesse: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
currencyx-converter/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── currencies/    # API: Lista de moedas
│   │   │   └── convert/       # API: Conversão
│   │   ├── layout.tsx           # Layout principal
│   │   ├── page.tsx             # Página do conversor
│   │   └── globals.css          # Estilos globais
│   ├── components/
│   │   └── ui/                 # Componentes UI
│   ├── hooks/
│   │   └── use-sound.ts        # Hook de sons
│   └── lib/
│       └── utils.ts             # Utilitários
├── public/                         # Arquivos estáticos
├── package.json                    # Dependências
└── tsconfig.json                   # Config TypeScript
```

## 🔌 APIs

### GET `/api/currencies`
Retorna lista de moedas disponíveis.

### POST `/api/convert`
Realiza conversão de moedas.

**Request:**
```json
{
  "amount": 100,
  "from": "USD",
  "to": "BRL"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "from": "USD",
    "to": "BRL",
    "amount": 100,
    "result": 543.84,
    "rate": 5.4384,
    "date": "2026-01-02"
  }
}
```

## 🎵 Sistema de Sons

O sistema usa Web Audio API para gerar sons sintéticos:
- **Click**: Som futurista curto
- **Hover**: Sutil feedback
- **Loading**: Energia subindo
- **Success**: Harmônicos satisfatórios
- **Error**: Feedback claro de erro

## 📝 Licença

MIT License

---

Desenvolvido com Next.js 15 e Tailwind CSS 4
