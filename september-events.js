const axios = require('axios');
const API_URL = 'http://104.248.202.152:3000/api/events';

const septemberEvents = [
  {id: "sep_001", day: 3, month: 9, year: 1975, titleBn: "জেল হত্যা দিবস", titleEn: "Jail Killing Day", type: "historical", color: "#8B0000", descriptionBn: "১৯৭৫ সালের ৩ সেপ্টেম্বর জেল হত্যা দিবস। এই দিনে মুজিবনগর সরকারের চার জাতীয় নেতাকে ঢাকা কেন্দ্রীয় কারাগারে হত্যা করা হয়। তাজউদ্দীন আহমদ, সৈয়দ নজরুল ইসলাম, মুজিবুর রহমান ও এ এইচ এম কামারুজ্জামান এই চার নেতা শহীদ হন। এই দিনটি জেল হত্যা দিবস হিসেবে পালিত হয়। শহীদদের স্মরণে বিশেষ দোয়া ও মিলাদ অনুষ্ঠিত হয়। বিভিন্ন অনুষ্ঠানের আয়োজন করা হয়। জেল হত্যা দিবস বাংলাদেশের ইতিহাসে এক কালো অধ্যায়।", descriptionEn: "September 3, 1975 is Jail Killing Day. On this day, four national leaders of the Mujibnagar government were killed at Dhaka Central Jail. Tajuddin Ahmad, Syed Nazrul Islam, Muzibur Rahman and A H M Qamaruzzaman were martyred. This day is observed as Jail Killing Day. Special prayers and milad are held in memory of the martyrs. Various events are organized. Jail Killing Day is a dark chapter in the history of Bangladesh.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Dhaka_Central_Jail.jpg/640px-Dhaka_Central_Jail.jpg"},
  {id: "sep_002", day: 21, month: 9, year: 0, titleBn: "শিক্ষক দিবস", titleEn: "Teachers' Day", type: "national", color: "#D4A017", descriptionBn: "২১ সেপ্টেম্বর শিক্ষক দিবস। শিক্ষকদের অবদান ও সম্মানের জন্য এই দিনটি পালিত হয়। শিক্ষকদের প্রতি শ্রদ্ধা জানানো হয়। শিক্ষা প্রতিষ্ঠানে বিশেষ অনুষ্ঠানের আয়োজন করা হয়। শিক্ষকদের সম্মাননা ও পুরস্কার দেওয়া হয়। শিক্ষক দিবস শিক্ষকদের অবদানের স্বীকৃতি।", descriptionEn: "September 21 is Teachers' Day. This day is observed for the contribution and honor of teachers. Respect is shown to teachers. Special events are organized at educational institutions. Teachers are honored and awarded. Teachers' Day is recognition of teachers' contributions.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Teachers_Day.jpg/640px-Teachers_Day.jpg"},
  {id: "sep_003", day: 27, month: 9, year: 0, titleBn: "বিশ্ব পর্যটন দিবস", titleEn: "World Tourism Day", type: "national", color: "#228B22", descriptionBn: "২৭ সেপ্টেম্বর বিশ্ব পর্যটন দিবস। পর্যটন শিল্পের উন্নয়নে জনসচেতনতা তৈরির জন্য এই দিনটি পালিত হয়। জাতিসংঘ ১৯৮০ সালে ২৭ সেপ্টেম্বরকে বিশ্ব পর্যটন দিবস হিসেবে ঘোষণা করে। বিশ্বব্যাপী এই দিনটি পালিত হয়। বাংলাদেশে বিশেষ কর্মসূচি গ্রহণ করা হয়। পর্যটন স্থানগুলোতে বিশেষ আয়োজন করা হয়। বিশ্ব পর্যটন দিবস পর্যটন শিল্পের উন্নয়নে গুরুত্বপূর্ণ ভূমিকা পালন করে।", descriptionEn: "September 27 is World Tourism Day. This day is observed to create public awareness for the development of tourism industry. The United Nations declared September 27 as World Tourism Day in 1980. This day is celebrated worldwide. Special programs are taken in Bangladesh. Special arrangements are made at tourist spots. World Tourism Day plays an important role in the development of tourism industry.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/World_Tourism_Day.jpg/640px-World_Tourism_Day.jpg"}
];

async function addEvents() {
  for (const event of septemberEvents) {
    try {
      const response = await axios.post(API_URL, event);
      console.log(`Added: ${event.titleEn}`);
    } catch (error) {
      console.error(`Error adding ${event.titleEn}:`, error.response ? error.response.data : error.message);
    }
  }
  console.log('All September events added successfully!');
}

addEvents();
