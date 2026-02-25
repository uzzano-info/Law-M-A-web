import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './LoginGate.module.css'

export default function LoginGate({ isOpen, onClose }) {
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [step, setStep] = useState(0) // 0 = email, 1 = MFA
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleEmail = async (e) => {
        e.preventDefault()
        if (!email.trim()) { setError('Please enter your corporate email.'); return }
        setLoading(true)
        setError(null)
        // Demo: simulate MFA code sending
        await new Promise(r => setTimeout(r, 1000))
        setStep(1)
        setLoading(false)
    }

    const handleMFA = async (e) => {
        e.preventDefault()
        if (!code.trim() || code.length < 6) { setError('Enter the 6-digit verification code.'); return }
        setLoading(true)
        setError(null)
        await new Promise(r => setTimeout(r, 1200))
        setLoading(false)
        setError('Portal access is currently in demo mode. Enterprise SSO integration required.')
    }

    const handleClose = () => {
        onClose()
        setTimeout(() => { setStep(0); setEmail(''); setCode(''); setError(null) }, 300)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose}>
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.96 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        onClick={e => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Client Portal Login"
                    >
                        <button className={styles.closeBtn} onClick={handleClose} aria-label="Close portal login">✕</button>

                        <div className={styles.lockIcon}>🔐</div>
                        <h3 className={styles.title}>Client Portal</h3>
                        <p className={styles.subtitle}>Secure Deal Room Access</p>

                        <div className="gold-divider" style={{ margin: '20px auto' }} />

                        {step === 0 ? (
                            <form onSubmit={handleEmail}>
                                <div className={styles.field}>
                                    <label className={styles.label}>Corporate Email</label>
                                    <input
                                        className={styles.input}
                                        type="email"
                                        value={email}
                                        onChange={e => { setEmail(e.target.value); setError(null) }}
                                        placeholder="name@corporation.com"
                                        autoFocus
                                    />
                                </div>
                                {error && <p className={styles.error}>{error}</p>}
                                <button type="submit" className="btn-gold" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
                                    {loading ? 'Sending Verification...' : 'Continue with Email'}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleMFA}>
                                <p className={styles.mfaInfo}>A 6-digit verification code has been sent to <strong>{email}</strong></p>
                                <div className={styles.field}>
                                    <label className={styles.label}>Verification Code</label>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={6}
                                        value={code}
                                        onChange={e => { setCode(e.target.value.replace(/\D/g, '')); setError(null) }}
                                        placeholder="000000"
                                        autoFocus
                                        style={{ textAlign: 'center', letterSpacing: '0.3em', fontSize: '1.4rem' }}
                                    />
                                </div>
                                {error && <p className={styles.error}>{error}</p>}
                                <button type="submit" className="btn-gold" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
                                    {loading ? 'Verifying...' : '🔒 Access Deal Room'}
                                </button>
                                <button type="button" className={styles.backLink} onClick={() => { setStep(0); setError(null) }}>
                                    ← Use different email
                                </button>
                            </form>
                        )}

                        <div className={styles.ssoSection}>
                            <div className={styles.dividerRow}>
                                <span className={styles.dividerLine} />
                                <span className={styles.dividerText}>or</span>
                                <span className={styles.dividerLine} />
                            </div>
                            <button className={styles.ssoBtn} onClick={() => setError('Enterprise SSO is configured per-client. Contact your account partner.')}>
                                Enterprise SSO Login
                            </button>
                        </div>

                        <p className={styles.secNote}>
                            🔒 Protected by TLS 1.3 · Session expires after 15 minutes of inactivity
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
