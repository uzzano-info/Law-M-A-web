import { motion } from 'framer-motion'
import { attorneys } from '../../data/attorneys'
import styles from './FeaturedPro.module.css'

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function FeaturedPro() {
    const lead = attorneys[0]

    const scrollTo = (e, target) => {
        e.preventDefault()
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="section-navy" id="featured" style={{ padding: 'var(--section-py) 0' }}>
            <div className="container">
                <motion.div className={styles.layout} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
                    <div className={styles.portrait}>
                        <div className={styles.avatarLarge}>
                            <span className={styles.initials}>
                                {lead.name.split(' ').map(n => n[0]).join('')}
                            </span>
                        </div>
                        <div className={styles.portraitAccent} />
                    </div>

                    <div className={styles.info}>
                        <span className="section-label">Featured Professional</span>
                        <h2 className="section-headline">
                            Decades of <em>Strategic Legal Counsel</em>
                        </h2>
                        <p className={styles.name}>{lead.name}</p>
                        <p className={styles.title}>{lead.title} · {lead.role}</p>
                        <div className="gold-divider" />
                        <p className={styles.quote}>
                            "In modern corporate law, reacting is not enough. We engineer legal strategies that anticipate market shifts and neutralize risks before they materialize."
                        </p>
                        <p className={styles.bio}>{lead.bio}</p>

                        <div className={styles.tags}>
                            {lead.specializations.map((s) => (
                                <span key={s} className={styles.tag}>{s}</span>
                            ))}
                        </div>

                        <a href="#team" className="btn-outline" onClick={(e) => scrollTo(e, '#team')} style={{ marginTop: 8 }}>
                            View Full Partner Profile →
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
