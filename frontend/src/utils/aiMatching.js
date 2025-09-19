// AI-powered company matching system
// This module provides intelligent matching between students and companies

// Comprehensive skill taxonomy with categories and weights
export const skillCategories = {
  'Programming Languages': {
    'JavaScript': { weight: 1.0, aliases: ['JS', 'ES6', 'ES2015'] },
    'Python': { weight: 1.0, aliases: ['Python3', 'Py'] },
    'Java': { weight: 1.0, aliases: ['Java8', 'Java11'] },
    'TypeScript': { weight: 0.9, aliases: ['TS'] },
    'C++': { weight: 0.9, aliases: ['Cpp'] },
    'C#': { weight: 0.9, aliases: ['CSharp'] },
    'Go': { weight: 0.8, aliases: ['Golang'] },
    'Rust': { weight: 0.8, aliases: [] },
    'Swift': { weight: 0.8, aliases: [] },
    'Kotlin': { weight: 0.8, aliases: [] },
    'PHP': { weight: 0.7, aliases: [] },
    'Ruby': { weight: 0.7, aliases: [] },
    'Scala': { weight: 0.7, aliases: [] }
  },
  'Frontend Technologies': {
    'React': { weight: 1.0, aliases: ['ReactJS', 'React.js'] },
    'Vue.js': { weight: 0.9, aliases: ['Vue', 'VueJS'] },
    'Angular': { weight: 0.9, aliases: ['AngularJS', 'Angular2+'] },
    'Next.js': { weight: 0.8, aliases: ['NextJS'] },
    'Nuxt.js': { weight: 0.8, aliases: ['NuxtJS'] },
    'Svelte': { weight: 0.7, aliases: [] },
    'HTML': { weight: 0.6, aliases: ['HTML5'] },
    'CSS': { weight: 0.6, aliases: ['CSS3'] },
    'Sass': { weight: 0.5, aliases: ['SCSS'] },
    'Tailwind CSS': { weight: 0.5, aliases: ['Tailwind'] },
    'Bootstrap': { weight: 0.4, aliases: [] }
  },
  'Backend Technologies': {
    'Node.js': { weight: 1.0, aliases: ['NodeJS', 'Node'] },
    'Express.js': { weight: 0.9, aliases: ['Express', 'ExpressJS'] },
    'Django': { weight: 0.9, aliases: ['Django Framework'] },
    'Flask': { weight: 0.8, aliases: ['Flask Framework'] },
    'Spring Boot': { weight: 0.9, aliases: ['Spring', 'Spring Framework'] },
    'FastAPI': { weight: 0.8, aliases: ['Fast API'] },
    'Laravel': { weight: 0.7, aliases: [] },
    'Ruby on Rails': { weight: 0.7, aliases: ['Rails', 'RoR'] },
    'ASP.NET': { weight: 0.7, aliases: ['ASP.NET Core'] },
    'Gin': { weight: 0.6, aliases: ['Gin Framework'] }
  },
  'Databases': {
    'PostgreSQL': { weight: 0.9, aliases: ['Postgres', 'PostgresQL'] },
    'MySQL': { weight: 0.8, aliases: ['MySQL'] },
    'MongoDB': { weight: 0.8, aliases: ['Mongo'] },
    'Redis': { weight: 0.7, aliases: [] },
    'SQLite': { weight: 0.6, aliases: ['SQLite3'] },
    'Oracle': { weight: 0.7, aliases: ['Oracle DB'] },
    'SQL Server': { weight: 0.7, aliases: ['MSSQL'] },
    'DynamoDB': { weight: 0.6, aliases: [] },
    'Cassandra': { weight: 0.6, aliases: [] }
  },
  'Cloud & DevOps': {
    'AWS': { weight: 1.0, aliases: ['Amazon Web Services'] },
    'Docker': { weight: 0.9, aliases: ['Docker Container'] },
    'Kubernetes': { weight: 0.8, aliases: ['K8s'] },
    'Azure': { weight: 0.8, aliases: ['Microsoft Azure'] },
    'Google Cloud': { weight: 0.8, aliases: ['GCP', 'Google Cloud Platform'] },
    'Terraform': { weight: 0.7, aliases: [] },
    'Jenkins': { weight: 0.6, aliases: [] },
    'GitLab CI': { weight: 0.6, aliases: ['GitLab'] },
    'GitHub Actions': { weight: 0.6, aliases: ['GitHub CI'] }
  },
  'Data Science & AI': {
    'Machine Learning': { weight: 1.0, aliases: ['ML', 'Machine Learning'] },
    'Deep Learning': { weight: 0.9, aliases: ['DL', 'Neural Networks'] },
    'TensorFlow': { weight: 0.8, aliases: ['TF'] },
    'PyTorch': { weight: 0.8, aliases: [] },
    'Pandas': { weight: 0.7, aliases: [] },
    'NumPy': { weight: 0.7, aliases: ['Numpy'] },
    'Scikit-learn': { weight: 0.7, aliases: ['Sklearn'] },
    'Jupyter': { weight: 0.6, aliases: ['Jupyter Notebook'] },
    'R': { weight: 0.6, aliases: ['R Language'] },
    'MATLAB': { weight: 0.5, aliases: [] }
  },
  'Mobile Development': {
    'React Native': { weight: 0.9, aliases: ['React Native'] },
    'Flutter': { weight: 0.9, aliases: ['Dart Flutter'] },
    'iOS Development': { weight: 0.8, aliases: ['iOS', 'iPhone Development'] },
    'Android Development': { weight: 0.8, aliases: ['Android', 'Android Studio'] },
    'Xamarin': { weight: 0.6, aliases: [] },
    'Ionic': { weight: 0.5, aliases: [] }
  },
  'Tools & Others': {
    'Git': { weight: 0.8, aliases: ['Git Version Control'] },
    'Linux': { weight: 0.7, aliases: ['Ubuntu', 'CentOS'] },
    'REST API': { weight: 0.8, aliases: ['REST', 'API Development'] },
    'GraphQL': { weight: 0.7, aliases: [] },
    'Microservices': { weight: 0.7, aliases: ['Microservice Architecture'] },
    'Agile': { weight: 0.6, aliases: ['Agile Methodology', 'Scrum'] },
    'JIRA': { weight: 0.5, aliases: [] },
    'Figma': { weight: 0.6, aliases: [] },
    'Adobe XD': { weight: 0.5, aliases: [] }
  }
};

