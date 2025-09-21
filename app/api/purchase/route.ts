import { type NextRequest, NextResponse } from "next/server"

const purchases: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Mock OCR processing of invoice
    const ocrResult = {
      drug_id: body.drug_id || "amoxicillin",
      purchased_doses: body.purchased_doses || Math.floor(Math.random() * 20) + 5,
      invoice_date: new Date().toISOString().split("T")[0],
    }

    const newPurchase = {
      id: purchases.length + 1,
      invoice_media_url: body.invoice_media_url,
      drug_id: ocrResult.drug_id,
      purchased_doses: ocrResult.purchased_doses,
      farmer_id: body.farmer_id,
      date: ocrResult.invoice_date,
      ocr_confidence: 0.95,
    }

    purchases.push(newPurchase)

    // Run reconciliation check
    // This would trigger flagging logic for purchase vs usage mismatch

    return NextResponse.json({
      success: true,
      purchase: newPurchase,
      ocr_result: ocrResult,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process purchase" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ purchases })
}
