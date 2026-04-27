const axios = require('axios');
const API_URL = 'http://104.248.202.152:3000/api/events';

const juneEvents = [
  {id: "jun_001", day: 5, month: 6, year: 0, titleBn: "বিশ্ব পরিবেশ দিবস", titleEn: "World Environment Day", type: "national", color: "#228B22", descriptionBn: "৫ জুন বিশ্ব পরিবেশ দিবস। পরিবেশ সুরক্ষায় জনসচেতনতা তৈরির জন্য এই দিনটি পালিত হয়। বৃক্ষরোপণ ও পরিবেশ রক্ষায় কর্মসূচি নেওয়া হয়। জাতিসংঘ ১৯৭২ সালে ৫ জুনকে বিশ্ব পরিবেশ দিবস হিসেবে ঘোষণা করে। বিশ্বব্যাপী এই দিনটি পালিত হয়। বাংলাদেশে বিশেষ কর্মসূচি গ্রহণ করা হয়। বৃক্ষরোপণ অভিযান চালানো হয়। পরিবেশ সুরক্ষায় সেমিনার ও আলোচনা সভা হয়। বিশ্ব পরিবেশ দিবস পরিবেশ সুরক্ষায় গুরুত্বপূর্ণ ভূমিকা পালন করে।", descriptionEn: "June 5 is World Environment Day. This day is observed to create public awareness for environmental protection. Tree planting and environmental protection programs are undertaken. The United Nations declared June 5 as World Environment Day in 1972. This day is celebrated worldwide. Special programs are taken in Bangladesh. Tree planting campaigns are conducted. Seminars and discussion sessions on environmental protection are held. World Environment Day plays an important role in environmental protection.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/World_Environment_Day.jpg/640px-World_Environment_Day.jpg"},
  {id: "jun_002", day: 17, month: 6, year: 0, titleBn: "বিশ্ব মরুকরণ প্রতিরোধ দিবস", titleEn: "World Day to Combat Desertification", type: "national", color: "#D4A017", descriptionBn: "১৭ জুন বিশ্ব মরুকরণ প্রতিরোধ দিবস। মরুকরণ রোধে জনসচেতনতা তৈরির জন্য এই দিনটি পালিত হয়। জাতিসংঘ ১৯৯৪ সালে ১৭ জুনকে বিশ্ব মরুকরণ প্রতিরোধ দিবস হিসেবে ঘোষণা করে। বিশ্বব্যাপী এই দিনটি পালিত হয়। বাংলাদেশে বিশেষ কর্মসূচি গ্রহণ করা হয়। বৃক্ষরোপণ ও সবুজায়ন কর্মসূচি নেওয়া হয়। মরুকরণ প্রতিরোধে সেমিনার ও আলোচনা সভা হয়। বিশ্ব মরুকরণ প্রতিরোধ দিবস পরিবেশ সুরক্ষায় গুরুত্বপূর্ণ ভূমিকা পালন করে।", descriptionEn: "June 17 is World Day to Combat Desertification. This day is observed to create public awareness to prevent desertification. The United Nations declared June 17 as World Day to Combat Desertification in 1994. This day is celebrated worldwide. Special programs are taken in Bangladesh. Tree planting and greening programs are undertaken. Seminars and discussion sessions on preventing desertification are held. World Day to Combat Desertification plays an important role in environmental protection.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Desertification.jpg/640px-Desertification.jpg"},
  {id: "jun_003", day: 6, month: 5, year: 1943, titleBn: "মঈন খানের জন্মদিন", titleEn: "Moin Khan's Birthday", type: "person", color: "#1E3A5F", descriptionBn: "প্রখ্যাত চিকিৎসক ও শিক্ষাবিদ মঈন খানের জন্মদিন। তিনি বাংলাদেশে মেডিকেল শিক্ষার উন্নয়নে অবদান রেখেছেন। তিনি ঢাকা মেডিকেল কলেজে দীর্ঘদিন শিক্ষকতা করেছেন। তিনি মেডিকেল গবেষণায় গুরুত্বপূর্ণ অবদান রেখেছেন। তার জন্মদিন প্রতিবছর যথাযথভাবে পালিত হয়।", descriptionEn: "Birth anniversary of eminent doctor and academic Moin Khan. He has contributed to the development of medical education in Bangladesh. He taught at Dhaka Medical College for a long time. He has made important contributions to medical research. His birthday is celebrated every year with due respect.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Moin_Khan.jpg/440px-Moin_Khan.jpg"}
];

async function addEvents() {
  for (const event of juneEvents) {
    try {
      const response = await axios.post(API_URL, event);
      console.log(`Added: ${event.titleEn}`);
    } catch (error) {
      console.error(`Error adding ${event.titleEn}:`, error.response ? error.response.data : error.message);
    }
  }
  console.log('All June events added successfully!');
}

addEvents();
