import { useState, useEffect } from "react";

// ─── Design Tokens ───────────────────────────────────────────────────────────
const T = {
  green: "#0A6E3F",
  greenMid: "#0D8A50",
  greenLight: "#E8F5EE",
  greenGlow: "rgba(10,110,63,0.15)",
  blue: "#1A6B9A",
  blueLight: "#E8F4FB",
  gold: "#C9952A",
  goldLight: "#FDF6E7",
  red: "#C0392B",
  redLight: "#FDECEA",
  white: "#FFFFFF",
  bg: "#F4F7F5",
  card: "#FFFFFF",
  border: "#E2EBE6",
  text: "#1A2E24",
  textMid: "#4A6358",
  textLight: "#8AA89A",
  shadow: "0 2px 16px rgba(10,110,63,0.10)",
  shadowMd: "0 4px 24px rgba(10,110,63,0.14)",
  radius: "16px",
  radiusSm: "10px",
  radiusLg: "24px",
  radiusFull: "999px",
};

// ─── Utility Components ───────────────────────────────────────────────────────

const Badge = ({ color = T.green, bg, children, style }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    background: bg || `${color}18`, color,
    borderRadius: T.radiusFull, padding: "3px 10px",
    fontSize: 11, fontWeight: 700, letterSpacing: 0.3, ...style
  }}>{children}</span>
);

const Avatar = ({ name = "U", photo, size = 44, verified }) => (
  <div style={{ position: "relative", display: "inline-flex" }}>
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: photo ? "transparent" : `linear-gradient(135deg, ${T.green}, ${T.blue})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 700, fontSize: size * 0.38,
      overflow: "hidden", border: `2px solid ${T.border}`, flexShrink: 0,
    }}>
      {photo ? <img src={photo} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : name.charAt(0).toUpperCase()}
    </div>
    {verified && <div style={{
      position: "absolute", bottom: 0, right: 0,
      width: size * 0.32, height: size * 0.32, borderRadius: "50%",
      background: T.green, border: `2px solid #fff`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.18, color: "#fff"
    }}>✓</div>}
  </div>
);

const StarRating = ({ rating = 4.8, size = 12 }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
    {"★★★★★".split("").map((s, i) => (
      <span key={i} style={{ color: i < Math.floor(rating) ? T.gold : T.border, fontSize: size }}>{s}</span>
    ))}
    <span style={{ fontSize: size, color: T.textMid, fontWeight: 600, marginLeft: 2 }}>{rating}</span>
  </span>
);

const Card = ({ children, style, onClick, hover }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: T.card, borderRadius: T.radius, padding: "16px",
        boxShadow: hovered && hover ? T.shadowMd : T.shadow,
        border: `1px solid ${T.border}`,
        cursor: onClick ? "pointer" : "default",
        transform: hovered && hover ? "translateY(-1px)" : "none",
        transition: "all 0.2s ease",
        ...style
      }}>{children}</div>
  );
};

const Btn = ({ children, variant = "primary", onClick, style, small, icon, full }) => {
  const [pressed, setPressed] = useState(false);
  const vars = {
    primary: { bg: T.green, color: "#fff", border: "none" },
    secondary: { bg: T.greenLight, color: T.green, border: `1px solid ${T.green}30` },
    ghost: { bg: "transparent", color: T.green, border: `1px solid ${T.border}` },
    danger: { bg: T.red, color: "#fff", border: "none" },
    gold: { bg: T.gold, color: "#fff", border: "none" },
  };
  const v = vars[variant];
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        background: v.bg, color: v.color, border: v.border,
        borderRadius: T.radiusFull, padding: small ? "8px 16px" : "14px 24px",
        fontSize: small ? 13 : 15, fontWeight: 700, cursor: "pointer",
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        width: full ? "100%" : "auto",
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transition: "all 0.15s ease",
        boxShadow: variant === "primary" ? `0 4px 16px ${T.greenGlow}` : "none",
        fontFamily: "inherit", ...style
      }}>
      {icon && <span>{icon}</span>}{children}
    </button>
  );
};

const Input = ({ label, placeholder, icon, value, onChange, type = "text", style }) => (
  <div style={{ marginBottom: 14, ...style }}>
    {label && <div style={{ fontSize: 13, fontWeight: 600, color: T.textMid, marginBottom: 6 }}>{label}</div>}
    <div style={{ position: "relative" }}>
      {icon && <span style={{
        position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
        fontSize: 16, color: T.textLight
      }}>{icon}</span>}
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{
          width: "100%", padding: icon ? "12px 14px 12px 42px" : "12px 14px",
          border: `1.5px solid ${T.border}`, borderRadius: T.radiusSm,
          fontSize: 14, color: T.text, background: T.white,
          fontFamily: "inherit", outline: "none", boxSizing: "border-box",
          transition: "border-color 0.2s",
        }}
        onFocus={e => e.target.style.borderColor = T.green}
        onBlur={e => e.target.style.borderColor = T.border}
      />
    </div>
  </div>
);

const Divider = ({ style }) => (
  <div style={{ height: 1, background: T.border, margin: "12px 0", ...style }} />
);

const VerifiedBadge = ({ type }) => {
  const badges = {
    cnic: { icon: "🪪", label: "CNIC Verified", color: T.green },
    driver: { icon: "🚗", label: "Driver Verified", color: T.blue },
    university: { icon: "🎓", label: "University Verified", color: T.gold },
    company: { icon: "🏢", label: "Company Verified", color: "#7B2D8B" },
    women: { icon: "🛡️", label: "Women Safe", color: T.red },
  };
  const b = badges[type] || badges.cnic;
  return <Badge color={b.color}>{b.icon} {b.label}</Badge>;
};

// ─── Mock Data ────────────────────────────────────────────────────────────────
const RIDES = [
  {
    id: 1, driver: "Ahmed Hassan", gender: "M", rating: 4.9, rides: 287,
    from: "DHA Phase 5", to: "Blue Area", via: "Faizabad",
    time: "8:00 AM", seats: 2, price: 250, ac: true,
    car: "Toyota Corolla 2020", plate: "ISB-4421",
    badges: ["cnic", "driver"], recurring: "Daily Weekdays",
    eta: "45 min", verified: true,
  },
  {
    id: 2, driver: "Fatima Malik", gender: "F", rating: 4.7, rides: 143,
    from: "Gulberg III", to: "FAST University",
    time: "7:30 AM", seats: 3, price: 180, ac: false,
    car: "Honda City 2019", plate: "LHR-7812",
    badges: ["cnic", "university", "women"], recurring: "Daily",
    eta: "30 min", verified: true, womenOnly: true,
  },
  {
    id: 3, driver: "Usman Raza", gender: "M", rating: 4.6, rides: 92,
    from: "Bahria Town Gate 1", to: "Centaurus Mall",
    time: "8:30 AM", seats: 1, price: 200, ac: true,
    car: "Suzuki Swift 2021", plate: "ISB-9034",
    badges: ["cnic", "driver", "company"], recurring: "Weekdays",
    eta: "35 min", verified: true,
  },
];

