# 🚀 SKILL: CHUYỂN ĐỔI BẤT KỲ TOOL NÀO THÀNH WEB APP THƯƠNG MẠI CHUẨN HÓA

> **Bản quyền & Tác giả chuẩn mẫu:** Thầy giáo Đinh Văn Thành – Trường THCS Đồng Yên, tỉnh Tuyên Quang (Hotline/Zalo: **0915.213.717**).  
> **Mục tiêu:** Lưu trữ vĩnh viễn kỹ năng và bí quyết công nghệ để từ nay về sau, **chỉ với 1 câu lệnh duy nhất**, AI Agent có thể đọc bất kỳ thư mục Tool (Python, Desktop, Scripts, File mẫu Word/Excel) và tự động xây dựng thành một Web App thương mại chuẩn mực 100%, sẵn sàng đưa lên GitHub & Vercel.

---

## 🎯 1. CÂU LỆNH KÍCH HOẠT DUY NHẤT (PROMPT 1 PHÁT ĂN NGAY)

Thầy Thành chỉ cần gõ 1 câu lệnh như sau trong bất kỳ dự án nào sau này:

```text
"Hãy sử dụng kỹ năng trong skill tool-to-standard-app để biến Tool trong thư mục [Tên_Thư_Mục_Tool] thành Web App chuẩn hóa thương mại đầy đủ tính năng: Quản trị Admin, Dùng thử 5 lượt chống gian lận thiết bị (không khóa IP), Gói VIP 1 năm 200k / 2 năm 300k, Hướng dẫn API Key 6 bước, Kiến trúc Dual-Engine chạy đề mẫu gốc 100% qua JSZip injection và nút tải 1 file Word trọn gói."
```

---

## 🏗️ 2. TÓM TẮT 7 GIAI ĐOẠN CHUẨN HÓA CỦA SKILL

### Giai đoạn 1: Khám nghiệm Tool gốc (Reverse Engineering)
- Quét toàn bộ scripts (.py, .js, .sh), data catalogs, templates (.docx, .xlsx, .pdf).
- Đưa các file tài liệu mẫu gốc nguyên bản vào thư mục `public/bo_de_chuan/` để làm khuôn mẫu bất biến.
- Trích xuất: logic tính điểm, quy tắc trắc nghiệm (3 phương án A, B, C, không có D theo GDPT 2018), ma trận 15 cột và bản đặc tả 7 cột.

### Giai đoạn 2: Exact Template Engine (Bảo chứng đề xuất ra đúng y hệt 1000% đề mẫu)
- **Tuyệt đối không tự viết code tạo lại DOCX rút gọn** vì sẽ làm lệch lề, vỡ bảng và mất chi tiết.
- Sử dụng thư viện `JSZip` nạp trực tiếp file `.docx` mẫu chuẩn gốc 53KB:
  - Thay thế Tên cơ quan và Tên trường bằng XML injection an toàn (escape `&` thành `&amp;`).
  - Khi bấm **"⚡ TẠO ĐỀ MỚI NGẪU NHIÊN"**: Sinh 2 mã đề mới toanh (603-604, 715-716...), cập nhật đồng bộ trong nội dung đề, Footer trang 1, Footer trang 2 và Bảng đáp án song song.
- **Chuẩn hóa bộ xuất file AI (`docxExporter.ts`)**:
  - Xóa bỏ hoàn toàn chữ đỏ (`color: 'FF0000'`).
  - Bảng điểm Marks đủ 4 ô: *Speak (11%), Write (11%), Total (13%), Teacher's remarks (65%)*.
  - Tự luận: Đủ 10 dòng dot leader lines và kết thúc bằng `------The end------` căn giữa.
  - Tích hợp nút: **`[📄 Tải 1 File Word Trọn Gói (.docx)]`** gồm cả 4 phần (Ma trận + Đặc tả + Đề thi + Đáp án).

### Giai đoạn 3: Quản lý Tài khoản & Bảng Điều Khiển Admin Toàn Diện
- **Tài khoản Admin mặc định:** `Admin` / `Admin123@` (bảo mật băm SHA-256 + Salt).
- **Bảo mật tuyệt đối:** Tuyệt đối **KHÔNG để lộ mật khẩu Admin bằng cách gợi ý, placeholder hay nút điền nhanh** trên bất kỳ form hay giao diện công khai nào.
- **Quyền Admin:** Sử dụng vĩnh viễn, xem/tìm kiếm/lọc thành viên, kích hoạt VIP 1 năm / 2 năm, khóa/mở tài khoản, reset mật khẩu, đổi mật khẩu Admin, sao lưu Export/Import JSON.
- **Tài khoản Thành viên:** Đầy đủ thông tin, có nút "Điền mẫu nhanh" (thông tin giáo viên thông thường) để trải nghiệm tức thì tính năng đăng ký.

