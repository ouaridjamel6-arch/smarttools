import React, { useState, useEffect } from 'react';
import {
  Lightbulb,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { RecommendationsService } from '../../services/recommendationsService';
import { GrowthRecommendation, Language } from '../../types';
import { useI18n } from '../../i18n/I18nContext';

interface RecommendationsTabProps {
  onNavigateTab: (tabId: string) => void;
}

export const RecommendationsTab: React.FC<RecommendationsTabProps> = ({ onNavigateTab }) => {
  const { language } = useI18n();
  const [recommendations, setRecommendations] = useState<GrowthRecommendation[]>([]);

  useEffect(() => {
    setRecommendations(RecommendationsService.generateRecommendations());
  }, []);

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'critical':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'high':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'medium':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const toggleStatus = (id: string) => {
    setRecommendations((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: r.status === 'completed' ? 'pending' : 'completed' } : r
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-indigo-600" />
          <span>Algorithmic Growth Recommendations Engine</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Heuristic growth suggestions generated from live SEO checks, keyword coverage, language gaps, and audience data.
        </p>
      </div>

      {/* Recommendations Cards */}
      <div className="space-y-4">
        {recommendations.map((rec) => {
          const isDone = rec.status === 'completed';
          return (
            <div
              key={rec.id}
              className={`p-6 rounded-3xl border transition space-y-4 ${
                isDone
                  ? 'bg-slate-50/70 border-slate-200 opacity-60'
                  : 'bg-white dark:bg-slate-900 border-slate-200 shadow-sm hover:border-indigo-500/50'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${getPriorityBadge(
                      rec.priority
                    )}`}
                  >
                    {rec.priority} Priority
                  </span>
                  <span className="text-xs uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    {rec.category}
                  </span>
                </div>

                <button
                  onClick={() => toggleStatus(rec.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isDone ? 'Action Completed' : 'Mark as Done'}</span>
                </button>
              </div>

              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {rec.title[language] || rec.title.en}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Problem & Data */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div>
                    <span className="font-bold text-rose-700 block text-[11px] uppercase">
                      Problem Detected:
                    </span>
                    <span className="text-slate-700">
                      {rec.problemDetected[language] || rec.problemDetected.en}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 block text-[11px] uppercase">
                      Underlying Data:
                    </span>
                    <span className="font-mono text-slate-600">
                      {rec.dataUsed[language] || rec.dataUsed.en}
                    </span>
                  </div>
                </div>

                {/* Recommendation & Hypothesis */}
                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
                  <div>
                    <span className="font-bold text-indigo-800 block text-[11px] uppercase">
                      Prescribed Action:
                    </span>
                    <span className="text-indigo-950 font-medium">
                      {rec.recommendedAction[language] || rec.recommendedAction.en}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-800 block text-[11px] uppercase">
                      Expected Outcome (Hypothesis):
                    </span>
                    <span className="text-emerald-950 italic">
                      {rec.expectedOutcome[language] || rec.expectedOutcome.en}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