// Comprehensive company database with real companies
export const companiesDatabase = [
  {
    id: 'google-1',
    name: 'Google',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png',
    industry: 'Technology',
    size: 'Large',
    location: 'Mountain View, CA',
    remote: true,
    culture: ['Innovation', 'Fast-paced', 'Collaborative'],
    benefits: ['Free meals', 'Gym membership', 'Learning budget'],
    roles: [
      {
        title: 'Software Engineering Intern',
        department: 'Engineering',
        level: 'Undergraduate',
        duration: '12 weeks',
        stipend: '$8000/month',
        requiredSkills: ['Python', 'C++', 'Algorithms', 'Data Structures', 'System Design'],
        preferredSkills: ['Machine Learning', 'Cloud Computing', 'Open Source'],
        description: 'Work on cutting-edge projects that impact billions of users worldwide.',
        responsibilities: ['Develop scalable software solutions', 'Collaborate with senior engineers', 'Participate in code reviews'],
        growthOpportunities: ['Mentorship program', 'Technical talks', 'Career development workshops']
      },
      {
        title: 'Product Management Intern',
        department: 'Product',
        level: 'Undergraduate',
        duration: '12 weeks',
        stipend: '$7000/month',
        requiredSkills: ['Analytics', 'User Research', 'Strategy', 'Communication'],
        preferredSkills: ['SQL', 'Data Visualization', 'A/B Testing'],
        description: 'Shape the future of Google products through data-driven decisions.',
        responsibilities: ['Analyze user behavior', 'Define product requirements', 'Coordinate with cross-functional teams'],
        growthOpportunities: ['Product strategy workshops', 'Leadership training', 'Industry networking']
      }
    ]
  },
  {
    id: 'microsoft-1',
    name: 'Microsoft',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo.png',
    industry: 'Technology',
    size: 'Large',
    location: 'Redmond, WA',
    remote: true,
    culture: ['Inclusive', 'Growth-oriented', 'Innovative'],
    benefits: ['Health insurance', 'Stock options', 'Professional development'],
    roles: [
      {
        title: 'Cloud Solutions Intern',
        department: 'Azure',
        level: 'Undergraduate',
        duration: '12 weeks',
        stipend: '$7500/month',
        requiredSkills: ['C#', 'Azure', 'Cloud Computing', 'REST API'],
        preferredSkills: ['Docker', 'Kubernetes', 'DevOps'],
        description: 'Build cloud-native solutions on Microsoft Azure platform.',
        responsibilities: ['Develop cloud applications', 'Implement DevOps practices', 'Optimize cloud resources'],
        growthOpportunities: ['Azure certification', 'Cloud architecture training', 'Mentorship program']
      }
    ]
  },
  {
    id: 'amazon-1',
    name: 'Amazon',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Amazon-Logo.png',
    industry: 'E-commerce & Cloud',
    size: 'Large',
    location: 'Seattle, WA',
    remote: true,
    culture: ['Customer-obsessed', 'High standards', 'Innovation'],
    benefits: ['401k matching', 'Health benefits', 'Relocation assistance'],
    roles: [
      {
        title: 'Software Development Intern',
        department: 'AWS',
        level: 'Undergraduate',
        duration: '12 weeks',
        stipend: '$8000/month',
        requiredSkills: ['Java', 'Python', 'AWS', 'System Design'],
        preferredSkills: ['Machine Learning', 'Big Data', 'Microservices'],
        description: 'Contribute to Amazon Web Services infrastructure and services.',
        responsibilities: ['Design distributed systems', 'Implement scalable solutions', 'Optimize performance'],
        growthOpportunities: ['Technical mentorship', 'Leadership principles training', 'Career advancement']
      }
    ]
  },
  {
    id: 'meta-1',
    name: 'Meta',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Meta-Logo.png',
    industry: 'Social Media & VR',
    size: 'Large',
    location: 'Menlo Park, CA',
    remote: true,
    culture: ['Bold', 'Fast-moving', 'Impact-driven'],
    benefits: ['Free food', 'Transportation', 'Wellness programs'],
    roles: [
      {
        title: 'Frontend Engineering Intern',
        department: 'Facebook',
        level: 'Undergraduate',
        duration: '12 weeks',
        stipend: '$8500/month',
        requiredSkills: ['React', 'JavaScript', 'TypeScript', 'CSS'],
        preferredSkills: ['GraphQL', 'React Native', 'Web Performance'],
        description: 'Build user-facing features for Facebook and Instagram.',
        responsibilities: ['Develop React components', 'Optimize web performance', 'Implement responsive designs'],
        growthOpportunities: ['Frontend architecture training', 'Design system workshops', 'Open source contributions']
      }
    ]
  },
  {
    id: 'netflix-1',
    name: 'Netflix',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Netflix-Logo.png',
    industry: 'Entertainment & Streaming',
    size: 'Large',
    location: 'Los Gatos, CA',
    remote: true,
    culture: ['Freedom', 'Responsibility', 'High performance'],
    benefits: ['Unlimited vacation', 'Top-tier health insurance', 'Stock options'],
    roles: [
      {
        title: 'Data Science Intern',
        department: 'Recommendation Systems',
        level: 'Graduate',
        duration: '16 weeks',
        stipend: '$9000/month',
        requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
        preferredSkills: ['Deep Learning', 'A/B Testing', 'Big Data'],
        description: 'Improve Netflix recommendation algorithms and personalization.',
        responsibilities: ['Analyze user behavior data', 'Develop ML models', 'Conduct A/B experiments'],
        growthOpportunities: ['Research collaboration', 'Conference attendance', 'Publication opportunities']
      }
    ]
  },
  {
    id: 'spotify-1',
    name: 'Spotify',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Spotify-Logo.png',
    industry: 'Music & Audio',
    size: 'Large',
    location: 'New York, NY',
    remote: true,
    culture: ['Creative', 'Collaborative', 'Music-focused'],
    benefits: ['Premium Spotify', 'Learning budget', 'Flexible hours'],
    roles: [
      {
        title: 'Backend Engineering Intern',
        department: 'Platform',
        level: 'Undergraduate',
        duration: '12 weeks',
        stipend: '$7000/month',
        requiredSkills: ['Java', 'Spring Boot', 'Microservices', 'Kafka'],
        preferredSkills: ['Docker', 'Kubernetes', 'Event Streaming'],
        description: 'Build scalable backend services for music streaming platform.',
        responsibilities: ['Develop microservices', 'Implement event-driven architecture', 'Optimize API performance'],
        growthOpportunities: ['System design training', 'Open source contributions', 'Tech talks']
      }
    ]
  },
  {
    id: 'airbnb-1',
    name: 'Airbnb',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Airbnb-Logo.png',
    industry: 'Travel & Hospitality',
    size: 'Large',
    location: 'San Francisco, CA',
    remote: true,
    culture: ['Belonging', 'Adventure', 'Inclusive'],
    benefits: ['Travel credits', 'Wellness stipend', 'Learning budget'],
    roles: [
      {
        title: 'Full Stack Intern',
        department: 'Host Experience',
        level: 'Undergraduate',
        duration: '12 weeks',
        stipend: '$7500/month',
        requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
        preferredSkills: ['GraphQL', 'Redis', 'Docker'],
        description: 'Build features that help hosts manage their listings and guests.',
        responsibilities: ['Develop full-stack features', 'Optimize database queries', 'Implement real-time updates'],
        growthOpportunities: ['Product development training', 'Design thinking workshops', 'User research exposure']
      }
    ]
  },
  {
    id: 'uber-1',
    name: 'Uber',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Uber-Logo.png',
    industry: 'Transportation & Mobility',
    size: 'Large',
    location: 'San Francisco, CA',
    remote: true,
    culture: ['Bold', 'Customer-focused', 'Global'],
    benefits: ['Uber credits', 'Health insurance', 'Gym membership'],
    roles: [
      {
        title: 'Mobile Engineering Intern',
        department: 'Rider Experience',
        level: 'Undergraduate',
        duration: '12 weeks',
        stipend: '$8000/month',
        requiredSkills: ['React Native', 'JavaScript', 'iOS', 'Android'],
        preferredSkills: ['TypeScript', 'GraphQL', 'Mobile Performance'],
        description: 'Build mobile features that connect riders with drivers.',
        responsibilities: ['Develop mobile features', 'Optimize app performance', 'Implement real-time tracking'],
        growthOpportunities: ['Mobile architecture training', 'Cross-platform development', 'Performance optimization']
      }
    ]
  },
  {
    id: 'stripe-1',
    name: 'Stripe',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Stripe-Logo.png',
    industry: 'Fintech & Payments',
    size: 'Medium',
    location: 'San Francisco, CA',
    remote: true,
    culture: ['Technical excellence', 'Developer-focused', 'Fast-paced'],
    benefits: ['Learning budget', 'Health insurance', 'Equity'],
    roles: [
      {
        title: 'Infrastructure Intern',
        department: 'Platform',
        level: 'Undergraduate',
        duration: '12 weeks',
        stipend: '$8500/month',
        requiredSkills: ['Go', 'Kubernetes', 'AWS', 'Terraform'],
        preferredSkills: ['Rust', 'Distributed Systems', 'Security'],
        description: 'Build and maintain Stripe\'s global payment infrastructure.',
        responsibilities: ['Develop infrastructure tools', 'Implement monitoring systems', 'Optimize system reliability'],
        growthOpportunities: ['Infrastructure training', 'Open source contributions', 'System design mentorship']
      }
    ]
  },
  {
    id: 'openai-1',
    name: 'OpenAI',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/OpenAI-Logo.png',
    industry: 'AI & Research',
    size: 'Medium',
    location: 'San Francisco, CA',
    remote: true,
    culture: ['Research-driven', 'Innovative', 'Mission-focused'],
    benefits: ['Research opportunities', 'Conference attendance', 'Top-tier equipment'],
    roles: [
      {
        title: 'AI Research Intern',
        department: 'Research',
        level: 'Graduate',
        duration: '16 weeks',
        stipend: '$10000/month',
        requiredSkills: ['Python', 'PyTorch', 'Machine Learning', 'Research'],
        preferredSkills: ['Deep Learning', 'NLP', 'Computer Vision', 'Publications'],
        description: 'Contribute to cutting-edge AI research and model development.',
        responsibilities: ['Conduct research experiments', 'Implement ML models', 'Write research papers'],
        growthOpportunities: ['Research mentorship', 'Conference presentations', 'Publication opportunities']
      }
    ]
  }
];