### Giai đoạn 4: Cơ chế Dùng thử 5 Lượt Chống Gian Lận Thiết Bị
- **Canvas 2D Fingerprint + Screen Resolution + LocalStorage + Cookie**: Nhận diện chuẩn xác từng máy tính/thiết bị.
- **Tuyệt đối KHÔNG khóa IP**: Để nhiều giáo viên trong cùng trường dùng chung Wi-Fi không bị khóa nhầm.
- Mỗi thiết bị chỉ được nhận 5 lượt dùng thử **01 lần duy nhất**. Nếu tạo tài khoản mới trên thiết bị đã hết lượt sẽ bị chặn kèm thông báo quy chuẩn.
- Tự động trừ lượt và thông báo: *"Bạn còn X/5 lượt dùng thử."*

### Giai đoạn 5: Báo giá VIP & Kênh Zalo Kích Hoạt
- **Bảng giá:**
  1. Gói VIP 1 năm: **200.000 VNĐ**
  2. Gói VIP 2 năm: **300.000 VNĐ** *(Tiết kiệm 100.000 VNĐ - Khuyên dùng)*
- **Bảo mật giá:** Ẩn tab pricing công khai, chỉ hiển thị trong popup hết lượt hoặc khi bấm VIP badge.
- **Popup Hết Lượt (`OutOfTrialsModal`):** Thông điệp mẫu trang trọng cảm ơn thầy cô và nút bấm to dẫn thẳng Zalo: `https://zalo.me/0915213717` (**0915.213.717 – Đinh Thành**).

### Giai đoạn 6: Mục riêng "🔑 HƯỚNG DẪN CÀI ĐẶT API KEY"
- Nút nổi bật trên Header mở popup hướng dẫn 6 bước dễ hiểu cho giáo viên không chuyên CNTT.
- Đủ 4 nút bấm: `[🔑 Lấy API Key]`, `[📋 Sao chép hướng dẫn]`, `[💾 Lưu API Key]`, `[🔍 Kiểm tra API Key]`.
- Input che mật khẩu `••••••••` an toàn, lưu localStorage, không lộ lên GitHub.

### Giai đoạn 7: Giao diện Chuẩn Mực, Phân Quyền Kho Đề & Sẵn Sàng Triển Khai
- Giao diện điều hướng thông minh theo phân quyền:
  - **Tab 1:** Tool Tạo Đề Chuẩn Thầy Thành (Tải đề gốc & Tạo đề ngẫu nhiên chuẩn 100%).
  - **Tab 2:** Sinh Đề Bằng AI Nâng Cao (Theo Unit, Ma trận, Prompt tùy biến, xuất 1 file Word trọn gói).
  - **Tab 3 (KHO ĐỀ GỐC CHUẨN):** **ẨN HOÀN TOÀN với người dùng thông thường và khách. CHỈ CÓ TÀI KHOẢN ADMIN mới nhìn thấy và truy cập được** vào 20 bộ đề và 4 đề cương gốc. Có thêm nút mở nhanh trực tiếp ngay trong Admin Dashboard.
- Cấu hình sẵn `vercel.json` SPA routing, deploy Vercel chỉ sau 1 lệnh Git push.

---

## 📁 DANH MỤC FILE SKILL ĐÃ LƯU TRỮ VĨNH VIỄN

| Đường dẫn File | Mô tả |
| :--- | :--- |
| [`.agent/skills/tool-to-standard-app/SKILL.md`](file:///c:/Users/Admin/Desktop/Global%20Success%20Test%202026/.agent/skills/tool-to-standard-app/SKILL.md) | File cấu hình Skill chính trong hệ sinh thái Agent của workspace |
| [`.agents/skills/tool-to-standard-app/SKILL.md`](file:///c:/Users/Admin/Desktop/Global%20Success%20Test%202026/.agents/skills/tool-to-standard-app/SKILL.md) | File cấu hình Skill theo chuẩn Antigravity Customization Root |
| [`SKILL_TOOL_TO_STANDARD_APP.md`](file:///c:/Users/Admin/Desktop/Global%20Success%20Test%202026/SKILL_TOOL_TO_STANDARD_APP.md) | Bản sao tài liệu trực quan tại thư mục gốc để Thầy Thành xem và chia sẻ |