const MESSAGES = [
  { id: 1, user: "Ahmed Hassan", text: "I'll be at the pickup point at 7:55", time: "7:48 AM", unread: 2, avatar: "AH" },
  { id: 2, user: "Fatima Malik", text: "Thanks for the ride yesterday! ⭐⭐⭐⭐⭐", time: "Yesterday", unread: 0, avatar: "FM" },
  { id: 3, user: "Carpool Group - FAST", text: "Anyone heading to uni tomorrow?", time: "Yesterday", unread: 5, avatar: "🎓" },
];

const WALLET_TXN = [
  { id: 1, type: "credit", label: "Ride Contribution Received", sub: "From Ahmed - DHA to Blue Area", amount: 250, date: "Today", icon: "↓" },
  { id: 2, type: "debit", label: "Ride Payment", sub: "To Fatima - Gulberg to FAST", amount: -180, date: "Yesterday", icon: "↑" },
  { id: 3, type: "credit", label: "Wallet Top-up (Easypaisa)", sub: "", amount: 1000, date: "May 27", icon: "💳" },
  { id: 4, type: "debit", label: "Ride Payment", sub: "To Usman - Bahria to Centaurus", amount: -200, date: "May 26", icon: "↑" },
];

// ─── SCREENS ──────────────────────────────────────────────────────────────────

// Splash / Onboarding
const SplashScreen = ({ onNext }) => {
  const [step, setStep] = useState(0);
  const slides = [
    { icon: "🚗", title: "Share the Ride,\nShare the Cost", sub: "Safe, affordable carpooling for Pakistan. Connect with verified commuters near you." },
    { icon: "🛡️", title: "Safety First,\nAlways", sub: "CNIC verified drivers, SOS panic button, live trip sharing with loved ones." },
    { icon: "🤝", title: "Your Community\nCommutes Together", sub: "Join university, corporate, or neighborhood carpool groups you can trust." },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: `linear-gradient(160deg, ${T.green} 0%, #064D2C 100%)`, position: "relative", overflow: "hidden" }}>
      {/* Decorative circles */}
      <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
      <div style={{ position: "absolute", top: 40, right: 20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 32px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 72, marginBottom: 24, filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.2))" }}>{slides[step].icon}</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1.25, whiteSpace: "pre-line", marginBottom: 16, letterSpacing: -0.5 }}>{slides[step].title}</div>
        <div style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, maxWidth: 280 }}>{slides[step].sub}</div>
      </div>

      {/* App name */}
      <div style={{ position: "absolute", top: 40, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🚘</div>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 22, letterSpacing: -0.5 }}>SafarSaath</span>
        </div>
      </div>

      <div style={{ padding: "24px 32px 40px" }}>
        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
          {slides.map((_, i) => (
            <div key={i} style={{ width: i === step ? 24 : 8, height: 8, borderRadius: 4, background: i === step ? "#fff" : "rgba(255,255,255,0.3)", transition: "all 0.3s" }} />
          ))}
        </div>
        {step < slides.length - 1
          ? <Btn full style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(8px)" }} onClick={() => setStep(step + 1)}>Next →</Btn>
          : <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Btn full style={{ background: "#fff", color: T.green }} onClick={onNext}>Get Started</Btn>
            <Btn full style={{ background: "transparent", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.3)" }} onClick={onNext}>Login</Btn>
          </div>
        }
      </div>
    </div>
  );
};

// Login Screen
const LoginScreen = ({ onLogin }) => {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState("phone");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("otp"); }, 1200);
  };
  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1000);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.white }}>
      <div style={{ background: `linear-gradient(135deg, ${T.green}, #064D2C)`, padding: "48px 24px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🚘</div>
        <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>SafarSaath</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 4 }}>Safe carpooling for Pakistan</div>
      </div>

      <div style={{ flex: 1, padding: "32px 24px", overflow: "auto" }}>
        {step === "phone" ? <>
          <div style={{ fontSize: 22, fontWeight: 800, color: T.text, marginBottom: 6 }}>Welcome Back 👋</div>
          <div style={{ color: T.textMid, fontSize: 14, marginBottom: 28 }}>Enter your phone number to continue</div>
          <Input label="Phone Number" placeholder="03XX-XXXXXXX" icon="📱" value={phone} onChange={e => setPhone(e.target.value)} type="tel" />
          <Btn full onClick={handleSend} style={{ marginTop: 8 }}>{loading ? "Sending OTP..." : "Send OTP"}</Btn>
          <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: T.textLight }}>
            OR continue with
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <Btn variant="ghost" full small>📧 Email</Btn>
            <Btn variant="ghost" full small>🔵 Facebook</Btn>
          </div>
        </> : <>
          <div style={{ fontSize: 22, fontWeight: 800, color: T.text, marginBottom: 6 }}>Enter OTP 🔐</div>
          <div style={{ color: T.textMid, fontSize: 14, marginBottom: 28 }}>We sent a 6-digit code to <strong>{phone || "03XX-XXXXXXX"}</strong></div>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {[0, 1, 2, 3, 4, 5].map(i => (
              <input key={i} maxLength={1} style={{
                flex: 1, height: 52, textAlign: "center", fontSize: 22, fontWeight: 700,
                border: `2px solid ${T.border}`, borderRadius: 12, outline: "none",
                fontFamily: "inherit", color: T.text,
              }} />
            ))}
          </div>
          <Btn full onClick={handleVerify}>{loading ? "Verifying..." : "Verify & Login"}</Btn>
          <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: T.textMid }}>
            Didn't receive? <span style={{ color: T.green, fontWeight: 700, cursor: "pointer" }}>Resend OTP</span>
          </div>
        </>}

        <div style={{ marginTop: 32, padding: 16, background: T.greenLight, borderRadius: T.radiusSm, display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 24 }}>🛡️</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.green }}>Your Privacy Matters</div>
            <div style={{ fontSize: 12, color: T.textMid, lineHeight: 1.5 }}>Your phone number is never shared with other users. All communications are masked.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Home / Rider Dashboard
