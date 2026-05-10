import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../context/GlobalStateContext';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const playAudioFromText = async (text) => {
  const encodedText = encodeURIComponent(text);
  const googleTTSUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodedText}&tl=en/`;
  const audio = new Audio(googleTTSUrl);
  audio.crossOrigin = 'anonymous';
  return new Promise((resolve, reject) => {
    audio.onended = resolve;
    audio.onerror = reject;
    audio.play().catch(reject);
  });
};

const VoiceAssistant = () => {
  const navigate = useNavigate();
  const { Togg, setTogg, updateQuantity, logout, login, foodData } = useContext(GlobalStateContext);

  const [isListening, setIsListening] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechMethod, setSpeechMethod] = useState('native');
  const [hasGreeted, setHasGreeted] = useState(false);
  const [loginStep, setLoginStep] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [transcriptTimeout, setTranscriptTimeout] = useState(null);
  const [processedCommands, setProcessedCommands] = useState([]);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const voices = speechSynthesis.getVoices();
      setSpeechMethod(voices.length > 0 ? 'native' : 'google');
    } else {
      setSpeechMethod('google');
    }

    if (!hasGreeted && !Togg) {
      setTimeout(() => {
        const greeting = "Hello! I am your voice assistant. How can I help you today?";
        setAssistantResponse(greeting);
        speakResponse(greeting);
        setHasGreeted(true);
      }, 1000);
    }
  }, []); 

  // ── TTS ────────────────────────────────────────────────────────────────────
  const speakResponse = useCallback(async (text) => {
    setIsSpeaking(true);
    try {
      if (speechMethod === 'native') {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        utterance.lang = 'en-IN';
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => {
          setIsSpeaking(false);
          setSpeechMethod('google');
          speakResponse(text);
        };
        window.speechSynthesis.speak(utterance);
      } else {
        await playAudioFromText(text).catch(console.error);
        setIsSpeaking(false);
      }
    } catch {
      setIsSpeaking(false);
    }
  }, [speechMethod]);

  const handleLogin = async (email, password) => {
    try {
      const res = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.user);
        speakResponse('Login successful. How can I help you?');
      } else {
        speakResponse('Login failed. Please try again.');
      }
    } catch {
      speakResponse('Login failed. Please try again.');
    } finally {
      setLoginStep(null);
      setLoginEmail('');
    }
  };

  const handleCommand = useCallback(async (commandData) => {
    switch (commandData.command) {
      case 'FILTER':
        navigate('/');
        setTimeout(() => {
          document.getElementById('items')?.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            const btns = document.querySelectorAll('.category-btn');
            for (const btn of btns) {
              if (btn.textContent === commandData.category) {
                btn.click();
                break;
              }
            }
          }, 300);
        }, 300);
        break;

      case 'NAVIGATE':
        navigate(commandData.path);
        if (commandData.path === '/#items') {
          setTimeout(() => {
            document.getElementById('items')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
        break;

      case 'ORDER':
        if (commandData.items?.length) {
          for (const item of commandData.items) {
            const foodItem = foodData.find(f =>
              f.FoodName.toLowerCase().includes(item.name.toLowerCase())
            );
            if (foodItem) {
              for (let i = 0; i < item.quantity; i++) {
                await updateQuantity(foodItem.FoodID, 1);
              }
            }
          }
        }
        break;

      case 'REMOVE':
        if (commandData.items?.length) {
          for (const item of commandData.items) {
            const foodItem = foodData.find(f =>
              f.FoodName.toLowerCase().includes(item.name.toLowerCase())
            );
            if (foodItem) {
              for (let i = 0; i < item.quantity; i++) {
                await updateQuantity(foodItem.FoodID, -1);
              }
            }
          }
        }
        break;

      case 'LOGOUT':
        await logout();
        speakResponse('Logged out successfully');
        break;

      default:
        break;
    }
  }, [navigate, foodData, updateQuantity, logout]);

  const processVoiceCommand = useCallback(async (command) => {
    setIsProcessing(true);
    try {
      const res = await fetch('http://localhost:8000/voice/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: command }),
      });
      const data = await res.json();

      if (data.aiResponse) {
        setAssistantResponse(data.aiResponse.response);
        speakResponse(data.aiResponse.response);

        if (data.aiResponse.command === 'NAVIGATE' && data.aiResponse.page === 'login') {
          setLoginStep('awaiting_email');
          speakResponse('Please say your email');
        } else {
          await handleCommand(data.aiResponse);
        }
      } else {
        setAssistantResponse('Sorry, I encountered an error.');
        speakResponse('Sorry, I encountered an error.');
      }
    } catch {
      setAssistantResponse('Sorry, I could not connect to the server.');
      speakResponse('Sorry, I could not connect to the server.');
    } finally {
      setIsProcessing(false);
    }
  }, [speakResponse, handleCommand]);

  const processTranscript = useCallback(async (text) => {
    if (!text || processedCommands.includes(text)) return;
    setProcessedCommands(prev => [...prev, text]);

    if (loginStep === 'awaiting_email') {
      setLoginEmail(text);
      setLoginStep('awaiting_password');
      speakResponse('Please say your password');
      return;
    }
    if (loginStep === 'awaiting_password') {
      await handleLogin(loginEmail, text);
      return;
    }

    await processVoiceCommand(text);
  }, [processedCommands, loginStep, loginEmail, speakResponse, processVoiceCommand]);

  useEffect(() => {
    if (!transcript || !isListening) return;
    if (transcriptTimeout) clearTimeout(transcriptTimeout);

    const timeout = setTimeout(() => processTranscript(transcript), 2000);
    setTranscriptTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [transcript, isListening]); 

  useEffect(() => {
    if (!listening && transcript && isListening) {
      const timer = setTimeout(stopListening, 1000);
      return () => clearTimeout(timer);
    }
  }, [listening, transcript, isListening]); 

  const startListening = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setIsListening(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    if (transcript && !processedCommands.includes(transcript)) {
      processTranscript(transcript);
    }
  };

  const openAssistant = () => setTogg(true);

  const closeAssistant = () => {
    window.speechSynthesis?.cancel();
    setTogg(false);
    setIsListening(false);
    setAssistantResponse('');
    setProcessedCommands([]);
    setLoginStep(null);
    setLoginEmail('');
    resetTranscript();
  };

  if (!Togg) {
    return (
      <div className="fixed bottom-8 right-8 z-[999] flex flex-col items-center">
        <button 
          className="w-[70px] h-[70px] rounded-full bg-gradient-to-br from-[#4F6D7A] to-[#EAE0D5] border-none text-white text-3xl cursor-pointer shadow-[0_10px_25px_rgba(79,109,122,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-6 relative active:scale-95"
          onClick={openAssistant} 
          title="Open Voice Assistant"
        >
          <span>🎤</span>
          {isSpeaking && <span className="absolute inset-0 rounded-full bg-[#4F6D7A]/40 animate-ping"></span>}
        </button>
        {isSpeaking && (
          <div className="mt-2 bg-black/70 text-white px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold animate-pulse">
            🔊 Speaking...
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-[999] w-[350px] max-w-[calc(100vw-40px)] rounded-3xl bg-[#F5F5F5] p-6 shadow-2xl border border-[#4F6D7A15] font-sans animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-[#4F6D7A15]">
        <div>
            <h3 className="text-lg font-bold text-[#4F6D7A] flex items-center gap-2">
                🎤 Voice Assistant
            </h3>
            {speechMethod === 'google' && (
                <p className="text-[10px] text-[#B07D62] font-semibold uppercase tracking-wider">Using Google TTS</p>
            )}
        </div>
        <button 
          className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-90"
          onClick={closeAssistant}
        >
            ✕
        </button>
      </div>

      <div className="space-y-4">
        <button
          className={`w-full py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] ${
            isListening 
            ? 'bg-white text-[#221510] border-2 border-[#B07D62] animate-pulse' 
            : 'bg-gradient-to-r from-[#4F6D7A] to-[#B07D62] text-white hover:shadow-xl hover:translate-y-[-2px]'
          }`}
          onClick={isListening ? stopListening : startListening}
          disabled={isProcessing}
        >
          {isListening ? (
            <><span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span> Listening... Stop</>
          ) : isProcessing ? (
            <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Processing...</>
          ) : (
            <>🎤 Start Voice Command</>
          )}
        </button>

        {isListening && (
          <div className="flex items-center justify-center gap-3 py-2 bg-[#4F6D7A10] rounded-2xl animate-in fade-in duration-300">
            <div className="flex items-center gap-1 h-6">
                {[...Array(5)].map((_, i) => (
                    <div 
                        key={i} 
                        className="w-1 bg-[#4F6D7A] rounded-full animate-float"
                        style={{ height: `${12 + Math.random() * 12}px`, animationDelay: `${i * 0.15}s` }}
                    ></div>
                ))}
            </div>
            <span className="text-xs font-bold text-[#4F6D7A] uppercase tracking-wide">Speak now...</span>
          </div>
        )}

        {transcript && (
          <div className="bg-white p-4 rounded-2xl border-l-4 border-[#4F6D7A] shadow-sm">
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">You said:</div>
            <div className="text-sm text-[#221510] italic font-medium leading-relaxed">"{transcript}"</div>
          </div>
        )}

        {assistantResponse && (
          <div className="bg-white p-4 rounded-2xl border-l-4 border-[#B07D62] shadow-sm animate-in fade-in slide-in-from-left-2 duration-300">
            <div className="text-[10px] text-[#B07D62] font-bold uppercase tracking-widest mb-1">Assistant:</div>
            <div className="text-sm text-[#221510] font-semibold leading-relaxed mb-2">{assistantResponse}</div>
            {isSpeaking && (
              <div className="flex items-center gap-2 text-[#4F6D7A] text-[10px] font-bold uppercase animate-pulse">
                <span>🔊</span>
                {speechMethod === 'google' ? 'Playing Audio...' : 'Speaking...'}
              </div>
            )}
          </div>
        )}

        <div className="p-3 bg-[#4F6D7A08] rounded-xl border border-[#4F6D7A10]">
          <p className="text-[10px] text-gray-500 font-medium leading-relaxed italic">
            💡 <strong>Try:</strong> "Go to menu", "Show pizzas", "Add 2 burgers", "Go to cart", "Login", "Logout"
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
