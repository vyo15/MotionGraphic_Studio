/**
 * S03 — SVG vector editabel. Tiap grup (A..E) adalah satu komposisi.
 * Elemen seperti aUsb, bPointer, cWindow, dButton, eProgress tetap berupa
 * vector terpisah, bukan video atau bitmap hasil flatten.
 * Elemen/koordinat detail dapat diedit pada string SVG ini.
 */
export const SCENE03_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920">
<defs>
 <pattern id="grid" width="52" height="52" patternUnits="userSpaceOnUse"><path d="M52 0H0V52" stroke="#C6CAC7" stroke-width="1" fill="none" opacity=".23"/></pattern>
 <filter id="shadow" x="-40%" y="-45%" width="180%" height="200%"><feDropShadow dx="0" dy="20" stdDeviation="24" flood-color="#1F3038" flood-opacity=".14"/></filter>
 <filter id="mild" x="-40%" y="-45%" width="180%" height="200%"><feDropShadow dx="0" dy="9" stdDeviation="14" flood-color="#1F3038" flood-opacity=".13"/></filter>
 <linearGradient id="usb" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#405059"/><stop offset="1" stop-color="#17242B"/></linearGradient>
 <linearGradient id="coral" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#F0A07D"/><stop offset="1" stop-color="#D77656"/></linearGradient>
 <clipPath id="progressClip"><rect x="224" y="1080" width="635" height="29" rx="14.5"/></clipPath>
</defs>
<rect width="1080" height="1920" fill="#F7F7F5" id="element_001"/><rect width="1080" height="1920" fill="url(#grid)" id="element_002"/>
<circle cx="1030" cy="612" r="370" fill="#F2E4DD" opacity=".28" id="element_003"/><circle cx="40" cy="1490" r="335" fill="#E8EEF0" opacity=".24" id="element_004"/>
<g id="micro"><rect x="91" y="264" width="10" height="29" rx="4" fill="#DF805F" id="element_005"/><text x="120" y="288" font-size="27" font-weight="760" fill="#636B6D" id="element_006">EASY2BOOT</text><text x="987" y="288" text-anchor="end" font-size="25" font-weight="760" fill="#A1A8A7" id="element_007">03 / PERSIAPAN</text></g>
<g id="footer"><path d="M90 1536H990" stroke="#E1E2DE" stroke-width="2" id="element_008"/><rect x="90" y="1573" id="timebar" width="0" height="6" rx="3" fill="#DF805F"/><text x="90" y="1617" font-size="23" font-weight="720" letter-spacing="1.4" fill="#929898" id="element_009">EASY2BOOT — SATU USB, BANYAK PILIHAN</text><text x="990" y="1617" font-size="23" font-weight="700" text-anchor="end" fill="#AAB0AF" id="element_010">03/06</text></g>
<!-- Reminder of list from scene 2, physically carried into the backup story -->
<g id="carry">
 <g id="dtitle"><text x="91" y="422" class="med" font-size="60" fill="#7E8787" id="element_011">BEBERAPA</text><text x="86" y="543" class="heavy" font-size="107" fill="#202628" id="element_012">INSTALL<tspan fill="#DF805F">ER.</tspan></text></g>
 <g id="dpanel" filter="url(#shadow)">
  <rect x="100" y="682" width="880" height="635" rx="36" fill="white" stroke="#E5E9E8" stroke-width="3" id="element_013"/>
  <rect x="100" y="682" width="880" height="87" rx="36" fill="#F3F6F6" id="element_014"/><rect x="100" y="726" width="880" height="43" fill="#F3F6F6" id="element_015"/>
  <circle cx="154" cy="725" r="12" fill="#E1A79A" id="element_016"/><circle cx="190" cy="725" r="12" fill="#E2D0BA" id="element_017"/><circle cx="226" cy="725" r="12" fill="#BFCCD0" id="element_018"/>
  <text x="282" y="738" font-size="32" font-weight="820" fill="#526067" id="element_019">ISI FLASHDISK</text>
  <g id="row1"><rect x="143" y="809" width="795" height="134" rx="21" fill="#F9FBFB" stroke="#E7EBEB" stroke-width="2" id="element_020"/><rect x="167" y="837" width="73" height="78" rx="15" fill="#E7F2F8" id="element_021"/><path d="M188 857H222M188 870H222M188 884H213" stroke="#4A97C6" stroke-width="5" stroke-linecap="round" id="element_022"/><text x="266" y="891" font-size="44" font-weight="820" fill="#2B393F" id="element_023">Windows 10</text><circle cx="886" cy="876" r="23" fill="#E3F6EC" id="element_024"/><path d="M874 877L883 887L899 867" stroke="#31A878" stroke-width="6" fill="none" stroke-linecap="round" id="element_025"/></g>
  <g id="row2"><rect x="143" y="967" width="795" height="134" rx="21" fill="#F9FBFB" stroke="#E7EBEB" stroke-width="2" id="element_026"/><rect x="167" y="995" width="73" height="78" rx="15" fill="#E7F2F8" id="element_027"/><path d="M188 1015H222M188 1028H222M188 1042H213" stroke="#4A97C6" stroke-width="5" stroke-linecap="round" id="element_028"/><text x="266" y="1049" font-size="44" font-weight="820" fill="#2B393F" id="element_029">Windows 11</text><circle cx="886" cy="1034" r="23" fill="#E3F6EC" id="element_030"/><path d="M874 1035L883 1045L899 1025" stroke="#31A878" stroke-width="6" fill="none" stroke-linecap="round" id="element_031"/></g>
  <g id="row3"><rect x="143" y="1125" width="795" height="134" rx="21" fill="#F9FBFB" stroke="#E7EBEB" stroke-width="2" id="element_032"/><rect x="167" y="1153" width="73" height="78" rx="15" fill="#F7ECE6" id="element_033"/><path d="M188 1173H222M188 1186H222M188 1200H213" stroke="#C88250" stroke-width="5" stroke-linecap="round" id="element_034"/><text x="266" y="1207" font-size="44" font-weight="820" fill="#2B393F" id="element_035">Linux</text><circle cx="886" cy="1192" r="23" fill="#E3F6EC" id="element_036"/><path d="M874 1193L883 1203L899 1183" stroke="#31A878" stroke-width="6" fill="none" stroke-linecap="round" id="element_037"/></g>
 </g>
 <g id="dtag" filter="url(#mild)"><rect x="211" y="1364" width="663" height="89" rx="32" fill="#26343C" id="element_038"/><text x="544" y="1422" fill="white" text-anchor="middle" font-size="41" font-weight="830" id="element_039">DALAM SATU FLASHDISK</text></g></g>
