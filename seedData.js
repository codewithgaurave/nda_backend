const bcrypt = require('bcryptjs');

const initialCourses = [
  {
    title: 'NDA Written Super-50 Target Batch',
    code: 'NDA-WRITTEN-2026',
    subtitle: 'Comprehensive Preparation for UPSC NDA / NA Examination',
    category: 'NDA Written',
    duration: '6 Months Intensive (also available in 3-Month crash)',
    fees: 38500,
    batchStartDate: 'Starts 1st & 15th of Every Month',
    timings: '08:30 AM - 02:30 PM (Daily 6 Hours + Doubt Sessions)',
    badge: 'High Selection Rate',
    batchSize: 'Limited to 35 Cadets per Batch',
    description: 'A rigorously engineered training program dedicated to mastering both Mathematics (Paper 1 - 300 Marks) and General Ability Test (Paper 2 - 600 Marks). Led by experienced ex-faculty and defense mentors with chapter-wise tests, daily current affairs analysis, and weekly UPSC-pattern mock tests.',
    highlights: [
      'Complete UPSC NDA Syllabus coverage (Maths + GAT)',
      'Daily 200+ Practice MCQs & Short-cut Tricks for Mathematics',
      'Special English Fluency & Defence Current Affairs classes',
      'Weekly 900-Marks OMR-based Full Length Mock Exams',
      'Free SSB Screening & Physical Conditioning orientation included',
      'Hostel, Mess & Dedicated Library facility with 24x7 Wi-Fi'
    ],
    syllabus: [
      {
        moduleName: 'Mathematics (Paper I - 300 Marks)',
        topics: ['Trigonometry & Inverse', 'Calculus (Diff & Integral)', 'Matrices & Determinants', '2D & 3D Geometry', 'Vectors, Probability & Statistics']
      },
      {
        moduleName: 'English (Paper II Part A - 200 Marks)',
        topics: ['Grammar & Spotting Errors', 'Vocabulary & Synonyms/Antonyms', 'Idioms & Phrases', 'Comprehension passages', 'Sentence Ordering & Cloze Test']
      },
      {
        moduleName: 'General Knowledge & Science (Paper II Part B - 400 Marks)',
        topics: ['Physics & Chemistry Concepts', 'General Science & Biology', 'Indian History & Freedom Struggle', 'Geography & Defense Geo-strategy', 'Indian Polity, Economy & International Affairs']
      }
    ],
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    isActive: true
  },
  {
    title: 'SSB 14-Days Comprehensive Interview Bootcamp',
    code: 'SSB-14DAYS-MASTERCLASS',
    subtitle: 'Rigorous 14-Day Simulation by Ex-SSB Assessors (IO, GTO, Psych)',
    category: 'SSB 14 Days Training',
    duration: '14 Days Residential / Non-Residential',
    fees: 24500,
    batchStartDate: 'Batches begin every Monday',
    timings: '06:00 AM - 07:30 PM (End-to-End Military Routine)',
    badge: 'Assessed by Ex-Col / Brigadiers',
    batchSize: '20 Candidates per Sub-group',
    description: 'India\'s premier SSB training capsule conducted on a real full-scale replica GTO obstacle ground. Personalized psych dossier analysis, 1-on-1 mock interviews by retired Board Presidents and Interviewing Officers, and daily group discussions.',
    highlights: [
      'Day-1 Screening Mastery: OIR Tests (Verbal/Non-Verbal) & PPDT Narration / Discussion',
      'Complete Psychological Battery: TAT (12 stories), WAT (60 words), SRT (60 situations), Self Description (SD)',
      '100% Outdoor GTO Ground: PGT, HGT, Snake Race, FGT, Command Task & 10 Individual Obstacles',
      'Personal Mock Interview with individual feedback & PIQ Form optimization',
      'Daily Current Affairs, Group Discussions (GD), and Military Lecturettes with video feedback',
      'Full Board Conference Simulation with personalized Officers\' assessment report'
    ],
    syllabus: [
      {
        moduleName: 'Phase 1: Stage I Screening (Day 1 - 2)',
        topics: ['OIR Speed Drills & Techniques', 'Perception & Story Writing on hazy slides', 'Effective Narration within 1 Minute', 'Group Discussion & Group Consensus tactics']
      },
      {
        moduleName: 'Phase 2: Psychological Testing (Day 3 - 5)',
        topics: ['TAT (Thematic Apperception Test) positive officer attributes', 'WAT speed & spontaneous response formulation', 'SRT realistic decision-making & resourcefulness', 'SD (Self Description) authenticity & self-awareness']
      },
      {
        moduleName: 'Phase 3: GTO Ground Testing (Day 6 - 9)',
        topics: ['PGT (Progressive Group Task) fulcrum & cantilever techniques', 'HGT (Half Group Task) & Snake Race teamwork', 'Lecturette topic selection & commanding delivery', 'Individual Obstacles (Tiger Leap, Tarzan Swing, Commando Walk)', 'Command Task leadership under time pressure']
      },
      {
        moduleName: 'Phase 4: Interview & Conference (Day 10 - 14)',
        topics: ['Personal Interview with Ex-IO (45-60 min)', 'PIQ (Personal Information Questionnaire) audit', 'Rapid fire questions on Academics, Family, Hobbies & Current Geopolitics', 'Conference Day demeanor & final recommendation advice']
      }
    ],
    image: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?auto=format&fit=crop&w=800&q=80',
    isActive: true
  },
  {
    title: 'NDA Foundation 2-Year Program (11th & 12th + NDA)',
    code: 'NDA-FOUNDATION-2YR',
    subtitle: 'Integrated Schooling + NDA Coaching for Class 10th Passed Students',
    category: 'Foundation',
    duration: '2 Years Integrated',
    fees: 75000,
    batchStartDate: 'New Session Starting April & July',
    timings: 'Integrated School + Coaching Timetable',
    badge: 'Early Career Advantage',
    batchSize: '30 Students per Class',
    description: 'Designed specifically for ambitious young boys and girls right after Class 10. Combines CBSE/State Board 11th & 12th science curriculum with dedicated daily NDA preparation, communication grooming, and physical fitness conditioning.',
    highlights: [
      'Dual Focus: Board Examination (90%+ target) & NDA written cracking on 1st attempt',
      'Daily morning physical training, drill, and obstacle training',
      'Special spoken English, personality grooming and confidence building',
      'Disciplined military academy lifestyle, daily parade, and sports tournaments'
    ],
    syllabus: [
      {
        moduleName: 'Academic Curriculum',
        topics: ['Class 11 & 12 Physics, Chemistry & Higher Mathematics']
      },
      {
        moduleName: 'Defense Orientation',
        topics: ['NDA Specific Mathematics Shortcuts, GK, World History, English & Military Ethics']
      }
    ],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    isActive: true
  }
];

