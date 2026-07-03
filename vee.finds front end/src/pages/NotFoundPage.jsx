import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="notice-card">
      <h1 className="page-title">Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="button button-primary">
        Back to home
      </Link>
    </section>
  )
}
