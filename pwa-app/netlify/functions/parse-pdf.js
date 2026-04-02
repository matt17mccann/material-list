exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "API key not configured" }) };
  }

  try {
    const { images } = JSON.parse(event.body);
    if (!images || !images.length) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "No images provided" }) };
    }

    const content = [];
    for (const img of images) {
      content.push({
        type: "image",
        source: { type: "base64", media_type: "image/png", data: img },
      });
    }
    content.push({
      type: "text",
      text: `You are extracting window and door data from a Renewal by Andersen Installer Package PDF or similar window/door contract.

Extract EVERY window, patio door, and entry door unit. Do NOT create a unit for "Misc" entries (ID 900, etc.) — but DO read the 900 line item carefully because it contains critical job-wide details like wood species, casing profile, trim style, and finish info.

Return a JSON object with two keys:
1. "jobInfo" - object with customer/job details (extracted largely from the 900 Misc line item and Job Notes)
2. "units" - array of unit objects (one per actual window/door)

"jobInfo" fields:
- "customerName": customer name (string)
- "address": full address (string)
- "trimStyle": "Picture Frame" or "Traditional". Look in the 900 Misc description and Job Notes for phrases like "picture frame", "PF trim", or "traditional". Default to "Picture Frame" if unclear.
- "species": wood species from the 900 description (e.g. "oak C115 casing" means Oak). One of: "Oak", "Pine", "Maple", "Basswood". Default "Oak".
- "casingProfile": casing profile from the 900 description. Map to one of these exact values:
  "2-1/2\\" Colonial (C115)" for C115
  "2-1/2\\" Colonial (C118)" for C118
  "2-1/4\\" Colonial (H115)" for H115
  "2-1/2\\" Lakeside Colonial (RBA-Lside-2.5)" for Lakeside
  "3-1/4\\" Colonial (RBA-Col-3.25)" for 3-1/4 Colonial
  "2-1/2\\" Flat (RBA-Flat-2.5)" for flat 2.5
  "3-1/4\\" Flat (RBA-Flat-3.25)" for flat 3.25
  "2-1/2\\" Ranch" for Ranch 2.5
  "2-1/4\\" Ranch" for Ranch 2.25
  "1x4 (RBA-S4S-3.5)" for 1x4 S4S
  "1x3 (RBA-S4S-2.5)" for 1x3 S4S
  "1x4 Knotty Pine" for knotty pine
  Default: "2-1/2\\" Colonial (C115)"
- "finishNote": any finish/stain info (e.g. "Premium Teak", "Dark Walnut", "RBA White") or empty string

Each unit object fields:
- "unitType": one of "Window", "Entry Door", or "Patio Door"
- "label": the unit ID number as shown (e.g. "101", "102"), or empty string
- "location": room name (e.g. "Kitchen", "Living", "Master Bedroom"), or empty string
- "widthWhole": width whole inches (number). Use the EXACT measured size (e.g. 95 from "95-7/8"), not the rough contract size.
- "widthFrac": width fractional inches as a decimal. Convert fractions: 1/16=0.0625, 1/8=0.125, 3/16=0.1875, 1/4=0.25, 5/16=0.3125, 3/8=0.375, 7/16=0.4375, 1/2=0.5, 9/16=0.5625, 5/8=0.625, 11/16=0.6875, 3/4=0.75, 13/16=0.8125, 7/8=0.875, 15/16=0.9375. Use 0 if no fraction.
- "heightWhole": height whole inches (number). Use the EXACT measured size.
- "heightFrac": height fractional inches as decimal (same conversion as above). Use 0 if no fraction.
- "jambDepthWhole": jamb depth whole inches if listed (number or null)
- "jambDepthFrac": jamb depth fractional inches if listed (decimal or null)

Important:
- The 900 Misc line item is the key source for species, casing profile, trim style, and finish. Example: "Trim interior with extension jambs and standard 2 1/2" oak C115 casing...Premium Teak" tells you species=Oak, casing=C115, finish=Premium Teak.
- Each unit page shows exact sizes like "95-7/8\\" W 59-1/4\\" H" - USE THESE exact measurements, not the rough sizes from the order summary.
- If only rough sizes are available (no fractional measurements), use those.
- The Order Summary may show two size rows per unit: rough (top) and exact (bottom, with fractions). Always prefer the exact/fractional size.
- Do NOT include per-unit species/casing fields — those come from jobInfo and apply to all units.
- Return ONLY the JSON object, no other text.

Example:
{"jobInfo":{"customerName":"John Smith","address":"123 Main St, City, WI 54321","trimStyle":"Picture Frame","species":"Oak","casingProfile":"2-1/2\\" Colonial (C115)","finishNote":"Premium Teak"},"units":[{"unitType":"Window","label":"101","location":"Kitchen","widthWhole":95,"widthFrac":0.875,"heightWhole":59,"heightFrac":0.25,"jambDepthWhole":null,"jambDepthFrac":null}]}`,
    });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        messages: [{ role: "user", content }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return { statusCode: response.status, headers, body: JSON.stringify({ error: `Anthropic API error: ${errText}` }) };
    }

    const result = await response.json();
    const text = result.content[0].text;

    // Extract JSON object or array from response (handle markdown code blocks)
    let jsonStr = text;
    const objMatch = text.match(/\{[\s\S]*\}/);
    if (objMatch) jsonStr = objMatch[0];

    const parsed = JSON.parse(jsonStr);

    // Handle both formats: {jobInfo, units} or plain array
    if (Array.isArray(parsed)) {
      return { statusCode: 200, headers, body: JSON.stringify({ units: parsed }) };
    }
    return { statusCode: 200, headers, body: JSON.stringify({ jobInfo: parsed.jobInfo || {}, units: parsed.units || [] }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
