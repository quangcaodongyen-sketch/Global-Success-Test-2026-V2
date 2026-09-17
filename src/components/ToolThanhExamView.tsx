import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Download,
  School,
  Save,
  CheckCircle2,
  FileText,
  Clock,
  Mic,
  MicOff,
  BookOpen,
  Award,
  Layers,
  ChevronRight,
} from 'lucide-react';
import {
  getSchoolConfig,
  saveSchoolConfig,
  consumeTrial,
  getLicenseState,
} from '../utils/licenseManager';
import {
  downloadCustomizedStandardDocx,
  generateDynamicExamFromExactTemplate,
} from '../utils/exactExamTemplateEngine';

interface ToolThanhExamViewProps {
  onExamSuccess: (info: {
    fileName: string;
    examTitle: string;
    fileBlob?: Blob;
    downloadUrl?: string;
  }) => void;
  onOpenActivationModal: () => void;
  onSwitchToAiSuite?: () => void;
}

interface ExamMeta {
  file: string;
  relPath: string;
  topics: string;
  score: string;
  speaking: string;
  isSpeaking: boolean;
  pills: string[];
}

const EXAM_CATALOG: Record<string, Record<string, ExamMeta>> = {
  '6': {
    GK1: {
      file: 'GK1 - Anh 6.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_6/Giua_Ky_1/GK1 - Anh 6.docx',
      topics: 'Unit 1: My New School, Unit 2: My House, Unit 3: My Friends',
      score: '100% Đề kiểm tra Viết trên giấy (10.0 điểm). 36 câu TNKQ + 1 câu Viết tự luận.',
      speaking: 'Không có phần thi Nói (Giữa kỳ chỉ thi Viết trên giấy).',
      isSpeaking: false,
      pills: ['Thì hiện tại đơn', 'Tính từ miêu tả', 'Giới từ chỉ vị trí', 'Phát âm /s/, /z/', 'Từ vựng trường lớp'],
    },
    CK1: {
      file: 'CK1 - Anh 6.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_6/Cuoi_Ky_1/CK1 - Anh 6.docx',
      topics: 'Unit 1 đến Unit 6 (Tet holiday, Natural Wonders, Neighbourhood)',
      score: 'Đề viết 8.0 điểm (36 câu TNKQ + Viết) + Bài thi Nói (Speaking) 2.0 điểm = Tổng 10.0 điểm.',
      speaking: 'Có Speaking 2.0đ: Picture Talk (1.0đ) + About You (1.0đ) kèm Examiner Script 4 cột.',
      isSpeaking: true,
      pills: ['So sánh hơn', "should/shouldn't", "must/mustn't", 'Countable/Uncountable', 'Tet traditions'],
    },
    GK2: {
      file: 'GK2 - Anh 6.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_6/Giua_Ky_2/GK2 - Anh 6.docx',
      topics: 'Unit 7: Television, Unit 8: Sports and Games, Unit 9: Cities of the World',
      score: '100% Đề kiểm tra Viết trên giấy (10.0 điểm). 36 câu TNKQ + 1 câu Viết tự luận.',
      speaking: 'Không có phần thi Nói (Giữa kỳ chỉ thi Viết).',
      isSpeaking: false,
      pills: ['Quá khứ đơn (Past simple)', 'Liên từ and/but/so/because', 'So sánh nhất (Superlatives)', 'Đại từ sở hữu'],
    },
    CK2: {
      file: 'CK2 - Anh 6.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_6/Cuoi_Ky_2/CK2 - Anh 6.docx',
      topics: 'Unit 7 đến Unit 12 (Future Houses, 3Rs Environment, Smart Robots)',
      score: 'Đề viết 8.0 điểm (36 câu TNKQ + Viết) + Bài thi Nói (Speaking) 2.0 điểm = Tổng 10.0 điểm.',
      speaking: 'Có Speaking 2.0đ: Picture Talk (1.0đ) + About You (1.0đ) kèm Examiner Script 4 cột.',
      isSpeaking: true,
      pills: ['Câu điều kiện loại 1', "will/won't & might", 'will be able to', 'Quy tắc 3Rs', 'Robots capabilities'],
    },
    KSCL: {
      file: 'KSCL - Anh 6.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_6/Khao_Sat_Dau_Nam/KSCL - Anh 6.docx',
      topics: 'Khảo sát chất lượng đầu năm / Đánh giá năng lực tổng hợp Tiếng Anh 6',
      score: '100% Đề kiểm tra Viết (10.0 điểm). 36 câu TNKQ + 1 câu Viết tự luận.',
      speaking: 'Không có phần thi Nói.',
      isSpeaking: false,
      pills: ['Tổng hợp ngữ âm', 'Từ vựng cơ bản', 'Ngữ pháp then chốt', 'Đọc hiểu & Viết đoạn'],
    },
    DECUONG: {
      file: 'De_Cuong_On_Tap_Anh_6.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_6/De_Cuong_On_Tap_Anh_6.docx',
      topics: 'Đề cương ôn tập trọng tâm 6 trang (Mục tiêu 6.0 điểm)',
      score: 'Hệ thống Ngữ âm, Bảng từ vựng Unit 1-12, 30 câu trắc nghiệm ngữ pháp, 2 bài đọc mẫu, 10 câu viết lại và 3 đoạn văn mẫu.',
      speaking: 'Tài liệu ôn tập tự học / dạy thêm bám sát ma trận đề kiểm tra.',
      isSpeaking: false,
      pills: ['6 Trang chuẩn A4', 'Quy tắc phát âm -s/ed', 'Công thức thì & so sánh', 'Mẹo tìm keyword đọc hiểu', '3 Đoạn văn mẫu'],
    },
  },
  '7': {
    GK1: {
      file: 'GK1 - Anh 7.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_7/Giua_Ky_1/GK1 - Anh 7.docx',
      topics: 'Unit 1: Hobbies, Unit 2: Healthy Living, Unit 3: Community Service',
      score: '100% Đề kiểm tra Viết (10.0 điểm). 36 câu TNKQ + 1 câu Viết tự luận.',
      speaking: 'Không có phần thi Nói (Giữa kỳ chỉ thi Viết trên giấy).',
      isSpeaking: false,
      pills: ['like/enjoy + V-ing', 'Hiện tại & Quá khứ đơn', 'Từ vựng sức khỏe & tình nguyện', 'Phát âm /s/, /z/, /t/, /d/'],
    },
    CK1: {
      file: 'CK1 - Anh 7.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_7/Cuoi_Ky_1/CK1 - Anh 7.docx',
      topics: 'Unit 1 đến Unit 6 (Music & Arts, Food & Drink, School)',
      score: 'Đề viết 8.0 điểm (36 câu TNKQ + Viết) + Bài thi Nói (Speaking) 2.0 điểm = Tổng 10.0 điểm.',
      speaking: 'Có Speaking 2.0đ: Describe a Picture + Personal Topic kèm Examiner Script 4 cột.',
      isSpeaking: true,
      pills: ['as...as, the same as, different from', 'some/any, how much/many', 'Passive voice cơ bản', 'Music & Food'],
    },
    GK2: {
      file: 'GK2 - Anh 7.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_7/Giua_Ky_2/GK2 - Anh 7.docx',
      topics: 'Unit 7: Traffic, Unit 8: Films, Unit 9: Festivals around the World',
      score: '100% Đề kiểm tra Viết (10.0 điểm). 36 câu TNKQ + 1 câu Viết tự luận.',
      speaking: 'Không có phần thi Nói (Giữa kỳ chỉ thi Viết).',
      isSpeaking: false,
      pills: ['It indicates distance', 'used to + V', 'although/despite/however', 'Traffic signs & Film genres'],
    },
    CK2: {
      file: 'CK2 - Anh 7.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_7/Cuoi_Ky_2/CK2 - Anh 7.docx',
      topics: 'Unit 7 đến Unit 12 (Energy sources, Travelling in the future, English-speaking countries)',
      score: 'Đề viết 8.0 điểm (36 câu TNKQ + Viết) + Bài thi Nói (Speaking) 2.0 điểm = Tổng 10.0 điểm.',
      speaking: 'Có Speaking 2.0đ: Describe a Picture + Personal Topic kèm Examiner Script 4 cột.',
      isSpeaking: true,
      pills: ['Future continuous', 'Possessive pronouns', 'Solar/Wind energy', 'Future vehicles'],
    },
    KSCL: {
      file: 'KSCL - Anh 7.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_7/Khao_Sat_Dau_Nam/KSCL - Anh 7.docx',
      topics: 'Khảo sát chất lượng đầu năm / Đánh giá năng lực tổng hợp Tiếng Anh 7',
      score: '100% Đề kiểm tra Viết (10.0 điểm). 36 câu TNKQ + 1 câu Viết tự luận.',
      speaking: 'Không có phần thi Nói.',
      isSpeaking: false,
      pills: ['Tổng hợp ngữ âm', 'Từ vựng lớp 7', 'Cấu trúc so sánh & liên từ', 'Đọc hiểu & Viết đoạn'],
    },
    DECUONG: {
      file: 'De_Cuong_On_Tap_Anh_7.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_7/De_Cuong_On_Tap_Anh_7.docx',
      topics: 'Đề cương ôn tập trọng tâm 6 trang (Mục tiêu 6.0 điểm)',
      score: 'Hệ thống Ngữ âm, Bảng từ vựng Unit 1-12, 30 câu trắc nghiệm ngữ pháp, 2 bài đọc mẫu, 10 câu viết lại và 3 đoạn văn mẫu.',
      speaking: 'Tài liệu ôn tập tự học / dạy thêm bám sát ma trận đề kiểm tra.',
      isSpeaking: false,
      pills: ['6 Trang chuẩn A4', 'Quy tắc phát âm', 'Công thức used to & although', 'Mẹo tìm keyword đọc hiểu', '3 Đoạn văn mẫu'],
    },
  },
  '8': {
    GK1: {
      file: 'GK1 - Anh 8.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_8/Giua_Ky_1/GK1 - Anh 8.docx',
      topics: 'Unit 1: Leisure Time, Unit 2: Life in the Countryside, Unit 3: Teenagers',
      score: '100% Đề kiểm tra Viết (10.0 điểm). 36 câu TNKQ + 1 câu Viết tự luận.',
      speaking: 'Không có phần thi Nói (Giữa kỳ chỉ thi Viết trên giấy).',
      isSpeaking: false,
      pills: ['Verbs of liking/disliking', 'Comparative adverbs (-er, more)', 'Simple & Compound sentences', 'Teen stress'],
    },
    CK1: {
      file: 'CK1 - Anh 8.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_8/Cuoi_Ky_1/CK1 - Anh 8.docx',
      topics: 'Unit 1 đến Unit 6 (Ethnic groups, Customs & Traditions, Lifestyles)',
      score: 'Đề viết 8.0 điểm (36 câu TNKQ + Viết) + Bài thi Nói (Speaking) 2.0 điểm = Tổng 10.0 điểm.',
      speaking: 'Có Speaking 2.0đ: Short Topic Talk (3 prompts) + Choose & Say Why kèm Examiner Script 4 cột.',
      isSpeaking: true,
      pills: ['Articles (a/an/the/zero)', 'Questions with Wh-words', 'should/have to', 'Cultural diversity'],
    },
    GK2: {
      file: 'GK2 - Anh 8.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_8/Giua_Ky_2/GK2 - Anh 8.docx',
      topics: 'Unit 7: Environmental Protection, Unit 8: Shopping, Unit 9: Natural Disasters',
      score: '100% Đề kiểm tra Viết (10.0 điểm). 36 câu TNKQ + 1 câu Viết tự luận.',
      speaking: 'Không có phần thi Nói (Giữa kỳ chỉ thi Viết).',
      isSpeaking: false,
      pills: ['Complex sentences', 'Adverbs of frequency', 'Past continuous', 'Disasters'],
    },
    CK2: {
      file: 'CK2 - Anh 8.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_8/Cuoi_Ky_2/CK2 - Anh 8.docx',
      topics: 'Unit 7 đến Unit 12 (Communication, Science & Technology, Life on other planets)',
      score: 'Đề viết 8.0 điểm (36 câu TNKQ + Viết) + Bài thi Nói (Speaking) 2.0 điểm = Tổng 10.0 điểm.',
      speaking: 'Có Speaking 2.0đ: Short Topic Talk (3 prompts) + Choose & Say Why kèm Examiner Script 4 cột.',
      isSpeaking: true,
      pills: ['Reported speech', 'May/might for possibility', 'Prepositions of time/place', 'Space exploration'],
    },
    KSCL: {
      file: 'KSCL - Anh 8.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_8/Khao_Sat_Dau_Nam/KSCL - Anh 8.docx',
      topics: 'Khảo sát chất lượng đầu năm / Đánh giá năng lực tổng hợp Tiếng Anh 8',
      score: '100% Đề kiểm tra Viết (10.0 điểm). 36 câu TNKQ + 1 câu Viết tự luận.',
      speaking: 'Không có phần thi Nói.',
      isSpeaking: false,
      pills: ['Tổng hợp ngữ âm', 'Từ vựng lớp 8', 'Câu ghép & câu phức', 'Đọc hiểu & Viết đoạn'],
    },
    DECUONG: {
      file: 'De_Cuong_On_Tap_Anh_8.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_8/De_Cuong_On_Tap_Anh_8.docx',
      topics: 'Đề cương ôn tập trọng tâm 6 trang (Mục tiêu 6.0 điểm)',
      score: 'Hệ thống Ngữ âm, Bảng từ vựng Unit 1-12, 30 câu trắc nghiệm ngữ pháp, 2 bài đọc mẫu, 10 câu viết lại và 3 đoạn văn mẫu.',
      speaking: 'Tài liệu ôn tập tự học / dạy thêm bám sát đề kiểm tra.',
      isSpeaking: false,
      pills: ['6 Trang chuẩn A4', 'Quy tắc phát âm & trọng âm', 'Câu điều kiện & gián tiếp', 'Mẹo tìm keyword', '3 Đoạn văn mẫu'],
    },
  },
  '9': {
    GK1: {
      file: 'GK1 - Anh 9.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_9/Giua_Ky_1/GK1 - Anh 9.docx',
      topics: 'Unit 1: Local Community, Unit 2: City Life, Unit 3: Healthy Living for Teens',
      score: '100% Đề kiểm tra Viết (10.0 điểm). 36 câu TNKQ + 1 câu Viết tự luận.',
      speaking: 'Không có phần thi Nói (Giữa kỳ chỉ thi Viết trên giấy).',
      isSpeaking: false,
      pills: ['Phrasal verbs', 'Comparison of adjectives/adverbs', 'Wh-question words before to-inf', 'Modal verbs in reported speech'],
    },
    CK1: {
      file: 'CK1 - Anh 9.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_9/Cuoi_Ky_1/CK1 - Anh 9.docx',
      topics: 'Unit 1 đến Unit 6 (Remembering the past, Wonders of Viet Nam, English in the world)',
      score: 'Đề viết 8.0 điểm (36 câu TNKQ + Viết) + Bài thi Nói (Speaking) 2.0 điểm = Tổng 10.0 điểm.',
      speaking: 'Có Speaking 2.0đ: Photo Talk + Compare & Choose kèm Examiner Script 4 cột.',
      isSpeaking: true,
      pills: ['Past continuous vs Past simple', 'Wish + Past simple', 'Impersonal passive (It is said that...)', 'Relative clauses'],
    },
    GK2: {
      file: 'GK2 - Anh 9.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_9/Giua_Ky_2/GK2 - Anh 9.docx',
      topics: 'Unit 7: Natural World, Unit 8: Tourism, Unit 9: World Englishes',
      score: '100% Đề kiểm tra Viết (10.0 điểm). 36 câu TNKQ + 1 câu Viết tự luận.',
      speaking: 'Không có phần thi Nói (Giữa kỳ chỉ thi Viết).',
      isSpeaking: false,
      pills: ['Conditional Type 2', 'Relative pronouns (who, which, that, whose)', 'Compound nouns', 'Tourism'],
    },
    CK2: {
      file: 'CK2 - Anh 9.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_9/Cuoi_Ky_2/CK2 - Anh 9.docx',
      topics: 'Unit 7 đến Unit 12 (Space Exploration, Changing Roles in Society, My future career)',
      score: 'Đề viết 8.0 điểm (36 câu TNKQ + Viết) + Bài thi Nói (Speaking) 2.0 điểm = Tổng 10.0 điểm.',
      speaking: 'Có Speaking 2.0đ: Photo Talk + Compare & Choose kèm Examiner Script 4 cột.',
      isSpeaking: true,
      pills: ['Past perfect (had + V3)', 'Defining & Non-defining relative clauses', 'Future passive', 'Careers & Roles'],
    },
    KSCL: {
      file: 'KSCL - Anh 9.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_9/Khao_Sat_Dau_Nam/KSCL - Anh 9.docx',
      topics: 'Khảo sát chất lượng đầu năm / Đánh giá năng lực tổng hợp Tiếng Anh 9',
      score: '100% Đề kiểm tra Viết (10.0 điểm). 36 câu TNKQ + 1 câu Viết tự luận.',
      speaking: 'Không có phần thi Nói.',
      isSpeaking: false,
      pills: ['Tổng hợp ngữ âm & trọng âm', 'Từ vựng lớp 9', 'Mệnh đề quan hệ & câu điều kiện', 'Đọc hiểu & Viết luận'],
    },
    DECUONG: {
      file: 'De_Cuong_On_Tap_Anh_9.docx',
      relPath: '/bo_de_chuan/Tieng_Anh_9/De_Cuong_On_Tap_Anh_9.docx',
      topics: 'Đề cương ôn tập trọng tâm 6 trang (Mục tiêu 6.0 điểm)',
      score: 'Hệ thống Ngữ âm, Bảng từ vựng Unit 1-12, 30 câu trắc nghiệm ngữ pháp, 2 bài đọc mẫu, 10 câu viết lại và 3 đoạn văn mẫu.',
      speaking: 'Tài liệu ôn tập tự học / dạy thêm bám sát đề kiểm tra.',
      isSpeaking: false,
      pills: ['6 Trang chuẩn A4', 'Quy tắc phát âm & trọng âm 3 âm tiết', 'Câu ước Wish & Câu bị động', 'Mẹo tìm keyword', '3 Đoạn văn mẫu'],
    },
  },
};

