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

    // Use gemini-1.5-flash for fast responses or gemini-1.5-pro for better quality
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2000,
      },
    })

    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const generatedPrompt = response.text()

    if (!generatedPrompt) {
      return NextResponse.json(
        { error: 'Failed to generate prompt' },
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