const HomeScreen = ({ setScreen }) => {
  const [searchFrom, setSearchFrom] = useState("DHA Phase 5");
  const [searchTo, setSearchTo] = useState("");
  const [filter, setFilter] = useState("all");

  const filters = [
    { key: "all", label: "All Rides" },
    { key: "women", label: "🩷 Women Only" },
    { key: "ac", label: "❄️ AC" },
    { key: "verified", label: "✓ Verified" },
    { key: "recurring", label: "🔁 Daily" },
  ];

  const filteredRides = RIDES.filter(r => {
    if (filter === "women") return r.womenOnly;
    if (filter === "ac") return r.ac;
    if (filter === "verified") return r.verified;
    if (filter === "recurring") return r.recurring?.includes("Daily");
    return true;
  });

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.bg, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${T.green} 0%, #085C35 100%)`, padding: "20px 20px 28px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>Good morning,</div>
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>Zara Ahmed 👋</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🔔</div>
              <div style={{ position: "absolute", top: 0, right: 0, width: 16, height: 16, background: T.red, borderRadius: "50%", border: "2px solid #0A6E3F", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", fontWeight: 700 }}>3</div>
            </div>
            <Avatar name="ZA" size={40} />
          </div>
        </div>

        {/* Search Box */}
        <div style={{ background: "#fff", borderRadius: T.radius, padding: "4px 12px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.green, border: `2px solid ${T.greenLight}`, flexShrink: 0 }} />
            <input value={searchFrom} onChange={e => setSearchFrom(e.target.value)}
              placeholder="Pickup location" style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: T.text, fontFamily: "inherit" }} />
            <span style={{ fontSize: 18, cursor: "pointer" }}>📍</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0" }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: T.red, flexShrink: 0 }} />
            <input value={searchTo} onChange={e => setSearchTo(e.target.value)}
              placeholder="Where to?" style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: T.text, fontFamily: "inherit" }} />
            <span style={{ fontSize: 18, cursor: "pointer" }}>🔍</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 80px" }}>
        {/* Quick actions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
          {[
            { icon: "🏠", label: "Home" }, { icon: "🏢", label: "Office" },
            { icon: "🎓", label: "University" }, { icon: "✈️", label: "Intercity" },
          ].map(q => (
            <div key={q.label} style={{ background: T.card, borderRadius: T.radiusSm, padding: "12px 8px", textAlign: "center", boxShadow: T.shadow, cursor: "pointer", border: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{q.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.textMid }}>{q.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 16, scrollbarWidth: "none" }}>
          {filters.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{
              flexShrink: 0, padding: "7px 14px", borderRadius: T.radiusFull,
              border: `1.5px solid ${filter === f.key ? T.green : T.border}`,
              background: filter === f.key ? T.greenLight : T.card,
              color: filter === f.key ? T.green : T.textMid,
              fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            }}>{f.label}</button>
          ))}
        </div>

        {/* Suggested Rides */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>Available Rides</div>
          <span style={{ fontSize: 12, color: T.green, fontWeight: 600, cursor: "pointer" }}>See all</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filteredRides.map(ride => (
            <RideCard key={ride.id} ride={ride} onBook={() => setScreen("rideDetail")} />
          ))}
          {filteredRides.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 20px", color: T.textLight }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🔍</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>No rides match this filter</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>Try adjusting your filters</div>
            </div>
          )}
        </div>

        {/* Safety Banner */}
        <div style={{ marginTop: 20, background: `linear-gradient(135deg, ${T.red}15, ${T.red}08)`, border: `1px solid ${T.red}25`, borderRadius: T.radius, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: T.red, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🆘</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.red }}>Safety First — SOS Ready</div>
            <div style={{ fontSize: 11, color: T.textMid, marginTop: 2 }}>Tap SOS anytime during a ride to alert emergency contacts and share your live location.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RideCard = ({ ride, onBook }) => (
  <Card hover onClick={onBook} style={{ padding: "14px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Avatar name={ride.driver} size={40} verified={ride.verified} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: T.text }}>{ride.driver}</div>
          <StarRating rating={ride.rating} />
          <div style={{ fontSize: 11, color: T.textLight, marginTop: 1 }}>{ride.rides} rides</div>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: T.green }}>Rs {ride.price}</div>
        <div style={{ fontSize: 10, color: T.textLight }}>per seat</div>
        {ride.womenOnly && <Badge color={T.red} style={{ marginTop: 4 }}>🩷 Women Only</Badge>}
      </div>
    </div>

    <div style={{ background: T.bg, borderRadius: T.radiusSm, padding: "10px 12px", marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.green }} />
          <div style={{ width: 1, height: 20, background: T.border, margin: "2px 0" }} />
          <div style={{ width: 8, height: 8, borderRadius: 2, background: T.red }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{ride.from}</div>
          <div style={{ fontSize: 11, color: T.textLight, margin: "6px 0" }}>via {ride.via || "Direct Route"} • {ride.eta}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{ride.to}</div>
        </div>
      </div>
    </div>

    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
      <Badge color={T.textMid}>⏰ {ride.time}</Badge>
      <Badge color={T.textMid}>💺 {ride.seats} seats</Badge>
      {ride.ac && <Badge color={T.blue}>❄️ AC</Badge>}
      {ride.recurring && <Badge color={T.gold}>🔁 {ride.recurring}</Badge>}
    </div>

    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
      {ride.badges.map(b => <VerifiedBadge key={b} type={b} />)}
    </div>

    <div style={{ fontSize: 11, color: T.textLight, marginBottom: 10 }}>🚗 {ride.car} • {ride.plate}</div>

    <Btn full small style={{ borderRadius: T.radiusSm }}>Request Seat</Btn>
  </Card>
);

// Ride Detail Screen
const RideDetailScreen = ({ setScreen }) => {
  const ride = RIDES[0];
  const [requested, setRequested] = useState(false);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.bg, overflow: "hidden" }}>
      {/* Map Placeholder */}
      <div style={{ height: 200, background: `linear-gradient(135deg, #1a3a2e 0%, #0D5C3A 100%)`, position: "relative", flexShrink: 0 }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.6)" }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🗺️</div>
            <div style={{ fontSize: 12 }}>Route: DHA Phase 5 → Blue Area</div>
          </div>
        </div>
        {/* Route dots */}
        {[{ l: "20%", t: "40%", c: T.green }, { l: "50%", t: "55%", c: T.gold }, { l: "80%", t: "35%", c: T.red }].map((d, i) => (
          <div key={i} style={{ position: "absolute", left: d.l, top: d.t, width: 12, height: 12, borderRadius: "50%", background: d.c, border: "2px solid white", boxShadow: "0 2px 6px rgba(0,0,0,0.3)" }} />
        ))}
        <button onClick={() => setScreen("home")} style={{ position: "absolute", top: 12, left: 12, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
        <div style={{ position: "absolute", bottom: 12, right: 12 }}>
          <Badge color={T.green} bg="rgba(255,255,255,0.9)">⏱ 45 min ride</Badge>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
        {/* Driver Card */}
        <Card style={{ marginTop: -20, marginBottom: 16, position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Avatar name={ride.driver} size={52} verified />
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: T.text }}>{ride.driver}</div>
                <StarRating rating={ride.rating} size={13} />
                <div style={{ fontSize: 12, color: T.textLight, marginTop: 2 }}>{ride.rides} completed rides</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: T.green }}>Rs {ride.price}</div>
              <div style={{ fontSize: 11, color: T.textLight }}>cost share</div>
            </div>
          </div>

          <Divider />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {ride.badges.map(b => <VerifiedBadge key={b} type={b} />)}
          </div>
        </Card>

        {/* Route Details */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 12 }}>Route Details</div>
          {[
            { icon: "🟢", label: ride.from, sub: "Pickup Point", time: "8:00 AM" },
            { icon: "🟡", label: "Faizabad Interchange", sub: "Midpoint stop", time: "8:20 AM" },
            { icon: "🔴", label: ride.to, sub: "Drop-off", time: "8:45 AM" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: i < 2 ? 16 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontSize: 14 }}>{s.icon}</span>
                {i < 2 && <div style={{ width: 1, height: 24, background: T.border, margin: "4px 0" }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{s.label}</div>
                <div style={{ fontSize: 11, color: T.textLight }}>{s.sub}</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.textMid }}>{s.time}</div>
            </div>
          ))}
        </Card>

        {/* Vehicle Info */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 12 }}>Vehicle</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Car", val: ride.car }, { label: "Plate", val: ride.plate },
              { label: "Seats Left", val: `${ride.seats} of 3` }, { label: "AC", val: ride.ac ? "Yes ❄️" : "No" },
            ].map(v => (
              <div key={v.label} style={{ background: T.bg, borderRadius: T.radiusSm, padding: "10px 12px" }}>
                <div style={{ fontSize: 11, color: T.textLight, marginBottom: 3 }}>{v.label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{v.val}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Trust Scores */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 12 }}>Trust Scores</div>
          {[
            { label: "Punctuality", score: 97, color: T.green },
            { label: "Safe Driving", score: 95, color: T.blue },
            { label: "Cleanliness", score: 92, color: T.gold },
            { label: "Communication", score: 98, color: T.green },
          ].map(s => (
            <div key={s.label} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: T.textMid }}>{s.label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.score}%</span>
              </div>
              <div style={{ height: 6, background: T.border, borderRadius: 3 }}>
                <div style={{ height: "100%", width: `${s.score}%`, background: s.color, borderRadius: 3, transition: "width 1s ease" }} />
              </div>
            </div>
          ))}
        </Card>

        {/* Actions */}
        {!requested ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Btn full onClick={() => setRequested(true)} icon="🚗">Request to Join</Btn>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn variant="ghost" full small icon="💬">Message Driver</Btn>
              <Btn variant="ghost" full small icon="📤">Share Ride</Btn>
            </div>
          </div>
        ) : (
          <div style={{ background: T.greenLight, border: `2px solid ${T.green}`, borderRadius: T.radius, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>✅</div>
            <div style={{ fontWeight: 700, color: T.green, fontSize: 16 }}>Request Sent!</div>
            <div style={{ color: T.textMid, fontSize: 13, marginTop: 4 }}>Ahmed will confirm your ride shortly.</div>
          </div>
        )}
      </div>
    </div>
  );
};

