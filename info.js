import axios from "axios";

export class GetDataService {
  static serverURL = `http://3.1.195.111:8080`

  static getProfile() {
    return axios.get(`${this.serverURL}/get-data/profile`)
  }
}
let info = {
  name: "Canh Nguyen",
  logo_name: "Cảnh Nguyễn",
  flat_picture: require("./src/assets/me.jpg"),
  config: {
    use_cookies: true,
    navbar: {
      blur: false
    }
  },
  links: {
    linkedin: "https://www.facebook.com/Shurikenger186",
    github: "https://www.tiktok.com/@ka1896.jp?_t=8aDcPNpf72X&_r=1",
      behance: "https://join.skype.com/invite/yX3vsxMddME8",
    resume: "https://drive.google.com/file/d/1W0pzOo1Gb-W70BYKehOfZ4qaJt7m1_7O/view?usp=sharing",
  },
  portfolio: [
    {
      name: "Quản lý điểm V-Point",
      pictures: [
        {
          img: require("./src/assets/portfolio/diary/trangchu.jpg")
        },
        {
          img: require("./src/assets/portfolio/diary/themdiem.jpg")
        },
        {
          img: require("./src/assets/portfolio/diary/nhapexcel.jpg")
        },
        {
          img: require("./src/assets/portfolio/diary/nhapexcel2.jpg")
        },
        {
          img: require("./src/assets/portfolio/diary/thongtindiem2.jpg")
        },
        {
          img: require("./src/assets/portfolio/diary/quanlynguoidung.jpg")
        },
        {
          img: require("./src/assets/portfolio/diary/themmoinguoidung.jpg")
        },
        {
          img: require("./src/assets/portfolio/diary/quanlyphongban.jpg")
        },
      ],
      technologies: ["Spring boot", "Spring security", "SQL", "Database", "VueJS2", "Bootstrap"],
      category: "Web App",
      date: "06/2022 - 08/2022",
      github:
          "https://github.com/NguyenCanh186/V-PointTool-1",
      visit: "https://github.com/NguyenCanh186/V-PointTool-1",
      description:
          "Quản lý điểm V-point là hệ thống giúp phòng nhân lực của công ty chấm điểm được các nhân viên dựa trên chỉ số KPI công việc, các hoạt động đào tạo, tham gia đào tạo.... Từ điểm đó, nhân viên có thể nhận được các gói phúc lợi khác nhau.  "
    },
    {
      name: "Xếp hạng tín dụng TP bank",
      pictures: [
        {
          img: require("./src/assets/portfolio/online examination/login.png")
        },
        {
          img: require("./src/assets/portfolio/online examination/khoitaohoso.png")
        },
        {
          img: require("./src/assets/portfolio/online examination/dinhdanhkhachhang.png")
        },
        {
          img: require("./src/assets/portfolio/online examination/quanlynhomnganh.png")
        },
        {
          img: require("./src/assets/portfolio/online examination/giahanchamdiem.png")
        },
        {
          img: require("./src/assets/portfolio/online examination/xephangvono.png")
        }
      ],
      technologies: ["Spring boot", "Spring security", "SQL", "Database", "VueJS2", "Bootstrap"],
      category: "Web App",
      date: "08/2022 - hiện tại",
      github: "https://github.com/",
      visit: "https://github.com/",
      description:
          "Xếp hạng tín dụng TP bank là hệ thống xếp hạng các khách hàng của ngân hàng TP bank dựa trên vốn chủ đầu tư, báo cáo tài chính, tổng tài sản... để có thể đưa ra các khoản vay thích hợp "
    },
    {
      name: "Blog cá nhân",
      pictures: [
        {
          img: require("./src/assets/portfolio/myflix.com/trangchu.png")
        },
        {
          img: require("./src/assets/portfolio/myflix.com/story.png")
        },
        {
          img: require("./src/assets/portfolio/myflix.com/blogcanhan.png")
        },
        {
          img: require("./src/assets/portfolio/myflix.com/lienhe.png")
        },
      ],
      technologies: ["VueJS", "Bootstrap"],
      category: "Web App",
      date: "Dự án cá nhân",
      github:
          "https://github.com/NguyenCanh186/personalBlog",
      visit: "https://canhnguyensblog.netlify.app/",
      description:
          "Nơi lưu trữ những khoảnh khắc và những suy nghĩ của mình"
    },
  ],
  portfolio_design: [
    {
      name: "Gia đình nhỏ, hạnh phúc to",
      title: "Gia đình tôi",
      pictures: [
        {
          img: require("./src/assets/designs/Keep it green/IMG_4321.jpg"),
          title: "Mẹ đưa Cảnh và 2 đứa cháu đi khu vui chơi giải trí"
        },
        {
          img: require("./src/assets/designs/Keep it green/bometoi.jpg"),
          title: "Bố mẹ tôi khi tôi mới từ Nhật bản về đấy.... hahah....."
        },
        {
          img: require("./src/assets/designs/Keep it green/canhacallvideo.jpeg"),
          title: "Cả nhà video call =)))"
        },
        {
          img: require("./src/assets/designs/Keep it green/mevachigaidiancuoi.jpg"),
          title: "Mẹ và chị gái đi ăn cưới em Dũng nhà chú Lam"
        },
        {
          img: require("./src/assets/designs/Keep it green/2thangchauvame1.jpg"),
          title: "Checkin trước vườn hoa nhà mình này"
        },
      ],
      category: "Vui vẻ và đầy ắp tiếng cười",
    },
    {
      name: "Một nửa của Cảnh =))))",
      title: "Người yêu tôi và tôi",
      pictures: [
        {
          img: require("./src/assets/designs/digital agency/avt.jpg"),
          title: "Cô ấy là Phạm Ngọc Anh"
        },
        {
          img: require("./src/assets/designs/digital agency/anh1.jpeg"),
          title: "Tôi gặp cô ấy lần đầu tiên trên tàu điện, và đây là lần đầu tôi hẹn cô ấy đi chơi. Thích tôi quá hay sao mà cười tươi thế không biết =)"
        },
        {
          img: require("./src/assets/designs/digital agency/anh2.jpeg"),
          title: "Sau vài lần cảm thấy đáng tin nên cũng đồng ý xuống phòng tôi chơi hihaa"
        },
        {
          img: require("./src/assets/designs/digital agency/anh3.jpg"),
          title: "Bả ngồi cả buổi chán quá, thế là tôi đưa ra công viên tình yêu chơi"
        },
        {
          img: require("./src/assets/designs/digital agency/anh4.jpeg"),
          title: "Xong bả còn checkin các thứ mà"
        },
        {
          img: require("./src/assets/designs/digital agency/anh7.jpeg"),
          title: "Sau hôm đấy là bả yêu tôi luôn. Đấy!!! Trông bà có được mình phát mà cười không thấy trời đất gì. Còn mặt tôi lúc đó thì các ông cũng hiểu rồi đấy"
        },
        {
          img: require("./src/assets/designs/digital agency/anh6.jpeg"),
          title: "Từ đó, những nơi mà tôi muốn đi đều có cô ấy ở bên"
        },
        {
          img: require("./src/assets/designs/digital agency/anh9.jpg"),
          title: "Lần đầu tiên tôi đưa cô ấy đi chơi xa"
        },
        {
          img: require("./src/assets/designs/digital agency/anh10.jpg"),
          title: "Thức ăn ở đấy không ngon hay sao mà trông cô ấy như muốn chiến đấu với tôi vậy"
        },
        {
          img: require("./src/assets/designs/digital agency/dibienvoicoay.jpg"),
          title: "Biển gì quên tên rồi =)))))"
        },
        {
          img: require("./src/assets/designs/digital agency/14.jpg"),
          title: "Tà tưa các loại"
        },
        {
          img: require("./src/assets/designs/digital agency/sinhnhattoi.jpg"),
          title: "Sinh nhật ấm áp"
        },
        {
          img: require("./src/assets/designs/digital agency/monquasinhnhatdautin.jpg"),
          title: "Qùa sinh nhật cuả tôi đấy các ông ạ "
        },
        {
          img: require("./src/assets/designs/digital agency/anh8.jpeg"),
          title: "Vừa khóc vừa đan khăn cho ny. Trông cột tóc hai bên đáng yêu chưa"
        },
        {
          img: require("./src/assets/designs/digital agency/15.jpg"),
          title: "Và rồi tôi cũng phải về Việt Nam. Từ đấy đến giờ chẳng có cái ảnh nào chụp chung"
        },
        {
          img: require("./src/assets/designs/digital agency/01.jpg"),
          title: "Mà cuối năm nay cô ấy về rồi =))) Cuối năm mình update tiếp nhé <3"
        },
      ],
      category: "Để tôi kể cho mà nghe ",
    },
    {
      name: "Bạn, thân ai người ấy lo",
      title: "Cạ cứng",
      pictures: [
        {
          img: require("./src/assets/designs/credit/avt.jpg"),
          title: "Bộ 3 nam tài tử chưa lấy vợ của làng Văn Lang mặc dù đã gần đến tuổi tam tuần :("
        },
        {
          img: require("./src/assets/designs/credit/avtcuonggia.jpg"),
          title: "Đây là thằng Cường, fullname là Nguyễn Mạnh Cường. Thằng này lắm biệt danh nên tôi gán cho nó cái nào mọi người cứ hiểu là thằng này nhé. Nhưng nếu là Cường Mèo thì không phải thằng này =)))))"
        },
        {
          img: require("./src/assets/designs/credit/avtlaodai.jpg"),
          title: "Còn thằng này là thằng Dân (Nguyễn Xuân Dân). Thằng này thì xem lắm phim kiếm hiệp quá nên Facebook của nó là Lâm Xung"
        },
        {
          img: require("./src/assets/designs/credit/anh1.jpg"),
          title: "Bộ 3 bọn tôi chơi với nhau từ xưa xửa xừa xưa, từ cái ngày học mẫu giáo. Mà ngày đấy k có smartphone nên cái ảnh này là cũ lắm rồi"
        },
        {
          img: require("./src/assets/designs/credit/2.jpg"),
          title: "Sau lớp 9 thì mỗi thằng 1 nơi"
        },
        {
          img: require("./src/assets/designs/credit/3.jpg"),
          title: "2 thằng này thì học nghề, còn tôi thì tiếp tục đánh điện tử trên danh nghĩa học sinh cấp 3 trường Hạ Hòa =)))"
        },
        {
          img: require("./src/assets/designs/credit/4.jpg"),
          title: "Nhưng mỗi khi có dịp gặp lại nhau, thì ôi thôi!!! Như chưa hề có cuộc chia ly luôn =))) làm đủ mọi trò, bên nhau cả ngày không chán"
        },
        {
          img: require("./src/assets/designs/credit/trenthuyen.jpg"),
          title: "Tôi học xong cấp 3 thì nó cũng về. Ngày đó chúng tôi là những thanh niên thất nghiệp, nhưng mà vẫn vô lo vô nghĩ lắm =)"
        },
        {
          img: require("./src/assets/designs/credit/dihatchuacoviec.jpg"),
          title: "Ngày thì chèo thuyền ngao du nhưng tối vẫn đi hát hò bay nhảy mặc dù không có đồng nào trong người"
        },
        {
          img: require("./src/assets/designs/credit/3thang.jpg"),
          title: "3 nam tài tử thất nghiệp"
        },
        {
          img: require("./src/assets/designs/credit/thamtoikhitoidinghiavu.jpg"),
          title: "Và rồi tôi quyết định đi nghĩa vụ, 4 tháng huấn luyện tăng 9kg, mặt mũi như những anh chàng châu Phi. Tưởng chúng nó quên tôi rồi mà nó vẫn vượt hơn trăm km đến thăm. Ngày nó đến tôi như vỡ òa. Trực ban gọi tên mà phải đi hỏi cả trung đội xem có phải mình không =))"
        },
        {
          img: require("./src/assets/designs/credit/dian.jpg"),
          title: "Rồi tôi về đơn vị chúng nó vẫn đến thăm mà. Tôi đưa chúng nó đi ăn"
        },
        {
          img: require("./src/assets/designs/credit/dihattanlap.jpg"),
          title: "Rồi đi hát hò bay nhảy này"
        },
        {
          img: require("./src/assets/designs/credit/divscungnhaup2.jpg"),
          title: "Nhớ nhau đến độ đi toilet cũng không rời xa nhau mà. Đoạn này thằng Cường Già đang bận ăn đào nên không có mặt =)))"
        },
        {
          img: require("./src/assets/designs/credit/divscungnhau.jpg"),
          title: "Nhưng mà vẫn còn bức ảnh để đời này mà hahah"
        },
        {
          img: require("./src/assets/designs/credit/laodainghiavu.jpg"),
          title: "Tôi đi nghĩa vụ được 1 năm thì thằng dân cũng đi theo tiếng gọi của tổ quốc. Ảnh này là nhớ nó quá nên phải cắt phép đi thăm này"
        },
        {
          img: require("./src/assets/designs/credit/5.jpg"),
          title: "Tôi hết nghĩa vụ thì nó cũng hết. 3 anh em chúng tôi lại trên 1 chiếc xe tăng hihaahha"
        },
      ],
      category: "Những người anh em khác cha khác mẹ =)))",
    },
    {
      name: "Life in Japan",
      title: "Nhật Bản",
      pictures: [
        {
          img: require("./src/assets/designs/booksi/anhbia.jpg"),
          title: "Đó là nơi tôi khao khát muốn đến kể từ khi học tiếng nhật sau khi hết nghĩa vụ quân sự"
        },
        {
          img: require("./src/assets/designs/booksi/hoconghiepdoan.jpg"),
          title: "Ngày đầu tiên đến Nhật và học ở nghiệp đoàn"
        },
        {
          img: require("./src/assets/designs/booksi/nghitruaowcongty.jpg"),
          title: "Học được một tháng thì về công ty làm việc"
        },
        {
          img: require("./src/assets/designs/booksi/quanantruataicongty.jpg"),
          title: "Ăn trưa ở công ty này các idol"
        },
        {
          img: require("./src/assets/designs/booksi/hoanngoinghigiailao.jpg"),
          title: " Thần Hoàn ngồi nghỉ giải lao tranh thủ nói chuyện với gái"
        },
        {
          img: require("./src/assets/designs/booksi/thangluongdautien.jpg"),
          title: "Tháng lương đầu tiên"
        },
        {
          img: require("./src/assets/designs/booksi/nguyenvaanhcungutrua.jpg"),
          title: "Idol Nguyên và Anh Cu ngủ trưa ở công ty này =))"
        },
        {
          img: require("./src/assets/designs/booksi/hoctiengnhatvoicacsuthay.jpg"),
          title: "Học tiếng Nhật với sư thầy"
        },
        {
          img: require("./src/assets/designs/booksi/maythanhnienkhongbietnghigi.jpg"),
          title: "Ngày đó không hiểu mấy thanh niên nghĩ gì mà mua bộ này về mặc"
        },
        {
          img: require("./src/assets/designs/booksi/nghicuoituancuaanhem.jpg"),
          title: "Nghỉ cuối tuần của các anh em team eiwa"
        },
        {
          img: require("./src/assets/designs/booksi/duathangemhieudingamgainhat.jpg"),
          title: "Đưa thằng em Hiếu đi ngắm gái Nhật"
        },
        {
          img: require("./src/assets/designs/booksi/tuyetday.jpg"),
          title: "Mùa đông đầu tiên nhìn thấy tuyết"
        },
        {
          img: require("./src/assets/designs/booksi/tuyettrang.jpg"),
          title: ""
        },
        {
          img: require("./src/assets/designs/booksi/dacsanhokkaido.jpg"),
          title: ""
        },
        {
          img: require("./src/assets/designs/booksi/dilamngaytuyetroi.jpg"),
          title: "Đi làm ngày tuyết rơi"
        },
        {
          img: require("./src/assets/designs/booksi/bongdangaytuyetroi.jpeg"),
          title: "Bóng đá ngày tuyết rơi"
        },
        {
          img: require("./src/assets/designs/booksi/nguoituyetdautay.jpg"),
          title: "Bóng đá ngày tuyết rơi"
        },
        {
          img: require("./src/assets/designs/booksi/moichiataynguoiyeuvu.jpg"),
          title: "Cái này là vừa mới chia tay người yêu cũ"
        },
        {
          img: require("./src/assets/designs/booksi/monquacuacongty.jpg"),
          title: "Biết mình thích chơi game nên công ty tặng cho cái máy chơi game luôn =)))))"
        },
        {
          img: require("./src/assets/designs/booksi/quatangcuacongty.jpg"),
          title: "Thi tiếng Nhật về lại được quà tiếp"
        },
        {
          img: require("./src/assets/designs/booksi/ngaymailathu7nhi.jpg"),
          title: "Những ngày cuối tuần"
        },
        {
          img: require("./src/assets/designs/booksi/kiemtiencuoituan.jpg"),
          title: "Ngày đi làm còn tối về anh em giúp nhau kiếm thêm thu nhập"
        },
        {
          img: require("./src/assets/designs/booksi/lolonhat.jpg"),
          title: "Đã là đam mê thì ở đâu cũng có thể làm được. LOL in Japan"
        },
        {
          img: require("./src/assets/designs/booksi/lenbao.jpg"),
          title: "Cuộc sống cứ như một bản nhạc toàn nốt lên. Lên báo này"
        },
        {
          img: require("./src/assets/designs/booksi/lenbarsowmnhatpho.jpg"),
          title: "Lên bar này! Mà lần này mấy ae lên bar sớm nhất phố Sapporo luôn"
        },
        {
          img: require("./src/assets/designs/booksi/chayphooinazumi.jpg"),
          title: "Lên phố này"
        },
        {
          img: require("./src/assets/designs/booksi/aodoivoibancungphong.jpg"),
          title: "Áo đôi với An Kem"
        },
        {
          img: require("./src/assets/designs/booksi/choibowling.jpg"),
          title: "Chơi bowling lần đầu ở nhật"
        },
        {
          img: require("./src/assets/designs/booksi/anhdaidien.jpg"),
          title: "Ở nhà một mình tự sướng. Cái ảnh này là avt của tôi từ tháng 3 năm 2019 đến giờ"
        },
        {
          img: require("./src/assets/designs/booksi/chogauan.jpg"),
          title: "Lên Donkihote cho gấu ăn"
        },
        {
          img: require("./src/assets/designs/booksi/batcachepcungidolnguyen.jpg"),
          title: "Idol Nguyên bắt được cá này"
        },
        {
          img: require("./src/assets/designs/booksi/minhcungtranhthucheckin.jpg"),
          title: "Tranh thủ làm kiểu sống ảo tý"
        },
        {
          img: require("./src/assets/designs/booksi/mayaecattoc.jpg"),
          title: "Mấy ae tự cắt tóc cuối tuần, kia là Thần Hoàn và An Kem nhé =)) "
        },
        {
          img: require("./src/assets/designs/booksi/sapporovedem.jpg"),
          title: "Phố Sapporo về đêm"
        },
        {
          img: require("./src/assets/designs/booksi/mohinhthanhphosapporo.jpg"),
          title: "Mô hình thành phố Sapporo"
        },
        {
          img: require("./src/assets/designs/booksi/t38sapporo.jpeg"),
          title: "Tầng 38 tại ga Sapporo, ban đêm lên đây ngắm thành phố thì hết sảy. Rượu ngon, nhạc cũng du dương nữa"
        },
        {
          img: require("./src/assets/designs/booksi/tieptucngamgainhat.jpg"),
          title: "Tiếp tục series ngắm gái Nhật"
        },
        {
          img: require("./src/assets/designs/booksi/gocnholamvieccuatoi.jpg"),
          title: "Góc nhỏ của tôi. Ngày đó idol Kyary Pamyu nên đồng nghiệp ở công ty tặng cho quả ảnh không thể chất lượng hơn"
        },
        {
          img: require("./src/assets/designs/booksi/otaru1.jpg"),
          title: "Otaru cũng đẹp ở Hokkaido nhé. Mọi người sang nhật nhớ ghé qua đây nha"
        },
        {
          img: require("./src/assets/designs/booksi/otaru2.jpg"),
          title: "Cửa hàng bán đồ thủy tinh ở Otaru"
        },{
          img: require("./src/assets/designs/booksi/ngamhoa.jpg"),
          title: "Ngắm hoa lệ rơi. À nhầm! Ngắm hoa anh đào"
        },{
          img: require("./src/assets/designs/booksi/mitomhaohao.jpg"),
          title: "Mì hảo hảo sau 2 năm xa quê"
        },
        {
          img: require("./src/assets/designs/booksi/dichoiohassamu.jpeg"),
          title: "Aeon mall Hassamu"
        },
        {
          img: require("./src/assets/designs/booksi/duanguoiyeudichoi.jpg"),
          title: "Đưa Ngọc Anh lên Shinsapporo"
        },
        {
          img: require("./src/assets/designs/booksi/chuanbiconguoiyeu.jpg"),
          title: "Công viên tình yêu ShiroiKoibito"
        },
        {
          img: require("./src/assets/designs/booksi/anhmawtnhinxaxam.jpg"),
          title: "Chuẩn bị đón mùa hè"
        },
        {
          img: require("./src/assets/designs/booksi/comgicuahanquocquentenroi.jpg"),
          title: "Ăn cơm Hàn Quốc"
        },
        {
          img: require("./src/assets/designs/booksi/dilamveluc6giosang.jpg"),
          title: "Bình minh ở InazumiKouen, lúc này là 6 giờ sáng. Hôm đó mình làm đêm"
        },
        {
          img: require("./src/assets/designs/booksi/dibienlan2.jpg"),
          title: "Bãi biển Hoshimi"
        },
        {
          img: require("./src/assets/designs/booksi/cauvongojojankei.jpeg"),
          title: "Cầu vồng ở Joujankei"
        },
        {
          img: require("./src/assets/designs/booksi/canphongnhocuatoi.jpg"),
          title: "Ngâm nga làm bài cho đỡ quên phím =)"
        },
        {
          img: require("./src/assets/designs/booksi/lenbarcungcacem.jpg"),
          title: "Đưa các em lên bar chơi"
        },
        {
          img: require("./src/assets/designs/booksi/lenbarcungcacem2.jpg"),
          title: "Chỗ này là bar King XMHU"
        },
        {
          img: require("./src/assets/designs/booksi/lenduongdiosaka.jpg"),
          title: "Lên đường đi chơi Osaka"
        },
        {
          img: require("./src/assets/designs/booksi/chupmayquaanhngaudet.jpg"),
          title: "Chụp cái ảnh kỉ niệm ở Hirakata Park"
        },
        {
          img: require("./src/assets/designs/booksi/caunamba.jpg"),
          title: "Cầu Namba Osaka, chỗ này là nổi tiếng lắm này"
        },
        {
          img: require("./src/assets/designs/booksi/ladocungdongbon.jpg"),
          title: "Lá đỏ cùng đồng bọn ở Nakajima Kouen"
        },
        {
          img: require("./src/assets/designs/booksi/ladoocungdongbon2.jpg"),
          title: "Mùa này thì ngắm lá đỏ cả ngày không chán"
        },
        {
          img: require("./src/assets/designs/booksi/ladocungdongbon3.jpg"),
          title: ""
        },
        {
          img: require("./src/assets/designs/booksi/anchoionakajima.jpg"),
          title: "Ngắm chán thì đến quán Việt Nam ở gần đấy ăn chơi phè phởn"
        },
        {
          img: require("./src/assets/designs/booksi/tambietgiamdocvamoinguoi.jpg"),
          title: "Ngày cuối cùng ở Nhật, hôm đó đến tạm biệt giám đốc và mọi người"
        },
        {
          img: require("./src/assets/designs/booksi/vaophongcho.jpg"),
          title: "Phòng chờ ở sân bay Narita Tokyo"
        },
        {
          img: require("./src/assets/designs/booksi/lenmaybay.jpg"),
          title: "Lên máy bay"
        },
        {
          img: require("./src/assets/designs/booksi/dacomatovietnam.jpg"),
          title: "Đã có mặt tại sân bay Đà Nẵng Việt Nam"
        },
        ],
      category: "Chỉ cần có cơ hội, tôi sẽ trở lại nơi này",
    },
  ],
};

export default info;
