const axios = require('axios');
const API_URL = 'http://104.248.202.152:3000/api/events';

const mayEvents = [
  {id: "may_001", day: 1, month: 5, year: 0, titleBn: "মে দিবস", titleEn: "May Day", type: "national", color: "#C41E3A", descriptionBn: "আন্তর্জাতিক শ্রমিক দিবস। শ্রমিকদের অধিকার আদায়ের আন্দোলনের প্রতীক। ১৮৮৬ সালের হে মার্কেট ঘটনার স্মরণে পালিত হয়। বাংলাদেশে র্যালি ও আলোচনা সভা অনুষ্ঠিত হয়। শ্রমিকদের অধিকার নিয়ে আলোচনা হয়। শ্রমিক ইউনিয়নগুলো বিশেষ অনুষ্ঠানের আয়োজন করে। সরকারি ছুটি থাকে। মে দিবস শ্রমিকদের অধিকার আদায়ের প্রতীক।", descriptionEn: "International Workers' Day. A symbol of the movement for workers' rights. Commemorates the Haymarket affair of 1886. Rallies and discussion sessions are held in Bangladesh. Discussions on workers' rights are held. Labor unions organize special events. There is a government holiday. May Day is a symbol of securing workers' rights.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/May_Day.jpg/640px-May_Day.jpg"},
  {id: "may_002", day: 8, month: 5, year: 1861, titleBn: "রবীন্দ্রনাথ ঠাকুরের জন্মদিন", titleEn: "Rabindranath Tagore's Birthday", type: "person", color: "#D4A017", descriptionBn: "বিশ্বকবি রবীন্দ্রনাথ ঠাকুরের জন্মদিন। তিনি ১৮৬১ সালের ৮ মে কলকাতার জোড়াসাঁকোয় জন্মগ্রহণ করেন। গীতাঞ্জলির জন্য নোবেল পুরস্কার পান। তার রচনায় বাংলা সাহিত্য সমৃদ্ধ হয়েছে। গীতাঞ্জলি, গোরা, ঘরে বাইরে, শেষের কবিতা তার অন্যতম বিখ্যাত কাজ। তিনি বাংলাদেশের জাতীয় সংগীতের রচয়িতা। তার জন্মদিন প্রতিবছর যথাযথভাবে পালিত হয়। রবীন্দ্র সংগীত ও সাংস্কৃতিক অনুষ্ঠান হয়।", descriptionEn: "Birth anniversary of Rabindranath Tagore, the world poet. He was born on May 8, 1861 at Jorasanko, Kolkata. Won Nobel Prize for Gitanjali. Bengali literature has been enriched by his works. Gitanjali, Gora, Ghare Baire, Shesher Kabita are his famous works. He is the composer of Bangladesh's national anthem. His birthday is celebrated every year with due respect. Rabindra Sangeet and cultural events are held.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Rabindranath_Tagore.jpg/440px-Rabindranath_Tagore.jpg"},
  {id: "may_003", day: 25, month: 5, year: 1899, titleBn: "কাজী নজরুল ইসলামের জন্মদিন", titleEn: "Kazi Nazrul Islam's Birthday", type: "person", color: "#1E3A5F", descriptionBn: "বাংলাদেশের জাতীয় কবি ও বিদ্রোহী কবি কাজী নজরুল ইসলামের জন্মদিন। তিনি ১৮৯৯ সালের ২৫ মে পশ্চিমবঙ্গের বর্ধমান জেলায় জন্মগ্রহণ করেন। তার রচনায় বিদ্রোহ ও মানবতাবাদ ফুটে উঠেছে। বিদ্রোহী, সাম্যবাদী, দোলন-চক্র তার অন্যতম বিখ্যাত কাব্যগ্রন্থ। তিনি বাংলাদেশের জাতীয় সংগীতের রচয়িতা। তার জন্মদিন প্রতিবছর যথাযথভাবে পালিত হয়। নজরুল সংগীত ও সাংস্কৃতিক অনুষ্ঠান হয়।", descriptionEn: "Birth anniversary of Kazi Nazrul Islam, the national poet of Bangladesh and the Rebel Poet. He was born on May 25, 1899 in Bardhaman district, West Bengal. Rebellion and humanism are reflected in his works. Bidrohi, Samyabadi, Dolon-Chakra are his famous poetry books. He is the composer of Bangladesh's national anthem. His birthday is celebrated every year with due respect. Nazrul Sangeet and cultural events are held.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kazi_Nazrul_Islam.jpg/440px-Kazi_Nazrul_Islam.jpg"},
  {id: "may_004", day: 12, month: 5, year: 0, titleBn: "শবে মেরাজ", titleEn: "Shab-e-Meraj", type: "religious", color: "#1E3A5F", descriptionBn: "পবিত্র শবে মেরাজ। হযরত মুহাম্মদ (সা.) এর মেরাজের ঘটনা স্মরণে এই রাত পালন করা হয়। মসজিদে বিশেষ নামাজ ও দোয়া করা হয়। মুসলমানরা এই রাতে বিশেষ ইবাদত করেন। কোরআন তেলাওয়াত করা হয়। দোয়া ও জিকির করা হয়। শবে মেরাজ মুসলমানদের জন্য এক পবিত্র রাত।", descriptionEn: "Holy Shab-e-Meraj. This night is observed in memory of the Meraj event of Hazrat Muhammad (PBUH). Special prayers and supplications are offered in mosques. Muslims perform special worship on this night. Quran recitation is done. Supplications and remembrance are done. Shab-e-Meraj is a holy night for Muslims.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Mosque_at_night.jpg/640px-Mosque_at_night.jpg"}
];

async function addEvents() {
  for (const event of mayEvents) {
    try {
      const response = await axios.post(API_URL, event);
      console.log(`Added: ${event.titleEn}`);
    } catch (error) {
      console.error(`Error adding ${event.titleEn}:`, error.response ? error.response.data : error.message);
    }
  }
  console.log('All May events added successfully!');
}

addEvents();
