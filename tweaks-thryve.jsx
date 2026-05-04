/* Thryve Health — Tweaks Panel */
const { useEffect } = React;

const FONT_OPTIONS = {
  'Cormorant': "'Cormorant Garamond', serif",
  'Playfair':  "'Playfair Display', serif",
  'DM Serif':  "'DM Serif Display', serif",
  'Lora':      "'Lora', serif"
};

const FONT_GOOGLE_URL = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Playfair+Display:wght@400;500&family=DM+Serif+Display&family=Lora:wght@400;500&display=swap';

/* Multiline textarea control for long subhead copy */
function SubheadText({ value, onChange }) {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:4,padding:'0 16px 10px'}}>
      <span style={{fontSize:11,fontWeight:500,color:'#888',textTransform:'uppercase',letterSpacing:'0.08em'}}>Subheadline</span>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={4}
        style={{fontFamily:'inherit',fontSize:13,lineHeight:1.5,padding:'8px 10px',border:'1px solid #ddd',borderRadius:6,resize:'vertical',color:'#333',background:'#fafafa',outline:'none'}}
      />
    </div>
  );
}

function ThryveTweaks() {
  const defaults = /*EDITMODE-BEGIN*/{
    "headline1": "You're doing everything right.",
    "headline2": "So why do you still feel this way?",
    "subhead": "Exhausted, gaining weight, sleeping badly, and told your labs are normal. There may be a real reason \u2014 and it deserves a real review.",
    "accent": "#1D9E75",
    "ctaLabel": "Book a consult",
    "phone": "(555) 555-0100",
    "headingFont": "Cormorant",
    "showUtilityBar": true,
    "showSentimentBand": true,
    "heroBg": "animated"
  }/*EDITMODE-END*/;

  const [tweaks, setTweak] = useTweaks(defaults);

  /* Inject extra Google fonts on first mount so the radio swap is instant */
  useEffect(() => {
    if (!document.getElementById('tw-extra-fonts')) {
      const l = document.createElement('link');
      l.id = 'tw-extra-fonts';
      l.rel = 'stylesheet';
      l.href = FONT_GOOGLE_URL;
      document.head.appendChild(l);
    }
  }, []);

  /* ── Apply tweaks to DOM ── */

  /* Headline lines: rebuild via the page's existing buildHeroHeadline */
  useEffect(() => {
    if (typeof window.setHeroHeadline === 'function') {
      window.setHeroHeadline(tweaks.headline1, tweaks.headline2);
    }
  }, [tweaks.headline1, tweaks.headline2]);

  /* Subhead */
  useEffect(() => {
    const el = document.querySelector('.hero-p');
    if (el) el.textContent = tweaks.subhead;
  }, [tweaks.subhead]);

  /* Accent color: rewrite CSS variables */
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--ac', tweaks.accent);
    /* Derive a slightly darker hover and a lighter mint */
    root.style.setProperty('--mg', shade(tweaks.accent, -0.18));
    root.style.setProperty('--lt', shade(tweaks.accent, 0.28));
    root.style.setProperty('--pl', shade(tweaks.accent, 0.5));
  }, [tweaks.accent]);

  /* CTA label */
  useEffect(() => {
    document.querySelectorAll('.nav-cta-text, .drawer-cta').forEach(el => {
      if (el.classList.contains('drawer-cta')) el.textContent = tweaks.ctaLabel;
      else el.textContent = tweaks.ctaLabel;
    });
  }, [tweaks.ctaLabel]);

  /* Phone */
  useEffect(() => {
    const a = document.querySelector('.util-right a[href^="tel"]');
    if (a) {
      const span = a.querySelector('span');
      if (span) span.textContent = tweaks.phone;
      a.href = 'tel:' + tweaks.phone.replace(/[^\d+]/g, '');
    }
  }, [tweaks.phone]);

  /* Heading font */
  useEffect(() => {
    const stack = FONT_OPTIONS[tweaks.headingFont] || FONT_OPTIONS.Cormorant;
    let s = document.getElementById('tw-font-override');
    if (!s) { s = document.createElement('style'); s.id = 'tw-font-override'; document.head.appendChild(s); }
    s.textContent = `.hero-h1, .h2, .ab-quote-mark, .quote, .about-quote, .footer-brand, .pricing-h, .price-amt, .nav-logo-name { font-family: ${stack} !important; }`;
  }, [tweaks.headingFont]);

  /* Utility bar */
  useEffect(() => {
    const bar = document.querySelector('.utility-bar');
    if (bar) bar.style.display = tweaks.showUtilityBar ? '' : 'none';
  }, [tweaks.showUtilityBar]);

  /* Sentiment band */
  useEffect(() => {
    const band = document.getElementById('trust-bar') || document.querySelector('.sentiment-band');
    if (band) band.style.display = tweaks.showSentimentBand ? '' : 'none';
  }, [tweaks.showSentimentBand]);

  /* Hero background style */
  useEffect(() => {
    const bg = document.querySelector('.hero-bg');
    if (!bg) return;
    if (tweaks.heroBg === 'animated') {
      bg.style.cssText = '';
    } else if (tweaks.heroBg === 'solid') {
      bg.style.cssText = 'animation:none;background:var(--dk)';
    } else if (tweaks.heroBg === 'gradient-soft') {
      bg.style.cssText = 'animation:none;background:linear-gradient(160deg,var(--dk) 0%, var(--mg) 100%)';
    }
  }, [tweaks.heroBg]);

  /* ── UI ── */
  return (
    <TweaksPanel title="Tweaks">

      <TweakSection label="Hero copy" />
        <TweakText label="Headline (line 1)"
          value={tweaks.headline1}
          onChange={v => setTweak('headline1', v)} />
        <TweakText label="Headline (line 2)"
          value={tweaks.headline2}
          onChange={v => setTweak('headline2', v)} />
        <SubheadText value={tweaks.subhead} onChange={v => setTweak('subhead', v)} />

      <TweakSection label="Brand" />
        <TweakColor label="Accent color"
          value={tweaks.accent}
          onChange={v => setTweak('accent', v)} />
        <TweakRadio label="Heading font"
          value={tweaks.headingFont}
          onChange={v => setTweak('headingFont', v)}
          options={Object.keys(FONT_OPTIONS)} />

      <TweakSection label="Header" />
        <TweakToggle label="Show licensure bar"
          value={tweaks.showUtilityBar}
          onChange={v => setTweak('showUtilityBar', v)} />
        <TweakText label="Phone number"
          value={tweaks.phone}
          onChange={v => setTweak('phone', v)} />
        <TweakText label="CTA label"
          value={tweaks.ctaLabel}
          onChange={v => setTweak('ctaLabel', v)} />

      <TweakSection label="Hero background" />
        <TweakRadio label="Style"
          value={tweaks.heroBg}
          onChange={v => setTweak('heroBg', v)}
          options={['animated', 'solid', 'gradient-soft']} />

      <TweakSection label="Sections" />
        <TweakToggle label="Sentiment / trust band"
          value={tweaks.showSentimentBand}
          onChange={v => setTweak('showSentimentBand', v)} />

    </TweaksPanel>
  );
}

/* ── helpers ── */
function shade(hex, amt) {
  const c = hex.replace('#', '');
  const n = parseInt(c.length === 3 ? c.split('').map(x=>x+x).join('') : c, 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  if (amt < 0) {
    r = Math.round(r * (1 + amt)); g = Math.round(g * (1 + amt)); b = Math.round(b * (1 + amt));
  } else {
    r = Math.round(r + (255 - r) * amt); g = Math.round(g + (255 - g) * amt); b = Math.round(b + (255 - b) * amt);
  }
  return '#' + [r, g, b].map(x => Math.max(0, Math.min(255, x)).toString(16).padStart(2, '0')).join('');
}

/* Mount */
const tweaksRoot = document.createElement('div');
tweaksRoot.id = 'tweaks-root';
document.body.appendChild(tweaksRoot);
ReactDOM.createRoot(tweaksRoot).render(<ThryveTweaks />);
