# FILE CHANGE ONLY — Design v2.1 review

Baseline `MotionGraphic-Studio-FULL-v2.0.0-20261128-052311.zip` SHA256 `7a26594b65e7dd406a9b2962dac1174dfc28e4a86be4d68e306b83efa9bc40d2`.

Tutup Studio dan backup projects/sharing-printer-lan di luar Master. Cocokkan hash sebelum replace. Ekstrak ZIP di luar Master lalu copy folder projects ke root Master. Font resmi sudah ada pada library/fonts/official di baseline. Copy folder lokal tersebut (bukan download baru), dari root PowerShell:

```powershell
Copy-Item -Path "library\fonts\official" -Destination "projects\sharing-printer-lan\public\fonts" -Recurse
```
Jika folder fonts sudah ada, jangan timpa tanpa verifikasi. Pastikan public/fonts/font-lock.json ada, lalu `npm run sync`, `npm run dev`. Font binary tidak disertakan. Loader adalah generator resmi Master.

Scope: hanya style dan layout Sharing Printer. Tidak mengubah manifest, durasi, VO, SFX, state ACC, board generated, atau engine. DesignContract legacy dipertahankan (opening ACC tidak menduplikasi guide; gate compact saat ini tidak mempunyai exception). Preview baru perlu ACC user.

## File hashes

