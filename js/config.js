const CONFIG = {
  groom: {
    name: "Iqbal",
    fullName: "Iqbal Permana",
    parents: "Bapak Sudrajat & Ibu Ati Atirah (Alm)",
    photo: "./assets/gallery/groom.jpg",
    quote: "Kau adalah jawaban dari setiap doaku"
  },
  bride: {
    name: "Santi",
    fullName: "Santi Oktaviani",
    parents: "Bapak Apriadi & Ibu Siti Rokhmaniyah (Alm)",
    photo: "./assets/gallery/bride.jpg",
    quote: "Bersamamu, dunia terasa sempurna"
  },

  wedding: {
    date: "2026-12-21T08:00:00+07:00",
    dayName: "Senin",
    dateFormatted: "21 Desember 2026",
    countdownLabel: "Menuju Hari Bahagia",
    akad: {
      title: "Akad Nikah",
      date: "Senin, 21 Desember 2026",
      time: "09:00 - 11:00 WIB",
      venue: "Masjid At-Thohir",
      address: "Jl. Mochamad Thohir, Tapos, Kota Depok, Jawa Barat",
      mapsQuery: "Masjid+At-Thohir+Tapos+Depok"
    },
    resepsi: {
      title: "Intimate Lunch",
      date: "Senin, 21 Desember 2026",
      time: "11:00 - 13:30 WIB",
      venue: "Resto Dapur Ingkung",
      address: "Jl. Pekapuran, Sukamaju Baru, Tapos, Kota Depok, Jawa Barat",
      mapsQuery: "Dapur+Ingkung+Tapos+Depok"
    }
  },

  doaPembuka: {
    arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
    latin: "",
    salam: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    text: "Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan putra-putri kami:",
    names: "{{groom}} & {{bride}}"
  },

  quote: {
    secondary: {
      text: "Dan Allah telah menghalalkan jodoh dan mengharamkan zina.",
      source: "QS. Al-Isra: 32"
    },
    text: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21"
  },

  loveStory: [
    {
      year: "2020",
      title: "Pertama Bertemu",
      description: "Kami pertama kali bertemu di sebuah acara seminar nasional. Sebuah pertemuan singkat yang ternyata menjadi awal dari segalanya.",
      photo: "./assets/gallery/story-01.jpg"
    },
    {
      year: "2021",
      title: "Mulai Dekat",
      description: "Setelah setahun tetap berhubungan, kami mulai lebih sering berkomunikasi. Dari teman, perlahan menjadi seseorang yang spesial.",
      photo: "./assets/gallery/story-02.jpg"
    },
    {
      year: "2023",
      title: "Resmi Berhubungan",
      description: "Dengan restu dari kedua keluarga, kami memutuskan untuk menjalin hubungan yang lebih serius.",
      photo: "./assets/gallery/story-03.jpg"
    },
    {
      year: "2025",
      title: "Lamaran",
      description: "Di sebuah sore yang indah, dengan penuh haru dan bahagia, kami melangkah ke jenjang yang lebih serius.",
      photo: "./assets/gallery/story-04.jpg"
    },
    {
      year: "2026",
      title: "Hari Pernikahan",
      description: "Insya Allah, kami akan melangsungkan pernikahan. Semoga menjadi awal dari perjalanan indah yang penuh berkah.",
      photo: "./assets/gallery/story-05.jpg"
    }
  ],

  music: {
    src: "./assets/music/bgm.mp3",
    title: "Lagu Kami"
  },

  gifts: [
    {
      bank: "Bank Central Asia (BCA)",
      number: "1234 5678 9012 3456",
      name: "Iqbal Permana",
      type: "rekening",
      icon: "bank"
    },
    {
      bank: "Bank Mandiri",
      number: "1234 5678 9012",
      name: "Santi Oktaviani",
      type: "rekening",
      icon: "bank"
    },
    {
      bank: "Bank Syariah Indonesia (BSI)",
      number: "7123 4567 8901",
      name: "Iqbal Permana",
      type: "rekening",
      icon: "bank"
    },
    {
      bank: "GoPay",
      number: "0812 3456 7890",
      name: "Iqbal Permana",
      type: "e-wallet",
      icon: "wallet"
    },
    {
      bank: "OVO",
      number: "0812 3456 7890",
      name: "Santi Oktaviani",
      type: "e-wallet",
      icon: "wallet"
    }
  ],

  guestbookInitial: [
    {
      name: "Budi Santoso",
      message: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, wa rahmah. Barakallahu lakuma.",
      time: "2 hari yang lalu"
    },
    {
      name: "Siti Rahayu",
      message: "Selamat menikah, Iqbal & Santi! Semoga selalu diberkahi kebahagiaan dan dilimpahkan rezeki yang halal. Aamiin.",
      time: "3 hari yang lalu"
    },
    {
      name: "Ahmad Fauzi",
      message: "MasyaAllah, turut berbahagia! Semoga pernikahan ini menjadi langkah awal menuju Jannah-Nya.",
      time: "5 hari yang lalu"
    },
    {
      name: "Dewi Kartika",
      message: "Barakallahu wa baaraka alaikuma wa jama'a bainakuma fii khair. Semoga selalu bahagia ya!",
      time: "1 minggu yang lalu"
    },
    {
      name: "Rizky Pratama",
      message: "Alhamdulillah, akhirnya! Semoga menjadi pasangan yang saling melengkapi hingga Jannah. Aamiin.",
      time: "1 minggu yang lalu"
    },
    {
      name: "Nina Sari",
      message: "Wah, ga sabar nunggu hari H! Semoga lancar semua acaranya ya. Semoga bahagia selalu!",
      time: "2 minggu yang lalu"
    },
    {
      name: "Hendra Wijaya",
      message: "Turut berbahagia. Semoga menjadi keluarga yang harmonis dan penuh cinta. Barakallahu.",
      time: "2 minggu yang lalu"
    },
    {
      name: "Putri Amelia",
      message: "Bahagia banget! Semoga samawa ya Iqbal Santi. Jangan lupa undang aku jadi saksi pernikahan ya!",
      time: "3 minggu yang lalu"
    }
  ]
};
