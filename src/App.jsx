import { useMemo, useState } from "react";
import "./style.css";

const POSITIONS = [
  {
    id: "gogi",
    name: "고기 다이",
    desc: "숯 · 화력 · 고기 기준 관리",
    motto: "고기의 기준이 매장의 품질을 만든다",
  },
  {
    id: "sikomi1",
    name: "시코미 1",
    desc: "반찬 · 야채 · 소스 준비",
    motto: "준비가 빠르면 영업이 흔들리지 않는다",
  },
  {
    id: "sikomi2",
    name: "시코미 2",
    desc: "육류 전처리 · 숙성 · 냉동 관리",
    motto: "손질의 기준이 맛의 기준이 된다",
  },
  {
    id: "wash",
    name: "설거지",
    desc: "세척 · 소독 · 위생 순환",
    motto: "깨끗함은 손님이 느끼는 첫 번째 신뢰다",
  },
  {
    id: "pack",
    name: "포장",
    desc: "포장 · 밀봉 · 배달 인계",
    motto: "포장은 매장 밖에서 만나는 브랜드다",
  },
  {
    id: "close",
    name: "마감",
    desc: "정리 · 안전 · 최종 보고",
    motto: "마감이 완벽해야 내일이 편하다",
  },
];

const POSITION_TASKS = {
  gogi: [
    {
      id: "recipe",
      title: "레시피",
      sub: "고기 · 찌개 · 소스 기준",
      items: [
        "삼겹살 두께 기준을 확인한다.",
        "목살 숙성 상태를 확인한다.",
        "갈비 양념 농도와 재임 상태를 확인한다.",
        "소금구이 제공 기준을 확인한다.",
        "된장찌개 레시피와 제공 기준을 확인한다.",
        "고기 원산지 표시를 확인한다.",
        "고기 냉장 보관 온도를 확인한다.",
        "소스류 유통기한을 확인한다.",
        "쌈채소 신선도를 확인한다.",
        "마늘, 고추, 쌈장 구성 상태를 확인한다.",
        "석쇠 예열 기준을 확인한다.",
        "불판 교체 기준을 확인한다.",
        "피크타임 전 고기 준비량을 확인한다.",
        "고기별 굽기 안내 멘트를 확인한다.",
        "추가 고기 조리 시간 안내 기준을 확인한다.",
        "품절 예상 고기 메뉴를 확인한다.",
        "포장용 고기 기준을 확인한다.",
        "반찬과 고기 제공 순서를 확인한다.",
        "고기 품질 이상 발견 시 보고 기준을 확인한다.",
        "레시피 최신본 위치를 확인한다.",
      ],
    },
    {
      id: "operation",
      title: "영업 중 체크",
      sub: "화력 · 누락 · 제공 속도",
      items: [
        "영업 전 테이블 화력을 테스트한다.",
        "가스 밸브 상태를 확인한다.",
        "집게와 가위 수량을 확인한다.",
        "테이블 오더 작동 상태를 확인한다.",
        "고기 소진량을 수시로 확인한다.",
        "추가 주문 고기 조리 대기 시간을 확인한다.",
        "된장찌개 누락 여부를 확인한다.",
        "다 드신 손님 테이블의 찌개 타이밍을 확인한다.",
        "불판 교체 요청을 빠르게 처리한다.",
        "반찬 리필 요청을 확인한다.",
        "술 주문과 후불 결제 누락을 확인한다.",
        "단체 손님 추가 고기 요청을 우선 확인한다.",
        "테이블 정리 후 기름 얼룩을 확인한다.",
        "손님 불만 발생 시 먼저 사과하고 보고한다.",
        "피크타임 중 부족 고기를 미리 요청한다.",
        "주방과 홀의 주문 전달 상태를 확인한다.",
        "고기 포장 요청을 따로 표시한다.",
        "마감 전 잔여 고기 상태를 확인한다.",
        "오늘 발생한 문제를 기록한다.",
        "인수인계 내용을 책임자에게 공유한다.",
      ],
    },
    {
      id: "stock",
      title: "사입 · 재고",
      sub: "고기 재고 · 발주 · 보관",
      items: [
        "소고기 부위별 재고를 확인한다.",
        "돼지고기 부위별 재고를 확인한다.",
        "냉장육과 냉동육을 구분해 기록한다.",
        "오늘 예상 사용량을 계산한다.",
        "피크타임 대비 추가 준비량을 확인한다.",
        "납품서와 실제 중량을 비교한다.",
        "원산지와 등급 표시를 확인한다.",
        "색택, 냄새, 탄력 상태를 확인한다.",
        "이상 고기는 즉시 보고하고 분리한다.",
        "선입선출 순서로 보관한다.",
        "냉장 보관 온도를 확인한다.",
        "냉동 보관 온도를 확인한다.",
        "부족 예상 품목을 발주 목록에 올린다.",
        "긴급 발주 필요 여부를 확인한다.",
        "쌈채소와 부재료 재고를 확인한다.",
        "소스와 양념 재고를 확인한다.",
        "폐기 예정 재고를 확인한다.",
        "주간 사용량을 기록한다.",
        "원가율에 영향 있는 품목을 표시한다.",
        "다음 영업 준비량을 공유한다.",
      ],
    },
  ],
  sikomi1: [
    {
      id: "prep",
      title: "반찬 · 야채 준비",
      sub: "세척 · 손질 · 소분",
      items: [
        "채소류 신선도를 확인한다.",
        "쌈채소 세척 상태를 확인한다.",
        "파채 굵기 기준을 확인한다.",
        "마늘 슬라이스 두께를 확인한다.",
        "고추 절단 상태를 확인한다.",
        "반찬 1회 제공량 기준을 확인한다.",
        "반찬통 청결 상태를 확인한다.",
        "반찬 소분량을 영업량에 맞춘다.",
        "야채 물기 제거 상태를 확인한다.",
        "소스 용기 청결 상태를 확인한다.",
        "참기름과 깨소금 준비량을 확인한다.",
        "냉장 반출 시간을 기록한다.",
        "라벨에 날짜와 시간을 표시한다.",
        "알레르기 재료를 분리 보관한다.",
        "오염 가능 재료는 즉시 폐기한다.",
        "부족 반찬을 우선순위로 준비한다.",
        "피크타임 전 리필용 반찬을 확보한다.",
        "냉장고 안쪽 정리 상태를 확인한다.",
        "시코미대 작업 후 즉시 닦는다.",
        "준비 완료 내용을 공유한다.",
      ],
    },
    {
      id: "sauce",
      title: "소스 · 기본 세팅",
      sub: "배합 · 라벨 · 유통기한",
      items: [
        "쌈장 준비량을 확인한다.",
        "초장 준비량을 확인한다.",
        "간장 소스 준비량을 확인한다.",
        "연어소스 필요 여부를 확인한다.",
        "참기름장 구성 상태를 확인한다.",
        "양념 소스 배합 비율을 확인한다.",
        "소스 유통기한을 확인한다.",
        "소스통 외부 오염을 닦는다.",
        "라벨 날짜를 확인한다.",
        "재사용 금지 소스 기준을 확인한다.",
        "소스 스푼과 국자를 분리한다.",
        "부족한 소스를 즉시 보충한다.",
        "피크타임용 예비 소스를 준비한다.",
        "냉장 보관 소스를 구분한다.",
        "상온 보관 가능 소스를 구분한다.",
        "소스 색과 냄새 이상 여부를 확인한다.",
        "용기 뚜껑 닫힘 상태를 확인한다.",
        "홀 요청 소스를 빠르게 전달한다.",
        "마감 시 잔량을 기록한다.",
        "다음날 준비량을 공유한다.",
      ],
    },
    {
      id: "hygiene",
      title: "위생",
      sub: "칼 · 도마 · 작업대",
      items: [
        "작업 전 손 씻기를 완료한다.",
        "장갑 착용 상태를 확인한다.",
        "칼 소독 상태를 확인한다.",
        "도마 소독 상태를 확인한다.",
        "야채용 도마와 육류용 도마를 구분한다.",
        "행주 교체 시간을 확인한다.",
        "작업대 위 물기와 오염을 닦는다.",
        "냉장고 손잡이를 닦는다.",
        "바닥 미끄럼 상태를 확인한다.",
        "음식물 쓰레기통 상태를 확인한다.",
        "오염된 재료를 즉시 폐기한다.",
        "세척 전후 재료를 분리한다.",
        "알레르기 재료 접촉을 방지한다.",
        "냉장고 문 닫힘 상태를 확인한다.",
        "소독제 사용 기준을 확인한다.",
        "마감 전 도구를 세척한다.",
        "마감 전 작업대를 소독한다.",
        "마감 전 바닥을 청소한다.",
        "위생 이상 사항을 기록한다.",
        "책임자에게 완료 보고한다.",
      ],
    },
  ],
  sikomi2: [
    {
      id: "meatprep",
      title: "육류 전처리",
      sub: "손질 · 해동 · 숙성",
      items: [
        "냉동육 해동 상태를 확인한다.",
        "냉장 해동 원칙을 준수한다.",
        "부위별 손질 기준을 확인한다.",
        "지방 제거 기준을 확인한다.",
        "슬라이스 두께를 확인한다.",
        "불고기감 두께를 확인한다.",
        "갈비 손질 상태를 확인한다.",
        "숙성 날짜를 확인한다.",
        "라벨에 부위와 날짜를 표시한다.",
        "전처리 완료 재료를 분리 보관한다.",
        "육류 색택과 냄새를 확인한다.",
        "탄력 상태를 확인한다.",
        "이상 육류는 즉시 분리한다.",
        "해동 완료 재료를 재냉동하지 않는다.",
        "작업 중 온도 이탈을 방지한다.",
        "칼과 도마를 육류 전용으로 사용한다.",
        "육류 핏물 제거 상태를 확인한다.",
        "잔여 육류를 기준에 맞게 랩핑한다.",
        "작업 후 도구를 소독한다.",
        "전처리 완료 수량을 기록한다.",
      ],
    },
    {
      id: "freezer",
      title: "냉동 · 냉장 관리",
      sub: "보관 · 위치 · FIFO",
      items: [
        "냉동고 온도를 확인한다.",
        "냉장고 온도를 확인한다.",
        "냉동고 문 닫힘 상태를 확인한다.",
        "냉장고 문 닫힘 상태를 확인한다.",
        "부위별 보관 위치를 확인한다.",
        "선입선출 순서를 확인한다.",
        "오래된 재고를 앞쪽에 배치한다.",
        "신규 재고는 뒤쪽에 배치한다.",
        "라벨이 없는 재료를 확인한다.",
        "라벨 누락 재료는 즉시 수정한다.",
        "성에나 결빙 상태를 확인한다.",
        "냉동고 과적재를 방지한다.",
        "해동 예정 재료를 냉장 이동한다.",
        "내일 사용 재료를 따로 표시한다.",
        "폐기 예정 재료를 확인한다.",
        "납품된 재료를 즉시 적재한다.",
        "냉장고 내부 오염을 닦는다.",
        "바닥에 직접 닿는 재료가 없는지 확인한다.",
        "온도 이상 시 즉시 보고한다.",
        "재고 위치 변경 사항을 공유한다.",
      ],
    },
    {
      id: "order",
      title: "발주 연결",
      sub: "사용량 · 부족분 · 납품",
      items: [
        "오늘 사용량을 기록한다.",
        "주간 예상 사용량을 확인한다.",
        "부위별 부족분을 계산한다.",
        "긴급 발주 필요 여부를 확인한다.",
        "공급업체별 납품 가능 시간을 확인한다.",
        "납품 수량과 주문 수량을 비교한다.",
        "납품 중량을 저울로 확인한다.",
        "원산지 표시를 확인한다.",
        "등급 표시를 확인한다.",
        "품질 이상 시 반품 기준을 적용한다.",
        "납품서를 보관한다.",
        "발주 비용을 기록한다.",
        "폐기율을 확인한다.",
        "과발주 품목을 표시한다.",
        "부족 발생 품목을 표시한다.",
        "피크타임 소진 품목을 기록한다.",
        "다음 발주 개선점을 기록한다.",
        "책임자 승인 여부를 확인한다.",
        "대체 공급처를 확인한다.",
        "다음 주 발주 계획을 공유한다.",
      ],
    },
  ],
  wash: [
    {
      id: "clean",
      title: "세척 기준",
      sub: "식기 · 컵 · 석쇠",
      items: [
        "세척 전 손 씻기를 완료한다.",
        "고무장갑 착용 상태를 확인한다.",
        "세제 희석 비율을 확인한다.",
        "소독제 농도를 확인한다.",
        "유리컵은 별도 라인으로 세척한다.",
        "칼과 가위는 전용 도구로 세척한다.",
        "도마 양면을 세척한다.",
        "석쇠 탄화물을 제거한다.",
        "냄비와 팬 기름때를 제거한다.",
        "국물 용기 안쪽을 확인한다.",
        "이물질 잔존 시 재세척한다.",
        "파손 식기를 분리한다.",
        "식기 자연건조 상태를 확인한다.",
        "세척 완료 식기를 제자리에 둔다.",
        "세척기 작동 상태를 확인한다.",
        "배수구 막힘 여부를 확인한다.",
        "행주 교체 시간을 확인한다.",
        "세척대 주변 물기를 닦는다.",
        "식기 부족 시 홀에 알린다.",
        "세척 완료 상태를 기록한다.",
      ],
    },
    {
      id: "flow",
      title: "영업 중 순환",
      sub: "속도 · 부족 · 안전",
      items: [
        "피크타임 전 식기 수량을 확보한다.",
        "수거 식기를 즉시 침지한다.",
        "큰 식기부터 우선 처리한다.",
        "컵 부족 여부를 확인한다.",
        "접시 부족 여부를 확인한다.",
        "석쇠 교체 주기에 맞춰 세척한다.",
        "세척 완료 식기를 홀에 빠르게 공급한다.",
        "파손 식기는 즉시 보고한다.",
        "뜨거운 식기 이동 시 장갑을 착용한다.",
        "바닥 물기를 즉시 제거한다.",
        "세제 소진 시 즉시 보충한다.",
        "소독액 잔량을 확인한다.",
        "음식물 쓰레기통 넘침을 방지한다.",
        "세척 순서가 밀리지 않게 조정한다.",
        "홀 요청 식기를 우선 처리한다.",
        "주방 요청 도구를 우선 처리한다.",
        "세척기 오류를 즉시 보고한다.",
        "위험한 칼류는 따로 보관한다.",
        "주변 정리 상태를 유지한다.",
        "인수인계 사항을 기록한다.",
      ],
    },
    {
      id: "finish",
      title: "마감 세척",
      sub: "세척기 · 배수구 · 바닥",
      items: [
        "남은 식기를 모두 세척한다.",
        "세척기를 내부 청소한다.",
        "필터 이물질을 제거한다.",
        "세제통 잔량을 확인한다.",
        "소독액 잔량을 확인한다.",
        "배수구 음식물을 제거한다.",
        "세척대 주변을 닦는다.",
        "바닥 물기와 기름때를 제거한다.",
        "고무장갑을 세척 후 건조한다.",
        "행주를 세탁 또는 분리한다.",
        "수세미 상태를 확인한다.",
        "파손 식기 목록을 기록한다.",
        "식기 보관 위치를 정리한다.",
        "냄비와 팬을 제자리에 둔다.",
        "석쇠 보관 상태를 확인한다.",
        "쓰레기를 분리수거한다.",
        "음식물 쓰레기를 처리한다.",
        "냄새 발생 구역을 확인한다.",
        "마감 사진 필요 시 촬영한다.",
        "책임자에게 마감 완료 보고한다.",
      ],
    },
  ],
  pack: [
    {
      id: "packcheck",
      title: "포장 체크",
      sub: "구성 · 소스 · 용기",
      items: [
        "주문서의 메뉴명과 수량을 확인한다.",
        "고객 요청 사항을 확인한다.",
        "메뉴에 맞는 용기를 선택한다.",
        "국물류는 밀폐 용기를 사용한다.",
        "뜨거운 음식과 차가운 음식을 분리한다.",
        "소스 누락 여부를 확인한다.",
        "간장, 초장, 쌈장을 확인한다.",
        "연어 포함 시 연어소스를 확인한다.",
        "젓가락과 숟가락 필요 여부를 확인한다.",
        "냅킨과 물티슈를 확인한다.",
        "반찬 구성 기준을 확인한다.",
        "서비스 품목 포함 여부를 확인한다.",
        "용기 뚜껑 닫힘 상태를 확인한다.",
        "실링 가장자리 밀봉 상태를 확인한다.",
        "국물 흐름 여부를 확인한다.",
        "봉투 안에서 기울지 않게 배치한다.",
        "고객명 또는 주문번호를 표시한다.",
        "포장 외관 오염을 닦는다.",
        "포장 완료 시간을 확인한다.",
        "최종 누락 확인 후 전달한다.",
      ],
    },
    {
      id: "delivery",
      title: "배달 인계",
      sub: "번호 · 기사 · 최종 확인",
      items: [
        "배달 주문번호를 확인한다.",
        "기사님 도착 여부를 확인한다.",
        "인계 전 주문 수량을 다시 확인한다.",
        "음식 온도 유지 상태를 확인한다.",
        "보냉 또는 보온 필요 여부를 확인한다.",
        "국물류 흔들림 방지 상태를 확인한다.",
        "무거운 음식은 아래쪽에 둔다.",
        "가벼운 음식은 위쪽에 둔다.",
        "봉투 손잡이 상태를 확인한다.",
        "브랜드 스티커 부착 상태를 확인한다.",
        "기사님에게 주문번호를 말로 확인한다.",
        "다른 주문과 섞이지 않게 분리한다.",
        "지연 주문은 책임자에게 보고한다.",
        "취소 주문이 섞이지 않았는지 확인한다.",
        "고객 요청 메모를 다시 확인한다.",
        "배달 완료 대기 위치를 정리한다.",
        "픽업 완료 시간을 확인한다.",
        "기사 인계 후 주문 화면을 정리한다.",
        "문제 발생 시 즉시 기록한다.",
        "최종 인계 완료를 체크한다.",
      ],
    },
    {
      id: "takeout",
      title: "방문 포장",
      sub: "응대 · 확인 · 전달",
      items: [
        "방문 고객 이름 또는 번호를 확인한다.",
        "주문 내역을 고객에게 짧게 확인한다.",
        "조리 완료 여부를 확인한다.",
        "포장 구성품을 다시 확인한다.",
        "소스와 반찬 누락 여부를 확인한다.",
        "포장 봉투 상태를 확인한다.",
        "고객 요청 사항 반영 여부를 확인한다.",
        "결제 완료 여부를 확인한다.",
        "카드 영수증 필요 여부를 확인한다.",
        "주차 등록 필요 여부를 확인한다.",
        "기다림 발생 시 예상 시간을 안내한다.",
        "포장물이 뜨거운 경우 주의 안내를 한다.",
        "국물류는 기울이지 말라고 안내한다.",
        "보냉 필요한 음식은 빨리 드시라고 안내한다.",
        "포장 외관을 한 번 더 확인한다.",
        "고객에게 두 손으로 전달한다.",
        "감사 인사를 한다.",
        "수령 완료를 확인한다.",
        "대기 공간을 정리한다.",
        "방문 포장 완료를 체크한다.",
      ],
    },
  ],
  close: [
    {
      id: "closing",
      title: "마감 정리",
      sub: "재고 · 청소 · 정돈",
      items: [
        "잔여 재료를 사용 가능과 폐기로 구분한다.",
        "냉장 보관 재료를 랩핑한다.",
        "라벨에 날짜와 시간을 표시한다.",
        "냉장고 내부를 정리한다.",
        "냉동고 내부를 정리한다.",
        "작업대를 세척한다.",
        "화구 주변 기름때를 닦는다.",
        "테이블 오염과 기름 얼룩을 확인한다.",
        "바닥 청소를 완료한다.",
        "배수구 이물질을 제거한다.",
        "쓰레기를 분리수거한다.",
        "음식물 쓰레기를 처리한다.",
        "사용 도구를 제자리에 둔다.",
        "포장 용기 잔량을 확인한다.",
        "소스와 반찬 잔량을 기록한다.",
        "내일 부족 예상 품목을 기록한다.",
        "분실물 여부를 확인한다.",
        "매장 조명을 정리한다.",
        "마감 사진 필요 시 촬영한다.",
        "마감 완료를 책임자에게 보고한다.",
      ],
    },
    {
      id: "safety",
      title: "안전 점검",
      sub: "가스 · 전기 · 냉장",
      items: [
        "가스 밸브 잠금 상태를 확인한다.",
        "화구 불이 완전히 꺼졌는지 확인한다.",
        "전기 코드 상태를 확인한다.",
        "사용하지 않는 기기 전원을 끈다.",
        "냉장고 문 닫힘 상태를 확인한다.",
        "냉동고 문 닫힘 상태를 확인한다.",
        "냉장 온도를 확인한다.",
        "냉동 온도를 확인한다.",
        "소화기 위치를 확인한다.",
        "비상구 주변 장애물을 제거한다.",
        "바닥 미끄럼 위험을 확인한다.",
        "뜨거운 기름 또는 물 잔류를 확인한다.",
        "칼과 날카로운 도구를 안전하게 보관한다.",
        "세척기 전원 상태를 확인한다.",
        "키오스크와 POS 전원 상태를 확인한다.",
        "외부 출입문 잠금 상태를 확인한다.",
        "창문 잠금 상태를 확인한다.",
        "CCTV 작동 상태를 확인한다.",
        "야간 안전 이상 여부를 확인한다.",
        "최종 퇴근 전 한 번 더 확인한다.",
      ],
    },
    {
      id: "report",
      title: "마감 보고",
      sub: "문제 · 인수인계 · 내일 준비",
      items: [
        "오늘 매출 특이 사항을 기록한다.",
        "고객 불만 사항을 기록한다.",
        "음식 누락 또는 오배송을 기록한다.",
        "재료 부족 품목을 기록한다.",
        "폐기 재료를 기록한다.",
        "기기 고장 또는 이상을 기록한다.",
        "직원 결근 또는 지각을 기록한다.",
        "주문 시스템 오류를 기록한다.",
        "포장 문제 발생 여부를 기록한다.",
        "위생 문제 발생 여부를 기록한다.",
        "내일 예약 또는 단체 손님을 확인한다.",
        "내일 발주 필요 품목을 정리한다.",
        "청소 미흡 구역을 기록한다.",
        "책임자에게 전달할 내용을 정리한다.",
        "다음 근무자 인수인계 내용을 작성한다.",
        "사진 첨부가 필요한 문제를 정리한다.",
        "반복되는 문제를 표시한다.",
        "개선 아이디어를 한 줄로 남긴다.",
        "보고 내용을 저장한다.",
        "마감 보고 완료를 체크한다.",
      ],
    },
  ],
};

