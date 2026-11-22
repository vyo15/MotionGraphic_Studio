/** User Props: offsets are layered *after* animation offsets, never baked into media. */
export type VideoProps = {
 backgroundColor?: string;
 inkColor?: string;
 coralColor?: string;
 navyColor?: string;
 showBackgroundGrid?: boolean;
 showCaptions?: boolean;
 showSfx?: boolean;
 subtitleColor?: string;
 subtitleFontSize?: number;
 subtitleBaselineY?: number;
 subtitleShiftX?: number;
 subtitleShiftY?: number;
 showTimeIndicator?: boolean;
 cameraStrength?: number;
 stickmanShiftX?: number;
 stickmanShiftY?: number;
 laptopShiftX?: number;
 laptopShiftY?: number;
 nightWindowShiftX?: number;
 nightWindowShiftY?: number;
 deskShiftX?: number;
 deskShiftY?: number;
 textShiftX?: number;
 textShiftY?: number;
 scene02StickmanShiftX?:number;
 scene02StickmanShiftY?:number;
 scene02LaptopShiftX?:number;
 scene02LaptopShiftY?:number;
 scene02NightWindowShiftX?:number;
 scene02NightWindowShiftY?:number;
 scene02DeskShiftX?:number;
 scene02DeskShiftY?:number;
 scene03ClockShiftX?: number;
 scene03ClockShiftY?: number;
 scene03ClockScale?: number;
 scene03CardsShiftX?: number;
 scene03CardsShiftY?: number;
 /** S04 variation 05: progress/timing controls editable via Remotion Studio Props. */
 solution04FilmInitialPercent?: number;
 solution04DownloadInitialPercent?: number;
 solution04FilmCompletionFrame?: number;
 solution04DownloadCompletionFrame?: number;
 solution04OffFrame?: number;
 /** S05 → S06 → S07 single-source match move and meaning labels. */
 scene05FlowShiftX?:number;
 scene05FlowShiftY?:number;
 scene05ExplainTitleTop?:string;
 scene05ExplainTitleBottom?:string;
 scene05ExplainCommandRoot?:string;
 scene05ExplainSMeaning?:string;
 scene05ExplainTMeaning?:string;
 scene05ExplainDurationMeaning?:string;
 scene05ExplainSubtitleSeconds?:string;
 /** Native editable text of the accepted v55 cancellation bridge. */
 scene07TimerInitialText?:string;
 scene07TimerRunningText?:string;
 scene08SeparatorTitleTop?:string;
 scene08SeparatorTitleBottom?:string;
 scene08SeparatorStatus?:string;
 scene08SeparatorMessage?:string;
 scene09CancelTitleTop?:string;
 scene09CancelTitleBottom?:string;
 scene09CancelCommand?:string;
 scene09CancelPlaybackSpeed?:number;
 scene09CancelWindowShiftX?:number;
 scene09CancelWindowShiftY?:number;
 scene09CancelSuccessText?:string;
 scene09SubtitleSuccess?:string;
 scene09CancelRunTitle?:string;
 scene09CancelOpenLabel?:string;
 scene09CancelInstructionLine1?:string;
 scene09CancelInstructionLine2?:string;
 scene09CancelInstructionLine3?:string;
 scene09CancelOkLabel?:string;
 scene09CancelCancelLabel?:string;
 scene09CancelBrowseLabel?:string;
 /** Scene 05 v21 text, command, scale, and soft shadow controls. */
 scene04HeadlineLine1?: string;
 scene04HeadlineLine2?: string;
 scene04RunCommand?: string;
 scene04KeysScale?: number;
 scene04SoftDepth?: number;
 scene04WindowShiftX?: number;
 scene04WindowShiftY?: number;
 scene04WindowScale?: number;
 scene04KeysShiftX?: number;
 scene04KeysShiftY?: number;
 scene04CursorShiftX?: number;
 scene04CursorShiftY?: number;
 scene05MainShiftX?: number;
 scene05MainShiftY?: number;
 scene05MainScale?: number;
 scene05LaptopShiftX?: number;
 scene05LaptopShiftY?: number;
 scene05CountdownSeconds?: number;
 scene06MainShiftX?: number;
 scene06MainShiftY?: number;
 scene06MainScale?: number;
 scene06RunShiftX?: number;
 scene06RunShiftY?: number;
 scene06RunScale?: number;
 scene06CommandText?: string;
 scene06ResultTitle?: string;
 scene07MainShiftX?: number;
 scene07MainShiftY?: number;
 scene07MainScale?: number;
 scene07CardShiftX?: number;
 scene07CardShiftY?: number;
 scene07CursorShiftX?: number;
 scene07CursorShiftY?: number;
 scene07UnderlineWidth?: number;
 scene07PrimaryText?: string;
 scene07SecondaryText?: string;
 scene07CommentText?: string;
 scene08MainShiftX?: number;
 scene08MainShiftY?: number;
 scene08MainScale?: number;
 scene08PanelShiftX?: number;
 scene08PanelShiftY?: number;
 scene08TitleTop?: string;
 scene08TitleBottom?: string;
 scene08Subtitle?: string;
 /** S10/S11: one shared native CTA -> Cover animation, all user-facing labels editable via Props. */
 scene10TitleTop?:string;
 scene10TitleBottom?:string;
 scene10Question?:string;
 scene10CommentPlaceholder?:string;
 scene10SubtitlePart1?:string;
 scene10SubtitlePart2?:string;
 scene10SubtitlePart3?:string;
 scene10TitleShiftX?:number;
 scene10TitleShiftY?:number;
 scene10CardShiftX?:number;
 scene10CardShiftY?:number;
 scene10CommentBadgeShiftX?:number;
 scene10CommentBadgeShiftY?:number;
 scene10TypeStartFrame?:number;
 scene10TypeFramesPerChar?:number;
 scene10ToCoverStartFrame?:number;
 scene11ClockArrivalFrame?:number;
 scene11TitleTop?:string;
 scene11TitleBottom?:string;
 scene11TimerText?:string;
 scene11Summary?:string;
 scene11TitleShiftX?:number;
 scene11TitleShiftY?:number;
 scene11ClockShiftX?:number;
 scene11ClockShiftY?:number;
 scene11ClockScale?:number;
 scene11TimerShiftY?:number;
 scene11SummaryShiftY?:number;
 downloadStartingPercent?: number;
 downloadEndingPercent?: number;
 playerStartingProgress?: number;
 playerEndingProgress?: number;
};
export const DEFAULT_PROPS: Required<VideoProps> = {
 backgroundColor:'#F7F7F5', inkColor:'#202628',coralColor:'#DF805F',navyColor:'#223E4A',
 showBackgroundGrid:true,showCaptions:true,showSfx:true,showTimeIndicator:true,
 subtitleColor:'#202628',subtitleFontSize:39,subtitleBaselineY:1512,
 subtitleShiftX:0,subtitleShiftY:0,
 cameraStrength:1,
 stickmanShiftX:0,stickmanShiftY:0,laptopShiftX:0,laptopShiftY:0,
 nightWindowShiftX:0,nightWindowShiftY:0,deskShiftX:0,deskShiftY:0,
 textShiftX:0,textShiftY:0,
 scene02StickmanShiftX:0,scene02StickmanShiftY:0,
 scene02LaptopShiftX:0,scene02LaptopShiftY:0,
 scene02NightWindowShiftX:0,scene02NightWindowShiftY:0,
 scene02DeskShiftX:0,scene02DeskShiftY:0,
 scene03ClockShiftX:0,scene03ClockShiftY:0,scene03ClockScale:1,
 scene03CardsShiftX:0,scene03CardsShiftY:0,
 solution04FilmInitialPercent:62,solution04DownloadInitialPercent:76,
 solution04FilmCompletionFrame:165,solution04DownloadCompletionFrame:168,solution04OffFrame:205,
 scene05FlowShiftX:0,scene05FlowShiftY:0,
 scene05ExplainTitleTop:'CARA',scene05ExplainTitleBottom:'KERJANYA?',
 scene05ExplainCommandRoot:'shutdown',
 scene05ExplainSMeaning:' = shutdown',scene05ExplainTMeaning:' = timer',
 scene05ExplainDurationMeaning:' detik = 1 jam',
 scene05ExplainSubtitleSeconds:'karena satuannya detik.',
 scene07TimerInitialText:'01:00:00',scene07TimerRunningText:'00:59:59',
 scene08SeparatorTitleTop:'KALAU',scene08SeparatorTitleBottom:'NGGAK JADI?',
 scene08SeparatorStatus:'JADWAL MASIH AKTIF',scene08SeparatorMessage:'Bisa dibatalkan.',
 scene09CancelTitleTop:'BATALKAN',scene09CancelTitleBottom:'SHUTDOWN',
 scene09CancelCommand:'shutdown /a',scene09CancelSuccessText:'JADWAL DIBATALKAN',
 scene09CancelPlaybackSpeed:1,scene09CancelWindowShiftX:0,scene09CancelWindowShiftY:0,
 scene09CancelRunTitle:'Run',scene09CancelOpenLabel:'Open:',
 scene09CancelInstructionLine1:'Type the name of a program, folder,',
 scene09CancelInstructionLine2:'document, or Internet resource, and',
 scene09CancelInstructionLine3:'Windows will open it for you.',
 scene09CancelOkLabel:'OK',scene09CancelCancelLabel:'Cancel',scene09CancelBrowseLabel:'Browse',
 scene09SubtitleSuccess:'Jadwal shutdown berhasil dibatalkan.', 
 scene04HeadlineLine1:'Buka Run,',
 scene04HeadlineLine2:'lalu jalankan perintah.',
 scene04RunCommand:'shutdown /s /t 3600',
 scene04KeysScale:1,scene04SoftDepth:0.34,
 scene04WindowShiftX:0,scene04WindowShiftY:0,scene04WindowScale:1,
 scene04KeysShiftX:0,scene04KeysShiftY:0,
 scene04CursorShiftX:0,scene04CursorShiftY:0,
 scene05MainShiftX:0,scene05MainShiftY:0,scene05MainScale:1,
 scene05LaptopShiftX:0,scene05LaptopShiftY:0,scene05CountdownSeconds:3600,
 scene06MainShiftX:0,scene06MainShiftY:0,scene06MainScale:1,
 scene06RunShiftX:0,scene06RunShiftY:0,scene06RunScale:1,
 scene06CommandText:'shutdown /a',scene06ResultTitle:'DIBATALKAN',
 scene07MainShiftX:0,
 scene07MainShiftY:0,
 scene07MainScale:1,
 scene07CardShiftX:0,
 scene07CardShiftY:0,
 scene07CursorShiftX:0,
 scene07CursorShiftY:0,
 scene07UnderlineWidth:520,
 scene07PrimaryText:'CARA LAIN',
 scene07SecondaryText:'LEBIH PRAKTIS',
 scene07CommentText:'Tulis di kolom komentar',
 scene08MainShiftX:0,
 scene08MainShiftY:0,
 scene08MainScale:1,
 scene08PanelShiftX:0,
 scene08PanelShiftY:0,
 scene08TitleTop:'SHUTDOWN',
 scene08TitleBottom:'OTOMATIS',
 scene08Subtitle:'Laptop mati sendiri',
 scene10TitleTop:'PUNYA CARA',scene10TitleBottom:'LAIN?',
 scene10Question:'Yang lebih praktis?',
 scene10CommentPlaceholder:'Tulis cara versimu...',
 scene10SubtitlePart1:'Kalau kamu punya cara lain',
 scene10SubtitlePart2:'yang lebih praktis,',
 scene10SubtitlePart3:'coba share di kolom komentar!',
 scene10TitleShiftX:0,scene10TitleShiftY:0,
 scene10CardShiftX:0,scene10CardShiftY:0,
 scene10CommentBadgeShiftX:0,scene10CommentBadgeShiftY:0,
 scene10TypeStartFrame:125,scene10TypeFramesPerChar:3,
 scene10ToCoverStartFrame:217,scene11ClockArrivalFrame:270,
 scene11TitleTop:'SHUTDOWN',scene11TitleBottom:'OTOMATIS',
 scene11TimerText:'01:00:00',scene11Summary:'Atur waktunya. Laptop mati sendiri.',
 scene11TitleShiftX:0,scene11TitleShiftY:0,
 scene11ClockShiftX:0,scene11ClockShiftY:0,scene11ClockScale:1,
 scene11TimerShiftY:0,scene11SummaryShiftY:0,
 downloadStartingPercent:75,downloadEndingPercent:76,
 playerStartingProgress:7,playerEndingProgress:84,
};
