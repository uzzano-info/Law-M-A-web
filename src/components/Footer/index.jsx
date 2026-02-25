import styles from './Footer.module.css'

const navLinks = [
    { href: '#expertise', label: 'Expertise' },
    { href: '#team', label: 'Our Team' },
    { href: '#insights', label: 'Insights' },
    { href: '#contact', label: 'Contact' },
]

const legalLinks = [
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms of Service' },
    { href: '#', label: 'Client Portal' },
]

export default function Footer() {
    const scrollTo = (e, href) => {
        e.preventDefault()
        if (href === '#') return
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.brand}>
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>⚖</span>
                        <span className={styles.logoText}>Lex & Sterling</span>
                    </div>
                    <p className={styles.brandDesc}>
                        Securing Corporate Futures. A premier law firm specializing in M&A, corporate governance, and enterprise risk management.
                    </p>
                </div>

                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Navigation</h4>
                    {navLinks.map((l) => (
                        <a key={l.label} href={l.href} className={styles.link} onClick={(e) => scrollTo(e, l.href)}>{l.label}</a>
                    ))}
                </div>

                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Legal</h4>
                    {legalLinks.map((l) => (
                        <a key={l.label} href={l.href} className={styles.link}>{l.label}</a>
                    ))}
                </div>

                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Contact</h4>
                    <p className={styles.colText}>One World Trade Center, 85th Floor{'\n'}New York, NY 10007</p>
                    <p className={styles.colText}>+1 (212) 555-0180</p>
                    <a href="https://linkedin.com" className={styles.link} target="_blank" rel="noopener noreferrer">LinkedIn →</a>
                </div>
            </div>

            <div className={styles.bottom}>
                <div className="container">
                    <p className={styles.copy}>© {new Date().getFullYear()} Lex & Sterling LLP. All rights reserved. Attorney Advertising. Legal Disclaimer: This website does not constitute legal advice.</p>
                </div>
            </div>
        </footer>
    )
}
