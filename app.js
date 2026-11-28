const P={va:[51.4965,-.1722],vacafe:[51.497757,-.172119],nhm:[51.4967,-.1764],portobello:[51.5154,-.2045],home:[51.4862,-.1225],bigben:[51.5007,-.1246],park:[51.5025,-.1348],palace:[51.5014,-.1419],tower:[51.5081,-.0759],borough:[51.5055,-.091],risotto:[51.50546,-.09087],bridge:[51.5055,-.0754],theatre:[51.513,-.1297],sky:[51.5113,-.0836],liverpool:[51.5178,-.0823],heathrow:[51.4700,-.4543],paddington:[51.5154,-.1755],stone:[51.1789,-1.8262],southken:[51.4941,-.1738],bourton:[51.8859,-1.7575],christchurch:[51.7499,-1.2555],merton:[51.7512,-1.2524],univ:[51.7525,-1.2520],radcliffe:[51.7534,-1.2539],bodleian:[51.7541,-1.254],sighs:[51.7545,-1.2537],sheldonian:[51.7541,-1.2544],blackwell:[51.7547,-1.2543],martyrs:[51.7564,-1.258],bibury:[51.758,-1.834],burford:[51.807,-1.636],oxford:[51.7548,-1.2544],notting:[51.5135,-.2036],covent:[51.5118,-.1225],neal:[51.5146,-.126],piccadilly:[51.5101,-.134],southbank:[51.5065,-.1168],river:[51.505,-.0805],museum:[51.5194,-.1269],leicester:[51.5105,-.1301],mm:[51.5108,-.1308],winter:[51.5085,-.1655],gallery:[51.5089,-.1283],regent:[51.5128,-.1398],carnaby:[51.5139,-.1399],oxfordst:[51.5154,-.1438],englishrose:[51.4988,-.1453],daunt:[51.5154,-.2056],waterstones:[51.5097,-.1356],greenpark:[51.5038,-.143],chipotle:[51.5192,-.1344],clapham:[51.4642,-.1703],gatwick:[51.1537,-.1821]};
const photoPages={"va":"Victoria and Albert Museum","nhm":"Natural History Museum, London","portobello":"Portobello Road","heathrow":"Heathrow Airport","paddington":"Paddington station","home":"Vauxhall, London","bigben":"Big Ben","park":"St James's Park","palace":"Buckingham Palace","tower":"Tower of London","borough":"Borough Market","bridge":"Tower Bridge","theatre":"Palace Theatre, London","stone":"Stonehenge","southken":"South Kensington tube station","bourton":"Bourton-on-the-Water","christchurch":"Christ Church Oxford","merton":"Merton College, Oxford","univ":"University College, Oxford","radcliffe":"Radcliffe Camera","bodleian":"Bodleian Library","sighs":"Bridge of Sighs Oxford","sheldonian":"Sheldonian Theatre","blackwell":"Blackwell UK bookshop","martyrs":"Martyrs Memorial Oxford","bibury":"Bibury","burford":"Burford","oxford":"University of Oxford","notting":"Notting Hill","covent":"Covent Garden","neal":"Neal's Yard","piccadilly":"Piccadilly Circus","southbank":"Southbank Centre","museum":"British Museum","leicester":"Leicester Square","winter":"Hyde Park Winter Wonderland","gallery":"National Gallery","greenpark":"Green Park","regent":"Regent Street","carnaby":"Carnaby Street","oxfordst":"Oxford Street","clapham":"Clapham Junction railway station","gatwick":"Gatwick Airport","sky":"Sky Garden, London","liverpool":"Liverpool Street station","englishrose":"The English Rose Cafe"};
const photoCache=new Map();
const directPhotos={sighs:"https://upload.wikimedia.org/wikipedia/commons/1/12/Hertford_Bridge%2C_Oxford_%2832544126966%29.jpg",blackwell:"https://upload.wikimedia.org/wikipedia/commons/6/66/Blackwell_bookstore.jpg",martyrs:"https://upload.wikimedia.org/wikipedia/commons/4/42/Martyrs_Memorial_Oxford.jpg",river:"https://offloadmedia.feverup.com/secretldn.com/wp-content/uploads/2025/10/29115353/Winter-By-The-River_2024_005-1-1024x640.jpg",southbank:"https://media.timeout.com/images/106210572/1920/1440/image.jpg",chipotle:"https://quickservemagazine.co.uk/perch/resources/chipotle-2-w1200h600.jpg",southken:"https://pub-5bcc3edf34304d04b59dc91e1ad9d2fd.r2.dev/uk.tortoisepath.com/uploads/2024/02/02212930/Bens-Cookies-South-Kensington-London-London-United-Kingdom-TortoisePathcom-jpeg.webp",vacafe:"https://upload.wikimedia.org/wikipedia/commons/d/d1/The_Gamble_Room%2C_the_original_cafe_at_the_Victoria_and_Albert_Museum_-_geograph.org.uk_-_1578323.jpg",risotto:'https://www.turnipsboroughmarket.com/wp-content/uploads/2025/07/Risotto_prep-2-scaled.jpg.webp',waterstones:'https://upload.wikimedia.org/wikipedia/commons/2/29/Waterstone%27s%2C_Piccadilly%2C_W1.jpg',mm:'https://upload.wikimedia.org/wikipedia/commons/4/4e/Panorama_showing_the_Lego_Store_and_M%26M%27s_world_in_Leicester_Square%2C_London.jpg'};
async function loadStopPhotos(){const photos=[...document.querySelectorAll('.stop-thumb[data-photo-key]')];await Promise.all([...new Set(photos.map(el=>el.dataset.photoKey))].map(async key=>{let url=directPhotos[key]||photoCache.get(key);if(url===undefined&&photoPages[key]){try{const endpoint='https://en.wikipedia.org/w/api.php?'+new URLSearchParams({action:'query',format:'json',prop:'pageimages',pithumbsize:'320',titles:photoPages[key],redirects:'1',origin:'*'});const res=await fetch(endpoint);if(!res.ok)throw Error('photo fetch failed');const json=await res.json();url=Object.values(json.query?.pages||{})[0]?.thumbnail?.source||null}catch{url=null}photoCache.set(key,url)}if(!url)return;document.querySelectorAll('.stop-thumb[data-photo-key]').forEach(el=>{if(el.dataset.photoKey!==key)return;el.onerror=()=>{el.hidden=true};el.src=url;el.hidden=false})}));}
const s=(key,name,time,desc,optional=false)=>({key,name,time,desc,optional});
const days=[
{date:'17',dow:'THU',short:'런던에 도착',title:'런던 도착 · 숙소 이동',summary:'인천 → 베이징 다싱 → 런던. 첫날은 편안하게 숙소까지.',note:'09:25 인천 출발 · 10:40 다싱 도착 · 14:35 런던행 출발. 항공편은 제공된 일정 기준입니다. Elizabeth line·36번 버스 운행 및 터미널 확인. 체크인 지연 시 호스트에게 연락하세요.',stops:[s('heathrow','히스로공항','17:55–19:45','입국심사·수하물 수령. 도착 터미널 확인'),s('paddington','Paddington','19:00–20:00','Elizabeth line → 36번 버스 환승 예정'),s('home','Vauxhall · 숙소','21:00–22:00','Nando’s Vauxhall Arches 근처 호스트 미팅 · 휴식')]},
{date:'18',dow:'FRI',short:'왕관 보석 & 랜드마크',title:'런던 주요 명소 · 해리포터 연극',summary:'빅벤·버킹엄궁·런던탑 왕관 보석·타워브리지, 저녁 7시 해리포터 연극 관람.',note:'김슬민 님과 동행 예정(변동 가능). 런던탑 관람 2시간 45분 확보 · 12:30 입장 목표. HRP 공식 달력 기준 12/18 09:00–16:30, 마지막 입장 15:00, 마지막 Yeoman Warder 투어 14:30. 타워브리지 이후 극장 이동 및 간단한 저녁 시간 확보. 왕관 보석 전시실 사진 촬영 금지. 18:30까지 Palace Theatre에 도착하세요. 공연 예매 확정 · Balcony C열 28번 · 난간 시야 제한 및 좁은 다리 공간 안내.',stops:[s('home','Vauxhall 출발','09:00–10:00','웨스트민스터로 이동'),s('bigben','빅벤 · 웨스트민스터','10:00–10:30','국회의사당과 빅벤 외관 사진'),s('park','세인트제임스 파크','10:30–11:00','공원을 지나 버킹엄궁 방향 산책'),s('palace','버킹엄궁','11:00–11:25','외관 구경 후 런던탑으로 이동'),s('tower','런던탑 · Crown Jewels 💎','12:30–15:15','12:30 입장 목표 · 성인 £38(기부금 제외) · 왕관 보석 포함 · 12/18 09:00–16:30, 마지막 입장 15:00 · 회차 잔여석 확인 필요'),s('borough','버러마켓','15:45–15:55','12/18 금요일 10:00–17:00 · 무료 · 식품 매대는 재고나 준비 상황에 따라 조기 마감 가능'),{...s('risotto','Turnips · Wild Mushroom Risotto','15:55–16:25','Three Crown Square · 43 Borough Market · 금요일 10:00–17:00, 월요일 휴무 · 가격과 맛보기 제공 여부 현장 확인 · 지도 핀은 매대 구역 근사 위치'),sub:true},s('bridge','타워브리지','16:25–17:00','다리 외관 · 템스강 풍경 촬영'),s('theatre','Palace Theatre · 해리포터 연극 🎭','18:30–21:55','19:00 공연 확정 · 18:30까지 도착 · Balcony C열 28번 · £30 · 난간 시야 제한 · 공식 예매: https://nimaxtheatres.com/shows/harry-potter-cursed-child/'),s('home','Vauxhall 숙소 복귀','22:00 이후','극장에서 Vauxhall로 이동 · 운행편 확인')]},
{date:'19',dow:'SAT',short:'영국 근교 여행 · 예약 완료',title:'스톤헨지 · 코츠월드 · 옥스퍼드 투어',summary:'한국인 가이드 종일 투어 예약 완료 · 07:20 사우스켄싱턴 Ben’s Cookies 집합, 07:30 출발.',note:'예약한 더트리퍼 상품 안내 기준. 07:20까지 South Kensington역(Zone 1) 인근 Ben’s Cookies 앞 집합, 07:30 출발. 상품 기준 최소 6인 · 수신기 £2, 3.5mm 유선 이어폰 준비(미지참 시 £2 구매 안내). South Kensington 귀환 예상 18:30–19:00. 차량·한국인 가이드 포함, 관광지 입장료는 별도(상품 안내: 스톤헨지 성인 £25, 크라이스트처치 칼리지 성인 약 £18~20). 각 관광지 세부 시각과 옥스퍼드 내 방문 순서는 현장 운영에 따라 달라질 수 있음. ',stops:[s('home','Vauxhall 숙소 출발','06:20–06:35 권장','07:20 집합에 맞춰 여유 있게 이동 · 실제 첫차/파업 확인'),s('southken','South Kensington · Ben’s Cookies','07:20 집합 · 07:30 출발','South Kensington역(Zone 1) 인근, Old Brompton Road · 가이드 미팅 후 전용 차량 탑승'),s('stone','스톤헨지','09:30–10:50','전용 차량으로 약 2시간 이동 · 투어사 권장 입장 09:30 · 입장권은 투어 출발 확정 후 별도 예매'),s('bourton','코츠월드 · 버턴 온 더 워터','12:30–14:00','마을 산책과 점심 · 이동 시간은 현장 상황에 따라 변동'),s('oxford','옥스퍼드 · 대학도시 투어','15:00–15:50 워킹 투어','상품 게시 일정 기준 · 이후 15:50 크라이스트처치 개별 입장 또는 자유시간 · 17:00 런던행 출발'),s('merton','머튼 칼리지','약 10분 안내','옥스퍼드의 오래된 칼리지 건물'),{...s('univ','유니버시티 칼리지','약 20분 안내','High Street의 칼리지 외관 · 건물 입장은 가이드 안내 기준'),sub:true},{...s('radcliffe','래드클리프 카메라','약 10분 안내','Radcliffe Square의 원형 열람실 외관 · 내부는 별도 공식 가이드 투어 확인'),sub:true},s('bodleian','보들리언 도서관','약 20분 안내','옥스퍼드 대학 도서관 외관 중심'),s('sighs','탄식의 다리','약 10분 안내','허트퍼드 칼리지 연결 통로'),s('sheldonian','셸도니언 극장','약 20분 안내','크리스토퍼 렌이 설계한 대학 행사장'),s('blackwell','블랙웰 서점','약 10분 안내','옥스퍼드의 유명 서점'),s('martyrs','순교자 기념탑','상품 상세 코스','종교개혁 당시 순교자들을 기리는 기념탑 · 실제 방문은 가이드 안내'),s('christchurch','크라이스트처치 칼리지','15:50–16:50 자유시간','해리포터 촬영지로 알려진 대학 · 투어사 권장 개별 입장 15:50 · 투어 출발 확정 후 예매 · 외관 관람 가능'),s('home','런던 복귀 · 숙소 이동','18:30–19:00 해산 예정','상품 안내상 18:30–19:00 South Kensington역 해산 예정 · 숙소행 버스와 파업 당일 운행 확인')]},
{date:'20',dow:'SUN',short:'골목 & 크리스마스 마켓',title:'노팅힐 · 시내 관광 · 크리스마스 마켓',summary:'노팅힐의 파스텔 골목과 포토벨로 특별 일요 마켓, 저녁 크리스마스 마켓.',note:'김슬민 님과 낮 일정, 김은재 님은 마켓부터 합류 예정(변동 가능). Daunt Books 노팅힐점은 일요일 11:00–18:00. 포토벨로 특별 일요 마켓은 10:00–16:00. 사우스뱅크 → 런던브리지 이동은 도보 또는 교통 이용.',stops:[s('home','Vauxhall 출발','09:00–09:50','아침 후 노팅힐 이동'),s('notting','노팅힐','09:50–10:00','파스텔 주택가를 지나 마켓으로 이동'),{...s('portobello','포토벨로 마켓 · 크리스마스 특별 일요 마켓','10:00–12:00','2026 Winter Sunday Markets: 12월 6·13·20일 10:00–16:00 · 무료 · 예약 불필요 · 빈티지, 선물, 간식 · 개별 매대 마감은 현장 확인'),sub:true},s('daunt','Daunt Books · 노팅힐','12:00–12:20','21 Kensington Park Road · 일요일 11:00–18:00'),s('notting','노팅힐 브런치','12:20–12:45','장소 선택 전 · Ladbroke Arms는 12/20 점심 1인 빈자리 없음(11/28 조회), 피쉬앤칩스 £27 + 12.5% 서비스료(공개 일요일 메뉴)'),s('covent','코벤트가든','13:15–14:15','크리스마스 장식 · 쇼핑'),s('neal','닐스야드','14:15–14:50','작은 골목 · 카페'),s('piccadilly','피카딜리 서커스','14:50–15:10','광장과 주변 거리 산책'),s('waterstones','Waterstones · Piccadilly','15:10–15:45','대형 서점 구경 · 주변 Tesco도 확인'),s('southbank','Southbank Winter Market','16:15–17:30','11/2 개장 · 12/20 매대 11:00–22:00, 바 23:00까지 · 무료, 마켓 예약 불필요 · 12/25·12/31·1/1 휴장, 1/3부터 종료'),s('river','Winter by the River','18:15–19:45','11/10–1/3 · 12/20 11:00–22:00 · 마켓 무료, 컬링 별도 · 12/25 휴장 · 12/24·1/3 17:00, 12/31 21:00 종료 · 매대별 마감 미공개'),s('home','저녁 · 숙소 복귀','20:00 이후','자유롭게 저녁 후 휴식')]},
{date:'21',dow:'MON',short:'박물관 & 원더랜드',title:'대영박물관 · 윈터 원더랜드',summary:'대영박물관 한국어 도슨트 예약 완료 · 저녁은 하이드파크에서.',note:'정신영 님과 동행 예정(윈터 원더랜드 포함 · 변동 가능). 예약 메일 기준 10:10 정문 맞은편 Starbucks(51 Great Russell St) 집합, 10:15 입장 및 투어 시작. 상품 기준 최소 4인, 3.5mm 유선 이어폰과 수신기 대여료 £2 준비. 윈터 원더랜드는 날짜·입장 시간을 지정해 예약하세요. Sky Garden은 15:30 일몰 후보이며 무료권이 확인되면 동선 조정. 윈터 원더랜드 18:00 회차의 가격·잔여석은 예매처에서 확인 필요.',stops:[s('home','Vauxhall 출발','09:00–10:00','아침 후 대영박물관 이동'),s('museum','대영박물관','10:10 집합–14:00','10:10 정문 맞은편 Starbucks 집합 · 10:15 입장 및 한국어 투어 · 이후 자유 관람 · 상설전 £0 · 월요일 10:00–17:00 · 12/24–26 휴관 · 14:00–15:00 점심'),s('leicester','레스터 스퀘어','15:00–15:30','Skate Leicester Square 부대 마켓 · 10/31–1/3 · 12/21 마켓 10:00–22:00 · 12/25 휴장 · 마켓 구경 무료, 스케이트는 별도 유료(마지막 21:15)'),s('mm','M&M’s World','15:30–15:50','초콜릿과 기념품 쇼핑'),s('winter','Hyde Park Winter Wonderland','18:00–20:30','11/19–1/3 · 12/21 10:00–22:00, 마지막 입장 21:30 · 12/25 휴장 · 시간 지정 입장권 필요 · 성인 안내가 일반 £5.50, 성수기 £8.25부터 · 18:00 실제 가격과 잔여석 미확인 · 놀이기구 별도'),s('home','숙소 복귀','20:30 이후','휴식')]},
{date:'22',dow:'TUE',short:'V&A · 자연사 · 미술 · 조명',title:'V&A · 자연사박물관 · 내셔널 갤러리',summary:'사우스켄싱턴에서 공예와 스콘, 자연사박물관을 즐기고 오후에는 명화와 크리스마스 조명.',note:'자연사박물관 11:15 성인 1명 무료 예약 완료. V&A와 카페 시각은 예상이며 내셔널 갤러리 14:00은 입장 목표 시각. 다음 날 체크아웃 준비.',stops:[s('home','Vauxhall 출발','09:00–10:00','사우스켄싱턴 이동'),{...s('va','빅토리아 앤 앨버트 박물관 · V&A','10:00–10:40','상설전 £0 · 일반 입장 예약 불필요 · 화요일 10:00–17:45(17:15부터 전시실 정리) · 12/24–26 휴관 · 캐스트 코트 중심 관람'),sub:true},{...s('vacafe','V&A Main Café · 스콘과 홍차','10:40–11:05','박물관 실내 카페 · 화요일 10:00–17:00 · 갓 구운 스콘과 홍차 · 클로티드 크림·딸기잼 제공 여부와 가격은 주문 전 확인'),sub:true},s('nhm','자연사박물관','11:15–13:15','11:15 성인 £0 입장권 예약 완료 · 힌츠 홀의 대왕고래와 공룡 중심 관람 · 특별전 별도 · 10:00–17:50, 마지막 입장 17:30 · 12/24–26 휴관'),s('gallery','내셔널 갤러리','14:00–17:00','14:00 입장 목표 · 예약 회신 대기 · Sainsbury Wing에서 무료 현장 입장 가능(대기 가능) · 점심은 이동 중 간단히 · 상설전 £0 · 특별전 별도 · 화요일 10:00–18:00 · 12/24–26 및 1/1 휴관'),s('regent','리젠트 스트리트','17:00–17:40','크리스마스 조명 감상'),s('carnaby','카나비 스트리트','17:40–18:20','조명과 상점 구경 · 개별 영업시간 확인'),s('oxfordst','옥스퍼드 스트리트','18:20–19:00','쇼핑 및 조명 · 개별 영업시간 확인'),s('chipotle','Chipotle · Tottenham Court Road','19:00–20:00','저녁 식사'),s('home','숙소 복귀','20:00 이후','짐 정리')]},
{date:'23',dow:'WED',short:'다시 집으로',title:'체크아웃 · 개트윅공항 출발',summary:'체크아웃 후 개트윅공항으로. 귀국 준비는 여유 있게.',note:'08:30–09:30 아침·짐 정리 · 숙소 체크아웃 규정 확인. 15:55 개트윅 출발, 투르크메니스탄항공 · 12/24 18:20 인천 도착 예정. 경유 공항과 연결편 세부 정보는 항공권에서 확인하세요.',stops:[s('home','숙소 체크아웃','09:30–10:30','아침·짐 정리 후 출발'),s('clapham','Clapham Junction','10:30–11:30','Vauxhall에서 이동 · Southern 등 공항행 열차 운행 확인'),s('gatwick','개트윅공항','11:30–15:55','11:30–12:30 도착 목표 · 체크인·보안검색 후 15:55 출발')]}
];
const travelLegs = {
  '17': [
    ["heathrow", "paddington", "transit", "Elizabeth line 약 30–45분", "터미널에서 역까지 걷는 시간 별도"],
    ["paddington", "home", "transit", "36번 버스 + 도보 약 45–65분", "New Cross 방향, Vauxhall 하차"]
  ],
  '18': [
    ["home", "bigben", "transit", "87번 버스 + 도보 약 15–30분", "Westminster 하차 · 도보 대안 약 25–30분"],
    ["bigben", "park", "walking", "도보 약 8–12분", "Parliament Square를 지나 공원 동쪽으로"],
    ["park", "palace", "walking", "도보 약 8–15분", "공원 산책로에서 Buckingham Palace 방향"],
    ["palace", "tower", "transit", "도보 + 15번 버스 약 45–60분", "Charing Cross 인근에서 Tower of London 방향 · 12:15 입장 준비"],
    ["tower", "borough", "walking", "도보 약 20–25분", "London Bridge를 건너 Borough Market으로"],
    ["borough", "risotto", "walking", "시장 안 도보 약 2–5분", "매대 위치는 현장 안내 확인"],
    ["risotto", "bridge", "walking", "도보 약 15–20분", "템스강 남쪽 산책로 이용"],
    ["bridge", "theatre", "transit", "도보 + 15번 버스 약 40–60분", "Tower Hill 쪽에서 Charing Cross 방향 · 18:30까지 극장 도착"],
    ["theatre", "home", "transit", "도보 + 87번 버스 약 25–40분", "Trafalgar Square에서 Vauxhall 방향"]
  ],
  '19': [
    ["home", "southken", "transit", "지하철 + 도보 약 30–45분", "Victoria line → Victoria에서 District 또는 Circle line 환승 · 첫차 확인"],
    ["southken", "stone", "driving", "투어 차량 약 1시간 45분–2시간 15분", "07:30 출발 · 교통 상황에 따라 변동"],
    ["stone", "bourton", "driving", "투어 차량 약 1시간 30분–2시간", "중간 정차·교통 상황에 따라 변동"],
    ["bourton", "oxford", "driving", "투어 차량 약 50–75분", "옥스퍼드 하차 지점은 가이드 안내"],
    ["oxford", "merton", "walking", "도보 약 5–15분", "옥스퍼드 하차 지점은 가이드 안내"],
    ["merton", "univ", "walking", "도보 약 4–7분"],
    ["univ", "radcliffe", "walking", "도보 약 4–7분"],
    ["radcliffe", "bodleian", "walking", "도보 약 1–3분"],
    ["bodleian", "sighs", "walking", "도보 약 1–3분"],
    ["sighs", "sheldonian", "walking", "도보 약 1–3분"],
    ["sheldonian", "blackwell", "walking", "도보 약 1–3분"],
    ["blackwell", "martyrs", "walking", "도보 약 4–7분"],
    ["martyrs", "christchurch", "walking", "도보 약 10–15분", "기념탑을 건너뛰면 실제 출발 지점이 달라질 수 있어요"],
    ["christchurch", "home", null, "투어 차량 약 1시간 45분–2시간 30분 + 숙소 이동", "상품 안내상 South Kensington역 18:30–19:00 도착 · 지하철 파업으로 숙소까지 버스 우선"]
  ],
  '20': [
    ["home", "notting", "transit", "452번 버스 + 도보 약 45–65분", "Notting Hill Gate 방향 · 오전 지하철 파업 예정"],
    ["notting", "portobello", "walking", "도보 약 10–15분", "Portobello Road를 따라 이동"],
    ["portobello", "daunt", "walking", "도보 약 5–12분", "마켓에서 둘러본 위치에 따라 변동"],
    ["daunt", "notting", null, "주변 식당까지 도보 약 5–15분", "브런치 장소 확정 후 조정"],
    ["notting", "covent", "transit", "지하철 + 도보 약 30–45분", "Central line → Tottenham Court Road · 지연 시 94번 버스 + 도보 약 45–65분"],
    ["covent", "neal", "walking", "도보 약 5–8분"],
    ["neal", "piccadilly", "walking", "도보 약 10–15분"],
    ["piccadilly", "waterstones", "walking", "도보 약 2–4분"],
    ["waterstones", "southbank", "walking", "도보 약 25–35분", "Golden Jubilee Bridge를 건너 Southbank Centre로"],
    ["southbank", "river", "walking", "도보 약 35–45분", "템스강 남쪽 산책로 이용 · 혼잡 시 여유 확보"],
    ["river", "home", "transit", "지하철 + 철도 약 30–45분", "London Bridge → Waterloo(Jubilee line) → Vauxhall(South Western Railway) · 지연 시 버스 확인"]
  ],
  '21': [
    ["home", "museum", "transit", "지하철 + 도보 약 25–40분", "Victoria line → Oxford Circus에서 Central line 환승 → Tottenham Court Road"],
    ["museum", "leicester", "walking", "도보 약 12–18분", "점심 시간 별도"],
    ["leicester", "mm", "walking", "도보 약 1–3분"],
    ["mm", "winter", "walking", "도보 약 30–45분", "Piccadilly를 따라 Hyde Park 방향 · 입장 게이트에 따라 변동 · 18:00 입장 전 자유시간"],
    ["winter", "home", "transit", "도보 + Victoria line 약 25–40분", "출구 위치에 따라 Green Park 또는 Victoria에서 Vauxhall 방향"]
  ],
  '22': [
    ["home", "va", "transit", "지하철 + 도보 약 30–45분", "Victoria에서 District 또는 Circle line 환승 → South Kensington"],
    ["va", "vacafe", null, "박물관 내부 도보 약 3–8분", "Main Café 표지판을 따라 이동"],
    ["vacafe", "nhm", "walking", "도보 약 5–10분", "Exhibition Road 또는 Cromwell Road 쪽 출입구와 보안 대기 확인"],
    ["nhm", "gallery", "transit", "Piccadilly line + 도보 약 25–35분", "South Kensington → Leicester Square · 점심 시간 별도"],
    ["gallery", "regent", "walking", "도보 약 10–15분", "Piccadilly Circus 쪽 리젠트 스트리트 기준"],
    ["regent", "carnaby", "walking", "도보 약 5–10분"],
    ["carnaby", "oxfordst", "walking", "도보 약 7–12분", "Oxford Circus 쪽 옥스퍼드 스트리트 기준"],
    ["oxfordst", "chipotle", "walking", "도보 약 12–20분", "Tottenham Court Road 방향"],
    ["chipotle", "home", "transit", "도보 + Victoria line 약 25–35분", "Oxford Circus까지 걸어서 이동 후 Vauxhall 방향"]
  ],
  '23': [
    ["home", "clapham", "transit", "South Western Railway + 도보 약 15–30분", "Vauxhall역에서 탑승 · Clapham Junction 환승"],
    ["clapham", "gatwick", "transit", "Southern 직통 열차 약 25–35분", "열차 대기·공항 내 터미널 이동 별도"]
  ]
};

