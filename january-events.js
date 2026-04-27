const axios = require('axios');

const API_URL = 'http://104.248.202.152:3000/api/events';

const januaryEvents = [
  {
    id: "jan_001",
    day: 1,
    month: 1,
    year: 0,
    titleBn: "নববর্ষ",
    titleEn: "New Year's Day",
    type: "cultural",
    color: "#D4A017",
    descriptionBn: "নববর্ষ হলো বছরের প্রথম দিন। গ্রেগরীয় বর্ষপঞ্জি অনুযায়ী ১ জানুয়ারি নববর্ষ হিসেবে পালিত হয়। বিশ্বব্যাপী এই দিনটি উৎসবমুখর পরিবেশে পালিত হয়। বাংলাদেশেও নববর্ষ পালন করা হয়। বিভিন্ন সামাজিক ও সাংস্কৃতিক সংগঠন নববর্ষ উপলক্ষে বিশেষ অনুষ্ঠানের আয়োজন করে। নববর্ষের প্রাক্কালে মানুষ আতশবাজি ফাটায় এবং নতুন বছরকে স্বাগত জানায়। বিভিন্ন টেলিভিশন চ্যানেল ও রেডিও স্টেশন বিশেষ অনুষ্ঠান প্রচার করে। নববর্ষ মানুষের মনে নতুন আশা ও স্বপ্ন জাগায়। মানুষ নতুন বছরে নতুন সংকল্প করে। নববর্ষ মানুষকে অতীতের ভুল ভুলে নতুন করে শুরু করার সুযোগ দেয়। বাংলাদেশে সরকারি ছুটি থাকে না তবে বিভিন্ন প্রতিষ্ঠান ছুটি দেয়। শপিং মল ও বিনোদন কেন্দ্রগুলোতে বিশেষ ছাড় দেওয়া হয়। নববর্ষ উপলক্ষে বিভিন্ন খেলাধুলা ও প্রতিযোগিতার আয়োজন করা হয়। সামাজিক যোগাযোগ মাধ্যমে মানুষ প্রিয়জনদের নববর্ষের শুভেচ্ছা জানায়। নববর্ষ মানুষের মধ্যে আনন্দ ও উৎসবের আমেজ তৈরি করে।",
    descriptionEn: "New Year's Day is the first day of the year. According to the Gregorian calendar, January 1 is celebrated as New Year. This day is celebrated in a festive atmosphere all over the world. New Year is also celebrated in Bangladesh. Various social and cultural organizations organize special events on the occasion of New Year. On New Year's Eve, people set off fireworks and welcome the new year. Various television channels and radio stations broadcast special programs. New Year awakens new hopes and dreams in people's minds. People make new resolutions in the new year. New Year gives people the opportunity to forget past mistakes and start anew. There is no government holiday in Bangladesh, but various institutions give holidays. Special discounts are given at shopping malls and entertainment centers. Various sports and competitions are organized on the occasion of New Year. People send New Year greetings to their loved ones through social media. New Year creates an atmosphere of joy and celebration among people.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Fireworks_over_Sydney_Opera_House_Silvester_2014-15_crop.jpg/640px-Fireworks_over_Sydney_Opera_House_Silvester_2014-15_crop.jpg"
  },
  {
    id: "jan_002",
    day: 10,
    month: 1,
    year: 1972,
    titleBn: "বঙ্গবন্ধুর স্বদেশ প্রত্যাবর্তন দিবস",
    titleEn: "Bangabandhu's Homecoming Day",
    type: "historical",
    color: "#1E3A5F",
    descriptionBn: "১৯৭২ সালের ১০ জানুয়ারি জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান পাকিস্তানের কারাগার থেকে মুক্তি পেয়ে স্বাধীন বাংলাদেশে ফিরে আসেন। ১৯৭১ সালের ২৫ মার্চ পাকিস্তানি বাহিনী বঙ্গবন্ধুকে গ্রেফতার করে পশ্চিম পাকিস্তানে নিয়ে যায়। সেখানে তাকে মিয়ানওয়ালি কারাগারে রাখা হয়। মুক্তিযুদ্ধ চলাকালীন বঙ্গবন্ধু কারাগারে ছিলেন। ১৯৭১ সালের ১৬ ডিসেম্বর বাংলাদেশ স্বাধীন হলেও বঙ্গবন্ধু তখনও কারাগারে ছিলেন। বিশ্বব্যাপী বঙ্গবন্ধুর মুক্তির দাবি ওঠে। অবশেষে ১৯৭২ সালের ৮ জানুয়ারি পাকিস্তান সরকার বঙ্গবন্ধুকে মুক্তি দিতে বাধ্য হয়। ১০ জানুয়ারি বঙ্গবন্ধু লন্ডন হয়ে দিল্লি যান। সেখান থেকে তিনি ঢাকার উদ্দেশ্যে রওনা হন। ১০ জানুয়ারি বিকেলে বঙ্গবন্ধু ঢাকার কুর্মিটোলা বিমানবন্দরে পৌঁছান। লাখ লাখ মানুষ বিমানবন্দরে তাকে স্বাগত জানাতে উপস্থিত হয়। বঙ্গবন্ধু জনসভায় ভাষণ দেন এবং সবাইকে ধন্যবাদ জানান। এই দিনটি বাংলাদেশে বঙ্গবন্ধুর স্বদেশ প্রত্যাবর্তন দিবস হিসেবে পালিত হয়। সরকারি ছুটি থাকে। বিভিন্ন অনুষ্ঠানের আয়োজন করা হয়। বঙ্গবন্ধুর স্বদেশ প্রত্যাবর্তন বাঙালি জাতির জন্য এক ঐতিহাসিক মুহূর্ত ছিল।",
    descriptionEn: "On January 10, 1972, Father of the Nation Bangabandhu Sheikh Mujibur Rahman returned to independent Bangladesh after being released from prison in Pakistan. On March 25, 1971, Pakistani forces arrested Bangabandhu and took him to West Pakistan. He was kept in Mianwali prison there. Bangabandhu was in prison during the liberation war. Even after Bangladesh became independent on December 16, 1971, Bangabandhu was still in prison. Demands for Bangabandhu's release arose worldwide. Finally, on January 8, 1972, the Pakistani government was forced to release Bangabandhu. On January 10, Bangabandhu went to Delhi via London. From there he left for Dhaka. On the afternoon of January 10, Bangabandhu arrived at Kurmitola Airport in Dhaka. Millions of people gathered at the airport to welcome him. Bangabandhu addressed the public meeting and thanked everyone. This day is celebrated in Bangladesh as Bangabandhu's Homecoming Day. There is a government holiday. Various events are organized. Bangabandhu's homecoming was a historic moment for the Bengali nation.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sheikh_Mujibur_Rahman_in_1972.jpg/440px-Sheikh_Mujibur_Rahman_in_1972.jpg"
  },
  {
    id: "jan_003",
    day: 12,
    month: 1,
    year: 0,
    titleBn: "শবে বরাত",
    titleEn: "Shab-e-Barat",
    type: "religious",
    color: "#1E3A5F",
    descriptionBn: "শবে বরাত ইসলাম ধর্মের একটি গুরুত্বপূর্ণ রাত। আরবি শব্দ 'শব' অর্থ রাত এবং 'বরাত' অর্থ মুক্তি বা নিরাপত্তা। শবে বরাত মহররম মাসের ১৪ তারিখের রাতে পালিত হয়। মুসলমানদের বিশ্বাস অনুযায়ী এই রাতে আল্লাহ মানুষের ভাগ্য নির্ধারণ করেন। এই রাতে মানুষ যা চায় আল্লাহ তা পূরণ করেন। মুসলমানরা এই রাতে বিশেষ নামাজ ও দোয়া করেন। মসজিদে বিশেষ আয়োজন করা হয়। কবরস্থানে গিয়ে মৃতদের জন্য দোয়া করা হয়। ফুল ও চাদর দিয়ে কবর সাজানো হয়। ঘরে ঘরে বিশেষ খাবার রান্না করা হয়। হালুয়া ও অন্যান্য মিষ্টি বিতরণ করা হয়। দরিদ্রদের খাবার ও টাকা দেওয়া হয়। শিশুরা আতশবাজি ও ফটকা ফাটায়। বাংলাদেশে শবে বরাত ধর্মীয় উৎসব হিসেবে পালিত হয়। সরকারি ছুটি থাকে না তবে অনেক প্রতিষ্ঠান ছুটি দেয়। শবে বরাত মুসলমানদের জন্য একটি পবিত্র রাত। এই রাতে মানুষ আল্লাহর কাছে ক্ষমা চায় এবং নিজেদের ভাগ্য উন্নতির জন্য প্রার্থনা করে। শবে বরাত মানুষের মনে আধ্যাত্মিক শান্তি আনে।",
    descriptionEn: "Shab-e-Barat is an important night in Islam. The Arabic word 'Shab' means night and 'Barat' means freedom or security. Shab-e-Barat is observed on the night of the 14th of Muharram. According to Muslim belief, Allah determines people's fate on this night. On this night, Allah fulfills whatever people want. Muslims offer special prayers and supplications on this night. Special arrangements are made in mosques. People go to cemeteries and pray for the dead. Graves are decorated with flowers and sheets. Special food is cooked in every house. Halua and other sweets are distributed. Food and money are given to the poor. Children set off fireworks and crackers. In Bangladesh, Shab-e-Barat is celebrated as a religious festival. There is no government holiday but many institutions give holidays. Shab-e-Barat is a holy night for Muslims. On this night, people ask Allah for forgiveness and pray for the improvement of their fate. Shab-e-Barat brings spiritual peace to people's minds.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Mosque_at_night.jpg/640px-Mosque_at_night.jpg"
  },
  {
    id: "jan_004",
    day: 13,
    month: 1,
    year: 0,
    titleBn: "সরস্বতী পূজা",
    titleEn: "Saraswati Puja",
    type: "religious",
    color: "#FFD700",
    descriptionBn: "সরস্বতী পূজা হিন্দু সম্প্রদায়ের অন্যতম প্রধান ধর্মীয় উৎসব। সরস্বতী হিন্দুদের জ্ঞান ও শিক্ষার দেবী। বসন্ত পঞ্চমীতে এই পূজা অনুষ্ঠিত হয়। সাধারণত মাঘ মাসের শুক্লপক্ষের পঞ্চমী তিথিতে সরস্বতী পূজা হয়। এই দিনে হিন্দু সম্প্রদায়ের মানুষ সরস্বতী দেবীর পূজা করে। বিদ্যালয়, কলেজ ও বিশ্ববিদ্যালয়ে বিশেষ আয়োজন করা হয়। শিক্ষা প্রতিষ্ঠানে সরস্বতী পূজার মণ্ডপ স্থাপন করা হয়। ছাত্র-ছাত্রীরা পূজায় অংশগ্রহণ করে। সরস্বতী দেবীর প্রতিমা সাজানো হয়। হলুদ ও সাদা রঙের শাড়ি পরা হয়। ফুল ও ফল দিয়ে পূজা করা হয়। প্রসাদ বিতরণ করা হয়। সাংস্কৃতিক অনুষ্ঠানের আয়োজন করা হয়। গান, নাচ ও আবৃত্তি হয়। বাংলাদেশে সরস্বতী পূজা ধর্মীয় উৎসব হিসেবে পালিত হয়। সরকারি ছুটি থাকে না তবে শিক্ষা প্রতিষ্ঠানে ছুটি থাকে। সরস্বতী পূজা শিক্ষা ও জ্ঞানের প্রতীক। এই পূজায় ছাত্র-ছাত্রীরা জ্ঞান অর্জনের জন্য প্রার্থনা করে। সরস্বতী পূজা হিন্দু সম্প্রদায়ের সংস্কৃতির অংশ।",
    descriptionEn: "Saraswati Puja is one of the major religious festivals of the Hindu community. Saraswati is the goddess of knowledge and education of Hindus. This puja is held on Basant Panchami. Usually Saraswati Puja is held on the fifth day of the waxing moon of Magh month. On this day, people of the Hindu community worship Goddess Saraswati. Special arrangements are made in schools, colleges and universities. Saraswati Puja pandals are set up in educational institutions. Students participate in the puja. The idol of Goddess Saraswati is decorated. Yellow and white sarees are worn. Puja is performed with flowers and fruits. Prasad is distributed. Cultural events are organized. Songs, dances and recitations are held. In Bangladesh, Saraswati Puja is celebrated as a religious festival. There is no government holiday but there is a holiday in educational institutions. Saraswati Puja is a symbol of education and knowledge. In this puja, students pray for acquiring knowledge. Saraswati Puja is part of the culture of the Hindu community.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Saraswati_idol_in_Kolkata.jpg/640px-Saraswati_idol_in_Kolkata.jpg"
  },
  {
    id: "jan_005",
    day: 18,
    month: 1,
    year: 1925,
    titleBn: "সৈয়দ নজরুল ইসলামের জন্মদিন",
    titleEn: "Syed Nazrul Islam's Birthday",
    type: "person",
    color: "#1E3A5F",
    descriptionBn: "সৈয়দ নজরুল ইসলাম বাংলাদেশের একজন প্রখ্যাত রাজনীতিবিদ ও মুক্তিযুদ্ধের অন্যতম নেতা। তিনি ১৯২৫ সালের ১৮ জানুয়ারি কিশোরগঞ্জ জেলার বাজিতপুর উপজেলার সৈয়দপুর গ্রামে জন্মগ্রহণ করেন। তার পিতার নাম সৈয়দ আবদুল হামিদ ও মাতার নাম সৈয়দা শাহার বানু। তিনি ঢাকা বিশ্ববিদ্যালয় থেকে স্নাতকোত্তর ডিগ্রি অর্জন করেন। তিনি আওয়ামী লীগের একজন প্রভাবশালী নেতা ছিলেন। ১৯৭১ সালে মুক্তিযুদ্ধ শুরু হলে বঙ্গবন্ধু শেখ মুজিবুর রহমান গ্রেফতার হলে সৈয়দ নজরুল ইসলাম অস্থায়ী সরকারের ভারপ্রাপ্ত রাষ্ট্রপতির দায়িত্ব পালন করেন। তিনি মুজিবনগর সরকারের অন্যতম প্রধান সদস্য ছিলেন। মুক্তিযুদ্ধে তার অবদান অনস্বীকার্য। ১৯৭৫ সালের ৩ নভেম্বর জেল হত্যায় তিনি শহীদ হন। বাংলাদেশ সরকার তাকে জাতীয় নেতা হিসেবে স্বীকৃতি দিয়েছে। তার জন্মদিন প্রতিবছর যথাযথভাবে পালিত হয়। বিভিন্ন অনুষ্ঠানের আয়োজন করা হয়। সৈয়দ নজরুল ইসলাম বাংলাদেশের স্বাধীনতা আন্দোলনে গুরুত্বপূর্ণ ভূমিকা পালন করেছেন।",
    descriptionEn: "Syed Nazrul Islam was a prominent politician of Bangladesh and one of the leaders of the liberation war. He was born on January 18, 1925 in Syedpur village of Bajitpur upazila of Kishoreganj district. His father's name was Syed Abdul Hamid and mother's name was Syeda Shahar Banu. He obtained his postgraduate degree from Dhaka University. He was an influential leader of Awami League. When the liberation war started in 1971 and Bangabandhu Sheikh Mujibur Rahman was arrested, Syed Nazrul Islam served as the acting president of the interim government. He was one of the main members of the Mujibnagar government. His contribution to the liberation war is undeniable. He was martyred in the jail killing on November 3, 1975. The Government of Bangladesh has recognized him as a national leader. His birthday is celebrated every year with due respect. Various events are organized. Syed Nazrul Islam played an important role in Bangladesh's independence movement.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Syed_Nazrul_Islam.jpg/440px-Syed_Nazrul_Islam.jpg"
  },
  {
    id: "jan_006",
    day: 20,
    month: 1,
    year: 1972,
    titleBn: "জাতীয় শিক্ষক দিবস",
    titleEn: "National Teachers' Day",
    type: "national",
    color: "#C41E3A",
    descriptionBn: "জাতীয় শিক্ষক দিবস বাংলাদেশে ২০ জানুয়ারি পালিত হয়। ১৯৭২ সালের ২০ জানুয়ারি বাংলাদেশের তৎকালীন রাষ্ট্রপতি বঙ্গবন্ধু শেখ মুজিবুর রহমান শিক্ষকদের দাবি মেনে তাদের জন্য বিশেষ সুবিধা ঘোষণা করেন। এই দিনটি জাতীয় শিক্ষক দিবস হিসেবে পালিত হয়। শিক্ষকরা জাতি গঠনে গুরুত্বপূর্ণ ভূমিকা পালন করেন। তারা ছাত্র-ছাত্রীদের শিক্ষা দিয়ে দেশের উন্নতিতে অবদান রাখেন। জাতীয় শিক্ষক দিবসে শিক্ষকদের সম্মান জানানো হয়। বিভিন্ন অনুষ্ঠানের আয়োজন করা হয়। শিক্ষা মন্ত্রণালয় বিশেষ কর্মসূচি গ্রহণ করে। শিক্ষকদের পুরস্কার ও সম্মাননা দেওয়া হয়। শিক্ষা প্রতিষ্ঠানে বিশেষ অনুষ্ঠান হয়। ছাত্র-ছাত্রীরা শিক্ষকদের ফুল ও উপহার দেয়। সামাজিক যোগাযোগ মাধ্যমে শিক্ষকদের শুভেচ্ছা জানানো হয়। জাতীয় শিক্ষক দিবস শিক্ষকদের অবদানের স্বীকৃতি। এই দিনটি শিক্ষকদের অনুপ্রেরণা জোগায়। শিক্ষকরা এই দিনে তাদের অবদানের জন্য সম্মানিত হন। জাতীয় শিক্ষক দিবস বাংলাদেশের শিক্ষা ব্যবস্থার উন্নতিতে ভূমিকা রাখে।",
    descriptionEn: "National Teachers' Day is celebrated in Bangladesh on January 20. On January 20, 1972, the then President of Bangladesh Bangabandhu Sheikh Mujibur Rahman announced special facilities for teachers accepting their demands. This day is celebrated as National Teachers' Day. Teachers play an important role in nation building. They contribute to the country's development by educating students. Teachers are honored on National Teachers' Day. Various events are organized. The Ministry of Education takes special programs. Teachers are given awards and honors. Special events are held in educational institutions. Students give flowers and gifts to teachers. Teachers are greeted through social media. National Teachers' Day is a recognition of teachers' contributions. This day inspires teachers. Teachers are honored for their contributions on this day. National Teachers' Day plays a role in the development of Bangladesh's education system.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Teacher_and_students.jpg/640px-Teacher_and_students.jpg"
  },
  {
    id: "jan_007",
    day: 26,
    month: 1,
    year: 1950,
    titleBn: "ভাষা আন্দোলনের সূচনা",
    titleEn: "Beginning of Language Movement",
    type: "historical",
    color: "#C41E3A",
    descriptionBn: "১৯৫০ সালের ২৬ জানুয়ারি পূর্ব বাংলার রাজনীতিতে বাংলা ভাষা আন্দোলনের সূচনা হয়। পাকিস্তান সরকার উর্দুকে একমাত্র রাষ্ট্রভাষা ঘোষণা করতে চাইলে বাঙালিরা আন্দোলন শুরু করে। ধীরেন্দ্রনাথ দত্ত প্রথম বাংলা ভাষার দাবি উত্থাপন করেন। ১৯৪৮ সালের ২৩ ফেব্রুয়ারি মুহাম্মদ আলী জিন্নাহ ঢাকায় এসে ঘোষণা দেন যে উর্দুই হবে পাকিস্তানের একমাত্র রাষ্ট্রভাষা। এর প্রতিবাদে ছাত্ররা আন্দোলন শুরু করে। ১৯৫২ সালের ২১ ফেব্রুয়ারি ভাষা আন্দোলনে শহীদ হন। ভাষা আন্দোলন বাংলাদেশের ইতিহাসে এক গুরুত্বপূর্ণ অধ্যায়। এই আন্দোলন থেকেই বাঙালির জাতীয়তাবোধ জাগ্রত হয়। ভাষা আন্দোলনের ফলে বাংলা ভাষা পাকিস্তানের অন্যতম রাষ্ট্রভাষা হিসেবে স্বীকৃতি পায়। পরবর্তীতে এই আন্দোলন স্বাধীনতা আন্দোলনে রূপ নেয়। ভাষা আন্দোলনের শহীদদের স্মরণে শহীদ মিনার নির্মাণ করা হয়। ২১ ফেব্রুয়ারি আন্তর্জাতিক মাতৃভাষা দিবস হিসেবে পালিত হয়। ভাষা আন্দোলন বাঙালির অধিকার আদায়ের প্রতীক।",
    descriptionEn: "The Bengali language movement began in the politics of East Bengal on January 26, 1950. When the Pakistani government wanted to declare Urdu as the sole state language, Bengalis started a movement. Dhirendranath Dutt first raised the demand for Bengali language. On February 23, 1948, Muhammad Ali Jinnah came to Dhaka and announced that Urdu would be the only state language of Pakistan. Students started a movement in protest. On February 21, 1952, martyrs were killed in the language movement. The language movement is an important chapter in the history of Bangladesh. Bengali national consciousness was awakened from this movement. As a result of the language movement, Bengali language was recognized as one of the state languages of Pakistan. Later this movement took the form of independence movement. Shaheed Minar was built in memory of the martyrs of the language movement. February 21 is celebrated as International Mother Language Day. The language movement is a symbol of Bengali rights.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Shaheed_Minar_Dhaka.jpg/640px-Shaheed_Minar_Dhaka.jpg"
  },
  {
    id: "jan_008",
    day: 30,
    month: 1,
    year: 1949,
    titleBn: "আওয়ামী মুসলিম লীগ প্রতিষ্ঠা",
    titleEn: "Establishment of Awami Muslim League",
    type: "historical",
    color: "#1E3A5F",
    descriptionBn: "১৯৪৯ সালের ৩০ জানুয়ারি আওয়ামী মুসলিম লীগ প্রতিষ্ঠিত হয়। পরবর্তীতে এর নাম হয় আওয়ামী লীগ। এটি বাংলাদেশের অন্যতম প্রধান রাজনৈতিক দল। মাওলানা ভাসানী, শামসুল হক, মোল্লা জসিমউদ্দীন প্রমুখ নেতারা এই দল প্রতিষ্ঠা করেন। রোজ গার্ডেনে এক সভায় দলটি প্রতিষ্ঠিত হয়। পূর্ব বাংলার মানুষের অধিকার আদায়ের জন্য এই দল গঠিত হয়। পাকিস্তান সরকারের বৈষম্যের বিরুদ্ধে এই দল আন্দোলন করে। ১৯৫৪ সালের নির্বাচনে যুক্তফ্রন্টের অংশ হিসেবে জয়লাভ করে। ১৯৬৬ সালে বঙ্গবন্ধু শেখ মুজিবুর রহমান ৬ দফা দাবি উত্থাপন করেন। ১৯৭০ সালের নির্বাচনে আওয়ামী লীগ বিজয়ী হয়। ১৯৭১ সালে মুক্তিযুদ্ধে নেতৃত্ব দেয়। বাংলাদেশের স্বাধীনতায় আওয়ামী লীগের অবদান অনস্বীকার্য। বর্তমানে আওয়ামী লীগ বাংলাদেশের ক্ষমতাসীন দল। আওয়ামী লীগ বাংলাদেশের উন্নয়নে গুরুত্বপূর্ণ ভূমিকা পালন করছে।",
    descriptionEn: "Awami Muslim League was established on January 30, 1949. Later its name became Awami League. It is one of the major political parties of Bangladesh. Leaders like Maulana Bhasani, Shamsul Haque, Molla Jasimuddin established this party. The party was established at a meeting at Rose Garden. This party was formed to secure the rights of the people of East Bengal. This party movement against the discrimination of Pakistani government. Won as part of United Front in 1954 election. In 1966, Bangabandhu Sheikh Mujibur Rahman raised the Six-Point demand. Awami League won in 1970 election. Led the liberation war in 1971. Awami League's contribution to Bangladesh's independence is undeniable. Currently Awami League is the ruling party of Bangladesh. Awami League is playing an important role in the development of Bangladesh.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Awami_League_logo.svg/440px-Awami_League_logo.svg.png"
  }
];

async function addEvents() {
  for (const event of januaryEvents) {
    try {
      const response = await axios.post(API_URL, event);
      console.log(`Added: ${event.titleEn}`);
    } catch (error) {
      console.error(`Error adding ${event.titleEn}:`, error.response ? error.response.data : error.message);
    }
  }
  console.log('All January events added successfully!');
}

addEvents();
