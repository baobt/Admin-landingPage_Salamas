import {
  
  Search, TrendingUp, MessageSquare, CreditCard, BarChart3, Package,
  Languages, Globe2, ShieldCheck, Truck, UserPlus, ShoppingBag, CheckCircle2,
  Store, Globe, ShoppingCart,
} from 'lucide-react';
import petFoodImage from '../../../images/thucnadongvat.jpg';
import interiorImage from '../../../images/noithat (1).jpg';
import cosmeticImage from '../../../images/comestic.jpg';
import cosmeticHoverVideo from '../../../images/dreamina-2026-04-07-7731-Các sản phẩm mỹ phẩm trang nhã nhẹ nhàng....mp4';
import petFoodHoverVideo from '../../../images/Agent_video_Pippit_20260407175515.mp4';
import agricultureHoverVideo from '../../../images/Agent_video_Pippit_20260407182807.mp4';
import fashionHoverVideo from '../../../images/Agent_video_Pippit_20260407182005.mp4';
import marketingPoster from '../../../images/marketing_poster.jpg';
import khacbiet2SectionVideo from '../../../images/Agent_video_marketing.mp4';

const defaultSellerFaqsVi = [
  { question: 'Salamass là gì?', answer: 'Salamass là nền tảng thương mại điện tử B2B và B2C kết nối giao thương toàn cầu, đặc biệt tập trung vào thị trường Halal và khu vực Đông Nam Á (bao gồm Cambodia). Chúng tôi cung cấp giải pháp toàn diện từ tìm kiếm nguồn hàng, thanh toán đa tiền tệ đến vận chuyển quốc tế.' },
  { question: 'Ai có thể đăng ký bán hàng trên Salamass?', answer: 'Các doanh nghiệp, nhà sản xuất, nhà phân phối, và cá nhân kinh doanh có nguồn hàng chất lượng, hợp pháp đều có thể đăng ký trở thành nhà bán hàng trên Salamass.' },
  { question: 'Tôi cần chuẩn bị gì để đăng ký bán hàng?', answer: 'Bạn cần chuẩn bị: Giấy phép kinh doanh (đối với doanh nghiệp) hoặc CCCD/Passport (đối với cá nhân), thông tin tài khoản ngân hàng hợp lệ để nhận thanh toán, và hình ảnh/thông tin chi tiết về sản phẩm.' },
  { question: 'Phí bán hàng trên Salamass là bao nhiêu?', answer: 'Việc đăng ký và mở gian hàng trên Salamass là hoàn toàn miễn phí. Chúng tôi chỉ thu phí hoa hồng (tỷ lệ cạnh tranh tùy theo ngành hàng) khi bạn có đơn hàng giao dịch thành công.' },
  { question: 'Salamass hỗ trợ vận chuyển như thế nào?', answer: 'Salamass tích hợp sẵn mạng lưới các đối tác logistics uy tín trong nước và quốc tế. Hệ thống sẽ tự động tính phí vận chuyển, điều phối lấy hàng tận nơi và cung cấp mã theo dõi hành trình đơn hàng theo thời gian thực.' },
  { question: 'Tôi có thể tự vận chuyển không?', answer: "Có, Salamass cung cấp tùy chọn 'Tự vận chuyển' dành cho các nhà bán hàng đã có sẵn đội ngũ giao hàng hoặc đối tác vận chuyển riêng, giúp bạn chủ động hơn trong quá trình giao nhận." },
  { question: 'Salamass có hỗ trợ marketing không?', answer: 'Có. Chúng tôi thường xuyên tổ chức các chương trình khuyến mãi lớn, Flash Sale, và cung cấp các công cụ quảng cáo nội sàn giúp nhà bán hàng tiếp cận hàng triệu khách hàng tiềm năng.' },
  { question: 'Làm sao để sản phẩm của tôi hiển thị tốt hơn?', answer: 'Để tối ưu hiển thị, bạn nên: Sử dụng hình ảnh sản phẩm chất lượng cao, viết mô tả chi tiết chuẩn SEO, thiết lập giá cạnh tranh, tham gia các chiến dịch khuyến mãi của sàn và duy trì tỷ lệ phản hồi khách hàng nhanh chóng.' },
  { question: 'Salamass thanh toán cho nhà bán như thế nào?', answer: "Doanh thu từ các đơn hàng hoàn tất sẽ được cộng vào 'Ví người bán' của bạn trên hệ thống. Bạn có thể yêu cầu rút tiền về tài khoản ngân hàng đã liên kết bất cứ lúc nào với thời gian xử lý nhanh chóng." },
  { question: 'Tôi có thể bán sản phẩm quốc tế không?', answer: 'Hoàn toàn được. Salamass được thiết kế cho giao thương xuyên biên giới, hỗ trợ thanh toán đa tiền tệ và vận chuyển quốc tế, giúp bạn dễ dàng xuất khẩu sản phẩm ra thị trường toàn cầu.' },
  { question: 'Nếu tôi không rành công nghệ thì sao?', answer: 'Giao diện quản lý gian hàng (Seller Center) của Salamass được thiết kế vô cùng trực quan và thân thiện. Ngoài ra, chúng tôi có đội ngũ hỗ trợ đối tác luôn sẵn sàng hướng dẫn 1-1 cho người mới bắt đầu.' },
  { question: 'Salamass có đảm bảo uy tín cho nhà bán không?', answer: 'Hệ thống đánh giá minh bạch của chúng tôi giúp xây dựng uy tín cho các nhà bán hàng chất lượng. Đồng thời, chính sách bảo vệ người bán của Salamass sẽ hỗ trợ bạn trong các trường hợp khiếu nại không hợp lý từ người mua.' },
  { question: 'Tôi có thể quản lý gian hàng bằng điện thoại không?', answer: 'Có, bạn có thể quản lý mọi hoạt động kinh doanh từ đăng sản phẩm, xử lý đơn hàng đến chat với khách hàng ngay trên ứng dụng di động Salamass Seller hoặc qua trình duyệt web trên điện thoại.' },
  { question: 'Mất bao lâu để bắt đầu bán hàng?', answer: 'Quá trình đăng ký chỉ mất khoảng 5-10 phút. Sau khi bạn gửi đầy đủ hồ sơ, đội ngũ Salamass sẽ kiểm duyệt trong vòng 24 giờ làm việc. Ngay khi được duyệt, bạn có thể đăng sản phẩm và bắt đầu bán hàng.' },
  { question: 'Tôi có thể liên hệ hỗ trợ ở đâu?', answer: 'Bạn có thể liên hệ với đội ngũ hỗ trợ nhà bán hàng qua Hotline, Email hỗ trợ chuyên trách, hoặc sử dụng tính năng Chat trực tiếp với nhân viên CSKH ngay bên trong hệ thống quản lý gian hàng.' },
];