const strikeNotices = {
  '17': '12/17 12:00~12/18 11:59 지하철 파업 예정. 공항에서는 Elizabeth line과 버스를 이용하는 경로를 우선 표시했어요.',
  '18': '지하철 파업 예정 시간은 11:59까지예요. 저녁까지 운행이 줄어들 수 있어 버스·도보 경로를 우선 표시했어요.',
  '19': '12/19 12:00~12/20 11:59 지하철 파업 예정. 오전 투어 집합 전에는 첫차와 운행 상태를 확인하고, 저녁에 런던으로 돌아오면 버스를 우선 확인하세요.',
  '20': '지하철 파업 예정 시간은 11:59까지예요. 오전 노팅힐행은 452번 버스를 우선 이용하고, 오후에도 지하철 운행 상태를 확인하세요.'
};

function renderTravelGuide(day) {
  const notice = strikeNotices[day.date];
  return `<p>이동 시간은 예상 범위예요. 교통편 대기·환승과 혼잡에 따라 달라질 수 있어요.</p>
    ${notice ? `<p><strong>지하철 파업 안내</strong> ${notice}</p>
      <a href="https://tfl.gov.uk/status-updates/strikes" target="_blank" rel="noopener">TfL 파업 공지 ↗</a> · ` : ''}
    <a href="https://tfl.gov.uk/tube-dlr-overground/status/" target="_blank" rel="noopener">TfL 실시간 운행 상태 ↗</a>
    ${day.date === '23' ? ' · <a href="https://www.nationalrail.co.uk/" target="_blank" rel="noopener">National Rail 운행 확인 ↗</a>' : ''}`;
}

