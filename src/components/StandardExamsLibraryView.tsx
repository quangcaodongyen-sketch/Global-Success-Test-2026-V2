import React, { useState } from 'react';
import {
  Download,
  FileText,
  BookOpen,
  CheckCircle2,
  Search,
  Layers,
  Award,
  Mic,
  MicOff,
  ShieldCheck,
} from 'lucide-react';
import { consumeTrial, getSchoolConfig } from '../utils/licenseManager';
import { downloadCustomizedStandardDocx } from '../utils/exactExamTemplateEngine';

interface StandardExamsLibraryViewProps {
  onExamSuccess: (info: {
    fileName: string;
    examTitle: string;
    downloadUrl?: string;
  }) => void;
  onOpenActivationModal: () => void;
}

interface LibraryItem {
  id: string;
  grade: '6' | '7' | '8' | '9';
  termName: string;
  fileName: string;
  relPath: string;
  units: string;
  scoreType: string;
  hasSpeaking: boolean;
  type: 'EXAM' | 'REVISION';
}

const LIBRARY_DATA: LibraryItem[] = [
  // LỚP 6
  { id: '6_GK1', grade: '6', termName: 'Giữa Học Kỳ I', fileName: 'GK1 - Anh 6.docx', relPath: '/bo_de_chuan/Tieng_Anh_6/Giua_Ky_1/GK1 - Anh 6.docx', units: 'Unit 1, 2, 3 (My New School, My House, My Friends)', scoreType: '10.0đ Viết (36 câu TNKQ + 1 câu tự luận)', hasSpeaking: false, type: 'EXAM' },
  { id: '6_CK1', grade: '6', termName: 'Cuối Học Kỳ I', fileName: 'CK1 - Anh 6.docx', relPath: '/bo_de_chuan/Tieng_Anh_6/Cuoi_Ky_1/CK1 - Anh 6.docx', units: 'Unit 1 đến 6 (Tet, Natural Wonders, Neighbourhood)', scoreType: '8.0đ Viết + 2.0đ Speaking (Script 4 cột)', hasSpeaking: true, type: 'EXAM' },
  { id: '6_GK2', grade: '6', termName: 'Giữa Học Kỳ II', fileName: 'GK2 - Anh 6.docx', relPath: '/bo_de_chuan/Tieng_Anh_6/Giua_Ky_2/GK2 - Anh 6.docx', units: 'Unit 7, 8, 9 (Television, Sports, Cities of the World)', scoreType: '10.0đ Viết (36 câu TNKQ + 1 câu tự luận)', hasSpeaking: false, type: 'EXAM' },
  { id: '6_CK2', grade: '6', termName: 'Cuối Học Kỳ II', fileName: 'CK2 - Anh 6.docx', relPath: '/bo_de_chuan/Tieng_Anh_6/Cuoi_Ky_2/CK2 - Anh 6.docx', units: 'Unit 7 đến 12 (Future Houses, 3Rs Environment, Robots)', scoreType: '8.0đ Viết + 2.0đ Speaking (Script 4 cột)', hasSpeaking: true, type: 'EXAM' },
  { id: '6_KSCL', grade: '6', termName: 'Khảo Sát Đầu Năm', fileName: 'KSCL - Anh 6.docx', relPath: '/bo_de_chuan/Tieng_Anh_6/Khao_Sat_Dau_Nam/KSCL - Anh 6.docx', units: 'Đánh giá năng lực tổng hợp Tiếng Anh 6', scoreType: '10.0đ Viết (36 câu TNKQ + 1 câu tự luận)', hasSpeaking: false, type: 'EXAM' },
  { id: '6_DECUONG', grade: '6', termName: 'Đề Cương Ôn Tập 6 Trang', fileName: 'De_Cuong_On_Tap_Anh_6.docx', relPath: '/bo_de_chuan/Tieng_Anh_6/De_Cuong_On_Tap_Anh_6.docx', units: 'Trọng tâm Ngữ âm, Từ vựng, 30 câu ngữ pháp, 3 bài văn mẫu', scoreType: 'Tài liệu ôn tập mục tiêu 6.0+ điểm', hasSpeaking: false, type: 'REVISION' },

  // LỚP 7
  { id: '7_GK1', grade: '7', termName: 'Giữa Học Kỳ I', fileName: 'GK1 - Anh 7.docx', relPath: '/bo_de_chuan/Tieng_Anh_7/Giua_Ky_1/GK1 - Anh 7.docx', units: 'Unit 1, 2, 3 (Hobbies, Healthy Living, Community Service)', scoreType: '10.0đ Viết (36 câu TNKQ + 1 câu tự luận)', hasSpeaking: false, type: 'EXAM' },
  { id: '7_CK1', grade: '7', termName: 'Cuối Học Kỳ I', fileName: 'CK1 - Anh 7.docx', relPath: '/bo_de_chuan/Tieng_Anh_7/Cuoi_Ky_1/CK1 - Anh 7.docx', units: 'Unit 1 đến 6 (Music & Arts, Food & Drink, School)', scoreType: '8.0đ Viết + 2.0đ Speaking (Script 4 cột)', hasSpeaking: true, type: 'EXAM' },
  { id: '7_GK2', grade: '7', termName: 'Giữa Học Kỳ II', fileName: 'GK2 - Anh 7.docx', relPath: '/bo_de_chuan/Tieng_Anh_7/Giua_Ky_2/GK2 - Anh 7.docx', units: 'Unit 7, 8, 9 (Traffic, Films, Festivals)', scoreType: '10.0đ Viết (36 câu TNKQ + 1 câu tự luận)', hasSpeaking: false, type: 'EXAM' },
  { id: '7_CK2', grade: '7', termName: 'Cuối Học Kỳ II', fileName: 'CK2 - Anh 7.docx', relPath: '/bo_de_chuan/Tieng_Anh_7/Cuoi_Ky_2/CK2 - Anh 7.docx', units: 'Unit 7 đến 12 (Energy, Travelling, English-speaking countries)', scoreType: '8.0đ Viết + 2.0đ Speaking (Script 4 cột)', hasSpeaking: true, type: 'EXAM' },
  { id: '7_KSCL', grade: '7', termName: 'Khảo Sát Đầu Năm', fileName: 'KSCL - Anh 7.docx', relPath: '/bo_de_chuan/Tieng_Anh_7/Khao_Sat_Dau_Nam/KSCL - Anh 7.docx', units: 'Đánh giá năng lực tổng hợp Tiếng Anh 7', scoreType: '10.0đ Viết (36 câu TNKQ + 1 câu tự luận)', hasSpeaking: false, type: 'EXAM' },
  { id: '7_DECUONG', grade: '7', termName: 'Đề Cương Ôn Tập 6 Trang', fileName: 'De_Cuong_On_Tap_Anh_7.docx', relPath: '/bo_de_chuan/Tieng_Anh_7/De_Cuong_On_Tap_Anh_7.docx', units: 'Trọng tâm Ngữ âm, Từ vựng, 30 câu ngữ pháp, 3 bài văn mẫu', scoreType: 'Tài liệu ôn tập mục tiêu 6.0+ điểm', hasSpeaking: false, type: 'REVISION' },

  // LỚP 8
  { id: '8_GK1', grade: '8', termName: 'Giữa Học Kỳ I', fileName: 'GK1 - Anh 8.docx', relPath: '/bo_de_chuan/Tieng_Anh_8/Giua_Ky_1/GK1 - Anh 8.docx', units: 'Unit 1, 2, 3 (Leisure Time, Life in Countryside, Teenagers)', scoreType: '10.0đ Viết (36 câu TNKQ + 1 câu tự luận)', hasSpeaking: false, type: 'EXAM' },
  { id: '8_CK1', grade: '8', termName: 'Cuối Học Kỳ I', fileName: 'CK1 - Anh 8.docx', relPath: '/bo_de_chuan/Tieng_Anh_8/Cuoi_Ky_1/CK1 - Anh 8.docx', units: 'Unit 1 đến 6 (Ethnic groups, Customs & Traditions, Lifestyles)', scoreType: '8.0đ Viết + 2.0đ Speaking (Script 4 cột)', hasSpeaking: true, type: 'EXAM' },
  { id: '8_GK2', grade: '8', termName: 'Giữa Học Kỳ II', fileName: 'GK2 - Anh 8.docx', relPath: '/bo_de_chuan/Tieng_Anh_8/Giua_Ky_2/GK2 - Anh 8.docx', units: 'Unit 7, 8, 9 (Environment, Shopping, Natural Disasters)', scoreType: '10.0đ Viết (36 câu TNKQ + 1 câu tự luận)', hasSpeaking: false, type: 'EXAM' },
  { id: '8_CK2', grade: '8', termName: 'Cuối Học Kỳ II', fileName: 'CK2 - Anh 8.docx', relPath: '/bo_de_chuan/Tieng_Anh_8/Cuoi_Ky_2/CK2 - Anh 8.docx', units: 'Unit 7 đến 12 (Communication, Science & Tech, Planets)', scoreType: '8.0đ Viết + 2.0đ Speaking (Script 4 cột)', hasSpeaking: true, type: 'EXAM' },
  { id: '8_KSCL', grade: '8', termName: 'Khảo Sát Đầu Năm', fileName: 'KSCL - Anh 8.docx', relPath: '/bo_de_chuan/Tieng_Anh_8/Khao_Sat_Dau_Nam/KSCL - Anh 8.docx', units: 'Đánh giá năng lực tổng hợp Tiếng Anh 8', scoreType: '10.0đ Viết (36 câu TNKQ + 1 câu tự luận)', hasSpeaking: false, type: 'EXAM' },
  { id: '8_DECUONG', grade: '8', termName: 'Đề Cương Ôn Tập 6 Trang', fileName: 'De_Cuong_On_Tap_Anh_8.docx', relPath: '/bo_de_chuan/Tieng_Anh_8/De_Cuong_On_Tap_Anh_8.docx', units: 'Trọng tâm Ngữ âm, Từ vựng, 30 câu ngữ pháp, 3 bài văn mẫu', scoreType: 'Tài liệu ôn tập mục tiêu 6.0+ điểm', hasSpeaking: false, type: 'REVISION' },

  // LỚP 9
  { id: '9_GK1', grade: '9', termName: 'Giữa Học Kỳ I', fileName: 'GK1 - Anh 9.docx', relPath: '/bo_de_chuan/Tieng_Anh_9/Giua_Ky_1/GK1 - Anh 9.docx', units: 'Unit 1, 2, 3 (Local Community, City Life, Teens Health)', scoreType: '10.0đ Viết (36 câu TNKQ + 1 câu tự luận)', hasSpeaking: false, type: 'EXAM' },
  { id: '9_CK1', grade: '9', termName: 'Cuối Học Kỳ I', fileName: 'CK1 - Anh 9.docx', relPath: '/bo_de_chuan/Tieng_Anh_9/Cuoi_Ky_1/CK1 - Anh 9.docx', units: 'Unit 1 đến 6 (Past memories, Wonders of VN, English in world)', scoreType: '8.0đ Viết + 2.0đ Speaking (Script 4 cột)', hasSpeaking: true, type: 'EXAM' },
  { id: '9_GK2', grade: '9', termName: 'Giữa Học Kỳ II', fileName: 'GK2 - Anh 9.docx', relPath: '/bo_de_chuan/Tieng_Anh_9/Giua_Ky_2/GK2 - Anh 9.docx', units: 'Unit 7, 8, 9 (Natural World, Tourism, World Englishes)', scoreType: '10.0đ Viết (36 câu TNKQ + 1 câu tự luận)', hasSpeaking: false, type: 'EXAM' },
  { id: '9_CK2', grade: '9', termName: 'Cuối Học Kỳ II', fileName: 'CK2 - Anh 9.docx', relPath: '/bo_de_chuan/Tieng_Anh_9/Cuoi_Ky_2/CK2 - Anh 9.docx', units: 'Unit 7 đến 12 (Space Exploration, Society Roles, Careers)', scoreType: '8.0đ Viết + 2.0đ Speaking (Script 4 cột)', hasSpeaking: true, type: 'EXAM' },
  { id: '9_KSCL', grade: '9', termName: 'Khảo Sát Đầu Năm', fileName: 'KSCL - Anh 9.docx', relPath: '/bo_de_chuan/Tieng_Anh_9/Khao_Sat_Dau_Nam/KSCL - Anh 9.docx', units: 'Đánh giá năng lực tổng hợp Tiếng Anh 9', scoreType: '10.0đ Viết (36 câu TNKQ + 1 câu tự luận)', hasSpeaking: false, type: 'EXAM' },
  { id: '9_DECUONG', grade: '9', termName: 'Đề Cương Ôn Tập 6 Trang', fileName: 'De_Cuong_On_Tap_Anh_9.docx', relPath: '/bo_de_chuan/Tieng_Anh_9/De_Cuong_On_Tap_Anh_9.docx', units: 'Trọng tâm Ngữ âm, Từ vựng, 30 câu ngữ pháp, 3 bài văn mẫu', scoreType: 'Tài liệu ôn tập mục tiêu 6.0+ điểm', hasSpeaking: false, type: 'REVISION' },
];

