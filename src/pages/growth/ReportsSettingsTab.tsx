import React, { useState, useEffect } from 'react';
import {
  Settings,
  Download,
  Upload,
  Key,
  Shield,
  FileSpreadsheet,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { StorageService } from '../../services/storage';
import { SeoService } from '../../services/seoService';
import { GrowthSettings } from '../../types';

export const ReportsSettingsTab: React.FC = () => {
  const [settings, setSettings] = useState<GrowthSettings>(() => StorageService.getSettings());
  const [newPin, setNewPin] = useState('');
  const [pinSuccess, setPinSuccess] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveSettings(settings);
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 2500);
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPin.trim() || newPin.length < 4) {
      alert('PIN must be at least 4 digits');
      return;
    }
    const updated = { ...settings, adminPin: newPin.trim() };
    setSettings(updated);
    StorageService.saveSettings(updated);
    setNewPin('');
    setPinSuccess(true);
    setTimeout(() => setPinSuccess(false), 2500);
  };

  const handleDownloadBackup = () => {
    const jsonStr = StorageService.exportFullBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = `smarttools-growth-backup-${Date.now()}.json`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const res = StorageService.importFullBackup(reader.result);
        if (res.success) {
          setImportStatus('Backup restored successfully! Refreshing...');
          setTimeout(() => window.location.reload(), 1500);
        } else {
          setImportStatus('Error: ' + res.message);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleDownloadAdsTxt = () => {
    const content = SeoService.generateAdsTxt(settings.adsensePublisherId);
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = 'ads.txt';
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-600" />
          <span>System Settings, Backup & Security</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Configure admin access control, full JSON system backups, AdSense monetization, and data portability.
        </p>
      </div>

      {/* Backup & Restore Box */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Download className="w-4 h-4 text-indigo-600" />
          <span>System Backup & Restore (JSON / CSV)</span>
        </h3>
        <p className="text-xs text-slate-500">
          Export your entire growth database (keywords, editorial calendar, logged social campaigns, and settings) in one clean JSON file, or restore on another device.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={handleDownloadBackup}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-100 transition active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download Full JSON Backup</span>
          </button>

          <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs cursor-pointer transition">
            <Upload className="w-4 h-4 text-slate-500" />
            <span>Restore from JSON File</span>
            <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
          </label>
        </div>

        {importStatus && (
          <div className="p-3 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700">
            {importStatus}
          </div>
        )}
      </div>

      {/* Security & Admin PIN */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-indigo-600" />
          <span>Admin Access Key (PIN Code)</span>
        </h3>
        <p className="text-xs text-slate-500">
          The Growth Center is private. Set or update the PIN code required to open this dashboard.
        </p>

        <form onSubmit={handleChangePin} className="max-w-md flex gap-3">
          <input
            type="password"
            maxLength={10}
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            placeholder="Enter new 4 to 8 digit PIN"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-xs outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition active:scale-95"
          >
            {pinSuccess ? 'PIN Updated!' : 'Update PIN'}
          </button>
        </form>
      </div>

      {/* Domain & Monetization Settings */}
      <form
        onSubmit={handleSaveSettings}
        className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6"
      >
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Platform Configuration & AdSense
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Production Canonical Base URL
            </label>
            <input
              type="url"
              value={settings.siteBaseUrl}
              onChange={(e) => setSettings({ ...settings, siteBaseUrl: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Google AdSense Publisher ID
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={settings.adsensePublisherId}
                onChange={(e) => setSettings({ ...settings, adsensePublisherId: e.target.value })}
                placeholder="pub-XXXXXXXXXXXXXXXX"
                className="flex-1 px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-mono"
              />
              <button
                type="button"
                onClick={handleDownloadAdsTxt}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                ads.txt
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enableAdSense}
              onChange={(e) => setSettings({ ...settings, enableAdSense: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 accent-indigo-600"
            />
            <span>Enable AdSense Responsive Placeholders</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enableAnalytics}
              onChange={(e) => setSettings({ ...settings, enableAnalytics: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 accent-indigo-600"
            />
            <span>Enable Anonymous Operational Analytics</span>
          </label>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-400">
            Changes take effect immediately across all routes.
          </span>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-100 transition active:scale-95"
          >
            {settingsSuccess ? 'Settings Saved!' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};
