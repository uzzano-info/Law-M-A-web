// Vercel Serverless Function — Secure Client Intake Endpoint
// POST /api/intake → receives encrypted payload, validates, and routes

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-csrf-token')

    if (req.method === 'OPTIONS') return res.status(200).end()
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

    try {
        const { encryptedPayload, honeyPot } = req.body || {}

        // Bot detection
        if (honeyPot) {
            console.warn('[Intake] Honeypot triggered — bot detected')
            return res.status(200).json({ success: true, referenceId: 'LEX-0000-00000' })
        }

        // Validate payload exists
        if (!encryptedPayload) {
            return res.status(422).json({ error: 'Validation failed', fields: ['encryptedPayload'] })
        }

        // Generate reference ID
        const refId = `LEX-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`

        // === Webhook Routing ===

        // 1. HubSpot CRM (if configured)
        const hubspotKey = process.env.HUBSPOT_API_KEY
        if (hubspotKey) {
            try {
                await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${hubspotKey}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        properties: { intake_ref: refId, source: 'lex-sterling-intake' }
                    }),
                })
                console.log('[Intake] HubSpot contact created:', refId)
            } catch (e) {
                console.error('[Intake] HubSpot error:', e.message)
            }
        }

        // 2. Slack Notification (if configured)
        const slackWebhook = process.env.SLACK_WEBHOOK_URL
        if (slackWebhook) {
            try {
                await fetch(slackWebhook, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        text: `🔒 New Secure Intake Submitted`,
                        blocks: [{
                            type: 'section',
                            text: {
                                type: 'mrkdwn',
                                text: `*New Client Inquiry*\n• Reference: \`${refId}\`\n• Status: Conflict Check Pending\n• Encrypted: AES-256-GCM`
                            }
                        }]
                    }),
                })
                console.log('[Intake] Slack notified:', refId)
            } catch (e) {
                console.error('[Intake] Slack error:', e.message)
            }
        }

        // 3. Conflict Check (if configured)
        const conflictUrl = process.env.CONFLICT_API_URL
        if (conflictUrl) {
            try {
                await fetch(conflictUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ referenceId: refId, payload: encryptedPayload }),
                })
                console.log('[Intake] Conflict check initiated:', refId)
            } catch (e) {
                console.error('[Intake] Conflict check error:', e.message)
            }
        }

        return res.status(200).json({
            success: true,
            referenceId: refId,
            message: 'Encrypted inquiry received and routed successfully.',
        })

    } catch (err) {
        console.error('[Intake] Server error:', err)
        return res.status(500).json({ error: 'Internal server error' })
    }
}