<!-- A: copy user files out of USB before creating E2B drive -->
<g id="A" opacity="0">
 <g id="aTitle"><text x="90" y="432" font-size="68" class="med" fill="#7E8787" id="element_040">PERTAMA,</text><text x="86" y="561" font-size="111" class="heavy" fill="#202628" id="element_041">BACKUP <tspan fill="#DF805F">DATA.</tspan></text></g>
 <g id="aUsb" filter="url(#shadow)">
   <rect x="125" y="989" width="115" height="110" rx="8" fill="#B4C4C9" stroke="#8C9FA8" stroke-width="3" id="element_042"/>
   <rect x="154" y="1007" width="24" height="32" rx="3" fill="#869CA7" id="element_043"/><rect x="194" y="1007" width="24" height="32" rx="3" fill="#869CA7" id="element_044"/>
   <rect x="220" y="948" width="345" height="196" rx="36" fill="url(#usb)" id="element_045"/><path d="M220 983Q220 948 256 948H290V1144H255Q220 1144 220 1108Z" fill="url(#coral)" id="element_046"/>
   <text x="331" y="1025" font-size="22" font-weight="800" fill="#B6C6CC" id="element_047">USB DRIVE</text><text x="326" y="1112" font-size="62" font-weight="850" fill="white" id="element_048">E:</text>
 </g>
 <path id="copyPath" d="M508 953Q548 770 700 790" fill="none" stroke="#DF805F" stroke-width="5" stroke-dasharray="13 16" opacity=".5"/>
 <g id="aFolder" filter="url(#shadow)"><rect x="651" y="809" width="294" height="286" rx="32" fill="white" stroke="#E7E8E7" stroke-width="3" id="element_049"/><path d="M714 906V865Q714 848 732 848H796L817 868H878Q896 868 896 888V1015Q896 1035 876 1035H732Q714 1035 714 1015Z" fill="#F2CBAA" id="element_050"/><rect x="714" y="889" width="182" height="146" rx="17" fill="#F1B985" id="element_051"/><text x="799" y="1080" text-anchor="middle" font-size="25" fill="#636B6D" font-weight="730" id="element_052">BACKUP</text></g>
 <g id="file1" filter="url(#mild)"><rect width="132" height="116" rx="17" fill="white" stroke="#E1E7E6" stroke-width="3" id="element_053"/><path d="M43 26H81L99 44V92H43Z" fill="#E7F2F8" stroke="#6EA3BE" stroke-width="3" id="element_054"/><path d="M52 54H87M52 68H84M52 81H78" stroke="#6EA3BE" stroke-width="5" stroke-linecap="round" id="element_055"/></g>
 <g id="file2" filter="url(#mild)"><rect width="132" height="116" rx="17" fill="white" stroke="#E1E7E6" stroke-width="3" id="element_056"/><path d="M43 26H81L99 44V92H43Z" fill="#E9F4EB" stroke="#81B58F" stroke-width="3" id="element_057"/><path d="M52 54H87M52 68H84M52 81H78" stroke="#81B58F" stroke-width="5" stroke-linecap="round" id="element_058"/></g>
 <g id="aDone" filter="url(#mild)"><rect x="266" y="1237" width="555" height="99" rx="30" fill="#273841" id="element_059"/><circle cx="320" cy="1286" r="23" fill="#31A878" id="element_060"/><path d="M309 1287L319 1297L336 1276" stroke="white" stroke-width="7" fill="none" stroke-linecap="round" id="element_061"/><text x="366" y="1301" font-size="39" fill="white" font-weight="830" id="element_062">DATA SUDAH AMAN</text></g>
