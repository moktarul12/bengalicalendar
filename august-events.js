const axios = require('axios');
const API_URL = 'http://104.248.202.152:3000/api/events';

const augustEvents = [
  {id: "aug_001", day: 15, month: 8, year: 1948, titleBn: "শেখ কামালের জন্মদিন", titleEn: "Sheikh Kamal's Birthday", type: "person", color: "#1E3A5F", descriptionBn: "জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমানের জ্যেষ্ঠ পুত্র শেখ কামালের জন্মদিন। তিনি ১৯৪৮ সালের ১৫ আগস্ট গোপালগঞ্জের টুঙ্গিপাড়ায় জন্মগ্রহণ করেন। তিনি বাংলাদেশের ক্রীড়া ও সংস্কৃতির উন্নয়নে অবদান রেখেছেন। তিনি আবাহনী ক্রীড়া চক্রের প্রতিষ্ঠাতা ছিলেন। ১৯৭৫ সালের ১৫ আগস্ট তিনি শহীদ হন। তার জন্মদিন প্রতিবছর যথাযথভাবে পালিত হয়।", descriptionEn: "Birth anniversary of Sheikh Kamal, the eldest son of Father of the Nation Bangabandhu Sheikh Mujibur Rahman. He was born on August 15, 1948 at Tungipara, Gopalganj. He contributed to the development of sports and culture in Bangladesh. He was the founder of Abahani Krira Chakra. He was martyred on August 15, 1975. His birthday is celebrated every year with due respect.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Sheikh_Kamal.jpg/440px-Sheikh_Kamal.jpg"},
  {id: "aug_002", day: 15, month: 8, year: 1975, titleBn: "জাতীয় শোক দিবস", titleEn: "National Mourning Day", type: "historical", color: "#8B0000", descriptionBn: "১৯৭৫ সালের ১৫ আগস্ট জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান ও তার পরিবারের সদস্যদের হত্যার দিন। এই দিনটি জাতীয় শোক দিবস হিসেবে পালিত হয়। বঙ্গবন্ধু ও তার পরিবারের সদস্যদের স্মরণে বিশেষ দোয়া ও মিলাদ অনুষ্ঠিত হয়। সরকারি ছুটি থাকে। বিভিন্ন অনুষ্ঠানের আয়োজন করা হয়। জাতীয় শোক দিবস বাংলাদেশের ইতিহাসে এক কালো অধ্যায়।", descriptionEn: "August 15, 1975 is the day of the assassination of Father of the Nation Bangabandhu Sheikh Mujibur Rahman and his family members. This day is observed as National Mourning Day. Special prayers and milad are held in memory of Bangabandhu and his family members. There is a government holiday. Various events are organized. National Mourning Day is a dark chapter in the history of Bangladesh.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bangabandhu_Mausoleum.jpg/640px-Bangabandhu_Mausoleum.jpg"},
  {id: "aug_003", day: 21, month: 8, year: 1947, titleBn: "শেখ জামালের জন্মদিন", titleEn: "Sheikh Jamal's Birthday", type: "person", color: "#1E3A5F", descriptionBn: "জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমানের দ্বিতীয় পুত্র শেখ জামালের জন্মদিন। তিনি ১৯৪৭ সালের ২১ আগস্ট জন্মগ্রহণ করেন। তিনি বাংলাদেশের সশস্ত্র বাহিনীতে কর্মরত ছিলেন। ১৯৭৫ সালের ১৫ আগস্ট তিনি শহীদ হন। তার জন্মদিন প্রতিবছর যথাযথভাবে পালিত হয়।", descriptionEn: "Birth anniversary of Sheikh Jamal, the second son of Father of the Nation Bangabandhu Sheikh Mujibur Rahman. He was born on August 21, 1947. He served in the Bangladesh Armed Forces. He was martyred on August 15, 1975. His birthday is celebrated every year with due respect.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Sheikh_Jamal.jpg/440px-Sheikh_Jamal.jpg"}
];

async function addEvents() {
  for (const event of augustEvents) {
    try {
      const response = await axios.post(API_URL, event);
      console.log(`Added: ${event.titleEn}`);
    } catch (error) {
      console.error(`Error adding ${event.titleEn}:`, error.response ? error.response.data : error.message);
    }
  }
  console.log('All August events added successfully!');
}

addEvents();
