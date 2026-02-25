import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useIntakeForm from './useIntakeForm'
import styles from './SecureIntake.module.css'

const STEPS = ['Identity Verification', 'Matter Details', 'Confidential Brief']

const inquiryTypes = [
    { value: '', label: 'Select Inquiry Type...' },
    { value: 'ma', label: 'Mergers & Acquisitions' },
    { value: 'risk', label: 'Risk Advisory' },
    { value: 'governance', label: 'Corporate Governance' },
    { value: 'compliance', label: 'Regulatory Compliance' },
    { value: 'restructuring', label: 'Corporate Restructuring' },
    { value: 'general', label: 'General Inquiry' },
]

const jurisdictions = [
    { value: '', label: 'Select Jurisdiction...' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'eu', label: 'European Union' },
    { value: 'apac', label: 'Asia-Pacific' },
    { value: 'cross-border', label: 'Cross-Border / Multi-Jurisdiction' },
]

const timelines = [
    { value: '', label: 'Select Timeline...' },
    { value: 'immediate', label: 'Immediate (< 30 days)' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'half', label: 'Within 6 Months' },
    { value: 'year', label: '12+ Months' },
    { value: 'exploratory', label: 'Exploratory / No Timeline' },
]

const dealRanges = [
    { value: '', label: 'Estimated Deal Value...' },
    { value: 'under-10m', label: 'Under $10M' },
    { value: '10m-50m', label: '$10M – $50M' },
    { value: '50m-250m', label: '$50M – $250M' },
    { value: '250m-1b', label: '$250M – $1B' },
    { value: 'over-1b', label: 'Over $1B' },
    { value: 'undisclosed', label: 'Prefer Not to Disclose' },
]

const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 120 : -120, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 120 : -120, opacity: 0 }),
}