export default function App() {
  const [screen, setScreen] = useState("home");
  const [positionId, setPositionId] = useState("gogi");
  const [taskId, setTaskId] = useState("recipe");

  const position = useMemo(
    () => POSITIONS.find((item) => item.id === positionId),
    [positionId]
  );

  const tasks = POSITION_TASKS[positionId];
  const selectedTask = useMemo(
    () => tasks.find((item) => item.id === taskId) || tasks[0],
    [tasks, taskId]
  );

  const openPosition = (id) => {
    setPositionId(id);
    setTaskId(POSITION_TASKS[id][0].id);
    setScreen("position");
  };

  const openChecklist = (id) => {
    setTaskId(id);
    setScreen("checklist");
  };

  return (
    <main className="app">
      <section className="phone">
        {screen === "home" && <Home onOpen={openPosition} />}
        {screen === "position" && (
          <PositionDetail
            position={position}
            tasks={tasks}
            onBack={() => setScreen("home")}
            onOpenChecklist={openChecklist}
          />
        )}
        {screen === "checklist" && (
          <Checklist
            position={position}
            task={selectedTask}
            onBack={() => setScreen("position")}
          />
        )}
      </section>
    </main>
  );
}

function Home({ onOpen }) {
  return (
    <>
      <header className="hero">
        <div className="topLine" />
        <div className="brandArea">
          <div className="logoMark">최</div>
          <div>
            <p className="eyebrow">CHOI WOO YOUNG</p>
            <h1>최우영</h1>
            <p className="brandSub">Premium Kitchen Operating System</p>
          </div>
        </div>

        <div className="sloganBox">
          <div className="goldRule" />
          <h2>
            기본이 매장을 만들고,
            <br />
            기준이 브랜드를 만든다
          </h2>
          <p>맛 · 서비스 · 정리 · 속도 · 위생</p>
        </div>
      </header>

      <section className="content">
        <SectionTitle small="KITCHEN POSITION" title="주방 포지션 선택" />
        <div className="positionGrid">
          {POSITIONS.map((item, index) => (
            <button
              key={item.id}
              className="positionCard"
              onClick={() => onOpen(item.id)}
            >
              <p>{String(index + 1).padStart(2, "0")}</p>
              <strong>{item.name}</strong>
              <span>{item.desc}</span>
            </button>
          ))}
        </div>
      </section>

      <footer>
        <div>✦</div>
        <p>작은 차이가 전문가를 만든다</p>
        <span>Standards create the brand.</span>
      </footer>
    </>
  );
}

