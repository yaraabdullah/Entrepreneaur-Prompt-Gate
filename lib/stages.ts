export interface Stage {
  id: string
  title: string
  description: string
  questions: Question[]
}

export interface Question {
  id: string
  label: string
  type: 'text' | 'textarea' | 'number'
  placeholder?: string
  required?: boolean
}

export interface StageAnswers {
  [questionId: string]: string
}

export const stages: Stage[] = [
  {
    id: 'idea-generation',
    title: 'Idea Generation & Business Model',
    description: 'Define your core business concept and validate your idea',
    questions: [
      {
        id: 'businessIdea',
        label: 'What is your business idea?',
        type: 'textarea',
        placeholder: 'Describe your business concept in detail',
        required: true
      },
      {
        id: 'problemSolving',
        label: 'What problem does your idea solve?',
        type: 'textarea',
        placeholder: 'Describe the specific problem or pain point',
        required: true
      },
      {
        id: 'targetMarket',
        label: 'Who is your target market?',
        type: 'textarea',
        placeholder: 'Define your ideal customer segments',
        required: true
      },
      {
        id: 'competitiveAdvantage',
        label: 'What makes your solution unique?',
        type: 'textarea',
        placeholder: 'Explain your competitive advantage',
        required: false
      },
      {
        id: 'revenueModel',
        label: 'How will you generate revenue?',
        type: 'textarea',
        placeholder: 'Describe your revenue streams and business model',
        required: false
      }
    ]
  },
  {
    id: 'mvp-development',
    title: 'MVP Development',
    description: 'Build and validate your minimum viable product',
    questions: [
      {
        id: 'coreFeatures',
        label: 'What are the core features of your MVP?',
        type: 'textarea',
        placeholder: 'List the essential features that define your MVP',
        required: true
      },
      {
        id: 'techStack',
        label: 'What technology stack are you considering?',
        type: 'textarea',
        placeholder: 'Mention technologies, frameworks, or platforms',
        required: false
      },
      {
        id: 'timeline',
        label: 'What is your development timeline?',
        type: 'text',
        placeholder: 'e.g., 3 months, 6 months',
        required: false
      },
      {
        id: 'successMetrics',
        label: 'How will you measure MVP success?',
        type: 'textarea',
        placeholder: 'Define key metrics and validation criteria',
        required: false
      },
      {
        id: 'challenges',
        label: 'What are the main technical challenges?',
        type: 'textarea',
        placeholder: 'Identify potential technical hurdles',
        required: false
      }
    ]
  },
  {
    id: 'investor-pitching',
    title: 'Investor Pitching',
    description: 'Prepare your pitch deck and investor presentation',
    questions: [
      {
        id: 'fundingAmount',
        label: 'How much funding are you seeking?',
        type: 'text',
        placeholder: 'e.g., $500K seed round',
        required: true
      },
      {
        id: 'useOfFunds',
        label: 'How will you use the funding?',
        type: 'textarea',
        placeholder: 'Break down allocation: development, marketing, operations',
        required: true
      },
      {
        id: 'traction',
        label: 'What traction do you have?',
        type: 'textarea',
        placeholder: 'Users, revenue, partnerships, metrics',
        required: false
      },
      {
        id: 'marketSize',
        label: 'What is your addressable market size?',
        type: 'textarea',
        placeholder: 'Total Addressable Market (TAM) analysis',
        required: false
      },
      {
        id: 'exitStrategy',
        label: 'What is your exit strategy?',
        type: 'textarea',
        placeholder: 'Long-term vision and exit plans',
        required: false
      }
    ]
  },
  {
    id: 'customer-acquisition',
    title: 'Customer Acquisition & Marketing',
    description: 'Develop your go-to-market strategy',
    questions: [
      {
        id: 'customerSegment',
        label: 'Who is your ideal customer?',
        type: 'textarea',
        placeholder: 'Detailed customer persona and characteristics',
        required: true
      },
      {
        id: 'channels',
        label: 'What marketing channels will you use?',
        type: 'textarea',
        placeholder: 'Social media, content marketing, paid ads, partnerships',
        required: true
      },
      {
        id: 'pricingStrategy',
        label: 'What is your pricing strategy?',
        type: 'textarea',
        placeholder: 'Pricing model and competitive positioning',
        required: false
      },
      {
        id: 'valueProposition',
        label: 'What is your value proposition?',
        type: 'textarea',
        placeholder: 'Clear value proposition for your target customers',
        required: true
      },
      {
        id: 'acquisitionCost',
        label: 'What is your customer acquisition cost target?',
        type: 'text',
        placeholder: 'CAC target and LTV:CAC ratio',
        required: false
      }
    ]
  },
  {
    id: 'scaling-growth',
    title: 'Scaling & Growth',
    description: 'Plan for sustainable growth and scaling',
    questions: [
      {
        id: 'growthStrategy',
        label: 'What is your growth strategy?',
        type: 'textarea',
        placeholder: 'Organic growth, partnerships, expansion plans',
        required: true
      },
      {
        id: 'teamScaling',
        label: 'How will you scale your team?',
        type: 'textarea',
        placeholder: 'Hiring plans and organizational structure',
        required: false
      },
      {
        id: 'operationalChallenges',
        label: 'What operational challenges do you anticipate?',
        type: 'textarea',
        placeholder: 'Key operational hurdles in scaling',
        required: false
      },
      {
        id: 'marketExpansion',
        label: 'Are you planning geographic or market expansion?',
        type: 'textarea',
        placeholder: 'Expansion strategy and target markets',
        required: false
      },
      {
        id: 'partnerships',
        label: 'What strategic partnerships are you pursuing?',
        type: 'textarea',
        placeholder: 'Partnership opportunities and alliances',
        required: false
      }
    ]
  },
  {
    id: 'operations-optimization',
    title: 'Operations & Optimization',
    description: 'Optimize operations and improve efficiency',
    questions: [
      {
        id: 'operationalEfficiency',
        label: 'What areas need operational optimization?',
        type: 'textarea',
        placeholder: 'Processes, workflows, systems that need improvement',
        required: true
      },
      {
        id: 'automation',
        label: 'What can be automated?',
        type: 'textarea',
        placeholder: 'Tasks and processes suitable for automation',
        required: false
      },
      {
        id: 'keyMetrics',
        label: 'What are your key operational metrics?',
        type: 'textarea',
        placeholder: 'KPIs you track for operational performance',
        required: false
      },
      {
        id: 'costOptimization',
        label: 'Where can you optimize costs?',
        type: 'textarea',
        placeholder: 'Cost reduction opportunities',
        required: false
      },
      {
        id: 'quality',
        label: 'How do you maintain quality standards?',
        type: 'textarea',
        placeholder: 'Quality assurance processes and standards',
        required: false
      }
    ]
  }
]