const initialNotices = [
  {
    title: 'UPSC NDA & NA (I) 2026 Official Notification Released - Registration Open',
    category: 'Exam Notification',
    date: '24 Oct 2026',
    description: 'Union Public Service Commission has released the official notification for NDA & NA examination. Candidates between 16.5 and 19.5 years can apply online. Last date of online application submission is approaching.',
    isUrgent: true,
    linkUrl: 'https://upsc.gov.in',
    isActive: true
  },
  {
    title: 'SSB 14-Days Intensive Bootcamp: Next Batch Commences This Monday',
    category: 'New Batch Alert',
    date: '28 Oct 2026',
    description: 'New batch for candidates with upcoming SSB Call Letters (Army / Navy / Air Force Selection Boards). On-ground GTO obstacles slots are strictly limited to maintain individual mentoring.',
    isUrgent: true,
    linkUrl: '#courses',
    isActive: true
  },
  {
    title: 'Selection Results: 14 Cadets Recommended from Trishul Academy in 154 NDA Course',
    category: 'Result',
    date: '18 Oct 2026',
    description: 'Hearty congratulations to our recommended cadets for clearing the SSB interview and medical board for 154th NDA Course. Salute to their hard work and officer qualities!',
    isUrgent: false,
    linkUrl: '#gallery',
    isActive: true
  },
  {
    title: 'SSB Call Letters for CDS 2026 / AFCAT Released by Services Selection Board',
    category: 'SSB Call Letter',
    date: '12 Oct 2026',
    description: 'Candidates are advised to choose their SSB center and dates immediately on Join Indian Army / Navy / Airforce recruitment portals.',
    isUrgent: false,
    linkUrl: 'https://joinindianarmy.nic.in',
    isActive: true
  }
];