export const StandardExamsLibraryView: React.FC<StandardExamsLibraryViewProps> = ({
  onExamSuccess,
  onOpenActivationModal,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredItems = LIBRARY_DATA.filter((item) => {
    const matchesGrade = selectedGrade === 'ALL' || item.grade === selectedGrade;
    const matchesSearch =
      searchTerm === '' ||
      item.termName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.units.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  const handleDownload = async (item: LibraryItem) => {
    const trial = consumeTrial();
    if (!trial.allowed) {
      onOpenActivationModal();
      return;
    }

    try {
      const cfg = getSchoolConfig();
      const result = await downloadCustomizedStandardDocx({
        relPath: item.relPath,
        defaultFileName: item.fileName,
        parentAgency: cfg.parentAgency,
        schoolName: cfg.schoolName,
      });

      const url = URL.createObjectURL(result.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 5000);

      onExamSuccess({
        fileName: result.fileName,
        examTitle: `Đề Kiểm Tra Tiếng Anh ${item.grade} - ${item.termName}`,
        fileBlob: result.blob,
      });
    } catch {
      // Fallback tải trực tiếp nếu có lỗi đọc zip
      const a = document.createElement('a');
      a.href = item.relPath;
      a.download = item.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      onExamSuccess({
        fileName: item.fileName,
        examTitle: `Đề Kiểm Tra Tiếng Anh ${item.grade} - ${item.termName}`,
        downloadUrl: item.relPath,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner Khu vực Admin */}
      <div className="p-4 bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 text-white rounded-2xl shadow-md border border-purple-500/40 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/40 border border-purple-400/40 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-white">KHO ĐỀ GỐC NỘI BỘ - QUẢN TRỊ VIÊN ADMIN</span>
              <span className="px-2 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded text-[10px] font-bold">
                Bảo Mật Nội Bộ
              </span>
            </div>
            <p className="text-xs text-purple-200 mt-0.5">
              Toàn bộ 20 bộ đề mẫu 53KB và 04 tài liệu đề cương 6 trang gốc của Thầy Đinh Văn Thành. Chỉ tài khoản Admin mới có quyền truy cập và tải trực tiếp.
            </p>
          </div>
        </div>
      </div>

      {/* Top Filter Bar */}
      <div className="p-5 bg-white border border-slate-200/90 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs font-bold text-slate-500 uppercase shrink-0">Khối Lớp:</span>
          {['ALL', '6', '7', '8', '9'].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-3.5 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                selectedGrade === g
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {g === 'ALL' ? 'Tất cả (24 tài liệu)' : `Lớp ${g}`}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm kỳ kiểm tra, bài học..."
            className="w-full pl-9 pr-4 py-2 text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Grid Danh Sách Tài Liệu */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const isRevision = item.type === 'REVISION';
          return (
            <div
              key={item.id}
              className={`p-5 bg-white border rounded-2xl shadow-sm transition-all hover:shadow-md flex flex-col justify-between ${
                isRevision ? 'border-indigo-200 bg-gradient-to-br from-indigo-50/30 to-white' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 text-[11px] font-black bg-blue-100 text-blue-800 rounded-md">
                    TIẾNG ANH {item.grade}
                  </span>
                  {isRevision ? (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-700 rounded-md">
                      ĐỀ CƯƠNG 6 TRANG
                    </span>
                  ) : item.hasSpeaking ? (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-md flex items-center gap-1">
                      <Mic className="w-3 h-3" /> CÓ SPEAKING
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-600 rounded-md">
                      100% VIẾT
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-black text-slate-900 mb-1">
                  {item.termName}
                </h3>

                <div className="text-[11.5px] text-blue-700 font-bold mb-2 break-all flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.fileName}</span>
                </div>

                <p className="text-xs text-slate-600 font-medium line-clamp-2 mb-2">
                  {item.units}
                </p>

                <div className="text-[11px] text-slate-500 font-semibold mb-3">
                  {item.scoreType}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDownload(item)}
                className="w-full py-2.5 text-xs font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>TẢI VỀ FILE WORD (.DOCX)</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
