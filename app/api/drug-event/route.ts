import { type NextRequest, NextResponse } from "next/server"

const drugEvents: any[] = [
  {
    id: 1,
    animal_id: "A001",
    drug_id: "amoxicillin",
    dosage: "500mg",
    date: "2024-01-15",
    status: "provisional",
    media_urls: [],
    vet_id: null,
    flag_ids: [],
    farmer_id: "farmer1",
  },
]

const purchases: any[] = [
  {
    id: 1,
    invoice_media_url: "/invoice1.jpg",
    drug_id: "amoxicillin",
    purchased_doses: 10,
    farmer_id: "farmer1",
    date: "2024-01-10",
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Create provisional drug event
    const newEvent = {
      id: drugEvents.length + 1,
      animal_id: body.animal_id,
      drug_id: body.drug_id,
      dosage: body.dosage,
      date: new Date().toISOString().split("T")[0],
      status: "provisional",
      media_urls: body.media_urls || [],
      vet_id: null,
      flag_ids: [],
      farmer_id: body.farmer_id,
    }

    // Run flagging rules
    const flags = []

    // Check purchase vs usage mismatch
    const relatedPurchases = purchases.filter((p) => p.drug_id === body.drug_id && p.farmer_id === body.farmer_id)
    const totalPurchased = relatedPurchases.reduce((sum, p) => sum + p.purchased_doses, 0)
    const trustedDoses = drugEvents.filter(
      (e) => e.drug_id === body.drug_id && e.status === "trusted" && e.farmer_id === body.farmer_id,
    ).length

    if (totalPurchased < trustedDoses + 1) {
      flags.push("purchase_vs_usage_mismatch")
    }

    // Check for rapid repeat dosing
    const recentEvents = drugEvents.filter(
      (e) => e.animal_id === body.animal_id && new Date(e.date) > new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    )

    if (recentEvents.length >= 2) {
      flags.push("rapid_repeat_dosing")
    }

    // Check for missing media (will be flagged after 24 hours)
    if (!body.media_urls || body.media_urls.length === 0) {
      // This would be handled by a background job in real implementation
      setTimeout(
        () => {
          if (!newEvent.media_urls.length && !newEvent.vet_id) {
            newEvent.flag_ids.push("missing_media")
            newEvent.status = "flagged"
          }
        },
        24 * 60 * 60 * 1000,
      ) // 24 hours
    }

    if (flags.length > 0) {
      newEvent.flag_ids = flags
      newEvent.status = "flagged"
    }

    drugEvents.push(newEvent)

    return NextResponse.json({
      success: true,
      event: newEvent,
      flags: flags,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create drug event" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ events: drugEvents })
}