export const ToolThanhExamView: React.FC<ToolThanhExamViewProps> = ({
  onExamSuccess,
  onOpenActivationModal,
  onSwitchToAiSuite,
}) => {
  const [grade, setGrade] = useState<'6' | '7' | '8' | '9'>('6');
  const [term, setTerm] = useState<'GK1' | 'CK1' | 'GK2' | 'CK2' | 'KSCL' | 'DECUONG'>('GK1');
  const [parentAgency, setParentAgency] = useState<string>('UBND XÃ ĐỒNG YÊN');
  const [schoolName, setSchoolName] = useState<string>('TRƯỜNG THCS ĐỒNG YÊN');
  const [isSavedNotice, setIsSavedNotice] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  useEffect(() => {
    const cfg = getSchoolConfig();
    if (cfg.parentAgency) setParentAgency(cfg.parentAgency);
    if (cfg.schoolName) setSchoolName(cfg.schoolName);
  }, []);

  const handleSaveConfig = () => {
    saveSchoolConfig(parentAgency, schoolName);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  const currentMeta = EXAM_CATALOG[grade]?.[term] || EXAM_CATALOG['6']['GK1'];

  // 1. Tải đề chuẩn có sẵn (Tự động điền Tên Trường & Cơ quan cấp trên của Thầy/Cô)
  const handleDownloadStandard = async () => {
    const trial = consumeTrial();
    if (!trial.allowed) {
      onOpenActivationModal();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await downloadCustomizedStandardDocx({
        relPath: currentMeta.relPath,
        defaultFileName: currentMeta.file,
        parentAgency,
        schoolName,
      });

      // Tự động tải file blob đã cá nhân hóa
      const url = URL.createObjectURL(result.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = result.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 5000);

      onExamSuccess({
        fileName: result.fileName,
        examTitle: `Đề Kiểm Tra Chuẩn Tiếng Anh ${grade} (${term})`,
        fileBlob: result.blob,
      });
    } catch (err: any) {
      alert(`Đã xảy ra lỗi khi tải đề: ${err?.message || 'Lỗi không xác định'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // 2. Tạo đề mới ngẫu nhiên (ĐÚNG Y HỆT 100% ĐỀ MẪU CỦA TRƯỜNG: 4 Section, Ma trận, Đặc tả, Đề 1, Đề 2, Audio, Đáp án)
  const handleGenerateDynamic = async () => {
    const trial = consumeTrial();
    if (!trial.allowed) {
      onOpenActivationModal();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateDynamicExamFromExactTemplate({
        grade,
        term,
        parentAgency,
        schoolName,
      });

      // Tự động tải file blob vừa tạo
      const url = URL.createObjectURL(result.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = result.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 5000);

      onExamSuccess({
        fileName: result.fileName,
        examTitle: `Đề Kiểm Tra Mới Tiếng Anh ${grade} (Mã ${result.code1}-${result.code2})`,
        fileBlob: result.blob,
      });
    } catch (err: any) {
      alert(`Đã xảy ra lỗi khi tạo đề: ${err?.message || 'Lỗi không xác định'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner phân định 2 chế độ: Đề chuẩn gốc vs Đề AI kho từ vựng vô tận */}
      <div className="p-4 bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 text-white rounded-2xl shadow-md border border-blue-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/40 border border-blue-400/40 flex items-center justify-center shrink-0 mt-1 sm:mt-0">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-white">HAI CHẾ ĐỘ TẠO ĐỀ CHUYÊN NGHIỆP:</span>
            </div>
            <p className="text-xs text-blue-200 mt-0.5 leading-relaxed">
              • <strong>Tại đây (Tab 1):</strong> Tải hoặc sinh mã đề mới từ <strong>20 bộ đề mẫu chuẩn 53KB</strong> của trường (đầy đủ ma trận, đặc tả, bảng điểm chuẩn).<br />
              • <strong>Tạo đề với kho từ vựng vô tận (Tab 2):</strong> Tự do chọn các Unit (1 - 12) để AI tự động sinh hàng ngàn câu hỏi, từ vựng, bài đọc mới toanh không trùng lặp!
            </p>
          </div>
        </div>
        {onSwitchToAiSuite && (
          <button
            type="button"
            onClick={onSwitchToAiSuite}
            className="px-3.5 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 shrink-0 transition"
          >
            <span>Sang Tạo Đề AI (48 Units)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Grid 2 Cột: Cột Trái Bộ Điều Khiển - Cột Phải Bản Đặc Tả Kỹ Thuật */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CỘT TRÁI (7 CỘT) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Card 1: Cấu hình thông tin trường học */}
          <div className="p-5 bg-white border border-slate-200/90 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <School className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
                  Thông Tin Đơn Vị & Trường Học (Tự Động Lưu Lại)
                </span>
              </div>
              <button
                type="button"
                onClick={handleSaveConfig}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 shadow-sm"
              >
                {isSavedNotice ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> : <Save className="w-3.5 h-3.5" />}
                {isSavedNotice ? 'Đã lưu' : 'Lưu'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div>
                <label className="block mb-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  CƠ QUAN CẤP TRÊN (UBND / PHÒNG GD&ĐT):
                </label>
                <input
                  type="text"
                  value={parentAgency}
                  onChange={(e) => setParentAgency(e.target.value)}
                  onBlur={handleSaveConfig}
                  placeholder="Ví dụ: UBND XÃ ĐỒNG YÊN"
                  className="w-full px-3.5 py-2 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block mb-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  TÊN TRƯỜNG HỌC CỦA THẦY/CÔ:
                </label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  onBlur={handleSaveConfig}
                  placeholder="Ví dụ: TRƯỜNG THCS ĐỒNG YÊN"
                  className="w-full px-3.5 py-2 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Chọn Khối lớp & Kỳ kiểm tra */}
          <div className="p-5 bg-white border border-slate-200/90 rounded-2xl shadow-sm space-y-5">
            <div>
              <label className="block mb-2.5 text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>1. Chọn Khối lớp THCS:</span>
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {(['6', '7', '8', '9'] as const).map((g) => {
                  const isSelected = grade === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGrade(g)}
                      className={`p-3 text-center transition-all rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span className={`text-2xl font-black ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                        {g}
                      </span>
                      <span className={`text-[11px] font-extrabold uppercase mt-0.5 ${isSelected ? 'text-blue-600' : 'text-slate-500'}`}>
                        Lớp {g}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block mb-2.5 text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>2. Chọn Kỳ kiểm tra / Tài liệu:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'GK1', name: 'Giữa Học kỳ I', tag: '10.0đ Viết', desc: 'Units 1 - 3. 100% Đề kiểm tra Viết trên giấy 10.0đ, không thi Nói.' },
                  { id: 'CK1', name: 'Cuối Học kỳ I', tag: '8.0đ + 2.0đ Nói', desc: 'Units 1 - 6. Đề viết 8.0đ + Bài thi Nói Speaking 2.0đ (Script 4 cột).' },
                  { id: 'GK2', name: 'Giữa Học kỳ II', tag: '10.0đ Viết', desc: 'Units 7 - 9. 100% Đề kiểm tra Viết trên giấy 10.0đ, không thi Nói.' },
                  { id: 'CK2', name: 'Cuối Học kỳ II', tag: '8.0đ + 2.0đ Nói', desc: 'Units 7 - 12. Đề viết 8.0đ + Bài thi Nói Speaking 2.0đ (Script 4 cột).' },
                  { id: 'KSCL', name: 'Khảo sát đầu năm', tag: 'Tổng hợp 10đ', desc: 'Khảo sát chất lượng đầu năm học / Đánh giá năng lực tổng hợp.' },
                  { id: 'DECUONG', name: 'Đề Cương Ôn Tập', tag: '6 Trang ~ 6.0đ', desc: 'Bộ tài liệu ôn tập trọng tâm 6 trang bám sát ma trận đạt 6.0+ điểm.' },
                ].map((item) => {
                  const isSelected = term === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setTerm(item.id as any)}
                      className={`p-3.5 transition-all rounded-xl border-2 cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-black ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                          {item.name}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-extrabold bg-blue-100 text-blue-800 rounded-md">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-[11.5px] text-slate-500 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 space-y-2.5">
              <button
                type="button"
                onClick={handleGenerateDynamic}
                disabled={isGenerating}
                className="flex items-center justify-center w-full gap-2 py-3.5 text-sm font-black text-white transition-all shadow-md bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 rounded-xl hover:from-teal-700 hover:to-emerald-800 active:scale-98 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>
                  {isGenerating
                    ? 'ĐANG BỐC CÂU HỎI & SINH FILE WORD...'
                    : '⚡ TẠO ĐỀ MỚI NGẪU NHIÊN (LẦN 2, 3... KHÔNG TRÙNG LẶP)'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleDownloadStandard}
                className="flex items-center justify-center w-full gap-2 py-3 text-sm font-extrabold text-blue-700 transition-all bg-blue-50 border-2 border-blue-200 rounded-xl hover:bg-blue-100 active:scale-98"
              >
                <Download className="w-4 h-4 text-blue-600" />
                <span>TẢI BỘ ĐỀ GỐC CHUẨN ĐÃ DUYỆT (.DOCX)</span>
              </button>
            </div>
          </div>

        </div>

        {/* CỘT PHẢI: BẢN ĐẶC TẢ CHI TIẾT & BẢO CHỨNG QUY CHUẨN (5 CỘT) */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="p-5 bg-white border border-slate-200/90 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-sm font-black text-slate-800 uppercase tracking-wide">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>BẢN ĐẶC TẢ CHI TIẾT & QUY CHUẨN</span>
            </div>

            {/* File Word xuất bản */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Tên File Word Xuất Bản:
              </div>
              <div className="text-base font-black text-blue-700 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{currentMeta.file}</span>
              </div>
            </div>

            {/* Phạm vi bài học */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Phạm Vi Bài Học (Units):
              </div>
              <div className="text-xs font-bold text-slate-800 mb-2">
                {currentMeta.topics}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentMeta.pills.map((pill, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 rounded-md">
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* Cấu trúc đề & thang điểm */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Cấu Trúc Đề & Thang Điểm:
              </div>
              <div className="text-xs font-bold text-slate-800">
                {currentMeta.score}
              </div>
            </div>

            {/* Phần thi nói Speaking */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                {currentMeta.isSpeaking ? <Mic className="w-3.5 h-3.5 text-emerald-600" /> : <MicOff className="w-3.5 h-3.5 text-rose-500" />}
                <span>Phần Thi Nói (Speaking Test):</span>
              </div>
              <div className={`text-xs font-bold ${currentMeta.isSpeaking ? 'text-emerald-800' : 'text-slate-600'}`}>
                {currentMeta.speaking}
              </div>
            </div>

            {/* Bảo chứng quy chuẩn khảo thí */}
            <div className="p-3.5 bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200 rounded-xl">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Bảo Chứng Quy Chuẩn Khảo Thí:</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  <span>Times New Roman 13pt</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  <span>Bảng Auto fit window</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  <span>02 Mã đề tương đương</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  <span>Audio Scripts chuẩn SGK</span>
                </div>
                <div className="flex items-center gap-1 col-span-2 text-teal-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                  <span>Chuẩn Công văn 7991/BGDĐT (2026 - 2027)</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
