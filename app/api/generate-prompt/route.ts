import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { stages } from '@/lib/stages'
import { StageAnswers } from '@/lib/stages'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { stageId, answers } = await request.json()

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
        return answer ? `${q.label}: ${answer}` : null
      })
      .filter(Boolean)
      .join('\n')

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

Generate an optimized entrepreneurial prompt for the ${stage.title} stage.

STAGE CONTEXT:
${stage.description}

USER INPUT:
${context}

Generate a comprehensive, best-practice-aligned prompt that will guide the entrepreneur through this stage. The prompt should be:
- Well-structured with clear sections
- Actionable with specific recommendations
- Based on proven methodologies
- Professional and authoritative
- Ready for immediate use with AI models`

    // First, try to get available models
    let modelName = 'gemini-1.5-flash'
    let generatedPrompt = ''
    
    // Try newer models first, then fallback
    const modelOptions = [
      'gemini-1.5-flash',
      'gemini-1.5-pro', 
      'models/gemini-1.5-flash',
      'models/gemini-1.5-pro',
      'gemini-pro',
      'models/gemini-pro'
    ]
    
    let lastError: any = null
    
    for (const option of modelOptions) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: option,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2000,
          },
        })

        const result = await model.generateContent(fullPrompt)
        const response = await result.response
        generatedPrompt = response.text()
        
        if (generatedPrompt && generatedPrompt.trim()) {
          modelName = option
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
      const errorMessage = lastError?.message || 'No available models'
      return NextResponse.json(
        { 
          error: `No available Gemini models found. Please verify your API key and model access.`,
          details: lastError?.message || 'Make sure your Gemini API key has access to generateContent models. You may need to enable the Gemini API in Google Cloud Console.',
          suggestion: 'Check available models and API setup at https://ai.google.dev/models or https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com'
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
