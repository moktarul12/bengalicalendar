const axios = require('axios');

const API_URL = 'http://104.248.202.152:3000/api/events';

const februaryEvents = [
  {
    id: "feb_001",
    day: 4,
    month: 2,
    year: 0,
    titleBn: "জাতীয় সংবিধান দিবস",
    titleEn: "National Constitution Day",
    type: "national",
    color: "#1E3A5F",
    descriptionBn: "৪ ফেব্রুয়ারি বাংলাদেশে জাতীয় সংবিধান দিবস পালিত হয়। ১৯৭২ সালের ৪ ফেব্রুয়ারি বাংলাদেশের সংবিধান গ্রহণ করা হয়। এটি বাংলাদেশের সর্বোচ্চ আইন। সংবিধান গ্রহণের মাধ্যমে বাংলাদেশ একটি সার্বভৌম রাষ্ট্র হিসেবে প্রতিষ্ঠিত হয়। বঙ্গবন্ধু শেখ মুজিবুর রহমান সংবিধান প্রণয়নে গুরুত্বপূর্ণ ভূমিকা পালন করেন। সংবিধান প্রণয়ন কমিটি ৩৪ জন সদস্য নিয়ে গঠিত হয়। ড. কামাল হোসেন এর সভাপতি ছিলেন। সংবিধানে বাংলাদেশের মৌলিক নীতি, মানবাধিকার, নাগরিকের অধিকার ও রাষ্ট্রের কাঠামো নির্ধারণ করা হয়। সংবিধানে জাতীয়তাবাদ, সমাজতন্ত্র, গণতন্ত্র ও ধর্মনিরপেক্ষতা মৌলিক নীতি হিসেবে ঘোষণা করা হয়। সংবিধান দিবসে বিভিন্ন অনুষ্ঠানের আয়োজন করা হয়। সরকারি ছুটি থাকে। সংবিধান দিবসে সংবিধানের গুরুত্ব তুলে ধরা হয়। জাতীয় সংসদে বিশেষ অধিবেশন হয়। টেলিভিশন ও রেডিওতে বিশেষ অনুষ্ঠান প্রচার করা হয়। সংবিধান দিবস বাংলাদেশের গণতান্ত্রিক যাত্রার প্রতীক।",
    descriptionEn: "National Constitution Day is celebrated in Bangladesh on February 4. The constitution of Bangladesh was adopted on February 4, 1972. It is the supreme law of Bangladesh. Through the adoption of the constitution, Bangladesh was established as a sovereign state. Bangabandhu Sheikh Mujibur Rahman played an important role in drafting the constitution. The constitution drafting committee was formed with 34 members. Dr. Kamal Hossain was its president. The constitution defines the basic principles, human rights, citizens' rights and structure of the state of Bangladesh. Nationalism, socialism, democracy and secularism are declared as basic principles in the constitution. Various events are organized on Constitution Day. There is a government holiday. The importance of the constitution is highlighted on Constitution Day. Special sessions are held in the National Parliament. Special programs are broadcast on television and radio. Constitution Day is a symbol of Bangladesh's democratic journey.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Constitution_of_Bangladesh.jpg/440px-Constitution_of_Bangladesh.jpg"
  },
  {
    id: "feb_002",
    day: 14,
    month: 2,
    year: 0,
    titleBn: "ভালোবাসা দিবস",
    titleEn: "Valentine's Day",
    type: "cultural",
    color: "#FF69B4",
    descriptionBn: "ভালোবাসা দিবস প্রতিবছর ১৪ ফেব্রুয়ারি পালিত হয়। এটি প্রেমিকদের জন্য একটি বিশেষ দিন। প্রেমিকরা এই দিনে তাদের প্রেমকে প্রকাশ করে। ফুল, চকোলেট, উপহার ও কার্ড বিনিময় করা হয়। লাল গোলাপ ভালোবাসার প্রতীক হিসেবে বিবেচিত হয়। তরুণ-তরুণীরা এই দিনে বিশেষ আয়োজন করে। রেস্টুরেন্ট ও ক্যাফেতে বিশেষ অফার থাকে। শপিং মলে বিশেষ ছাড় দেওয়া হয়। সামাজিক যোগাযোগ মাধ্যমে প্রিয়জনদের শুভেচ্ছা জানানো হয়। বাংলাদেশে ভালোবাসা দিবস জনপ্রিয়তা পাচ্ছে। তরুণ প্রজন্মের মধ্যে এটি বিশেষ জনপ্রিয়। ভালোবাসা দিবস মানুষের মনে ভালোবাসা ও আন্তরিকতা জাগায়। এই দিনে মানুষ তাদের প্রিয়জনদের কাছে সময় দেয়। ভালোবাসা দিবস মানুষের সম্পর্ক শক্ত করে। এটি মানুষের মনে সুখ ও আনন্দ আনে।",
    descriptionEn: "Valentine's Day is celebrated every year on February 14. It is a special day for lovers. Lovers express their love on this day. Flowers, chocolates, gifts and cards are exchanged. Red rose is considered a symbol of love. Young men and women make special arrangements on this day. There are special offers in restaurants and cafes. Special discounts are given in shopping malls. Loved ones are greeted through social media. Valentine's Day is gaining popularity in Bangladesh. It is especially popular among the young generation. Valentine's Day awakens love and sincerity in people's minds. On this day, people spend time with their loved ones. Valentine's Day strengthens people's relationships. It brings happiness and joy to people's minds.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Valentine%27s_Day_hearts.jpg/640px-Valentine%27s_Day_hearts.jpg"
  },
  {
    id: "feb_003",
    day: 21,
    month: 2,
    year: 1952,
    titleBn: "ভাষা আন্দোলন দিবস / শহীদ দিবস",
    titleEn: "Language Movement Day / Martyrs' Day",
    type: "historical",
    color: "#C41E3A",
    descriptionBn: "১৯৫২ সালের ২১ ফেব্রুয়ারি বাংলা ভাষার জন্য আত্মত্যাগের দিন। পাকিস্তান সরকার উর্দুকে একমাত্র রাষ্ট্রভাষা ঘোষণা করলে বাঙালিরা ভাষা আন্দোলন শুরু করে। ১৯৫২ সালের ২১ ফেব্রুয়ারি ছাত্ররা ১৪৪ ধারা ভঙ্গ করে আন্দোলন শুরু করে। পুলিশের গুলিতে আব্দুস সালাম, আবুল বরকত, আব্দুল জব্বার ও রফিক উদ্দিন আহমেদ শহীদ হন। পরবর্তীতে আরও অনেকে শহীদ হন। এই দিনটি বাংলাদেশে শহীদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস হিসেবে পালিত হয়। জাতিসংঘ ১৯৯৯ সালে ২১ ফেব্রুয়ারিকে আন্তর্জাতিক মাতৃভাষা দিবস হিসেবে ঘোষণা করে। এই দিনে শহীদ মিনারে ফুল দিয়ে শহীদদের প্রতি শ্রদ্ধা জানানো হয়। একুশে পদচারিতা হয়। সাংস্কৃতিক অনুষ্ঠানের আয়োজন করা হয়। গান, নাচ ও আবৃত্তি হয়। সরকারি ছুটি থাকে। ভাষা আন্দোলন দিবস বাংলাদেশের ইতিহাসে এক গুরুত্বপূর্ণ দিন। এই দিন থেকেই বাঙালির জাতীয়তাবোধ জাগ্রত হয়।",
    descriptionEn: "February 21, 1952 is the day of sacrifice for the Bengali language. When the Pakistani government declared Urdu as the sole state language, Bengalis started the language movement. On February 21, 1952, students started the movement by violating Section 144. Abdus Salam, Abul Barkat, Abdul Jabbar and Rafiq Uddin Ahmed were martyred by police gunfire. Later many others were martyred. This day is celebrated in Bangladesh as Martyrs' Day and International Mother Language Day. The United Nations declared February 21 as International Mother Language Day in 1999. On this day, martyrs are honored by offering flowers at the Shaheed Minar. Ekushey procession is held. Cultural events are organized. Songs, dances and recitations are held. There is a government holiday. Language Movement Day is an important day in the history of Bangladesh. Bengali national consciousness was awakened from this day.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Shaheed_Minar_Dhaka.jpg/640px-Shaheed_Minar_Dhaka.jpg"
  },
  {
    id: "feb_004",
    day: 21,
    month: 2,
    year: 0,
    titleBn: "আন্তর্জাতিক মাতৃভাষা দিবস",
    titleEn: "International Mother Language Day",
    type: "national",
    color: "#C41E3A",
    descriptionBn: "২১ ফেব্রুয়ারি আন্তর্জাতিক মাতৃভাষা দিবস। বাংলাদেশের ভাষা আন্দোলনের স্বীকৃতিস্বরূপ জাতিসংঘ এই দিনটি আন্তর্জাতিক মাতৃভাষা দিবস হিসেবে ঘোষণা করে। ১৯৯৯ সালে জাতিসংঘ সাধারণ পরিষদ ২১ ফেব্রুয়ারিকে আন্তর্জাতিক মাতৃভাষা দিবস হিসেবে ঘোষণা করে। এর মাধ্যমে বিশ্বব্যাপী মাতৃভাষার গুরুত্ব তুলে ধরা হয়। বিশ্বের প্রতিটি দেশে এই দিনটি পালিত হয়। বিভিন্ন ভাষা ও সংস্কৃতির প্রতি শ্রদ্ধা জানানো হয়। ভাষা বৈচিত্র্য রক্ষায় গুরুত্ব দেওয়া হয়। বাংলাদেশে এই দিনটি বিশেষ গুরুত্বের সাথে পালিত হয়। শহীদ মিনারে ফুল দিয়ে শহীদদের প্রতি শ্রদ্ধা জানানো হয়। একুশে পদচারিতা হয়। সাংস্কৃতিক অনুষ্ঠানের আয়োজন করা হয়। বিভিন্ন দেশ থেকে প্রতিনিধিরা বাংলাদেশে আসেন। আন্তর্জাতিক মাতৃভাষা ইনস্টিটিউট বিশেষ অনুষ্ঠানের আয়োজন করে। আন্তর্জাতিক মাতৃভাষা দিবস বাংলাদেশের জন্য এক গৌরবের বিষয়।",
    descriptionEn: "February 21 is International Mother Language Day. In recognition of Bangladesh's language movement, the United Nations declared this day as International Mother Language Day. In 1999, the United Nations General Assembly declared February 21 as International Mother Language Day. Through this, the importance of mother tongue is highlighted worldwide. This day is celebrated in every country of the world. Respect is shown to various languages and cultures. Importance is given to protecting language diversity. In Bangladesh, this day is celebrated with special importance. Martyrs are honored by offering flowers at the Shaheed Minar. Ekushey procession is held. Cultural events are organized. Representatives from various countries come to Bangladesh. International Mother Language Institute organizes special events. International Mother Language Day is a matter of pride for Bangladesh.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/International_Mother_Language_Day_logo.svg/440px-International_Mother_Language_Day_logo.svg.png"
  },
  {
    id: "feb_005",
    day: 23,
    month: 2,
    year: 1948,
    titleBn: "জিন্নাহর ঢাকা সফর",
    titleEn: "Jinnah's Dhaka Visit",
    type: "historical",
    color: "#8B0000",
    descriptionBn: "১৯৪৮ সালের ২৩ ফেব্রুয়ারি পাকিস্তানের গভর্নর জেনারেল মুহাম্মদ আলী জিন্নাহ ঢাকায় আসেন। তিনি ঢাকার রেসকোর্স ময়দানে (বর্তমান সোহরাওয়ার্দী উদ্যান) এক জনসভায় ভাষণ দেন। সেখানে তিনি ঘোষণা দেন যে উর্দুই হবে পাকিস্তানের একমাত্র রাষ্ট্রভাষা। এর প্রতিবাদে ছাত্ররা আন্দোলন শুরু করে। এই ঘটনা ভাষা আন্দোলনের সূচনা হিসেবে বিবেচিত হয়। জিন্নাহর এই ঘোষণা বাঙালিদের মধ্যে ক্ষোভের সৃষ্টি করে। বাঙালিরা তাদের মাতৃভাষার অধিকার আদায়ে আন্দোলন শুরু করে। এই আন্দোলন পরবর্তীতে ১৯৫২ সালে শহীদের রক্তে রঞ্জিত হয়। জিন্নাহর ঢাকা সফর বাংলাদেশের ইতিহাসে এক গুরুত্বপূর্ণ ঘটনা। এই ঘটনা থেকেই বাঙালির জাতীয়তাবোধ জাগ্রত হতে শুরু করে। ভাষা আন্দোলনের ফলে বাংলা ভাষা পাকিস্তানের অন্যতম রাষ্ট্রভাষা হিসেবে স্বীকৃতি পায়।",
    descriptionEn: "On February 23, 1948, Pakistan's Governor General Muhammad Ali Jinnah came to Dhaka. He gave a speech at a public meeting at the Race Course Maidan (now Suhrawardy Udyan) in Dhaka. There he announced that Urdu would be the only state language of Pakistan. Students started a movement in protest. This event is considered the beginning of the language movement. Jinnah's announcement created resentment among Bengalis. Bengalis started a movement to secure the rights of their mother tongue. This movement was later colored by the blood of martyrs in 1952. Jinnah's Dhaka visit is an important event in the history of Bangladesh. Bengali national consciousness started to awaken from this event. As a result of the language movement, Bengali language was recognized as one of the state languages of Pakistan.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Muhammad_Ali_Jinnah_portrait.jpg/440px-Muhammad_Ali_Jinnah_portrait.jpg"
  },
  {
    id: "feb_006",
    day: 15,
    month: 2,
    year: 1898,
    titleBn: "জসীমউদদীনের জন্মদিন",
    titleEn: "Jasimuddin's Birthday",
    type: "person",
    color: "#D4A017",
    descriptionBn: "পল্লিকবি জসীমউদদীনের জন্মদিন। তিনি ১৮৯৮ সালের ১৫ ফেব্রুয়ারি ফরিদপুর জেলার আমবাড়িয়া গ্রামে জন্মগ্রহণ করেন। তার পিতার নাম মোতাহার উদ্দিন ও মাতার নাম আমেনা খাতুন। তিনি বাংলার গ্রামীণ জীবন নিয়ে কবিতা লিখেছেন। নকশী কাঁথার মাঠ, সোজন বাড়ির গান, মাটির কান্না তার অন্যতম বিখ্যাত কাজ। তার কবিতায় বাংলার গ্রামীণ সংস্কৃতি ও জীবন ফুটে উঠেছে। তিনি ঢাকা বিশ্ববিদ্যালয় থেকে স্নাতকোত্তর ডিগ্রি অর্জন করেন। তিনি রেডিও ও টেলিভিশনে কাজ করেছেন। তিনি বাংলা সাহিত্যে অবদানের জন্য একুশে পদক ও বাংলা একাডেমি পুরস্কার পান। ১৯৮৫ সালে তিনি মৃত্যুবরণ করেন। জসীমউদদীন বাংলা সাহিত্যের অন্যতম শ্রেষ্ঠ কবি। তার জন্মদিন প্রতিবছর যথাযথভাবে পালিত হয়।",
    descriptionEn: "Birth anniversary of Polli Kobi Jasimuddin. He was born on February 15, 1898 in Ambiaya village of Faridpur district. His father's name was Motahar Uddin and mother's name was Amina Khatun. He wrote poems about rural life of Bengal. Nakshi Kanthar Math, Sojan Badiyar Ghat, Matir Kanna are his famous works. Rural culture and life of Bengal are reflected in his poetry. He obtained his postgraduate degree from Dhaka University. He worked in radio and television. He received Ekushey Padak and Bangla Academy Award for his contribution to Bengali literature. He passed away in 1985. Jasimuddin is one of the greatest poets of Bengali literature. His birthday is celebrated every year with due respect.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Jasimuddin.jpg/440px-Jasimuddin.jpg"
  },
  {
    id: "feb_007",
    day: 25,
    month: 2,
    year: 1914,
    titleBn: "শামসুর রাহমানের জন্মদিন",
    titleEn: "Shamsur Rahman's Birthday",
    type: "person",
    color: "#1E3A5F",
    descriptionBn: "আধুনিক বাংলা কবিতার অন্যতম শ্রেষ্ঠ কবি শামসুর রাহমানের জন্মদিন। তিনি ১৯১৪ সালের ২৫ ফেব্রুয়ারি ঢাকার মাহুততলীতে জন্মগ্রহণ করেন। তার পিতার নাম মুখলেসুর রহমান ও মাতার নাম আমেনা খাতুন। তিনি ঢাকা বিশ্ববিদ্যালয় থেকে ইংরেজি সাহিত্যে স্নাতকোত্তর ডিগ্রি অর্জন করেন। তিনি দীর্ঘদিন সরকারি চাকরিতে ছিলেন। তার কবিতায় সমকালীন বাস্তবতা ফুটে উঠেছে। স্বাধীনতা আন্দোলন ও মুক্তিযুদ্ধ তার কবিতায় গুরুত্বপূর্ণ স্থান পেয়েছে। স্বাধীনতা শিরোনাম, বন্দী শিরোনাম, আমার দেশ তার অন্যতম বিখ্যাত কাব্যগ্রন্থ। তিনি একুশে পদক, বাংলা একাডেমি পুরস্কার ও স্বাধীনতা পদক পান। ২০০৬ সালে তিনি মৃত্যুবরণ করেন। শামসুর রাহমান আধুনিক বাংলা কবিতার অন্যতম প্রধান কবি।",
    descriptionEn: "Birth anniversary of one of the greatest modern Bengali poets Shamsur Rahman. He was born on February 25, 1914 in Mahuttuli, Dhaka. His father's name was Mokhlesur Rahman and mother's name was Amina Khatun. He obtained his postgraduate degree in English literature from Dhaka University. He was in government service for a long time. Contemporary reality is reflected in his poetry. Independence movement and liberation war have important place in his poetry. Swadhinata Shironam, Bondi Shironam, Amar Desh are his famous poetry books. He received Ekushey Padak, Bangla Academy Award and Independence Award. He passed away in 2006. Shamsur Rahman is one of the major poets of modern Bengali poetry.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Shamsur_Rahman.jpg/440px-Shamsur_Rahman.jpg"
  },
  {
    id: "feb_008",
    day: 28,
    month: 2,
    year: 0,
    titleBn: "জাতীয় গণতন্ত্র দিবস",
    titleEn: "National Democracy Day",
    type: "national",
    color: "#228B22",
    descriptionBn: "২৮ ফেব্রুয়ারি জাতীয় গণতন্ত্র দিবস। ১৯৯৬ সালের ২৮ ফেব্রুয়ারি বাংলাদেশে সংসদীয় গণতন্ত্র পুনঃপ্রতিষ্ঠিত হয়। ১৯৯১ সালে সংসদীয় গণতন্ত্র প্রবর্তন হলেও ১৯৯৬ সালে নিরপেক্ষ তত্ত্বাবধায়ক সরকারের অধীনে নির্বাচন হয়। এর মাধ্যমে গণতন্ত্র পুনঃপ্রতিষ্ঠিত হয়। এই দিনটি জাতীয় গণতন্ত্র দিবস হিসেবে পালিত হয়। গণতন্ত্র মানুষের অধিকার ও স্বাধীনতার প্রতীক। গণতন্ত্রে মানুষ তাদের প্রতিনিধি নির্বাচন করে। গণতন্ত্রে সবার সমান অধিকার থাকে। বাংলাদেশে গণতন্ত্র রক্ষায় গুরুত্ব দেওয়া হয়। জাতীয় গণতন্ত্র দিবসে বিভিন্ন অনুষ্ঠানের আয়োজন করা হয়। সেমিনার ও আলোচনা সভা হয়। গণতন্ত্রের গুরুত্ব তুলে ধরা হয়। টেলিভিশন ও রেডিওতে বিশেষ অনুষ্ঠান প্রচার করা হয়। জাতীয় গণতন্ত্র দিবস বাংলাদেশের গণতান্ত্রিক যাত্রার প্রতীক।",
    descriptionEn: "February 28 is National Democracy Day. Parliamentary democracy was re-established in Bangladesh on February 28, 1996. Although parliamentary democracy was introduced in 1991, elections were held under a neutral caretaker government in 1996. Through this, democracy was re-established. This day is celebrated as National Democracy Day. Democracy is a symbol of people's rights and freedom. In democracy, people elect their representatives. Everyone has equal rights in democracy. Importance is given to protecting democracy in Bangladesh. Various events are organized on National Democracy Day. Seminars and discussion sessions are held. The importance of democracy is highlighted. Special programs are broadcast on television and radio. National Democracy Day is a symbol of Bangladesh's democratic journey.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Parliament_of_Bangladesh.jpg/640px-Parliament_of_Bangladesh.jpg"
  }
];

async function addEvents() {
  for (const event of februaryEvents) {
    try {
      const response = await axios.post(API_URL, event);
      console.log(`Added: ${event.titleEn}`);
    } catch (error) {
      console.error(`Error adding ${event.titleEn}:`, error.response ? error.response.data : error.message);
    }
  }
  console.log('All February events added successfully!');
}

addEvents();
