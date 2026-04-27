const axios = require('axios');
const API_URL = 'http://104.248.202.152:3000/api/events';

const novemberEvents = [
  {id: "nov_001", day: 7, month: 11, year: 0, titleBn: "জাতীয় বিপ্লব ও সংহতি দিবস", titleEn: "National Revolution and Solidarity Day", type: "historical", color: "#C41E3A", descriptionBn: "৭ নভেম্বর জাতীয় বিপ্লব ও সংহতি দিবস। ১৯৭৫ সালের ৭ নভেম্বর সিপাহী-জনতা বিপ্লব সংঘটিত হয়। খালেদ মোশাররফ ও তার সহযোগীরা এই বিপ্লবের নেতৃত্ব দেন। এই দিনটি জাতীয় বিপ্লব ও সংহতি দিবস হিসেবে পালিত হয়। বিভিন্ন অনুষ্ঠানের আয়োজন করা হয়। সরকারি ছুটি থাকে। জাতীয় বিপ্লব ও সংহতি দিবস বাংলাদেশের ইতিহাসে গুরুত্বপূর্ণ।", descriptionEn: "November 7 is National Revolution and Solidarity Day. The Sepoy-Janata Biplob took place on November 7, 1975. Khaled Mosharraf and his associates led this revolution. This day is observed as National Revolution and Solidarity Day. Various events are organized. There is a government holiday. National Revolution and Solidarity Day is important in the history of Bangladesh.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Revolution_Day.jpg/640px-Revolution_Day.jpg"},
  {id: "nov_002", day: 14, month: 11, year: 0, titleBn: "জাতীয় শোক দিবস (নভেম্বর)", titleEn: "National Mourning Day (November)", type: "historical", color: "#8B0000", descriptionBn: "১৪ নভেম্বর জাতীয় শোক দিবস। ১৯৭৫ সালের ৩ নভেম্বর জেল হত্যায় শহীদ চার জাতীয় নেতার স্মরণে এই দিনটি পালিত হয়। তাজউদ্দীন আহমদ, সৈয়দ নজরুল ইসলাম, মুজিবুর রহমান ও এ এইচ এম কামারুজ্জামান এই চার নেতা শহীদ হন। শহীদদের স্মরণে বিশেষ দোয়া ও মিলাদ অনুষ্ঠিত হয়। বিভিন্ন অনুষ্ঠানের আয়োজন করা হয়।", descriptionEn: "November 14 is National Mourning Day. This day is observed in memory of the four national leaders martyred in the jail killing on November 3, 1975. Tajuddin Ahmad, Syed Nazrul Islam, Muzibur Rahman and A H M Qamaruzzaman were martyred. Special prayers and milad are held in memory of the martyrs. Various events are organized.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Martyrs_Memorial.jpg/640px-Martyrs_Memorial.jpg"},
  {id: "nov_003", day: 21, month: 11, year: 0, titleBn: "বিশ্ব টেলিভিশন দিবস", titleEn: "World Television Day", type: "national", color: "#1E3A5F", descriptionBn: "২১ নভেম্বর বিশ্ব টেলিভিশন দিবস। টেলিভিশনের ভূমিকা ও গুরুত্ব তুলে ধরতে এই দিনটি পালিত হয়। জাতিসংঘ ১৯৯৬ সালে ২১ নভেম্বরকে বিশ্ব টেলিভিশন দিবস হিসেবে ঘোষণা করে। বিশ্বব্যাপী এই দিনটি পালিত হয়। বাংলাদেশে বিশেষ অনুষ্ঠানের আয়োজন করা হয়। টেলিভিশন ও গণমাধ্যম নিয়ে আলোচনা সভা হয়। বিশ্ব টেলিভিশন দিবস গণমাধ্যমের গুরুত্ব তুলে ধরে।", descriptionEn: "November 21 is World Television Day. This day is observed to highlight the role and importance of television. The United Nations declared November 21 as World Television Day in 1996. This day is celebrated worldwide. Special events are organized in Bangladesh. Discussion sessions on television and mass media are held. World Television Day highlights the importance of mass media.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/World_Television_Day.jpg/640px-World_Television_Day.jpg"}
];

async function addEvents() {
  for (const event of novemberEvents) {
    try {
      const response = await axios.post(API_URL, event);
      console.log(`Added: ${event.titleEn}`);
    } catch (error) {
      console.error(`Error adding ${event.titleEn}:`, error.response ? error.response.data : error.message);
    }
  }
  console.log('All November events added successfully!');
}

addEvents();