// Advanced AI matching algorithm
export class AIMatchingEngine {
  constructor() {
    this.skillWeights = this.buildSkillWeights();
  }

  buildSkillWeights() {
    const weights = {};
    Object.values(skillCategories).forEach(category => {
      Object.entries(category).forEach(([skill, data]) => {
        weights[skill.toLowerCase()] = data.weight;
        data.aliases.forEach(alias => {
          weights[alias.toLowerCase()] = data.weight * 0.9; // Slight penalty for aliases
        });
      });
    });
    return weights;
  }

  // Normalize and match skills with fuzzy matching
  normalizeSkills(skills) {
    return skills.map(skill => {
      const normalized = skill.toLowerCase().trim();
      // Try exact match first
      if (this.skillWeights[normalized]) {
        return { original: skill, normalized, weight: this.skillWeights[normalized] };
      }
      // Try fuzzy matching
      const fuzzyMatch = this.findFuzzyMatch(normalized);
      if (fuzzyMatch) {
        return { original: skill, normalized: fuzzyMatch, weight: this.skillWeights[fuzzyMatch] };
      }
      // Default weight for unknown skills
      return { original: skill, normalized, weight: 0.5 };
    });
  }

  findFuzzyMatch(skill) {
    const skillKeys = Object.keys(this.skillWeights);
    for (const key of skillKeys) {
      if (key.includes(skill) || skill.includes(key)) {
        return key;
      }
    }
    return null;
  }

