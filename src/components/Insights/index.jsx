import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { insights } from '../../data/insights'
import styles from './Insights.module.css'

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const categories = ['All', ...new Set(insights.map(a => a.category))]

export default function Insights() {
    const [filter, setFilter] = useState('All')
    const [expanded, setExpanded] = useState(null)

    const filtered = filter === 'All' ? insights : insights.filter(a => a.category === filter)

    return (
        <section className="section-navy" id="insights" style={{ padding: 'var(--section-py) 0' }}>
            <div className="container">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
                    <span className="section-label">Insights & Analysis</span>
                    <h2 className="section-headline">
                        Legal <em>Thought Leadership</em>
                    </h2>
                    <p className="section-subtext">
                        Perspectives from our partners on the legal and regulatory issues shaping the corporate landscape.
                    </p>
                </motion.div>

                <div className={styles.filters}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`${styles.filterBtn} ${filter === cat ? styles.filterActive : ''}`}
                            onClick={() => { setFilter(cat); setExpanded(null) }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className={styles.grid}>
                    <AnimatePresence mode="popLayout">
                        {filtered.map((article, i) => (
                            <motion.article
                                key={article.id}
                                className={styles.card}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: i * 0.08 } }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <span className={styles.category}>{article.category}</span>
                                <h3 className={styles.title}>{article.title}</h3>
                                <div className={styles.meta}>
                                    <span>{article.author}</span>
                                    <span>·</span>
                                    <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                                <p className={styles.excerpt}>{article.excerpt}</p>
                                {expanded === article.id && (
                                    <motion.div
                                        className={styles.body}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {article.body.split('\n\n').map((p, idx) => <p key={idx}>{p}</p>)}
                                    </motion.div>
                                )}
                                <button
                                    className={styles.readMore}
                                    onClick={() => setExpanded(expanded === article.id ? null : article.id)}
                                >
                                    {expanded === article.id ? '← Back to Summary' : 'Read Full Article →'}
                                </button>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
