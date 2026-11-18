import React, { useState } from 'react';
import { Video, Clock, Copy, Check, Sparkles, RefreshCw, Film } from 'lucide-react';
import { VideoScriptService } from '../../services/videoScriptService';
import { TOOLS_DATA } from '../../data/toolsData';
import { Language, VideoScript } from '../../types';

export const VideoScriptTab: React.FC = () => {
  const [selectedToolId, setSelectedToolId] = useState<string>('image-compressor');
  const [duration, setDuration] = useState<15 | 30 | 60>(30);
  const [scriptLang, setScriptLang] = useState<Language>('en');
  const [script, setScript] = useState<VideoScript>(() => {
    return VideoScriptService.generateScript(TOOLS_DATA[1], 30);
  });
  const [copied, setCopied] = useState<boolean>(false);

  const selectedTool = TOOLS_DATA.find((t) => t.id === selectedToolId) || TOOLS_DATA[0];

  const handleGenerate = () => {
    const res = VideoScriptService.generateScript(selectedTool, duration);
    setScript(res);
  };

  const handleCopyScript = () => {
    let out = `🎬 ${script.topic[scriptLang]} (${duration}s)\n\n`;
    out += `--- SCENE BY SCENE STORYBOARD ---\n\n`;
    script.scenes.forEach((s) => {
      out += `[${s.timeSeconds}] Scene ${s.sceneNumber}: ${s.name[scriptLang]}\n`;
      out += `Visual: ${s.visualDescription[scriptLang]}\n`;
      out += `Text On Screen: ${s.screenText[scriptLang]}\n`;
      out += `Voiceover: "${s.spokenVoiceover[scriptLang]}"\n\n`;
    });
    out += `--- DESCRIPTION & HASHTAGS ---\n`;
    out += `${script.videoDescription[scriptLang]}\n`;
    out += `${script.hashtags[scriptLang].join(' ')}`;

    navigator.clipboard.writeText(out);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Film className="w-5 h-5 text-indigo-600" />
          <span>Short Video Script Studio (TikTok • Reels • Shorts)</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Prepare 15, 30, and 60-second viral video storyboards with scene cues, on-screen text, spoken scripts, and hashtags in 3 languages.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Target Tool
            </label>
            <select
              value={selectedToolId}
              onChange={(e) => setSelectedToolId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800"
            >
              {TOOLS_DATA.map((t) => (
                <option key={t.id} value={t.id}>{t.name.en}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Video Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[15, 30, 60].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d as any)}
                  className={`py-2 text-xs font-bold rounded-xl border transition ${
                    duration === d
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {d}s
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Script Language
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['en', 'fr', 'ar'] as Language[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setScriptLang(l)}
                  className={`py-2 text-xs font-bold rounded-xl border transition ${
                    scriptLang === l
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-100 transition active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Generate Storyboard Script</span>
        </button>
      </div>

      {/* Storyboard View */}
      <div
        dir={scriptLang === 'ar' ? 'rtl' : 'ltr'}
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
              {duration} Seconds Script
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {script.topic[scriptLang]}
            </h3>
          </div>

          <button
            onClick={handleCopyScript}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Full Script!' : 'Copy Entire Storyboard'}</span>
          </button>
        </div>

        {/* 5 Scenes */}
        <div className="space-y-4">
          {script.scenes.map((scene) => (
            <div
              key={scene.sceneNumber}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
            >
              <div className="md:col-span-3 space-y-1">
                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  {scene.timeSeconds}
                </span>
                <h4 className="font-bold text-slate-800 text-sm">
                  Scene {scene.sceneNumber}: {scene.name[scriptLang]}
                </h4>
              </div>

              <div className="md:col-span-9 space-y-2 text-xs">
                <div>
                  <span className="font-bold text-slate-500 block">Visual Cue / Camera Action:</span>
                  <span className="text-slate-700">{scene.visualDescription[scriptLang]}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <span className="font-bold text-indigo-700 block text-[11px]">On-Screen Text Overlay:</span>
                  <span className="font-bold text-slate-900">{scene.screenText[scriptLang]}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                  <span className="font-bold text-emerald-800 block text-[11px]">Spoken Voiceover:</span>
                  <span className="italic text-emerald-950 font-medium">"{scene.spokenVoiceover[scriptLang]}"</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Caption & Hashtags */}
        <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
          <span className="text-xs font-bold text-indigo-900 block">
            Suggested Social Post Caption & Tags:
          </span>
          <p className="text-xs text-indigo-950 leading-relaxed">
            {script.videoDescription[scriptLang]}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {script.hashtags[scriptLang].map((tag, i) => (
              <span key={i} className="text-xs font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-md shadow-2xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
