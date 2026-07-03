import './Footer.css'

const SOCIAL_LINKS = [
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@vee.finds.bags',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M16.6 5.82c-1-.98-1.53-2.27-1.54-3.62h-3.09v13.87c0 1.6-1.3 2.9-2.9 2.9a2.9 2.9 0 0 1-2.9-2.9c0-1.6 1.3-2.9 2.9-2.9.32 0 .62.05.9.14v-3.13a6.02 6.02 0 0 0-.9-.07 6.02 6.02 0 0 0-6.02 6.02 6.02 6.02 0 0 0 6.02 6.02 6.02 6.02 0 0 0 6.02-6.02V9.4a9.1 9.1 0 0 0 5.31 1.7V8.02a5.98 5.98 0 0 1-3.8-2.2z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/veefinds.ug',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/256778252748',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.81.48 3.51 1.32 4.98L2 22l5.25-1.38a9.85 9.85 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.02h-.01a8.1 8.1 0 0 1-4.14-1.13l-.3-.18-3.11.82.83-3.03-.2-.31a8.09 8.09 0 0 1-1.24-4.28c0-4.48 3.65-8.13 8.15-8.13 2.18 0 4.22.85 5.76 2.39a8.08 8.08 0 0 1 2.38 5.75c0 4.48-3.65 8.1-8.12 8.1zm4.44-6.06c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.56.2-1.04.14-1.15-.06-.1-.22-.16-.46-.28z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/logo.jpeg" alt="VeeFinds" className="footer-logo" />
          <span>Vee Finds</span>
        </div>

        <div className="footer-social">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="footer-social-link"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <div className="footer-contact">
          <a href="mailto:veefindsbags@gmail.com" className="footer-email-link">
            <span className="footer-email-icon">✉️</span>
            hello@veefinds.com
          </a>
        </div>

        <p className="footer-copyright">© {year} VeeFinds. All rights reserved.</p>
      </div>
    </footer>
  )
}
