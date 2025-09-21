import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock flagged events data
    const flaggedEvents = [
      {
        id: 1,
        animal_id: "A001",
        drug_id: "tetracycline",
        date: "2024-01-10",
        flags: ["purchase_vs_usage_mismatch"],
        reason: "Purchased 10 doses, logged 15 doses",
        priority: "high",
        farmer_id: "farmer1",
      },
      {
        id: 2,
        animal_id: "A002",
        drug_id: "amoxicillin",
        date: "2024-01-08",
        flags: ["missing_media"],
        reason: "No photo evidence after 24 hours",
        priority: "medium",
        farmer_id: "farmer1",
      },
      {
        id: 3,
        animal_id: "A001",
        drug_id: "penicillin",
        date: "2024-01-05",
        flags: ["rapid_repeat_dosing"],
        reason: "3 doses within 2 days",
        priority: "high",
        farmer_id: "farmer1",
      },
    ]

    return NextResponse.json({
      flags: flaggedEvents,
      total_count: flaggedEvents.length,
      high_priority_count: flaggedEvents.filter((e) => e.priority === "high").length,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch flags" }, { status: 500 })
  }
}
