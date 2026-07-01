'use client'

import { Reveal } from '@/components/motion/Reveal'
import { SplitHeading } from '@/components/motion/SplitHeading'

interface MemberT {
  name: string
  role: string
  bio: string
  tags: string[]
}

interface TeamProps {
  t: {
    label: string
    title: string
    sub: string
    member1: MemberT
    member2: MemberT
  }
}

// Avatar con iniciales — reemplazar con <Image> cuando haya fotos reales.
function Avatar({ name, index }: { name: string; index: number }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

  const gradients = [
    'linear-gradient(135deg, #0A84FF 0%, #4A8DFF 100%)',
    'linear-gradient(135deg, #0B1026 0%, #0A84FF 100%)',
  ]

  return (
    <div
      style={{
        width: '96px',
        height: '96px',
        borderRadius: '50%',
        background: gradients[index % 2],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        border: '3px solid rgba(10,132,255,0.2)',
        boxShadow: '0 0 0 6px rgba(10,132,255,0.06)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.5rem',
          color: '#fff',
          letterSpacing: '-.02em',
        }}
      >
        {initials || '?'}
      </span>
    </div>
  )
}

export function Team({ t }: TeamProps) {
  const members = [t.member1, t.member2]

  return (
    <section
      style={{
        background: 'var(--light-bg)',
        padding: '128px 40px',
        color: 'var(--light-text)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        {/* Header */}
        <Reveal from="up" delay={0}>
          <p
            style={{
              color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '.12em',
              fontSize: 'var(--text-sm)', fontFamily: 'var(--font-display)', fontWeight: 500,
              marginBottom: '20px',
            }}
          >
            {t.label}
          </p>
        </Reveal>

        <SplitHeading
          as="h2"
          splitBy="words"
          stagger={0.07}
          delay={0.1}
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '-.02em', lineHeight: '.98', fontSize: 'var(--text-display)',
            color: 'var(--light-text)', maxWidth: '16ch', perspective: '600px',
          }}
        >
          {t.title}
        </SplitHeading>

        <Reveal from="up" delay={0.2}>
          <p style={{ color: '#5B6577', fontSize: 'var(--text-lg)', marginTop: '24px', maxWidth: '48ch' }}>
            {t.sub}
          </p>
        </Reveal>

        {/* Cards de miembros */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '64px' }}>
          {members.map((member, i) => (
            <Reveal key={i} from="up" delay={i * 0.12} start="top 88%">
              <div
                style={{
                  display: 'flex', gap: '32px', alignItems: 'flex-start',
                  background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: 'var(--radius-lg)', padding: '36px',
                  transition: 'transform .2s, box-shadow .2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.10)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Avatar name={member.name} index={i} />

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)', fontWeight: 700,
                        fontSize: 'var(--text-h3)', color: 'var(--light-text)', lineHeight: 1.1,
                      }}
                    >
                      {member.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)', fontWeight: 500,
                        fontSize: 'var(--text-sm)', color: 'var(--primary)',
                        textTransform: 'uppercase', letterSpacing: '.06em', marginTop: '6px',
                      }}
                    >
                      {member.role}
                    </p>
                  </div>

                  <p style={{ fontSize: 'var(--text-base)', color: '#5B6577', lineHeight: 1.6, maxWidth: '60ch' }}>
                    {member.bio}
                  </p>

                  {/* Tags de especialidad */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                    {member.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.08em',
                          color: 'var(--primary)', background: 'rgba(10,132,255,0.10)',
                          padding: '5px 12px', borderRadius: 'var(--radius-full)',
                          fontFamily: 'var(--font-display)', fontWeight: 500,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
