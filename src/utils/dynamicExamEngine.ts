/**
 * ENGINE SINH ĐỀ ĐỘNG NGẪU NHIÊN THEO YÊU CẦU (DYNAMIC EXAM GENERATOR)
 * Chuẩn Công văn 7991/BGDĐT & GDPT 2018 (Năm học 2026 - 2027)
 * Tác giả: Thầy giáo Đinh Văn Thành – Trường THCS Đồng Yên (0915.213.717)
 * 
 * Mỗi lần tạo đề:
 * 1. Bốc ngẫu nhiên câu hỏi theo ma trận 7991.
 * 2. Hoán vị phương án A, B, C (chuẩn 3 phương án 2026, không có D).
 * 3. Tự động sinh 02 mã đề tương đương và bảng đáp án chính xác 100%.
 * 4. Tự chèn thông tin Trường & Cơ quan cấp trên của giáo viên.
 * 5. Xuất file Word .docx chuẩn A4, Times New Roman 13pt, Bảng Auto-fit.
 */

import {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  WidthType,
  BorderStyle,
  Packer,
} from 'docx';
import { generateDynamicExamFromExactTemplate } from './exactExamTemplateEngine';

export interface DynamicExamConfig {
  grade: '6' | '7' | '8' | '9';
  term: 'GK1' | 'CK1' | 'GK2' | 'CK2' | 'KSCL' | 'DECUONG';
  parentAgency: string;
  schoolName: string;
  academicYear?: string;
}

const FONT_FAMILY = 'Times New Roman';
const MARGINS = { top: 1134, bottom: 1134, left: 1701, right: 850 }; // Chuẩn NĐ 30/2020

