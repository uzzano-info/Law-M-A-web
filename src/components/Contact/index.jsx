import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Contact.module.css'

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const subjects = [
    { value: '', label: 'Select a subject...' },
    { value: 'ma', label: 'Mergers & Acquisitions' },
    { value: 'risk', label: 'Risk Advisory' },
    { value: 'governance', label: 'Corporate Governance' },
    { value: 'compliance', label: 'Regulatory Compliance' },
    { value: 'general', label: 'General Inquiry' },
]

export default function Contact() {
    const [form, setForm] = useState({ name: '', company: '', email: '', subject: '', message: '' })
    const [disclaimer, setDisclaimer] = useState(false)
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const set = (key, val) => {
        setForm((p) => ({ ...p, [key]: val }))
        if (errors[key]) setErrors((p) => ({ ...p, [key]: null }))
    }

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Please enter your name.'
        if (!form.email.trim()) e.email = 'Please enter your email.'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.'
        if (!form.subject) e.subject = 'Please select a subject.'
        if (!form.message.trim()) e.message = 'Please enter a message.'
        if (!disclaimer) e.disclaimer = 'Please acknowledge the disclaimer.'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return
        setLoading(true)
        await new Promise((r) => setTimeout(r, 1200))
        setLoading(false)
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <section className="section-light" id="contact" style={{ padding: 'var(--section-py) 0' }}>
                <div className="container">
                    <motion.div className={styles.success} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <span className={styles.successIcon}>✓</span>
                        <h3 className={styles.successTitle}>Inquiry Received</h3>
                        <p className={styles.successText}>
                            Thank you for contacting Lex & Sterling.{'\n'}
                            A member of our team will respond within one business day.
                        </p>
                    </motion.div>
                </div>
            </section>
        )
    }

    return (
        <section className="section-light" id="contact" style={{ padding: 'var(--section-py) 0' }}>
            <div className="container">
                <div className={styles.layout}>
                    <motion.div className={styles.left} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
                        <span className="section-label">Contact</span>
                        <h2 className="section-headline" style={{ color: 'var(--text-dark)' }}>
                            Reach Out for a{'\n'}<em>Confidential Consultation</em>
                        </h2>
                        <p className="section-subtext" style={{ color: 'var(--text-dark-secondary)' }}>
                            All inquiries are treated with the strictest confidentiality. Our team will review your matter and respond within one business day.
                        </p>
                        <div className={styles.contactInfo}>
                            <div className={styles.infoItem}>
                                <span className={styles.infoIcon}>📍</span>
                                <div>
                                    <strong>New York Office</strong>
                                    <p>One World Trade Center, 85th Floor{'\n'}New York, NY 10007</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoIcon}>📞</span>
                                <div>
                                    <strong>Direct Line</strong>
                                    <p>+1 (212) 555-0180</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoIcon}>✉</span>
                                <div>
                                    <strong>Secure Email</strong>
                                    <p>inquiries@lexsterling.com</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoIcon}>🕐</span>
                                <div>
                                    <strong>Operating Hours</strong>
                                    <p>Mon – Fri: 9:00 AM – 6:00 PM EST</p>
                                </div>
                            </div>
                        </div>

                        {/* Embedded Map Placeholder */}
                        <div className={styles.mapPlaceholder}>
                            <div className={styles.mapInner}>
                                <span className={styles.mapIcon}>🗺️</span>
                                <span className={styles.mapText}>One World Trade Center, New York</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form className={styles.form} onSubmit={handleSubmit} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
                        <div className={styles.formGrid}>
                            <div className={styles.field}>
                                <label className={styles.label}>Full Name <span className={styles.req}>*</span></label>
                                <input className={`${styles.input} ${errors.name ? styles.inputError : ''}`} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. John Smith" />
                                {errors.name && <span className={styles.error}>{errors.name}</span>}
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>Company & Title</label>
                                <input className={styles.input} value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="e.g. Acme Corp., CFO" />
                            </div>
                            <div className={styles.field} style={{ gridColumn: '1 / -1' }}>
                                <label className={styles.label}>Corporate Email <span className={styles.req}>*</span></label>
                                <input className={`${styles.input} ${errors.email ? styles.inputError : ''}`} type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="john@company.com" />
                                {errors.email && <span className={styles.error}>{errors.email}</span>}
                            </div>
                            <div className={styles.field} style={{ gridColumn: '1 / -1' }}>
                                <label className={styles.label}>Subject <span className={styles.req}>*</span></label>
                                <select className={`${styles.select} ${errors.subject ? styles.inputError : ''}`} value={form.subject} onChange={(e) => set('subject', e.target.value)}>
                                    {subjects.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                                </select>
                                {errors.subject && <span className={styles.error}>{errors.subject}</span>}
                            </div>
                            <div className={styles.field} style={{ gridColumn: '1 / -1' }}>
                                <label className={styles.label}>Message <span className={styles.req}>*</span></label>
                                <textarea className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`} rows={5} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Please describe your legal matter. All communications are confidential." />
                                {errors.message && <span className={styles.error}>{errors.message}</span>}
                            </div>
                        </div>

                        <label className={`${styles.disclaimerLabel} ${errors.disclaimer ? styles.disclaimerError : ''}`}>
                            <input type="checkbox" checked={disclaimer} onChange={(e) => { setDisclaimer(e.target.checked); if (errors.disclaimer) setErrors(p => ({ ...p, disclaimer: null })) }} />
                            <span className={styles.checkmark} />
                            <span>I understand that submitting this inquiry does not create an attorney-client relationship.</span>
                        </label>
                        {errors.disclaimer && <span className={styles.error} style={{ marginTop: -8 }}>{errors.disclaimer}</span>}

                        <button type="submit" className="btn-gold" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
                            {loading ? 'Submitting...' : '🔒 Submit Securely'}
                        </button>
                        <p className={styles.disclaimerNote}>
                            All communications are transmitted via encrypted channels and protected by attorney-client privilege upon engagement.
                        </p>
                    </motion.form>
                </div>
            </div>
        </section>
    )
}