export default function SecureIntake() {
    const { form, step, errors, loading, submitted, refId, set, next, back, submit, reset } = useIntakeForm()

    if (submitted) {
        return (
            <section className="section-dark" style={{ padding: 'var(--section-py) 0' }} id="intake">
                <div className="container">
                    <motion.div className={styles.successCard} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <span className={styles.successIcon}>✓</span>
                        <h3 className={styles.successTitle}>Secure Inquiry Submitted</h3>
                        <p className={styles.successRef}>Reference: <strong>{refId}</strong></p>
                        <p className={styles.successDesc}>
                            Your encrypted inquiry has been received and routed to the appropriate practice group.
                            A partner will contact you within one business day via secure communication.
                        </p>
                        <div className={styles.securityBadge}>
                            <span>🔒</span> AES-256-GCM Encrypted · Conflict Check Initiated
                        </div>
                        <button className="btn-outline" onClick={reset} style={{ marginTop: 24 }}>Submit Another Inquiry</button>
                    </motion.div>
                </div>
            </section>
        )
    }

    return (
        <section className="section-dark" style={{ padding: 'var(--section-py) 0' }} id="intake">
            <div className="container">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
                    <span className="section-label">Secure Inquiry</span>
                    <h2 className="section-headline">
                        Encrypted Client{' '}<em>Intake Portal</em>
                    </h2>
                    <p className="section-subtext">
                        Submit confidential M&A and risk inquiries through our AES-256 encrypted intake system. All transmissions are protected end-to-end.
                    </p>
                </motion.div>

                <div className={styles.formWrapper}>
                    {/* Progress Bar */}
                    <div className={styles.progress}>
                        {STEPS.map((label, i) => (
                            <div key={label} className={`${styles.progressStep} ${i <= step ? styles.active : ''} ${i < step ? styles.completed : ''}`}>
                                <div className={styles.stepCircle}>
                                    {i < step ? '✓' : i + 1}
                                </div>
                                <span className={styles.stepLabel}>{label}</span>
                            </div>
                        ))}
                        <div className={styles.progressTrack}>
                            <div className={styles.progressFill} style={{ width: `${(step / 2) * 100}%` }} />
                        </div>
                    </div>

                    {/* Step Content */}
                    <div className={styles.card}>
                        <div className={styles.secTag}>
                            <span>🔒</span> 256-bit Encrypted Form · TLS 1.3
                        </div>

                        <AnimatePresence mode="wait" custom={step}>
                            <motion.div
                                key={step}
                                custom={step}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {step === 0 && <StepIdentity form={form} errors={errors} set={set} />}
                                {step === 1 && <StepMatter form={form} errors={errors} set={set} />}
                                {step === 2 && <StepBrief form={form} errors={errors} set={set} />}
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className={styles.nav}>
                            {step > 0 && (
                                <button className="btn-outline" onClick={back} type="button">
                                    ← Previous
                                </button>
                            )}
                            <div style={{ flex: 1 }} />
                            {step < 2 ? (
                                <button className="btn-gold" onClick={next} type="button">
                                    Continue →
                                </button>
                            ) : (
                                <button className="btn-gold" onClick={submit} disabled={loading} type="button">
                                    {loading ? 'Encrypting & Submitting...' : '🔒 Submit Secure Inquiry'}
                                </button>
                            )}
                        </div>
                        {errors.submit && <p className={styles.error} style={{ textAlign: 'center', marginTop: 12 }}>{errors.submit}</p>}
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ── Step Components ── */

function StepIdentity({ form, errors, set }) {
    return (
        <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Step 1 — Identity Verification</h3>
            <p className={styles.stepDesc}>Provide your professional identity. All information is encrypted before transmission.</p>
            <div className={styles.grid2}>
                <Field label="Full Legal Name" required value={form.fullName} onChange={v => set('fullName', v)} error={errors.fullName} placeholder="Full Legal Name" />
                <Field label="Enterprise / Company" required value={form.enterprise} onChange={v => set('enterprise', v)} error={errors.enterprise} placeholder="Enterprise Name" />
            </div>
            <Field label="Corporate Email Address" required type="email" value={form.email} onChange={v => set('email', v)} error={errors.email} placeholder="name@corporation.com" />
            <Field label="Direct Phone (Optional)" type="tel" value={form.phone} onChange={v => set('phone', v)} error={errors.phone} placeholder="+1 (212) 555-0100" />
        </div>
    )
}

function StepMatter({ form, errors, set }) {
    return (
        <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Step 2 — Matter Details</h3>
            <p className={styles.stepDesc}>Help us route your inquiry to the appropriate practice group and partner.</p>
            <div className={styles.grid2}>
                <SelectField label="Inquiry Type" required options={inquiryTypes} value={form.inquiryType} onChange={v => set('inquiryType', v)} error={errors.inquiryType} />
                <SelectField label="Jurisdiction" required options={jurisdictions} value={form.jurisdiction} onChange={v => set('jurisdiction', v)} error={errors.jurisdiction} />
            </div>
            <div className={styles.grid2}>
                <SelectField label="Estimated Timeline" options={timelines} value={form.timeline} onChange={v => set('timeline', v)} />
                <SelectField label="Estimated Deal Value" options={dealRanges} value={form.dealRange} onChange={v => set('dealRange', v)} />
            </div>
        </div>
    )
}

function StepBrief({ form, errors, set }) {
    const charCount = form.message.trim().length
    const [file, setFile] = useState(null)
    const [fileError, setFileError] = useState(null)
    const [dragOver, setDragOver] = useState(false)

    const ACCEPTED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    const MAX_SIZE = 10 * 1024 * 1024 // 10MB

    const handleFile = (f) => {
        setFileError(null)
        if (!ACCEPTED_TYPES.includes(f.type)) { setFileError('Only .pdf and .docx files are accepted.'); return }
        if (f.size > MAX_SIZE) { setFileError('File size must be under 10MB.'); return }
        setFile(f)
    }

    const onDrop = (e) => {
        e.preventDefault(); setDragOver(false)
        if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0])
    }

    return (
        <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Step 3 — Confidential Brief</h3>
            <p className={styles.stepDesc}>Describe your matter. This content is encrypted with AES-256-GCM before leaving your browser.</p>
            <div className={styles.field}>
                <label className={styles.label}>Confidential Message <span className={styles.req}>*</span></label>
                <textarea
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                    rows={6}
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    placeholder="Describe your corporate legal matter in detail. All content is encrypted end-to-end..."
                />
                <div className={styles.charCount}>
                    <span className={charCount >= 50 ? styles.charOk : ''}>{charCount}</span> / 50 min
                </div>
                {errors.message && <span className={styles.error}>{errors.message}</span>}
            </div>

            {/* Document Upload */}
            <div className={styles.field}>
                <label className={styles.label}>Supporting Document (Optional)</label>
                <div
                    className={`${styles.dropZone} ${dragOver ? styles.dropZoneActive : ''} ${file ? styles.dropZoneHasFile : ''}`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                    onClick={() => document.getElementById('intake-file-input').click()}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload document"
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') document.getElementById('intake-file-input').click() }}
                >
                    <input
                        id="intake-file-input"
                        type="file"
                        accept=".pdf,.docx"
                        style={{ display: 'none' }}
                        onChange={(e) => { if (e.target.files[0]) handleFile(e.target.files[0]) }}
                    />
                    {file ? (
                        <div className={styles.filePreview}>
                            <span>📄</span>
                            <div>
                                <span className={styles.fileName}>{file.name}</span>
                                <span className={styles.fileSize}>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                            <button
                                type="button"
                                className={styles.fileRemove}
                                onClick={(e) => { e.stopPropagation(); setFile(null) }}
                                aria-label="Remove file"
                            >✕</button>
                        </div>
                    ) : (
                        <div className={styles.dropZoneContent}>
                            <span style={{ fontSize: '1.5rem' }}>📎</span>
                            <span>Drag & drop or click to upload</span>
                            <span className={styles.dropZoneHint}>.pdf or .docx · Max 10MB</span>
                        </div>
                    )}
                </div>
                {fileError && <span className={styles.error}>{fileError}</span>}
            </div>

            <label className={`${styles.disclaimerLabel} ${errors.disclaimer ? styles.disclaimerError : ''}`}>
                <input type="checkbox" checked={form.disclaimer} onChange={e => set('disclaimer', e.target.checked)} />
                <span className={styles.checkmark} />
                <span>I understand that submitting this inquiry does not establish an attorney-client relationship. I will not submit highly sensitive or classified corporate data through this initial intake.</span>
            </label>
            {errors.disclaimer && <span className={styles.error}>{errors.disclaimer}</span>}
        </div>
    )
}

/* ── Shared Form Fields ── */

function Field({ label, required, type = 'text', value, onChange, error, placeholder }) {
    return (
        <div className={styles.field}>
            <label className={styles.label}>{label} {required && <span className={styles.req}>*</span>}</label>
            <input
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
            />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    )
}

function SelectField({ label, required, options, value, onChange, error }) {
    return (
        <div className={styles.field}>
            <label className={styles.label}>{label} {required && <span className={styles.req}>*</span>}</label>
            <select className={`${styles.select} ${error ? styles.inputError : ''}`} value={value} onChange={e => onChange(e.target.value)}>
                {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            {error && <span className={styles.error}>{error}</span>}
        </div>
    )
}
