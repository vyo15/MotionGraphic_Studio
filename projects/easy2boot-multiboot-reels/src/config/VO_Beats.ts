/** VO script matching the content of each scene. Timing guide until real recording is provided. */
export const VO_BEATS=[
 {scene:'S01',start:0,end:12,text:'Mau instal Windows 11, tapi flashdisknya masih Windows 10? Masa harus bikin bootable ulang lagi?'},
 {scene:'S02',start:12,end:23,text:'Nggak perlu bikin ulang terus. Pakai Easy2Boot. Satu flashdisk bisa isi beberapa installer sekaligus.'},
 {scene:'S03',start:23,end:37,text:'Pertama, backup data flashdisk. Buka Easy2Boot. Pilih USB yang benar, lalu buat USB multiboot.'},
 {scene:'S04',start:37,end:53,text:'Setelah jadi, tinggal salin file ISO ke folder yang sesuai. Windows 10, Windows 11, atau Linux. Mau tambah installer? Cukup salin lagi.'},
 {scene:'S05',start:53,end:67,text:'Sekarang, boot dari USB. Pilih flashdisk di boot menu. Di agFM, cari ISO Windows 11. Pilih, lalu jalankan. Installer Windows mulai terbuka.'},
 {scene:'S06',start:67,end:80,text:'Kalau kamu, biasanya bikin bootable ulang atau pakai multiboot? Coba tulis di kolom komentar!'},
] as const;
