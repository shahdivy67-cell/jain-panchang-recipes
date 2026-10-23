import { Recipe } from '../types';

// Seed recipes — no fake video URLs. Users upload their own real videos.
// videoUrl is empty string until a real user video is uploaded.
export const STARTER_RECIPES: Recipe[] = [
  {
    id: 'rec-1',
    title: {
      en: 'Tithi Special Crispy Gatte Ki Sabzi',
      gu: 'તિથિ સ્પેશિયલ રાજસ્થાની ગટ્ટે કી સબ્ઝી',
      hi: 'तिथि स्पेशल कुरकुरे बेसन के गट्टे की सब्जी'
    },
    description: {
      en: '100% green-vegetable-free traditional Jain gatta curry cooked in spiced curd gravy. Zero onions, garlic or potatoes.',
      gu: 'લીલોતરી વગર ચણાના લોટ અને દહીંના મસાલેદાર રસાથી બનતી સ્વાદિષ્ટ તિથિ વાનગી.',
      hi: 'बिना हरी सब्जी, बिना प्याज लहसुन शुद्ध दही और बेसन से बनी स्वादिष्ट मारवाड़ी गट्टे की सब्जी।'
    },
    category: 'tithi',
    tags: ['Tithi Compliant', 'Atham/Chaudas Special', 'High Protein', 'No Veggies Needed'],
    videoUrl: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    authorName: 'Bhavna Jain',
    ingredients: ['besan', 'curd-yogurt', 'cumin-seeds', 'asafoetida', 'turmeric', 'coriander-seeds-powder', 'kashmiri-chilli-powder', 'carom-seeds', 'ghee'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    servings: 4,
    instructions: {
      en: [
        'Knead besan with ajwain, turmeric, chilli powder, 1 spoon ghee and 2 spoons curd into a firm dough.',
        'Roll into cylindrical logs and boil in bubbling water for 8-10 minutes until they float.',
        'Slice logs into bite-sized gattas.',
        'In ghee, splutter cumin and hing. Pour whisked curd mixed with haldi and dhaniya powder, stirring continuously.',
        'Add gattas, simmer for 5 minutes and serve hot with phulkas.'
      ],
      gu: [
        'બેસનમાં અજમો, હળદર, મરચું, ઘી અને દહીં ઉમેરી કઠણ લોટ બાંધો.',
        'લાંબા રોલ બનાવી ઉકળતા પાણીમાં 8-10 મિનિટ બાફો.',
        'કાપીને ટુકડા કરો.',
        'ઘીમાં જીરું-હિંગ વઘારી દહીંની ગ્રેવી બનાવો અને ગટ્ટા ઉમેરી 5 મિનિટ ઉકાળો.'
      ],
      hi: [
        'बेसन में अजवाइन, नमक, हल्दी, मिर्च, घी और दही डालकर कड़ा आटा गूंथ लें।',
        'रोल बनाकर उबलते पानी में 10 मिनट उबालें फिर छोटे टुकड़ों में काटें।',
        'घी में जीरा, हींग तड़काएं। फेंटा हुआ दही और मसाले डालकर लगातार चलाएं।',
        'गट्टे डालकर 5 मिनट धीमी आंच पर पकाएं।'
      ]
    },
    rating: 4.9, ratingCount: 38,
    reviews: [
      { id: 'rev-1', userName: 'Apeksha Shah', rating: 5, comment: 'Perfect for Atham & Chaudas! We loved the rich taste without any greens.', createdAt: '2026-10-18' },
      { id: 'rev-2', userName: 'Paras Mehta', rating: 4.8, comment: 'Very authentic taste and easy to make on fasting parva days.', createdAt: '2026-10-20' }
    ],
    viewsCount: 1420, likesCount: 312, createdAt: '2026-10-15',
    hasBread: false, hasButter: false, hasCheese: false, isTithiCompliant: true
  },
  {
    id: 'rec-2',
    title: {
      en: 'Satvik Moong Dal Khichdi (Zero Butter/Cheese/Bread)',
      gu: 'સાત્વિક મગની દાળની ખીચડી',
      hi: 'सात्विक मूंग दाल खिचड़ी (बिना बटर, बिना चीज)'
    },
    description: {
      en: 'Nutrient-rich, easily digestible one-pot comfort meal made with yellow moong lentils, rice and aromatic roasted cumin.',
      gu: 'પચવામાં સરળ મગની દાળ અને ચોખાની દેશી ખીચડી.',
      hi: 'पाचन के लिए सबसे उत्तम, बिना बटर-चीज की स्वादिष्ट मूंग दाल खिचड़ी।'
    },
    category: 'no-cheese-butter-bread',
    tags: ['Zero Cheese', 'Zero Butter', 'Zero Bread', 'Pure Satvik', 'Tithi Safe'],
    videoUrl: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    authorName: 'Ruchita Kothari',
    ingredients: ['moong-dal-yellow', 'rice', 'cumin-seeds', 'asafoetida', 'turmeric', 'black-pepper'],
    prepTimeMinutes: 10, cookTimeMinutes: 15, servings: 3,
    instructions: {
      en: [
        'Wash yellow moong dal and rice thoroughly together.',
        'Pressure cook with 4 cups of water, turmeric and salt for 3 whistles.',
        'Give a light dry-roasted cumin & hing tempering.',
        'Serve warm with homemade roasted papad.'
      ],
      gu: [
        'પીળી મગ દાળ અને ચોખા બરાબર ધોઈ લો.',
        'કુકરમાં 4 ગણા પાણી અને હળદર-મીઠા સાથે 3 સીટી વગાડો.',
        'જીરું અને હિંગનો હલકો વઘાર કરી ગરમાગરમ પીરસો.'
      ],
      hi: [
        'मूंग दाल और चावल को अच्छी तरह धो लें।',
        'कुकर में 4 कप पानी, नमक और हल्दी के साथ 3 सीटी लगाएं।',
        'जीरा और हींग का तड़का लगाकर गरमागरम परोसें।'
      ]
    },
    rating: 4.8, ratingCount: 24,
    reviews: [
      { id: 'rev-3', userName: 'Pooja Doshi', rating: 5, comment: 'True Jain comfort food without any processed fats!', createdAt: '2026-10-19' }
    ],
    viewsCount: 980, likesCount: 240, createdAt: '2026-10-16',
    hasBread: false, hasButter: false, hasCheese: false, isTithiCompliant: true
  },
  {
    id: 'rec-3',
    title: {
      en: 'Jain Raw Banana Pav Bhaji (Mumbai Style)',
      gu: 'જૈન કાચા કેળાની પાવભાજી',
      hi: 'जैन कच्चे केले की पावभाजी (मुंबई स्टाइल)'
    },
    description: {
      en: 'Authentic street-style Mumbai Pav Bhaji crafted using boiled raw bananas instead of potato.',
      gu: 'બટાકા વગર કાચા કેળાથી બનતી મુંબઈ સ્પેશિયલ પાવભાજી.',
      hi: 'बिना आलू, उबले कच्चे केले से बनी लाजवाब पावभाजी।'
    },
    category: 'normal',
    tags: ['Mumbai Street Style', 'Family Favorite', 'No Potato No Onion'],
    videoUrl: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80',
    authorName: 'Chef Naman Dagli',
    ingredients: ['raw-banana', 'tomato', 'capsicum', 'green-peas', 'pure-bread', 'butter', 'kashmiri-chilli-powder', 'turmeric', 'dry-mango-powder'],
    prepTimeMinutes: 20, cookTimeMinutes: 25, servings: 4,
    instructions: {
      en: [
        'Boil and peel raw bananas. Mash them smooth.',
        'In butter, sauté finely chopped capsicum and tomatoes until pulpy.',
        'Add mashed banana and boiled green peas. Mash together on the tawa.',
        'Season with Jain pav bhaji masala, Kashmiri chilli and amchur.',
        'Toast pav with generous butter and serve with lemon wedges.'
      ],
      gu: [
        'કાચા કેળાને બાફીને છૂંદી લો.',
        'બટરમાં કેપ્સિકમ અને ટામેટાં સરસ સાંતળી લો.',
        'છૂંદેલા કેળા અને વટાણા ઉમેરી મેશ કરો.',
        'મસાલા ઉમેરી તેલ છૂટે ત્યાં સુધી સાંતળો અને બટરમાં શેકેલા પાવ સાથે પીરસો.'
      ],
      hi: [
        'कच्चे केले को उबालकर अच्छी तरह मैश कर लें।',
        'तवे पर बटर में शिमला मिर्च और टमाटर भूनें।',
        'मैश किया हुआ केला और उबले मटर मिलाकर घोंटें।',
        'मसाले मिलाएं और बटर में सिके पाव के साथ सर्व करें।'
      ]
    },
    rating: 4.95, ratingCount: 72,
    reviews: [
      { id: 'rev-4', userName: 'Hitesh Sanghvi', rating: 5, comment: 'Nobody can tell this is made without potatoes!', createdAt: '2026-10-21' }
    ],
    viewsCount: 3100, likesCount: 890, createdAt: '2026-10-12',
    hasBread: true, hasButter: true, hasCheese: false, isTithiCompliant: false
  },
  {
    id: 'rec-4',
    title: {
      en: 'Paryushan Special Makhana & Kaju Shahi Korma',
      gu: 'પર્યુષણ સ્પેશિયલ કાજુ મખાના શાહી કોરમા',
      hi: 'पर्युषण स्पेशल मखाना एवं काजू शाही कोरमा'
    },
    description: {
      en: 'Royal Jain festive curry without tomatoes, greens or root vegs. Made with crunchy roasted foxnuts and cashew cream.',
      gu: 'પર્યુષણમાં લીલોતરી ત્યાગ દિવસો માટે કાજુ પેસ્ટ અને મખાનામાંથી બનતું રાજભોગ શાક.',
      hi: 'बिना हरी सब्जी और बिना टमाटर, काजू और मखाने की लाजवाब शाही सब्जी।'
    },
    category: 'tithi',
    tags: ['Paryushan Approved', 'Tithi Safe', 'Royal Jain', 'Zero Greens'],
    videoUrl: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    authorName: 'Shilpa Vora',
    ingredients: ['foxnuts-makhana', 'cashews', 'ghee', 'cow-milk', 'cinnamon-clove', 'black-pepper', 'dry-ginger-sunth', 'asafoetida'],
    prepTimeMinutes: 10, cookTimeMinutes: 15, servings: 3,
    instructions: {
      en: [
        'Dry roast makhanas in 1 tsp ghee until crisp.',
        'Grind soaked cashews with milk into a smooth paste.',
        'In a pan, heat ghee with whole cinnamon and cloves.',
        'Add cashew milk paste, sunth, salt and black pepper.',
        'Simmer until thickened, drop roasted makhanas and serve with puris.'
      ],
      gu: [
        'મખાનાને ઘીમાં શેકી કુરકુરા કરી લો.',
        'પલાળેલા કાજુને દૂધ સાથે પીસી પેસ્ટ બનાવો.',
        'ઘીમાં તજ-લવિંગ વઘારી કાજુ પેસ્ટ, સૂંઠ અને મરી ઉમેરો.',
        'ગ્રેવી ઘટ્ટ થાય એટલે શેકેલા મખાના ઉમેરો.'
      ],
      hi: [
        'मखाने को घी में क्रिस्पी भून लें।',
        'काजू को दूध के साथ महीन पीस लें।',
        'घी में दालचीनी-लौंग तड़काएं और काजू पेस्ट डालें। सोंठ और काली मिर्च मिलाएं।',
        'मखाने डालकर गरमागरम पूरी के साथ परोसें।'
      ]
    },
    rating: 4.88, ratingCount: 45,
    reviews: [
      { id: 'rev-5', userName: 'Ketan Shah', rating: 5, comment: 'Saved our dinner during Paryushan! Rich and protein-packed.', createdAt: '2026-10-14' }
    ],
    viewsCount: 2200, likesCount: 540, createdAt: '2026-10-10',
    hasBread: false, hasButter: false, hasCheese: false, isTithiCompliant: true
  },
  {
    id: 'rec-5',
    title: {
      en: 'Italian Jain Penne Pasta in Roast Tomato Sauce',
      gu: 'જૈન ઇટાલિયન પાસ્તા (રોસ્ટેડ ટામેટા સોસ)',
      hi: 'जैन पास्ता (भुने टमाटर सॉस में)'
    },
    description: {
      en: '100% vegetarian durum wheat pasta tossed in herb-infused fresh tomato gravy. No onion, no garlic.',
      gu: 'ડુંગળી-લસણ વગર રોસ્ટેડ ટમેટા અને ઓલિવ ઓઇલમાં ઇટાલિયન પાસ્તા.',
      hi: 'बिना प्याज लहसुन, ताजे टमाटरों से बने सॉस में लिपटा पास्ता।'
    },
    category: 'normal',
    tags: ['Continental Jain', 'Kids Favorite', 'Durum Wheat'],
    videoUrl: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    authorName: 'Ronak Gada',
    ingredients: ['durum-pasta', 'tomato', 'capsicum', 'olive-oil', 'black-pepper', 'processed-cheese'],
    prepTimeMinutes: 15, cookTimeMinutes: 20, servings: 3,
    instructions: {
      en: [
        'Boil penne in salted water till al dente.',
        'Roast whole tomatoes and capsicums, peel and blend into sauce.',
        'Simmer sauce in olive oil with pepper and salt.',
        'Toss boiled pasta in the sauce and garnish with grated cheese.'
      ],
      gu: [
        'પાસ્તાને મીઠાવાળા પાણીમાં બાફી લો.',
        'ટામેટા અને કેપ્સિકમ શેકી પ્યુરી બનાવો.',
        'ઓલિવ ઓઈલમાં પ્યુરી અને મરી સાંતળો.',
        'પાસ્તા મિક્સ કરી ચીઝ છાંટી પીરસો.'
      ],
      hi: [
        'पास्ता को नमक वाले पानी में उबाल लें।',
        'टमाटर और शिमला मिर्च की प्यूरी बनाकर ऑलिव ऑयल में पकाएं।',
        'पास्ता मिलाकर ऊपर से चीज कद्दूकस करें।'
      ]
    },
    rating: 4.75, ratingCount: 31, reviews: [],
    viewsCount: 1890, likesCount: 420, createdAt: '2026-10-08',
    hasBread: false, hasButter: false, hasCheese: true, isTithiCompliant: false
  },
  {
    id: 'rec-6',
    title: {
      en: 'Steamed Gujarati Lauki Dudhi Muthiya',
      gu: 'ગરમાગરમ દૂધી મુઠીયા (નો બ્રેડ/બટર)',
      hi: 'गुजराती भाप वाले दूधी मुठिया (जीरो बटर, चीज)'
    },
    description: {
      en: 'Healthy steamed dumplings made with fresh grated bottle gourd, wheat flour and tempered with sesame seeds.',
      gu: 'દૂધી અને ઘઉં-ચણાના લોટમાંથી બનતા વરાળિયા મુઠીયા, તલ-રાઈના વઘાર સાથે.',
      hi: 'लौकी और आटों से बने कम तेल के भाप वाले पारंपरिक मुठिया।'
    },
    category: 'no-cheese-butter-bread',
    tags: ['Zero Dairy', 'Steamed Snack', 'Guilt-Free', 'High Fiber'],
    videoUrl: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    authorName: 'Darshana Parekh',
    ingredients: ['bottle-gourd', 'wheat-flour', 'besan', 'suji', 'sesame-oil', 'mustard-seeds', 'turmeric', 'carom-seeds'],
    prepTimeMinutes: 15, cookTimeMinutes: 20, servings: 4,
    instructions: {
      en: [
        'Grate fresh peeled bottle gourd and squeeze excess water.',
        'Mix with wheat flour, besan, suji, ajwain, turmeric, oil and salt.',
        'Shape into cylindrical logs and steam for 20 minutes.',
        'Cool, slice, and temper in oil with mustard seeds and sesame seeds.'
      ],
      gu: [
        'દૂધી છીણી લોટ, બેસન, રવો, અજમો અને મસાલા મેળવી લોટ બાંધો.',
        'રોલ બનાવી સ્ટીમરમાં 20 મિનિટ બાફો.',
        'કાપીને રાઈ-તલના વઘારમાં ક્રિસ્પી કરો.'
      ],
      hi: [
        'कद्दूकस लौकी में आटा, बेसन, सूजी और मसाले मिलाकर रोल बनाएं।',
        'भाप में 20 मिनट पकाएं, ठंडा करके काटें और राई-तिल में तड़काएं।'
      ]
    },
    rating: 4.9, ratingCount: 19, reviews: [],
    viewsCount: 1550, likesCount: 390, createdAt: '2026-10-05',
    hasBread: false, hasButter: false, hasCheese: false, isTithiCompliant: false
  }
];
