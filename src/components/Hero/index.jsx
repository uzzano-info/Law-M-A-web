import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './Hero.module.css'

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }),
}

function AmbientCanvas() {
    const canvasRef = useRef(null)
    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced || window.innerWidth < 1024) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let raf
        const particles = Array.from({ length: 40 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 0.5,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.2,
            alpha: Math.random() * 0.4 + 0.1,
        }))
        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
        resize()
        window.addEventListener('resize', resize)
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            for (const p of particles) {
                p.x += p.vx; p.y += p.vy
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(201, 168, 76, ${p.alpha})`
                ctx.fill()
            }
            raf = requestAnimationFrame(draw)
        }
        draw()
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
    }, [])
    return <canvas ref={canvasRef} className={styles.bgCanvas} aria-hidden="true" />
}

export default function Hero() {
    const scrollTo = (e, target) => {
        e.preventDefault()
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className={styles.hero} id="hero">
            <div className={styles.bgOverlay} />
            <AmbientCanvas />
            <div className={`container ${styles.content}`}>
                <motion.span
                    className="section-label"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0}
                >
                    Premium M&A and Corporate Risk Advisory
                </motion.span>

                <motion.h1
                    className={styles.headline}
                    variants={fadeUp} initial="hidden" animate="visible" custom={1}
                >
                    Mastering Complexity.{'\n'}
                    <em>Securing Corporate Futures.</em>
                </motion.h1>

                <motion.p
                    className={styles.sub}
                    variants={fadeUp} initial="hidden" animate="visible" custom={2}
                >
                    Unparalleled legal precision for high-stakes Mergers & Acquisitions{'\n'}
                    and preemptive corporate risk management.{'\n'}
                    We navigate the legal intricacies so you can focus on market leadership.
                </motion.p>

                <motion.div
                    className={styles.ctas}
                    variants={fadeUp} initial="hidden" animate="visible" custom={3}
                >
                    <a href="#intake" className="btn-gold" onClick={(e) => scrollTo(e, '#intake')}>
                        Schedule a Confidential Briefing
                    </a>
                    <a href="#expertise" className="btn-outline" onClick={(e) => scrollTo(e, '#expertise')}>
                        Explore Our Expertise →
                    </a>
                </motion.div>
            </div>

            {/* Trust Indicators */}
            <motion.div
                className={styles.trustBar}
                variants={fadeUp} initial="hidden" animate="visible" custom={5}
            >
                <div className={`container ${styles.trustInner}`}>
                    <div className={styles.trustCopy}>
                        <span className={styles.trustHeading}>Advised on over $5B+ in Corporate Transactions</span>
                        <span className={styles.trustSub}>Trusted counsel for industry-leading enterprises, board members, and disruptive founders.</span>
                    </div>
                    <div className={styles.trustStats}>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>$5B+</span>
                            <span className={styles.statLabel}>Transactions Advised</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>350+</span>
                            <span className={styles.statLabel}>Matters Closed</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>25+</span>
                            <span className={styles.statLabel}>Years of Practice</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>15</span>
                            <span className={styles.statLabel}>Jurisdictions</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className={styles.scrollHint}>
                <span className={styles.scrollLine} />
            </div>
        </section>
    )
}