function PositionDetail({ position, tasks, onBack, onOpenChecklist }) {
  return (
    <section className="subScreen">
      <Header
        title={position.name}
        sub={position.desc}
        right="POSITION"
        onBack={onBack}
      />

      <div className="positionHero">
        <p>POSITION PHILOSOPHY</p>
        <h2>{position.motto}</h2>
      </div>

      <section className="content">
        <SectionTitle small="WORK LIST" title="업무 리스트" />
        <div className="taskList">
          {tasks.map((task, index) => (
            <button
              key={task.id}
              className="taskCard"
              onClick={() => onOpenChecklist(task.id)}
            >
              <div>
                <p>{String(index + 1).padStart(2, "0")}</p>
                <strong>{task.title}</strong>
                <span>{task.sub}</span>
              </div>
              <em>{task.items.length} CHECK</em>
            </button>
          ))}
        </div>

        <div className="guideBox">
          <strong>운영 기준</strong>
          <span>
            포지션마다 업무 기준이 다릅니다. 각자의 위치에서 체크리스트를
            완료하면 매장 전체 기준이 흔들리지 않습니다.
          </span>
        </div>
      </section>
    </section>
  );
}

function Checklist({ position, task, onBack }) {
  const [checked, setChecked] = useState(() => Array(task.items.length).fill(false));
  const [saved, setSaved] = useState(false);

  const done = checked.filter(Boolean).length;
  const total = task.items.length;
  const pct = Math.round((done / total) * 100);
  const complete = done === total;

  const toggle = (index) => {
    if (saved) return;
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <section className="checkScreen">
      <Header
        title={task.title}
        sub={`${position.name} · ${task.sub}`}
        right={`${pct}%`}
        onBack={onBack}
      />

      <div className="progressBox">
        <div style={{ width: `${pct}%` }} />
      </div>

      <div className="summaryRow">
        <span>{done} 완료</span>
        <span>{total - done} 남음</span>
      </div>

      {complete && (
        <div className="completeBox">
          <strong>전 항목 완료</strong>
          <span>아래 저장 버튼을 눌러 마무리하세요.</span>
        </div>
      )}

      <div className="list">
        {task.items.map((item, index) => (
          <button
            key={`${task.id}-${index}`}
            className={`checkItem ${checked[index] ? "on" : ""}`}
            onClick={() => toggle(index)}
          >
            <span className="box">{checked[index] ? "✓" : ""}</span>
            <span className="no">{String(index + 1).padStart(2, "0")}</span>
            <strong>{item}</strong>
          </button>
        ))}
      </div>

      <div className="saveBar">
        {saved ? (
          <button
            className="saveBtn saved"
            onClick={() => {
              setChecked(Array(task.items.length).fill(false));
              setSaved(false);
            }}
          >
            저장 완료 · 다시 시작
          </button>
        ) : (
          <button
            className={`saveBtn ${complete ? "ready" : ""}`}
            disabled={!complete}
            onClick={() => setSaved(true)}
          >
            {complete ? "COMPLETE & SAVE" : `${total - done}개 남음`}
          </button>
        )}
      </div>
    </section>
  );
}

function Header({ title, sub, right, onBack }) {
  return (
    <header className="screenHeader">
      <button onClick={onBack}>←</button>
      <div>
        <p>{sub}</p>
        <h2>{title}</h2>
      </div>
      <strong>{right}</strong>
    </header>
  );
}

function SectionTitle({ small, title }) {
  return (
    <div className="sectionTitle">
      <span>{small}</span>
      <h3>{title}</h3>
    </div>
  );
}
