// src/lib/questions.js
// Programme officiel Éducation Nationale 2025

export const SUBJECTS = {
  jade: {
    math:     { label: 'Maths 6e',           ref: 'Cycle 3 · BO avril 2025', color: 'brand' },
    francais: { label: 'Français 6e',         ref: 'Cycle 3 · BO avril 2025', color: 'jade'  },
    anglais:  { label: 'Anglais LV1',         ref: '6e · EN 2025',            color: 'hugo'  },
    histoire: { label: 'Histoire-Géo',        ref: '6e programme EN',         color: 'brand' },
    sciences: { label: 'Sciences & Techno',   ref: '6e programme EN',         color: 'hugo'  },
    culture:  { label: 'Culture gén. / EMC',  ref: '6e programme EN',         color: 'jade'  },
  },
  hugo: {
    math:     { label: 'Maths CE2',           ref: 'Cycle 2 · BO 2025',       color: 'brand' },
    francais: { label: 'Français CE2',        ref: 'Cycle 2 · BO 2025',       color: 'jade'  },
    anglais:  { label: 'Anglais',             ref: 'CE2 · initiation orale',  color: 'hugo'  },
    monde:    { label: 'Questionner le monde',ref: 'CE2 programme EN',        color: 'hugo'  },
    culture:  { label: 'Culture gén. / EMC',  ref: 'CE2 programme EN',        color: 'jade'  },
  },
}

