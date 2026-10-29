import React from 'react';
import {Img, staticFile} from 'remotion';
import {ASSET_SLOTS} from '../config/assetSlots';

/** Layer gambar opsional; tidak ada placeholder jika file belum diisi. */
export const AssetSlots: React.FC = () => (
  <>
    {ASSET_SLOTS.imageOverlay.file ? (
      <Img
        name="S02 — Custom Image Overlay"
        src={staticFile("videos/windows-hacks-5-shortcut-lengkap/01-ctrl-shift-t/" + ASSET_SLOTS.imageOverlay.file)}
        style={{
          position: 'absolute',
          left: ASSET_SLOTS.imageOverlay.x,
          top: ASSET_SLOTS.imageOverlay.y,
          width: ASSET_SLOTS.imageOverlay.width,
          height: ASSET_SLOTS.imageOverlay.height,
          objectFit: 'contain',
          opacity: ASSET_SLOTS.imageOverlay.opacity,
        }}
      />
    ) : null}
    {ASSET_SLOTS.cornerLogo.file ? (
      <Img
        name="S02 — Corner Logo"
        src={staticFile("videos/windows-hacks-5-shortcut-lengkap/01-ctrl-shift-t/" + ASSET_SLOTS.cornerLogo.file)}
        style={{
          position: 'absolute',
          left: ASSET_SLOTS.cornerLogo.x,
          top: ASSET_SLOTS.cornerLogo.y,
          width: ASSET_SLOTS.cornerLogo.width,
          height: ASSET_SLOTS.cornerLogo.height,
          objectFit: 'contain',
          opacity: ASSET_SLOTS.cornerLogo.opacity,
        }}
      />
    ) : null}
  </>
);
