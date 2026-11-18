import React, { useEffect } from 'react';
import { StorageService } from '../services/storage';

interface AdSenseSlotProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
}

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  slotId = '1234567890',
  format = 'auto',
  className = '',
}) => {
  const settings = StorageService.getSettings();
  const isEnabled = settings.enableAdSense && Boolean(settings.adsensePublisherId);

  useEffect(() => {
    if (isEnabled && typeof window !== 'undefined') {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        // Suppress during dev
      }
    }
  }, [isEnabled]);

  // When AdSense is NOT active: display nothing or a clean empty spacer so no fake ads are shown
  if (!isEnabled) {
    return null;
  }

  const cleanPubId = settings.adsensePublisherId.startsWith('ca-pub-')
    ? settings.adsensePublisherId
    : `ca-pub-${settings.adsensePublisherId}`;

  return (
    <div className={`adsense-wrapper my-6 overflow-hidden text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={cleanPubId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};
