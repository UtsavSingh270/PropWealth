export default function PageHero({eyebrow,title,children}){
    return <section className="page-hero">
        <div className="shell">
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{children}</p>
        </div>
    </section>
}
