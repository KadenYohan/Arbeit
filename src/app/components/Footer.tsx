export function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #1B5E20 0%, #0d3b12 100%)',
      color: '#C8E6C9',
      marginTop: 48,
      fontFamily: "'Noto Sans', sans-serif",
      borderTop: '3px solid #145214',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24, marginBottom: 24 }}>

          {/* Brand */}
          <div>
            <div style={{
              fontSize: 24, fontWeight: 800, color: '#fff',
              letterSpacing: -0.5, marginBottom: 8,
            }}>
              Arbeit<span style={{ color: '#FF8A65' }}>PH</span>
            </div>
            <p style={{ fontSize: 12, color: '#A5D6A7', lineHeight: 1.6 }}>
              Metro Manila's #1 Part-Time Job Platform.<br />
              Connecting job seekers with top employers since 2024.
            </p>
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              {['Facebook', 'Instagram', 'TikTok', 'X'].map(s => (
                <div key={s} style={{
                  background: 'rgba(255,255,255,0.1)', borderRadius: 4,
                  padding: '4px 8px', fontSize: 10, color: '#C8E6C9', cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}>{s}</div>
              ))}
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h4 style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 6 }}>
              For Job Seekers
            </h4>
            {['Search Jobs by Area', 'Search by Train Station', 'Search by Job Category', 'Daily Pay Jobs', 'Students OK Jobs', 'Night Shift Jobs', 'WFH / Remote Jobs', 'Urgent Hiring Today', 'Register for Free'].map(link => (
              <div key={link} style={{ fontSize: 12, color: '#A5D6A7', marginBottom: 4, cursor: 'pointer' }}>
                › {link}
              </div>
            ))}
          </div>

          {/* For Employers */}
          <div>
            <h4 style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 6 }}>
              For Employers
            </h4>
            {['Post a Job', 'Manage Job Listings', 'View Applicants', 'Premium Listing Options', 'Featured Job Ads', 'Employer Login', 'Create Employer Account', 'Pricing & Plans'].map(link => (
              <div key={link} style={{ fontSize: 12, color: '#A5D6A7', marginBottom: 4, cursor: 'pointer' }}>
                › {link}
              </div>
            ))}
          </div>

          {/* Search by Area */}
          <div>
            <h4 style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 6 }}>
              Search by Area
            </h4>
            {[
              'Manila (D1)',
              'Makati City',
              'Quezon City',
              'Taguig / BGC',
              'Ortigas / Pasig',
              'Mandaluyong',
              'Cubao Area',
              'Marikina',
              'Parañaque / PITX',
              'Caloocan / Valenzuela',
            ].map(area => (
              <div key={area} style={{ fontSize: 12, color: '#A5D6A7', marginBottom: 4, cursor: 'pointer' }}>
                › {area}
              </div>
            ))}
          </div>

          {/* Search by Train */}
          <div>
            <h4 style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 6 }}>
              Search by Line
            </h4>
            {[
              'MRT-3',
              'LRT-2',
              'LRT-1',
              'MRT-7 (Soon)',
              'MRT-9 Subway (Soon)',
              'NSCR (Soon)',
              'EDSA Bus Carousel',
              'BGC Bus Routes',
              'Makati Ayala Bus',
              'PITX Terminal',
            ].map(line => (
              <div key={line} style={{ fontSize: 12, color: '#A5D6A7', marginBottom: 4, cursor: 'pointer' }}>
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingTop: 16,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{ fontSize: 11, color: '#81C784' }}>
            © 2026 ArbeitPH, Inc. All rights reserved. | Privacy Policy | Terms of Use | Help Center | Contact Us
          </div>
          <div style={{ fontSize: 11, color: '#81C784' }}>
            Metro Manila, Philippines | Language: English / Filipino
          </div>
        </div>
      </div>
    </footer>
  );
}
