import { useState, useEffect } from 'react'
import styles from './Header.module.css'

const links = [
    { href: '#expertise', label: 'Expertise' },
    { href: '#team', label: 'Professionals' },
    { href: '#insights', label: 'Insights' },
    { href: '#contact', label: 'About' },
]

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleNavClick = (e, href) => {
        e.preventDefault()
        setMobileOpen(false)
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.inner}`}>
                <a
                    href="#"
                    className={styles.logo}
                    onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    aria-label="Back to top"
                >
                    <span className={styles.logoIcon}>⚖</span>
                    <span className={styles.logoText}>Lex & Sterling</span>
                </a>

                <nav className={styles.nav} aria-label="Main navigation">
                    {links.map((l) => (
                        <a key={l.href} href={l.href} onClick={(e) => handleNavClick(e, l.href)}>
                            {l.label}
                        </a>
                    ))}
                    <a href="#contact" className="btn-gold" onClick={(e) => handleNavClick(e, '#contact')} style={{ padding: '10px 24px', fontSize: '0.8rem' }}>
                        Request Confidential Briefing
                    </a>
                </nav>

                <button
                    className={styles.hamburger}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileOpen}
                >
                    <span className={`${styles.bar} ${mobileOpen ? styles.barOpen : ''}`} />
                    <span className={`${styles.bar} ${mobileOpen ? styles.barOpen : ''}`} />
                    <span className={`${styles.bar} ${mobileOpen ? styles.barOpen : ''}`} />
                </button>
            </div>

            <div className={`${styles.mobileOverlay} ${mobileOpen ? styles.open : ''}`}>
                <nav className={styles.mobileNav} aria-label="Mobile navigation">
                    {links.map((l) => (
                        <a key={l.href} href={l.href} onClick={(e) => handleNavClick(e, l.href)}>
                            {l.label}
                        </a>
                    ))}
                    <a href="#contact" className="btn-gold" onClick={(e) => handleNavClick(e, '#contact')} style={{ marginTop: 16 }}>
                        Request Confidential Briefing
                    </a>
                </nav>
            </div>
        </header>
    )
}
