# Peta Edit Layer Per Scene (Master FULL 1.8.1)

File ini dibuat dari source add-on, bukan daftar jaminan fungsi drag & save. Nama layer `<Interactive.*>` yang literal tercantum sesuai JSX. Untuk teks, gunakan `layerOverrides` (Props) dan contoh key di bawah.

- Interactive dengan nama literal terdeteksi: **240** dari sejumlah komponen pembuat layer; sebagian komponen akan menghasilkan lebih dari satu instans saat runtime.
- Key awal `layerOverrides` pada manifest: **145**.
- Total 6 segmen + 1 komposisi penuh + VO Guide sesuai manifest/narration.json.
- Dalam Studio, pilih layer yang terlihat pada frame aktif. Animasi/offset akhir belum terbukti editable melalui drag di Windows.

## Teks/objek yang umum diubah

### S01 — Hook
- `S01:laptop-bezel`
- `S01:laptop-screen`
- `S01:laptop-os-name`
- `S01:headlineNeed`
- `S01:headlineWin11`

### S02 — Solusi
- `S02:hero-usb-body`
- `S02:hero-usb-label`
- `S02:reaction`
- `S02:solutionLine1`
- `S02:manyLine2`

### S03 — Persiapan
- `S03:element_040`
- `S03:element_041`
- `S03:element_069`
- `S03:element_094`
- `S03:element_101`
- `S03:element_134`

### S04 — Salin ISO
- `scene04IsoFiles`
- `scene04InstallerLabels`
- `scene04FolderPaths`
- `scene04SubtitleLines`
- `S04:filename-win10`
- `S04:folder-card-win11`

### S05 — Booting
- `S05:laptop-bezel`
- `S05:boot-option-usb-text`
- `S05:agfm-iso-filename`
- `S05:setup-title`
- `scene05SubtitleLines`

### S06 — CTA
- `S06:element_021`
- `S06:element_022`
- `S06:element_042`
- `S06:element_067`
- `S06:element_068`

## Prop teks dan transform: contoh tanpa mengubah visual default

```json
{
  "layerOverrides": {
    "S05:setup-title": {
      "text": "Windows Setup",
      "x": 0,
      "y": 0,
      "scale": 1,
      "rotation": 0,
      "opacity": 1
    }
  }
}
```

Jangan menimpa seluruh `layerOverrides` dengan satu key di atas. Tambahkan atau edit key yang ingin diubah, karena banyak key sudah terisi dan mempertahankan nilai default.

## Inventaris nama Interactive literal di source

