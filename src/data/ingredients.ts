// Comprehensive World Ingredients Directory: 100% Strictly Jain Compliant (Ahimsak)
// Zero root vegetables (kandmool: no potato, onion, garlic, ginger, carrot, radish, beetroot, turnip)
// Zero fermented non-veg/rennet, zero animal extracts or gelatin
// Notes classify tithi suitability (on Tithi days, green vegetables like leafy greens are abstained from)

export interface JainIngredient {
  id: string;
  name: {
    en: string;
    gu: string;
    hi: string;
  };
  group: 'Grains & Flours' | 'Pulses & Lentils' | 'Dairy & Fats' | 'Vegetables (Above Ground)' | 'Spices & Herbs' | 'Nuts & Dry Fruits' | 'Sweeteners' | 'Bakery & Pantry';
  isTithiAllowed: boolean; // True if can be consumed on Parva Tithi (Atham, Chaudas - usually dried foods, lentils, grains, milk/ghee; no green veggies)
  commonUses: string;
}

export const JAIN_INGREDIENTS_LIST: JainIngredient[] = [
  // Grains & Flours
  { id: 'wheat-flour', name: { en: 'Whole Wheat Flour (Gehu Ka Atta)', gu: 'ઘઉંનો લોટ', hi: 'गेहूं का आटा' }, group: 'Grains & Flours', isTithiAllowed: true, commonUses: 'Roti, Paratha, Puri, Sukhdi' },
  { id: 'rice', name: { en: 'Basmati / Brown / Jasmine Rice', gu: 'ચોખા (બાસમતી)', hi: 'चावल (बासमती)' }, group: 'Grains & Flours', isTithiAllowed: true, commonUses: 'Khichdi, Pulao, Kheer' },
  { id: 'besan', name: { en: 'Gram Flour (Besan / Chickpea flour)', gu: 'ચણાનો લોટ (બેસન)', hi: 'बेसन / चने का आटा' }, group: 'Grains & Flours', isTithiAllowed: true, commonUses: 'Kadhi, Dhokla, Gatte, Chilla' },
  { id: 'poha', name: { en: 'Flattened Rice (Poha / Aval)', gu: 'પૌંઆ', hi: 'पोहा' }, group: 'Grains & Flours', isTithiAllowed: true, commonUses: 'Jain Poha, Chevdo, Cutlets' },
  { id: 'suji', name: { en: 'Semolina (Suji / Rawa)', gu: 'સોજી / રવો', hi: 'सूजी / रवा' }, group: 'Grains & Flours', isTithiAllowed: true, commonUses: 'Upma, Halwa, Idli, Dosa' },
  { id: 'oats', name: { en: 'Rolled Oats (Steel cut / Rolled)', gu: 'ઓટ્સ', hi: 'ओट्स' }, group: 'Grains & Flours', isTithiAllowed: true, commonUses: 'Oats Porridge, Jain Khichdi' },
  { id: 'quinoa', name: { en: 'Quinoa Grain', gu: 'ક્વિનોઆ', hi: 'क्विनोआ' }, group: 'Grains & Flours', isTithiAllowed: true, commonUses: 'Salad bowl, Jain Upma' },
  { id: 'bajra-flour', name: { en: 'Pearl Millet Flour (Bajra No Lot)', gu: 'બાજરીનો લોટ', hi: 'बाजरे का आटा' }, group: 'Grains & Flours', isTithiAllowed: true, commonUses: 'Bajra Rotla, Vada' },
  { id: 'jowar-flour', name: { en: 'Sorghum Flour (Jowar Atta)', gu: 'જુવારનો લોટ', hi: 'ज्वार का आटा' }, group: 'Grains & Flours', isTithiAllowed: true, commonUses: 'Jowar Bhakri, Roti' },
  { id: 'makki-atta', name: { en: 'Corn Flour / Maize Meal (Makki Atta)', gu: 'મકાઈનો લોટ', hi: 'मक्के का आटा' }, group: 'Grains & Flours', isTithiAllowed: true, commonUses: 'Makki di Roti, Dhokla' },
  { id: 'rajgira-flour', name: { en: 'Amaranth Flour (Rajgira / Farali)', gu: 'રાજગરાનો લોટ', hi: 'राजगिरा का आटा' }, group: 'Grains & Flours', isTithiAllowed: true, commonUses: 'Farali Puri, Shira, Kadhi' },
  { id: 'singhare-atta', name: { en: 'Water Chestnut Flour (Singhara)', gu: 'સિંગોડાનો લોટ', hi: 'सिंघाड़े का आटा' }, group: 'Grains & Flours', isTithiAllowed: true, commonUses: 'Sheera, Halwa, Puri' },
  { id: 'sago-sabudana', name: { en: 'Tapioca Pearls (Sabudana)', gu: 'સાબુદાણા', hi: 'साबूदाना' }, group: 'Grains & Flours', isTithiAllowed: true, commonUses: 'Sabudana Khichdi, Vada, Kheer' },

  // Pulses & Lentils
  { id: 'toor-dal', name: { en: 'Pigeon Pea (Toor Dal / Arhar Dal)', gu: 'તુવેર દાળ', hi: 'तुवर दाल' }, group: 'Pulses & Lentils', isTithiAllowed: true, commonUses: 'Gujarati Dal, Sambar' },
  { id: 'moong-dal-yellow', name: { en: 'Yellow Split Moong Dal', gu: 'મગની પીળી દાળ', hi: 'मूंग दाल पीली' }, group: 'Pulses & Lentils', isTithiAllowed: true, commonUses: 'Dal fry, Moong Chilla, Halwa' },
  { id: 'moong-whole', name: { en: 'Whole Green Moong (Dry)', gu: 'આખા મગ', hi: 'साबुत मूंग' }, group: 'Pulses & Lentils', isTithiAllowed: true, commonUses: 'Moong Shak, Usal' },
  { id: 'chana-dal', name: { en: 'Bengal Gram (Chana Dal)', gu: 'ચણા દાળ', hi: 'चना दाल' }, group: 'Pulses & Lentils', isTithiAllowed: true, commonUses: 'Dal, Dhokla, Handvo, Vada' },
  { id: 'kabuli-chana', name: { en: 'White Chickpeas (Kabuli Chana)', gu: 'કાબુલી ચણા (છોલે)', hi: 'सफेद चना / काबुली' }, group: 'Pulses & Lentils', isTithiAllowed: true, commonUses: 'Jain Chole, Hummus' },
  { id: 'kala-chana', name: { en: 'Brown/Black Chickpeas (Kala Chana)', gu: 'કાળા ચણા', hi: 'काला चना' }, group: 'Pulses & Lentils', isTithiAllowed: true, commonUses: 'Kala Chana Masala, Usal' },
  { id: 'urad-dal', name: { en: 'Split / Whole Black Gram (Urad Dal)', gu: 'અડદની દાળ', hi: 'उड़द दाल' }, group: 'Pulses & Lentils', isTithiAllowed: true, commonUses: 'Dosa/Idli batter, Dal Makhani' },
  { id: 'masoor-dal', name: { en: 'Red Lentil (Masoor Dal)', gu: 'મસૂર દાળ', hi: 'मसूर दाल' }, group: 'Pulses & Lentils', isTithiAllowed: true, commonUses: 'Soup, Dal' },
  { id: 'rajma', name: { en: 'Kidney Beans (Rajma)', gu: 'રાજમા', hi: 'राजमा' }, group: 'Pulses & Lentils', isTithiAllowed: true, commonUses: 'Jain Rajma Masala' },
  { id: 'white-peas', name: { en: 'Dry White Peas (Vatana)', gu: 'સૂકા વટાણા', hi: 'सफेद मटर (सूखे)' }, group: 'Pulses & Lentils', isTithiAllowed: true, commonUses: 'Ragda, Jain Misal' },

  // Dairy & Healthy Fats
  { id: 'cow-milk', name: { en: 'Fresh Milk', gu: 'દૂધ', hi: 'दूध' }, group: 'Dairy & Fats', isTithiAllowed: true, commonUses: 'Tea, Sweets, Paneer, Kheer' },
  { id: 'curd-yogurt', name: { en: 'Fresh Homemade Curd (Dahi)', gu: 'દહીં', hi: 'दही' }, group: 'Dairy & Fats', isTithiAllowed: true, commonUses: 'Kadhi, Raita, Chaas' },
  { id: 'ghee', name: { en: 'Pure Desi Ghee', gu: 'શુદ્ધ દેશી ઘી', hi: 'शुद्ध देसी घी' }, group: 'Dairy & Fats', isTithiAllowed: true, commonUses: 'Tadka, Roti smearing, Sweets' },
  { id: 'paneer', name: { en: 'Fresh Cottage Cheese (Paneer)', gu: 'પનીર', hi: 'पनीर' }, group: 'Dairy & Fats', isTithiAllowed: true, commonUses: 'Paneer Butter Masala, Tikka' },
  { id: 'butter', name: { en: 'Pure Salted / White Butter (Makhan)', gu: 'માખણ / બટર', hi: 'मक्खन / बटर' }, group: 'Dairy & Fats', isTithiAllowed: true, commonUses: 'Baking, spreading, Pav Bhaji' },
  { id: 'processed-cheese', name: { en: '100% Vegetarian Rennet Cheese', gu: 'ચીઝ (શાકાહારી)', hi: 'पनीर / चीज' }, group: 'Dairy & Fats', isTithiAllowed: true, commonUses: 'Pizza, Pasta, Quesadillas' },
  { id: 'sesame-oil', name: { en: 'Cold Pressed Sesame / Groundnut Oil', gu: 'તલનું / સીંગતેલ', hi: 'तिल / मूंगफली का तेल' }, group: 'Dairy & Fats', isTithiAllowed: true, commonUses: 'Cooking, tempering' },
  { id: 'olive-oil', name: { en: 'Extra Virgin Olive Oil', gu: 'ઓલિવ તેલ', hi: 'जैतून का तेल' }, group: 'Dairy & Fats', isTithiAllowed: true, commonUses: 'Pasta, Mediterranean dishes' },

  // Vegetables (Above ground strictly, Jain permissible)
  { id: 'raw-banana', name: { en: 'Raw Green Plantain / Banana (Kacha Kela)', gu: 'કાચા કેળા', hi: 'कच्चा केला' }, group: 'Vegetables (Above Ground)', isTithiAllowed: false, commonUses: 'Potato substitute for Patties, Pav Bhaji, Sabzi' },
  { id: 'tomato', name: { en: 'Ripe Tomatoes', gu: 'ટામેટા', hi: 'टमाटर' }, group: 'Vegetables (Above Ground)', isTithiAllowed: false, commonUses: 'Gravies, Soups, Salads' },
  { id: 'capsicum', name: { en: 'Bell Peppers / Capsicum (Green, Red, Yellow)', gu: 'કેપ્સિકમ / સિમલા મરચાં', hi: 'शिमला मिर्च' }, group: 'Vegetables (Above Ground)', isTithiAllowed: false, commonUses: 'Stir fry, Pizza topping, Gravy' },
  { id: 'bottle-gourd', name: { en: 'Bottle Gourd (Lauki / Dudhi)', gu: 'દૂધી', hi: 'लौकी / दूधी' }, group: 'Vegetables (Above Ground)', isTithiAllowed: false, commonUses: 'Dudhi Chana Dal, Halwa, Muthiya' },
  { id: 'cabbage', name: { en: 'Fresh Cabbage (Patta Gobhi)', gu: 'કોબીજ', hi: 'पत्ता गोभी' }, group: 'Vegetables (Above Ground)', isTithiAllowed: false, commonUses: 'Salad, Sambharo, Manchurian' },
  { id: 'cauliflower', name: { en: 'Cauliflower (Phool Gobhi)', gu: 'ફૂલકોબી', hi: 'फूलगोभी' }, group: 'Vegetables (Above Ground)', isTithiAllowed: false, commonUses: 'Gobi Masala, Paratha' },
  { id: 'zucchini', name: { en: 'Green & Yellow Zucchini', gu: 'ઝુકીની', hi: 'जुकीनी' }, group: 'Vegetables (Above Ground)', isTithiAllowed: false, commonUses: 'Pasta, Stir fry' },
  { id: 'cucumber', name: { en: 'Fresh Cucumber (Kakdi)', gu: 'કાકડી', hi: 'खीरा / ककड़ी' }, group: 'Vegetables (Above Ground)', isTithiAllowed: false, commonUses: 'Salad, Raita' },
  { id: 'ladyfinger-bhindi', name: { en: 'Okra / Ladyfinger (Bhindi)', gu: 'ભીંડા', hi: 'भिंडी' }, group: 'Vegetables (Above Ground)', isTithiAllowed: false, commonUses: 'Kurkuri Bhindi, Masala Bhindi' },
  { id: 'ridge-gourd', name: { en: 'Ridge Gourd (Turia)', gu: 'તુરિયા', hi: 'तोरई / तुरिया' }, group: 'Vegetables (Above Ground)', isTithiAllowed: false, commonUses: 'Turia Patra Shak, Dal' },
  { id: 'green-peas', name: { en: 'Fresh Green Peas (Matar)', gu: 'લીલા વટાણા', hi: 'हरे मटर' }, group: 'Vegetables (Above Ground)', isTithiAllowed: false, commonUses: 'Matar Paneer, Pulao' },
  { id: 'cluster-beans', name: { en: 'Cluster Beans (Guvar)', gu: 'ગુવાર', hi: 'ग्वारफली' }, group: 'Vegetables (Above Ground)', isTithiAllowed: false, commonUses: 'Guvar Dhokli Shak' },

  // Spices & Herbs
  { id: 'cumin-seeds', name: { en: 'Cumin Seeds (Jeera)', gu: 'જીરું', hi: 'जीरा' }, group: 'Spices & Herbs', isTithiAllowed: true, commonUses: 'Tempering, Chaas masala' },
  { id: 'mustard-seeds', name: { en: 'Mustard Seeds (Rai)', gu: 'રાઈ', hi: 'राई' }, group: 'Spices & Herbs', isTithiAllowed: true, commonUses: 'Tadka' },
  { id: 'turmeric', name: { en: 'Pure Dry Turmeric Powder (Haldi)', gu: 'હળદર', hi: 'हल्दी पाउडर' }, group: 'Spices & Herbs', isTithiAllowed: true, commonUses: 'Every curry, Milk, Immunity' },
  { id: 'coriander-seeds-powder', name: { en: 'Coriander Cumin Powder (Dhana-Jeeru)', gu: 'ધાણાજીરું પાવડર', hi: 'धनिया-जीरा पाउडर' }, group: 'Spices & Herbs', isTithiAllowed: true, commonUses: 'Dry & gravy curries' },
  { id: 'asafoetida', name: { en: 'Compounded Hing (Asafoetida - pure)', gu: 'હિંગ', hi: 'हींग' }, group: 'Spices & Herbs', isTithiAllowed: true, commonUses: 'Aroma, digestant in curries' },
  { id: 'dry-mango-powder', name: { en: 'Dry Mango Powder (Amchur)', gu: 'આમચૂર પાવડર', hi: 'अमचूर पाउडर' }, group: 'Spices & Herbs', isTithiAllowed: true, commonUses: 'Tangy seasoning' },
  { id: 'carom-seeds', name: { en: 'Ajwain (Carom Seeds)', gu: 'અજમો', hi: 'अजवाइन' }, group: 'Spices & Herbs', isTithiAllowed: true, commonUses: 'Puri, Thepla, digestion' },
  { id: 'kashmiri-chilli-powder', name: { en: 'Kashmiri Red Chilli Powder', gu: 'કાશ્મીરી લાલ મરચું', hi: 'कश्मीरी लाल मिर्च' }, group: 'Spices & Herbs', isTithiAllowed: true, commonUses: 'Color and balanced spice' },
  { id: 'black-pepper', name: { en: 'Black Pepper Crushed (Mari)', gu: 'કારી મરી', hi: 'काली मिर्च' }, group: 'Spices & Herbs', isTithiAllowed: true, commonUses: 'Seasoning, Khichdi, Soups' },
  { id: 'cinnamon-clove', name: { en: 'Cinnamon & Cloves (Taj & Lavang)', gu: 'તજ અને લવિંગ', hi: 'दालचीनी और लौंग' }, group: 'Spices & Herbs', isTithiAllowed: true, commonUses: 'Pulao, Dal aroma' },
  { id: 'dry-ginger-sunth', name: { en: 'Dry Ginger Powder (Sunth)', gu: 'સૂંઠ પાવડર', hi: 'सोंठ पाउडर' }, group: 'Spices & Herbs', isTithiAllowed: true, commonUses: 'Ginger alternative allowed on Tithi/general Jain' },
  { id: 'saunf-fennel', name: { en: 'Fennel Seeds (Variyali / Saunf)', gu: 'વરિયાળી', hi: 'सौंफ' }, group: 'Spices & Herbs', isTithiAllowed: true, commonUses: 'Mukhwas, Gravies, Thandai' },

  // Nuts & Dry Fruits
  { id: 'almonds', name: { en: 'California Almonds (Badam)', gu: 'બદામ', hi: 'बादाम' }, group: 'Nuts & Dry Fruits', isTithiAllowed: true, commonUses: 'Badam Milk, Gravies, Shira' },
  { id: 'cashews', name: { en: 'Cashews (Kaju)', gu: 'કાજુ', hi: 'काजू' }, group: 'Nuts & Dry Fruits', isTithiAllowed: true, commonUses: 'Kaju Curry, Rich white gravies, sweets' },
  { id: 'raisins', name: { en: 'Kishmish / Sultanas', gu: 'કિસમિસ / દ્રાક્ષ', hi: 'किशमिश' }, group: 'Nuts & Dry Fruits', isTithiAllowed: true, commonUses: 'Kheer, Pulao, Sweets' },
  { id: 'walnuts', name: { en: 'Walnuts (Akhrot)', gu: 'અખરોટ', hi: 'अखरोट' }, group: 'Nuts & Dry Fruits', isTithiAllowed: true, commonUses: 'Dry fruit barfi, breakfast' },
  { id: 'pistachios', name: { en: 'Pistachios (Pista)', gu: 'પિસ્તા', hi: 'पिस्ता' }, group: 'Nuts & Dry Fruits', isTithiAllowed: true, commonUses: 'Garnish, Kulfi, Halwa' },
  { id: 'dry-dates', name: { en: 'Dry Dates (Kharik)', gu: 'ખારેક', hi: 'छुआरा / सूखी खजूर' }, group: 'Nuts & Dry Fruits', isTithiAllowed: true, commonUses: 'Energy laddu, milk' },
  { id: 'foxnuts-makhana', name: { en: 'Roasted Lotus Seeds (Makhana / Foxnuts)', gu: 'મખાના', hi: 'मखाना' }, group: 'Nuts & Dry Fruits', isTithiAllowed: true, commonUses: 'Makhana Kheer, Jain Kaju Makhana Sabzi' },

  // Sweeteners & Condiments
  { id: 'jaggery', name: { en: 'Organic Desi Jaggery (Gud / Gor)', gu: 'દેશી ગોળ', hi: 'देसी गुड़' }, group: 'Sweeteners', isTithiAllowed: true, commonUses: 'Gujarati Dal, Sukhdi, Puran Poli' },
  { id: 'sugar-mishri', name: { en: 'Rock Sugar / Khadi Sakhar (Mishri)', gu: 'સાકર (ખડી)', hi: 'मिश्री / धागे वाली खांड' }, group: 'Sweeteners', isTithiAllowed: true, commonUses: 'Beverages, Prasadam' },

  // Bakery & International Jain
  { id: 'pure-bread', name: { en: '100% Yeast-free / Vegan Eggless Bread', gu: 'બ્રેડ (ઇંડા રહિત)', hi: 'ब्रेड (बिना अंडा)' }, group: 'Bakery & Pantry', isTithiAllowed: false, commonUses: 'Sandwiches, Jain Toast' },
  { id: 'durum-pasta', name: { en: '100% Durum Wheat Pasta (Macaroni/Penne)', gu: 'પાસ્તા (ડુરમ ઘઉં)', hi: 'पास्ता (ड्यूरम गेहूं)' }, group: 'Bakery & Pantry', isTithiAllowed: false, commonUses: 'Red sauce pasta, White sauce pasta' },
  { id: 'taco-shells', name: { en: 'Corn Taco Shells / Nachos', gu: 'ટેકો શેલ / નાચોસ', hi: 'टैको शैल / नाचोज़' }, group: 'Bakery & Pantry', isTithiAllowed: false, commonUses: 'Jain Mexican Platter' },
  { id: 'coconut-dry', name: { en: 'Dry Desiccated Coconut (Kopra Chini)', gu: 'સૂકું કોપરું', hi: 'सूखा नारियल' }, group: 'Nuts & Dry Fruits', isTithiAllowed: true, commonUses: 'Chutney, Gravy base, Mithai' }
];