const defaultSellerFaqsEn = [
  { question: 'What is Salamass?', answer: 'Salamass is a B2B and B2C e-commerce platform connecting global trade, with a special focus on Halal markets and Southeast Asia (including Cambodia).' },
  { question: 'Who can register to sell on Salamass?', answer: 'Businesses, manufacturers, distributors, and legal individual merchants can all register as sellers on Salamass.' },
  { question: 'What do I need to prepare to register as a seller?', answer: 'Prepare business license (for companies) or ID/Passport (for individuals), valid bank account details, and product images/information.' },
  { question: 'How much are selling fees on Salamass?', answer: 'Opening a store is free. We only charge commission (competitive rate by category) when you successfully complete orders.' },
  { question: 'How does Salamass support shipping?', answer: 'Salamass integrates trusted domestic and international logistics partners for shipping calculation, pickup coordination, and real-time tracking.' },
  { question: 'Can I use my own shipping?', answer: 'Yes. Salamass provides a "Self-shipping" option for sellers who already have their own delivery team or logistics partner.' },
  { question: 'Does Salamass support marketing?', answer: 'Yes. We run large promotions and provide in-platform advertising tools to help sellers reach more potential customers.' },
  { question: 'How can my products get better visibility?', answer: 'Use high-quality images, detailed SEO descriptions, competitive pricing, join campaigns, and maintain fast customer response rates.' },
  { question: 'How does Salamass pay sellers?', answer: 'Revenue from completed orders is added to your Seller Wallet. You can withdraw to your linked bank account with fast processing.' },
  { question: 'Can I sell internationally?', answer: 'Absolutely. Salamass is built for cross-border trade, supporting multi-currency payments and international shipping.' },
  { question: 'What if I am not good with technology?', answer: 'The Seller Center is designed to be simple and user-friendly. Our support team is available for one-on-one guidance.' },
  { question: 'Does Salamass protect seller reputation?', answer: 'Our transparent review system helps build trust, and seller-protection policies support you in unreasonable dispute cases.' },
  { question: 'Can I manage my store on mobile?', answer: 'Yes. You can manage listings, orders, and customer chat via mobile browser or Salamass Seller mobile app.' },
  { question: 'How long does it take to start selling?', answer: 'Registration takes about 5-10 minutes. After submitting documents, review is typically completed within 24 business hours.' },
  { question: 'Where can I contact support?', answer: 'You can contact seller support via hotline, support email, or live chat inside the management system.' },
];

const defaultSellerFaqsKm = [
  { question: 'Salamass ជាអ្វី?', answer: 'Salamass គឺជាវេទិកាពាបនិជ្ជកម្មអេឡិចត្រូនិក B2B និង B2C ដែលភ្ជាប់ពាណិជ្ជកម្មសកល ដោយផ្តោតលើទីផ្សារព Halal និងតំបន់អាស៊ីអាគ្នេយ៍ (រួមទាំងកម្ពុជា)។' },
  { question: 'នរណាអាចចុះឈ្មោះលក់លើ Salamass?', answer: 'អាជីវកម្ម អ្នកផលិត អ្នកចែកចាយ និងបុគ្គលដែលធ្វើអាជីវកម្មស្របច្បាប់ អាចចុះឈ្មោះជាអ្នកលក់បាន។' },
  { question: 'ត្រូវរៀបចំអ្វីខ្លះសម្រាប់ចុះឈ្មោះលក់?', answer: 'ត្រូវមានអាជ្ញាប័ណ្ណអាជីវកម្ម (សម្រាប់ក្រុមហ៊ុន) ឬអត្តសញ្ញាណប័ណ្ណ/លិខិតឆ្លងដែន (សម្រាប់បុគ្គល), ព័ត៌មានគណនីធនាគារ និងព័ត៌មាន/រូបភាពផលិតផល។' },
  { question: 'ថ្លៃលក់លើ Salamass ប៉ុន្មាន?', answer: 'ការចុះឈ្មោះ និងបើកហាងគឺឥតគិតថ្លៃ។ យើងគិតតែកម្រៃជើងសារ នៅពេលមានការបញ្ជាទិញជោគជ័យប៉ុណ្ណោះ។' },
  { question: 'Salamass គាំទ្រការដឹកជញ្ជូនដូចម្តេច?', answer: 'Salamass ភ្ជាប់ដៃគូដឹកជញ្ជូនដែលទុកចិត្តបានទាំងក្នុងស្រុក និងអន្តរជាតិ មានគណនាថ្លៃ ដឹកយកទំនិញ និងតាមដានពេលពិត។' },
  { question: 'ខ្ញុំអាចដឹកជញ្ជូនដោយខ្លួនឯងបានទេ?', answer: 'បាន។ Salamass មានជម្រើស "ដឹកជញ្ជូនដោយខ្លួនឯង" សម្រាប់អ្នកលក់ដែលមានក្រុមដឹកជញ្ជូនរួចហើយ។' },
  { question: 'Salamass មានជំនួយផ្នែកទីផ្សារទេ?', answer: 'មាន។ យើងមានកម្មវិធីផ្សព្វផ្សាយធំៗ និងឧបករណ៍ផ្សព្វផ្សាយក្នុងវេទិកា ដើម្បីជួយអ្នកលក់ឈានដល់អតិថិជនកាន់តែច្រើន។' },
  { question: 'ធ្វើដូចម្តេចឱ្យផលិតផលបង្ហាញល្អជាងមុន?', answer: 'ប្រើរូបភាពគុយភាពខ្ពស់ សរសេរពិពណ៌នាច្បាស់លាស់ តម្លៃប្រកួតប្រជែង ចូលរួមកម្មវិធីផ្សព្វផ្សាយ និងឆ្លើយតបអតិថិជនឱ្យបានរហ័ស។' },
  { question: 'Salamass បង់ប្រាក់ឱ្យអ្នកលក់ដូចម្តេច?', answer: 'ប្រាក់ចំណូលពីការបញ្ជាទិញដែលបានបញ្ចប់ នឹងបញ្ចូលទៅក្នុង Seller Wallet របស់អ្នក ហើយអាចដកទៅគណនីធនាគារដែលបានភ្ជាប់។' },
  { question: 'ខ្ញុំអាចលក់ទៅទីផ្សារអន្តរជាតិបានទេ?', answer: 'បាន។ Salamass ត្រូវបានរចនាសម្រាប់ពាណិជ្ជកម្មឆ្លងដែន ដោយគាំទ្រការទូទាត់ច្រើនរូបិយប័ណ្ណ និងដឹកជញ្ជូនអន្តរជាតិ។' },
  { question: 'បើខ្ញុំមិនសូវចេះបច្ចេកវិទ្យា តើធ្វើដូចម្តេច?', answer: 'ផ្ទាំងគ្រប់គ្រងអ្នកលក់ត្រូវបានរចនាឱ្យងាយប្រើ ហើយក្រុមគាំទ្ររបស់យើងអាចណែនាំមួយទល់មួយ។' },
  { question: 'Salamass ធានាកេរ្តិ៍ឈ្មោះអ្នកលក់ទេ?', answer: 'ប្រព័ន្ធវាយតម្លៃមានភាពតម្លាភាព និងមានគោលនយោបាយការពារអ្នកលក់ក្នុងករណីបណ្តឹងមិនសមហេតុផល។' },
  { question: 'ខ្ញុំអាចគ្រប់គ្រងហាងតាមទូរស័ព្ទបានទេ?', answer: 'បាន។ អ្នកអាចគ្រប់គ្រងផលិតផល ការបញ្ជាទិញ និងការជជែកជាមួយអតិថិជនតាមទូរស័ព្ទបាន។' },
  { question: 'ត្រូវចំណាយពេលប៉ុន្មានដើម្បីចាប់ផ្តើមលក់?', answer: 'ការចុះឈ្មោះប្រហែល 5-10 នាទី។ បន្ទាប់ពីដាក់ឯកសារ ក្រុមការងារត្រួតពិនិត្យក្នុងរយៈពេលប្រហែល 24 ម៉ោងធ្វើការ។' },
  { question: 'ខ្ញុំអាចទាក់ទងជំនួយតាមណា?', answer: 'អ្នកអាចទាក់ទងតាម Hotline, Email ឬ Live Chat នៅក្នុងប្រព័ន្ធគ្រប់គ្រងអ្នកលក់។' },
];

