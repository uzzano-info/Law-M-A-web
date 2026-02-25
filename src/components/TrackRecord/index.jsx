import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './TrackRecord.module.css'

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const deals = [
    { deal: 'Nextera Acquisition of Omega Systems', value: '$1.2B', type: 'Cross-Border M&A', year: '2025', jurisdiction: 'US / UK', status: 'Completed' },
    { deal: 'Pinnacle Holdings Restructuring', value: '$340M', type: 'Corporate Restructuring', year: '2025', jurisdiction: 'United States', status: 'Completed' },
    { deal: 'Atlas Genomics Series D & Strategic Partner', value: '$180M', type: 'Strategic Investment', year: '2024', jurisdiction: 'US / EU', status: 'Completed' },
    { deal: 'Meridian Capital / Crestview Merger', value: '$890M', type: 'Domestic Merger', year: '2024', jurisdiction: 'United States', status: 'Completed' },
    { deal: 'Pacific Rim Logistics Divestiture', value: '$520M', type: 'Spin-Off / Divestiture', year: '2024', jurisdiction: 'APAC', status: 'Completed' },
    { deal: 'Vanguard Defense Systems Compliance Review', value: '$75M', type: 'Regulatory & Compliance', year: '2023', jurisdiction: 'United States', status: 'Ongoing' },
]

const columns = ['Deal', 'Value', 'Type', 'Year', 'Jurisdiction', 'Status']

export default function TrackRecord() {
    const [isMobile, setIsMobile] = useState(false)
    const [expanded, setExpanded] = useState(null)
    const [sortBy, setSortBy] = useState('year')
    const [sortDir, setSortDir] = useState(-1)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const sorted = [...deals].sort((a, b) => {
        const key = sortBy
        const av = key === 'value' ? parseFloat(a.value.replace(/[$,BMK]/g, '')) : a[key]
        const bv = key === 'value' ? parseFloat(b.value.replace(/[$,BMK]/g, '')) : b[key]
        if (av < bv) return -1 * sortDir
        if (av > bv) return 1 * sortDir
        return 0
    })

    const toggleSort = (col) => {
        const key = col.toLowerCase()
        if (sortBy === key) setSortDir(d => d * -1)
        else { setSortBy(key); setSortDir(-1) }
    }

    return (
        <section className="section-navy" style={{ padding: 'var(--section-py) 0' }} id="track-record">
            <div className="container">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
                    <span className="section-label">Track Record</span>
                    <h2 className="section-headline">
                        Representative{' '}<em>Transactions</em>
                    </h2>
                    <p className="section-subtext">
                        Selected engagements demonstrating our capabilities across sectors, deal sizes, and jurisdictions.
                    </p>
                </motion.div>

                {isMobile ? (
                    /* ── Mobile: Accordion Cards ── */
                    <div className={styles.accordion}>
                        {sorted.map((d, i) => (
                            <motion.div
                                key={i}
                                className={`${styles.accordionItem} ${expanded === i ? styles.open : ''}`}
                                onClick={() => setExpanded(expanded === i ? null : i)}
                                variants={fadeUp} initial="hidden" whileInView="visible"
                                viewport={{ once: true, margin: '-40px' }}
                            >
                                <div className={styles.accordionHeader}>
                                    <div>
                                        <span className={styles.dealName}>{d.deal}</span>
                                        <span className={styles.dealValue}>{d.value}</span>
                                    </div>
                                    <span className={styles.chevron}>{expanded === i ? '−' : '+'}</span>
                                </div>
                                {expanded === i && (
                                    <div className={styles.accordionBody}>
                                        <div className={styles.row}><span>Type</span><span>{d.type}</span></div>
                                        <div className={styles.row}><span>Year</span><span>{d.year}</span></div>
                                        <div className={styles.row}><span>Jurisdiction</span><span>{d.jurisdiction}</span></div>
                                        <div className={styles.row}><span>Status</span><span className={`${styles.status} ${d.status === 'Completed' ? styles.completed : styles.ongoing}`}>{d.status}</span></div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    /* ── Desktop: Sortable Table ── */
                    <div className={styles.tableWrap}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    {columns.map(col => (
                                        <th key={col} onClick={() => toggleSort(col)} className={styles.th}>
                                            {col}
                                            {sortBy === col.toLowerCase() && (
                                                <span className={styles.sortArrow}>{sortDir === 1 ? ' ↑' : ' ↓'}</span>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sorted.map((d, i) => (
                                    <tr key={i} className={styles.tr}>
                                        <td className={styles.tdPrimary}>{d.deal}</td>
                                        <td className={styles.tdValue}>{d.value}</td>
                                        <td>{d.type}</td>
                                        <td>{d.year}</td>
                                        <td>{d.jurisdiction}</td>
                                        <td>
                                            <span className={`${styles.status} ${d.status === 'Completed' ? styles.completed : styles.ongoing}`}>
                                                {d.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    )
}
