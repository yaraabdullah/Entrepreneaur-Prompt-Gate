import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { stages } from '@/lib/stages'
import { StageAnswers } from '@/lib/stages'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// Helper function to list available models
async function listAvailableModels(): Promise<string[]> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`,
      { method: 'GET' }
    )
    
    if (!response.ok) {
      console.error('Failed to list models:', response.status, response.statusText)
      return []
    }
    
    const data = await response.json()
    const models = data.models
      ?.filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
      ?.map((m: any) => m.name?.replace('models/', '') || m.name)
      .filter(Boolean) || []
    
    return models
  } catch (error) {
    console.error('Error listing models:', error)
    return []
  }
}

export async function POST(request: NextRequest) {
  try {
    const { stageId, answers, language } = await request.json()
    const normalizedLanguage = language === 'ar' ? 'ar' : 'en'
    const outputLanguageLabel = normalizedLanguage === 'ar' ? 'Arabic' : 'English'
    const localeInstruction =
      normalizedLanguage === 'ar'
        ? 'اكتب المخرجات بالكامل باللغة العربية الفصحى الواضحة، مع الحفاظ على نفس البنية التنظيمية والاحترافية.'
        : 'Write the entire output in clear, professional English.'

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      )
    }

    const stage = stages.find(s => s.id === stageId)
    if (!stage) {
      return NextResponse.json(
        { error: 'Invalid stage ID' },
        { status: 400 }
      )
    }

    // Build context from answers
    const context = stage.questions
      .map(q => {
        const answer = (answers as StageAnswers)[q.id]
        return answer ? `${q.defaultLabel}: ${answer}` : null
      })
      .filter(Boolean)
      .join('\n')

    const stageInstructionList = stage.promptInstructions?.length
      ? stage.promptInstructions.map((instruction, index) => `${index + 1}. ${instruction}`).join('\n')
      : `1. Stay strictly within the scope of the ${stage.defaultTitle} stage.\n2. Use the user’s inputs as the single source of truth.\n3. Provide actionable, implementation-ready guidance.\n4. Conclude with the deliverable: ${stage.deliverableDescription}`

    // Create a comprehensive prompt for best practices
    const fullPrompt = `You are an expert entrepreneurial consultant and AI prompt engineer. Your task is to generate highly optimized, professional prompts that follow industry best practices for entrepreneurial projects.

When generating prompts, you must:
1. Structure the prompt clearly with logical sections
2. Include actionable, specific guidance
3. Incorporate industry best practices and frameworks
4. Use professional business terminology
5. Include relevant metrics, KPIs, and success criteria
6. Provide comprehensive yet concise recommendations
7. Follow proven methodologies (Lean Startup, Business Model Canvas, etc.)
8. Ensure the prompt is ready for immediate use with AI models
9. Include strategic insights and tactical recommendations
10. Maintain a professional, authoritative tone

Generate prompts that are:
- Comprehensive but not verbose
- Actionable with clear next steps
- Based on established best practices
- Tailored to the specific stage context
- Ready for enterprise-grade deployment

---

Generate an optimized entrepreneurial prompt for the ${stage.defaultTitle} stage.

STAGE CONTEXT:
${stage.defaultDescription}

USER INPUT:
${context}

STAGE-SPECIFIC BEST PRACTICES:
${stageInstructionList}

RESPONSE FORMAT REQUIREMENTS:
- Produce a single prompt that the entrepreneur can run with an AI model.
- Organize the prompt with clear headings, numbered steps, and bullet points where appropriate.
- Reference the user’s inputs explicitly so the guidance is personalized.
- Remain within the scope of the ${stage.defaultTitle} stage and avoid unrelated recommendations.
- If the user’s inputs describe a digital product, include guidance for crafting or refining the product experience (e.g., website or app structure) aligned with this stage.
- Include a clearly labeled "Context" section that enumerates the user inputs before listing requirements.
- Follow the context with structured sections (e.g., "Deliverable Requirements", "Constraints", "Output Format") tailored to the stage.
- Output only the final prompt text—no explanations, apologies, or statements about yourself.
- Phrase the prompt as an imperative instruction directed at the target AI (e.g., begin with "Generate...", "Create...", "Design...").
- Never use first-person statements such as "I will" or "I am"; speak to the target AI as "you".
- ${localeInstruction}

EXPECTED OUTPUT:
- The prompt must instruct the target AI to deliver: ${stage.deliverableDescription}

Generate a comprehensive, best-practice-aligned prompt that will guide the entrepreneur through this stage. The prompt should be:
- Well-structured with clear sections
- Actionable with specific recommendations
- Based on proven methodologies
- Professional and authoritative
- Ready for immediate use with AI models`

    // First, try to list available models
    const availableModels = await listAvailableModels()
    
    // Build list of models to try - prefer available ones, then fallback to common names
    const modelOptions = availableModels.length > 0 
      ? availableModels 
      : [
          'gemini-1.5-flash',
          'gemini-1.5-pro',
          'gemini-1.0-pro-latest',
          'gemini-pro',
          'gemini-pro-vision'
        ]
    
    let generatedPrompt = ''
    let lastError: any = null
    let usedModel = ''
    
    // Try each model until one works
    for (const modelOption of modelOptions) {
      try {
        // Remove 'models/' prefix if present
        const cleanModelName = modelOption.replace(/^models\//, '')
        
        const model = genAI.getGenerativeModel({ 
          model: cleanModelName,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2000,
          },
        })

        const result = await model.generateContent(fullPrompt)
        const response = await result.response
        const text = response.text()
        
        if (text && text.trim()) {
          generatedPrompt = text
          usedModel = cleanModelName
          break
        }
      } catch (error: any) {
        lastError = error
        // Try next model
        continue
      }
    }
    
    // If all failed, return helpful error message
    if (!generatedPrompt) {
      const errorDetails = lastError?.message || 'Unknown error'
      const apiKeyPreview = process.env.GEMINI_API_KEY 
        ? `${process.env.GEMINI_API_KEY.substring(0, 10)}...` 
        : 'Not set'
      
      return NextResponse.json(
        { 
          error: `No available Gemini models found. Please verify your API key and model access.`,
          details: errorDetails,
          availableModels: availableModels.length > 0 ? availableModels : 'Could not fetch available models',
          apiKeyPreview: apiKeyPreview,
          suggestion: availableModels.length === 0 
            ? 'Your API key may not have access to list models. Try enabling "Generative Language API" in Google Cloud Console: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com'
            : 'Check available models and API setup at https://ai.google.dev/models'
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ prompt: generatedPrompt })
  } catch (error) {
    console.error('Error generating prompt:', error)
    return NextResponse.json(
      { error: 'Failed to generate prompt. Please try again.' },
      { status: 500 }
    )
  }
}
