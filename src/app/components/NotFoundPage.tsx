import { useNavigate } from 'react-router';

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div style={{
      maxWidth: 600, margin: '80px auto', padding: 32, textAlign: 'center',
      fontFamily: "'Noto Sans', sans-serif",
    }}>
      <div style={{ fontSize: 28, fontWeight: 800, color: '#1A1A1A', margin: '16px 0 8px' }}>Page Not Found</div>
      <div style={{ fontSize: 14, color: '#9E9E9E', marginBottom: 28 }}>
        The page you're looking for doesn't exist or has been moved.
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <button className="btn-3d btn-outline-green btn-md" onClick={() => navigate(-1 as any)}>← Go Back</button>
        <button className="btn-3d btn-green btn-md" onClick={() => navigate('/')}>Home</button>
        <button className="btn-3d btn-orange btn-md" onClick={() => navigate('/jobs')}>Browse Jobs</button>
      </div>
    </div>
  );
}