</g>
<!-- B: desktop file explorer action: double-click executable -->
<g id="B" opacity="0">
 <g id="bTitle"><text x="92" y="437" font-size="67" class="med" fill="#7E8787" id="element_063">BUKA</text><text x="87" y="558" font-size="108" class="heavy" fill="#DF805F" id="element_064">EASY2BOOT.</text></g>
 <g id="bExplorer" filter="url(#shadow)">
   <rect x="98" y="717" width="885" height="640" rx="32" fill="white" stroke="#E2E7E7" stroke-width="3" id="element_065"/><rect x="98" y="717" width="885" height="91" rx="32" fill="#F3F6F6" id="element_066"/><rect x="98" y="764" width="885" height="44" fill="#F3F6F6" id="element_067"/>
   <text x="164" y="773" font-size="36" font-weight="760" fill="#34444B" id="element_068">📁</text><text x="215" y="776" font-size="31" font-weight="790" fill="#4A565B" id="element_069">Easy2Boot_v2.xx</text>
   <rect x="142" y="850" width="797" height="79" rx="15" fill="#F8FAFA" stroke="#E7EBEB" stroke-width="2" id="element_070"/><text x="172" y="901" font-size="31" fill="#6D797B" font-weight="650" id="element_071">Name</text><text x="825" y="901" font-size="29" text-anchor="end" fill="#99A0A1" font-weight="650" id="element_072">Type</text>
   <rect id="exeSelect" x="142" y="951" width="797" height="142" rx="20" fill="#EDF5F9" stroke="#A5CBDC" stroke-width="3"/>
   <rect x="175" y="982" width="94" height="87" rx="17" fill="#E7F2F8" id="element_073"/><path d="M204 1000H239V1049H204Z" fill="#5D94B6" id="element_074"/><path d="M213 1014H230M213 1025H230M213 1036H226" stroke="white" stroke-width="5" stroke-linecap="round" id="element_075"/>
   <text x="300" y="1017" font-size="49" font-weight="830" fill="#26353E" id="element_076">Make_E2B.exe</text><text x="300" y="1062" font-size="28" font-weight="640" fill="#8A979B" id="element_077">Application</text>
   <text x="894" y="1027" text-anchor="end" font-size="28" fill="#9FA5A6" id="element_078">EXE</text>
   <path d="M153 1136H923" stroke="#E7EAEA" stroke-width="3" id="element_079"/>
   <rect x="172" y="1184" width="404" height="79" rx="19" fill="#26353D" id="element_080"/><text x="374" y="1237" fill="white" text-anchor="middle" font-size="31" font-weight="800" id="element_081">BUKA APLIKASI</text>
 </g>
 <g id="bPointer"><path d="M0 0L3 58L18 45L30 78L45 72L31 39L50 39Z" fill="white" stroke="#26343C" stroke-width="6" stroke-linejoin="round" id="element_082"/></g>
 <g id="bClick"><circle cx="0" cy="0" r="40" stroke="#DF805F" stroke-width="8" fill="none" id="element_083"/><circle cx="0" cy="0" r="13" fill="#DF805F" id="element_084"/></g>
