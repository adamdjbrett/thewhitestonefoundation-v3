export default {
  heroImage: '/images/green/hero.png',
  stoneImage: '/images/green/stone.png',
  journalImage: '/images/green/journal.png',
  scholarsImage: '/images/green/scholars.png',
  campusImage: '/images/green/campus.png',
  symposiumImage: '/images/green/symposium.png',
  nav: [
    { label: 'Mission', href: '#mission' },
    { label: 'Publications', href: '#publications' },
    { label: 'Programs', href: '#programs' },
    { label: 'Team', href: '#team' },
    { label: 'News', href: '#news' },
    { label: 'About', href: '#about' }
  ],
  publications: [
    {
      title: 'The Journal for Cultural and Religious Theory',
      abbr: 'JCRT',
      description: 'A leading peer-reviewed open access journal exploring the intersections of culture, philosophy, and religious theory.',
      url: 'https://jcrt.org/',
      image: '/images/green/journal.png'
    },
    {
      title: 'The New Polis',
      abbr: 'TNP',
      description: 'An interdisciplinary platform for critical analysis of contemporary cultural and political thought.',
      url: 'https://thenewpolis.com/',
      image: '/images/green/scholars.png'
    },
    {
      title: 'The New Polis Journal',
      abbr: 'TNPJ',
      description: 'A scholarly journal featuring rigorous academic articles on emerging trends in social theory and public discourse.',
      url: 'https://journal.thenewpolis.com/',
      image: '/images/green/journal.png'
    }
  ],
  programs: [
    {
      icon: 'book',
      title: 'Peer-Reviewed Publishing',
      description: 'Open access journals that advance cultural, religious, and philosophical scholarship without copyright restrictions.'
    },
    {
      icon: 'message',
      title: 'Critical Conversations',
      description: 'Webinar series bringing together leading thinkers for structured dialogue on the most pressing questions of our time.'
    },
    {
      icon: 'users',
      title: 'Difficult Discussions',
      description: 'Seminar programs designed to navigate complex and contested topics with intellectual rigor and mutual respect.'
    },
    {
      icon: 'globe',
      title: 'Thought Leader Symposia',
      description: 'Global convenings that address existential challenges in education, knowledge economies, and cultural evolution.'
    }
  ],
  impactAreas: [
    { icon: 'book', label: 'Open Access Journals', description: 'Fund free scholarly publishing' },
    { icon: 'users', label: 'Critical Conversations', description: 'Sponsor public discourse' },
    { icon: 'graduation', label: 'Scholar Network', description: 'Expand our global community' },
    { icon: 'heart', label: 'General Fund', description: 'Support where needed most' }
  ],
  tiers: [
    { amount: 25, impact: "supports one author's publication" },
    { amount: 50, impact: 'sponsors a webinar session' },
    { amount: 100, impact: 'funds a semester of open access' },
    { amount: 250, impact: 'underwrites a symposium speaker' },
    { amount: 500, impact: 'establishes a research grant' }
  ]
};
