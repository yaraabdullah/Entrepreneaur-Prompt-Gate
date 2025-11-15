import { NextRequest, NextResponse } from 'next/server'
import { checkUserExists } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const { exists, error } = await checkUserExists(email)

    if (error) {
      return NextResponse.json(
        { error: error || 'Failed to check user' },
        { status: 500 }
      )
    }

    if (!exists) {
      return NextResponse.json(
        { error: 'No account found with this email' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error in login API:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}