// Driver Dashboard
const DriverDashboardScreen = () => {
  const [activeRide, setActiveRide] = useState(false);

  const stats = [
    { label: "This Month", val: "Rs 4,200", icon: "💰", color: T.green },
    { label: "Rides Done", val: "23", icon: "🚗", color: T.blue },
    { label: "Trust Score", val: "97%", icon: "⭐", color: T.gold },
    { label: "CO₂ Saved", val: "18 kg", icon: "🌿", color: T.green },
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.bg, overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg, #064D2C, ${T.blue}80)`, padding: "24px 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>Driver Mode</div>
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>Ahmed Hassan</div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: T.radiusFull, padding: "6px 14px", cursor: "pointer" }}>
              <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>🟢 Active</span>
            </div>
            <Avatar name="AH" size={40} verified />
          </div>
        </div>

        {/* Today's Ride */}
        {!activeRide ? (
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: T.radius, padding: 16, marginBottom: 0 }}>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginBottom: 4 }}>Today's Ride</div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>DHA Phase 5 → Blue Area</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 2 }}>8:00 AM • 3 riders confirmed</div>
            <div style={{ marginTop: 10 }}>
              <Btn small style={{ background: "#fff", color: T.green }} onClick={() => setActiveRide(true)}>Start Ride →</Btn>
            </div>
          </div>
        ) : (
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: T.radius, padding: 16, border: `1px solid rgba(255,255,255,0.3)` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Badge color="#fff" bg="rgba(255,255,255,0.2)" style={{ marginBottom: 6 }}>🔴 Live Trip</Badge>
                <div style={{ color: "#fff", fontWeight: 700 }}>En route to Blue Area</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>ETA: 22 min • 3 riders aboard</div>
              </div>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: T.red, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, cursor: "pointer", boxShadow: "0 0 0 4px rgba(255,0,0,0.3)" }}>🆘</div>
            </div>
          </div>
        )}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 80px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {stats.map(s => (
            <Card key={s.label} style={{ padding: "14px" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 11, color: T.textLight }}>{s.label}</div>
            </Card>
          ))}
        </div>

        {/* Upcoming Requests */}
        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 12 }}>Ride Requests</div>
        {[
          { name: "Zara Ahmed", from: "DHA Phase 5", badge: "university", rating: 4.8 },
          { name: "Bilal Khan", from: "DHA Phase 6", badge: "company", rating: 4.6 },
        ].map((r, i) => (
          <Card key={i} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
              <Avatar name={r.name} size={42} verified />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: T.text }}>{r.name}</div>
                <StarRating rating={r.rating} size={11} />
                <div style={{ fontSize: 11, color: T.textLight }}>{r.from}</div>
              </div>
              <VerifiedBadge type={r.badge} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant="secondary" small full>Accept ✓</Btn>
              <Btn variant="ghost" small full>Decline</Btn>
            </div>
          </Card>
        ))}

        {/* Create Ride */}
        <Card style={{ marginTop: 8, background: `linear-gradient(135deg, ${T.green}10, ${T.blue}08)`, border: `1.5px dashed ${T.green}40`, cursor: "pointer", textAlign: "center", padding: "20px" }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>➕</div>
          <div style={{ fontWeight: 700, color: T.green, fontSize: 14 }}>Create a New Ride</div>
          <div style={{ fontSize: 12, color: T.textMid, marginTop: 4 }}>Set your route, time & seats</div>
        </Card>
      </div>
    </div>
  );
};

