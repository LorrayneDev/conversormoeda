import { useEffect, useRef } from 'react';

export type SoundType = 'click' | 'hover' | 'loading' | 'success' | 'error';

interface UseSoundReturn {
  playSound: (type: SoundType) => void;
  isEnabled: boolean;
  toggleEnabled: () => void;
}

export function useSound(): UseSoundReturn {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isEnabledRef = useRef(true);

  // Inicializar AudioContext na primeira interação do usuário
  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  // Gerar sons usando Web Audio API (sintetizados, sem arquivos externos)
  const playSound = (type: SoundType) => {
    if (!isEnabledRef.current) return;

    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      switch (type) {
        case 'click':
          // Som de click futurista e curto
          playClickSound(ctx, now);
          break;
        case 'hover':
          // Som de hover suave
          playHoverSound(ctx, now);
          break;
        case 'loading':
          // Som de carregamento sutil
          playLoadingSound(ctx, now);
          break;
        case 'success':
          // Som de sucesso satisfatório (cash register moderno)
          playSuccessSound(ctx, now);
          break;
        case 'error':
          // Som de erro suave
          playErrorSound(ctx, now);
          break;
      }
    } catch (error) {
      console.error('Erro ao tocar som:', error);
    }
  };

  const playClickSound = (ctx: AudioContext, now: number) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Frequência inicial alta, caindo rapidamente
    oscillator.frequency.setValueAtTime(1200, now);
    oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.05);

    // Duração curta
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    oscillator.type = 'sine';
    oscillator.start(now);
    oscillator.stop(now + 0.05);
  };

  const playHoverSound = (ctx: AudioContext, now: number) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Som muito sutil de hover
    oscillator.frequency.setValueAtTime(800, now);
    oscillator.frequency.exponentialRampToValueAtTime(900, now + 0.03);

    gainNode.gain.setValueAtTime(0.02, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    oscillator.type = 'sine';
    oscillator.start(now);
    oscillator.stop(now + 0.03);
  };

  const playLoadingSound = (ctx: AudioContext, now: number) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Som de "energia" subindo
    oscillator.frequency.setValueAtTime(200, now);
    oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.15);

    gainNode.gain.setValueAtTime(0.05, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    oscillator.type = 'triangle';
    oscillator.start(now);
    oscillator.stop(now + 0.15);
  };

  const playSuccessSound = (ctx: AudioContext, now: number) => {
    // Som satisfatório de sucesso (cash register moderno)
    // Primeiro "ding"
    const oscillator1 = ctx.createOscillator();
    const gain1 = ctx.createGain();

    oscillator1.connect(gain1);
    gain1.connect(ctx.destination);

    oscillator1.frequency.setValueAtTime(880, now);
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    oscillator1.type = 'sine';
    oscillator1.start(now);
    oscillator1.stop(now + 0.3);

    // Segundo "bling" harmônico
    const oscillator2 = ctx.createOscillator();
    const gain2 = ctx.createGain();

    oscillator2.connect(gain2);
    gain2.connect(ctx.destination);

    oscillator2.frequency.setValueAtTime(1174, now + 0.05);
    gain2.gain.setValueAtTime(0.1, now + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    oscillator2.type = 'sine';
    oscillator2.start(now + 0.05);
    oscillator2.stop(now + 0.35);

    // Terceiro "pling" harmônico
    const oscillator3 = ctx.createOscillator();
    const gain3 = ctx.createGain();

    oscillator3.connect(gain3);
    gain3.connect(ctx.destination);

    oscillator3.frequency.setValueAtTime(1760, now + 0.1);
    gain3.gain.setValueAtTime(0.08, now + 0.1);
    gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    oscillator3.type = 'sine';
    oscillator3.start(now + 0.1);
    oscillator3.stop(now + 0.4);
  };

  const playErrorSound = (ctx: AudioContext, now: number) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Som grave descendente indicando erro
    oscillator.frequency.setValueAtTime(300, now);
    oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.2);

    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    oscillator.type = 'sawtooth';
    oscillator.start(now);
    oscillator.stop(now + 0.2);
  };

  const toggleEnabled = () => {
    isEnabledRef.current = !isEnabledRef.current;
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    playSound,
    isEnabled: isEnabledRef.current,
    toggleEnabled
  };
}
