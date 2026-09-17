# 📜 NHẬT KÝ VÀ LỊCH SỬ LÀM VIỆC TOÀN DIỆN DỰ ÁN
## HỆ THỐNG TẠO ĐỀ KIỂM TRA TIẾNG ANH THCS 2026 - CHUẨN BỘ GIÁO DỤC & ĐÀO TẠO
**Chủ sở hữu bản quyền:** Thầy giáo **Đinh Văn Thành** – Trường THCS Đồng Yên, tỉnh Tuyên Quang  
**Hotline / Zalo hỗ trợ & Kích hoạt:** **0915.213.717**  
**Thời gian hoàn thiện:** Tháng 09/2026  
**Nền tảng công nghệ:** React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons + docx.js + JSZip + Gemini AI (1.5 Flash / 1.5 Pro / 2.0 Flash)

---

## MỤC LỤC
1. [Bối Cảnh & Mục Tiêu Dự Án](#1-bối-cảnh--mục-tiêu-dự-án)
2. [Chi Tiết Các Yêu Cầu & Quá Trình Thực Hiện](#2-chi-tiết-các-yêu-cầu--quá-trình-thực-hiện)
3. [Kiến Trúc Kỹ Thuật Đột Phá](#3-kiến-trúc-kỹ-thuật-đột-phá)
4. [Tài Khoản Quản Trị Admin & Chính Sách Gói Cước VIP](#4-tài-khoản-quản-trị-admin--chính-sách-gói-cước-vip)
5. [Cơ Chế Bảo Vệ Doanh Thu & Chống Gian Lận Thiết Bị](#5-cơ-chế-bảo-vệ-doanh-thu--chống-gian-lận-thiết-bị)
6. [Kỹ Năng Tạo App Chuẩn Hóa Với Tool (Master Skill)](#6-kỹ-năng-tạo-app-chuẩn-hóa-với-tool-master-skill)
7. [Hướng Dẫn Triển Khai GitHub & Vercel](#7-hướng-dẫn-triển-khai-github--vercel)
8. [Danh Mục File Dự Án](#8-danh-mục-file-dự-án)

---

## 1. BỐI CẢNH & MỤC TIÊU DỰ ÁN
- **Xuất phát điểm:** Thầy Đinh Văn Thành sở hữu một thư mục công cụ Python/Desktop có tên *"Tạo đề Tiếng Anh THCS - Using"* chứa các kịch bản sinh đề, ma trận, bảng đặc tả và 20 bộ đề mẫu gốc chất lượng cao theo chương trình GDPT 2018 (Sách Tiếng Anh Global Success 6, 7, 8, 9).
- **Mục tiêu chuyển đổi:** Biến toàn bộ tinh hoa của công cụ desktop trên thành một **Web Application hiện đại, cao cấp, chạy mượt mà trên trình duyệt**, sẵn sàng đưa lên **GitHub** và triển khai tự động lên **Vercel** để giáo viên cả nước có thể dùng thử và mua quyền sử dụng (VIP).
- **Yêu cầu khắt khe:**
  - Định dạng văn bản Word (.docx) xuất ra phải **100% chuẩn mẫu gốc**, văn bản chuẩn hành chính, không màu mè sai quy định (bỏ chữ đỏ), đủ 4 Section (Listening, Language, Reading, Writing), đủ bảng điểm 4 ô theo Thông tư 22, đủ dòng kẻ chấm tự luận, bảng đáp án song song và Audio Scripts.
  - Tích hợp tính năng **Tải 1 File Word Trọn Gói (.docx)** gộp toàn bộ Đề thi + Đề cương + Hướng dẫn chấm + Bảng đặc tả + Ma trận vào 1 file duy nhất để nộp BGH/Tổ chuyên môn.

---

## 2. CHI TIẾT CÁC YÊU CẦU & QUÁ TRÌNH THỰC HIỆN

### Giai đoạn 1: Khảo sát & Kế thừa Thư mục gốc "Tạo đề Tiếng Anh THCS - Using"
- Tiến hành quét và trích xuất dữ liệu từ các tệp:
  - `tao_de_thi.py`, `doc_mau_de.py`, `export_docx.py`.
  - Bộ tài nguyên mẫu gồm 20 đề thi chuẩn (Lớp 6, 7, 8, 9 cho Giữa kì 1, Cuối kì 1, Giữa kì 2, Cuối kì 2) và 4 tài liệu đề cương ôn tập chuẩn của Thầy Thành.
- Di chuyển toàn bộ 24 file `.docx` mẫu gốc này vào thư mục `public/bo_de_chuan/` của Web App để người dùng có thể tải về trực tiếp hoặc ứng dụng nạp template tự động.

### Giai đoạn 2: Xây dựng Hệ thống Quản trị Tài khoản, Dùng thử & Kích hoạt VIP
- **Tài khoản Admin mặc định:**
  - Tên đăng nhập: `Admin`
  - Mật khẩu: `Admin123@`
  - Quyền hạn: Vĩnh viễn, toàn quyền, quản trị thành viên, gia hạn VIP, reset mật khẩu, kích hoạt VIP qua mã máy, xem lịch sử tạo đề, xuất báo cáo tài chính.
- **Chính sách Dùng thử & Giá gói cước VIP:**
  - Người dùng mới đăng ký hoặc chưa đăng nhập được **dùng thử tối đa 5 lượt tạo đề**.
  - Giá bản quyền: **Gói 1 năm: 200.000 VNĐ** | **Gói 2 năm: 300.000 VNĐ**.
  - **Quy tắc bảo mật thương mại:** Ẩn tab bảng giá công khai trên thanh điều hướng chính (chỉ người dùng hết hạn/dùng thử mới thấy modal nâng cấp, hoặc xem trong Profile). Không có gói vĩnh viễn công khai để duy trì dòng tiền gia hạn hàng năm.

### Giai đoạn 3: Khắc phục triệt để lỗi "Đề xuất ra chưa đúng y như đề mẫu"
- **Nguyên nhân cốt lõi phát hiện:** Khi dùng thư viện `docx.js` sinh tài liệu từ số 0 bằng code, các thông số XML đặc thù của Word (như `w:tcBorders`, cell margins chính xác đến từng dxa, tab dot leaders `w:leader="dot"`, phân trang Section) rất khó sao chép 100% như các file mẫu 53KB đã được căn chỉnh tỉ mỉ qua năm tháng của Thầy Thành.
- **Giải pháp Đột phá - Kiến trúc Dual-Engine:**
  1. **Exact Template Engine (`src/utils/exactExamTemplateEngine.ts`):** 
     - Ứng dụng nạp trực tiếp file `.docx` mẫu 53KB gốc tương ứng với Lớp và Kì thi từ thư mục `public/bo_de_chuan/`.
     - Sử dụng thư viện `JSZip` giải nén `word/document.xml`, thay thế chính xác Tên Sở/Phòng GD&ĐT, Tên Trường, Năm học và Mã đề ngẫu nhiên (hoán vị an toàn, escape ký tự XML `&` -> `&amp;`), giữ nguyên 100% layout, viền bảng điểm, dot lines, font chữ và căn lề của Thầy Thành.
  2. **Code Exporter Chuẩn hóa (`src/utils/docxExporter.ts`):**
     - Đã xóa bỏ triệt để toàn bộ màu đỏ (`color: 'FF0000'`) sang chữ đen khảo thí (`#000000`).
     - Tái cấu trúc Header hành chính theo thể thức văn bản: Cột trái (Cơ quan chủ quản & Trường), Cột phải (Tên kì thi, Môn, Thời gian, Mã đề in đậm viền khung).
     - Bảng thông tin học sinh & bảng điểm Marks 4 ô chuẩn Thông tư 22 BGDĐT:
       - Ô 1: Điểm Nghe (Listening)
       - Ô 2: Điểm Đọc - Viết (Reading & Writing)
       - Ô 3: Điểm Nói (Speaking)
       - Ô 4: Điểm Tổng (Total Mark) & Lời nhận xét của giáo viên.
     - Thêm 10 dòng kẻ chấm chấm tự luận (`........................................................................`).
     - Bảng đáp án song song gọn gàng (Cột Câu | Đáp án | Điểm | Giải thích chi tiết).
     - Bổ sung Audio Script (Lời thoại bài nghe) và Speaking Test Guidelines (Phiếu chấm nói giáo viên).
  3. **Tải 1 File Word Trọn Gói:**
     - Tích hợp hàm `generateFullExamPackageDocx()` và `downloadExactPackage()` xuất gộp toàn bộ hồ sơ khảo thí vào 1 file Word duy nhất.

### Giai đoạn 4: Hướng dẫn Cấu hình Google Gemini API Key
- Tạo modal hướng dẫn trực quan 6 bước chi tiết kèm hình ảnh minh họa, link trực tiếp đến Google AI Studio (`https://aistudio.google.com/`), giải thích cụ thể cách lấy Key Miễn phí 100% và lưu trữ an toàn trong `localStorage` của trình duyệt người dùng.

---

## 3. KIẾN TRÚC KỸ THUẬT ĐỘT PHÁ

```
┌────────────────────────────────────────────────────────────────────────┐
│                        WEB APPLICATION FRONTEND                        │
│                   React 19 + TypeScript + Tailwind CSS                 │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
     ┌──────────────▼─────────────┐   ┌──────────────▼─────────────┐
     │      AI GENERATOR ENGINE   │   │    EXACT TEMPLATE ENGINE   │
     │  (Gemini API: 1.5/2.0)     │   │  (JSZip + Original 53KB)   │
     │  • Sinh đề mới thông minh  │   │  • Nạp 20 bộ đề chuẩn gốc  │
     │  • Đảo câu hỏi & trắc nghiệm│  │  • Giữ nguyên 100% layout  │
     │  • Căn chỉnh 4 kỹ năng     │   │  • Thay Tên Trường & Mã đề │
     └──────────────┬─────────────┘   └──────────────┬─────────────┘
                    │                                │
                    └────────────────┬───────────────┘
                                     │
                    ┌────────────────▼────────────────┐
                    │      DOCX EXPORT COMPOSER       │
                    │  • Đề thi học sinh (Student)   │
                    │  • Hướng dẫn chấm (Answer Key)  │
                    │  • Audio Script bài nghe       │
                    │  • Phiếu chấm kỹ năng Nói       │
                    │  • Ma trận & Bảng đặc tả 2018  │
                    │  ==> XUẤT 1 FILE WORD TRỌN GÓI │
                    └─────────────────────────────────┘
```

---

## 4. TÀI KHOẢN QUẢN TRỊ ADMIN & CHÍNH SÁCH GÓI CƯỚC VIP

### Thông tin đăng nhập Admin:
- **Tên đăng nhập:** `Admin`
- **Mật khẩu:** `Admin123@`
- **Link truy cập:** Nhấp vào nút **"Admin"** ở góc phải thanh Header hoặc trên menu tài khoản khi đã đăng nhập Admin.
- **Bảo mật tuyệt đối:** Hệ thống **KHÔNG hiển thị bất kỳ gợi ý, placeholder hay nút điền nhanh tài khoản Admin** trên toàn bộ giao diện công khai để đảm bảo an toàn tuyệt đối.

### Bảng tính năng theo phân cấp người dùng:

| Tính năng | Khách / Dùng thử | Thành viên Thường | Thành viên VIP | Quản trị viên (Admin) |
| :--- | :---: | :---: | :---: | :---: |
| Số lượt tạo đề | Tối đa 5 lượt | 5 lượt | Không giới hạn | Vĩnh viễn không giới hạn |
| Kho đề gốc 20 bộ & Đề cương | 🔒 **ẨN HOÀN TOÀN** | 🔒 **ẨN HOÀN TOÀN** | 🔒 **ẨN HOÀN TOÀN** | ✅ **TOÀN QUYỀN TRUY CẬP** |
| Tạo đề chuẩn qua Tool Thầy Thành | Tối đa 5 lượt | 5 lượt | ✅ Không giới hạn | ✅ Không giới hạn |
| Xuất 1 file Word trọn gói | Tối đa 5 lần | Tối đa 5 lần | ✅ Không giới hạn | ✅ Không giới hạn |
| Tùy chỉnh Tên trường / Phòng GD | ✅ | ✅ | ✅ | ✅ |
| Sử dụng AI Gemini tạo đề mới | Cần nhập API Key | Cần nhập API Key | Hỗ trợ Key riêng | Full quyền |
| Quản lý thành viên & Kích hoạt VIP | ❌ | ❌ | ❌ | ✅ Toàn quyền |
| Xuất báo cáo doanh thu & Log | ❌ | ❌ | ❌ | ✅ |

### Bảng giá quyền sử dụng VIP:
- **Gói 1 Năm:** `200.000 VNĐ` / tài khoản
- **Gói 2 Năm:** `300.000 VNĐ` / tài khoản
- **Hình thức thanh toán:** Chuyển khoản ngân hàng quét mã QR tự động kèm Cú pháp: `VIP [Tên đăng nhập] [Số điện thoại]` gửi tới Zalo **0915.213.717**.

---

## 5. CƠ CHẾ BẢO VỆ DOANH THU & CHỐNG GIAN LẬN THIẾT BỊ

### Tại sao KHÔNG khóa theo địa chỉ IP?
- Trong môi trường giáo dục Việt Nam, **các giáo viên trong cùng một trường học hoặc tổ bộ môn đều dùng chung một mạng Wi-Fi trường**. Nếu chặn theo IP, khi 1 giáo viên dùng hết 5 lượt thì toàn bộ các giáo viên khác trong trường sẽ bị khóa oan, gây phản tác dụng và mất khách hàng.

### Giải pháp Chống Gian Lận Thiết Bị (Device Fingerprint):
Hệ thống sử dụng tổ hợp định danh phần cứng và môi trường trình duyệt:
1. **Canvas 2D Hash:** Kết xuất đồ họa ẩn trên thẻ `<canvas>` để đo sai số khử răng cưa và driver GPU của từng card màn hình.
2. **AudioContext Fingerprint:** Đo độ trễ xử lý âm thanh phần cứng.
3. **WebAssembly & CPU Cores:** Số lõi vi xử lý (`navigator.hardwareConcurrency`).
4. **Màn hình & Hệ điều hành:** Độ phân giải (`screen.width`, `screen.height`, `screen.colorDepth`) và múi giờ.
5. **Đa tầng lưu trữ (Triple-tier Storage):** Lưu dấu vết tại `localStorage`, `sessionStorage` và `document.cookie` với cờ bảo vệ, tự động phục hồi nếu người dùng xóa một trong các bộ nhớ tạm.

---

## 6. KỸ NĂNG TẠO APP CHUẨN HÓA VỚI TOOL (MASTER SKILL)

Để sau này Thầy Thành hoặc bất kỳ ai có thể **chỉ bằng 1 câu lệnh** biến bất kỳ thư mục Tool/Script nào (Toán, Lý, Hóa, Văn, Quản lý điểm, Trợ lý giáo án...) thành một Web App thương mại chuẩn mực tương tự, hệ thống đã trang bị file Skill chuyên dụng:

- **Vị trí Skill trong hệ thống:**
  1. `.agent/skills/tool-to-standard-app/SKILL.md` (Dành cho Agent/Claude/Antigravity)
  2. `.agents/skills/tool-to-standard-app/SKILL.md` (Dành cho AI Agents đa nền tảng)
  3. `SKILL_TOOL_TO_STANDARD_APP.md` (Tài liệu hướng dẫn trực tiếp tại thư mục gốc)

### CÂU LỆNH MẪU 1 PHÁT ĂN NGAY (Prompt kích hoạt):
> *"Hãy kích hoạt skill `tool-to-standard-app` để quét toàn bộ mã nguồn và dữ liệu trong thư mục [TÊN_THƯ_MỤC_TOOL_CỦA_BẠN]. Hãy biến nó thành một Web App thương mại chuẩn mực mang bản quyền Thầy Đinh Văn Thành (Hotline/Zalo 0915.213.717), bao gồm: Hệ thống Admin (Admin/Admin123@), Dùng thử 5 lượt chống gian lận Canvas Fingerprint, Gói VIP 1 năm 200k / 2 năm 300k, Cơ chế Dual-Engine xuất tài liệu chuẩn 100% theo mẫu gốc, và sẵn sàng deploy Vercel."*

---

## 7. HƯỚNG DẪN TRIỂN KHAI GITHUB & VERCEL

### Cách 1: Đưa lên GitHub
1. Mở terminal tại thư mục dự án:
   ```bash
   git add .
   git commit -m "Hoan thien Web App Tao De Tieng Anh THCS 2026 Chuan Mau 100%"
   git branch -M main
   git remote add origin https://github.com/[TEN_TAI_KHOAN_CUA_BAN]/[TEN_REPO].git
   git push -u origin main
   ```

### Cách 2: Triển khai lên Vercel trong 2 phút
1. Truy cập `https://vercel.com/` và đăng nhập bằng tài khoản GitHub.
2. Chọn **"Add New..."** -> **"Project"**.
3. Chọn kho chứa GitHub của dự án vừa tải lên.
4. Framework Preset: Để mặc định **Vite**.
5. Nhấn **"Deploy"**. Vercel sẽ tự động build và cấp phát tên miền miễn phí (VD: `global-success-test-2026.vercel.app`) có sẵn HTTPS/SSL.

---

## 8. DANH MỤC FILE DỰ ÁN QUAN TRỌNG

- **`src/App.tsx`**: Điều phối giao diện trung tâm, router, modal VIP, modal API Key, thanh công cụ xuất đề trọn gói.
- **`src/utils/exactExamTemplateEngine.ts`**: Nạp và biến đổi 20 bộ đề chuẩn gốc 53KB bằng JSZip XML injection, đảm bảo 100% mẫu gốc.
- **`src/utils/docxExporter.ts`**: Bộ xuất file Word chuẩn hóa khảo thí BGDĐT (bảng điểm 4 ô, dot lines, audio scripts, không chữ đỏ).
- **`src/utils/deviceFingerprint.ts`**: Chống gian lận dùng thử 5 lượt bằng Canvas GPU & Audio fingerprint, không chặn IP.
- **`src/components/AdminDashboard.tsx`**: Trung tâm quản trị thành viên, gia hạn VIP, reset mật khẩu và phân tích sử dụng.
- **`src/components/ApiKeyModal.tsx`**: Hướng dẫn lấy và cài đặt Google Gemini API Key 6 bước chi tiết.
- **`public/bo_de_chuan/`**: Thư mục chứa 24 file `.docx` mẫu gốc lớp 6, 7, 8, 9 của Thầy Thành.
- **`SKILL_TOOL_TO_STANDARD_APP.md`**: Bản đặc tả Skill Master để nhân bản bất kỳ Tool nào thành Web App.
- **`LICH_SU_LAM_VIEC_TOAN_DIEN.md`**: Tài liệu này.

---
*Bản quyền tài liệu và hệ thống thuộc về Thầy Đinh Văn Thành – THCS Đồng Yên. Mọi quyền được bảo lưu.*
