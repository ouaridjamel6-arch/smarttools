import React, { useState, useMemo } from 'react';
import { Copy, Trash2, Check, Clock, Mic, FileText, Hash } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { AnalyticsService } from '../services/analyticsService';

export const WordCounterTool: React.FC = () => {
  const { t, language } = useI18n();
  const [text, setText] = useState<string>(
    'SMARTTOOLS is a modern, fast, and 100% private productivity suite. All operations run directly inside your web browser without sending files to external servers. Boost your daily workflow with our free online utilities!'
  );
  const [copied, setCopied] = useState<boolean>(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTimeMinutes: 0,
        speakingTimeMinutes: 0,
        density: [],
      };
    }

    // Words count (handles international unicode words including Arabic)
    const wordsArray = trimmed.match(/[\p{L}\p{N}_'-]+/gu) || [];
    const words = wordsArray.length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s+/g, '').length;

    // Sentences
    const sentences = (text.match(/[^.!?؟]+[.!?؟]+(\s|$)/g) || [1]).length;

    // Paragraphs
    const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0).length;

    // Reading time: 200 wpm, speaking time: 130 wpm
    const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));
    const speakingTimeMinutes = Math.max(1, Math.ceil(words / 130));

    // Keyword density
    const frequencyMap: Record<string, number> = {};
    const stopWords = new Set(['the', 'and', 'a', 'to', 'of', 'in', 'is', 'it', 'you', 'that', 'with', 'for', 'on', 'le', 'la', 'les', 'de', 'du', 'et', 'un', 'une', 'في', 'من', 'على', 'إلى', 'أن', 'هو', 'هي']);

    wordsArray.forEach((w) => {
      const lower = w.toLowerCase();
      if (lower.length > 2 && !stopWords.has(lower)) {
        frequencyMap[lower] = (frequencyMap[lower] || 0) + 1;
      }
    });

    const density = Object.entries(frequencyMap)
      .map(([word, count]) => ({
        word,
        count,
        percent: words > 0 ? parseFloat(((count / words) * 100).toFixed(1)) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTimeMinutes,
      speakingTimeMinutes,
      density,
    };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    AnalyticsService.trackToolUse('word-counter', 'copy_text');
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { label: language === 'ar' ? 'الكلمات' : language === 'fr' ? 'Mots' : 'Words', value: stats.words, icon: FileText, color: 'text-indigo-600' },
          { label: language === 'ar' ? 'الأحرف' : language === 'fr' ? 'Caractères' : 'Characters', value: stats.characters, icon: Hash, color: 'text-cyan-600' },
          { label: language === 'ar' ? 'بدون مسافات' : language === 'fr' ? 'Sans espaces' : 'No Spaces', value: stats.charactersNoSpaces, icon: Hash, color: 'text-emerald-600' },
          { label: language === 'ar' ? 'الجمل' : language === 'fr' ? 'Phrases' : 'Sentences', value: stats.sentences, icon: FileText, color: 'text-amber-600' },
          { label: language === 'ar' ? 'زمن القراءة' : language === 'fr' ? 'Temps lecture' : 'Reading Time', value: `~${stats.readingTimeMinutes} min`, icon: Clock, color: 'text-violet-600' },
          { label: language === 'ar' ? 'زمن الإلقاء' : language === 'fr' ? 'Temps élocution' : 'Speaking Time', value: `~${stats.speakingTimeMinutes} min`, icon: Mic, color: 'text-rose-600' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <span className="text-xs text-slate-500 font-medium">{item.label}</span>
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-2">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Editor & Actions */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <label htmlFor="word-counter-input" className="text-sm font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
            {language === 'ar' ? 'محرر النصوص التفاعلي' : language === 'fr' ? 'Éditeur de texte en direct' : 'Live Text Editor'}
          </label>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t('common.copied') : t('common.copy')}</span>
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-xs font-medium text-slate-700 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t('common.reset')}</span>
            </button>
          </div>
        </div>

        <textarea
          id="word-counter-input"
          name="textToAnalyze"
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={language === 'ar' ? 'اكتب أو الصق النص هنا لحسابه وتحليله...' : language === 'fr' ? 'Tapez ou collez votre texte ici...' : 'Type or paste your text here to count...'}
          aria-label={language === 'ar' ? 'محرر النصوص لحساب الكلمات' : language === 'fr' ? 'Éditeur de texte pour le comptage de mots' : 'Text input for word and character counting'}
          className="w-full p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-slate-800 leading-relaxed font-sans text-base"
        />
      </div>

      {/* Keyword Density Breakdown */}
      {stats.density.length > 0 && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">
            {language === 'ar' ? 'كثافة الكلمات المفتاحية الأكثر تكراراً' : language === 'fr' ? 'Densité des mots-clés principaux' : 'Top Keyword Frequency & Density'}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.density.map((d, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="font-medium text-slate-700 text-sm">{d.word}</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                  {d.count} ({d.percent}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