// Live Trip Screen (Active ride tracking)
const LiveTripScreen = ({ setScreen }) => {
  const [sosActive, setSosActive] = useState(false);
  const [shared, setShared] = useState(false);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#0D1F17", overflow: "hidden" }}>
      {/* Map bg */}
      <div style={{ flex: 1, position: "relative", background: "linear-gradient(180deg, #0D2416 0%, #0A1C10 100%)" }}>
        {/* Grid lines simulating map */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.15 }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${i * 14}%`, height: 1, background: T.green }} />
          ))}
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: `${i * 20}%`, width: 1, background: T.green }} />
          ))}
        </div>

        {/* Route line */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <polyline points="80,320 160,240 260,180 340,120" fill="none" stroke={T.green} strokeWidth="3" strokeDasharray="8 4" />
        </svg>

        {/* Driver car */}
        <div style={{ position: "absolute", left: "42%", top: "35%", transform: "translate(-50%,-50%)" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: `0 0 0 8px ${T.greenGlow}`, animation: "pulse 2s infinite" }}>🚗</div>
        </div>
        {/* Destination */}
        <div style={{ position: "absolute", right: "12%", top: "22%" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.red, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: "0 4px 12px rgba(192,57,43,0.4)" }}>📍</div>
        </div>

        {/* Top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => setScreen("home")} style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", cursor: "pointer", fontSize: 16 }}>←</button>
          <Badge color={T.green} bg="rgba(0,0,0,0.5)">🔴 LIVE TRACKING</Badge>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📡</div>
        </div>
      </div>

      {/* Bottom Panel */}
      <div style={{ background: T.white, borderRadius: "20px 20px 0 0", padding: "20px 20px 8px", boxShadow: "0 -8px 32px rgba(0,0,0,0.2)" }}>
        {/* ETA Card */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: T.textLight, marginBottom: 2 }}>En route to</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>Blue Area, Islamabad</div>
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <Badge color={T.green}>🕐 22 min</Badge>
              <Badge color={T.textMid}>📍 8.2 km away</Badge>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: T.textLight }}>Driver</div>
            <div style={{ fontWeight: 700, fontSize: 14, color: T.text }}>Ahmed</div>
            <div style={{ fontSize: 11, color: T.textLight }}>ISB-4421</div>
          </div>
        </div>

        <Divider />

        {/* Riders */}
        <div style={{ display: "flex", gap: -8, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: T.textMid, marginRight: 8, alignSelf: "center" }}>Riders:</div>
          {["ZA", "BK", "MR"].map((r, i) => (
            <div key={i} style={{ marginLeft: i > 0 ? -6 : 0, zIndex: 3 - i }}>
              <Avatar name={r} size={28} />
            </div>
          ))}
          <div style={{ marginLeft: 8, alignSelf: "center", fontSize: 12, color: T.textLight }}>+you aboard</div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
          <button onClick={() => setShared(!shared)} style={{
            padding: "10px 8px", borderRadius: T.radiusSm, border: `1.5px solid ${shared ? T.green : T.border}`,
            background: shared ? T.greenLight : T.white, cursor: "pointer", fontFamily: "inherit",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          }}>
            <span style={{ fontSize: 18 }}>📤</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: shared ? T.green : T.textMid }}>
              {shared ? "Sharing" : "Share Trip"}
            </span>
          </button>
          <button style={{ padding: "10px 8px", borderRadius: T.radiusSm, border: `1.5px solid ${T.border}`, background: T.white, cursor: "pointer", fontFamily: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 18 }}>💬</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: T.textMid }}>Chat</span>
          </button>
          <button style={{ padding: "10px 8px", borderRadius: T.radiusSm, border: `1.5px solid ${T.border}`, background: T.white, cursor: "pointer", fontFamily: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 18 }}>📞</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: T.textMid }}>Call</span>
          </button>
        </div>

        {/* SOS Button */}
        {!sosActive ? (
          <button
            onClick={() => setSosActive(true)}
            style={{
              width: "100%", padding: "14px", background: T.red, color: "#fff", border: "none",
              borderRadius: T.radius, fontSize: 16, fontWeight: 800, cursor: "pointer",
              fontFamily: "inherit", boxShadow: `0 4px 16px ${T.red}50`,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            }}>
            🆘 SOS — Emergency Alert
          </button>
        ) : (
          <div style={{ background: T.redLight, border: `2px solid ${T.red}`, borderRadius: T.radius, padding: "14px", textAlign: "center" }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>🚨</div>
            <div style={{ fontWeight: 800, color: T.red }}>SOS ACTIVATED</div>
            <div style={{ fontSize: 12, color: T.textMid, marginTop: 4 }}>Emergency contacts notified. Location shared. Authorities alerted.</div>
          </div>
        )}
      </div>
    </div>
  );
};

// Wallet / Payments Screen
const WalletScreen = () => {
  const [tab, setTab] = useState("history");

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.bg, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, #064D2C, ${T.green})`, padding: "24px 20px 28px" }}>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginBottom: 4 }}>SafarSaath Wallet</div>
        <div style={{ color: "#fff", fontSize: 36, fontWeight: 800, letterSpacing: -1 }}>Rs 2,750</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2 }}>Available Balance</div>
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <Btn small style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }} icon="➕">Add Money</Btn>
          <Btn small style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }} icon="↗️">Withdraw</Btn>
          <Btn small style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }} icon="📋">Statement</Btn>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 80px" }}>
        {/* Payment Methods */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 12 }}>Payment Methods</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { icon: "💚", name: "Easypaisa", sub: "Linked: 0312-XXXXXXX", active: true },
              { icon: "🎵", name: "JazzCash", sub: "Link your account", active: false },
              { icon: "🏦", name: "Bank Transfer", sub: "Add bank account", active: false },
              { icon: "💵", name: "Cash on Ride", sub: "Pay driver directly", active: true },
            ].map(m => (
              <div key={m.name} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 12px", background: m.active ? T.greenLight : T.bg, borderRadius: T.radiusSm, border: `1px solid ${m.active ? T.green + "30" : T.border}` }}>
                <span style={{ fontSize: 22 }}>{m.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: T.textLight }}>{m.sub}</div>
                </div>
                {m.active ? <Badge color={T.green}>Active</Badge> : <Btn variant="secondary" small>Link</Btn>}
              </div>
            ))}
          </div>
        </Card>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, background: T.border, borderRadius: T.radiusSm, padding: 3, marginBottom: 14 }}>
          {["history", "pending"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "8px", background: tab === t ? T.white : "transparent",
              border: "none", borderRadius: 7, color: tab === t ? T.text : T.textLight,
              fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              boxShadow: tab === t ? T.shadow : "none", transition: "all 0.2s",
              textTransform: "capitalize",
            }}>{t === "history" ? "Transaction History" : "Pending"}</button>
          ))}
        </div>

        {/* Transactions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {WALLET_TXN.map(t => (
            <Card key={t.id} style={{ padding: "12px 14px" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: t.type === "credit" ? T.greenLight : T.redLight,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, color: t.type === "credit" ? T.green : T.red,
                }}>{t.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{t.label}</div>
                  {t.sub && <div style={{ fontSize: 11, color: T.textLight, marginTop: 2 }}>{t.sub}</div>}
                  <div style={{ fontSize: 11, color: T.textLight, marginTop: 2 }}>{t.date}</div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: t.type === "credit" ? T.green : T.red }}>
                  {t.type === "credit" ? "+" : ""}Rs {Math.abs(t.amount)}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Messages Screen
const MessagesScreen = () => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.bg, overflow: "hidden" }}>
    <div style={{ background: T.white, padding: "20px 20px 12px", borderBottom: `1px solid ${T.border}` }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: T.text, marginBottom: 12 }}>Messages</div>
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>🔍</span>
        <input placeholder="Search conversations..." style={{ width: "100%", padding: "10px 12px 10px 36px", border: `1.5px solid ${T.border}`, borderRadius: T.radiusFull, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box", background: T.bg }} />
      </div>
    </div>

    <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 80px" }}>
      {MESSAGES.map(m => (
        <div key={m.id} style={{ display: "flex", gap: 12, padding: "14px 0", borderBottom: `1px solid ${T.border}`, cursor: "pointer" }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${T.green}, ${T.blue})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: typeof m.avatar === "string" && m.avatar.length > 2 ? 20 : 16, color: "#fff", fontWeight: 700 }}>
              {m.avatar}
            </div>
            {m.unread > 0 && <div style={{ position: "absolute", top: -2, right: -2, width: 18, height: 18, borderRadius: "50%", background: T.green, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", fontWeight: 700 }}>{m.unread}</div>}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: T.text }}>{m.user}</div>
              <div style={{ fontSize: 11, color: T.textLight }}>{m.time}</div>
            </div>
            <div style={{ fontSize: 13, color: m.unread > 0 ? T.textMid : T.textLight, fontWeight: m.unread > 0 ? 600 : 400 }}>{m.text}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Profile Screen
const ProfileScreen = () => {
  const badges = ["cnic", "driver", "company"];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.bg, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${T.green}, #064D2C)`, padding: "32px 20px 20px", textAlign: "center" }}>
        <div style={{ position: "relative", display: "inline-block", marginBottom: 10 }}>
          <Avatar name="Ahmed Hassan" size={72} verified />
        </div>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 20 }}>Ahmed Hassan</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginBottom: 8 }}>Member since 2023 • Islamabad</div>
        <StarRating rating={4.9} size={14} />
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 10, flexWrap: "wrap" }}>
          {badges.map(b => <VerifiedBadge key={b} type={b} />)}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 80px" }}>
        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Rides", val: "287" }, { label: "Rating", val: "4.9" }, { label: "Trust", val: "97%" },
          ].map(s => (
            <Card key={s.label} style={{ textAlign: "center", padding: "14px 8px" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: T.green }}>{s.val}</div>
              <div style={{ fontSize: 11, color: T.textLight }}>{s.label}</div>
            </Card>
          ))}
        </div>

        {/* Trust Breakdown */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 12 }}>Trust Breakdown</div>
          {[
            { label: "Punctuality Score", val: "97%", color: T.green },
            { label: "Safe Driving", val: "95%", color: T.blue },
            { label: "Ride Completion", val: "99%", color: T.green },
            { label: "Cancellation Rate", val: "1%", color: T.gold },
          ].map(s => (
            <div key={s.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: T.textMid }}>{s.label}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.val}</span>
            </div>
          ))}
        </Card>

        {/* Vehicle Info */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 12 }}>Vehicle Details</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { l: "Car", v: "Toyota Corolla 2020" }, { l: "Plate", v: "ISB-4421" },
              { l: "Color", v: "White" }, { l: "AC", v: "Yes ❄️" },
            ].map(v => (
              <div key={v.l} style={{ background: T.bg, borderRadius: T.radiusSm, padding: 10 }}>
                <div style={{ fontSize: 11, color: T.textLight }}>{v.l}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.text, marginTop: 2 }}>{v.v}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Settings */}
        <Card>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 12 }}>Settings</div>
          {[
            { icon: "🔔", label: "Notifications" }, { icon: "🌐", label: "Language (English)" },
            { icon: "🌙", label: "Dark Mode" }, { icon: "🛡️", label: "Privacy & Safety" },
            { icon: "💬", label: "Help & Support" }, { icon: "🚪", label: "Logout", danger: true },
          ].map(s => (
            <div key={s.label} style={{ display: "flex", gap: 14, alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${T.border}`, cursor: "pointer" }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <span style={{ flex: 1, fontSize: 14, color: s.danger ? T.red : T.text, fontWeight: s.danger ? 700 : 400 }}>{s.label}</span>
              {!s.danger && <span style={{ color: T.textLight }}>›</span>}
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// Community Screen
const CommunityScreen = () => {
  const groups = [
    { name: "FAST University Lahore", members: 234, icon: "🎓", tag: "university", verified: true, rides: 45 },
    { name: "Packages Limited Carpool", members: 87, icon: "🏢", tag: "company", verified: true, rides: 22 },
    { name: "DHA Phase 5 Residents", members: 412, icon: "🏘️", tag: "community", verified: false, rides: 78 },
    { name: "Islamabad Women Riders", members: 156, icon: "🩷", tag: "women", verified: true, rides: 31 },
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.bg, overflow: "hidden" }}>
      <div style={{ background: T.white, padding: "20px 20px 16px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: T.text, marginBottom: 4 }}>Carpool Groups</div>
        <div style={{ fontSize: 13, color: T.textMid }}>Join trusted communities for safer rides</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 80px" }}>
        {/* Create Group */}
        <Card style={{ marginBottom: 16, background: `linear-gradient(135deg, ${T.green}15, ${T.blue}08)`, border: `1.5px dashed ${T.green}40`, cursor: "pointer" }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: T.radiusSm, background: T.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>➕</div>
            <div>
              <div style={{ fontWeight: 700, color: T.green, fontSize: 14 }}>Create a Group</div>
              <div style={{ fontSize: 12, color: T.textMid }}>Start a carpool for your university, company, or community</div>
            </div>
          </div>
        </Card>

        <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 12 }}>Nearby Groups</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {groups.map(g => (
            <Card key={g.name} hover style={{ cursor: "pointer" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: T.radiusSm, background: T.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{g.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 3 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: T.text }}>{g.name}</div>
                    {g.verified && <span style={{ fontSize: 12, color: T.green }}>✓</span>}
                  </div>
                  <div style={{ fontSize: 12, color: T.textLight }}>{g.members} members • {g.rides} daily rides</div>
                  <div style={{ marginTop: 6 }}>
                    <VerifiedBadge type={g.tag === "community" ? "cnic" : g.tag === "women" ? "women" : g.tag} />
                  </div>
                </div>
                <Btn variant="secondary" small>Join</Btn>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Bottom Navigation ────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: "home", icon: "🏠", label: "Home" },
  { key: "rideDetail", icon: "🗺️", label: "Explore" },
  { key: "liveTrip", icon: "🚗", label: "Trip", accent: true },
  { key: "messages", icon: "💬", label: "Chat" },
  { key: "profile", icon: "👤", label: "Profile" },
];

const BottomNav = ({ screen, setScreen }) => (
  <div style={{
    position: "absolute", bottom: 0, left: 0, right: 0,
    background: T.white, borderTop: `1px solid ${T.border}`,
    display: "flex", padding: "8px 0 12px",
    boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
    zIndex: 100,
  }}>
    {NAV_ITEMS.map(n => (
      <button key={n.key} onClick={() => setScreen(n.key)} style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
        background: "none", border: "none", cursor: "pointer", padding: "4px 0",
        fontFamily: "inherit",
      }}>
        {n.accent ? (
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: screen === n.key ? `linear-gradient(135deg, ${T.green}, #064D2C)` : T.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginTop: -18, boxShadow: `0 4px 16px ${T.greenGlow}` }}>
            {n.icon}
          </div>
        ) : (
          <span style={{ fontSize: 20, opacity: screen === n.key ? 1 : 0.5 }}>{n.icon}</span>
        )}
        <span style={{ fontSize: 10, fontWeight: 600, color: screen === n.key ? T.green : T.textLight }}>{n.label}</span>
      </button>
    ))}
  </div>
);

