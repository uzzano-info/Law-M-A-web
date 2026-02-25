import { useState } from 'react'
import { motion } from 'framer-motion'
import { practiceAreas } from '../../data/practiceAreas'
import styles from './Expertise.module.css'

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Expertise() {
    const [expanded, setExpanded] = useState(null)

    return (
        <section className="section-light" id="expertise" style={{ padding: 'var(--section-py) 0' }}>
            <div className="container">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
                    <span className="section-label">Practice Areas</span>
                    <h2 className="section-headline" style={{ color: 'var(--text-dark)' }}>
                        Targeted Expertise for{' '}<em>Corporate Entities</em>
                    </h2>
                    <p className="section-subtext" style={{ color: 'var(--text-dark-secondary)' }}>
                        Comprehensive, forward-looking legal strategies tailored specifically for the boardroom.
                    </p>
                </motion.div>

                <div className={styles.grid}>
                    {practiceAreas.map((area, i) => (
                        <motion.div
                            key={area.id}
                            className={`${styles.card} ${expanded === area.id ? styles.cardExpanded : ''}`}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setExpanded(expanded === area.id ? null : area.id)}
                        >
                            <div className={styles.cardIcon}>{area.icon}</div>
                            <h3 className={styles.cardTitle}>{area.title}</h3>
                            <p className={styles.cardSub}>{area.subtitle}</p>
                            <p className={styles.cardDesc}>{area.description}</p>
                            {expanded === area.id && (
                                <>
                                    <p className={styles.cardLong}>{area.longDescription}</p>
                                    <ul className={styles.highlights}>
                                        {area.highlights.map((h) => (
                                            <li key={h}>✦ {h}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            <span className={styles.expand}>{expanded === area.id ? '− Collapse' : '+ Learn More'}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