  // Calculate comprehensive match score
  calculateMatchScore(studentProfile, companyRole) {
    const studentSkills = this.normalizeSkills(studentProfile.skills || []);
    const requiredSkills = this.normalizeSkills(companyRole.requiredSkills || []);
    const preferredSkills = this.normalizeSkills(companyRole.preferredSkills || []);

    // Basic skill matching
    const requiredMatches = this.findMatches(studentSkills, requiredSkills);
    const preferredMatches = this.findMatches(studentSkills, preferredSkills);
    
    // Calculate scores
    const requiredScore = requiredSkills.length > 0 ? 
      (requiredMatches.length / requiredSkills.length) * 100 : 0;
    const preferredScore = preferredSkills.length > 0 ? 
      (preferredMatches.length / preferredSkills.length) * 30 : 0;
    
    // Weighted skill importance
    const weightedScore = this.calculateWeightedScore(studentSkills, requiredSkills, preferredSkills);
    
    // Experience level matching
    const experienceScore = this.calculateExperienceScore(studentProfile, companyRole);
    
    // Location preference
    const locationScore = this.calculateLocationScore(studentProfile, companyRole);
    
    // Company culture fit
    const cultureScore = this.calculateCultureScore(studentProfile, companyRole);
    
    // Final weighted score
    const finalScore = Math.round(
      (requiredScore * 0.4) + 
      (preferredScore * 0.2) + 
      (weightedScore * 0.2) + 
      (experienceScore * 0.1) + 
      (locationScore * 0.05) + 
      (cultureScore * 0.05)
    );

    return {
      score: Math.min(100, Math.max(0, finalScore)),
      breakdown: {
        requiredSkills: requiredScore,
        preferredSkills: preferredScore,
        weightedSkills: weightedScore,
        experience: experienceScore,
        location: locationScore,
        culture: cultureScore
      },
      matchedSkills: requiredMatches,
      missingSkills: requiredSkills.filter(s => !requiredMatches.some(m => m.normalized === s.normalized)),
      preferredMatches: preferredMatches
    };
  }

