const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'bangalicalendar.db'));

// Get existing festivals
const festivals = db.prepare('SELECT * FROM festivals').all();

console.log('Migrating festivals to new structure...');

festivals.forEach(festival => {
  // Insert into festival_definitions
  const insertDef = db.prepare(`
    INSERT OR REPLACE INTO festival_definitions 
    (id, titleBn, titleEn, type, color, descriptionBn, descriptionEn, imageUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  insertDef.run(
    festival.id,
    festival.titleBn,
    festival.titleEn,
    festival.type,
    festival.color,
    festival.descriptionBn,
    festival.descriptionEn,
    festival.imageUrl
  );
  
  // Insert into festival_dates
  const insertDate = db.prepare(`
    INSERT INTO festival_dates (festival_id, day, month, year)
    VALUES (?, ?, ?, ?)
  `);
  
  insertDate.run(festival.id, festival.day, festival.month, festival.year);
  
  console.log(`Migrated: ${festival.titleEn}`);
});

console.log('Migration complete!');

db.close();
