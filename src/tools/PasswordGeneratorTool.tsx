import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Check, ShieldCheck, ShieldAlert, Key } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { AnalyticsService } from '../services/analyticsService';

export const PasswordGeneratorTool: React.FC = () => {
  const { t, language } = useI18n();
  const [length, setLength] = useState<number>(18);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = () => {
    let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lower = 'abcdefghijklmnopqrstuvwxyz';
    let numbers = '0123456789';
    let symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excludeAmbiguous) {
      upper = upper.replace(/[IO]/g, '');
      lower = lower.replace(/[lo]/g, '');
      numbers = numbers.replace(/[01]/g, '');
    }

    let charPool = '';
    if (includeUpper) charPool += upper;
    if (includeLower) charPool += lower;
    if (includeNumbers) charPool += numbers;
    if (includeSymbols) charPool += symbols;

    if (!charPool) {
      setPassword('');
      return;
    }

    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    let res = '';
    for (let i = 0; i < length; i++) {
      res += charPool[randomValues[i] % charPool.length];
    }

    setPassword(res);
    AnalyticsService.trackToolUse('password-generator', 'generate_password');
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols, excludeAmbiguous]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Strength score
  const getStrength = () => {
    let score = 0;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;
    if (length >= 24) score += 1;
    if (includeUpper) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 1;

    if (score <= 2) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600', percent: 25 };
    if (score <= 4) return { label: 'Medium', color: 'bg-amber-500', text: 'text-amber-600', percent: 60 };
    if (score <= 5) return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600', percent: 85 };
    return { label: 'Military Grade', color: 'bg-indigo-600', text: 'text-indigo-600', percent: 100 };
  };

  const strength = getStrength();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Generated Display Box */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="relative flex items-center bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200">
          <input
            type="text"
            readOnly
            value={password}
            className="w-full bg-transparent font-mono text-xl sm:text-2xl text-slate-800 dark:text-slate-100 font-bold outline-none tracking-wider pr-24"
          />
          <div className="absolute right-3 flex items-center gap-2">
            <button
              onClick={generatePassword}
              title="Regenerate"
              className="p-2.5 rounded-xl hover:bg-slate-200 text-slate-600 transition"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition active:scale-95 shadow-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t('common.copied') : t('common.copy')}</span>
            </button>
          </div>
        </div>

        {/* Strength Meter Bar */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
            <span>{language === 'ar' ? 'مستوى الحماية' : language === 'fr' ? 'Niveau de robustesse' : 'Strength Meter'}</span>
            <span className={strength.text}>{strength.label}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${strength.color}`}
              style={{ width: `${strength.percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Configuration Options */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
            <span>{language === 'ar' ? 'طول كلمة السر' : language === 'fr' ? 'Longueur du mot de passe' : 'Password Length'}</span>
            <span className="font-mono text-indigo-600 text-base font-bold">{length} chars</span>
          </div>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {[
            { id: 'upper', label: language === 'ar' ? 'حروف كبيرة (A-Z)' : language === 'fr' ? 'Majuscules (A-Z)' : 'Uppercase (A-Z)', val: includeUpper, set: setIncludeUpper },
            { id: 'lower', label: language === 'ar' ? 'حروف صغيرة (a-z)' : language === 'fr' ? 'Minuscules (a-z)' : 'Lowercase (a-z)', val: includeLower, set: setIncludeLower },
            { id: 'numbers', label: language === 'ar' ? 'أرقام (0-9)' : language === 'fr' ? 'Chiffres (0-9)' : 'Numbers (0-9)', val: includeNumbers, set: setIncludeNumbers },
            { id: 'symbols', label: language === 'ar' ? 'رموز خاصة (!@#$)' : language === 'fr' ? 'Symboles (!@#$)' : 'Symbols (!@#$)', val: includeSymbols, set: setIncludeSymbols },
          ].map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition select-none"
            >
              <input
                type="checkbox"
                checked={opt.val}
                onChange={(e) => opt.set(e.target.checked)}
                className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{opt.label}</span>
            </label>
          ))}
        </div>

        <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition select-none">
          <input
            type="checkbox"
            checked={excludeAmbiguous}
            onChange={(e) => setExcludeAmbiguous(e.target.checked)}
            className="w-5 h-5 rounded text-indigo-600 accent-indigo-600"
          />
          <div className="text-sm">
            <span className="font-medium text-slate-700 dark:text-slate-200 block">
              {language === 'ar' ? 'تجنب الحروف المتشابهة' : language === 'fr' ? 'Éviter les caractères ambigus' : 'Exclude Ambiguous Characters'}
            </span>
            <span className="text-xs text-slate-500">
              {language === 'ar' ? 'استبعاد 1, l, I, 0, O لتسهيل القراءة' : language === 'fr' ? 'Exclut 1, l, I, 0, O pour éviter les confusions' : 'Excludes 1, l, I, 0, O for easy manual typing'}
            </span>
          </div>
        </label>
      </div>
    </div>
  );
};