| Path | Base SHA256 | New SHA256 |
|---|---|---|
| `projects/sharing-printer-lan/PANDUAN-EDIT-ASSET.md` | `9757909c4596def999f59e1568aa1ebaaace050b5277a3873b1f6e9359b4e5f1` | `306465cb1907fdd45d845302c11ea14a735730fa0dfabe128299b084d5df0287` |
| `projects/sharing-printer-lan/PROJECT-SCOPE.md` | `ecb20f6fa67596a8cede78ae20c3c1001500ba66d9a41b2b7297a3d67acafac3` | `23ff4c4216f48cf2b249e3d9d1cb97ecdc32c1d08d917a7215ee7bc11268c10d` |
| `projects/sharing-printer-lan/QA-REPORT.md` | `61daf3e4df190aca471540563c604311afb1675f1ae4b2c52f1b7e279f6e22ef` | `e6bd825ea3afc7f86645bba9f4bbaba6d9a557fa2f62de639eb5fb32c2b6e9ac` |
| `projects/sharing-printer-lan/production/editable-blueprint.json` | `4665430b009dbff884554515482b5187597993fedbdf9c53b91c9caf739cc584` | `09ffa6e606110b2390bed5ce1059fa6deedd56bf51e46d7ef140aa59b77e70e2` |
| `projects/sharing-printer-lan/production/motion-plan.json` | `09f8be2570d54eb4e8b0caf8dca4d54325fac047c6c724977b865e8f913a8172` | `173b1ec1e1d8bed9e9d9949cf277b9eea2c78b9d825003482bb15b37d151b901` |
| `projects/sharing-printer-lan/production/spatial-plan.json` | `7ce26eec8df34eec6701e7ebcfbe0319585aecff5067b96e894d700c50b2b124` | `8a5625a61ff8bf55ee54933f63a093982a31f25893b76c1330f1db74470693b0` |
| `projects/sharing-printer-lan/src/SegmentVideo.tsx` | `c8eb2e046dc523473a7af085c6ecaf0385de2e42d4ad3450cbbe1e046a9b4554` | `2c827ac57c84d0b6edc508500e8db7bf41e4e57559b3390723c0987e2b39a928` |
| `projects/sharing-printer-lan/src/Video.tsx` | `319034aa500990441fe1485b310406088a30171dd9a3501eba9e9a81db990d5a` | `5a56497d66836731c337e5ea58b16e00d5c9a86d490c8186c2a9f1d168006ee2` |
| `projects/sharing-printer-lan/src/components/CTA07Artwork.tsx` | `0a93e64be804e573ca1f8c4af7476268853bcb05bb6bf62fec4a6847d2fe7c07` | `58c3ab8d4ecc2f8aaf9d60037ac4fd7f4621f0a4039dc25e1733b567fc230fb4` |
| `projects/sharing-printer-lan/src/components/Captions01.tsx` | `d9a9b24f90501f96a197418262558140adb1733cdbcabe4accd3b79a697f25d9` | `4b13c4904a893ea335069c247811e30bba9f296d8186a71e9246b0753ab49fb1` |
| `projects/sharing-printer-lan/src/components/Captions02.tsx` | `521fd6ffd12cdc6aa21ba38f4049e07baf8d2e0b50120561316b90cc5875e635` | `2be6ac80c2680425cd9566ccda25e3713e0d233c9442f9c1bc0d0cc2cae9a477` |
| `projects/sharing-printer-lan/src/components/Captions03.tsx` | `5c1ec354c0190db6287913e11b52f868f53a41a42136f05982014bfed7309c59` | `81c6dd217322fac6d80014a6b2bb128c6ba8a046ee023686507445660f377012` |
| `projects/sharing-printer-lan/src/components/Captions04.tsx` | `67ed5009e9feb7465ce9bb45766416b367556d9606a4b519002c0bda399e125a` | `70d329356ef773f8fbeffec652be0c37572b56659980fb695aaf6daac4beb948` |
| `projects/sharing-printer-lan/src/components/Captions05.tsx` | `231b84600414554a345f06939e2f2136c44346f71439f7ba906b1d29657c0bcd` | `f8b0eb52f9395c7227a689e78c883735b8b65c242f547e8d13d256c9ea0f8b32` |
| `projects/sharing-printer-lan/src/components/Captions06.tsx` | `54b2a09b56c0c9466c25ef1896447f68473e25679c4679972423b485377cde87` | `f41b0425cb97a44efb33746f1f977d985d1f71193d0b5cf7371e45493bdad05c` |
| `projects/sharing-printer-lan/src/components/Captions07.tsx` | `168f1755deebc3e277f921b17fe48506f924e695be8cbf27bcaac5d7630ccbd7` | `ece600ac3bc91bc6a4cad488ed4beff484a18063f3ce2a253f14a5877edd0327` |
| `projects/sharing-printer-lan/src/components/Cover08Artwork.tsx` | `2257ed1da0f35c16a92ecb6fbfd5ee989b109311ccdfd5922136795525b2a71a` | `7d25eef4bcbfb0ad08139132e28cb29009117fe7a09821495429bc5254126e05` |
| `projects/sharing-printer-lan/src/components/LocalFonts.tsx` | `NEW` | `fca09c51364f66a2d2d3b9235adc3e6367087d4ba06a94d0538a1fe00ee3e39d` |
| `projects/sharing-printer-lan/src/components/SceneLayout.tsx` | `NEW` | `de0f3e29debf4e0aa43d85b57f614fd06e1267dc8937cd857f9759aef165adee` |
| `projects/sharing-printer-lan/src/components/Topology01.tsx` | `da0c7a17135d423808089d874ba02d2030288285397bd4b662c441b25c26cbce` | `2e5a562de65ebbdb406a4edf54be6b015207d147e50d1b18000606a4fa2787a9` |
| `projects/sharing-printer-lan/src/components/Topology02.tsx` | `692211c88b1ad7569bbd1fd041f71bdc48cfe7e3d10097e5c348746e1943dd51` | `6c5595e07fceb06c02bd65208c7ed3678e35ce1e122759143964c3f577d8b835` |
| `projects/sharing-printer-lan/src/components/Topology03.tsx` | `065a65549b0b132f236971e6cac9d2d047ee7a7632c1285847613014b92619d7` | `f090b4b5ed73ab0e1c74590e42bf13304ad1b19398e3c41114fdf9c35bfeed7f` |
| `projects/sharing-printer-lan/src/components/Topology05.tsx` | `f6b0dec1592e62333f8f71d895adfe68fda8e5258582160cde326c8fb60dc467` | `e705833c6893ba6bd367cde988446c6fd20fc35d395a57343e9be10afd431f67` |
| `projects/sharing-printer-lan/src/components/Topology06.tsx` | `6e713d729db03ecb9a6109cdac8687b562859e834468f7e4c5056dd781df8e45` | `4e9fd900fc6927fc0c87b666f1317f3bb1fc624a1430762a98a5811e9ff5e8bb` |
| `projects/sharing-printer-lan/src/components/WindowsPrintUI.tsx` | `b0a6253acabf818ac4ef13c0c7e49adc156de86d077f13d73be2a2e5e1fe916a` | `e992b948e2006a6e087425c0c3a45dced8e7cf7dc74eb30426efa6410c6bd202` |
| `projects/sharing-printer-lan/src/scenes/Scene01Question.tsx` | `00dd1dfefcaa1f603f5a1664e07124c094489593f59c290eac64870ee4ec5ce5` | `4e15db2a89158448a8bc29550ee29fe13e5b6caecf7bc90c8bed4c6911ead3cf` |
| `projects/sharing-printer-lan/src/scenes/Scene01Response.tsx` | `766c93ba14495053608b00abb6370b1a934620f0212205de77f1d3b46d7e92e3` | `281688a155697e6c61ecd6eb1d5697a8c335f9443e7420368c2a489878f726aa` |
