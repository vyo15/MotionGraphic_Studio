/** Lokasi ekspor terpadu: di luar folder Master, tidak mencampur source project. */
import fs from 'node:fs';
import path from 'node:path';
import {ROOT} from './menu-helper.mjs';

const DEFAULT_ROOT = path.resolve(ROOT, '..', 'MotionGraphic-Studio-Backups');

/**
 * Override opsional (jika diperlukan): MOTIONGRAPHIC_STUDIO_EXPORT_DIR.
 * MOTIONGRAPHIC_STUDIO_BACKUP_DIR (versi lama) tetap didukung sebagai root bersama.
 */
export function exportRoot() {
  const specified = process.env.MOTIONGRAPHIC_STUDIO_EXPORT_DIR?.trim()
    || process.env.MOTIONGRAPHIC_STUDIO_BACKUP_DIR?.trim();
  const dest = specified ? path.resolve(specified) : DEFAULT_ROOT;
  const relative = path.relative(ROOT, dest);
  if (relative === '' || (relative !== '..' && !relative.startsWith('..' + path.sep))) {
    throw new Error('Folder ekspor harus berada di LUAR MotionGraphic-Studio: ' + dest);
  }
  return dest;
}

export function exportPaths() {
  const root = exportRoot();
  return {
    root,
    master: path.join(root, 'Master'),
    videos: path.join(root, 'Video-Editable'),
    mp4: path.join(root, 'MP4'),
    logs: path.join(root, 'Logs'),
  };
}

export function ensureExportDirs() {
  const dirs = exportPaths();
  for (const folder of [dirs.root, dirs.master, dirs.videos, dirs.mp4, dirs.logs]) {
    fs.mkdirSync(folder, {recursive: true});
  }
  return dirs;
}

export function timestamp() {
  return new Date().toISOString().replace(/[-:]/g, '').replace('T', '-').replace(/\..*/, '');
}

/** Tidak overwrite export lama sekalipun ada dua render pada detik yang sama. */
export function availableFile(folder, baseName, ext) {
  const safe = String(baseName).replace(/[<>:"/\\|?*\x00-\x1F]/g, '-').replace(/[. ]+$/g, '');
  let n = 1;
  let output = path.join(folder, safe + ext);
  while (fs.existsSync(output)) {
    n += 1;
    output = path.join(folder, `${safe}-${n}` + ext);
  }
  return output;
}