const contentByLanguage = {
  vi: {
    stats: [
      { value: ' Mở rộng sang Campuchia', label: 'Tiếp cận hàng triệu khách hàng mới với chi phí thấp' },
      { value: ' Bán hàng đa kênh', label: 'TMDT, Fanpage, TikTok trong một hệ thống' },
      { value: ' Vận hành & giao hàng nhanh', label: 'Kho tại Campuchia – giao hàng chỉ trong vài giờ' },
    ],
    demoImages: {
    product: 'https://your-default-product-image.jpg',
    dashboard: 'https://your-default-dashboard.jpg',
    chat: 'https://your-default-chat.jpg',
  },
    features: {
      buyer: [
        { icon: Search, title: 'Tìm kiếm AI', description: 'Gợi ý và lọc sản phẩm thông minh.' },
        { icon: TrendingUp, title: 'So sánh giá', description: 'Theo dõi biến động giá theo thời gian.' },
        { icon: MessageSquare, title: 'Chat trực tiếp', description: 'Đàm phán nhanh với nhà cung cấp.' },
        { icon: CreditCard, title: 'Đa tiền tệ', description: 'Hỗ trợ nhiều loại tiền quốc tế.' },
      ],
      seller: [
        { icon: BarChart3, title: 'Quản lý đơn', description: 'Theo dõi trạng thái giao dịch tập trung.' },
        { icon: Package, title: 'Quản lý sản phẩm', description: 'Đăng và tối ưu danh mục dễ dàng.' },
        { icon: ShieldCheck, title: 'Xác minh Halal', description: 'Chuẩn hóa chứng nhận minh bạch.' },
        { icon: Truck, title: 'Logistics tích hợp', description: 'Kết nối đối tác vận chuyển toàn cầu.' },
      ],
      system: [
        { icon: Languages, title: 'Đa ngôn ngữ', description: 'Hỗ trợ Anh - Khmer.' },
        { icon: Globe2, title: 'Thị trường quốc tế', description: 'Kết nối ASEAN, Trung Đông, EU.' },
        { icon: ShieldCheck, title: 'Theo dõi Halal', description: 'Xác minh và theo dõi chứng nhận Halal cho mọi sản phẩm.' },
        { icon: Truck, title: 'Logistics tích hợp', description: 'Kết nối với các đối tác vận chuyển quốc tế uy tín.' },
      ],
    },
    steps: [
{ number: 1, icon: UserPlus, title: 'Đăng ký', description: 'Điền thông tin, tạo tài khoản.' },
      { number: 2, icon: CheckCircle2, title: 'Chọn gói', description: 'Basic, Premium hoặc Enterprise.' },
      { number: 3, icon: Package, title: 'Tải sản phẩm', description: 'Đăng danh sách sản phẩm lên nền tảng.' },
      { number: 4, icon: Store, title: 'Bắt đầu bán', description: 'Bán hàng và tiếp cận khách hàng Campuchia.' },
    ],
    categories: [
      { image: 'https://images.unsplash.com/photo-1542838132-92c53300491e', hoverVideo: agricultureHoverVideo, title: 'Nông sản thực phẩm', description: 'Tươi, an toàn, chất lượng', productCount: '3,156' },
      { image: petFoodImage, hoverVideo: petFoodHoverVideo, title: 'Thức ăn cho thú cưng', description: 'Dinh dưỡng và đa dạng', productCount: '1,184' },
      { image: 'https://images.unsplash.com/photo-1445205170230-053b83016050', hoverVideo: fashionHoverVideo, title: 'Thời trang', description: 'Xu hướng mới, giá tốt', productCount: '2,041' },
      { image: cosmeticImage, hoverVideo: cosmeticHoverVideo, title: 'Mỹ phẩm', description: 'An toàn, uy tín', productCount: '892' },
      { image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f', title: 'Nước hoa', description: 'Hương thơm cao cấp', productCount: '764' },
      { image: interiorImage, title: 'Trang trí nội thất', description: 'Hiện đại, tinh tế', productCount: '1,523' },
    ],
    testimonials: [
      { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nguyen', name: 'Nguyễn Văn An', role: 'Giám đốc', company: 'Cty Xuất khẩu', quote: 'Doanh thu tăng mạnh sau 6 tháng.', rating: 5 },
      { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tran', name: 'Trần Thị Bình', role: 'Chủ doanh nghiệp', company: 'Thực phẩm hữu cơ', quote: 'Tìm được nhà cung cấp uy tín rất nhanh.', rating: 5 },
    ],
    ecosystemNodes: [
      { icon: Store, role: 'Nhà cung cấp', title: 'Sản xuất & Xuất khẩu', desc: 'Doanh nghiệp, xưởng sản xuất có nhu cầu xuất khẩu ra thị trường quốc tế', tone: 'orange' },
      { icon: Globe, role: 'Nền tảng Salamass', title: 'Kết nối & Quản lý', desc: 'Hệ sinh thái TMĐT tích hợp AI, thanh toán đa tiền tệ và logistics', tone: 'teal' },
      { icon: ShoppingCart, role: 'Người mua', title: 'Nhập khẩu & Phân phối', desc: 'Nhà phân phối, đại lý và doanh nghiệp tìm nguồn hàng chất lượng cao', tone: 'orange' },
    ],
    targetMarkets: ['Cambodia'],
    competitiveAdvantages: {
  badge: 'Điểm khác biệt',
  title: 'Salamass khác biệt như thế nào?',
  description: 'Salamass không chỉ là sàn TMĐT. Chúng tôi cung cấp giải pháp bán hàng toàn diện kết hợp 3 trụ cột: nền tảng thương mại điện tử, marketing đa kênh và logistics tích hợp, giúp doanh nghiệp tăng trưởng nhanh tại thị trường Cambodia.',

  image: marketingPoster,           
  video: khacbiet2SectionVideo,     

  imageAlt: 'Giải pháp thương mại điện tử, marketing và logistics tích hợp',
      benefits: [
        { icon: Globe2, title: 'Tập trung thị trường Cambodia', description: 'Ít cạnh tranh hơn Việt Nam, đội ngũ am hiểu văn hóa và thị trường địa phương.' },
        { icon: BarChart3, title: 'Hệ sinh thái tích hợp', description: 'Kết hợp TMĐT + Marketing + Logistics trong một giải pháp đồng bộ, tối ưu chi phí.' },
        { icon: ShieldCheck, title: 'Hỗ trợ từ A-Z', description: 'Không chỉ đăng sản phẩm, Salamass đồng hành từ vận hành, quảng bá đến mở rộng doanh thu.' },
        { icon: CheckCircle2, title: 'Phù hợp mọi quy mô', description: 'Từ hộ kinh doanh nhỏ đến doanh nghiệp lớn đều có lộ trình triển khai phù hợp.' },
      ],
    },
comparisonSection: {
      title: 'So sánh Salamass vs bán hàng truyền thống',
      description: 'Khác biệt rõ ràng giúp seller tăng tốc thâm nhập thị trường Campuchia.',
      buttonText: 'Chuyển đổi ngay hôm nay',
      salamassTitle: 'Với Salamass',
      traditionalTitle: 'Bán hàng truyền thống',
      salamassPoints: [
        'Bán hàng đa kênh (sàn, Fanpage, Tiktok)',
        'Tiếp cận khách hàng Campuchia nhanh hơn',
        'Logistics & kho bãi tích hợp',
        'Hỗ trợ marketing và vận hành A-Z',
      ],
      traditionalPoints: [
        'Bán hàng thủ công, quy trình rời rạc',
        'Tiếp cận thị trường hạn chế',
        'Tự lo hậu cần, chi phí cao',
        'Thiếu hỗ trợ tiếp thị bài bản',
      ],
    },
    servicePricing: {
      badge: 'Bảng giá dịch vụ',
      title: 'Chọn gói phù hợp với nhu cầu của bạn',
      plans: [
        {
          name: 'BASIC',
          description: 'Phù hợp với Seller mới bắt đầu khám phá thị trường Campuchia',
          features: [
            'Đăng sản phẩm trên Salamass',
            'Hỗ trợ cơ bản vận hành gian hàng',
            '05 bài đăng Fanpage/tháng',
            '01 video review Tiktok/tháng',
          ],
          price: '$50',
          period: 'THÁNG',
        },
        {
          name: 'PREMIUM',
          description: 'Phù hợp với Seller muốn tăng trưởng mạnh và mở rộng thị phần',
          features: [
            'Đăng sản phẩm + Ưu tiên hiển thị',
            '10 bài đăng Fanpage/tháng',
            '02 video review Tiktok/tháng',
            'Banner cơ bản trên nền tảng',
            'Tư vấn tối ưu gian hàng',
          ],
          price: '$100',
          period: 'THÁNG',
        },
        {
          name: 'ENTERPRISE',
          description: 'Phù hợp với thương hiệu và nhà bán hàng lớn muốn chinh phục thị trường Campuchia',
          features: [
            'Đăng sản phẩm không giới hạn',
            'Ưu tiên hiển thị & banner nổi bật',
            '20 bài đăng Fanpage/tháng',
            '04 video review Tiktok/tháng',
            'Hỗ trợ xây dựng thương hiệu',
            'Ưu tiên tham gia campaign',
            'Ký gửi hàng tại kho Campuchia',
          ],
          price: '$200',
          period: 'THÁNG',
        },
      ],
    },
    sellerFaqs: defaultSellerFaqsVi,
  },
  en: {
    stats: [
      { value: ' Expand to Cambodia', label: 'Reach millions of new customers with low cost' },
      { value: ' Omnichannel selling', label: 'E-commerce, Fanpage, TikTok in one system' },
      { value: ' Fast operations & delivery', label: 'Warehouse in Cambodia – deliver within hours' },
    ],
    demoImages: {
    product: 'https://your-default-product-image.jpg',
    dashboard: 'https://your-default-dashboard.jpg',
    chat: 'https://your-default-chat.jpg',
  },
    features: {
      buyer: [
        { icon: Search, title: 'AI Search', description: 'Smart product suggestion and filtering.' },
        { icon: TrendingUp, title: 'Price Comparison', description: 'Track price changes over time.' },
        { icon: MessageSquare, title: 'Direct Chat', description: 'Negotiate quickly with suppliers.' },
        { icon: CreditCard, title: 'Multi-currency', description: 'Supports international currencies.' },
      ],
      seller: [
        { icon: BarChart3, title: 'Order Management', description: 'Track transaction status in one place.' },
        { icon: Package, title: 'Product Management', description: 'List and optimize catalog easily.' },
        { icon: ShieldCheck, title: 'Halal Verification', description: 'Standardized transparent certification.' },
        { icon: Truck, title: 'Integrated Logistics', description: 'Connect with global shipping partners.' },
      ],
      system: [
        { icon: Languages, title: 'Multi-language', description: 'English - Khmer support.' },
        { icon: Globe2, title: 'International Markets', description: 'Connect ASEAN, Middle East, EU.' },
        { icon: ShieldCheck, title: 'Halal Tracking', description: 'Verify and track Halal certificates for products.' },
        { icon: Truck, title: 'Integrated Logistics', description: 'Connect with trusted international carriers.' },
      ],
    },
    steps: [
{ number: 1, icon: UserPlus, title: 'Sign up', description: 'Fill in your information and create an account.' },
      { number: 2, icon: CheckCircle2, title: 'Choose a plan', description: 'Basic, Premium, or Enterprise.' },
      { number: 3, icon: Package, title: 'Upload products', description: 'List your products on the platform.' },
      { number: 4, icon: Store, title: 'Start selling', description: 'Sell and reach customers in Cambodia.' },
    ],
    categories: [
      { image: 'https://images.unsplash.com/photo-1542838132-92c53300491e', hoverVideo: agricultureHoverVideo, title: 'Agricultural Food Products', description: 'Fresh, safe, quality', productCount: '3,156' },
      { image: petFoodImage, hoverVideo: petFoodHoverVideo, title: 'Pet Food', description: 'Nutritious and diverse', productCount: '1,184' },
      { image: 'https://images.unsplash.com/photo-1445205170230-053b83016050', hoverVideo: fashionHoverVideo, title: 'Fashion', description: 'Latest trends, great prices', productCount: '2,041' },
      { image: cosmeticImage, hoverVideo: cosmeticHoverVideo, title: 'Cosmetics', description: 'Safe and trusted', productCount: '892' },
      { image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f', title: 'Perfume', description: 'Premium fragrances', productCount: '764' },
      { image: interiorImage, title: 'Interior Decoration', description: 'Modern and elegant', productCount: '1,523' },
    ],
    testimonials: [
      { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nguyen', name: 'Nguyen Van An', role: 'Director', company: 'Export Company', quote: 'Our revenue grew strongly after 6 months.', rating: 5 },
      { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tran', name: 'Tran Thi Binh', role: 'Business Owner', company: 'Organic Foods', quote: 'We quickly found trusted suppliers.', rating: 5 },
    ],
    ecosystemNodes: [
      { icon: Store, role: 'Suppliers', title: 'Manufacturing & Export', desc: 'Companies and manufacturers looking to export internationally', tone: 'orange' },
      { icon: Globe, role: 'Salamass Platform', title: 'Connect & Manage', desc: 'E-commerce ecosystem with AI, multi-currency payments and logistics', tone: 'teal' },
      { icon: ShoppingCart, role: 'Buyers', title: 'Import & Distribution', desc: 'Distributors and businesses sourcing quality products', tone: 'orange' },
    ],
    targetMarkets: ['Cambodia'],
    competitiveAdvantages: {
  badge: 'Key Differentiators',
  title: 'What makes Salamass different?',
  description: 'Salamass is more than a marketplace. We deliver an end-to-end growth solution built on three pillars: e-commerce platform, multi-channel marketing, and integrated logistics to help brands scale faster in Cambodia.',

  image: marketingPoster,
  video: khacbiet2SectionVideo,

  imageAlt: 'Integrated e-commerce, marketing, and logistics solution',
      benefits: [
        { icon: Globe2, title: 'Cambodia-focused strategy', description: 'Lower competition than Vietnam, with a local team that understands culture and market behavior.' },
        { icon: BarChart3, title: 'Integrated ecosystem', description: 'E-commerce + Marketing + Logistics combined in one synchronized package.' },
        { icon: ShieldCheck, title: 'End-to-end support', description: 'Beyond listing products, Salamass supports operations, promotion, and revenue growth.' },
        { icon: CheckCircle2, title: 'Built for every business size', description: 'From small sellers to scaling enterprises, we provide practical growth pathways.' },
      ],
    },
comparisonSection: {
      title: 'Salamass vs Traditional Selling',
      description: 'A clear comparison showing why sellers can scale faster with Salamass in Cambodia.',
      buttonText: 'Transform today',
      salamassTitle: 'With Salamass',
      traditionalTitle: 'Traditional selling',
      salamassPoints: [
        'Omnichannel selling (marketplace, Fanpage, Tiktok)',
        'Faster access to Cambodia customers',
        'Integrated logistics & warehousing',
        'A-Z operational and marketing support',
      ],
      traditionalPoints: [
        'Manual and fragmented processes',
        'Limited market reach',
        'Self-managed logistics with higher costs',
        'Lack of structured marketing support',
      ],
    },
    servicePricing: {
      badge: 'Service Pricing',
      title: 'Choose the package that fits your needs',
      plans: [
        {
          name: 'BASIC',
          description: 'Suitable for new sellers exploring the Cambodia market',
          features: [
            'List products on Salamass',
            'Basic store operation support',
            '05 Fanpage posts/month',
            '01 TikTok review video/month',
          ],
          price: '$50',
          period: 'MONTH',
        },
        {
          name: 'PREMIUM',
          description: 'Suitable for sellers who want strong growth and wider market share',
          features: [
            'Product listing + priority visibility',
            '10 Fanpage posts/month',
            '02 TikTok review videos/month',
            'Basic platform banner',
            'Store optimization consulting',
          ],
          price: '$100',
          period: 'MONTH',
        },
        {
          name: 'ENTERPRISE',
          description: 'Suitable for brands and large sellers targeting Cambodia at scale',
          features: [
            'Unlimited product listings',
            'Priority visibility & featured banner',
            '20 Fanpage posts/month',
            '04 TikTok review videos/month',
            'Brand-building support',
            'Priority campaign participation',
            'Consignment at Cambodia warehouse',
          ],
          price: '$200',
          period: 'MONTH',
        },
      ],
    },
    sellerFaqs: defaultSellerFaqsEn,
  },
  km: {
    stats: [
      { value: ' ពង្រីកទៅកម្ពុជា', label: 'ឈានដល់អតិថិជនថ្មីរាប់លាននាក់ ដោយចំណាយទាប' },
      { value: ' លក់ពហុឆានែល', label: 'E-commerce, Fanpage, TikTok ក្នុងប្រព័ន្ធតែមួយ' },
      { value: ' ប្រតិបត្តិការ និងដឹកជញ្ជូនលឿន', label: 'ឃ្លាំងនៅកម្ពុជា – ដឹកជញ្ជូនក្នុងរយៈពេលប៉ុន្មានម៉ោង' },
    ],
    demoImages: {
    product: 'https://your-default-product-image.jpg',
    dashboard: 'https://your-default-dashboard.jpg',
    chat: 'https://your-default-chat.jpg',
  },
    features: {
      buyer: [
        { icon: Search, title: 'ស្វែងរកដោយ AI', description: 'ណែនាំ និងតម្រៀបផលិតផលឆ្លាតវៃ។' },
        { icon: TrendingUp, title: 'ប្រៀបធៀបតម្លៃ', description: 'តាមដានការប្រែប្រួលតម្លៃតាមពេលវេលា។' },
        { icon: MessageSquare, title: 'ជជែកផ្ទាល់', description: 'ចរចារបានរហ័សជាមួយអ្នកផ្គត់ផ្គង់។' },
        { icon: CreditCard, title: 'រូបិយប័ណ្ណច្រើន', description: 'គាំទ្ររូបិយប័ណ្ណអន្តរជាតិ។' },
      ],
      seller: [
        { icon: BarChart3, title: 'គ្រប់គ្រងការបញ្ជាទិញ', description: 'តាមដានស្ថានភាពប្រតិបត្តិការ។' },
        { icon: Package, title: 'គ្រប់គ្រងផលិតផល', description: 'បង្ហោះ និងបង្កើនប្រសិទ្ធភាពកាតាឡុកបានងាយ។' },
        { icon: ShieldCheck, title: 'ផ្ទៀងផ្ទាត់ Halal', description: 'ស្តង់ដារវិញ្ញាបនបត្រច្បាស់លាស់។' },
        { icon: Truck, title: 'ដឹកជញ្ជូនរួមបញ្ចូល', description: 'ភ្ជាប់ដៃគូដឹកជញ្ជូនសកល។' },
      ],
      system: [
        { icon: Languages, title: 'ភាសាច្រើន', description: 'គាំទ្រ អង់គ្លេស - ខ្មែរ។' },
        { icon: Globe2, title: 'ទីផ្សារអន្តរជាតិ', description: 'ភ្ជាប់ ASEAN, មជ្ឈិមបូព៌ា, EU។' },
        { icon: ShieldCheck, title: 'តាមដាន Halal', description: 'ផ្ទៀងផ្ទាត់ និងតាមដានវិញ្ញាបនបត្រ Halal។' },
        { icon: Truck, title: 'ដឹកជញ្ជូនរួមបញ្ចូល', description: 'ភ្ជាប់ក្រុមហ៊ុនដឹកជញ្ជូនអន្តរជាតិដែលទុកចិត្តបាន។' },
      ],
    },
    steps: [
{ number: 1, icon: UserPlus, title: 'ចុះឈ្មោះ', description: 'បំពេញព័ត៌មាន និងបង្កើតគណនី។' },
      { number: 2, icon: CheckCircle2, title: 'ជ្រើសរើសគម្រោង', description: 'Basic, Premium ឬ Enterprise។' },
      { number: 3, icon: Package, title: 'បង្ហោះផលិតផល', description: 'ដាក់បញ្ជីផលិតផលលើវេទិកា។' },
      { number: 4, icon: Store, title: 'ចាប់ផ្តើមលក់', description: 'លក់ និងឈានដល់អតិថិជននៅកម្ពុជា។' },
    ],
    categories: [
      { image: 'https://images.unsplash.com/photo-1542838132-92c53300491e', hoverVideo: agricultureHoverVideo, title: 'កសិផល និងអាហារ', description: 'ស្រស់ សុវត្ថិភាព និងគុណភាព', productCount: '3,156' },
      { image: petFoodImage, hoverVideo: petFoodHoverVideo, title: 'អាហារសត្វចិញ្ចឹម', description: 'អាហារូបត្ថម្ភ និងមានចម្រុះ', productCount: '1,184' },
      { image: 'https://images.unsplash.com/photo-1445205170230-053b83016050', hoverVideo: fashionHoverVideo, title: 'ម៉ូដសម្លៀកបំពាក់', description: 'ទាន់សម័យ និងតម្លៃល្អ', productCount: '2,041' },
      { image: cosmeticImage, hoverVideo: cosmeticHoverVideo, title: 'គ្រឿងសំអាង', description: 'សុវត្ថិភាព និងទុកចិត្តបាន', productCount: '892' },
      { image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f', title: 'ទឹកអប់', description: 'ក្លិនក្រអូបលំដាប់ខ្ពស់', productCount: '764' },
      { image: interiorImage, title: 'តុបតែងគេហដ្ឋាន', description: 'ទំនើប និងប្រណិត', productCount: '1,523' },
    ],
    testimonials: [
      { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nguyen', name: 'Nguyen Van An', role: 'នាយក', company: 'ក្រុមហ៊ុននាំចេញ', quote: 'ប្រាក់ចំណូលកើនឡើងខ្លាំងបន្ទាប់ពី 6 ខែ។', rating: 5 },
      { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tran', name: 'Tran Thi Binh', role: 'ម្ចាស់អាជីវកម្ម', company: 'អាហារអុីកូឡូស៊ី', quote: 'យើងរកឃើញអ្នកផ្គត់ផ្គង់ដែលទុកចិត្តបានយ៉ាងឆាប់រហ័ស។', rating: 5 },
    ],
    ecosystemNodes: [
      { icon: Store, role: 'អ្នកផ្គត់ផ្គង់', title: 'ផលិតកម្ម & នាំចេញ', desc: 'អាជីវកម្ម និងរោងចក្រដែលចង់នាំចេញទៅទីផ្សារអន្តរជាតិ', tone: 'orange' },
      { icon: Globe, role: 'វេទិកា Salamass', title: 'ភ្ជាប់ & គ្រប់គ្រង', desc: 'ប្រព័ន្ធអេកូស៊ីស្ទឹម eCommerce ជាមួយ AI ការទូទាត់ និងដឹកជញ្ជូន', tone: 'teal' },
      { icon: ShoppingCart, role: 'អ្នកទិញ', title: 'នាំចូល & ចែកចាយ', desc: 'អ្នកចែកចាយ និងអាជីវកម្មស្វែងរកផលិតផលគុណភាពខ្ពស់', tone: 'orange' },
    ],
    targetMarkets: ['Cambodia'],
    competitiveAdvantages: {
  badge: 'ចំណុចខុសប្លែកសំខាន់',
  title: 'តើ Salamass ខុសប្លែកដូចម្តេច?',
 description: 'Salamass មិនមែនតែជាវេទិកា eCommerce ប៉ុណ្ណោះទេ។ យើងផ្តល់ដំណោះស្រាយលក់ពេញលេញ រួមបញ្ចូលវេទិកាពាណិជ្ជកម្មអេឡិចត្រូនិក ទីផ្សារច្រើនឆានែល និងដឹកជញ្ជូនរួមបញ្ចូល ដើម្បីជួយអាជីវកម្មរីកចម្រើនលឿននៅកម្ពុជា។',

  image: marketingPoster,
  video: khacbiet2SectionVideo,

  imageAlt: 'ដំណោះស្រាយរួមបញ្ចូល eCommerce, Marketing និង Logistics',
      benefits: [
        { icon: Globe2, title: 'ផ្តោតលើទីផ្សារកម្ពុជា', description: 'ការប្រកួតប្រជែងតិចជាងវៀតណាម និងមានក្រុមការងារយល់ដឹងទីផ្សារមូលដ្ឋាន។' },
        { icon: BarChart3, title: 'ប្រព័ន្ធអេកូស៊ីស្ទឹមរួមបញ្ចូល', description: 'រួមបញ្ចូល eCommerce + Marketing + Logistics ក្នុងកញ្ចប់តែមួយ។' },
        { icon: ShieldCheck, title: 'គាំទ្រពី A ដល់ Z', description: 'មិនត្រឹមតែបង្ហោះផលិតផលទេ ប៉ុន្តែគាំទ្រពីប្រតិបត្តិការ ដល់ការពង្រីកប្រាក់ចំណូល។' },
        { icon: CheckCircle2, title: 'សមស្របគ្រប់ទំហំអាជីវកម្ម', description: 'ចាប់ពីអ្នកលក់តូចៗ ដល់សហគ្រាសធំៗ សុទ្ធតែអាចអនុវត្តបាន។' },
      ],
    },
comparisonSection: {
      title: 'ប្រៀបធៀប Salamass និងការលក់បែបប្រពៃណី',
      description: 'បង្ហាញភាពខុសគ្នាច្បាស់លាស់ ដើម្បីជួយអ្នកលក់ពង្រីកទីផ្សារកម្ពុជាបានលឿន។',
      buttonText: 'ផ្លាស់ប្តូរថ្ងៃនេះ',
      salamassTitle: 'ជាមួយ Salamass',
      traditionalTitle: 'ការលក់បែបប្រពៃណី',
      salamassPoints: [
        'លក់ច្រើនឆានែល (វេទិកា, Fanpage, Tiktok)',
        'ឈានដល់អតិថិជនកម្ពុជាបានលឿន',
        'ដឹកជញ្ជូន និងឃ្លាំងរួមបញ្ចូល',
        'គាំទ្រពេញលេញពី A-Z',
      ],
      traditionalPoints: [
        'ដំណើរការដោយដៃ និងបែកខ្ញែក',
        'ឈានដល់ទីផ្សារមានកម្រិត',
        'ត្រូវគ្រប់គ្រងដឹកជញ្ជូនដោយខ្លួនឯង',
        'ខ្វះការគាំទ្រផ្នែកទីផ្សារដែលមានប្រព័ន្ធ',
      ],
    },
    servicePricing: {
      badge: 'តារាងតម្លៃសេវាកម្ម',
      title: 'ជ្រើសរើសកញ្ចប់ដែលសមស្របនឹងតម្រូវការរបស់អ្នក',
      plans: [
        {
          name: 'BASIC',
          description: 'សមស្របសម្រាប់អ្នកលក់ដែលទើបចាប់ផ្តើមសាកល្បងទីផ្សារកម្ពុជា',
          features: [
            'ដាក់បញ្ចូលផលិតផលលើ Salamass',
            'គាំទ្រមូលដ្ឋានសម្រាប់ការគ្រប់គ្រងហាង',
            '05 ការបង្ហោះ Fanpage/ខែ',
            '01 វីដេអូ Review TikTok/ខែ',
          ],
          price: '$50',
          period: 'ខែ',
        },
        {
          name: 'PREMIUM',
          description: 'សមស្របសម្រាប់អ្នកលក់ដែលចង់ពង្រីកលូតលាស់ខ្លាំង',
          features: [
            'ដាក់ផលិតផល + អាទិភាពក្នុងការបង្ហាញ',
            '10 ការបង្ហោះ Fanpage/ខែ',
            '02 វីដេអូ Review TikTok/ខែ',
            'Banner មូលដ្ឋានលើវេទិកា',
            'ពិគ្រោះយោបល់ការបង្កើនប្រសិទ្ធភាពហាង',
          ],
          price: '$100',
          period: 'ខែ',
        },
        {
          name: 'ENTERPRISE',
          description: 'សមស្របសម្រាប់ម៉ាក និងអ្នកលក់ធំដែលចង់ពង្រីកទីផ្សារកម្ពុជា',
          features: [
            'ដាក់ផលិតផលដោយគ្មានកំណត់',
            'អាទិភាពបង្ហាញ & banner លេចធ្លោ',
            '20 ការបង្ហោះ Fanpage/ខែ',
            '04 វីដេអូ Review TikTok/ខែ',
            'គាំទ្រការកសាងម៉ាក',
            'អាទិភាពចូលរួម campaign',
            'ផ្ញើទំនិញទុកនៅឃ្លាំងកម្ពុជា',
          ],
          price: '$200',
          period: 'ខែ',
        },
      ],
    },
    sellerFaqs: defaultSellerFaqsKm,
  },
};

const pageLabels = {
  vi: {
    title: 'Salamass - Global Halal B2C',
    heroTitle: 'Salamass - Kết nối giao thương xuyên biên giới Việt - Cambodia',
    heroDescription: 'Nền tảng B2C giúp người mua và người bán giao dịch xuyên biên giới nhanh, minh bạch và dễ mở rộng.',
    sellerBtn: 'Đăng ký người bán',
    exploreBtn: 'Khám phá sản phẩm',
    badgeHalal: 'Halal',
    badgeGlobal: 'Toàn cầu',
    howItWorksTitle: 'Bắt đầu chỉ với 4 bước đơn giản',
    howItWorksDesc: 'Quy trình tham gia Salamass được thiết kế đơn giản và nhanh chóng - Từ đăng ký đến bán hàng, bạn có thể bắt đầu trong vòng vài ngày với sự hỗ trợ toàn diện của đội ngũ chúng tôi.',
    categoriesTitle: 'Danh Mục Sản Phẩm Đa Dạng',
    categoriesDesc: 'Tập Trung Hàng Tiêu Dùng',
    demoTitle: 'Demo nền tảng',
    leadBadge: 'Bắt đầu ngay hôm nay',
    leadTitle: 'Sẵn sàng mở rộng kinh doanh tại Cambodia?',
    leadDesc: 'Tham gia Salamass để tiếp cận thị trường Cambodia với giải pháp tích hợp TMĐT, marketing đa kênh và logistics. Chọn vai trò phù hợp với bạn:',
    sellerCta: 'Trở thành nhà bán hàng',
    distributorCta: 'Đăng ký đối tác phân phối',
    leadFormTitle: 'Đăng ký nhận thông tin',
    testimonialsTitle: 'Khách hàng nói gì',
    testimonialsDesc: 'Phản hồi thực tế từ đối tác đã dùng Salamass để mở rộng thị trường.',
    featuresBadge: 'Tính năng',
    featuresTitle: 'Công cụ mạnh mẽ cho mọi người dùng',
    featuresBuyer: 'Dành cho người mua',
    featuresSeller: 'Dành cho người bán',
    featuresSystem: 'Tính năng hệ thống',
    ecosystemTargetMarkets: 'Thị trường mục tiêu',
    faqTitle: '❓ Câu hỏi thường gặp dành cho nhà bán hàng',
    faqDesc: 'Giải đáp nhanh các thắc mắc khi kinh doanh trên Salamass',
    faqCta: '👉 Đăng ký ngay hôm nay – Bắt đầu kinh doanh tại Cambodia cùng Salamass!',
    demoTabs: {
      listing: 'Trang sản phẩm',
      dashboard: 'Bảng điều khiển',
      chat: 'Trò chuyện',
      listingDesc: 'Giao diện tìm kiếm và lọc sản phẩm với AI, so sánh giá, và đánh giá chi tiết',
      dashboardDesc: 'Quản lý đơn hàng, theo dõi doanh thu, và phân tích hiệu suất bán hàng',
      chatDesc: 'Hệ thống chat trực tiếp giữa người mua và người bán với dịch tự động',
    },
    productLabel: 'sản phẩm',  videoIntro: 'Giới thiệu về Salamass', },
  en: {
    title: 'Salamass - Global Halal B2C',
    heroTitle: 'Salamass - Connecting Cross-border Trade Between Vietnam and Cambodia',
    heroDescription: 'A B2C platform helping buyers and sellers trade across borders quickly, transparently, and at scale.',
    sellerBtn: 'Register as seller',
    exploreBtn: 'Explore products',
    badgeHalal: 'Halal',
    badgeGlobal: 'Global',
    howItWorksTitle: 'Seller onboarding process',
    howItWorksDesc: 'The Salamass onboarding process is simple and fast. From sign-up to selling, you can get started in just a few days with full support from our team.',
    categoriesTitle: 'Marketplace Products',
    categoriesDesc: 'Focused on agricultural food products',
    demoTitle: 'Platform demo',
    leadBadge: 'Start today',
    leadTitle: 'Ready to grow your business in Cambodia?',
    leadDesc: 'Join Salamass to enter the Cambodia market with an integrated solution of e-commerce, multi-channel marketing, and logistics. Choose your role:',
    sellerCta: 'Become a seller',
    distributorCta: 'Register as distributor',
    leadFormTitle: 'Sign up for updates',
    testimonialsTitle: 'What customers say',
    testimonialsDesc: 'Real feedback from partners who expanded markets with Salamass.',
    featuresBadge: 'Features',
    featuresTitle: 'Powerful tools for every user',
    featuresBuyer: 'For buyers',
    featuresSeller: 'For sellers',
    featuresSystem: 'System capabilities',
    ecosystemTargetMarkets: 'Target markets',
    faqTitle: '❓ Frequently asked questions for sellers',
    faqDesc: 'Quick answers for common questions when selling on Salamass',
    faqCta: '👉 Register today – Start doing business in Cambodia with Salamass!',
    demoTabs: {
      listing: 'Product page',
      dashboard: 'Dashboard',
      chat: 'Chat',
      listingDesc: 'AI-powered product search and filters, price comparison, and detailed reviews',
      dashboardDesc: 'Manage orders, monitor revenue, and analyze selling performance',
      chatDesc: 'Real-time buyer-seller chat with auto translation support',
    },
    productLabel: 'products',    videoIntro: 'Introduction to Salamass',  },
  km: {
    title: 'Salamass - Global Halal B2C',
    heroTitle: 'Salamass - ភ្ជាប់ពាណិជ្ជកម្មឆ្លងដែនរវាងវៀតណាម និងកម្ពុជា',
    heroDescription: 'វេទិកា B2C ជួយអ្នកទិញ និងអ្នកលក់ធ្វើពាណិជ្ជកម្មឆ្លងដែនបានលឿន តម្លាភាព និងពង្រីកបានងាយ។',
    sellerBtn: 'ចុះឈ្មោះជាអ្នកលក់',
    exploreBtn: 'ស្វែងរកផលិតផល',
    badgeHalal: 'Halal',
    badgeGlobal: 'សកល',
    howItWorksTitle: 'ដំណើរការចូលរួម Seller',
    howItWorksDesc: 'ដំណើរការចូលរួមលើ Salamass ត្រូវបានរចនាឡើងឱ្យសាមញ្ញ និងរហ័ស។ ចាប់ពីការចុះឈ្មោះរហូតដល់ការលក់ អ្នកអាចចាប់ផ្តើមបានក្នុងរយៈពេលប៉ុន្មានថ្ងៃ ជាមួយការគាំទ្រពេញលេញពីក្រុមការងាររបស់យើង។',
    categoriesTitle: 'ផលិតផលលើទីផ្សារ',
    categoriesDesc: 'ផ្តោតលើកសិផល និងអាហារ',
    demoTitle: 'សាកល្បងវេទិកា',
    leadBadge: 'ចាប់ផ្តើមថ្ងៃនេះ',
    leadTitle: 'ត្រៀមពង្រីកអាជីវកម្មរបស់អ្នកនៅកម្ពុជាហើយឬនៅ?',
    leadDesc: 'ចូលរួម Salamass ដើម្បីចូលទីផ្សារកម្ពុជាជាមួយដំណោះស្រាយរួមបញ្ចូល eCommerce, Marketing ច្រើនឆានែល និង Logistics។',
    sellerCta: 'ក្លាយជាអ្នកលក់',
    distributorCta: 'ចុះឈ្មោះជាអ្នកចែកចាយ',
    leadFormTitle: 'ចុះឈ្មោះទទួលព័ត៌មាន',
    testimonialsTitle: 'មតិយោបល់អតិថិជន',
    testimonialsDesc: 'មតិយោបល់ពិតពីដៃគូដែលពង្រីកទីផ្សារជាមួយ Salamass។',
    featuresBadge: 'មុខងារ',
    featuresTitle: 'ឧបករណ៍ខ្លាំងសម្រាប់អ្នកប្រើទាំងអស់',
    featuresBuyer: 'សម្រាប់អ្នកទិញ',
    featuresSeller: 'សម្រាប់អ្នកលក់',
    featuresSystem: 'មុខងារប្រព័ន្ធ',
    ecosystemTargetMarkets: 'ទីផ្សារគោលដៅ',
    faqTitle: '❓ សំណួរញឹកញាប់សម្រាប់អ្នកលក់',
    faqDesc: 'ចម្លើយរហ័សសម្រាប់សំណួរពេញនិយម',
    faqCta: '👉 ចុះឈ្មោះថ្ងៃនេះ – ចាប់ផ្តើមអាជីវកម្មនៅកម្ពុជាជាមួយ Salamass!',
    demoTabs: {
      listing: 'ទំព័រផលិតផល',
      dashboard: 'ផ្ទាំងគ្រប់គ្រង',
      chat: 'ជជែក',
      listingDesc: 'ស្វែងរក និងតម្រៀបផលិតផលដោយ AI ប្រៀបធៀបតម្លៃ និងវាយតម្លៃលម្អិត',
      dashboardDesc: 'គ្រប់គ្រងការបញ្ជាទិញ តាមដានចំណូល និងវិភាគលទ្ធផលលក់',
      chatDesc: 'ប្រព័ន្ធជជែកផ្ទាល់រវាងអ្នកទិញ និងអ្នកលក់ ជាមួយការបកប្រែស្វ័យប្រវត្តិ',
    },
    productLabel: 'ផលិតផល',   videoIntro: 'ការណែនាំអំពី Salamass',  },
};

const CMS_LABEL_KEYS = [
  'heroTitle',
  'heroDescription',
  'leadTitle',
  'leadDesc',
  'categoriesTitle',
  'categoriesDesc',
  'faqTitle',
];

const CMS_PRODUCT_PREFIXES = ['product1', 'product2', 'product3', 'product4'];
const CMS_SERVICE_PREFIXES = ['serviceBasic', 'servicePremium', 'serviceEnterprise'];

function pickCmsValue(cmsEntries, key, fallbackValue) {
  const value = cmsEntries?.[key];
  if (typeof value !== 'string') {
    return fallbackValue;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? value : fallbackValue;
}

export function getHomeContent(language = 'vi') {
  const lang = contentByLanguage[language] ? language : 'vi';
  return contentByLanguage[lang];
}

export function getPageLabels(language = 'vi') {
  const lang = pageLabels[language] ? language : 'vi';
  return pageLabels[lang];
}

export function getCmsAwareHomeData(language = 'vi', cmsContentByLanguage = {}) {
  const lang = contentByLanguage[language] ? language : 'vi';
  const cmsEntries = cmsContentByLanguage?.[lang] || {};

  const baseContent = contentByLanguage[lang];
  const baseLabels = pageLabels[lang];

  const labels = {
    ...baseLabels,
    ...Object.fromEntries(
      CMS_LABEL_KEYS.map((key) => [key, pickCmsValue(cmsEntries, key, baseLabels[key])])
    ),
  };

  const stats = [
    {
      value: pickCmsValue(cmsEntries, 'stats_1_value', baseContent.stats?.[0]?.value),
      label: pickCmsValue(cmsEntries, 'stats_1_label', baseContent.stats?.[0]?.label),
    },
    {
      value: pickCmsValue(cmsEntries, 'stats_2_value', baseContent.stats?.[1]?.value),
      label: pickCmsValue(cmsEntries, 'stats_2_label', baseContent.stats?.[1]?.label),
    },
    {
      value: pickCmsValue(cmsEntries, 'stats_3_value', baseContent.stats?.[2]?.value),
      label: pickCmsValue(cmsEntries, 'stats_3_label', baseContent.stats?.[2]?.label),
    },
  ];

  const categories = baseContent.categories.map((category, index) => {
    const prefix = CMS_PRODUCT_PREFIXES[index];
    if (!prefix) return category;

    return {
      ...category,
      title: pickCmsValue(cmsEntries, `${prefix}Title`, category.title),
      description: pickCmsValue(cmsEntries, `${prefix}Description`, category.description),
      image: pickCmsValue(cmsEntries, `${prefix}Image`, category.image),
      productCount: pickCmsValue(cmsEntries, `${prefix}Count`, category.productCount),
    };
  });

  const plans = baseContent.servicePricing.plans.map((plan, index) => {
    const prefix = CMS_SERVICE_PREFIXES[index];
    if (!prefix) return plan;

    return {
      ...plan,
      name: pickCmsValue(cmsEntries, `${prefix}Name`, plan.name),
      description: pickCmsValue(cmsEntries, `${prefix}Description`, plan.description),
      price: pickCmsValue(cmsEntries, `${prefix}Price`, plan.price),
      period: pickCmsValue(cmsEntries, `${prefix}Period`, plan.period),
    };
  });

 const demoImages = {
  product: pickCmsValue(cmsEntries, 'demo_product_image', baseContent.demo_product_image),
  dashboard: pickCmsValue(cmsEntries, 'demo_dashboard_image', baseContent.demo_dashboard_image),
  chat: pickCmsValue(cmsEntries, 'demo_chat_image', baseContent.demo_chat_image),
};

  return {
  labels,
  content: {
    ...baseContent,
    stats, 
    categories,
     demoImages,
    servicePricing: {
      ...baseContent.servicePricing,
      badge: pickCmsValue(cmsEntries, 'servicePricingBadge', baseContent.servicePricing.badge),
      title: pickCmsValue(cmsEntries, 'servicePricingTitle', baseContent.servicePricing.title),
      plans,
    },
  },
};
}