  findMatches(studentSkills, targetSkills) {
    return targetSkills.filter(target => 
      studentSkills.some(student => 
        student.normalized === target.normalized ||
        student.normalized.includes(target.normalized) ||
        target.normalized.includes(student.normalized)
      )
    );
  }

  calculateWeightedScore(studentSkills, requiredSkills, preferredSkills) {
    let totalWeight = 0;
    let matchedWeight = 0;

    [...requiredSkills, ...preferredSkills].forEach(skill => {
      totalWeight += skill.weight;
      const isMatched = studentSkills.some(student => 
        student.normalized === skill.normalized
      );
      if (isMatched) {
        matchedWeight += skill.weight;
      }
    });

    return totalWeight > 0 ? (matchedWeight / totalWeight) * 100 : 0;
  }

  calculateExperienceScore(studentProfile, companyRole) {
    const studentLevel = studentProfile.educationLevel || 'Undergraduate';
    const requiredLevel = companyRole.level || 'Undergraduate';
    
    const levels = ['High School', 'Undergraduate', 'Graduate', 'PhD'];
    const studentIndex = levels.indexOf(studentLevel);
    const requiredIndex = levels.indexOf(requiredLevel);
    
    if (studentIndex >= requiredIndex) return 100;
    if (studentIndex === requiredIndex - 1) return 80;
    if (studentIndex === requiredIndex - 2) return 60;
    return 40;
  }

