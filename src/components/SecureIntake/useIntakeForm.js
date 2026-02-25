import { useReducer, useState, useCallback } from 'react'

const initialForm = {
    // Step 1 — Identity
    fullName: '',
    enterprise: '',
    email: '',
    phone: '',
    // Step 2 — Matter
    inquiryType: '',
    jurisdiction: '',
    timeline: '',
    dealRange: '',
    // Step 3 — Brief
    message: '',
    disclaimer: false,
}

function reducer(state, action) {
    if (action.type === 'SET_FIELD') return { ...state, [action.field]: action.value }
    if (action.type === 'RESET') return initialForm
    return state
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[+]?[\d\s()-]{7,}$/

function validateStep(step, form) {
    const errors = {}
    if (step === 0) {
        if (!form.fullName.trim()) errors.fullName = 'Full legal name is required.'
        if (!form.enterprise.trim()) errors.enterprise = 'Enterprise name is required.'
        if (!form.email.trim()) errors.email = 'Corporate email is required.'
        else if (!emailRegex.test(form.email)) errors.email = 'Enter a valid corporate email.'
        if (form.phone && !phoneRegex.test(form.phone)) errors.phone = 'Enter a valid phone number.'
    }
    if (step === 1) {
        if (!form.inquiryType) errors.inquiryType = 'Select an inquiry type.'
        if (!form.jurisdiction) errors.jurisdiction = 'Select a jurisdiction.'
    }
    if (step === 2) {
        if (!form.message.trim()) errors.message = 'Please provide a confidential brief.'
        else if (form.message.trim().length < 50) errors.message = 'Minimum 50 characters required for the brief.'
        if (!form.disclaimer) errors.disclaimer = 'You must acknowledge the disclaimer.'
    }
    return errors
}

// Client-side AES-256-GCM encryption stub
async function encryptPayload(data) {
    try {
        const key = await window.crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt'])
        const iv = window.crypto.getRandomValues(new Uint8Array(12))
        const encoded = new TextEncoder().encode(JSON.stringify(data))
        const ciphertext = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded)
        const exportedKey = await window.crypto.subtle.exportKey('raw', key)
        return {
            ciphertext: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
            iv: btoa(String.fromCharCode(...iv)),
            key: btoa(String.fromCharCode(...new Uint8Array(exportedKey))),
        }
    } catch {
        // Fallback for environments without crypto.subtle
        return { plaintext: JSON.stringify(data), encrypted: false }
    }
}

export default function useIntakeForm() {
    const [form, dispatch] = useReducer(reducer, initialForm)
    const [step, setStep] = useState(0)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [refId, setRefId] = useState(null)

    const set = useCallback((field, value) => {
        dispatch({ type: 'SET_FIELD', field, value })
        setErrors(prev => ({ ...prev, [field]: null }))
    }, [])

    const next = useCallback(() => {
        const errs = validateStep(step, form)
        if (Object.keys(errs).length) { setErrors(errs); return }
        setErrors({})
        setStep(s => Math.min(s + 1, 2))
    }, [step, form])

    const back = useCallback(() => {
        setErrors({})
        setStep(s => Math.max(s - 1, 0))
    }, [])

    const submit = useCallback(async () => {
        const errs = validateStep(2, form)
        if (Object.keys(errs).length) { setErrors(errs); return }
        setLoading(true)
        try {
            const encrypted = await encryptPayload(form)
            // Demo mode: simulate API call
            await new Promise(r => setTimeout(r, 1800))
            const id = `LEX-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`
            setRefId(id)
            setSubmitted(true)
            console.log('[SecureIntake] Encrypted payload:', encrypted)
            console.log('[SecureIntake] Reference ID:', id)
        } catch (err) {
            setErrors({ submit: 'Submission failed. Please try again.' })
        } finally {
            setLoading(false)
        }
    }, [form])

    const reset = useCallback(() => {
        dispatch({ type: 'RESET' })
        setStep(0)
        setErrors({})
        setSubmitted(false)
        setRefId(null)
    }, [])

    return { form, step, errors, loading, submitted, refId, set, next, back, submit, reset }
}
