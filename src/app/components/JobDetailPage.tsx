import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { MOCK_JOBS } from './mockData';
import { AdBanner } from './AdBanner';
import { JobCard } from './JobCard';
import { useSavedJobs } from '../context/SavedJobsContext';
import { Job } from './types';

function SliderReadOnly({ value, leftLabel, rightLabel, labels }: {
  value: number; leftLabel: string; rightLabel: string;
  labels?: string[];
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 11, color: '#4E4E4E', minWidth: 80, textAlign: 'right' }}>{leftLabel}</span>
      <div style={{ flex: 1, position: 'relative', height: 28 }}>
        {/* Track */}
        <div style={{
          position: 'absolute', top: '50%', transform: 'translateY(-50%)',
          width: '100%', height: 8, background: '#e0e0e0', borderRadius: 4,
          border: '1px solid #BDBDBD',
        }} />
        {/* Fill */}
        <div style={{
          position: 'absolute', top: '50%', transform: 'translateY(-50%)',
          left: 0,
          width: `${((value - 1) / 4) * 100}%`,
          height: 8,
          background: 'linear-gradient(90deg, #A5D6A7, #43A047)',
          borderRadius: 4,
        }} />
        {/* Dots */}
        {[1, 2, 3, 4, 5].map(n => (
          <div key={n} style={{
            position: 'absolute',
            top: '50%',
            left: `${((n - 1) / 4) * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: n === value ? 18 : 10,
            height: n === value ? 18 : 10,
            background: n === value ? '#E65100' : '#9E9E9E',
            borderRadius: '50%',
            border: '2px solid #fff',
            boxShadow: n === value ? '0 2px 6px rgba(230,81,0,0.5)' : '0 1px 3px rgba(0,0,0,0.2)',
            zIndex: 1,
            transition: 'all 200ms',
          }}>
            {n === value && labels && (
              <div style={{
                position: 'absolute',
                bottom: 20, left: '50%',
                transform: 'translateX(-50%)',
                background: '#E65100',
                color: '#fff',
                fontSize: 9,
                padding: '2px 5px',
                borderRadius: 3,
                whiteSpace: 'nowrap',
                fontWeight: 700,
              }}>
                {labels[n - 1]}
              </div>
            )}
          </div>
        ))}
      </div>
      <span style={{ fontSize: 11, color: '#4E4E4E', minWidth: 80 }}>{rightLabel}</span>
    </div>
  );
}

function InfoTableRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <tr>
      <td style={{
        width: '30%', padding: '12px 16px',
        background: '#f9f9f9',
        borderBottom: '1px solid #e0e0e0',
        fontSize: 13, fontWeight: 600, color: '#4E4E4E',
        verticalAlign: 'top',
        borderRight: '1px solid #e0e0e0',
      }}>
        {label}
      </td>
      <td style={{
        padding: '12px 16px',
        borderBottom: '1px solid #e0e0e0',
        fontSize: 13, color: '#1A1A1A',
        verticalAlign: 'top',
        lineHeight: 1.6,
      }}>
        {value}
      </td>
    </tr>
  );
}

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isSaved, toggleSave } = useSavedJobs();

  const job = MOCK_JOBS.find(j => j.id === id) || MOCK_JOBS[0];
  const kept = isSaved(job.id);

  const [showMore, setShowMore] = useState(false);
  const [phoneShown, setPhoneShown] = useState(false);
  const [visitRequested, setVisitRequested] = useState(false);

  const barometer = job.applicationBarometer;
  const formatSalary = (j: Job) => {
    if (j.salary.type === 'Hourly') return `₱${j.salary.min}–₱${j.salary.max}/hr`;
    if (j.salary.type === 'Daily') return `₱${j.salary.min}–₱${j.salary.max}/day`;
    return `₱${j.salary.min.toLocaleString()}–₱${j.salary.max.toLocaleString()}/mo`;
  };

  const BarometerBlock = () => (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#4E4E4E', marginBottom: 6 }}>
        Application Barometer — {barometer >= 5 ? 'Applications Pouring In!' : barometer >= 4 ? 'Actively Recruiting!' : barometer >= 3 ? 'Hiring Now' : 'Still Accepting Applications'}
      </div>
      <div style={{ display: 'flex', gap: 3, height: 36, position: 'relative', borderRadius: 4, overflow: 'hidden' }}>
        {[1, 2, 3, 4, 5].map(n => (
          <div
            key={n}
            style={{
              flex: 1,
              background: n <= barometer
                ? `linear-gradient(180deg, #FF8A50 0%, #E65100 100%)`
                : `linear-gradient(180deg, #e0e0e0 0%, #bdbdbd 100%)`,
              boxShadow: n <= barometer ? 'inset 0 1px 0 rgba(255,255,255,0.3)' : undefined,
              borderRadius: 2,
            }}
          />
        ))}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, color: '#fff',
          textShadow: '0 1px 3px rgba(0,0,0,0.6)',
        }}>
          {barometer >= 5 ? 'Applications Pouring In!' :
           barometer >= 4 ? 'Actively Recruiting!' :
           barometer >= 3 ? 'Hiring Now' :
           barometer >= 2 ? 'Still Accepting' :
           'Few Applicants — Apply Now!'}
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#9E9E9E', marginTop: 4 }}>
        Number of people to be hired: {job.totalHired} people
      </div>
    </div>
  );

  return (
    <div style={{
      maxWidth: 1100, margin: '0 auto', padding: '16px',
      fontFamily: "'Noto Sans', sans-serif",
    }}>

      {/* Back / Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontSize: 12, color: '#1565C0' }}>
        <button onClick={() => navigate('/jobs')} className="btn-3d btn-sm btn-outline-green" style={{ fontSize: 11 }}>
          ← Back to Job List
        </button>
        <span style={{ color: '#9E9E9E' }}>Home › {job.district} › {job.category} › Job Detail</span>
      </div>

      {/* AD - top banner */}
      <AdBanner zone="AD-TOP-BANNER" label="Ad Placeholder — 1200×90 (AD-TOP-BANNER)" height={80} style={{ marginBottom: 16 }} />

      {/* Title + Company header */}
      <div style={{
        background: '#fff', border: '1px solid #BDBDBD', borderRadius: 10,
        padding: 20, marginBottom: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
        {/* Employer area badge */}
        <div style={{
          background: '#e8f5e9', border: '1px solid #A5D6A7',
          borderRadius: 4, padding: '3px 10px', display: 'inline-flex',
          alignItems: 'center', gap: 6, marginBottom: 10, fontSize: 11, color: '#1B5E20', fontWeight: 600,
        }}>
          {job.district} Area Employer | {job.nearestStation[0]}
        </div>

        {/* Feature flags at top */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
          {job.isNew && <span style={{ background: '#1565C0', color: '#fff', padding: '2px 8px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>NEW</span>}
          {job.isFeatured && <span style={{ background: '#F57F17', color: '#fff', padding: '2px 8px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>FEATURED</span>}
          {job.isUrgent && <span style={{ background: '#E65100', color: '#fff', padding: '2px 8px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>URGENT HIRING</span>}
          <span style={{ background: '#2E7D32', color: '#fff', padding: '2px 8px', borderRadius: 3, fontSize: 11, fontWeight: 700 }}>{job.employmentType}</span>
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1B5E20', lineHeight: 1.3, marginBottom: 8 }}>
          {job.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', fontSize: 13 }}>
          <a style={{ color: '#1565C0', textDecoration: 'underline', fontWeight: 600, cursor: 'pointer' }}>
            {job.company}
          </a>
          <span style={{ color: '#9E9E9E' }}>|</span>
          <span style={{ color: '#9E9E9E', fontSize: 12 }}>Posted: {job.postedDate}</span>
          <span style={{ color: '#9E9E9E' }}>|</span>
          <span style={{ color: '#9E9E9E', fontSize: 12 }}>ID: {job.id.toUpperCase()}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16 }}>
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* ★ JOB POSTING CHARACTERISTICS (Baitoru-style feature chips, image-19) */}
          <div style={{ background: '#fff', border: '1px solid #D5D5D5', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{
              borderLeft: '4px solid #43A047', padding: '10px 14px',
              fontSize: 15, fontWeight: 800, color: '#1A1A1A',
              borderBottom: '1px solid #E0E0E0', background: '#FAFAFA',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              Job Posting Characteristics
              <span style={{ fontSize: 11, color: '#1565C0', textDecoration: 'underline', cursor: 'pointer', fontWeight: 500 }}>
                About feature flags ↗
              </span>
            </div>
            <div style={{ padding: '4px 16px 14px' }}>
              {([
                { title: 'Popular Features', items: job.features.slice(0, 8) },
                { title: 'How to Earn', items: ['Daily Pay', 'Weekly Pay', 'High Income'].filter(x => job.features.includes(x)).concat(job.salary.type === 'Hourly' ? ['Hourly Wage'] : []) },
                { title: 'We Welcome', items: job.features.filter(f => ['No Experience OK','Students Welcome','Housewives/Husbands','Foreigners OK','Mid-career','Seniors','No Degree Required','Double Work OK'].includes(f)) },
                { title: 'Workplace', items: job.features.filter(f => ['Newly Opened','Non-smoking','Air-conditioned','Indoor Work'].includes(f)) },
                { title: 'Attractive Treatment', items: job.features.filter(f => ['Transportation Allowance','Training Provided','Uniform Provided','Free Meals'].includes(f)) },
                { title: 'Be Yourself', items: job.features.filter(f => ['Hair & Style Freedom','Nail OK','Tattoo OK'].includes(f)) },
                { title: 'Application Benefits', items: ['No Resume Needed','Refer a Friend','Web Application OK'].filter(x => job.features.includes(x)) },
              ] as { title: string; items: string[] }[])
                .filter(g => g.items.length > 0)
                .map(group => (
                  <div key={group.title}>
                    <div className="feature-group-label">{group.title}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {group.items.map(item => (
                        <span key={item} className="feature-chip highlight" style={{ padding: '5px 12px', fontSize: 12, borderRadius: 4 }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

              {job.happyBonus && (
                <div style={{
                  marginTop: 14, background: '#FFF8E1',
                  border: '1px solid #FFE082', borderRadius: 6,
                  padding: '10px 14px',
                }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#E65100' }}>Happy Bonus</div>
                  <div style={{ fontSize: 12, color: '#5D4037' }}>{job.happyBonus}</div>
                </div>
              )}
            </div>
          </div>

          {/* ★ WORKPLACE ENVIRONMENT & ATMOSPHERE */}
          <div style={{ background: '#fff', border: '1px solid #BDBDBD', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div className="section-header">Workplace Environment & Atmosphere</div>
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* Schedule tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {job.schedule.map(s => (
                  <span key={s} className="feature-chip" style={{ padding: '4px 10px', fontSize: 12 }}>{s}</span>
                ))}
              </div>

              {/* Sliders grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1B5E20', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                    Most Age Group
                  </div>
                  <SliderReadOnly value={job.ageGroupSlider} leftLabel="Teens" rightLabel="50s"
                    labels={['Teens', '20s', '30s', '40s', '50s']} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#9E9E9E', marginTop: 2 }}>
                    <span>teens</span><span>20s</span><span>30s</span><span>40s</span><span>50s</span>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1B5E20', marginBottom: 8 }}>
                    Gender Ratio
                  </div>
                  <SliderReadOnly value={job.genderRatioSlider} leftLabel="Male" rightLabel="Female" />
                </div>

                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1B5E20', marginBottom: 8 }}>
                    How to Work
                  </div>
                  <SliderReadOnly value={job.workStyleSlider} leftLabel="By Myself" rightLabel="In Large Group"
                    labels={['Solo', 'Mostly Solo', 'Mixed', 'Team', 'Large Group']} />
                </div>

                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1B5E20', marginBottom: 8 }}>
                    Workplace Situation
                  </div>
                  <SliderReadOnly value={job.workplaceVibeSlider} leftLabel="Shizuka (Quiet)" rightLabel="Lively"
                    labels={['Very Quiet', 'Calm', 'Moderate', 'Active', 'Very Lively']} />
                </div>

                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1B5E20', marginBottom: 8 }}>
                    Desk vs. Standing Work
                  </div>
                  <SliderReadOnly value={job.workTypeSlider} leftLabel="Desk Work" rightLabel="Standing Work" />
                </div>

                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1B5E20', marginBottom: 8 }}>
                    Working with Customers
                  </div>
                  <SliderReadOnly value={job.customerInteractionSlider} leftLabel="No Customer Contact" rightLabel="Constant Interaction" />
                </div>

                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1B5E20', marginBottom: 8 }}>
                    External Interaction
                  </div>
                  <SliderReadOnly value={job.externalInteractionSlider} leftLabel="Limited Outside Work" rightLabel="Frequent Outside Work" />
                </div>

                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1B5E20', marginBottom: 8 }}>
                    Prior Knowledge Needed
                  </div>
                  <SliderReadOnly value={job.priorKnowledgeSlider} leftLabel="Not Needed at All" rightLabel="Required" />
                </div>
              </div>
            </div>
          </div>

          {/* ★ RECRUITMENT INFORMATION */}
          <div style={{ background: '#fff', border: '1px solid #BDBDBD', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div className="section-header">Recruitment Information (募集情報)</div>

            {/* Recommended points */}
            <div style={{ padding: '12px 16px', background: '#f9fff9', borderBottom: '1px solid #e0e0e0' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1B5E20', marginBottom: 8 }}>
                Recommended Points from the Employer
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {job.recommendedPoints.map((point, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: '#1A1A1A' }}>
                    <span style={{
                      background: '#2E7D32', color: '#fff', borderRadius: '50%',
                      width: 20, height: 20, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700,
                    }}>{i + 1}</span>
                    <span style={{ lineHeight: 1.5 }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info table */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <InfoTableRow label="Job Type" value={
                  <div>
                    <span style={{ background: '#2E7D32', color: '#fff', padding: '2px 6px', borderRadius: 3, fontSize: 11, marginRight: 6 }}>{job.employmentType}</span>
                    {job.jobType.join(', ')}
                  </div>
                } />
                <InfoTableRow label="Salary" value={
                  <div>
                    <div style={{ marginBottom: 2 }}>
                      <span style={{ background: '#2E7D32', color: '#fff', padding: '2px 6px', borderRadius: 3, fontSize: 11, marginRight: 6 }}>{job.employmentType}</span>
                      <span style={{ fontWeight: 800, fontSize: 16, color: '#E65100' }}>{job.salary.type} Wage: {formatSalary(job)}</span>
                    </div>
                    {job.salary.note && <div style={{ color: '#4E4E4E', fontSize: 12, marginTop: 2 }}>※ {job.salary.note}</div>}
                  </div>
                } />
                <InfoTableRow label="Working Hours" value={
                  <div>
                    <span style={{ background: '#2E7D32', color: '#fff', padding: '2px 6px', borderRadius: 3, fontSize: 11, marginRight: 6 }}>{job.employmentType}</span>
                    <span style={{ fontWeight: 600 }}>{job.scheduleNote}</span>
                    <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {job.schedule.map(s => (
                        <span key={s} className="feature-chip" style={{ fontSize: 11 }}>{s}</span>
                      ))}
                    </div>
                  </div>
                } />
                <InfoTableRow label="Work Start Date" value={job.workStartDate} />
                <InfoTableRow label="Employment Period" value={job.employmentPeriod} />
                <InfoTableRow label="Holidays & Vacations" value={job.holidays} />
                <InfoTableRow label="Experience & Qualifications" value={
                  <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{job.requirements}</div>
                } />
                <InfoTableRow label="Compensation & Benefits" value={
                  <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{job.benefits}</div>
                } />
                {job.happyBonus && (
                  <InfoTableRow label="Happy Bonus" value={
                    <span style={{ color: '#E65100', fontWeight: 700 }}>{job.happyBonus}</span>
                  } />
                )}
              </tbody>
            </table>

            {/* Job Description */}
            <div style={{ padding: '14px 16px', borderTop: '1px solid #e0e0e0' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#2E7D32', marginBottom: 10 }}>
                Job Description — What You'll Do
              </div>
              <div style={{
                fontSize: 13, color: '#1A1A1A', lineHeight: 1.7,
                maxHeight: showMore ? 'none' : 200,
                overflow: 'hidden',
                position: 'relative',
              }}>
                {job.jobDescription.split('. ').map((sentence, i) => (
                  <p key={i} style={{ marginBottom: 6 }}>・{sentence.trim()}{sentence.endsWith('.') ? '' : '.'}</p>
                ))}
                {!showMore && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: 60,
                    background: 'linear-gradient(transparent, white)',
                  }} />
                )}
              </div>
              {!showMore && (
                <button
                  onClick={() => setShowMore(true)}
                  style={{ background: 'none', border: 'none', color: '#1565C0', cursor: 'pointer', fontSize: 13, textDecoration: 'underline', marginTop: 4 }}
                >
                  See More ▼
                </button>
              )}
            </div>
          </div>

          {/* ★ APPLICATION INFO */}
          <div style={{ background: '#fff', border: '1px solid #BDBDBD', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div className="section-header">Application Information (応募情報)</div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <InfoTableRow label="Application Destination" value={job.applicationDest} />
                <InfoTableRow label="Nearest Station / Access" value={
                  <div>
                    {job.nearestStation.map(s => (
                      <div key={s} style={{ marginBottom: 4 }}>
                        <span style={{
                          background: '#1565C0', color: '#fff',
                          padding: '2px 6px', borderRadius: 3, fontSize: 11,
                          marginRight: 6,
                        }}>Station</span>
                        {s}
                      </div>
                    ))}
                  </div>
                } />
                <InfoTableRow label="How to Apply" value={
                  <div style={{ lineHeight: 1.6 }}>{job.howToApply}</div>
                } />
              </tbody>
            </table>
          </div>

          {/* ★ WORKPLACE VISIT INFO */}
          <div style={{
            background: '#fff',
            border: '2px solid #43A047',
            borderRadius: 10,
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #43A047, #2E7D32)',
              padding: '10px 16px',
              color: '#fff', fontWeight: 700, fontSize: 14,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
            }}>
              Workplace Visit — See it First Before You Apply!
            </div>
            <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7, color: '#1A1A1A' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div style={{ background: '#e8f5e9', borderRadius: 8, padding: '10px 12px', border: '1px solid #A5D6A7' }}>
                  <div style={{ fontWeight: 700, color: '#1B5E20', marginBottom: 4 }}>Visiting Hours</div>
                  <div>About 30 minutes</div>
                  <div style={{ fontSize: 12, color: '#4E4E4E' }}>At a time convenient for you!</div>
                </div>
                <div style={{ background: '#e8f5e9', borderRadius: 8, padding: '10px 12px', border: '1px solid #A5D6A7' }}>
                  <div style={{ fontWeight: 700, color: '#1B5E20', marginBottom: 4 }}>Who Will Guide You</div>
                  <div>Recruitment staff or senior employee</div>
                  <div style={{ fontSize: 12, color: '#4E4E4E' }}>Friendly and welcoming!</div>
                </div>
              </div>

              <div style={{ background: '#f9fff9', borderRadius: 8, padding: 12, border: '1px solid #C8E6C9' }}>
                <div style={{ fontWeight: 700, color: '#1B5E20', marginBottom: 8 }}>《Specific Details》</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12 }}>
                  <div>• Introduction to the staff working that day</div>
                  <div>• We'll show you around the workplace!</div>
                  <div>• Q&A time — We'll answer ANYTHING! Please feel free to ask anything you're curious about</div>
                  <div>• If you'd like to see what the job is like first, please come visit us!</div>
                  <div>• You can have an interview right after the tour! Of course, you can also have it on a different day.</div>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <button
                  className={`btn-3d btn-lg ${visitRequested ? 'btn-outline-green' : 'btn-blue'}`}
                  style={{ width: '100%', fontSize: 14 }}
                  onClick={() => setVisitRequested(true)}
                >
                  {visitRequested ? 'Workplace Visit Requested!' : 'Apply for a Workplace Visit'}
                </button>
              </div>
            </div>
          </div>

          {/* ★ COMPANY INFORMATION */}
          <div style={{ background: '#fff', border: '1px solid #BDBDBD', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div className="section-header">Company Information (会社情報)</div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <InfoTableRow label="Company Name" value={<strong>{job.companyInfo.name}</strong>} />
                <InfoTableRow label="Business Details" value={job.companyInfo.businessDetails} />
                <InfoTableRow label="Location" value={job.applicationDest} />
                {job.companyInfo.url && (
                  <InfoTableRow label="Company URL" value={
                    <a style={{ color: '#1565C0', textDecoration: 'underline' }}>{job.companyInfo.url}</a>
                  } />
                )}
                <InfoTableRow label="Nearest Station" value={
                  <div>
                    {job.nearestStation.map(s => (
                      <div key={s} style={{ marginBottom: 2, fontSize: 12 }}>{s}</div>
                    ))}
                  </div>
                } />
              </tbody>
            </table>
            <div style={{ padding: '10px 16px', borderTop: '1px solid #e0e0e0' }}>
              <button style={{ background: 'none', border: 'none', color: '#1565C0', cursor: 'pointer', textDecoration: 'underline', fontSize: 13 }}>
                View other jobs from this company ›
              </button>
            </div>
          </div>

          {/* Bottom barometer */}
          <div style={{ background: '#fff', border: '1px solid #BDBDBD', borderRadius: 10, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <BarometerBlock />
          </div>

          {/* AD - job detail banner */}
          <AdBanner zone="AD-JOB-DETAIL" label="Ad Placeholder — 728×90 (AD-JOB-DETAIL)" height={80} />

        </div>

        {/* RIGHT COLUMN — sticky apply section */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'sticky', top: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Photo gallery placeholder */}
            <div style={{ background: '#fff', border: '1px solid #BDBDBD', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{
                height: 200,
                background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                fontSize: 64, gap: 4,
              }}>
                {job.categoryIcon}
              </div>
              <div style={{
                display: 'flex',
                borderTop: '1px solid #e0e0e0',
              }}>
                {[1, 2, 3].map(n => (
                  <div key={n} style={{
                    flex: 1, height: 60,
                    background: `hsl(${120 + n * 20}, 60%, ${88 + n * 2}%)`,
                    borderRight: n < 3 ? '1px solid #e0e0e0' : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, cursor: 'pointer',
                    color: '#2E7D32',
                  }}>
                    {['Photo', 'Office', 'Team'][n - 1]}
                  </div>
                ))}
              </div>
              <div style={{ padding: '6px 12px', fontSize: 11, color: '#9E9E9E', textAlign: 'center' }}>
                Check out the workplace photos! Staff atmosphere ›
              </div>
            </div>

            {/* Application barometer (compact) */}
            <div style={{ background: '#fff', border: '1px solid #BDBDBD', borderRadius: 10, padding: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#4E4E4E', marginBottom: 6 }}>
                Application Barometer
              </div>
              <div style={{ display: 'flex', gap: 2, height: 28, marginBottom: 4 }}>
                {[1, 2, 3, 4, 5].map(n => (
                  <div key={n} style={{
                    flex: 1, borderRadius: 2,
                    background: n <= barometer
                      ? 'linear-gradient(180deg, #FF8A50 0%, #E65100 100%)'
                      : 'linear-gradient(180deg, #e0e0e0 0%, #bdbdbd 100%)',
                  }} />
                ))}
              </div>
              <div style={{ fontSize: 11, color: '#E65100', fontWeight: 700 }}>
                {barometer >= 4 ? 'Applications Pouring In!' : 'Actively Recruiting!'}
              </div>
              <div style={{ fontSize: 11, color: '#9E9E9E' }}>
                Hiring: {job.totalHired} people
                {job.slotsLeft && <span style={{ color: '#E65100', fontWeight: 700, marginLeft: 6 }}>Only {job.slotsLeft} slots left!</span>}
              </div>
            </div>

            {/* Main action buttons */}
            <div style={{ background: '#fff', border: '1px solid #BDBDBD', borderRadius: 10, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <button
                className="btn-3d btn-orange"
                onClick={() => toggleSave(job)}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: 15,
                  marginBottom: 10,
                  background: kept
                    ? 'linear-gradient(180deg, #FFB74D 0%, #F57F17 45%, #E65100 100%)'
                    : undefined,
                }}
              >
                {kept ? '★ Kept! (Saved to My Jobs)' : '☆ Keep / Save This Job'}
              </button>

              <button className="btn-3d btn-green" style={{ width: '100%', padding: 14, fontSize: 16, marginBottom: 8 }} onClick={() => alert('Application submitted! We will contact you within 24 hours.')}>
                Apply Now ›
              </button>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="btn-3d btn-blue btn-md"
                  style={{ flex: 1, fontSize: 12 }}
                  onClick={() => setPhoneShown(true)}
                >
                  {phoneShown ? '0917-XXX-XXXX' : 'Display Phone Number'}
                </button>
              </div>

              <div style={{ marginTop: 10, padding: '8px 0', borderTop: '1px solid #e0e0e0', fontSize: 11, color: '#9E9E9E', textAlign: 'center' }}>
                Online applications are reviewed within 24 hours<br />
                We will contact you via email or phone
              </div>
            </div>

            {/* Salary info card */}
            <div style={{
              background: 'linear-gradient(135deg, #e8f5e9, #f1f8e9)',
              border: '2px solid #43A047',
              borderRadius: 10, padding: 14,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1B5E20', marginBottom: 4 }}>Salary</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#E65100', marginBottom: 4 }}>
                {formatSalary(job)}
              </div>
              {job.salary.note && (
                <div style={{ fontSize: 11, color: '#4E4E4E' }}>+ {job.salary.note}</div>
              )}
              {job.happyBonus && (
                <div style={{
                  marginTop: 8, background: '#fff3e0', border: '1px solid #FFB74D',
                  borderRadius: 6, padding: '5px 8px', fontSize: 11, color: '#E65100', fontWeight: 600,
                }}>
                  {job.happyBonus}
                </div>
              )}
            </div>

            {/* Station info */}
            <div style={{ background: '#fff', border: '1px solid #BDBDBD', borderRadius: 10, padding: 12, fontSize: 12 }}>
              <div style={{ fontWeight: 700, color: '#1B5E20', marginBottom: 6 }}>Access / Nearest Station</div>
              {job.nearestStation.map(s => (
                <div key={s} style={{
                  padding: '4px 8px', marginBottom: 4,
                  background: '#f0f4ff', borderRadius: 4,
                  color: '#1565C0', fontSize: 11, fontWeight: 600,
                }}>
                  {s}
                </div>
              ))}
              <div style={{ fontSize: 11, color: '#9E9E9E', marginTop: 6 }}>
                {job.location}
              </div>
            </div>

            {/* AD Sidebar */}
            <AdBanner zone="AD-SIDEBAR-TOP" label="Ad Placeholder&#10;300×250 (AD-SIDEBAR-TOP)" height={200} />
          </div>
        </div>
      </div>

      {/* Other Available Jobs */}
      <div style={{ marginTop: 24 }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 12, borderBottom: '2px solid #66BB6A', paddingBottom: 6,
        }}>
          <h2 style={{
            fontSize: 17, fontWeight: 800, color: '#1B5E20',
            borderLeft: '4px solid #43A047', paddingLeft: 10, margin: 0,
          }}>
            Other Available Jobs You May Like
          </h2>
          <button className="btn-3d btn-outline-green btn-sm" onClick={() => navigate('/jobs')}>
            See All Jobs ›
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MOCK_JOBS.filter(j => j.id !== job.id).slice(0, 4).map(j => (
            <JobCard key={j.id} job={j} onClick={() => { navigate(`/jobs/${j.id}`); window.scrollTo({ top: 0 }); }} />
          ))}
        </div>
      </div>
    </div>
  );
}
