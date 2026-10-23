import { JAIN_INGREDIENTS_LIST } from '../data/ingredients';
import { STARTER_RECIPES } from '../data/recipes';
import { Language } from '../types';

export interface AICookResponse {
  recipeName: string;
  category: 'tithi' | 'normal' | 'no-cheese-butter-bread';
  matchedIngredients: string[];
  additionalRecommendedSpices: string[];
  prepTime: string;
  cookTime: string;
  steps: string[];
  jainComplianceNote: string;
  tithiSuitable: boolean;
}

export function askJainAIChef(userPrompt: string, lang: Language): AICookResponse[] {
  const query = userPrompt.toLowerCase();

  // Scenario 1: Bread & Milk
  if ((query.includes('bread') && query.includes('milk')) || (query.includes('બ્રેડ') && query.includes('દૂધ')) || (query.includes('ब्रेड') && query.includes('दूध'))) {
    if (lang === 'gu') {
      return [
        {
          recipeName: 'જૈન મલાઈ મિલ્ક ટોસ્ટ / શાહી ટુકડા (ઇંડા રહિત)',
          category: 'normal',
          matchedIngredients: ['બ્રેડ (ઇંડા રહિત)', 'તાજું દૂધ'],
          additionalRecommendedSpices: ['ખાંડ/સાકર', 'એલચી પાવડર', 'કેસર અથવા ઘી'],
          prepTime: '૫ મિનિટ',
          cookTime: '૧૦ મિનિટ',
          steps: [
            'દૂધને કડાઈમાં ઉકાળી થોડું ઘટ્ટ રબડી જેવું બનાવો અને તેમાં સાકર ઉમેરો.',
            'તવા પર બ્રેડની સ્લાઇસને ઘીમાં આછી ગુલાબી શેકી લો.',
            'શેકેલી ક્રિસ્પી બ્રેડ પર ગરમાગરમ ઘટ્ટ દૂધ-મલાઈ રેડો.',
            'ઉપર એલચી પાવડર છાંટી તરત જ પીરસો. ૧૦૦% શુદ્ધ જૈન ડેઝર્ટ તૈયાર!'
          ],
          jainComplianceNote: '૧૦૦% શુદ્ધ જૈન: કોઈ ઈંડા કે અસત્ય તત્ત્વો નથી. નોંધ: તિથિના દિવસે બ્રેડ ન લેવી.',
          tithiSuitable: false
        },
        {
          recipeName: 'જૈન બ્રેડ ઉપમા (સાત્વિક ટ્વિસ્ટ)',
          category: 'normal',
          matchedIngredients: ['બ્રેડ', 'દૂધ (દહીં/છાશ માટે)'],
          additionalRecommendedSpices: ['રાઈ', 'જીરું', 'હળદર', 'હિંગ', 'તેલ'],
          prepTime: '૫ મિનિટ',
          cookTime: '૮ મિનિટ',
          steps: [
            'બ્રેડની સ્લાઈસના નાના ચોરસ ટુકડા કરી લો.',
            'પેનમાં ૧ ચમચી તેલ ગરમ કરી રાઈ, જીરું અને હિંગનો વઘાર કરો.',
            'બ્રેડના ટુકડા પર ૨ ચમચી દૂધનો છંટકાવ કરો જેથી તે નરમ રહે.',
            'વઘારમાં હળદર, મીઠું અને મસાલા સાથે બ્રેડ ઉમેરી ૨ મિનિટ ધીમા તાપે સાંતળો.'
          ],
          jainComplianceNote: 'શાકાહારી જૈન બ્રેડ અને શુદ્ધ સામગ્રીથી બનેલ.',
          tithiSuitable: false
        }
      ];
    } else if (lang === 'hi') {
      return [
        {
          recipeName: 'जैन शाही मलाई टोस्ट (बिना अंडा, 100% सात्विक)',
          category: 'normal',
          matchedIngredients: ['एगलेस शुद्ध ब्रेड', 'ताजा गाय का दूध'],
          additionalRecommendedSpices: ['शक्कर / मिश्री', 'इलायची पाउडर', 'शुद्ध घी'],
          prepTime: '5 मिनट',
          cookTime: '10 मिनट',
          steps: [
            'दूध को पैन में थोड़ा गाढ़ा करके रबड़ीनुमा बनाएं और मिश्री/चीनी मिलाएं।',
            'तवे पर शुद्ध घी में ब्रेड को दोनों तरफ से क्रिस्पी सेंकें।',
            'सेंकी हुई ब्रेड पर गर्म गाढ़ा दूध और मलाई डालें।',
            'इलायची पाउडर बुरकें और गरमागरम परोसें। अत्यंत स्वादिष्ट और त्वरित मीठा व्यंजन!'
          ],
          jainComplianceNote: '100% जैन: बिना खमीर/अंडा के ब्रेड का उपयोग करें। तिथि पर ब्रेड वर्जित है।',
          tithiSuitable: false
        },
        {
          recipeName: 'जैन ब्रेड हलवा / पुडिंग',
          category: 'normal',
          matchedIngredients: ['ब्रेड', 'दूध'],
          additionalRecommendedSpices: ['घी', 'चीनी', 'इलायची'],
          prepTime: '5 मिनट',
          cookTime: '12 मिनट',
          steps: [
            'ब्रेड के टुकड़ों को घी में सुनहरा भून लें।',
            'उबलता हुआ दूध और चीनी डालकर अच्छी तरह चलाएं जब तक हलवा गाढ़ा न हो जाए।',
            'इलायची पाउडर मिलाकर गरमागरम परोसें।'
          ],
          jainComplianceNote: 'शुद्ध सामग्री, आलू/प्याज रहित।',
          tithiSuitable: false
        }
      ];
    } else {
      return [
        {
          recipeName: 'Jain Shahi Malai Toast (Eggless & Satvik)',
          category: 'normal',
          matchedIngredients: ['Pure Eggless Bread', 'Fresh Whole Milk'],
          additionalRecommendedSpices: ['Sugar / Mishri', 'Cardamom powder', 'Pure Desi Ghee'],
          prepTime: '5 mins',
          cookTime: '10 mins',
          steps: [
            'Boil and simmer milk in a pan until reduced to a fragrant creamy consistency, sweeten with raw sugar.',
            'Lightly roast bread slices in pure ghee on a tawa until golden and crisp.',
            'Ladle the hot condensed milk generously over the crisp toasted bread.',
            'Garnish with aromatic cardamom and dry fruit slivers. A heavenly, quick Jain sweet!'
          ],
          jainComplianceNote: '100% Jain: Zero eggs or non-veg additives. Note: Bread is avoided on solemn Tithi fasting days.',
          tithiSuitable: false
        },
        {
          recipeName: 'Jain Bread Upma / Savory French Toast Slices',
          category: 'normal',
          matchedIngredients: ['Bread', 'Milk'],
          additionalRecommendedSpices: ['Mustard seeds', 'Cumin seeds', 'Turmeric', 'Hing', 'Oil'],
          prepTime: '5 mins',
          cookTime: '8 mins',
          steps: [
            'Cut fresh bread slices into bite-sized cubes.',
            'Splutter mustard and cumin seeds with hing in 1 tbsp oil.',
            'Sprinkle 2 tbsp milk over bread cubes to soften gently without getting soggy.',
            'Toss with turmeric, salt, and chilli powder for 2-3 minutes. Serve warm!'
          ],
          jainComplianceNote: 'Pure Jain preparation without onions or potatoes.',
          tithiSuitable: false
        }
      ];
    }
  }

  // Scenario 2: Besan / Gram Flour & Curd
  if (query.includes('besan') || query.includes('chana') || query.includes('બેસન') || query.includes('बेसन')) {
    return [
      {
        recipeName: lang === 'gu' ? 'તિથિ સ્પેશિયલ દહીં-બેસન કઢી અને પૂરી' : lang === 'hi' ? 'तिथि स्पेशल बेसन कढ़ी एवं पूड़ी' : 'Tithi Special Rajasthani Besan Kadhi',
        category: 'tithi',
        matchedIngredients: ['Gram Flour (Besan)', 'Fresh Curd / Buttermilk'],
        additionalRecommendedSpices: ['Cumin', 'Fenugreek seeds (Methi dana)', 'Hing', 'Turmeric', 'Ghee'],
        prepTime: '8 mins',
        cookTime: '15 mins',
        steps: [
          'Whisk 2 tbsp besan with 1 cup sour curd and 2 cups water until lump-free.',
          'Heat ghee in a pot, add rai, jeera, methi seeds and asafoetida.',
          'Pour the besan buttermilk mixture while continuously stirring until first boil.',
          'Add turmeric, rock salt, and simmer for 10 minutes. 100% safe for Atham/Chaudas!'
        ],
        jainComplianceNote: 'Strictly 0 green vegetables. 100% Tithi and Parva compliant.',
        tithiSuitable: true
      },
      {
        recipeName: lang === 'gu' ? 'કુરકુરા ચણાના લોટના પુડલા / ચીલ્લા' : lang === 'hi' ? 'कुरकुरा बेसन का चीला (नो बटर, नो चीज)' : 'Crispy Besan Chilla (Zero Butter, Zero Cheese)',
        category: 'no-cheese-butter-bread',
        matchedIngredients: ['Besan'],
        additionalRecommendedSpices: ['Carom seeds (Ajwain)', 'Hing', 'Turmeric', 'Coriander-cumin powder'],
        prepTime: '5 mins',
        cookTime: '10 mins',
        steps: [
          'Mix besan with water, ajwain, hing, haldi and salt into pouring batter.',
          'Heat a flat tawa with a light brush of oil.',
          'Pour a ladle of batter and spread thin in circular motion.',
          'Roast till golden crisp on both sides. Serve with homemade dry dates or amchur chutney.'
        ],
        jainComplianceNote: 'High protein, vegan, no dairy or bread required.',
        tithiSuitable: true
      }
    ];
  }

  // Scenario 3: Moong Dal / Rice / Khichdi
  if (query.includes('moong') || query.includes('rice') || query.includes('ખીચડી') || query.includes('खिचड़ी') || query.includes('ચોખા') || query.includes('चावल')) {
    return [
      {
        recipeName: lang === 'gu' ? 'સાત્વિક મગ-ચોખા ખીચડી' : lang === 'hi' ? 'सात्विक मूंग दाल खिचड़ी' : 'Satvik Yellow Moong Dal Khichdi',
        category: 'tithi',
        matchedIngredients: ['Yellow Moong Dal', 'Basmati Rice'],
        additionalRecommendedSpices: ['Roasted Cumin', 'Hing', 'Black Pepper', 'Desi Ghee'],
        prepTime: '5 mins',
        cookTime: '15 mins',
        steps: [
          'Wash 1 cup rice and 1/2 cup yellow split moong dal.',
          'Pressure cook with 4 cups water, 1/2 tsp haldi and salt for 3 whistles.',
          'Give a gentle tempering of roasted jeera and hing in 1 tsp pure desi ghee.',
          'Serve steaming hot. Ideal for fasting and parva digestion.'
        ],
        jainComplianceNote: 'Perfect for Paryushan, Atham, Chaudas and everyday satvik diet.',
        tithiSuitable: true
      }
    ];
  }

  // Default intelligent Jain recipe synthesis
  return [
    {
      recipeName: lang === 'gu' ? 'પરંપરાગત જૈન સૂકા કઠોળ મસાલા' : lang === 'hi' ? 'प्रामाणिक जैन सूखा दाल मसाला' : 'Authentic Jain Dry Lentil & Gatta Stir-fry',
      category: 'tithi',
      matchedIngredients: ['Pulses / Grains from your kitchen'],
      additionalRecommendedSpices: ['Cumin', 'Hing', 'Dry Ginger (Sunth)', 'Turmeric', 'Kashmiri Chilli'],
      prepTime: '10 mins',
      cookTime: '18 mins',
      steps: [
        'Select any available Jain pulse (Moong, Chana, or Besan).',
        'Boil until soft and tender with a pinch of turmeric and salt.',
        'Heat 1 tbsp ghee or cold pressed oil, crackle cumin seeds and aromatic hing.',
        'Toss boiled pulses with sunth (dry ginger powder), dhana-jeeru and chilli powder.',
        'Simmer for 4 minutes so spices meld thoroughly.'
      ],
      jainComplianceNote: 'Strictly 100% Ahimsak Jain: Zero onion, zero garlic, zero potatoes.',
      tithiSuitable: true
    }
  ];
}