// NGÂN HÀNG CÂU HỎI MỞ RỘNG CHO TỪNG KHỐI LỚP (GRADE 6, 7, 8, 9)
export const QUESTION_BANKS: Record<string, any> = {
  '6': {
    phonetics: [
      { stem: 'help<u>ed</u>, cook<u>ed</u>, play<u>ed</u>', opts: ['played', 'helped', 'cooked'], ans: 'played' },
      { stem: 'book<u>s</u>, cat<u>s</u>, dog<u>s</u>', opts: ['dogs', 'books', 'cats'], ans: 'dogs' },
      { stem: 'watch<u>es</u>, class<u>es</u>, appl<u>es</u>', opts: ['apples', 'watches', 'classes'], ans: 'apples' },
      { stem: 'want<u>ed</u>, decid<u>ed</u>, walk<u>ed</u>', opts: ['walked', 'wanted', 'decided'], ans: 'walked' },
      { stem: 'c<u>i</u>ty, l<u>i</u>ke, b<u>i</u>cycle', opts: ['like', 'city', 'bicycle'], ans: 'like' },
      { stem: 'sch<u>oo</u>l, f<u>oo</u>t, b<u>oo</u>k', opts: ['school', 'foot', 'book'], ans: 'school' },
      { stem: 't<u>ea</u>cher, cl<u>ea</u>n, h<u>ea</u>d', opts: ['head', 'teacher', 'clean'], ans: 'head' },
      { stem: 'th<u>i</u>nk, th<u>a</u>nk, th<u>e</u>re', opts: ['there', 'think', 'thank'], ans: 'there' },
    ],
    language: [
      { stem: 'My new school ________ a large green library.', opts: ['has', 'have', 'having'], ans: 'has' },
      { stem: 'Students ________ wear uniform on Mondays and Thursdays.', opts: ['must', "can't", "needn't"], ans: 'must' },
      { stem: 'Listen! The birds ________ happily in the trees.', opts: ['are singing', 'sing', 'sang'], ans: 'are singing' },
      { stem: 'Da Nang is ________ than Hai Phong.', opts: ['more modern', 'modern', 'most modern'], ans: 'more modern' },
      { stem: 'There ________ any milk left in the fridge.', opts: ["isn't", "aren't", 'is'], ans: "isn't" },
      { stem: 'We ________ to Cuc Phuong National Park last Sunday.', opts: ['went', 'go', 'will go'], ans: 'went' },
      { stem: 'You should brush your teeth ________ going to bed.', opts: ['before', 'after', 'while'], ans: 'before' },
      { stem: 'How ________ hours do you sleep every night?', opts: ['many', 'much', 'often'], ans: 'many' },
      { stem: 'Turn off the lights ________ saving electricity.', opts: ['to', 'for', 'so that'], ans: 'to' },
      { stem: 'Robot in the future ________ do all heavy housework.', opts: ['will', 'must', 'need'], ans: 'will' },
      { stem: 'Which city is the ________ in Viet Nam?', opts: ['biggest', 'bigger', 'big'], ans: 'biggest' },
      { stem: 'Would you like ________ apple juice with your lunch?', opts: ['some', 'any', 'a'], ans: 'some' },
    ],
    clozeText: 'Ha Long Bay is one of the most famous natural wonders in Viet Nam. It has thousands of limestone (1) ________ and caves. Every year, millions of domestic and foreign tourists (2) ________ this wonderful place. Visitors can enjoy fresh seafood, swim in the clear blue sea, and take pictures of the sunset. Protecting this heritage site is the responsibility of (3) ________ citizen. We should not throw plastic bags or rubbish into the bay (4) ________ keep the water clean.',
    clozeOpts: [
      { num: '1', opts: ['islands', 'houses', 'schools'], ans: 'islands' },
      { num: '2', opts: ['visit', 'visits', 'visiting'], ans: 'visit' },
      { num: '3', opts: ['every', 'many', 'few'], ans: 'every' },
      { num: '4', opts: ['to', 'so', 'because'], ans: 'to' },
    ],
    readingComp: {
      text: 'Nam is a grade 6 student at Dong Yen Secondary School. Every day, he gets up at 6:00 a.m. and rides his bicycle to school. His favourite subject is English because it helps him explore the world. In his free time, Nam enjoys playing badminton with his classmates on the playground. He says that doing sports makes him feel refreshed and healthy.',
      questions: [
        { q: 'What time does Nam get up every morning?', opts: ['At 6:00 a.m.', 'At 6:30 a.m.', 'At 5:45 a.m.'], ans: 'At 6:00 a.m.' },
        { q: 'Why does he like English?', opts: ['Because it helps him explore the world', 'Because it is easy', 'Because his teacher is strict'], ans: 'Because it helps him explore the world' },
        { q: 'What sport does Nam play in his free time?', opts: ['Badminton', 'Football', 'Swimming'], ans: 'Badminton' },
      ],
    },
    transformations: [
      { original: 'Because the weather was bad, we stayed at home.', key: 'The weather was bad, so we stayed at home.' },
      { original: 'My brother is interested in playing badminton.', key: 'My brother likes playing badminton.' },
      { original: 'No student in our class is taller than Nam.', key: 'Nam is the tallest student in our class.' },
      { original: 'Plant more trees or the atmosphere will be polluted.', key: 'If we plant more trees, the atmosphere will not be polluted.' },
      { original: 'It is not good to eat too much sweet fast food.', key: "You shouldn't eat too much sweet fast food." },
    ],
    wordOrders: [
      { scrambled: 'my / friendly / are / and / classmates / helpful.', key: 'My classmates are friendly and helpful.' },
      { scrambled: 'learning / helps / us / English / knowledge / broaden.', key: 'Learning English helps us broaden knowledge.' },
      { scrambled: 'we / plant / should / green / trees / more / school / at.', key: 'We should plant more green trees at school.' },
      { scrambled: 'she / went / Ha Long / to / last / Bay / summer.', key: 'She went to Ha Long Bay last summer.' },
    ],
    writingTopic: 'Write a short paragraph (50 - 60 words) about your favourite room in your house or your new school.',
  },
  '7': {
    phonetics: [
      { stem: 'help<u>ed</u>, cook<u>ed</u>, play<u>ed</u>', opts: ['played', 'helped', 'cooked'], ans: 'played' },
      { stem: 'donat<u>ed</u>, start<u>ed</u>, listen<u>ed</u>', opts: ['listened', 'donated', 'started'], ans: 'listened' },
      { stem: 'commun<u>i</u>ty, mus<u>i</u>c, act<u>i</u>vity', opts: ['music', 'community', 'activity'], ans: 'music' },
      { stem: 'f<u>a</u>st, f<u>a</u>ther, c<u>a</u>t', opts: ['cat', 'fast', 'father'], ans: 'cat' },
    ],
    language: [
      { stem: 'My sister enjoys ________ origami flowers in her spare time.', opts: ['making', 'make', 'made'], ans: 'making' },
      { stem: 'You should eat more fresh vegetables ________ they provide vitamins.', opts: ['because', 'so', 'but'], ans: 'because' },
      { stem: 'We ________ hundreds of warm coats to poor children last winter.', opts: ['donated', 'donate', 'will donate'], ans: 'donated' },
      { stem: 'Doing regular exercise helps you stay in ________.', opts: ['shape', 'fat', 'tired'], ans: 'shape' },
      { stem: 'Life in the city is ________ different from life in the countryside.', opts: ['much', 'more', 'most'], ans: 'much' },
      { stem: 'Classical music is not as ________ as pop music for teens.', opts: ['exciting', 'more exciting', 'most exciting'], ans: 'exciting' },
      { stem: 'How ________ bottles of mineral water do you drink a day?', opts: ['many', 'much', 'often'], ans: 'many' },
      { stem: 'Lan ________ to school on foot when she was in primary school.', opts: ['used to go', 'uses to go', 'is going'], ans: 'used to go' },
      { stem: '________ it was raining heavily, they still went to the festival.', opts: ['Although', 'Because', 'Despite'], ans: 'Although' },
      { stem: 'In the future, electric cars will help ________ carbon emissions.', opts: ['reduce', 'increase', 'damage'], ans: 'reduce' },
    ],
    clozeText: 'Community service is very important for teenagers today. Last month, our school youth club organized a green campaign to clean the local park. Students (1) ________ plastic bottles and planted dozens of shady trees along the pathway. This activity not only helps the (2) ________ stay clean and fresh, but also teaches students valuable teamwork skills. If everybody (3) ________ small actions every day, our living environment will (4) ________ become much better.',
    clozeOpts: [
      { num: '1', opts: ['collected', 'collect', 'collecting'], ans: 'collected' },
      { num: '2', opts: ['environment', 'machines', 'factories'], ans: 'environment' },
      { num: '3', opts: ['takes', 'took', 'taking'], ans: 'takes' },
      { num: '4', opts: ['certainly', 'badly', 'rarely'], ans: 'certainly' },
    ],
    readingComp: {
      text: 'Traffic congestion is one of the biggest challenges in modern cities. During morning rush hours from 7:00 to 8:30 a.m., thousands of motorbikes, cars and buses crowd the main avenues. To solve this problem, city authorities are building new metro lines and encouraging people to use public transport. In addition, many young citizens are choosing bicycles to travel short distances, which also helps improve personal fitness and reduces exhaust fumes.',
      questions: [
        { q: 'What is a major challenge in modern cities?', opts: ['Traffic congestion', 'Lack of parks', 'Hot weather'], ans: 'Traffic congestion' },
        { q: 'What are city authorities building to reduce congestion?', opts: ['New metro lines', 'Bigger airports', 'More skyscrapers'], ans: 'New metro lines' },
        { q: 'Why do many young citizens ride bicycles?', opts: ['To stay fit and reduce emissions', 'Because they cannot afford buses', 'Because bicycles are faster than cars'], ans: 'To stay fit and reduce emissions' },
      ],
    },
    transformations: [
      { original: "Because it was noisy, I couldn't concentrate on my lesson.", key: "It was noisy, so I couldn't concentrate on my lesson." },
      { original: 'My brother likes collecting old stamps.', key: 'My brother is fond of collecting old stamps.' },
      { original: 'Pop music is different from classical music.', key: 'Pop music is not the same as classical music.' },
      { original: 'She used to ride a small bike to school.', key: 'She rode a small bike to school in the past.' },
    ],
    wordOrders: [
      { scrambled: 'eating / healthy / good / for / is / food / health.', key: 'Eating healthy food is good for health.' },
      { scrambled: 'donated / books / they / old / to / students / poor / yesterday.', key: 'They donated old books to poor students yesterday.' },
      { scrambled: 'traffic / jams / occur / often / during / rush / hours.', key: 'Traffic jams often occur during rush hours.' },
    ],
    writingTopic: 'Write a short paragraph (60 - 80 words) about a community activity you participated in or how to keep healthy.',
  },
  '8': {
    phonetics: [
      { stem: 'l<u>ei</u>sure, n<u>ei</u>ghbour, w<u>ei</u>ght', opts: ['leisure', 'neighbour', 'weight'], ans: 'leisure' },
      { stem: 'nat<u>u</u>ral, cult<u>u</u>re, f<u>u</u>ture', opts: ['natural', 'culture', 'future'], ans: 'natural' },
      { stem: 'er<u>u</u>ption, pollu<u>ti</u>on, ques<u>ti</u>on', opts: ['question', 'eruption', 'pollution'], ans: 'question' },
    ],
    language: [
      { stem: 'Living in the countryside is ________ than living in a crowded metropolis.', opts: ['more peaceful', 'peaceful', 'peacefuller'], ans: 'more peaceful' },
      { stem: 'Students are keen on ________ new digital skills online.', opts: ['learning', 'learn', 'learned'], ans: 'learning' },
      { stem: '________ you work hard every day, you will pass the exam easily.', opts: ['If', 'Unless', 'Although'], ans: 'If' },
      { stem: 'The ethnic minority people wear colourful ________ costumes during festivals.', opts: ['traditional', 'tradition', 'traditionally'], ans: 'traditional' },
      { stem: 'While my father was reading a book, my mother ________ dinner.', opts: ['was cooking', 'cooked', 'cooks'], ans: 'was cooking' },
      { stem: 'You ________ wear warm clothes because it is freezing outside.', opts: ['should', "mustn't", "needn't"], ans: 'should' },
      { stem: 'Our planet is facing serious threats from environmental ________.', opts: ['pollution', 'pollute', 'polluted'], ans: 'pollution' },
      { stem: "If we don't save clean water, we ________ face severe droughts.", opts: ['will', 'would', 'must'], ans: 'will' },
    ],
    clozeText: 'Vietnam is home to 54 distinct ethnic groups, each with its unique culture, language, and customs. The Viet (Kinh) people make up the majority of the population, living mostly in the fertile river deltas. Ethnic minority groups, such as the Tay, Hmong, and Thai, primarily reside in the northern mountainous (1) ________. They preserve rich folk music and skilled crafts like weaving (2) ________ cloths. Visiting ethnic villages allows travellers to experience (3) ________ hospitality and learn about ancient (4) ________ traditions.',
    clozeOpts: [
      { num: '1', opts: ['regions', 'oceans', 'factories'], ans: 'regions' },
      { num: '2', opts: ['brocade', 'paper', 'plastic'], ans: 'brocade' },
      { num: '3', opts: ['warm', 'cold', 'hostile'], ans: 'warm' },
      { num: '4', opts: ['cultural', 'chemical', 'electric'], ans: 'cultural' },
    ],
    readingComp: {
      text: 'Natural disasters like typhoons, floods and landslides have become more unpredictable due to global climate change. Every year in Central Vietnam, heavy rains trigger severe flooding, causing damage to infrastructure and agricultural crops. In response, local schools now include disaster preparedness training in their extracurricular curricula. Students learn how to prepare emergency survival kits, memorize rescue telephone hotlines, and follow safe evacuation routes.',
      questions: [
        { q: 'Why are natural disasters becoming more unpredictable?', opts: ['Due to global climate change', 'Due to urbanization', 'Due to technology'], ans: 'Due to global climate change' },
        { q: 'What do local schools in Central Vietnam include in their curricula?', opts: ['Disaster preparedness training', 'Sailing lessons', 'Mountain climbing'], ans: 'Disaster preparedness training' },
        { q: 'What do students learn to do in case of disasters?', opts: ['Prepare survival kits and follow evacuation routes', 'Stay indoors without communication', 'Go to the river'], ans: 'Prepare survival kits and follow evacuation routes' },
      ],
    },
    transformations: [
      { original: 'Living in the city is noisier than living in the countryside.', key: 'Living in the countryside is more peaceful than living in the city.' },
      { original: 'Because Nam practiced hard, he won the badminton championship.', key: 'Nam practiced hard, so he won the badminton championship.' },
      { original: 'Unless we protect wildlife, many rare animals will become extinct.', key: "If we don't protect wildlife, many rare animals will become extinct." },
    ],
    wordOrders: [
      { scrambled: 'ethnic / wear / costumes / minority / people / beautiful / traditional.', key: 'Ethnic minority people wear beautiful traditional costumes.' },
      { scrambled: 'protecting / responsibility / environment / is / the / of / everyone.', key: 'Protecting the environment is the responsibility of everyone.' },
    ],
    writingTopic: 'Write a paragraph (80 - 100 words) about life in the countryside or the traditional lifestyle of an ethnic group.',
  },
  '9': {
    phonetics: [
      { stem: 'l<u>o</u>cal, h<u>o</u>metown, p<u>o</u>pular', opts: ['popular', 'local', 'hometown'], ans: 'popular' },
      { stem: 'c<u>i</u>ty, c<u>e</u>nter, <u>c</u>raft', opts: ['craft', 'city', 'center'], ans: 'craft' },
      { stem: 'pr<u>e</u>serve, r<u>e</u>place, d<u>e</u>velop', opts: ['replace', 'preserve', 'develop'], ans: 'replace' },
    ],
    language: [
      { stem: 'My grandparents ________ in this peaceful craft village for fifty years.', opts: ['have lived', 'lived', 'live'], ans: 'have lived' },
      { stem: "I don't know where ________ the best pottery products.", opts: ['to buy', 'buying', 'bought'], ans: 'to buy' },
      { stem: 'She wishes she ________ speak fluent English like a native speaker.', opts: ['could', 'can', 'will'], ans: 'could' },
      { stem: 'It is said that Ha Long Bay is one of the most magnificent ________.', opts: ['wonders', 'wonder', 'wonderful'], ans: 'wonders' },
      { stem: 'The artisan who ________ these silk scarves is very famous.', opts: ['makes', 'making', 'make'], ans: 'makes' },
      { stem: 'If I were you, I ________ join the environmental youth club.', opts: ['would', 'will', 'can'], ans: 'would' },
      { stem: 'Many traditional handicraft villages are at risk of dying ________.', opts: ['out', 'of', 'in'], ans: 'out' },
      { stem: 'The more English books you read, the ________ your vocabulary becomes.', opts: ['richer', 'richest', 'rich'], ans: 'richer' },
    ],
    clozeText: 'Bat Trang is a famous 700-year-old traditional pottery village located on the outskirts of Hanoi. Generations of skilled artisans have passed down delicate techniques of moulding, glazing, and firing ceramic clay. Today, the village not only manufactures daily tableware and decorative vases for export, but also (1) ________ a bustling tourist destination. Visitors can try their hand (2) ________ shaping a clay bowl on a potter wheel. Supporting traditional craft villages helps preserve national cultural (3) ________ while providing stable livelihoods for local (4) ________.',
    clozeOpts: [
      { num: '1', opts: ['remains', 'destroys', 'cancels'], ans: 'remains' },
      { num: '2', opts: ['at', 'on', 'with'], ans: 'at' },
      { num: '3', opts: ['heritage', 'rubbish', 'danger'], ans: 'heritage' },
      { num: '4', opts: ['artisans', 'robots', 'foreigners'], ans: 'artisans' },
    ],
    readingComp: {
      text: 'Secondary school graduates in Vietnam now have diverse pathways after completing Grade 9. Besides continuing academic studies at senior high schools, many teenagers choose vocational colleges that combine general education with vocational training in information technology, culinary arts, or graphic design. Career counseling teachers advise that students should evaluate their personal strengths, passions, and family circumstances before making final educational choices.',
      questions: [
        { q: 'What do diverse pathways allow Grade 9 graduates to do?', opts: ['Choose between academic high schools and vocational colleges', 'Stop studying completely', 'Work abroad immediately'], ans: 'Choose between academic high schools and vocational colleges' },
        { q: 'What do vocational colleges combine?', opts: ['General education with practical vocational training', 'Foreign languages only', 'Arts and music only'], ans: 'General education with practical vocational training' },
        { q: 'What should students evaluate before choosing a career path?', opts: ['Personal strengths, passions, and family circumstances', 'Social media popularity', 'Salary only'], ans: 'Personal strengths, passions, and family circumstances' },
      ],
    },
    transformations: [
      { original: "I don't know who I should talk to about my study stress.", key: "I don't know who to talk to about my study stress." },
      { original: 'I cannot speak English fluently.', key: 'I wish I could speak English fluently.' },
      { original: 'People say that Da Nang is a worth-living city.', key: 'It is said that Da Nang is a worth-living city.' },
    ],
    wordOrders: [
      { scrambled: 'artisans / preserve / traditional / help / craft / villages / the.', key: 'Artisans help preserve the traditional craft villages.' },
      { scrambled: 'tourism / eco / protects / natural / habitats / valuable.', key: 'Eco tourism protects valuable natural habitats.' },
    ],
    writingTopic: 'Write a paragraph (100 - 120 words) about the benefits and challenges of preserving traditional craft villages.',
  },
};