  calculateLocationScore(studentProfile, companyRole) {
    const studentLocation = studentProfile.location || 'Remote';
    const companyLocation = companyRole.location || 'Remote';
    
    if (studentLocation === 'Remote' || companyLocation === 'Remote') return 100;
    if (studentLocation === companyLocation) return 100;
    if (studentLocation.includes(companyLocation) || companyLocation.includes(studentLocation)) return 80;
    return 60;
  }

  calculateCultureScore(studentProfile, companyRole) {
    // This would be more sophisticated in a real implementation
    // For now, return a base score
    return 75;
  }

  // Generate AI-powered recommendations
  generateRecommendations(studentProfile, limit = 10) {
    const allMatches = [];
    
    companiesDatabase.forEach(company => {
      company.roles.forEach(role => {
        const match = this.calculateMatchScore(studentProfile, role);
        if (match.score > 30) { // Only include matches above 30%
          allMatches.push({
            company,
            role,
            match,
            id: `${company.id}-${role.title.replace(/\s+/g, '-').toLowerCase()}`
          });
        }
      });
    });

    // Sort by match score and other factors
    allMatches.sort((a, b) => {
      if (a.match.score !== b.match.score) {
        return b.match.score - a.match.score;
      }
      // Secondary sort by company size (prefer larger companies for internships)
      const sizeOrder = { 'Large': 3, 'Medium': 2, 'Small': 1, 'Startup': 0 };
      return (sizeOrder[b.company.size] || 0) - (sizeOrder[a.company.size] || 0);
    });

    return allMatches.slice(0, limit);
  }