export const QUESTIONS = {
  jade: {
    math: [
      { q: '3/4 + 1/4 = ?', opts: ['1/2','4/4 = 1','2/4','3/8'], ans: 1, ref: '6e · Fractions', expl: '3/4 + 1/4 = 4/4 = 1 entier. On additionne les numérateurs quand le dénominateur est identique.' },
      { q: 'Quel est le plus grand : 0,75 ou 3/4 ?', opts: ['0,75','3/4','Ils sont égaux','Impossible à comparer'], ans: 2, ref: '6e · Fractions et décimaux', expl: '3/4 = 0,75. Ce sont deux écritures du même nombre, ils sont égaux.' },
      { q: 'Rectangle 12 cm × 5 cm — périmètre ?', opts: ['17 cm','34 cm','60 cm','24 cm'], ans: 1, ref: '6e · Géométrie', expl: 'P = 2×(L+l) = 2×(12+5) = 2×17 = 34 cm.' },
      { q: '17 est-il un nombre premier ?', opts: ['Oui','Non, divisible par 3','Non, car pair','Non, car > 10'], ans: 0, ref: '6e · Nombres premiers', expl: '17 est premier : ses seuls diviseurs sont 1 et 17.' },
      { q: 'Écris en chiffres : cinq millions deux cent mille trente', opts: ['5 200 030','520 030','5 020 030','5 200 300'], ans: 0, ref: '6e · Grands nombres', expl: '5 200 030 : 5 millions + 200 milliers + 30 unités.' },
      { q: '2/3 de 90 = ?', opts: ['30','45','60','70'], ans: 2, ref: '6e · Fractions d\'un nombre', expl: '2/3 de 90 = 90 ÷ 3 × 2 = 30 × 2 = 60.' },
    ],
    francais: [
      { q: "'Les oiseaux chantent.' — Nature de 'chantent' ?", opts: ['Nom','Adjectif','Verbe conjugué','Adverbe'], ans: 2, ref: '6e · Classes grammaticales', expl: '\'Chantent\' est un verbe conjugué au présent, 3e pers. du pluriel.' },
      { q: "'Elle ___ partie tôt.' — Auxiliaire correct ?", opts: ['a','est','avait','sera'], ans: 1, ref: '6e · Passé composé avec être', expl: 'Partir → auxiliaire ÊTRE : elle est partie. Verbes de mouvement = être.' },
      { q: "Sens du préfixe 'in-' dans 'invisible' ?", opts: ['À l\'intérieur','Négation / contraire','Qui vient de','À nouveau'], ans: 1, ref: '6e · Formation des mots', expl: '\'in-\' = négation : invisible = qu\'on ne peut PAS voir. Aussi : impossible, illisible...' },
      { q: "'Ses yeux sont des étoiles' — Figure de style ?", opts: ['Comparaison','Métaphore','Personnification','Hyperbole'], ans: 1, ref: '6e · Figures de style', expl: 'Métaphore : comparaison SANS \'comme\'. On dit \'ses yeux SONT des étoiles\'.' },
      { q: "Quel est le sujet de : 'Chaque matin, les enfants courent.' ?", opts: ['Chaque matin','les enfants','courent','matin'], ans: 1, ref: '6e · Fonctions grammaticales', expl: '\'Les enfants\' est le sujet : ce sont eux qui courent.' },
    ],
    histoire: [
      { q: 'Quelle civilisation a inventé la démocratie ?', opts: ['Rome','Égypte','Grèce antique','Mésopotamie'], ans: 2, ref: '6e · Grèce antique', expl: 'La démocratie est née à Athènes au Ve s. av. J.-C. Demos = peuple, kratos = pouvoir.' },
      { q: 'Entre quels fleuves était la Mésopotamie ?', opts: ['Nil et mer Rouge','Tigre et Euphrate','Rhin et Danube','Indus et Gange'], ans: 1, ref: '6e · Premières civilisations', expl: 'Mésopotamie = pays entre les fleuves Tigre et Euphrate. Actuel Irak.' },
      { q: 'Qu\'est-ce que la préhistoire ?', opts: ['Avant les Romains','Avant l\'écriture','Le Moyen Âge','Avant l\'an 1000'], ans: 1, ref: '6e · Chronologie', expl: 'La préhistoire précède l\'invention de l\'écriture (~3300 av. J.-C.).' },
      { q: 'Quel peuple a construit les pyramides de Gizeh ?', opts: ['Les Grecs','Les Romains','Les Égyptiens','Les Perses'], ans: 2, ref: '6e · Égypte ancienne', expl: 'Les pyramides de Gizeh ont été construites vers 2560 av. J.-C. par les Égyptiens.' },
    ],
    sciences: [
      { q: 'Critère définissant un mammifère ?', opts: ['Pond des œufs','Allaite ses petits + poumons','Vit dans l\'eau','A des écailles'], ans: 1, ref: '6e · Classification du vivant', expl: 'Les mammifères allaitent leurs petits et respirent par des poumons — même les dauphins !' },
      { q: 'Qu\'est-ce qu\'une cellule ?', opts: ['Un organe','L\'unité de base du vivant','Un tissu musculaire','Un groupe d\'organes'], ans: 1, ref: '6e · La cellule', expl: 'La cellule est la plus petite unité vivante. Tous les êtres vivants en sont composés.' },
      { q: 'Planète la plus éloignée du Soleil ?', opts: ['Jupiter','Saturne','Neptune','Uranus'], ans: 2, ref: '6e · Système solaire', expl: 'Neptune est à 4,5 milliards de km du Soleil.' },
      { q: 'Qu\'est-ce que la photosynthèse ?', opts: ['Respiration nocturne','Fabrication de matière grâce à la lumière','Décomposition des feuilles','Circulation de la sève'], ans: 1, ref: '6e · Photosynthèse', expl: 'Photosynthèse : lumière + CO₂ + H₂O → glucose + O₂.' },
    ],
    culture: [
      { q: 'Qu\'est-ce que la laïcité en France ?', opts: ['Religion officielle de l\'État','Séparation État / religions','Interdiction de toute religion','Un principe européen'], ans: 1, ref: '6e · EMC — République', expl: 'La laïcité (loi 1905) sépare l\'État des religions et garantit la liberté de conscience.' },
      { q: 'Qui a écrit "Les Misérables" ?', opts: ['Zola','Flaubert','Victor Hugo','Dumas'], ans: 2, ref: '6e · Culture littéraire', expl: 'Victor Hugo (1802-1885) a écrit Les Misérables (1862), Notre-Dame de Paris (1831)...' },
      { q: 'Quel instrument est à cordes frottées ?', opts: ['Trompette','Guitare','Violon','Piano'], ans: 2, ref: '6e · Éducation artistique', expl: 'Le violon est à cordes frottées (archet). Guitare = pincées, piano = frappées.' },
      { q: 'Combien d\'articles dans la DDHC de 1789 ?', opts: ['10','17','25','42'], ans: 1, ref: '6e · EMC — Droits fondamentaux', expl: 'La Déclaration des droits de l\'Homme et du Citoyen comporte 17 articles.' },
    ],
  },
  hugo: {
    math: [
      { q: 'Écris en chiffres : sept mille quatre-vingt-six', opts: ['7 086','7 860','7 806','70 086'], ans: 0, ref: 'CE2 · Nombres jusqu\'à 10 000', expl: '7 086 : 7 milliers, 0 centaines, 8 dizaines, 6 unités.' },
      { q: '7 × 8 = ?', opts: ['54','56','48','63'], ans: 1, ref: 'CE2 · Table ×7', expl: '7 × 8 = 56. Astuce : 7×7=49, +7=56 !' },
      { q: 'Quelle fraction représente la moitié ?', opts: ['1/3','1/4','1/2','2/3'], ans: 2, ref: 'CE2 · Fractions (nouveau 2025)', expl: '1/2 = la moitié. On partage en 2 parts égales et on prend 1.' },
      { q: 'Carré de 5 cm — périmètre ?', opts: ['10 cm','15 cm','20 cm','25 cm'], ans: 2, ref: 'CE2 · Géométrie — périmètre', expl: 'Périmètre du carré = 4 × côté = 4 × 5 = 20 cm.' },
      { q: '46 + 37 = ?', opts: ['73','83','81','93'], ans: 1, ref: 'CE2 · Calcul mental', expl: '46+37 : 46+30=76, puis 76+7=83.' },
      { q: 'Le double de 34 = ?', opts: ['58','68','64','72'], ans: 1, ref: 'CE2 · Calcul — doubles', expl: 'Double = ×2. 34×2 = 68.' },
    ],
    francais: [
      { q: "'Le chien ___ mangé.' — Bon mot ?", opts: ['a','à'], ans: 0, ref: 'CE2 · Homophones a / à', expl: '\'a\' = verbe avoir (test : remplace par \'avait\'). \'à\' = préposition.' },
      { q: "Pluriel de 'cheval' ?", opts: ['des chevals','des chevaux','des chevales','des cheval'], ans: 1, ref: 'CE2 · Pluriels en -al → -aux', expl: 'Cheval → chevaux. Pareil pour animal→animaux, journal→journaux.' },
      { q: "Contraire (antonyme) de 'rapide' ?", opts: ['Vite','Lent','Grand','Fort'], ans: 1, ref: 'CE2 · Vocabulaire — antonymes', expl: 'Le contraire de rapide est lent.' },
      { q: "'Les enfants joue dans le jardin.' — Corrige.", opts: ['C\'est correct','Les enfants jouent','Les enfants joues','Les enfant jouent'], ans: 1, ref: 'CE2 · Accord sujet-verbe', expl: 'Sujet pluriel \'les enfants\' → verbe au pluriel : jouent.' },
      { q: "Quel est le verbe dans : 'Le soleil brille chaque matin.' ?", opts: ['Le soleil','brille','chaque','matin'], ans: 1, ref: 'CE2 · Nature des mots', expl: '\'Brille\' est le verbe conjugué de la phrase.' },
    ],
    monde: [
      { q: 'Lequel est un mammifère ?', opts: ['Le crocodile','La grenouille','La baleine','Le perroquet'], ans: 2, ref: 'CE2 · Classification des vivants', expl: 'La baleine est un mammifère : poumons + allaitement, même sous l\'eau !' },
      { q: 'L\'eau bout à quelle température ?', opts: ['50°C','75°C','100°C','150°C'], ans: 2, ref: 'CE2 · États de la matière', expl: 'L\'eau bout à 100°C : liquide → gazeux (vapeur d\'eau).' },
      { q: 'À quel siècle correspond l\'an 1492 ?', opts: ['XIVe siècle','XVe siècle','XVIe siècle','XVIIe siècle'], ans: 1, ref: 'CE2 · Repères temporels', expl: '1492 → XVe siècle (1401-1500). Astuce : chiffres du siècle = premiers chiffres + 1.' },
      { q: 'Quel astre est au centre de notre système solaire ?', opts: ['La Lune','Mars','Le Soleil','Vénus'], ans: 2, ref: 'CE2 · L\'espace', expl: 'Le Soleil est l\'étoile au centre. La Terre tourne autour en 365 jours = 1 an.' },
    ],
    culture: [
      { q: 'Que représente Marianne ?', opts: ['Un coq gaulois','Le symbole humain de la République','La Tour Eiffel','La devise française'], ans: 1, ref: 'CE2 · EMC — Symboles République', expl: 'Marianne symbolise la République : liberté et raison. Dans toutes les mairies !' },
      { q: 'Combien de régions en France métropolitaine ?', opts: ['13','15','18','22'], ans: 0, ref: 'CE2 · France — géographie', expl: 'Depuis 2016, la France métropolitaine a 13 régions. Avec DOM-TOM : 18.' },
      { q: 'Que commémore le 14 juillet ?', opts: ['Fin de la 2e Guerre mondiale','La prise de la Bastille en 1789','L\'anniversaire de la République','La naissance de Napoléon'], ans: 1, ref: 'CE2 · EMC — Fête nationale', expl: 'Le 14 juillet 1789 : prise de la Bastille, début de la Révolution française.' },
      { q: '1/2 + 1/4 = ?', opts: ['2/6','3/4','1/6','2/4'], ans: 1, ref: 'CE2 · Fractions', expl: '1/2 = 2/4. Donc 2/4 + 1/4 = 3/4.' },
    ],
  },
}

