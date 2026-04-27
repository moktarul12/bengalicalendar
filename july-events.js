const axios = require('axios');
const API_URL = 'http://104.248.202.152:3000/api/events';

const julyEvents = [
  {id: "jul_001", day: 1, month: 7, year: 1922, titleBn: "এ এইচ এম কামারুজ্জামানের জন্মদিন", titleEn: "A H M Qamaruzzaman's Birthday", type: "person", color: "#1E3A5F", descriptionBn: "জাতীয় নেতা এ এইচ এম কামারুজ্জামানের জন্মদিন। তিনি মুক্তিযুদ্ধে গুরুত্বপূর্ণ ভূমিকা পালন করেন। তিনি মুজিবনগর সরকারের অন্যতম সদস্য ছিলেন। ১৯৭৫ সালের ৩ নভেম্বর জেল হত্যায় তিনি শহীদ হন। বাংলাদেশ সরকার তাকে জাতীয় নেতা হিসেবে স্বীকৃতি দিয়েছে। তার জন্মদিন প্রতিবছর যথাযথভাবে পালিত হয়।", descriptionEn: "Birth anniversary of national leader A H M Qamaruzzaman. He played an important role in the liberation war. He was one of the members of Mujibnagar government. He was martyred in the jail killing on November 3, 1975. The Government of Bangladesh has recognized him as a national leader. His birthday is celebrated every year with due respect.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Qamaruzzaman.jpg/440px-Qamaruzzaman.jpg"},
  {id: "jul_002", day: 27, month: 7, year: 1940, titleBn: "জামাল নজরুল ইসলামের জন্মদিন", titleEn: "Jamal Nazrul Islam's Birthday", type: "person", color: "#1E3A5F", descriptionBn: "বিশিষ্ট পদার্থবিজ্ঞানী ও গণিতবিদ জামাল নজরুল ইসলামের জন্মদিন। তিনি মহাকর্ষ ও কসমোলজি নিয়ে গবেষণা করেছেন। তিনি ঢাকা বিশ্ববিদ্যালয়ে দীর্ঘদিন শিক্ষকতা করেছেন। তিনি বিজ্ঞান গবেষণায় গুরুত্বপূর্ণ অবদান রেখেছেন। তার জন্মদিন প্রতিবছর যথাযথভাবে পালিত হয়।", descriptionEn: "Birth anniversary of eminent physicist and mathematician Jamal Nazrul Islam. He researched gravity and cosmology. He taught at Dhaka University for a long time. He has made important contributions to scientific research. His birthday is celebrated every year with due respect.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Jamal_Nazrul_Islam.jpg/440px-Jamal_Nazrul_Islam.jpg"}
];

async function addEvents() {
  for (const event of julyEvents) {
    try {
      const response = await axios.post(API_URL, event);
      console.log(`Added: ${event.titleEn}`);
    } catch (error) {
      console.error(`Error adding ${event.titleEn}:`, error.response ? error.response.data : error.message);
    }
  }
  console.log('All July events added successfully!');
}

addEvents();