  // Generate skill gap analysis
  generateSkillGapAnalysis(studentProfile, companyRole) {
    const match = this.calculateMatchScore(studentProfile, companyRole);
    const missingSkills = match.missingSkills;
    
    // Categorize missing skills
    const skillGaps = {};
    missingSkills.forEach(skill => {
      const category = this.findSkillCategory(skill.normalized);
      if (!skillGaps[category]) {
        skillGaps[category] = [];
      }
      skillGaps[category].push(skill);
    });

    // Generate learning recommendations
    const learningPath = Object.entries(skillGaps).map(([category, skills]) => ({
      category,
      skills: skills.map(s => s.original),
      priority: this.calculateCategoryPriority(category, skills),
      resources: this.getLearningResources(category, skills)
    }));

    return {
      gaps: skillGaps,
      learningPath: learningPath.sort((a, b) => b.priority - a.priority),
      estimatedTimeToLearn: this.estimateLearningTime(missingSkills),
      confidence: this.calculateConfidence(match.score, missingSkills.length)
    };
  }

  findSkillCategory(skill) {
    for (const [category, skills] of Object.entries(skillCategories)) {
      if (skills[skill] || Object.values(skills).some(s => s.aliases.includes(skill))) {
        return category;
      }
    }
    return 'Other';
  }

  calculateCategoryPriority(category, skills) {
    const categoryWeights = {
      'Programming Languages': 1.0,
      'Frontend Technologies': 0.9,
      'Backend Technologies': 0.9,
      'Databases': 0.8,
      'Cloud & DevOps': 0.8,
      'Data Science & AI': 0.9,
      'Mobile Development': 0.7,
      'Tools & Others': 0.6
    };
    
    const avgWeight = skills.reduce((sum, skill) => sum + skill.weight, 0) / skills.length;
    return (categoryWeights[category] || 0.5) * avgWeight;
  }

  getLearningResources(category, skills) {
    const resources = {
      'Programming Languages': [
        'Codecademy', 'freeCodeCamp', 'LeetCode', 'HackerRank'
      ],
      'Frontend Technologies': [
        'MDN Web Docs', 'React Official Docs', 'Vue.js Guide', 'Angular Tutorial'
      ],
      'Backend Technologies': [
        'Node.js Docs', 'Django Tutorial', 'Spring Boot Guide', 'Express.js Docs'
      ],
      'Databases': [
        'PostgreSQL Tutorial', 'MongoDB University', 'SQLBolt', 'W3Schools SQL'
      ],
      'Cloud & DevOps': [
        'AWS Training', 'Docker Tutorial', 'Kubernetes Docs', 'Azure Learn'
      ],
      'Data Science & AI': [
        'Coursera ML Course', 'Kaggle Learn', 'Fast.ai', 'PyTorch Tutorials'
      ]
    };
    
    return resources[category] || ['General Programming Resources'];
  }

  estimateLearningTime(skills) {
    const baseTimePerSkill = 2; // weeks
    const totalSkills = skills.length;
    const estimatedWeeks = Math.ceil(totalSkills * baseTimePerSkill * 0.7); // 70% efficiency
    return `${estimatedWeeks} weeks`;
  }

  calculateConfidence(score, missingSkillsCount) {
    if (score >= 80) return 'High';
    if (score >= 60) return 'Medium';
    if (missingSkillsCount <= 2) return 'Medium';
    return 'Low';
  }
}

// Export singleton instance
export const aiMatchingEngine = new AIMatchingEngine();