export const ENG_WORDS = {
  jade: {
    Greetings: [
      { en:'hello',      fr:'bonjour',         em:'👋', ph:'/həˈloʊ/'     },
      { en:'goodbye',    fr:'au revoir',        em:'🙋', ph:'/ɡʊdˈbaɪ/'   },
      { en:'please',     fr:'s\'il vous plaît', em:'🙏', ph:'/pliːz/'      },
      { en:'thank you',  fr:'merci',            em:'😊', ph:'/θæŋk juː/'   },
      { en:'sorry',      fr:'désolé',           em:'😔', ph:'/ˈsɒri/'      },
      { en:'excuse me',  fr:'excusez-moi',      em:'🤚', ph:'/ɪkˈskjuːz/'  },
    ],
    School: [
      { en:'teacher',    fr:'professeur',       em:'👩‍🏫', ph:'/ˈtiːtʃər/'   },
      { en:'homework',   fr:'devoir',           em:'📚', ph:'/ˈhoʊmwɜːrk/' },
      { en:'notebook',   fr:'cahier',           em:'📓', ph:'/ˈnoʊtbʊk/'   },
      { en:'classmate',  fr:'camarade',         em:'🧑‍🤝‍🧑', ph:'/ˈklɑːsmeɪt/' },
      { en:'canteen',    fr:'cantine',          em:'🍽', ph:'/kænˈtiːn/'   },
      { en:'subject',    fr:'matière',          em:'📐', ph:'/ˈsʌbdʒɪkt/'  },
    ],
    'My world': [
      { en:'family',     fr:'famille',          em:'👨‍👩‍👧', ph:'/ˈfæməli/'    },
      { en:'hobby',      fr:'passe-temps',      em:'🎨', ph:'/ˈhɒbi/'      },
      { en:'music',      fr:'musique',          em:'🎵', ph:'/ˈmjuːzɪk/'   },
      { en:'sport',      fr:'sport',            em:'⚽', ph:'/spɔːrt/'      },
      { en:'weekend',    fr:'week-end',         em:'🎉', ph:'/ˈwiːkɛnd/'   },
      { en:'favourite',  fr:'préféré',          em:'⭐', ph:'/ˈfeɪvərɪt/'  },
    ],
  },
  hugo: {
    Animals: [
      { en:'cat',        fr:'chat',             em:'🐱', ph:'/kæt/'         },
      { en:'dog',        fr:'chien',            em:'🐶', ph:'/dɒɡ/'         },
      { en:'rabbit',     fr:'lapin',            em:'🐰', ph:'/ˈræbɪt/'      },
      { en:'bird',       fr:'oiseau',           em:'🐦', ph:'/bɜːrd/'       },
      { en:'fish',       fr:'poisson',          em:'🐟', ph:'/fɪʃ/'         },
      { en:'elephant',   fr:'éléphant',         em:'🐘', ph:'/ˈelɪfənt/'    },
    ],
    Colors: [
      { en:'red',        fr:'rouge',            em:'🔴', ph:'/rɛd/'         },
      { en:'blue',       fr:'bleu',             em:'🔵', ph:'/bluː/'        },
      { en:'green',      fr:'vert',             em:'🟢', ph:'/ɡriːn/'       },
      { en:'yellow',     fr:'jaune',            em:'🟡', ph:'/ˈjɛloʊ/'      },
      { en:'purple',     fr:'violet',           em:'🟣', ph:'/ˈpɜːrpl/'     },
      { en:'orange',     fr:'orange',           em:'🟠', ph:'/ˈɒrɪndʒ/'     },
    ],
    Numbers: [
      { en:'one',        fr:'un',               em:'1️⃣', ph:'/wʌn/'         },
      { en:'two',        fr:'deux',             em:'2️⃣', ph:'/tuː/'         },
      { en:'three',      fr:'trois',            em:'3️⃣', ph:'/θriː/'        },
      { en:'four',       fr:'quatre',           em:'4️⃣', ph:'/fɔːr/'        },
      { en:'five',       fr:'cinq',             em:'5️⃣', ph:'/faɪv/'        },
      { en:'ten',        fr:'dix',              em:'🔟', ph:'/tɛn/'         },
    ],
  },
}