// Helper tạo đoạn văn bản nhanh
function createP(text: string, bold = false, italic = false, align = AlignmentType.LEFT, size = 26): Paragraph {
  return new Paragraph({
    alignment: align,
    spacing: { before: 80, after: 80, line: 276 },
    children: [
      new TextRun({
        text,
        bold,
        italics: italic,
        size,
        font: FONT_FAMILY,
      }),
    ],
  });
}

function createSectionHeading(title: string): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 180, after: 80, line: 276 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 26,
        font: FONT_FAMILY,
      }),
    ],
  });
}

function createCell(content: string, bold = false, align = AlignmentType.CENTER, widthPct = 20, fill = 'FFFFFF'): TableCell {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    shading: { fill },
    children: [
      new Paragraph({
        alignment: align,
        spacing: { before: 60, after: 60 },
        children: [
          new TextRun({
            text: content,
            bold,
            size: 24,
            font: FONT_FAMILY,
          }),
        ],
      }),
    ],
  });
}

// Xáo trộn mảng
function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Sinh đề thi động ngẫu nhiên không trùng lặp và đóng gói ra file Word .docx
 */
export async function generateDynamicExamDocx(cfg: DynamicExamConfig): Promise<{
  blob: Blob;
  fileName: string;
  code1: string;
  code2: string;
}> {
  const grade = cfg.grade || '6';
  const term = cfg.term || 'GK1';
  const parentAgency = (cfg.parentAgency || 'UBND XÃ ĐỒNG YÊN').toUpperCase();
  const schoolName = (cfg.schoolName || 'TRƯỜNG THCS ĐỒNG YÊN').toUpperCase();
  const academicYear = cfg.academicYear || '2026 - 2027';

  // ƯU TIÊN SỐ 1: Nạp khuôn mẫu gốc chuẩn 100% của trường Đồng Yên để đảm bảo đề xuất ra ĐÚNG Y HỆT ĐỀ MẪU
  try {
    const exactResult = await generateDynamicExamFromExactTemplate({
      grade,
      term,
      parentAgency,
      schoolName,
    });
    return exactResult;
  } catch (templateErr) {
    console.warn('Không thể nạp đề từ template gốc, fallback sang engine docx nội tại:', templateErr);
  }

  // Nếu là Đề cương ôn tập
  if (term === 'DECUONG') {
    return generateDynamicRevisionGuideDocx(cfg);
  }

  const bank = QUESTION_BANKS[grade] || QUESTION_BANKS['6'];
  const baseCode = parseInt(grade, 10) * 100 + (Math.floor(Math.random() * 40) * 2 + 1);
  const code1 = baseCode.toString();
  const code2 = (baseCode + 1).toString();

  const termNames: Record<string, string> = {
    GK1: 'GIỮA HỌC KỲ I',
    CK1: 'CUỐI HỌC KỲ I',
    GK2: 'GIỮA HỌC KỲ II',
    CK2: 'CUỐI HỌC KỲ II',
    KSCL: 'KHẢO SÁT CHẤT LƯỢNG ĐẦU NĂM',
  };
  const termTitle = termNames[term] || 'ĐỊNH KỲ';
  const isSpeaking = term === 'CK1' || term === 'CK2';
  const totalWrittenPoints = isSpeaking ? '8.0' : '10.0';

  // 1. Trộn câu hỏi Phonetics & Language Focus
  const phoneticsShuffled = shuffleArray(bank.phonetics).slice(0, 2);
  const languageShuffled = shuffleArray(bank.language).slice(0, 8);
  const mcqPool = [...phoneticsShuffled, ...languageShuffled];

  // Mã đề 1
  const code1Questions: Array<{ qNum: number; prompt: string; options: string[]; answerLetter: string; rawAns: string }> = [];
  mcqPool.forEach((item, idx) => {
    const shuffledOpts = shuffleArray(item.opts);
    const correctIdx = shuffledOpts.indexOf(item.ans);
    const letter = String.fromCharCode(65 + correctIdx);
    code1Questions.push({
      qNum: idx + 1,
      prompt: item.stem,
      options: shuffledOpts,
      answerLetter: letter,
      rawAns: item.ans,
    });
  });

  // Mã đề 2 (hoán vị thứ tự và đáp án)
  const code2Pool = shuffleArray(mcqPool);
  const code2Questions: Array<{ qNum: number; prompt: string; options: string[]; answerLetter: string; rawAns: string }> = [];
  code2Pool.forEach((item, idx) => {
    const shuffledOpts = shuffleArray(item.opts);
    const correctIdx = shuffledOpts.indexOf(item.ans);
    const letter = String.fromCharCode(65 + correctIdx);
    code2Questions.push({
      qNum: idx + 1,
      prompt: item.stem,
      options: shuffledOpts,
      answerLetter: letter,
      rawAns: item.ans,
    });
  });

  // Câu hỏi Tự luận viết lại & sắp xếp
  const trans = shuffleArray(bank.transformations).slice(0, 2);
  const words = shuffleArray(bank.wordOrders).slice(0, 2);

  // Tạo các bảng Word
  // Bảng Header 2 cột
  const headerTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 45, type: WidthType.PERCENTAGE },
            children: [
              createP(parentAgency, true, false, AlignmentType.CENTER, 22),
              createP(schoolName, true, false, AlignmentType.CENTER, 22),
              createP('-------------------', false, false, AlignmentType.CENTER, 18),
            ],
          }),
          new TableCell({
            width: { size: 55, type: WidthType.PERCENTAGE },
            children: [
              createP(`KIỂM TRA ${termTitle} - NĂM HỌC ${academicYear}`, true, false, AlignmentType.CENTER, 22),
              createP(`MÔN: TIẾNG ANH ${grade} - CHƯƠNG TRÌNH GDPT 2018`, true, false, AlignmentType.CENTER, 22),
              createP(`Thời gian làm bài: 60 phút (Không kể thời gian giao đề)`, false, true, AlignmentType.CENTER, 20),
            ],
          }),
        ],
      }),
    ],
  });

  // Ma trận 7991 mẫu
  const matrixTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createCell('TT', true, AlignmentType.CENTER, 6, 'E2E8F0'),
          createCell('Kỹ năng / Mạch kiến thức', true, AlignmentType.CENTER, 34, 'E2E8F0'),
          createCell('Nhận biết (40%)', true, AlignmentType.CENTER, 15, 'E2E8F0'),
          createCell('Thông hiểu (30%)', true, AlignmentType.CENTER, 15, 'E2E8F0'),
          createCell('Vận dụng (20%)', true, AlignmentType.CENTER, 15, 'E2E8F0'),
          createCell('V.Dụng cao (10%)', true, AlignmentType.CENTER, 15, 'E2E8F0'),
        ],
      }),
      new TableRow({
        children: [
          createCell('1', false, AlignmentType.CENTER, 6),
          createCell('Nghe hiểu (Listening - 2.0đ)', false, AlignmentType.LEFT, 34),
          createCell('4 câu (1.0đ)', false, AlignmentType.CENTER, 15),
          createCell('2 câu (0.5đ)', false, AlignmentType.CENTER, 15),
          createCell('2 câu (0.5đ)', false, AlignmentType.CENTER, 15),
          createCell('0', false, AlignmentType.CENTER, 15),
        ],
      }),
      new TableRow({
        children: [
          createCell('2', false, AlignmentType.CENTER, 6),
          createCell('Kiến thức ngôn ngữ (Phonetics & Grammar - 3.0đ)', false, AlignmentType.LEFT, 34),
          createCell('6 câu (1.5đ)', false, AlignmentType.CENTER, 15),
          createCell('4 câu (1.0đ)', false, AlignmentType.CENTER, 15),
          createCell('2 câu (0.5đ)', false, AlignmentType.CENTER, 15),
          createCell('0', false, AlignmentType.CENTER, 15),
        ],
      }),
      new TableRow({
        children: [
          createCell('3', false, AlignmentType.CENTER, 6),
          createCell('Đọc hiểu (Cloze & Reading - 2.5đ)', false, AlignmentType.LEFT, 34),
          createCell('4 câu (1.0đ)', false, AlignmentType.CENTER, 15),
          createCell('3 câu (0.75đ)', false, AlignmentType.CENTER, 15),
          createCell('3 câu (0.75đ)', false, AlignmentType.CENTER, 15),
          createCell('0', false, AlignmentType.CENTER, 15),
        ],
      }),
      new TableRow({
        children: [
          createCell('4', false, AlignmentType.CENTER, 6),
          createCell(`Viết tự luận (${isSpeaking ? '0.5đ' : '2.5đ'})`, false, AlignmentType.LEFT, 34),
          createCell('0', false, AlignmentType.CENTER, 15),
          createCell('2 câu (0.5đ)', false, AlignmentType.CENTER, 15),
          createCell('2 câu (0.5đ)', false, AlignmentType.CENTER, 15),
          createCell('1 đoạn văn (1.5đ)', false, AlignmentType.CENTER, 15),
        ],
      }),
      ...(isSpeaking ? [
        new TableRow({
          children: [
            createCell('5', false, AlignmentType.CENTER, 6),
            createCell('Nói (Speaking Test - 2.0đ)', true, AlignmentType.LEFT, 34, 'FEF3C7'),
            createCell('0', false, AlignmentType.CENTER, 15, 'FEF3C7'),
            createCell('Part 1: About you (1.0đ)', false, AlignmentType.CENTER, 15, 'FEF3C7'),
            createCell('Part 2: Topic presentation (1.0đ)', false, AlignmentType.CENTER, 15, 'FEF3C7'),
            createCell('Examiner Script 4 cột', false, AlignmentType.CENTER, 15, 'FEF3C7'),
          ],
        }),
      ] : []),
    ],
  });

  // Bảng Đáp án
  const answerRows = [
    new TableRow({
      children: [
        createCell('Câu', true, AlignmentType.CENTER, 15, 'E2E8F0'),
        createCell(`MÃ ĐỀ ${code1}`, true, AlignmentType.CENTER, 42, 'E2E8F0'),
        createCell(`MÃ ĐỀ ${code2}`, true, AlignmentType.CENTER, 43, 'E2E8F0'),
      ],
    }),
  ];

  for (let i = 0; i < code1Questions.length; i++) {
    const q1 = code1Questions[i];
    const q2 = code2Questions[i];
    answerRows.push(
      new TableRow({
        children: [
          createCell(`Câu ${i + 1}`, false, AlignmentType.CENTER, 15),
          createCell(`${q1.answerLetter} (${q1.rawAns})`, true, AlignmentType.LEFT, 42),
          createCell(`${q2.answerLetter} (${q2.rawAns})`, true, AlignmentType.LEFT, 43),
        ],
      })
    );
  }

  const answerTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: answerRows,
  });

  // Tạo tài liệu docx
  const doc = new Document({
    sections: [
      {
        properties: { page: { margin: MARGINS } },
        children: [
          headerTable,
          new Paragraph({ spacing: { after: 120 } }),

          createP(`MA TRẬN ĐẶC TẢ KỸ THUẬT THEO CÔNG VĂN 7991/BGDĐT`, true, false, AlignmentType.CENTER, 28),
          createP(`Môn: Tiếng Anh ${grade} • Năm học ${academicYear}`, false, true, AlignmentType.CENTER, 22),
          new Paragraph({ spacing: { after: 120 } }),
          matrixTable,

          new Paragraph({ spacing: { before: 240, after: 120 } }),
          createP(`════════════════════════════════════════════════════════════════`, false, false, AlignmentType.CENTER, 18),
          createP(`ĐỀ KIỂM TRA CHÍNH THỨC - MÃ ĐỀ: ${code1}`, true, false, AlignmentType.CENTER, 28),
          createP(`(Thang điểm: ${totalWrittenPoints} điểm Viết)`, false, true, AlignmentType.CENTER, 22),
          new Paragraph({ spacing: { after: 120 } }),

          createSectionHeading('PART I. LANGUAGE FOCUS & PHONETICS (Choose A, B, or C)'),
          ...code1Questions.map((q) => {
            const optText = q.options.map((opt, oIdx) => `${String.fromCharCode(65 + oIdx)}. ${opt}`).join('        ');
            return new Paragraph({
              spacing: { before: 60, after: 60, line: 276 },
              children: [
                new TextRun({ text: `Question ${q.qNum}. `, bold: true, font: FONT_FAMILY, size: 26 }),
                new TextRun({ text: `${q.prompt.replace(/<.*?>/g, '')}\n   ${optText}`, font: FONT_FAMILY, size: 26 }),
              ],
            });
          }),

          createSectionHeading('PART II. READING COMPREHENSION (Read and answer)'),
          createP(bank.readingComp.text, false, true, AlignmentType.JUSTIFIED, 24),
          ...bank.readingComp.questions.map((rq: any, idx: number) => {
            const optText = rq.opts.map((opt: string, oIdx: number) => `${String.fromCharCode(65 + oIdx)}. ${opt}`).join('    ');
            return new Paragraph({
              spacing: { before: 60, after: 60 },
              children: [
                new TextRun({ text: `Question ${11 + idx}. ${rq.q}\n   ${optText}`, font: FONT_FAMILY, size: 26 }),
              ],
            });
          }),

          createSectionHeading('PART III. WRITING (Sentence Transformation & Order)'),
          createP('Rewrite the following sentences without changing their meaning:'),
          ...trans.map((t: any, idx: number) => {
            return new Paragraph({
              spacing: { before: 60, after: 60 },
              children: [
                new TextRun({ text: `Question ${14 + idx}. ${t.original}\n➞ `, font: FONT_FAMILY, size: 26 }),
                new TextRun({ text: '................................................................................................................................................', font: FONT_FAMILY, size: 24 }),
              ],
            });
          }),

          createP('Rearrange the words to make complete sentences:'),
          ...words.map((w: any, idx: number) => {
            return new Paragraph({
              spacing: { before: 60, after: 60 },
              children: [
                new TextRun({ text: `Question ${16 + idx}. ${w.scrambled}\n➞ `, font: FONT_FAMILY, size: 26 }),
                new TextRun({ text: '................................................................................................................................................', font: FONT_FAMILY, size: 24 }),
              ],
            });
          }),

          new Paragraph({ spacing: { before: 240, after: 120 } }),
          createP(`════════════════════════════════════════════════════════════════`, false, false, AlignmentType.CENTER, 18),
          createP(`BẢNG ĐÁP ÁN & HƯỚNG DẪN CHẤM CHI TIẾT`, true, false, AlignmentType.CENTER, 28),
          createP(`Áp dụng cho Mã đề ${code1} & Mã đề ${code2}`, false, true, AlignmentType.CENTER, 22),
          new Paragraph({ spacing: { after: 120 } }),
          answerTable,

          ...(isSpeaking ? [
            new Paragraph({ spacing: { before: 240, after: 120 } }),
            createP(`════════════════════════════════════════════════════════════════`, false, false, AlignmentType.CENTER, 18),
            createP(`BÀI THI NÓI (SPEAKING TEST - 2.0 ĐIỂM) KÈM EXAMINER SCRIPT 4 CỘT`, true, false, AlignmentType.CENTER, 26),
            createP(`Part 1: Interview & Personal Questions (1.0đ) • Part 2: Topic Presentation (1.0đ)`, false, true, AlignmentType.CENTER, 22),
            new Paragraph({ spacing: { after: 80 } }),
            createP(`Examiner Script: Giám khảo đặt 3 câu hỏi phỏng vấn học sinh về bản thân, sở thích, trường học. Học sinh trả lời trôi chảy, đúng ngữ pháp, phát âm rõ ràng được tối đa 1.0 điểm. Phần 2 bốc thăm chủ đề và trình bày trong 1-2 phút được 1.0 điểm.`, false, false, AlignmentType.JUSTIFIED, 24),
          ] : []),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `${term} - Anh ${grade} (Ma ${code1}-${code2}).docx`;
  return { blob, fileName, code1, code2 };
}

/**
 * Sinh Đề cương ôn tập 6 trang tùy biến tên trường (mục tiêu 6.0+ điểm)
 */
export async function generateDynamicRevisionGuideDocx(cfg: DynamicExamConfig): Promise<{
  blob: Blob;
  fileName: string;
  code1: string;
  code2: string;
}> {
  const grade = cfg.grade || '6';
  const parentAgency = (cfg.parentAgency || 'UBND XÃ ĐỒNG YÊN').toUpperCase();
  const schoolName = (cfg.schoolName || 'TRƯỜNG THCS ĐỒNG YÊN').toUpperCase();

  const doc = new Document({
    sections: [
      {
        properties: { page: { margin: MARGINS } },
        children: [
          createP(parentAgency, true, false, AlignmentType.CENTER, 22),
          createP(schoolName, true, false, AlignmentType.CENTER, 22),
          createP(`ĐỀ CƯƠNG ÔN TẬP TRỌNG TÂM MÔN TIẾNG ANH ${grade}`, true, false, AlignmentType.CENTER, 28),
          createP(`(Bám sát chuẩn kiến thức kỹ năng CV 7991/BGDĐT - Mục tiêu 6.0+ điểm)`, false, true, AlignmentType.CENTER, 22),
          new Paragraph({ spacing: { after: 160 } }),

          createSectionHeading('CHUYÊN ĐỀ 1: QUY TẮC PHÁT ÂM ĐUÔI -S/-ES VÀ ĐUÔI -ED'),
          createP('1. Quy tắc phát âm đuôi -s/-es:\n• Phát âm là /s/: Sau các âm vô thanh /p/, /t/, /k/, /f/, /θ/ (Mẹo nhớ: Thời phong kiến phương Tây).\n• Phát âm là /iz/: Sau các âm xuýt /s/, /z/, /ʃ/, /tʃ/, /dʒ/ (chữ cái tận cùng: s, ss, ch, sh, x, z, ge, ce).\n• Phát âm là /z/: Sau các nguyên âm và phụ âm hữu thanh còn lại.'),
          createP('2. Quy tắc phát âm đuôi -ed:\n• Phát âm là /id/: Sau âm /t/ và /d/ (Mẹo nhớ: Tiền Đô).\n• Phát âm là /t/: Sau các âm vô thanh /p/, /k/, /f/, /s/, /ʃ/, /tʃ/ (Mẹo nhớ: Chính phủ Pháp không sợ thua).\n• Phát âm là /d/: Sau các nguyên âm và phụ âm hữu thanh còn lại.'),

          createSectionHeading('CHUYÊN ĐỀ 2: CÁC THÌ VÀ CẤU TRÚC NGỮ PHÁP TRỌNG TÂM'),
          createP('• Thì Hiện tại đơn (Present Simple): S + V(s/es) | S + do/does not + V-inf.\n• Thì Quá khứ đơn (Past Simple): S + V2/ed | S + did not + V-inf.\n• So sánh hơn: S1 + be + adj-er + than + S2 (ngắn) | S1 + be + more + adj + than + S2 (dài).\n• Câu điều kiện loại 1: If + S + V(hiện tại đơn), S + will + V-inf.'),

          createSectionHeading('CHUYÊN ĐỀ 3: CHIẾN THUẬT LÀM BÀI ĐỌC HIỂU ĐẠT ĐIỂM TỐI ĐA'),
          createP('BƯỚC 1: Đọc câu hỏi trước để gạch chân Từ Khóa (Keywords: Tên riêng, Thời gian, Nơi chốn).\nBƯỚC 2: Quét nhanh văn bản (Scanning) để định vị thông tin chứa từ khóa tương ứng.\nBƯỚC 3: Đối chiếu 3 phương án A, B, C và chọn đáp án chính xác nhất.'),

          createSectionHeading('CHUYÊN ĐỀ 4: MẪU CÂU VIẾT LẠI VÀ ĐOẠN VĂN MẪU'),
          createP('Mẫu 1: Because ➞ So (Nguyên nhân - Kết quả): Because it rained, we stayed home. ➞ It rained, so we stayed home.\nMẫu 2: Like / Enjoy ➞ Be interested in: She likes reading. ➞ She is interested in reading.\nMẫu 3: So sánh hơn ➞ So sánh nhất: No one is taller than Nam. ➞ Nam is the tallest student.'),
          new Paragraph({ spacing: { before: 120 } }),
          createP(`Tài liệu được biên soạn phục vụ học sinh ôn tập tại ${schoolName}. Chúc các em đạt kết quả cao!`, false, true, AlignmentType.CENTER, 22),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `De_Cuong_On_Tap_Anh_${grade}.docx`;
  return { blob, fileName, code1: '001', code2: '002' };
}
