import { motion } from 'framer-motion'
import styles from './Hero.module.css'

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }),
}

const stats = [
    { value: '$12B+', label: 'Aggregate Deal Value' },
    { value: '350+', label: 'Transactions Closed' },
    { value: '25+', label: 'Years of Practice' },
    { value: '15', label: 'Jurisdictions' },
]

export default function Hero() {
    const scrollTo = (e, target) => {
        e.preventDefault()
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className={styles.hero} id="hero">
            <div className={styles.bgOverlay} />
            <div className={`container ${styles.content}`}>
                <motion.span
                    className="section-label"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0}
                >
                    Corporate Legal Excellence Since 2001
                </motion.span>

                <motion.h1
                    className={styles.headline}
                    variants={fadeUp} initial="hidden" animate="visible" custom={1}
                >
                    Strategic Legal Counsel for{'\n'}
                    <em>Complex Corporate Transactions</em>
                </motion.h1>

                <motion.p
                    className={styles.sub}
                    variants={fadeUp} initial="hidden" animate="visible" custom={2}
                >
                    Specializing in M&A, Corporate Governance, and{'\n'}
                    Preemptive Risk Management for industry leaders.
                </motion.p>

                <motion.div
                    className={styles.ctas}
                    variants={fadeUp} initial="hidden" animate="visible" custom={3}
                >
                    <a href="#contact" className="btn-gold" onClick={(e) => scrollTo(e, '#contact')}>
                        Schedule a Confidential Briefing
                    </a>
                    <a href="#expertise" className="btn-outline" onClick={(e) => scrollTo(e, '#expertise')}>
                        Explore Our Expertise →
                    </a>
                </motion.div>
            </div>

            {/* Trust Bar */}
            <motion.div
                className={styles.trustBar}
                variants={fadeUp} initial="hidden" animate="visible" custom={5}
            >
                <div className={`container ${styles.trustInner}`}>
                    <span className={styles.trustLabel}>Trusted by Industry Leaders</span>
                    <div className={styles.trustStats}>
                        {stats.map((s) => (
                            <div key={s.label} className={styles.stat}>
                                <span className={styles.statValue}>{s.value}</span>
                                <span className={styles.statLabel}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            <div className={styles.scrollHint}>
                <span className={styles.scrollLine} />
            </div>
        </section>
    )
}