export function generatePromptForStage(stageId: string, answers: StageAnswers): string {
  const stage = stages.find(s => s.id === stageId)
  if (!stage) return ''

  const promptBuilders: { [key: string]: (answers: StageAnswers, stage: Stage) => string } = {
    'idea-generation': (ans) => `BUSINESS IDEA VALIDATION PROMPT

PROBLEM STATEMENT:
${ans.problemSolving || 'Not specified'}

BUSINESS IDEA:
${ans.businessIdea || 'Not specified'}

TARGET MARKET:
${ans.targetMarket || 'Not specified'}

COMPETITIVE ADVANTAGE:
${ans.competitiveAdvantage || 'Not specified'}

REVENUE MODEL:
${ans.revenueModel || 'Not specified'}

OBJECTIVE:
Generate a comprehensive business model canvas and validation strategy. Include market analysis, customer segmentation, value proposition design, competitive positioning, and initial validation steps. Provide actionable recommendations for idea refinement and market entry strategy.`,

    'mvp-development': (ans) => `MVP DEVELOPMENT PROMPT

CORE FEATURES:
${ans.coreFeatures || 'Not specified'}

TECHNOLOGY STACK:
${ans.techStack || 'Not specified'}

DEVELOPMENT TIMELINE:
${ans.timeline || 'Not specified'}

SUCCESS METRICS:
${ans.successMetrics || 'Not specified'}

TECHNICAL CHALLENGES:
${ans.challenges || 'Not specified'}

OBJECTIVE:
Create a detailed MVP development roadmap. Include feature prioritization matrix, technical architecture recommendations, development milestones, testing strategy, and launch plan. Provide best practices for MVP validation and iteration based on user feedback.`,

    'investor-pitching': (ans) => `INVESTOR PITCH DECK PROMPT

FUNDING REQUIREMENT:
${ans.fundingAmount || 'Not specified'}

USE OF FUNDS:
${ans.useOfFunds || 'Not specified'}

TRACTION TO DATE:
${ans.traction || 'Not specified'}

MARKET SIZE:
${ans.marketSize || 'Not specified'}

EXIT STRATEGY:
${ans.exitStrategy || 'Not specified'}

OBJECTIVE:
Generate a comprehensive investor pitch deck structure. Include executive summary, problem-solution fit, market opportunity analysis, business model, go-to-market strategy, traction demonstration, financial projections, team overview, and funding request. Provide persuasive narrative flow and compelling visual recommendations.`,

    'customer-acquisition': (ans) => `CUSTOMER ACQUISITION STRATEGY PROMPT

IDEAL CUSTOMER:
${ans.customerSegment || 'Not specified'}

MARKETING CHANNELS:
${ans.channels || 'Not specified'}

PRICING STRATEGY:
${ans.pricingStrategy || 'Not specified'}

VALUE PROPOSITION:
${ans.valueProposition || 'Not specified'}

CUSTOMER ACQUISITION COST TARGET:
${ans.acquisitionCost || 'Not specified'}

OBJECTIVE:
Develop a comprehensive go-to-market strategy. Include customer acquisition channels analysis, content marketing strategy, conversion optimization tactics, pricing model recommendations, customer journey mapping, and retention strategies. Provide actionable tactics for each marketing channel with expected ROI.`,

    'scaling-growth': (ans) => `SCALING & GROWTH STRATEGY PROMPT

GROWTH STRATEGY:
${ans.growthStrategy || 'Not specified'}

TEAM SCALING PLAN:
${ans.teamScaling || 'Not specified'}

OPERATIONAL CHALLENGES:
${ans.operationalChallenges || 'Not specified'}

MARKET EXPANSION PLAN:
${ans.marketExpansion || 'Not specified'}

STRATEGIC PARTNERSHIPS:
${ans.partnerships || 'Not specified'}

OBJECTIVE:
Create a comprehensive scaling roadmap. Include growth lever analysis, organizational structure recommendations, operational process improvements, expansion strategy, partnership development plan, and risk mitigation strategies. Provide phased growth plan with milestones and resource requirements.`,

    'operations-optimization': (ans) => `OPERATIONS OPTIMIZATION PROMPT

OPTIMIZATION AREAS:
${ans.operationalEfficiency || 'Not specified'}

AUTOMATION OPPORTUNITIES:
${ans.automation || 'Not specified'}

KEY OPERATIONAL METRICS:
${ans.keyMetrics || 'Not specified'}

COST OPTIMIZATION OPPORTUNITIES:
${ans.costOptimization || 'Not specified'}

QUALITY STANDARDS:
${ans.quality || 'Not specified'}

OBJECTIVE:
Develop an operations optimization strategy. Include process improvement recommendations, automation roadmap, efficiency metrics and KPIs, cost reduction strategies, quality assurance frameworks, and operational best practices. Provide implementation timeline and expected impact analysis.`
  }

  const builder = promptBuilders[stageId]
  return builder ? builder(answers, stage) : ''
}