function renderTravelLeg(day, index) {
  if (index === 0) return '';
  const previous = day.stops[index - 1];
  const current = day.stops[index];
  const leg = travelLegs[day.date]?.find(([from, to]) => from === previous.key && to === current.key);
  if (!leg) return '';
  const [, , mode, label, detail] = leg;
  const place = stop => encodeURIComponent(mapPlaces[stop.key] || stop.name + ', London, UK');
  const link = mode ? `<a href="https://www.google.com/maps/dir/?api=1&origin=${place(previous)}&destination=${place(current)}&travelmode=${mode}" target="_blank" rel="noopener" aria-label="${previous.name}에서 ${current.name}까지 길찾기">길찾기 ↗</a>` : '';
  return `<div class="travel-leg"><span class="travel-leg-arrow" aria-hidden="true">↓</span><div><strong>${label}</strong>${detail ? `<small>${detail}</small>` : ''}</div>${link}</div>`;
}
const $=id=>document.getElementById(id);
const stopNumber=(stops,n)=>{const main=stops.slice(0,n+1).filter(x=>!x.sub).length;return stops[n].sub?`${main}-${stops.slice(0,n+1).reverse().findIndex(x=>!x.sub)}`:String(main)};
const mapPlaces={va:'Victoria and Albert Museum, Cromwell Road, London SW7 2RL',vacafe:'V&A Main Café, Victoria and Albert Museum, Cromwell Road, London SW7 2RL',nhm:'Natural History Museum, Cromwell Road, London SW7 5BD, UK',portobello:'Portobello Road Market, London W11 1LJ, UK',
home:'Vauxhall Station, London, UK',bigben:'Big Ben, Westminster, London, UK',park:"St James's Park, London, UK",palace:'Buckingham Palace, London, UK',tower:'Tower of London, London, UK',borough:'Borough Market, London, UK',risotto:'Turnips, 43 Borough Market, Three Crown Square, London SE1 9AH, UK',bridge:'Tower Bridge, London, UK',theatre:'Palace Theatre, 113 Shaftesbury Avenue, London, UK',heathrow:'Heathrow Airport, London, UK',paddington:'Paddington Station, London, UK',stone:'Stonehenge, Salisbury, UK',southken:'Ben’s Cookies, South Kensington Station, Old Brompton Road, London, UK',bourton:'Bourton-on-the-Water, Gloucestershire, UK',christchurch:'Christ Church, Oxford, UK',merton:'Merton College, Oxford, UK',univ:'University College, High Street, Oxford, UK',radcliffe:'Radcliffe Camera, Radcliffe Square, Oxford, UK',bodleian:'Bodleian Library, Oxford, UK',sighs:'Bridge of Sighs, Oxford, UK',sheldonian:'Sheldonian Theatre, Oxford, UK',blackwell:'Blackwell’s Bookshop, Oxford, UK',martyrs:'Martyrs Memorial, Oxford, UK',bibury:'Bibury, Cotswolds, UK',burford:'Burford, Oxfordshire, UK',oxford:'Oxford, UK',notting:'Notting Hill, London, UK',covent:'Covent Garden, London, UK',neal:"Neal's Yard, London, UK",piccadilly:'Piccadilly Circus, London, UK',southbank:'Southbank Centre Winter Market, London, UK',river:'London Bridge City, London, UK',museum:'The British Museum, London, UK',leicester:'Leicester Square, London, UK',mm:"M&M's World London, Leicester Square, UK",winter:'Hyde Park Winter Wonderland, London, UK',gallery:'The National Gallery, London, UK',regent:'Regent Street, London, UK',carnaby:'Carnaby Street, London, UK',oxfordst:'Oxford Street, London, UK',englishrose:'The English Rose Cafe and Tea Shop, 4 Lower Grosvenor Place, London SW1W 0EJ, UK',daunt:'Daunt Books, 21 Kensington Park Road, London, UK',waterstones:'Waterstones Piccadilly, 203 Piccadilly, London, UK',greenpark:'Green Park, London, UK',chipotle:'Chipotle Mexican Grill, 64 Tottenham Court Road, London, UK',clapham:'Clapham Junction Station, London, UK',gatwick:'Gatwick Airport, UK',sky:'Sky Garden, London, UK',liverpool:'Liverpool Street Station, London, UK'};
const stopSources = {
  sighs: [["사진 Peter Trimming · CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Hertford_Bridge,_Oxford_(32544126966).jpg"]],
  blackwell: [["사진 Soham Banerjee · CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Blackwell_bookstore.jpg"]],
  martyrs: [["사진 Nikos D. Karabelas · CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Martyrs_Memorial_Oxford.jpg"]],
  southken: [["집합 장소 사진 · TortoisePath","https://uk.tortoisepath.com/place/bens-cookies-south-kensington-london/"]],
  chipotle: [['지점 운영시간', 'https://locations.chipotle.co.uk/london/64-tottenham-court-road'], ["2024 지점 사진 · Quick Service Magazine","https://quickservemagazine.co.uk/story.php?s=2024-03-21-chipotle-opens-new-venue-in-london"]],
  tower: [['입장권 가격·예매', 'https://www.hrp.org.uk/tower-of-london/visit/tickets-and-prices/'], ['개장·마감', 'https://www.hrp.org.uk/tower-of-london/visit/opening-and-closing-times/?selectedDate=2026-12-18']],
  borough: [['연말 공식 운영시간', 'https://boroughmarket.org.uk/events/bank-holiday-opening-times/']],
  risotto: [['Turnips 공식 메뉴·운영시간 · 사진 © Kim Lightbody', 'https://www.turnipsboroughmarket.com/turnips-market/wild-mushroom-risotto/']],
  univ: [['칼리지 안내', 'https://www.univ.ox.ac.uk/about/history/']],
  radcliffe: [['보들리언 도서관 공식 안내', 'https://visit.bodleian.ox.ac.uk/plan-your-visit/history-bodleian']],
  daunt: [['서점 공식 운영시간', 'https://dauntbooks.co.uk/shops/notting-hill/'], ["서점 사진 · Slightly Foxed","https://foxedquarterly.com/bookshop-of-the-quarter-autumn-2025-daunt-books-notting-hill/"]],
  southbank: [['Southbank Centre 공식 마켓 안내', 'https://www.southbankcentre.co.uk/activity/winter-market/'], ["마켓 참고 사진 · Time Out","https://www.timeout.com/london/shopping/christmas-markets-and-fairs-in-london"]],
  river: [['London Bridge City 공식 행사 안내', 'https://www.londonbridgecity.co.uk/events/2026/november/winter-by-the-river-2026'], ["2024 행사 사진 · Secret London","https://secretldn.com/winter-by-the-river-market-london-bridge/"]],
  leicester: [['공식 마켓·스케이트 안내', 'https://skateleicestersquare.co.uk/about/']],
  waterstones: [['사진 Ewan-M · CC BY-SA 2.0', "https://commons.wikimedia.org/wiki/File:Waterstone's,_Piccadilly,_W1.jpg"]],
  mm: [['사진 Ed6767 · CC BY-SA 4.0', "https://commons.wikimedia.org/wiki/File:Panorama_showing_the_Lego_Store_and_M%26M's_world_in_Leicester_Square,_London.jpg"]]
};