const initialBlogs = [
  {
    title: 'Cracking PPDT in SSB: How to Write Convincing Stories & Lead the GD',
    slug: 'cracking-ppdt-ssb-story-writing-group-discussion',
    category: 'SSB Interview Guide',
    summary: 'The screening test filters out over 60% of candidates on Day 1. Learn the exact psych formula for perceiving the slide, identifying the central character, and presenting a constructive action plan.',
    content: `
### Understanding the Stage-1 Screening Test

Stage-1 of the Services Selection Board (SSB) is the most critical hurdle. Out of a reporting batch of 150-200 aspirants, typically only 35-50 make it to Stage-2. The Picture Perception and Description Test (PPDT) holds the key.

#### 1. The 30 Seconds Observation
When the hazy slide appears on the screen for 30 seconds:
- **Do not panic** if the picture is blurred or ambiguous; it is intentionally made so!
- Note the number of characters, their approximate age, gender, and moods.
- Choose your **central character (hero)** who reflects positive, proactive officer-like qualities.

#### 2. The 4-Minute Story Structure
Your story must answer three fundamental questions:
1. **What led to the situation?** (Past context - 15% of the story)
2. **What is currently happening?** (Present execution - 70% of the story)
3. **What was the final positive outcome?** (Future resolution - 15% of the story)

#### 3. Individual Narration & Group Discussion
- Speak clearly in a firm, audible voice without looking at the Assessors. Look at your fellow group members.
- Complete your narration within 50 to 60 seconds.
- In the GD, be a **contributor, not a fish-market screecher**. Give valid logical points, support others when they propose sensible ideas, and help steer the group toward a unified common story.
    `,
    author: {
      name: 'Col. Rajesh Sharma (Retd.)',
      designation: 'Ex-President 11 SSB Allahabad'
    },
    readTime: '6 min read',
    tags: ['SSB', 'PPDT', 'Screening', 'Officer Qualities'],
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    isPublished: true
  },
  {
    title: 'Top 15 Officer Like Qualities (OLQs) and How Assessors Test Them in GTO Ground',
    slug: 'top-15-officer-like-qualities-olqs-gto-ground',
    category: 'SSB Interview Guide',
    summary: 'A deep-dive analysis into the 4 factors of OLQs: Planning & Organizing, Social Adjustment, Social Effectiveness, and Dynamic Energy.',
    content: `
### What are OLQs?
The armed forces look for raw leadership material that can be honed into commissioned officers at the National Defence Academy (NDA) or Indian Military Academy (IMA).

The 15 OLQs are divided into four main factors:

#### Factor I: Planning and Organizing
- Effective Intelligence
- Reasoning Ability
- Organizing Ability
- Power of Expression

#### Factor II: Social Adjustment
- Social Adaptability
- Cooperation
- Sense of Responsibility

#### Factor III: Social Effectiveness
- Initiative
- Self Confidence
- Speed of Decision
- Ability to Influence the Group
- Liveliness

#### Factor IV: Dynamic Qualities
- Determination
- Courage
- Stamina

In the GTO ground during PGT (Progressive Group Task) and Command Task, the GTO observes whether you prioritize the group's mission over personal glory, handle helping materials (plank, balli, rope) with common sense, and keep calm under stress.
    `,
    author: {
      name: 'Lt. Col. Vikramaditya Rathore',
      designation: 'Ex-Senior GTO, 33 SSB Bhopal'
    },
    readTime: '8 min read',
    tags: ['OLQs', 'GTO Ground', 'Leadership', 'Armed Forces'],
    coverImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    isPublished: true
  },
  {
    title: 'How to Score 200+ in NDA Mathematics: Topic-Wise Weightage & Strategy',
    slug: 'score-200-plus-nda-mathematics-strategy',
    category: 'NDA Written Strategy',
    summary: 'Master the high-yield chapters: Calculus, Trigonometry, and Probability. Learn time-saving algebraic hacks and negative marking avoidance.',
    content: `
### Cracking the 300-Mark Mathematics Paper

NDA Mathematics Paper-1 contains 120 questions carrying 2.5 marks each with 0.83 negative marks for every incorrect answer. You have 150 minutes (2.5 hours).

#### High Weightage Priority Chapters:
1. **Trigonometry & Inverse Trig**: 15 - 20 questions
2. **Matrices & Determinants**: 10 - 12 questions (high accuracy, very scoring)
3. **Calculus (Limits, Continuity, Differentiation, Definite Integrals)**: 25 - 30 questions
4. **Probability & Statistics**: 12 - 16 questions
5. **Vectors & 3D Geometry**: 10 - 14 questions

#### The 3-Round Strategy during Exam:
- **Round 1 (First 50 mins):** Solve all formula-based, direct questions. Target 40 questions with 95% accuracy.
- **Round 2 (Next 60 mins):** Attempt moderately calculation-intensive problems.
- **Round 3 (Last 30 mins):** Re-check and tackle tough questions without guessing blindly!
    `,
    author: {
      name: 'Prof. Aniruddh Dixit',
      designation: 'Head of Mathematics Department'
    },
    readTime: '5 min read',
    tags: ['NDA', 'Mathematics', 'UPSC', 'Exam Strategy'],
    coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    isPublished: true
  }
];

