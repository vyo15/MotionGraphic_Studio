/**
 * Scene 04: tiap UI, file, ikon, judul dan kursor terpisah dalam grup SVG.
 * Semua elemen dapat diubah lewat SVG atau properti yang diekspos ke Props.
 * Bukan screenshot flattened.
 */
export const SCENE04_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" role="img" aria-label="Animasi Scene 04: menyalin ISO Easy2Boot"><defs>
<pattern id="grid" width="52" height="52" patternUnits="userSpaceOnUse"><path d="M52 0H0V52" stroke="#C4CAC7" stroke-width="1" fill="none" opacity=".23"/></pattern>
<filter id="shadow" x="-40%" y="-45%" width="180%" height="200%"><feDropShadow dx="0" dy="19" stdDeviation="25" flood-color="#21343D" flood-opacity=".14"/></filter>
<filter id="mild" x="-40%" y="-45%" width="180%" height="200%"><feDropShadow dx="0" dy="8" stdDeviation="11" flood-color="#21343D" flood-opacity=".12"/></filter>
<linearGradient id="usb" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#40525C"/><stop offset="1" stop-color="#182830"/></linearGradient>
</defs>
<rect width="1080" height="1920" fill="#F7F7F5" id="element_001"/><rect width="1080" height="1920" fill="url(#grid)" id="element_002"/><circle cx="1100" cy="550" r="350" fill="#EFDAD0" opacity=".25" id="element_003"/><circle cx="-50" cy="1490" r="320" fill="#E4EDF0" opacity=".26" id="element_004"/>
<g id="masthead"><rect x="92" y="262" width="10" height="30" rx="4" fill="#DF805F" id="element_005"/><text x="121" y="289" class="med" font-size="29" fill="#647175" id="element_006">EASY2BOOT</text><text x="987" y="289" text-anchor="end" font-size="25" font-weight="770" fill="#9DA8A9" id="element_007">04 / FILE ISO</text></g>
<g id="footer"><path d="M88 1535H992" stroke="#DDE3E2" stroke-width="2" id="element_008"/><rect x="90" y="1572" id="timebar" width="0" height="6" rx="3" fill="#DF805F"/><text x="90" y="1618" font-size="23" font-weight="710" fill="#919C9E" id="element_009">EASY2BOOT — SATU USB, BANYAK PILIHAN</text><text x="991" y="1618" text-anchor="end" font-size="25" font-weight="700" fill="#A6B0AF" id="element_010">04/06</text></g><g id="carry">
 <text x="92" y="429" class="med" font-size="66" fill="#778487" id="element_011">SELESAI.</text><text x="87" y="559" class="heavy" font-size="106" fill="#202628" id="element_012">USB <tspan fill="#DF805F">SIAP.</tspan></text>
 <rect x="125" y="768" width="830" height="478" rx="33" fill="white" stroke="#E0E7E7" stroke-width="3" filter="url(#shadow)" id="element_013"/>
 <circle cx="224" cy="875" r="45" fill="#E1F5EB" id="element_014"/><path d="M200 873L217 890L247 855" stroke="#31A878" stroke-width="12" fill="none" stroke-linecap="round" id="element_015"/>
 <text x="306" y="893" fill="#2B3E43" font-size="40" font-weight="850" id="element_016">USB multiboot selesai</text><text x="224" y="1019" font-size="29" font-weight="700" fill="#849396" id="element_017">Drive E: • Easy2Boot</text>
 <rect x="224" y="1080" width="635" height="29" rx="14" fill="#31A878" id="element_018"/><text x="224" y="1191" font-size="29" font-weight="720" fill="#7C8B8E" id="element_019">Siap untuk ditambahkan file ISO</text>
 <g id="carryFolder" filter="url(#mild)"><rect x="567" y="1279" width="410" height="137" rx="27" fill="#273941" id="element_020"/><path d="M609 1331V1309Q609 1296 622 1296H667L681 1310H715Q731 1310 731 1327V1368Q731 1386 714 1386H625Q609 1386 609 1368Z" fill="#E9B47D" id="element_021"/><text x="751" y="1363" fill="white" font-size="47" font-weight="850" id="element_022">_ISO</text></g></g><g id="intro" opacity="0">
 <g id="introTitle"><text x="91" y="423" class="med" font-size="64" fill="#7B8588" id="element_023">SETELAH SIAP,</text><text x="87" y="560" class="heavy" font-size="111" fill="#202628" id="element_024">SALIN <tspan fill="#DF805F">ISO.</tspan></text></g>
 <g id="introExplorer"><g class="expPanel" id="element_025">
      <rect x="92" y="724" width="896" height="657" rx="30" fill="white" stroke="#DFE6E5" stroke-width="3" filter="url(#shadow)" id="element_026"/>
      <path d="M122 724H958Q988 724 988 754V811H92V754Q92 724 122 724Z" fill="#F1F4F4" id="element_027"/>
      <circle cx="142" cy="768" r="10" fill="#E1A79A" id="element_028"/><circle cx="174" cy="768" r="10" fill="#E2D0BA" id="element_029"/><circle cx="206" cy="768" r="10" fill="#BFCCD0" id="element_030"/>
      <text x="248" y="778" class="ui" font-size="31" fill="#34464D" id="element_031">File Explorer</text>
      <rect x="125" y="833" width="830" height="70" rx="14" fill="#F8FAFA" stroke="#E7EBEA" stroke-width="2" id="element_032"/>
      <path d="M160 859L143 869L160 879" stroke="#91A0A5" stroke-width="6" fill="none" stroke-linecap="round" id="element_033"/>
      <text x="198" y="880" font-size="27" fill="#4C5B60" font-weight="760" id="element_034">This PC  ›  EASY2BOOT (E:)  ›  _ISO</text>
      <path d="M127 939H953" stroke="#E9EDED" stroke-width="2" id="element_035"/>
     </g>
  <g id="introFolder1"><g id="element_036"><path d="M166 1031V1017Q166 1005 178 1005H219L234 1020H300Q314 1020 314 1035V1115Q314 1131 298 1131H181Q166 1131 166 1116Z" fill="#E8B889" id="element_037"/><rect x="166" y="1038" width="148" height="93" rx="12" fill="#F0C79F" id="element_038"/>
       <text x="240" y="1168" text-anchor="middle" font-size="27" fill="#3C4A4F" font-weight="800" id="element_039">WINDOWS</text></g></g>
  <g id="introFolder2"><g id="element_040"><path d="M454 1031V1017Q454 1005 466 1005H507L522 1020H588Q602 1020 602 1035V1115Q602 1131 586 1131H469Q454 1131 454 1116Z" fill="#E8B889" id="element_041"/><rect x="454" y="1038" width="148" height="93" rx="12" fill="#F0C79F" id="element_042"/>
       <text x="528" y="1168" text-anchor="middle" font-size="27" fill="#3C4A4F" font-weight="800" id="element_043">LINUX</text></g></g>
  <g id="introFolder3"><g id="element_044"><path d="M742 1031V1017Q742 1005 754 1005H795L810 1020H876Q890 1020 890 1035V1115Q890 1131 874 1131H757Q742 1131 742 1116Z" fill="#E8B889" id="element_045"/><rect x="742" y="1038" width="148" height="93" rx="12" fill="#F0C79F" id="element_046"/>
       <text x="816" y="1168" text-anchor="middle" font-size="27" fill="#3C4A4F" font-weight="800" id="element_047">TOOLS</text></g></g>
  <text x="160" y="1315" font-size="29" fill="#929D9F" font-weight="700" id="element_048">Masukkan ISO ke folder yang sesuai</text>
 </g><g id="introPointer"><path d="M0 0L3 56L18 43L30 75L44 69L31 38L49 38Z" stroke="#25383F" stroke-width="6" fill="white" stroke-linejoin="round" id="element_049"/></g>
 </g><g id="win10" opacity="0">
      <g id="win10Title"><text x="88" y="426" class="med" font-size="63" fill="#7A8789" id="element_050">SALIN ISO</text>
        <text x="85" y="558" class="heavy" font-size="107" fill="#202628" id="element_051">WINDOWS <tspan fill="#DF805F">10</tspan></text></g>
      <g id="win10Win">
        <g class="expPanel" id="element_052">
      <rect x="92" y="712" width="896" height="680" rx="30" fill="white" stroke="#DFE6E5" stroke-width="3" filter="url(#shadow)" id="element_053"/>
      <path d="M122 712H958Q988 712 988 742V799H92V742Q92 712 122 712Z" fill="#F1F4F4" id="element_054"/>
      <circle cx="142" cy="756" r="10" fill="#E1A79A" id="element_055"/><circle cx="174" cy="756" r="10" fill="#E2D0BA" id="element_056"/><circle cx="206" cy="756" r="10" fill="#BFCCD0" id="element_057"/>
      <text x="248" y="766" class="ui" font-size="31" fill="#34464D" id="element_058">File Explorer</text>
      <rect x="125" y="821" width="830" height="70" rx="14" fill="#F8FAFA" stroke="#E7EBEA" stroke-width="2" id="element_059"/>
      <path d="M160 847L143 857L160 867" stroke="#91A0A5" stroke-width="6" fill="none" stroke-linecap="round" id="element_060"/>
      <text x="198" y="868" font-size="27" fill="#4C5B60" font-weight="760" id="element_061">E:  ›  _ISO  ›  WINDOWS  ›  WIN10</text>
      <path d="M127 927H953" stroke="#E9EDED" stroke-width="2" id="element_062"/>
     </g>
        <rect x="133" y="972" width="810" height="208" rx="23" fill="#F7FAFA" stroke="#E7EBEB" stroke-width="3" id="element_063"/>
        <rect x="168" y="1007" width="113" height="117" rx="21" fill="#5395C0" opacity=".18" id="element_064"/>
        <path d="M199 1028H243L260 1047V1098H199Z" fill="white" stroke="#5395C0" stroke-width="4" id="element_065"/>
        <rect x="202" y="1064" width="54" height="23" rx="7" fill="#5395C0" id="element_066"/><text x="229" y="1082" text-anchor="middle" font-size="17" fill="white" font-weight="800" id="element_067">ISO</text>
        <text x="314" y="1068" fill="#34464B" font-size="33" font-weight="800" id="element_068">Win10_22H2.iso</text>
        <text x="314" y="1114" fill="#879497" font-size="27" font-weight="640" id="element_069">Windows 10 Installer</text>
        <g id="win10Check"><circle cx="896" cy="1075" r="27" fill="#E2F3E9" id="element_070"/><path d="M881 1075L891 1085L911 1062" stroke="#31A878" stroke-width="7" fill="none" stroke-linecap="round" id="element_071"/></g>
        <rect x="149" y="1213" width="772" height="16" rx="8" fill="#E8ECEA" id="element_072"/>
        <rect id="win10Bar" x="149" y="1213" width="0" height="16" rx="8" fill="#31A878"/>
        <text x="152" y="1287" fill="#929EA1" font-size="26" font-weight="670" id="element_073">Win10_22H2.iso</text>
        <g id="win10Done" opacity="0"><text x="902" y="1288" text-anchor="end" fill="#31A878" font-size="27" font-weight="800" id="element_074">TERSALIN</text></g>
      </g>
      <g id="win10Flying" filter="url(#mild)"><rect width="190" height="164" rx="20" fill="white" stroke="#5395C0" stroke-width="4" id="element_075"/>
         <path d="M65 28H115L136 48V116H65Z" fill="#F8FAFA" stroke="#5395C0" stroke-width="4" id="element_076"/>
         <path d="M115 28V48H136" fill="none" stroke="#5395C0" stroke-width="4" id="element_077"/>
         <rect x="77" y="70" width="49" height="27" rx="7" fill="#5395C0" id="element_078"/><text x="102" y="90" font-size="17" text-anchor="middle" fill="white" font-weight="830" id="element_079">ISO</text>
         <text x="95" y="141" text-anchor="middle" font-size="20" font-weight="850" fill="#526165" id="element_080">WIN 10</text></g>
      <g id="win10Cursor"><path d="M0 0L3 56L18 43L30 75L44 69L31 38L49 38Z" stroke="#25383F" stroke-width="6" fill="white" stroke-linejoin="round" id="element_081"/></g>
    </g><g id="win11" opacity="0">
      <g id="win11Title"><text x="88" y="426" class="med" font-size="63" fill="#7A8789" id="element_082">SALIN ISO</text>
        <text x="85" y="558" class="heavy" font-size="107" fill="#202628" id="element_083">WINDOWS <tspan fill="#DF805F">11</tspan></text></g>
      <g id="win11Win">
        <g class="expPanel" id="element_084">
      <rect x="92" y="712" width="896" height="680" rx="30" fill="white" stroke="#DFE6E5" stroke-width="3" filter="url(#shadow)" id="element_085"/>
      <path d="M122 712H958Q988 712 988 742V799H92V742Q92 712 122 712Z" fill="#F1F4F4" id="element_086"/>
      <circle cx="142" cy="756" r="10" fill="#E1A79A" id="element_087"/><circle cx="174" cy="756" r="10" fill="#E2D0BA" id="element_088"/><circle cx="206" cy="756" r="10" fill="#BFCCD0" id="element_089"/>
      <text x="248" y="766" class="ui" font-size="31" fill="#34464D" id="element_090">File Explorer</text>
      <rect x="125" y="821" width="830" height="70" rx="14" fill="#F8FAFA" stroke="#E7EBEA" stroke-width="2" id="element_091"/>
      <path d="M160 847L143 857L160 867" stroke="#91A0A5" stroke-width="6" fill="none" stroke-linecap="round" id="element_092"/>
      <text x="198" y="868" font-size="27" fill="#4C5B60" font-weight="760" id="element_093">E:  ›  _ISO  ›  WINDOWS  ›  WIN11</text>
      <path d="M127 927H953" stroke="#E9EDED" stroke-width="2" id="element_094"/>
     </g>
        <rect x="133" y="972" width="810" height="208" rx="23" fill="#F7FAFA" stroke="#E7EBEB" stroke-width="3" id="element_095"/>
        <rect x="168" y="1007" width="113" height="117" rx="21" fill="#499BBD" opacity=".18" id="element_096"/>
        <path d="M199 1028H243L260 1047V1098H199Z" fill="white" stroke="#499BBD" stroke-width="4" id="element_097"/>
        <rect x="202" y="1064" width="54" height="23" rx="7" fill="#499BBD" id="element_098"/><text x="229" y="1082" text-anchor="middle" font-size="17" fill="white" font-weight="800" id="element_099">ISO</text>
        <text x="314" y="1068" fill="#34464B" font-size="33" font-weight="800" id="element_100">Win11_24H2.iso</text>
        <text x="314" y="1114" fill="#879497" font-size="27" font-weight="640" id="element_101">Windows 11 Installer</text>
        <g id="win11Check"><circle cx="896" cy="1075" r="27" fill="#E2F3E9" id="element_102"/><path d="M881 1075L891 1085L911 1062" stroke="#31A878" stroke-width="7" fill="none" stroke-linecap="round" id="element_103"/></g>
        <rect x="149" y="1213" width="772" height="16" rx="8" fill="#E8ECEA" id="element_104"/>
        <rect id="win11Bar" x="149" y="1213" width="0" height="16" rx="8" fill="#31A878"/>
        <text x="152" y="1287" fill="#929EA1" font-size="26" font-weight="670" id="element_105">Win11_24H2.iso</text>
        <g id="win11Done" opacity="0"><text x="902" y="1288" text-anchor="end" fill="#31A878" font-size="27" font-weight="800" id="element_106">TERSALIN</text></g>
      </g>
      <g id="win11Flying" filter="url(#mild)"><rect width="190" height="164" rx="20" fill="white" stroke="#499BBD" stroke-width="4" id="element_107"/>
         <path d="M65 28H115L136 48V116H65Z" fill="#F8FAFA" stroke="#499BBD" stroke-width="4" id="element_108"/>
         <path d="M115 28V48H136" fill="none" stroke="#499BBD" stroke-width="4" id="element_109"/>
         <rect x="77" y="70" width="49" height="27" rx="7" fill="#499BBD" id="element_110"/><text x="102" y="90" font-size="17" text-anchor="middle" fill="white" font-weight="830" id="element_111">ISO</text>
         <text x="95" y="141" text-anchor="middle" font-size="20" font-weight="850" fill="#526165" id="element_112">WIN 11</text></g>
      <g id="win11Cursor"><path d="M0 0L3 56L18 43L30 75L44 69L31 38L49 38Z" stroke="#25383F" stroke-width="6" fill="white" stroke-linejoin="round" id="element_113"/></g>
    </g><g id="linux" opacity="0">
      <g id="linuxTitle"><text x="88" y="426" class="med" font-size="63" fill="#7A8789" id="element_114">SALIN ISO</text>
        <text x="85" y="558" class="heavy" font-size="107" fill="#202628" id="element_115">LIN<tspan fill="#DF805F">UX</tspan></text></g>
      <g id="linuxWin">
        <g class="expPanel" id="element_116">
      <rect x="92" y="712" width="896" height="680" rx="30" fill="white" stroke="#DFE6E5" stroke-width="3" filter="url(#shadow)" id="element_117"/>
      <path d="M122 712H958Q988 712 988 742V799H92V742Q92 712 122 712Z" fill="#F1F4F4" id="element_118"/>
      <circle cx="142" cy="756" r="10" fill="#E1A79A" id="element_119"/><circle cx="174" cy="756" r="10" fill="#E2D0BA" id="element_120"/><circle cx="206" cy="756" r="10" fill="#BFCCD0" id="element_121"/>
      <text x="248" y="766" class="ui" font-size="31" fill="#34464D" id="element_122">File Explorer</text>
      <rect x="125" y="821" width="830" height="70" rx="14" fill="#F8FAFA" stroke="#E7EBEA" stroke-width="2" id="element_123"/>
      <path d="M160 847L143 857L160 867" stroke="#91A0A5" stroke-width="6" fill="none" stroke-linecap="round" id="element_124"/>
      <text x="198" y="868" font-size="27" fill="#4C5B60" font-weight="760" id="element_125">E:  ›  _ISO  ›  LINUX</text>
      <path d="M127 927H953" stroke="#E9EDED" stroke-width="2" id="element_126"/>
     </g>
        <rect x="133" y="972" width="810" height="208" rx="23" fill="#F7FAFA" stroke="#E7EBEB" stroke-width="3" id="element_127"/>
        <rect x="168" y="1007" width="113" height="117" rx="21" fill="#D58A5B" opacity=".18" id="element_128"/>
        <path d="M199 1028H243L260 1047V1098H199Z" fill="white" stroke="#D58A5B" stroke-width="4" id="element_129"/>
        <rect x="202" y="1064" width="54" height="23" rx="7" fill="#D58A5B" id="element_130"/><text x="229" y="1082" text-anchor="middle" font-size="17" fill="white" font-weight="800" id="element_131">ISO</text>
        <text x="314" y="1068" fill="#34464B" font-size="33" font-weight="800" id="element_132">Ubuntu-24.04.iso</text>
        <text x="314" y="1114" fill="#879497" font-size="27" font-weight="640" id="element_133">Linux Ubuntu Installer</text>
        <g id="linuxCheck"><circle cx="896" cy="1075" r="27" fill="#E2F3E9" id="element_134"/><path d="M881 1075L891 1085L911 1062" stroke="#31A878" stroke-width="7" fill="none" stroke-linecap="round" id="element_135"/></g>
        <rect x="149" y="1213" width="772" height="16" rx="8" fill="#E8ECEA" id="element_136"/>
        <rect id="linuxBar" x="149" y="1213" width="0" height="16" rx="8" fill="#31A878"/>
        <text x="152" y="1287" fill="#929EA1" font-size="26" font-weight="670" id="element_137">Ubuntu-24.04.iso</text>
        <g id="linuxDone" opacity="0"><text x="902" y="1288" text-anchor="end" fill="#31A878" font-size="27" font-weight="800" id="element_138">TERSALIN</text></g>
      </g>
      <g id="linuxFlying" filter="url(#mild)"><rect width="190" height="164" rx="20" fill="white" stroke="#D58A5B" stroke-width="4" id="element_139"/>
         <path d="M65 28H115L136 48V116H65Z" fill="#F8FAFA" stroke="#D58A5B" stroke-width="4" id="element_140"/>
         <path d="M115 28V48H136" fill="none" stroke="#D58A5B" stroke-width="4" id="element_141"/>
         <rect x="77" y="70" width="49" height="27" rx="7" fill="#D58A5B" id="element_142"/><text x="102" y="90" font-size="17" text-anchor="middle" fill="white" font-weight="830" id="element_143">ISO</text>
         <text x="95" y="141" text-anchor="middle" font-size="20" font-weight="850" fill="#526165" id="element_144">LINUX</text></g>
      <g id="linuxCursor"><path d="M0 0L3 56L18 43L30 75L44 69L31 38L49 38Z" stroke="#25383F" stroke-width="6" fill="white" stroke-linejoin="round" id="element_145"/></g>
    </g><g id="final" opacity="0">
  <g id="finalTitle"><text x="88" y="425" class="med" font-size="64" fill="#778487" id="element_146">MAU TAMBAH LAGI?</text><text x="84" y="550" class="heavy" font-size="93" fill="#202628" id="element_147">CUKUP <tspan fill="#DF805F">SALIN.</tspan></text></g>
  <g id="finalWindow"><g class="expPanel" id="element_148">
      <rect x="105" y="708" width="868" height="678" rx="30" fill="white" stroke="#DFE6E5" stroke-width="3" filter="url(#shadow)" id="element_149"/>
      <path d="M135 708H943Q973 708 973 738V795H105V738Q105 708 135 708Z" fill="#F1F4F4" id="element_150"/>
      <circle cx="155" cy="752" r="10" fill="#E1A79A" id="element_151"/><circle cx="187" cy="752" r="10" fill="#E2D0BA" id="element_152"/><circle cx="219" cy="752" r="10" fill="#BFCCD0" id="element_153"/>
      <text x="261" y="762" class="ui" font-size="31" fill="#34464D" id="element_154">File Explorer</text>
      <rect x="138" y="817" width="802" height="70" rx="14" fill="#F8FAFA" stroke="#E7EBEA" stroke-width="2" id="element_155"/>
      <path d="M173 843L156 853L173 863" stroke="#91A0A5" stroke-width="6" fill="none" stroke-linecap="round" id="element_156"/>
      <text x="211" y="864" font-size="27" fill="#4C5B60" font-weight="760" id="element_157">E:  ›  _ISO</text>
      <path d="M140 923H938" stroke="#E9EDED" stroke-width="2" id="element_158"/>
     </g>
     <rect x="150" y="947" width="777" height="115" rx="20" fill="#F8FAFA" stroke="#E6EBEB" stroke-width="3" id="element_159"/><circle cx="209" cy="1006" r="30" fill="#E5F2F9" id="element_160"/><text x="209" y="1016" text-anchor="middle" font-size="27" font-weight="900" fill="#408DBA" id="element_161">10</text><text x="280" y="1019" font-size="37" font-weight="800" fill="#34464B" id="element_162">Windows 10</text><g id="check1"><circle cx="873" cy="1004" r="20" fill="#DFF4E8" id="element_163"/><path d="M861 1004L870 1013L884 995" fill="none" stroke="#31A878" stroke-width="5" id="element_164"/></g>
     <rect x="150" y="1080" width="777" height="115" rx="20" fill="#F8FAFA" stroke="#E6EBEB" stroke-width="3" id="element_165"/><circle cx="209" cy="1139" r="30" fill="#E5F2F9" id="element_166"/><text x="209" y="1149" text-anchor="middle" font-size="27" font-weight="900" fill="#408DBA" id="element_167">11</text><text x="280" y="1152" font-size="37" font-weight="800" fill="#34464B" id="element_168">Windows 11</text><g id="check2"><circle cx="873" cy="1137" r="20" fill="#DFF4E8" id="element_169"/><path d="M861 1137L870 1146L884 1128" fill="none" stroke="#31A878" stroke-width="5" id="element_170"/></g>
     <rect x="150" y="1214" width="777" height="115" rx="20" fill="#F8FAFA" stroke="#E6EBEB" stroke-width="3" id="element_171"/><circle cx="209" cy="1273" r="30" fill="#F8ECE5" id="element_172"/><text x="209" y="1282" text-anchor="middle" font-size="28" font-weight="900" fill="#CA8055" id="element_173">L</text><text x="280" y="1287" font-size="37" font-weight="800" fill="#34464B" id="element_174">Linux</text><g id="check3"><circle cx="873" cy="1273" r="20" fill="#DFF4E8" id="element_175"/><path d="M861 1273L870 1282L884 1264" fill="none" stroke="#31A878" stroke-width="5" id="element_176"/></g>
  </g>
  <g id="extraFile" filter="url(#mild)"><rect width="180" height="154" rx="24" fill="white" stroke="#D98C66" stroke-width="4" id="element_177"/><path d="M52 24H111L132 45V113H52Z" fill="#FCF0E9" stroke="#D98C66" stroke-width="4" id="element_178"/><rect x="65" y="68" width="54" height="28" rx="6" fill="#D98C66" id="element_179"/><text x="92" y="88" text-anchor="middle" fill="white" font-size="18" font-weight="800" id="element_180">ISO</text><text x="90" y="137" text-anchor="middle" fill="#59686B" font-size="21" font-weight="820" id="element_181">MINT</text></g>
  <g id="finalChip" filter="url(#mild)"><rect x="266" y="1400" width="555" height="90" rx="29" fill="#263840" id="element_182"/><text x="545" y="1457" text-anchor="middle" font-size="42" fill="white" font-weight="850" id="element_183">SATU FLASHDISK.</text></g>
 </g></svg>`;
