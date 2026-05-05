import type { Shloka } from "@/types";

export const SUGGESTED_TOPICS = [
  { label: "Rasas", category: "rasa" as const, emoji: "" },
  { label: "Mudras", category: "mudra" as const, emoji: "" },
  { label: "Abhinaya", category: "abhinaya" as const, emoji: "" },
  { label: "Chapters", category: "general" as const, emoji: "" },
];

export const MOCK_SHLOKAS: Shloka[] = [
  {
    id: "1",
    sanskrit: "रसात्मकं वाक्यं काव्यम्।\nश्रृङ्गारहास्यकरुणरौद्रवीरभयानकाः।\nबीभत्साद्भुतसंज्ञौ चेत्यष्टौ नाट्ये रसाः स्मृताः॥",
    transliteration:
      "Rasātmakaṃ vākyaṃ kāvyam. Śṛṅgāra-hāsya-karuṇa-raudra-vīra-bhayānakāḥ. Bībhatsādbhuta-saṃjñau cety aṣṭau nāṭye rasāḥ smṛtāḥ.",
    translation:
      "Poetry is a sentence whose soul is rasa. The eight rasas recognised in drama are: Śṛṅgāra (love), Hāsya (laughter), Karuṇa (compassion), Raudra (fury), Vīra (heroism), Bhayānaka (terror), Bībhatsa (disgust), and Adbhuta (wonder).",
    explanation:
      "This foundational verse from the Natyashastra establishes the eight primary rasas (aesthetic sentiments) that form the emotional core of all Indian classical performing arts. Bharata Muni explains that a dramatic work achieves its purpose only when it evokes these refined emotional experiences in the audience (rasika). Each rasa has a corresponding sthāyibhāva (dominant mood), vibhāva (stimulus), anubhāva (physical reaction), and vyabhicāribhāva (transient feelings).",
    application:
      "Dancers use the eight rasas as the foundation for expressive storytelling in Abhinaya.",
    chapter: "Chapter 6 – Rasadhyaya",
    category: "rasa",
  },
  {
    id: "2",
    sanskrit:
      "पताका त्रिपताका च अर्धपताका कर्तरीमुखी।\nमयूराख्यश्च अर्धचन्द्रश्च अरालः शुकतुण्डकः॥",
    transliteration:
      "Patākā tripatākā ca ardhapatākā kartarīmukhī. Mayūrākhyaśca ardhacandrśca arālaḥ śukatuṇḍakaḥ.",
    translation:
      "Pataka, Tripataka, Ardhapataka, Kartarimukhi, Mayura, Ardhachandra, Arala, and Shukatunda — these are among the single-hand gestures (Asamyuta Hastas).",
    explanation:
      "This verse enumerates the first group of Asamyuta Hastas (single-hand gestures) described in the Natyashastra. Each hasta has a specific finger configuration and a range of viniyogas (prescribed uses) in drama. For instance, Pataka (flag) — all fingers extended and pressed together — is used to represent wind, river, horse-riding, clouds, and more. These mudras are the gestural vocabulary of classical dance.",
    application:
      "Perform Pataka Hasta by extending all four fingers together with the thumb bent — used to depict blessings, clouds, forests, and denial.",
    chapter: "Chapter 9 – Hastabhinaya",
    category: "mudra",
  },
  {
    id: "3",
    sanskrit:
      "आङ्गिकोऽथ वाचिकश्चैव आहार्यः सात्त्विकस्तथा।\nचत्वारोऽभिनयाः प्रोक्ताः नाट्यस्य प्रयोगे तु॥",
    transliteration:
      "Āṅgiko'tha vācikaścaiva āhāryaḥ sāttvikas tathā. Catvāro'bhinayāḥ proktāḥ nāṭyasya prayoge tu.",
    translation:
      "Angika (body), Vachika (speech), Aharya (costume/ornament), and Sattvika (emotional/psychic) — these are the four types of Abhinaya declared for the practice of drama.",
    explanation:
      "Bharata describes four modes of dramatic expression (Abhinaya) that together constitute the complete performer's toolkit. Āṅgika Abhinaya communicates through body movements — limbs, face, and posture. Vācika Abhinaya uses voice — dialogue, song, intonation, and diction. Āhārya Abhinaya encompasses costume, makeup, stage properties, and scenic effects. Sāttvika Abhinaya is the most refined — it arises from the actor's inner emotional truth and manifests as involuntary physical responses such as tears, trembling, and perspiration.",
    application:
      "A dancer must master all four abhinayas, balancing external expression with genuine inner emotion (sattva) for an authentic performance.",
    chapter: "Chapter 8 – Abhinayadhyaya",
    category: "abhinaya",
  },
  {
    id: "4",
    sanskrit:
      "भ्रूविक्षेपस्तथा भ्रूचलनं भ्रूपातश्च कुट्टनम्।\nभ्रूचतुष्टयमेवोक्तं नाट्यशास्त्रविशारदैः॥",
    transliteration:
      "Bhrūvikṣepas tathā bhrūcalanaṃ bhrūpātaśca kuṭṭanam. Bhrūcatuṣṭayam evoktaṃ nāṭyaśāstraviśāradaiḥ.",
    translation:
      "The raising of the eyebrows, their movement, their dropping, and knitting — these four eyebrow-actions are described by the experts of Natyashastra.",
    explanation:
      "This verse focuses on the subtle art of bhru-abhinaya (eyebrow expression), a critical element of mukha-abhinaya (facial expression). The four eyebrow movements — vikṣepa (raising), calana (quivering/movement), pāta (lowering), and kuṭṭana (knitting/contraction) — convey a vast range of emotions from surprise and delight to anger and concentration. Mastery of these micro-expressions distinguishes a skilled performer.",
    application:
      "Practice isolating each eyebrow movement to enhance facial expressiveness — vikṣepa for wonder, kuṭṭana for anger.",
    chapter: "Chapter 8 – Abhinayadhyaya",
    category: "abhinaya",
  },
  {
    id: "5",
    sanskrit:
      "शृङ्गारः करुणो रौद्रो वीरो बीभत्स एव च।\nहास्यो भयानकश्चैव शान्तो रसः प्रकीर्तितः॥",
    transliteration:
      "Śṛṅgāraḥ karuṇo raudro vīro bībhatsa eva ca. Hāsyo bhayānakaścaiva śānto rasaḥ prakīrtitaḥ.",
    translation:
      "Shringara (love), Karuna (compassion), Raudra (wrath), Vira (valour), Bibhatsa (disgust), Hasya (mirth), Bhayanaka (fear), and Shanta (peace) — these are the celebrated rasas.",
    explanation:
      "While the original Natyashastra lists eight rasas, later scholars — most notably Abhinavagupta — added Śānta (tranquillity/peace) as the ninth rasa. This verse reflects that expanded canon. Shanta rasa arises from nirveda (detachment) and is considered the highest rasa by many Shaivite scholars, representing spiritual peace. It is embodied in meditative sequences and devotional compositions in classical dance.",
    application:
      "Shanta rasa is evoked in devotional items like Shiva Stutis or compositions depicting meditation and spiritual surrender.",
    chapter: "Chapter 6 – Rasadhyaya",
    category: "rasa",
  },
  {
    id: "6",
    sanskrit:
      "अञ्जलिश्चापविद्धश्च कटकावर्धमानकौ।\nकर्तरीस्वस्तिकश्चैव उत्संगश्च तथैव च॥",
    transliteration:
      "Añjaliś cāpaviddhaśca kaṭakāvardhamānakau. Kartarīsvastikśccaiva utsaṅgaśca tathaiva ca.",
    translation:
      "Anjali, Kapota, Karkata, Swastika, Utsanga, and others — these are the combined hand gestures (Samyuta Hastas).",
    explanation:
      "This verse introduces the Samyuta Hastas (combined/double-hand gestures) from the Natyashastra. Unlike single-hand gestures (Asamyuta), these require both hands working together. Anjali (palms joined in prayer) is the most universally recognised — used for salutation, devotion, and greeting. Each combined gesture has multiple viniyogas: for example, Karkata (crab — interlocked fingers) can represent a beehive, a crowd, or bending a bow.",
    application:
      "Anjali Hasta (palms joined) is the universal gesture of Namaskara — used at the beginning and end of every dance performance.",
    chapter: "Chapter 9 – Hastabhinaya",
    category: "mudra",
  },
];

export function searchShlokas(query: string, filters?: { rasa?: boolean; mudra?: boolean; chapter?: boolean }): Shloka[] {
  const q = query.toLowerCase().trim();

  if (!q) return [];

  let results = MOCK_SHLOKAS.filter((shloka) => {
    const searchText = [
      shloka.sanskrit,
      shloka.transliteration,
      shloka.translation,
      shloka.explanation,
      shloka.application,
      shloka.chapter,
      shloka.category,
    ]
      .join(" ")
      .toLowerCase();

    return searchText.includes(q);
  });

  // Apply category filters if any are active
  if (filters) {
    const activeFilters = Object.entries(filters)
      .filter(([, active]) => active)
      .map(([key]) => key);

    if (activeFilters.length > 0) {
      results = results.filter((shloka) => {
        if (activeFilters.includes("rasa") && shloka.category === "rasa") return true;
        if (activeFilters.includes("mudra") && shloka.category === "mudra") return true;
        if (activeFilters.includes("chapter")) return true; // chapter filter shows all
        return false;
      });
    }
  }

  return results;
}
