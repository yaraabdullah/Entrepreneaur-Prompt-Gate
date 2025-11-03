import { NextRequest, NextResponse } from 'next/server'
import { saveUserInfo } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, phone, firstName, lastName } = await request.json()

    if (!email || !phone || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const result = await saveUserInfo({
      email,
      phone,
      firstName,
      lastName,
    })

    if (result.success) {
      return NextResponse.json({ success: true, data: result.data })
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to save information' },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Error in signup API:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
