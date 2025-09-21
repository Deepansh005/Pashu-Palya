import { type NextRequest, NextResponse } from "next/server"

const drugEvents: any[] = []

export async function POST(request: NextRequest, { params }: { params: { eventId: string } }) {
  try {
    const eventId = Number.parseInt(params.eventId)
    const body = await request.json()

    const eventIndex = drugEvents.findIndex((e) => e.id === eventId)

    if (eventIndex === -1) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    // Update event to trusted status
    drugEvents[eventIndex] = {
      ...drugEvents[eventIndex],
      status: "trusted",
      vet_id: body.vet_id,
      vet_notes: body.notes,
      approved_date: new Date().toISOString(),
      flag_ids: [], // Clear flags when approved
    }

    return NextResponse.json({
      success: true,
      event: drugEvents[eventIndex],
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to approve event" }, { status: 500 })
  }
}