// ─── Admin Panel ──────────────────────────────────────────────────────────────
const AdminPanel = ({ setScreen }) => {
  const metrics = [
    { label: "Total Users", val: "12,847", change: "+8.2%", icon: "👥", color: T.blue },
    { label: "Active Rides Today", val: "1,234", change: "+12%", icon: "🚗", color: T.green },
    { label: "Pending Verifications", val: "47", change: "-5", icon: "🪪", color: T.gold },
    { label: "Safety Reports", val: "3", change: "Urgent", icon: "⚠️", color: T.red },
    { label: "Revenue (May)", val: "Rs 384K", change: "+22%", icon: "💰", color: T.green },
    { label: "Completion Rate", val: "94.7%", change: "+1.2%", icon: "✅", color: T.green },
  ];

  const pendingUsers = [
    { name: "Sara Malik", type: "Driver License", time: "2h ago" },
    { name: "Imran Shah", type: "CNIC Verification", time: "3h ago" },
    { name: "Nadia Hussain", type: "University Badge", time: "5h ago" },
  ];

  return (
    <div style={{ minHeight: "100%", background: "#0F1923", padding: "0 0 40px", fontFamily: "inherit" }}>
      {/* Admin Header */}
      <div style={{ background: "linear-gradient(135deg, #1a2a1f, #0D3320)", padding: "24px 24px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: T.green, fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Admin Dashboard</div>
            <div style={{ color: "#fff", fontSize: 24, fontWeight: 800 }}>🚘 SafarSaath Control</div>
          </div>
          <button onClick={() => setScreen("home")} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: "8px 16px", borderRadius: T.radiusFull, cursor: "pointer", fontSize: 12, fontFamily: "inherit", fontWeight: 600 }}>← App View</button>
        </div>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        {/* Metrics Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {metrics.map(m => (
            <div key={m.label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: T.radius, padding: "14px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontSize: 20 }}>{m.icon}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: m.change.includes("+") ? T.green : m.change === "Urgent" ? T.red : T.textLight, background: "rgba(255,255,255,0.07)", padding: "2px 6px", borderRadius: T.radiusFull }}>{m.change}</span>
              </div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 20, marginTop: 8 }}>{m.val}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 2 }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Pending Verifications */}
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: T.radius, padding: "16px", marginBottom: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 12, display: "flex", justifyContent: "space-between" }}>
            <span>Pending Verifications</span>
            <span style={{ color: T.gold, fontSize: 13 }}>{pendingUsers.length} pending</span>
          </div>
          {pendingUsers.map((u, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: i < pendingUsers.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <Avatar name={u.name} size={38} />
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{u.name}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{u.type} • {u.time}</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button style={{ background: T.green, border: "none", color: "#fff", padding: "5px 12px", borderRadius: T.radiusFull, cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "inherit" }}>Approve</button>
                <button style={{ background: "rgba(192,57,43,0.2)", border: "none", color: T.red, padding: "5px 12px", borderRadius: T.radiusFull, cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "inherit" }}>Reject</button>
              </div>
            </div>
          ))}
        </div>

        {/* Active Rides Map */}
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: T.radius, padding: "16px", marginBottom: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Live Ride Monitor</div>
          <div style={{ height: 120, background: "rgba(0,0,0,0.3)", borderRadius: T.radiusSm, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
            {/* Grid */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.2 }}>
              {[...Array(5)].map((_, i) => <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${i * 25}%`, height: 1, background: T.green }} />)}
              {[...Array(6)].map((_, i) => <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: `${i * 20}%`, width: 1, background: T.green }} />)}
            </div>
            {/* Live dots */}
            {[{ l: "20%", t: "40%" }, { l: "45%", t: "55%" }, { l: "70%", t: "30%" }, { l: "60%", t: "70%" }].map((d, i) => (
              <div key={i} style={{ position: "absolute", left: d.l, top: d.t, width: 10, height: 10, borderRadius: "50%", background: T.green, boxShadow: `0 0 8px ${T.green}` }} />
            ))}
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>1,234 active rides across Pakistan</div>
          </div>
        </div>

        {/* Safety Reports */}
        <div style={{ background: "rgba(192,57,43,0.1)", borderRadius: T.radius, padding: "16px", border: "1px solid rgba(192,57,43,0.25)" }}>
          <div style={{ color: T.red, fontWeight: 700, fontSize: 15, marginBottom: 10 }}>⚠️ Safety Reports (3 Urgent)</div>
          {[
            { route: "Lahore - Johar Town", type: "Route deviation", time: "8 min ago" },
            { route: "Karachi - DHA Phase 6", type: "Harassment report", time: "23 min ago" },
            { route: "Islamabad - F-10", type: "SOS triggered", time: "45 min ago" },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.red, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>{r.type}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{r.route} • {r.time}</div>
              </div>
              <button style={{ background: T.red, border: "none", color: "#fff", padding: "5px 10px", borderRadius: T.radiusFull, cursor: "pointer", fontSize: 10, fontFamily: "inherit", fontWeight: 700 }}>View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function SafarSaathApp() {
  const [appState, setAppState] = useState("splash"); // splash | auth | app | admin
  const [screen, setScreen] = useState("home");

  const handleLogin = () => { setAppState("app"); setScreen("home"); };

  if (appState === "splash") return (
    <AppShell>
      <SplashScreen onNext={() => setAppState("auth")} />
    </AppShell>
  );

  if (appState === "auth") return (
    <AppShell>
      <LoginScreen onLogin={handleLogin} />
    </AppShell>
  );

  if (appState === "admin") return (
    <AppShell scrollable>
      <AdminPanel setScreen={() => setAppState("app")} />
    </AppShell>
  );

  // Main App
  const screens = {
    home: <HomeScreen setScreen={setScreen} />,
    rideDetail: <RideDetailScreen setScreen={setScreen} />,
    liveTrip: <LiveTripScreen setScreen={setScreen} />,
    driver: <DriverDashboardScreen />,
    wallet: <WalletScreen />,
    messages: <MessagesScreen />,
    community: <CommunityScreen />,
    profile: <ProfileScreen />,
  };

  return (
    <AppShell>
      <div style={{ height: "100%", position: "relative" }}>
        {screens[screen] || screens.home}
        <BottomNav screen={screen} setScreen={setScreen} />
      </div>
      {/* Admin Button */}
      <button
        onClick={() => setAppState("admin")}
        style={{ position: "fixed", top: 12, right: 12, background: "rgba(0,0,0,0.7)", border: "none", color: "#fff", padding: "6px 12px", borderRadius: T.radiusFull, cursor: "pointer", fontSize: 11, fontWeight: 700, zIndex: 1000, backdropFilter: "blur(4px)", fontFamily: "inherit" }}>
        ⚙️ Admin
      </button>
    </AppShell>
  );
}

// Phone shell wrapper
// On a real device (native app or narrow/touch screen) this renders full-screen
// with no fake mockup frame. On a wide desktop browser it shows the original
// "phone preview" mockup with the sidebar, for design/demo purposes.
const isNativeOrMobile = () => {
  if (typeof window === "undefined") return false;
  const hasCapacitor = !!window.Capacitor;
  const isNarrow = window.innerWidth <= 480;
  return hasCapacitor || isNarrow;
};

const AppShell = ({ children, scrollable }) => {
  const [mobile, setMobile] = useState(isNativeOrMobile());

  useEffect(() => {
    const onResize = () => setMobile(isNativeOrMobile());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (mobile) {
    return (
      <div style={{
        width: "100%", height: "100vh",
        background: "#F4F7F5",
        fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}>
        <style>{`
          html, body, #root { width: 100%; height: 100%; margin: 0; padding: 0; background: #F4F7F5; }
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          ::-webkit-scrollbar { width: 0; height: 0; }
          @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(10,110,63,0.4); } 50% { box-shadow: 0 0 0 12px rgba(10,110,63,0); } }
        `}</style>
        <div style={{ height: "100%", overflow: scrollable ? "auto" : "hidden", position: "relative" }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#0A0F0C", padding: "20px", fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(10,110,63,0.4); } 50% { box-shadow: 0 0 0 12px rgba(10,110,63,0); } }
      `}</style>
      <div style={{
        width: "100%", maxWidth: 390,
        height: scrollable ? "auto" : "min(780px, 90vh)",
        borderRadius: 40,
        overflow: scrollable ? "auto" : "hidden",
        boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)",
        position: "relative",
        background: "#F4F7F5",
      }}>
        {/* Status bar */}
        <div style={{ background: "#0A6E3F", padding: "10px 24px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>9:41</span>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ color: "#fff", fontSize: 11 }}>📶</span>
            <span style={{ color: "#fff", fontSize: 11 }}>🔋</span>
          </div>
        </div>
        <div style={{ height: scrollable ? "auto" : "calc(100% - 32px)", overflow: scrollable ? "visible" : "hidden", position: "relative" }}>
          {children}
        </div>
      </div>

      {/* Desktop nav panel */}
      <div style={{ marginLeft: 32, display: "flex", flexDirection: "column", gap: 12, maxWidth: 220 }}>
        <div style={{ color: "#fff", fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>🚘 SafarSaath</div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.6 }}>Pakistan's trusted carpooling platform</div>
        <div style={{ height: 1, background: "rgba(255,255,255,0.1)" }} />
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5 }}>Navigate Demo</div>
      </div>
    </div>
  );
};