</g>
<!-- C: faithful simplified Make_E2B.exe control grouping -->
<g id="C" opacity="0">
 <g id="cTitle"><text x="89" y="429" font-size="70" class="med" fill="#7E8787" id="element_085">PASTIKAN</text><text x="87" y="558" font-size="112" class="heavy" fill="#202628" id="element_086">PILIH <tspan fill="#DF805F">USB.</tspan></text></g>
 <g id="cWindow" filter="url(#shadow)">
   <rect x="95" y="685" width="893" height="671" rx="31" fill="white" stroke="#DEE5E5" stroke-width="3" id="element_087"/>
   <rect x="95" y="685" width="893" height="85" rx="31" fill="#EDF1F2" id="element_088"/><rect x="95" y="735" width="893" height="35" fill="#EDF1F2" id="element_089"/>
   <rect x="131" y="714" width="24" height="28" rx="5" fill="#DF805F" id="element_090"/><text x="174" y="742" font-size="29" fill="#3B484F" font-weight="790" id="element_091">Make_E2B.exe</text>
   <text x="930" y="737" font-size="30" text-anchor="end" fill="#A1A9AD" id="element_092">−   □   ×</text>
   <text x="139" y="817" font-size="28" font-weight="780" fill="#717D7F" id="element_093">USB DRIVE</text>
   <rect id="cDrive" x="133" y="842" width="674" height="101" rx="14" fill="#F7FBFB" stroke="#BACBCF" stroke-width="3"/>
   <text x="164" y="904" font-size="39" font-weight="820" fill="#273741" id="element_094">E: USB Flash Drive  —  32 GB</text>
   <path d="M748 883L768 903L788 883" fill="none" stroke="#55686F" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" id="element_095"/>
   <rect x="826" y="842" width="127" height="102" rx="14" fill="#ECF1F1" stroke="#DDE6E4" stroke-width="3" id="element_096"/><text x="889" y="904" text-anchor="middle" font-size="25" font-weight="790" fill="#58686D" id="element_097">Refresh</text>
   <rect x="131" y="975" width="822" height="259" rx="18" fill="#F6F8F8" stroke="#E2E8E7" stroke-width="2" id="element_098"/>
   <rect x="169" y="1021" width="450" height="146" rx="19" fill="#D95E4F" id="element_099"/><path d="M220 1094H271M256 1077L277 1094L256 1111" stroke="white" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round" id="element_100"/>
   <text x="298" y="1109" font-size="33" fill="white" font-weight="830" id="element_101">Make E2B Drive</text>
   <path d="M660 1037L685 995L710 1037Z" fill="#E69D61" id="element_102"/><rect x="682" y="1009" width="6" height="17" fill="white" id="element_103"/><circle cx="685" cy="1032" r="3" fill="white" id="element_104"/>
   <text x="650" y="1085" font-size="24" font-weight="830" fill="#8B6462" id="element_105">Warning:</text><text x="651" y="1125" font-size="24" font-weight="700" fill="#956D67" id="element_106">USB drive will</text><text x="651" y="1165" font-size="24" font-weight="700" fill="#956D67" id="element_107">be erased!</text>
   <text x="140" y="1299" font-size="25" font-weight="660" fill="#9AA6A7" id="element_108">Simulasi UI • Pilih kapasitas &amp; nama USB yang benar</text>
 </g>
 <g id="cDrop" filter="url(#mild)"><rect x="133" y="944" width="674" height="128" rx="14" fill="white" stroke="#BECBD0" stroke-width="3" id="element_109"/><rect x="149" y="955" width="643" height="106" rx="11" fill="#FDEFEA" id="element_110"/><text x="169" y="1019" font-size="36" font-weight="800" fill="#46555B" id="element_111">E: USB Flash Drive — 32 GB</text><path d="M747 1003L764 1021L792 981" stroke="#31A878" stroke-width="8" fill="none" stroke-linecap="round" id="element_112"/></g>
 <g id="cFocus"><rect x="132" y="841" width="678" height="102" rx="16" fill="none" stroke="#DF805F" stroke-width="8" id="element_113"/></g>
 <g id="cPointer"><path d="M0 0L3 58L18 45L30 78L45 72L31 39L50 39Z" fill="white" stroke="#25343B" stroke-width="6" stroke-linejoin="round" id="element_114"/></g>
 <g id="cClick"><circle cx="0" cy="0" r="38" fill="none" stroke="#DF805F" stroke-width="8" id="element_115"/></g>