function renderStopSources(stop) {
  return (stopSources[stop.key] || []).map(([label, url]) =>
    ` · <a href="${url}" target="_blank" rel="noopener">${label} ↗</a>`).join('');
}

const searchURL=st=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(mapPlaces[st.key]||st.name+', London, UK');
let map,group,route,traveler,markers=[],dayIndex=1,position=0,playing=false,raf,last=0,active=-1;
if(window.L){map=L.map('map',{zoomControl:false,scrollWheelZoom:true}).setView([51.507,-.12],12);L.control.zoom({position:'bottomright'}).addTo(map);const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);let errors=0;tiles.on('tileerror',()=>{if(++errors===4){$('progressText').textContent='지도를 불러오지 못했어요. 연결을 확인해 주세요.'}});group=L.layerGroup().addTo(map)}else{$('map').innerHTML='<p style="padding:90px 30px">지도 라이브러리를 불러오지 못했어요. 시간표와 구글맵 링크를 이용해 주세요.</p>';$('play').disabled=true;$('fit').disabled=true}
const icon=(n,optional,selected=false)=>L.divIcon({className:'',html:`<div class="pin ${optional?'optional':''} ${selected?'active':''}" style="width:28px;height:28px">${n}</div>`,iconSize:[28,28],iconAnchor:[14,14]});
$('days').innerHTML=days.map((d,i)=>`<button data-day="${i}" aria-pressed="false"><strong>12.${d.date}</strong><small>${d.dow}</small><span>${d.short}</span></button>`).join('');
$('days').addEventListener('click',e=>{const b=e.target.closest('[data-day]');if(b)selectDay(+b.dataset.day)});
function fit(){if(map)map.fitBounds(days[dayIndex].stops.map(s=>P[s.key]),{paddingTopLeft:[45,75],paddingBottomRight:[45,150],maxZoom:14,animate:!matchMedia('(prefers-reduced-motion: reduce)').matches})}
function stop(){playing=false;cancelAnimationFrame(raf);$('play').textContent='▶';$('play').setAttribute('aria-label','동선 재생')}
function selectDay(i){stop();dayIndex=i;position=0;active=-1;const d=days[i];document.querySelectorAll('[data-day]').forEach((b,j)=>{b.classList.toggle('active',i===j);b.setAttribute('aria-pressed',String(i===j))});$('daylabel').textContent=`DAY ${String(i+1).padStart(2,'0')} / DECEMBER ${d.date}`;$('title').textContent=d.title;$('summary').textContent=d.summary;$('note').textContent=d.note;$('travelGuide').innerHTML=renderTravelGuide(d);$('timeline').innerHTML=d.stops.map((st,n)=>`${renderTravelLeg(d,n)}<article class="stop" data-stop="${n}"><span class="num">${stopNumber(d.stops,n)}</span><button data-focus="${n}"><img class="stop-thumb" data-photo-key="${st.key}" alt="" loading="lazy" hidden><time>${st.time}</time><h3>${st.name}</h3><p>${st.desc}</p></button><a href="${searchURL(st)}" target="_blank" rel="noopener">구글맵에서 보기 ↗</a>${renderStopSources(st)}${st.key==='portobello'?` · <a href="https://kensingtonandchelsea.london/events/portobello-winter-sundays-2026" target="_blank" rel="noopener">2026 특별 일요 마켓 안내 ↗</a>`:''}${st.key==='va'?` · <a href="https://www.vam.ac.uk/south-kensington/visit" target="_blank" rel="noopener">V&A 방문 안내 ↗</a>`:''}${st.key==='vacafe'?` · <a href="https://www.vam.ac.uk/info/va-cafe" target="_blank" rel="noopener">공식 카페 메뉴 안내 ↗</a><br><small>Gamble Room 사진 <a href="https://commons.wikimedia.org/wiki/File:The_Gamble_Room,_the_original_cafe_at_the_Victoria_and_Albert_Museum_-_geograph.org.uk_-_1578323.jpg" target="_blank" rel="noopener">tristan forward</a> · <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noopener">CC BY-SA 2.0</a></small>`:''}${st.key==='nhm'?` · <a href="https://ticketing.nhm.ac.uk/events/GENAD-ADM" target="_blank" rel="noopener">자연사박물관 입장권 안내 ↗</a>`:st.key==='gallery'?` · <a href="https://my.nationalgallery.org.uk/events?k=galleryentry1" target="_blank" rel="noopener">무료 입장 예약 ↗</a>`:st.key==='winter'?` · <a href="https://hydeparkwinterwonderland.com/tickets-guide/" target="_blank" rel="noopener">입장권·운영시간 ↗</a>`:''}${st.key==='theatre'?` · <a href="https://nimaxtheatres.com/shows/harry-potter-cursed-child/" target="_blank" rel="noopener">공식 예매 사이트 ↗</a>`:''}${d.date==='19'&&st.key==='southken'?` · <a href="https://experiences.myrealtrip.com/products/4150363" target="_blank" rel="noopener">예약한 투어 상품 보기 ↗</a>`:''}${d.date==='21'&&st.key==='museum'?` · <a href="https://experiences.myrealtrip.com/products/3887096" target="_blank" rel="noopener">예약한 도슨트 상품 보기 ↗</a>`:''}${d.date==='20'&&st.key==='notting'&&st.time==='12:20–12:45'?` · <a href="https://www.ladbrokearms.com/menus" target="_blank" rel="noopener">펍 메뉴 ↗</a>`:''}${placeGuides[st.key]?`<details class="self-guide"><summary>📖 현장 가이드 보기 <span>· 장소 해설</span></summary><div class="guide-body"><p class="guide-intro">현장에서 읽는 장소 해설</p>${placeGuides[st.key].map((p,j)=>p.startsWith("【스포일러")?`<details class="guide-spoiler"><summary>⚠️ 결말 스포일러 보기</summary><p>${p.replace(/^【[^】]+】\s*/,"")}</p></details>`:`<p class="guide-paragraph">${p.replace(/^【[^】]+】\s*/,"")}</p>`).join('')}</div></details>`:''}</article>`).join('');loadStopPhotos();document.querySelector('aside').scrollTop=0;if(map){group.clearLayers();const coords=d.stops.map(st=>P[st.key]);L.polyline(coords,{color:'#637b67',weight:3,opacity:.65,dashArray:'5 9'}).addTo(group);route=L.polyline([],{color:'#af513b',weight:4,opacity:.8}).addTo(group);markers=d.stops.map((st,n)=>L.marker(P[st.key],{icon:icon(stopNumber(d.stops,n),st.optional),title:st.name,zIndexOffset:st.sub?100:0}).addTo(group).on('click',()=>focusStop(n)));traveler=L.marker(coords[0],{icon:L.divIcon({className:'traveler',iconSize:[16,16],iconAnchor:[8,8]}),interactive:false,zIndexOffset:1000}).addTo(group);fit()}update(0);$('now').textContent='오늘의 동선 미리보기';$('progressText').textContent='재생하면 여행 순서대로 이동해요'}
function update(p){position=p;const sts=days[dayIndex].stops;const idx=Math.min(Math.floor(p),sts.length-1),fraction=p-idx;if(map){const a=P[sts[idx].key],b=P[sts[Math.min(idx+1,sts.length-1)].key];const pt=[a[0]+(b[0]-a[0])*fraction,a[1]+(b[1]-a[1])*fraction];traveler.setLatLng(pt);route.setLatLngs([...sts.slice(0,idx+1).map(st=>P[st.key]),pt])}$('seek').value=String(p/(sts.length-1)*100);if(active!==idx){active=idx;document.querySelectorAll('.stop').forEach((el,n)=>el.classList.toggle('selected',idx===n));markers.forEach((m,n)=>m.setIcon(icon(stopNumber(sts,n),sts[n].optional,idx===n)));$('now').textContent=`${stopNumber(sts,idx)}. ${sts[idx].name}`;$('progressText').textContent=`${sts[idx].time} · ${idx+1} / ${sts.length} 장소`;if(playing){const el=document.querySelector(`[data-stop="${idx}"]`),aside=document.querySelector('aside');aside.scrollTo({top:el.offsetTop-aside.offsetTop-20,behavior:'smooth'})}}}
function focusStop(n){stop();update(n);if(map){const st=days[dayIndex].stops[n];map.panTo(P[st.key]);L.popup().setLatLng(P[st.key]).setContent(`<strong>${st.name}</strong><br>${st.time}<br><a href="${searchURL(st)}" target="_blank" rel="noopener">구글맵 열기 ↗</a>`).openOn(map)}}
const photoViewer=$('photoViewer');const photoViewerImage=$('photoViewerImage');let photoRequestId=0;
$('timeline').addEventListener('click',async e=>{
 const thumb=e.target.closest('.stop-thumb');
 if(!thumb||thumb.hidden||!thumb.src)return;
 e.preventDefault();e.stopImmediatePropagation();
 const requestId=++photoRequestId;
 photoViewerImage.src=thumb.src;
 photoViewerImage.alt=thumb.closest('.stop')?.querySelector('h3')?.textContent||'여행 장소 사진';
 photoViewer.showModal();
 if(directPhotos[thumb.dataset.photoKey])return;
 try{
  const endpoint='https://en.wikipedia.org/w/api.php?'+new URLSearchParams({action:'query',format:'json',prop:'pageimages',pithumbsize:'1200',titles:photoPages[thumb.dataset.photoKey],origin:'*'});
  const response=await fetch(endpoint);if(!response.ok)throw Error('image request failed');
  const json=await response.json();
  const large=Object.values(json.query?.pages||{})[0]?.thumbnail?.source;
  if(large&&requestId===photoRequestId&&photoViewer.open)photoViewerImage.src=large;
 }catch{}
},true);
photoViewer.addEventListener('click',e=>{if(e.target===photoViewer||e.target===photoViewerImage)photoViewer.close()});
photoViewer.addEventListener('close',()=>{photoRequestId++});
$('timeline').addEventListener('click',e=>{const b=e.target.closest('[data-focus]');if(b)focusStop(+b.dataset.focus)});
function tick(t){if(!playing)return;if(last)update(Math.min(days[dayIndex].stops.length-1,position+(t-last)/3000*Number($('speed').value)));last=t;if(position>=days[dayIndex].stops.length-1){stop();$('progressText').textContent='오늘의 여행 끝 · 다시 재생할 수 있어요';return}raf=requestAnimationFrame(tick)}
$('play').onclick=()=>{if(playing){stop();return}if(position>=days[dayIndex].stops.length-1)update(0);playing=true;last=0;map?.closePopup();fit();$('play').textContent='Ⅱ';$('play').setAttribute('aria-label','재생 일시정지');raf=requestAnimationFrame(tick)};$('seek').oninput=()=>{stop();update(Number($('seek').value)/100*(days[dayIndex].stops.length-1))};$('fit').onclick=fit;document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
const checks=['12/18 런던탑 입장권 · 왕관 보석 포함','12/18 해리포터 연극 · 19:00 예매 완료 · Balcony C28','12/19 스톤헨지·코츠월드·옥스퍼드 투어 · 예약 완료','12/21 대영박물관 한국어 도슨트 · 예약 완료','12/21 윈터 원더랜드 · 입장 시간 확인','영국 ETA 승인 여부 확인','12/17·19 교통 파업 및 실제 운행 확인','ISIC · 12월 신청 자격 및 승인 확인','12/22 자연사박물관 · 11:15 무료 예매 완료 · 성인 1명','12/22 내셔널 갤러리 · 14:00 예약 회신 확인','12/21 Sky Garden · 15:30 일몰 무료권 확인'];const confirmedChecks=[8];let saved=[];try{const v=JSON.parse(localStorage.getItem('london2026checks')||'[]');if(Array.isArray(v))saved=v}catch{}$('checks').innerHTML=checks.map((txt,i)=>`<label><input type="checkbox" data-check="${i}" ${saved.includes(i)||confirmedChecks.includes(i)?'checked':''} ${confirmedChecks.includes(i)?'disabled':''}>${txt}</label>`).join('');function count(){$('count').textContent=document.querySelectorAll('#checks input:checked').length+'/'+checks.length}count();$('checks').onchange=()=>{saved=[...document.querySelectorAll('#checks input:checked')].map(x=>+x.dataset.check);try{localStorage.setItem('london2026checks',JSON.stringify(saved))}catch{}count()};$('checkToggle').onclick=()=>$('checklist').showModal();document.querySelector('.close').onclick=()=>$('checklist').close();$('checklist').addEventListener('click',e=>{if(e.target===$('checklist')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close()}});selectDay(1);

if(map){const resizeMap=()=>{map.invalidateSize({pan:false});if(!playing)fit()};new ResizeObserver(()=>requestAnimationFrame(resizeMap)).observe(document.querySelector(".maparea"));window.addEventListener("pageshow",resizeMap);}
