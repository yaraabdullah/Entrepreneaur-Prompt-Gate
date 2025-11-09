export interface Stage {
  id: string
  titleKey: string
  defaultTitle: string
  descriptionKey: string
  defaultDescription: string
  deliverableDescription: string
  promptInstructions: string[]
  questions: Question[]
}

export interface Question {
  id: string
  labelKey: string
  defaultLabel: string
  type: 'text' | 'textarea' | 'number'
  placeholderKey?: string
  defaultPlaceholder?: string
  required?: boolean
}

export interface StageAnswers {
  [questionId: string]: string
}

export const stages: Stage[] = [
  {
    id: 'idea-generation',
    titleKey: 'stage1',
    defaultTitle: 'Idea Generation & Business Model',
    descriptionKey: 'stage1Description',
    defaultDescription: 'Define your core business concept and validate your idea',
    deliverableDescription: 'Deliver a visual business model canvas summarizing customer segments, value propositions, channels, customer relationships, revenue streams, key resources, key activities, key partners, cost structure, and suggested validation experiments.',
    promptInstructions: [
      'Focus strictly on validating the business idea, problem-solution fit, and customer segments.',
      'Transform the user’s inputs into a clear value proposition, customer personas, and assumptions to test.',
      'Recommend lean validation experiments, data points to collect, and decision criteria before investing in development.',
      'End with a structured business model canvas overview that is ready to hand off to designers for visualization.'
    ],
    questions: [
      {
        id: 'businessIdea',
        labelKey: 'stage1Q1Label',
        defaultLabel: 'What is your business idea?',
        type: 'textarea',
        placeholderKey: 'stage1Q1Placeholder',
        defaultPlaceholder: 'Describe your business concept in detail',
        required: true
      },
      {
        id: 'problemSolving',
        labelKey: 'stage1Q2Label',
        defaultLabel: 'What problem does your idea solve?',
        type: 'textarea',
        placeholderKey: 'stage1Q2Placeholder',
        defaultPlaceholder: 'Describe the specific problem or pain point',
        required: true
      },
      {
        id: 'targetMarket',
        labelKey: 'stage1Q3Label',
        defaultLabel: 'Who is your target market?',
        type: 'textarea',
        placeholderKey: 'stage1Q3Placeholder',
        defaultPlaceholder: 'Define your ideal customer segments',
        required: true
      },
      {
        id: 'competitiveAdvantage',
        labelKey: 'stage1Q4Label',
        defaultLabel: 'What makes your solution unique?',
        type: 'textarea',
        placeholderKey: 'stage1Q4Placeholder',
        defaultPlaceholder: 'Explain your competitive advantage',
        required: false
      },
      {
        id: 'revenueModel',
        labelKey: 'stage1Q5Label',
        defaultLabel: 'How will you generate revenue?',
        type: 'textarea',
        placeholderKey: 'stage1Q5Placeholder',
        defaultPlaceholder: 'Describe your revenue streams and business model',
        required: false
      }
    ]
  },
  {
    id: 'mvp-development',
    titleKey: 'stage2',
    defaultTitle: 'MVP Development',
    descriptionKey: 'stage2Description',
    defaultDescription: 'Build and validate your minimum viable product',
    deliverableDescription: 'Deliver a build-ready MVP blueprint describing the website or app architecture, user journeys, prioritized backlog, interface structure (sitemap or screen flow), and technical implementation guidance.',
    promptInstructions: [
      'Remain fully focused on defining and building the MVP scope, including user journeys, feature prioritisation, and technical architecture.',
      'Convert the user’s answers into a concrete MVP plan covering pages/screens, core workflows, and success metrics for a first release.',
      'Deliver implementation-ready guidance (tech stack, backlog, development roadmap) that enables shipping a functional website or app quickly.',
      'Conclude with a detailed MVP website/app blueprint that a product squad can execute immediately.'
    ],
    questions: [
      {
        id: 'coreFeatures',
        labelKey: 'stage2Q1Label',
        defaultLabel: 'What are the core features of your MVP?',
        type: 'textarea',
        placeholderKey: 'stage2Q1Placeholder',
        defaultPlaceholder: 'List the essential features that define your MVP',
        required: true
      },
      {
        id: 'techStack',
        labelKey: 'stage2Q2Label',
        defaultLabel: 'What technology stack are you considering?',
        type: 'textarea',
        placeholderKey: 'stage2Q2Placeholder',
        defaultPlaceholder: 'Mention technologies, frameworks, or platforms',
        required: false
      },
      {
        id: 'timeline',
        labelKey: 'stage2Q3Label',
        defaultLabel: 'What is your development timeline?',
        type: 'text',
        placeholderKey: 'stage2Q3Placeholder',
        defaultPlaceholder: 'e.g., 3 months, 6 months',
        required: false
      },
      {
        id: 'successMetrics',
        labelKey: 'stage2Q4Label',
        defaultLabel: 'How will you measure MVP success?',
        type: 'textarea',
        placeholderKey: 'stage2Q4Placeholder',
        defaultPlaceholder: 'Define key metrics and validation criteria',
        required: false
      },
      {
        id: 'challenges',
        labelKey: 'stage2Q5Label',
        defaultLabel: 'What are the main technical challenges?',
        type: 'textarea',
        placeholderKey: 'stage2Q5Placeholder',
        defaultPlaceholder: 'Identify potential technical hurdles',
        required: false
      }
    ]
  },
  {
    id: 'investor-pitching',
    titleKey: 'stage3',
    defaultTitle: 'Investor Pitching',
    descriptionKey: 'stage3Description',
    defaultDescription: 'Prepare your pitch deck and investor presentation',
    deliverableDescription: 'Deliver a slide-by-slide investor pitch deck outline covering narrative flow, proof points, funding ask, use of funds, and anticipated investor questions.',
    promptInstructions: [
      'Stay centred on crafting an investor-ready narrative that highlights traction, market opportunity, and funding needs.',
      'Use the user’s inputs to outline a compelling pitch structure with data-backed storytelling and clear financial asks.',
      'Provide persuasive talking points, slide-by-slide guidance, and investor FAQs tailored to the funding round.',
      'Wrap up with a complete investor pitch deck outline that can be transferred into presentation software.'
    ],
    questions: [
      {
        id: 'fundingAmount',
        labelKey: 'stage3Q1Label',
        defaultLabel: 'How much funding are you seeking?',
        type: 'text',
        placeholderKey: 'stage3Q1Placeholder',
        defaultPlaceholder: 'e.g., $500K seed round',
        required: true
      },
      {
        id: 'useOfFunds',
        labelKey: 'stage3Q2Label',
        defaultLabel: 'How will you use the funding?',
        type: 'textarea',
        placeholderKey: 'stage3Q2Placeholder',
        defaultPlaceholder: 'Break down allocation: development, marketing, operations',
        required: true
      },
      {
        id: 'traction',
        labelKey: 'stage3Q3Label',
        defaultLabel: 'What traction do you have?',
        type: 'textarea',
        placeholderKey: 'stage3Q3Placeholder',
        defaultPlaceholder: 'Users, revenue, partnerships, metrics',
        required: false
      },
      {
        id: 'marketSize',
        labelKey: 'stage3Q4Label',
        defaultLabel: 'What is your addressable market size?',
        type: 'textarea',
        placeholderKey: 'stage3Q4Placeholder',
        defaultPlaceholder: 'Total Addressable Market (TAM) analysis',
        required: false
      },
      {
        id: 'exitStrategy',
        labelKey: 'stage3Q5Label',
        defaultLabel: 'What is your exit strategy?',
        type: 'textarea',
        placeholderKey: 'stage3Q5Placeholder',
        defaultPlaceholder: 'Long-term vision and exit plans',
        required: false
      }
    ]
  },
  {
    id: 'customer-acquisition',
    titleKey: 'stage4',
    defaultTitle: 'Customer Acquisition & Marketing',
    descriptionKey: 'stage4Description',
    defaultDescription: 'Develop your go-to-market strategy',
    deliverableDescription: 'Deliver a multi-channel acquisition playbook including ICP profiles, messaging pillars, campaign concepts, funnel targets, and 30-60-90 day execution plan.',
    promptInstructions: [
      'Concentrate exclusively on go-to-market planning, demand generation, and conversion optimisation.',
      'Translate the user’s inputs into channel strategies, messaging pillars, and campaign roadmaps tied to measurable KPIs.',
      'Recommend acquisition experiments, funnel improvements, and retention tactics aligned with the defined target customer.',
      'Finish with a structured go-to-market plan outlining channels, messaging, calendar, and success metrics.'
    ],
    questions: [
      {
        id: 'customerSegment',
        labelKey: 'stage4Q1Label',
        defaultLabel: 'Who is your ideal customer?',
        type: 'textarea',
        placeholderKey: 'stage4Q1Placeholder',
        defaultPlaceholder: 'Detailed customer persona and characteristics',
        required: true
      },
      {
        id: 'channels',
        labelKey: 'stage4Q2Label',
        defaultLabel: 'What marketing channels will you use?',
        type: 'textarea',
        placeholderKey: 'stage4Q2Placeholder',
        defaultPlaceholder: 'Social media, content marketing, paid ads, partnerships',
        required: true
      },
      {
        id: 'pricingStrategy',
        labelKey: 'stage4Q3Label',
        defaultLabel: 'What is your pricing strategy?',
        type: 'textarea',
        placeholderKey: 'stage4Q3Placeholder',
        defaultPlaceholder: 'Pricing model and competitive positioning',
        required: false
      },
      {
        id: 'valueProposition',
        labelKey: 'stage4Q4Label',
        defaultLabel: 'What is your value proposition?',
        type: 'textarea',
        placeholderKey: 'stage4Q4Placeholder',
        defaultPlaceholder: 'Clear value proposition for your target customers',
        required: true
      },
      {
        id: 'acquisitionCost',
        labelKey: 'stage4Q5Label',
        defaultLabel: 'What is your customer acquisition cost target?',
        type: 'text',
        placeholderKey: 'stage4Q5Placeholder',
        defaultPlaceholder: 'CAC target and LTV:CAC ratio',
        required: false
      }
    ]
  },
  {
    id: 'scaling-growth',
    titleKey: 'stage5',
    defaultTitle: 'Scaling & Growth',
    descriptionKey: 'stage5Description',
    defaultDescription: 'Plan for sustainable growth and scaling',
    deliverableDescription: 'Deliver a phased scaling roadmap with milestones, OKRs, resourcing plan, organizational changes, and risk mitigation strategies.',
    promptInstructions: [
      'Stay focused on scaling strategies such as team expansion, market growth, and process maturation.',
      'Convert the user’s responses into a phased growth plan with clear milestones, resource allocations, and risk mitigation.',
      'Recommend operational dashboards, leadership hires, and strategic initiatives that sustain long-term growth.',
      'Close with a timeline-based scaling roadmap that executives can review and approve.'
    ],
    questions: [
      {
        id: 'growthStrategy',
        labelKey: 'stage5Q1Label',
        defaultLabel: 'What is your growth strategy?',
        type: 'textarea',
        placeholderKey: 'stage5Q1Placeholder',
        defaultPlaceholder: 'Organic growth, partnerships, expansion plans',
        required: true
      },
      {
        id: 'teamScaling',
        labelKey: 'stage5Q2Label',
        defaultLabel: 'How will you scale your team?',
        type: 'textarea',
        placeholderKey: 'stage5Q2Placeholder',
        defaultPlaceholder: 'Hiring plans and organizational structure',
        required: false
      },
      {
        id: 'operationalChallenges',
        labelKey: 'stage5Q3Label',
        defaultLabel: 'What operational challenges do you anticipate?',
        type: 'textarea',
        placeholderKey: 'stage5Q3Placeholder',
        defaultPlaceholder: 'Key operational hurdles in scaling',
        required: false
      },
      {
        id: 'marketExpansion',
        labelKey: 'stage5Q4Label',
        defaultLabel: 'Are you planning geographic or market expansion?',
        type: 'textarea',
        placeholderKey: 'stage5Q4Placeholder',
        defaultPlaceholder: 'Expansion strategy and target markets',
        required: false
      },
      {
        id: 'partnerships',
        labelKey: 'stage5Q5Label',
        defaultLabel: 'What strategic partnerships are you pursuing?',
        type: 'textarea',
        placeholderKey: 'stage5Q5Placeholder',
        defaultPlaceholder: 'Partnership opportunities and alliances',
        required: false
      }
    ]
  },
  {
    id: 'operations-optimization',
    titleKey: 'stage6',
    defaultTitle: 'Operations & Optimization',
    descriptionKey: 'stage6Description',
    defaultDescription: 'Optimize operations and improve efficiency',
    deliverableDescription: 'Deliver an operations optimisation program detailing process maps, automation opportunities, KPI dashboards, cost-saving initiatives, and quality-control mechanisms.',
    promptInstructions: [
      'Keep the prompt centred on operational efficiency, process optimisation, and quality assurance.',
      'Translate the user’s inputs into streamlined workflows, automation opportunities, and KPI dashboards.',
      'Provide a prioritised optimisation roadmap with quick wins, tooling recommendations, and governance practices.',
      'Finish with an operations optimisation plan that can be executed by the operations team.'
    ],
    questions: [
      {
        id: 'operationalEfficiency',
        labelKey: 'stage6Q1Label',
        defaultLabel: 'What areas need operational optimization?',
        type: 'textarea',
        placeholderKey: 'stage6Q1Placeholder',
        defaultPlaceholder: 'Processes, workflows, systems that need improvement',
        required: true
      },
      {
        id: 'automation',
        labelKey: 'stage6Q2Label',
        defaultLabel: 'What can be automated?',
        type: 'textarea',
        placeholderKey: 'stage6Q2Placeholder',
        defaultPlaceholder: 'Tasks and processes suitable for automation',
        required: false
      },
      {
        id: 'keyMetrics',
        labelKey: 'stage6Q3Label',
        defaultLabel: 'What are your key operational metrics?',
        type: 'textarea',
        placeholderKey: 'stage6Q3Placeholder',
        defaultPlaceholder: 'KPIs you track for operational performance',
        required: false
      },
      {
        id: 'costOptimization',
        labelKey: 'stage6Q4Label',
        defaultLabel: 'Where can you optimize costs?',
        type: 'textarea',
        placeholderKey: 'stage6Q4Placeholder',
        defaultPlaceholder: 'Cost reduction opportunities',
        required: false
      },
      {
        id: 'quality',
        labelKey: 'stage6Q5Label',
        defaultLabel: 'How do you maintain quality standards?',
        type: 'textarea',
        placeholderKey: 'stage6Q5Placeholder',
        defaultPlaceholder: 'Quality assurance processes and standards',
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