### `src/components/NativeSceneLayers.tsx`
- L69: S03 — RECT element_001
- L70: S03 — RECT element_002
- L71: S03 — CIRCLE element_003
- L72: S03 — CIRCLE element_004
- L73: S03 — RECT element_005
- L74: S03 — TEXT element_006 — EASY2BOOT
- L75: S03 — TEXT element_007 — 03 / PERSIAPAN
- L76: S03 — PATH element_008
- L77: S03 — RECT timebar
- L78: S03 — TEXT element_009 — EASY2BOOT — SATU USB, BANYAK PILIH
- L79: S03 — TEXT element_010 — 03/06
- L80: S03 — TEXT element_011 — BEBERAPA
- L81: S03 — TEXT element_012 — INSTALLER.
- L82: S03 — RECT element_013
- L83: S03 — RECT element_014
- L84: S03 — RECT element_015
- L85: S03 — CIRCLE element_016
- L86: S03 — CIRCLE element_017
- L87: S03 — CIRCLE element_018
- L88: S03 — TEXT element_019 — ISI FLASHDISK
- L89: S03 — RECT element_020
- L90: S03 — RECT element_021
- L91: S03 — PATH element_022
- L92: S03 — TEXT element_023 — Windows 10
- L93: S03 — CIRCLE element_024
- L94: S03 — PATH element_025
- L95: S03 — RECT element_026
- L96: S03 — RECT element_027
- L97: S03 — PATH element_028
- L98: S03 — TEXT element_029 — Windows 11
- L99: S03 — CIRCLE element_030
- L100: S03 — PATH element_031
- L101: S03 — RECT element_032
- L102: S03 — RECT element_033
- L103: S03 — PATH element_034
- L104: S03 — TEXT element_035 — Linux
- L105: S03 — CIRCLE element_036
- L106: S03 — PATH element_037
- L107: S03 — RECT element_038
- L108: S03 — TEXT element_039 — DALAM SATU FLASHDISK
- L109: S03 — TEXT element_040 — PERTAMA,
- L110: S03 — TEXT element_041 — BACKUP DATA.
- L111: S03 — RECT element_042
- L112: S03 — RECT element_043
- L113: S03 — RECT element_044
- L114: S03 — RECT element_045
- L115: S03 — PATH element_046
- L116: S03 — TEXT element_047 — USB DRIVE
- L117: S03 — TEXT element_048 — E:
- L118: S03 — PATH copyPath
- L119: S03 — RECT element_049
- L120: S03 — PATH element_050
- L121: S03 — RECT element_051
- L122: S03 — TEXT element_052 — BACKUP
- L123: S03 — RECT element_053
- L124: S03 — PATH element_054
- L125: S03 — PATH element_055
- L126: S03 — RECT element_056
- L127: S03 — PATH element_057
- L128: S03 — PATH element_058
- L129: S03 — RECT element_059
- L130: S03 — CIRCLE element_060
- L131: S03 — PATH element_061
- L132: S03 — TEXT element_062 — DATA SUDAH AMAN
- L133: S03 — TEXT element_063 — BUKA
- L134: S03 — TEXT element_064 — EASY2BOOT.
- L135: S03 — RECT element_065
- L136: S03 — RECT element_066
- L137: S03 — RECT element_067
- L138: S03 — TEXT element_068 — 📁
- L139: S03 — TEXT element_069 — Easy2Boot_v2.xx
- L140: S03 — RECT element_070
- L141: S03 — TEXT element_071 — Name
- L142: S03 — TEXT element_072 — Type
- L143: S03 — RECT exeSelect
- L144: S03 — RECT element_073
- L145: S03 — PATH element_074
- L146: S03 — PATH element_075
- L147: S03 — TEXT element_076 — Make_E2B.exe
- L148: S03 — TEXT element_077 — Application
- L149: S03 — TEXT element_078 — EXE
- L150: S03 — PATH element_079
- L151: S03 — RECT element_080
- L152: S03 — TEXT element_081 — BUKA APLIKASI
- L153: S03 — PATH element_082
- L154: S03 — CIRCLE element_083
- L155: S03 — CIRCLE element_084
- L156: S03 — TEXT element_085 — PASTIKAN
- L157: S03 — TEXT element_086 — PILIH USB.
- L158: S03 — RECT element_087
- L159: S03 — RECT element_088
- L160: S03 — RECT element_089
- L161: S03 — RECT element_090
- L162: S03 — TEXT element_091 — Make_E2B.exe
- L163: S03 — TEXT element_092 — − □ ×
- L164: S03 — TEXT element_093 — USB DRIVE
- L165: S03 — RECT cDrive
- L166: S03 — TEXT element_094 — E: USB Flash Drive — 32 GB
- L167: S03 — PATH element_095
- L168: S03 — RECT element_096
- L169: S03 — TEXT element_097 — Refresh
- L170: S03 — RECT element_098
- L171: S03 — RECT element_099
- L172: S03 — PATH element_100
- L173: S03 — TEXT element_101 — Make E2B Drive
- L174: S03 — PATH element_102
- L175: S03 — RECT element_103
- L176: S03 — CIRCLE element_104
- L177: S03 — TEXT element_105 — Warning:
- L178: S03 — TEXT element_106 — USB drive will
- L179: S03 — TEXT element_107 — be erased!
- L180: S03 — TEXT element_108 — Simulasi UI • Pilih kapasitas & na
- L181: S03 — RECT element_109
- L182: S03 — RECT element_110
- L183: S03 — TEXT element_111 — E: USB Flash Drive — 32 GB
- L184: S03 — PATH element_112
- L185: S03 — RECT element_113
- L186: S03 — PATH element_114
- L187: S03 — CIRCLE element_115
- L188: S03 — TEXT element_116 — LALU,
- L189: S03 — TEXT element_117 — BUAT USB.
- L190: S03 — RECT element_118
- L191: S03 — RECT element_119
- L192: S03 — TEXT element_120 — E: USB Flash Drive — 32 GB
- L193: S03 — CIRCLE element_121
- L194: S03 — PATH element_122
- L195: S03 — RECT dButton
- L196: S03 — PATH element_123
- L197: S03 — TEXT element_124 — Make E2B Drive
- L198: S03 — PATH element_125
- L199: S03 — RECT element_126
- L200: S03 — CIRCLE element_127
- L201: S03 — TEXT element_128 — USB drive will be erased!
- L202: S03 — TEXT element_129 — SIMULASI TINDAKAN — BACKUP SEBELUM
- L203: S03 — PATH element_130
- L204: S03 — CIRCLE element_131
- L205: S03 — CIRCLE element_132
- L206: S03 — TEXT element_133 — SELESAI.
- L207: S03 — TEXT element_134 — USB SIAP.
- L208: S03 — RECT element_135
- L209: S03 — CIRCLE element_136
- L210: S03 — PATH element_137
- L211: S03 — TEXT element_138 — USB multiboot selesai
- L212: S03 — TEXT element_139 — Drive E: • Easy2Boot
- L213: S03 — RECT element_140
- L214: S03 — RECT eBar
- L215: S03 — TEXT element_142 — Siap untuk ditambahkan file ISO
- L216: S03 — TEXT element_143 — 100%
- L217: S03 — RECT element_144
- L218: S03 — PATH element_145
- L219: S03 — TEXT element_146 — _ISO
- L228: S06 — RECT element_001
- L229: S06 — RECT element_002
- L230: S06 — CIRCLE element_003
- L231: S06 — CIRCLE element_004
- L232: S06 — RECT element_005
- L233: S06 — TEXT element_006 — EASY2BOOT
- L234: S06 — TEXT element_007 — 06 / PENUTUP
- L235: S06 — PATH element_008
- L236: S06 — RECT timebar
- L237: S06 — TEXT element_009 — EASY2BOOT — SATU USB, BANYAK PILIH
- L238: S06 — TEXT element_010 — 06/06
- L239: S06 — TEXT element_011 — ISO BERHASIL DIJALANKAN.
- L240: S06 — TEXT element_012 — INSTALLER TERBUKA.
- L241: S06 — RECT element_013
- L242: S06 — RECT element_014
- L243: S06 — PATH element_015
- L244: S06 — PATH element_017
- L245: S06 — TEXT element_018 — Windows Setup
- L246: S06 — RECT element_019
- L247: S06 — TEXT element_020 — Next
- L248: S06 — TEXT element_021 — KALAU KAMU, BIASANYA...
- L249: S06 — TEXT element_022 — BOOTABLE ULANG?
- L250: S06 — RECT element_023
- L251: S06 — RECT element_024
- L252: S06 — PATH element_025
- L253: S06 — TEXT element_026 — USB BOOTABLE
- L254: S06 — TEXT element_027 — Windows 10
- L255: S06 — RECT element_028
- L256: S06 — TEXT element_029 — TERPASANG
- L257: S06 — RECT element_030
- L258: S06 — CIRCLE element_031
- L259: S06 — PATH element_032
- L260: S06 — TEXT element_033 — MAU GANTI INSTALLER
- L261: S06 — TEXT element_034 — Windows 11
- L262: S06 — RECT element_035
- L263: S06 — CIRCLE element_036
- L264: S06 — PATH element_037
- L265: S06 — TEXT element_038 — BUAT USB LAGI
- L266: S06 — RECT element_039
- L267: S06 — RECT repeatFill
- L268: S06 — TEXT element_040 — ATAU...
- L269: S06 — TEXT element_041 — PAKAI
- L270: S06 — TEXT element_042 — MULTIBOOT?
- L271: S06 — RECT element_043
- L272: S06 — RECT element_044
- L273: S06 — RECT element_045
- L274: S06 — RECT element_046
- L275: S06 — RECT element_047
- L276: S06 — RECT element_048
- L277: S06 — TEXT element_049 — EASY2BOOT
- L278: S06 — TEXT element_050 — MULTIBOOT USB
- L279: S06 — RECT element_051
- L280: S06 — RECT element_052
- L281: S06 — TEXT element_053 — 10
- L282: S06 — TEXT element_054 — Windows
- L283: S06 — TEXT element_055 — 10
- L284: S06 — RECT element_056
- L285: S06 — RECT element_057
- L286: S06 — TEXT element_058 — 11
- L287: S06 — TEXT element_059 — Windows
- L288: S06 — TEXT element_060 — 11
- L289: S06 — RECT element_061
- L290: S06 — RECT element_062
- L291: S06 — TEXT element_063 — ISO
- L292: S06 — TEXT element_064 — Linux
- L293: S06 — RECT element_065
- L294: S06 — PATH element_066
- L295: S06 — TEXT element_067 — TULIS DI KOMENTAR
- L296: S06 — TEXT element_068 — EASY2BOOT
- L297: S06 — TEXT element_069 — 1 FLASHDISK
- L298: S06 — TEXT element_070 — BANYAK INSTALLER
- L299: S06 — RECT element_071
- L300: S06 — RECT element_072
- L301: S06 — RECT element_073
- L302: S06 — RECT element_074
- L303: S06 — RECT element_075
- L304: S06 — RECT element_076
- L305: S06 — TEXT element_077 — EASY2BOOT
- L306: S06 — TEXT element_078 — MULTIBOOT USB
- L307: S06 — RECT element_079
- L308: S06 — TEXT element_080 — WINDOWS
- L309: S06 — TEXT element_081 — 10
- L310: S06 — RECT element_082
- L311: S06 — TEXT element_083 — WINDOWS
- L312: S06 — TEXT element_084 — 11
- L313: S06 — RECT element_085
- L314: S06 — TEXT element_086 — LINUX
- L315: S06 — RECT element_087
- L316: S06 — TEXT element_088 — USB MULTIBOOT
