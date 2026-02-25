import { useState, useEffect } from 'react'
import styles from './MobileCTA.module.css'

export default function MobileCTA() {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const footer = document.querySelector('footer')
        if (!footer) return

        const observer = new IntersectionObserver(
            ([entry]) => setVisible(!entry.isIntersecting),
            { threshold: 0.1 }
        )
        observer.observe(footer)
        return () => observer.disconnect()
    }, [])

    const scrollToIntake = (e) => {
        e.preventDefault()
        document.querySelector('#intake')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className={`${styles.bar} ${visible ? styles.visible : ''}`} role="complementary" aria-label="Quick actions">
            <a href="#intake" className="btn-gold" onClick={scrollToIntake} style={{ flex: 1, justifyContent: 'center', padding: '14px 20px' }}>
                Request Briefing
            </a>
            <a href="tel:+12125550180" className={styles.phone} aria-label="Call Lex & Sterling">
                📞
            </a>
        </div>
    )
}
