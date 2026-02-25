import { motion } from 'framer-motion'
import { attorneys } from '../../data/attorneys'
import styles from './Team.module.css'

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Team() {
    return (
        <section className="section-dark" id="team" style={{ padding: 'var(--section-py) 0' }}>
            <div className="container">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
                    <span className="section-label">Our Professionals</span>
                    <h2 className="section-headline">
                        Leaders in <em>Corporate Law</em>
                    </h2>
                    <p className="section-subtext">
                        Our partners bring decades of combined experience in M&A, governance, and risk management to every engagement.
                    </p>
                </motion.div>

                <div className={styles.grid}>
                    {attorneys.map((atty, i) => (
                        <motion.div
                            key={atty.id}
                            className={styles.card}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ delay: i * 0.12 }}
                        >
                            <div className={styles.avatarWrap}>
                                <div className={styles.avatar}>
                                    <span className={styles.avatarInitials}>
                                        {atty.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.info}>
                                <h3 className={styles.name}>{atty.name}</h3>
                                <p className={styles.title}>{atty.title}</p>
                                <p className={styles.role}>{atty.role}</p>
                                <div className={styles.divider} />
                                <p className={styles.bio}>{atty.bio}</p>

                                <div className={styles.details}>
                                    <div className={styles.detailBlock}>
                                        <span className={styles.detailLabel}>Education</span>
                                        {atty.education.map((e) => <span key={e} className={styles.detailItem}>{e}</span>)}
                                    </div>
                                    <div className={styles.detailBlock}>
                                        <span className={styles.detailLabel}>Bar Admissions</span>
                                        <span className={styles.detailItem}>{atty.barAdmissions.join(' · ')}</span>
                                    </div>
                                    <div className={styles.detailBlock}>
                                        <span className={styles.detailLabel}>Focus Areas</span>
                                        <div className={styles.tags}>
                                            {atty.specializations.map((s) => <span key={s} className={styles.tag}>{s}</span>)}
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.actions}>
                                    <a href={`mailto:${atty.email}`} className={styles.actionLink}>✉ Email</a>
                                    <a href={atty.linkedin} className={styles.actionLink}>in LinkedIn</a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