const initialGallery = [
  {
    title: 'Full-Scale GTO Ground: Progressive Group Task (PGT)',
    category: 'GTO Obstacle Ground',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
    caption: 'Cadets practicing bridging techniques and cantilevers on real obstacle structures under GTO supervision.',
    featured: true
  },
  {
    title: 'Individual Obstacles (Tiger Leap & Tarzan Swing)',
    category: 'GTO Obstacle Ground',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=900&q=80',
    caption: 'Developing physical courage, stamina, and agility on standard SSB obstacle course.',
    featured: true
  },
  {
    title: 'Personal Interview Simulation Room with Ex-Assessor',
    category: 'SSB Mock Interview',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
    caption: 'One-on-one deep interview simulation with feedback on body language, PIQ, and spontaneous articulation.',
    featured: true
  },
  {
    title: 'Smart Audio-Visual NDA Classroom & Doubt Clearing Desk',
    category: 'Smart Classrooms',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80',
    caption: 'Interactive digital boards, daily problem solving, and chapter-wise test evaluations.',
    featured: true
  },
  {
    title: 'Recommended Cadets Celebration & Felicitations',
    category: 'Recommended Cadets',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
    caption: 'Our star cadets heading to National Defence Academy (Khadakwasla) and Air Force Academy (Dundigal).',
    featured: true
  },
  {
    title: 'Morning Physical Fitness, Cross-Country & Military Drill',
    category: 'Physical Training & Drill',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
    caption: 'Daily 06:00 AM conditioning drills ensuring medical fitness and peak stamina.',
    featured: false
  }
];

const initialEnquiries = [
  {
    name: 'Aarav Pratap Singh',
    phone: '+91 98765 43210',
    email: 'aarav.singh@example.com',
    courseInterested: 'SSB 14 Days Training',
    city: 'Jaipur, Rajasthan',
    qualification: '12th Appearing (PCM)',
    targetExamYear: '2026',
    message: 'I have qualified the NDA written exam and looking for immediate SSB 14 days training batch with hostel facility.',
    status: 'Pending',
    adminNotes: 'Candidate called today, interested in next Monday batch.'
  },
  {
    name: 'Kavya Deshmukh',
    phone: '+91 98112 33445',
    email: 'kavya.d@example.com',
    courseInterested: 'NDA Written Super-50 Batch',
    city: 'Pune, Maharashtra',
    qualification: 'Class 11th passed',
    targetExamYear: '2026',
    message: 'Want to prepare for NDA-I 2026. Please share hostel details and scholarship test dates.',
    status: 'Contacted',
    adminNotes: 'Sent prospectus and syllabus breakdown via WhatsApp.'
  },
  {
    name: 'Rohan Verma',
    phone: '+91 97654 11223',
    email: 'rohan.v@example.com',
    courseInterested: 'SSB 14 Days Training',
    city: 'Lucknow, Uttar Pradesh',
    qualification: 'B.Tech / CDS Aspirant',
    targetExamYear: '2026',
    message: 'Need specialized GTO obstacle training and psychological test evaluation.',
    status: 'Enrolled',
    adminNotes: 'Enrolled for upcoming batch. Seat confirmed.'
  }
];

module.exports = {
  initialCourses,
  initialNotices,
  initialBlogs,
  initialGallery,
  initialEnquiries
};