</g>
<!-- D: zoom in on actual warning + action, no fake dialog -->
<g id="D" opacity="0">
 <g id="dTitle"><text x="90" y="435" font-size="69" class="med" fill="#7E8787" id="element_116">LALU,</text><text x="87" y="561" font-size="109" class="heavy" fill="#202628" id="element_117">BUAT <tspan fill="#DF805F">USB.</tspan></text></g>
 <g id="dPanel" filter="url(#shadow)"><rect x="117" y="755" width="847" height="560" rx="34" fill="white" stroke="#E6E9E9" stroke-width="3" id="element_118"/>
   <rect x="156" y="815" width="768" height="92" rx="17" fill="#F3F7F7" id="element_119"/><text x="199" y="873" font-size="34" font-weight="750" fill="#58686B" id="element_120">E: USB Flash Drive — 32 GB</text><circle cx="861" cy="861" r="19" fill="#31A878" id="element_121"/><path d="M850 862L859 873L875 851" stroke="white" stroke-width="6" fill="none" stroke-linecap="round" id="element_122"/>
   <rect id="dButton" x="160" y="961" width="751" height="160" rx="23" fill="#D85F52"/><path d="M241 1044H310M294 1024L316 1044L294 1064" stroke="white" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round" id="element_123"/><text x="346" y="1057" fill="white" font-size="49" font-weight="840" id="element_124">Make E2B Drive</text>
   <g id="warning"><path d="M239 1185L267 1141L295 1185Z" fill="#E99C5F" id="element_125"/><rect x="264" y="1156" width="6" height="15" rx="3" fill="white" id="element_126"/><circle cx="267" cy="1178" r="3" fill="white" id="element_127"/><text x="315" y="1180" font-size="30" font-weight="760" fill="#9C665A" id="element_128">USB drive will be erased!</text></g>
   <text x="191" y="1265" fill="#A5ACAB" font-size="22" font-weight="710" id="element_129">SIMULASI TINDAKAN — BACKUP SEBELUM MELANJUTKAN</text>
 </g>
 <g id="dPointer"><path d="M0 0L3 58L18 45L30 78L45 72L31 39L50 39Z" fill="white" stroke="#24333B" stroke-width="6" stroke-linejoin="round" id="element_130"/></g>
 <g id="dClick"><circle cx="0" cy="0" r="50" stroke="#ECA98D" fill="none" stroke-width="12" id="element_131"/><circle cx="0" cy="0" r="15" fill="#F5B69C" id="element_132"/></g>
</g>
<!-- E: final progress outcome & visual bridge to File Explorer of next scene -->
<g id="E" opacity="0">
 <g id="eTitle"><text x="92" y="429" font-size="68" class="med" fill="#7E8787" id="element_133">SELESAI.</text><text x="87" y="559" font-size="106" class="heavy" fill="#202628" id="element_134">USB <tspan fill="#DF805F">SIAP.</tspan></text></g>
 <g id="eProgress" filter="url(#shadow)"><rect x="125" y="768" width="830" height="478" rx="33" fill="white" stroke="#E0E7E7" stroke-width="3" id="element_135"/>
  <circle cx="224" cy="875" r="45" fill="#E1F5EB" id="element_136"/><path d="M200 873L217 890L247 855" stroke="#31A878" stroke-width="12" fill="none" stroke-linecap="round" id="element_137"/>
  <text x="306" y="893" fill="#2B3E43" font-size="40" font-weight="850" id="element_138">USB multiboot selesai</text><text x="224" y="1019" font-size="29" font-weight="700" fill="#849396" id="element_139">Drive E: • Easy2Boot</text>
  <rect x="224" y="1080" width="635" height="29" rx="14.5" fill="#EEF0EF" id="element_140"/><g clip-path="url(#progressClip)" id="element_141"><rect id="eBar" x="224" y="1080" height="29" width="0" rx="14.5" fill="#31A878"/></g>
  <text x="224" y="1191" font-size="29" font-weight="720" fill="#7C8B8E" id="element_142">Siap untuk ditambahkan file ISO</text><text x="868" y="1191" text-anchor="end" font-size="56" font-weight="850" fill="#31A878" id="element_143">100%</text>
 </g>
 <g id="eFolder" filter="url(#mild)"><rect x="567" y="1279" width="410" height="137" rx="27" fill="#273941" id="element_144"/><path d="M609 1331V1309Q609 1296 622 1296H667L681 1310H715Q731 1310 731 1327V1368Q731 1386 714 1386H625Q609 1386 609 1368Z" fill="#E9B47D" id="element_145"/><text x="751" y="1363" fill="white" font-size="47" font-weight="850" id="element_146">_ISO</text></g>
 </g>
</svg>`;
