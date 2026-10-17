
import { useState } from "react";
import {
  ShieldCheck,
  LayoutDashboard,
  Network,
  Fingerprint,
  LockKeyhole,
  Activity,
  Bell,
  Search,
  ShieldAlert,
  CheckCircle2,
  ArrowUpRight,
  Menu,
  RotateCcw,
} from "lucide-react";
import "./App.css";

const initialThreats = [
  { id: "TH-001", type: "Suspicious Login", organization: "Organization A", severity: "High", status: "Detected" },
  { id: "TH-002", type: "Malicious Traffic", organization: "Organization B", severity: "Critical", status: "Matched" },
  { id: "TH-003", type: "Unusual Port Activity", organization: "Organization A", severity: "Medium", status: "Detected" },
  { id: "TH-004", type: "Repeated Failed Requests", organization: "Organization B", severity: "High", status: "Shared" },
];

export default function App() {
  const [activePage, setActivePage] = useState("Overview");
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Threat Detection", icon: ShieldAlert },
    { name: "Privacy & Sharing", icon: LockKeyhole },
    { name: "Threat Matches", icon: Fingerprint },
  ];

  const threats = initialThreats.filter((threat) => {
    const text = `${threat.id} ${threat.type} ${threat.organization} ${threat.severity} ${threat.status}`.toLowerCase();

    return (
      text.includes(search.toLowerCase()) &&
      (severityFilter === "All" || threat.severity === severityFilter) &&
      (statusFilter === "All" || threat.status === statusFilter)
    );
  });

  const resetFilters = () => {
    setSearch("");
    setSeverityFilter("All");
    setStatusFilter("All");
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon"><ShieldCheck size={25} /></div>
          <div>
            <h2>TRUSTNET</h2>
            <span>COLLABORATIVE DEFENSE</span>
          </div>
        </div>

        <div className="nav-label">WORKSPACE</div>
        <nav>
          {navigation.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`nav-item ${activePage === name ? "active" : ""}`}
              onClick={() => {
                setActivePage(name);
                setMenuOpen(false);
              }}
            >
              <Icon size={19} />
              <span>{name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="secure-indicator">
            <span className="status-dot" />
            <div>
              <strong>System Status</strong>
              <p>Prototype interface</p>
            </div>
          </div>
          <p className="sidebar-footer">TRUSTNET · DATATHON</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>
          <div className="breadcrumb">
            Workspace <span>/</span> <strong>{activePage}</strong>
          </div>
          <div className="topbar-right">
            <span className="environment">
              <span className="status-dot" /> DEMO ENVIRONMENT
            </span>
            <button className="icon-button" aria-label="Notifications">
              <Bell size={19} />
            </button>
            <div className="avatar">TN</div>
          </div>
        </header>

        <div className="page-container">
          <section className="welcome-row">
            <div>
              <div className="eyebrow">
                <Activity size={15} /> CYBER THREAT INTELLIGENCE
              </div>
              <h1>{activePage}</h1>
              <p>Collaborative threat intelligence, with privacy at its core.</p>
            </div>
            <div className="protection-badge">
              <ShieldCheck size={18} /> Privacy-first workflow
            </div>
          </section>

          {activePage === "Overview" && (
            <>
              <section className="stats-grid">
                <StatCard icon={Network} label="Connected Organizations" value="02" note="Simulated participants" color="blue" />
                <StatCard icon={ShieldAlert} label="Threats Detected" value="04" note="Sample records" color="red" />
                <StatCard icon={Fingerprint} label="Threat Matches" value="01" note="Illustrative match" color="purple" />
                <StatCard icon={LockKeyhole} label="Privacy Checks" value="Demo" note="Not technically verified" color="green" />
              </section>

              <section className="content-grid">
                <div className="panel threat-panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Recent Threat Activity</h3>
                      <p>Illustrative security events from both organizations</p>
                    </div>
                    <button className="text-button" onClick={() => setActivePage("Threat Detection")}>
                      View all <ArrowUpRight size={15} />
                    </button>
                  </div>
                  <ThreatTable threats={initialThreats} />
                </div>

                <div className="panel collaboration-panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Collaboration Network</h3>
                      <p>Simulated participants</p>
                    </div>
                    <Network size={19} className="muted-icon" />
                  </div>

                  <Organization name="Organization A" />
                  <div className="connection-line">
                    <span />
                    <div><LockKeyhole size={15} /> Protected exchange demo</div>
                    <span />
                  </div>
                  <Organization name="Organization B" purple />

                  <div className="privacy-note">
                    <ShieldCheck size={18} />
                    <p>Intended workflow: exchange permitted threat representations, not original security logs.</p>
                  </div>
                </div>
              </section>

              <section className="panel workflow-panel">
                <div className="panel-heading">
                  <div>
                    <h3>How TRUSTNET Works</h3>
                    <p>Four stages of privacy-aware collaboration</p>
                  </div>
                </div>
                <div className="workflow-grid">
                  {[
                    { icon: Activity, title: "Local Detection", desc: "Analyze threats locally" },
                    { icon: LockKeyhole, title: "Privacy Filtering", desc: "Remove sensitive fields" },
                    { icon: Fingerprint, title: "Fingerprinting", desc: "Create shareable indicators" },
                    { icon: Network, title: "Threat Matching", desc: "Identify related patterns" },
                  ].map(({ icon: Icon, title, desc }, index) => (
                    <div className="workflow-step" key={title}>
                      <div className="workflow-icon"><Icon size={21} /></div>
                      <span className="step-number">STEP 0{index + 1}</span>
                      <h4>{title}</h4>
                      <p>{desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activePage === "Threat Detection" && (
            <section className="panel page-panel">
              <div className="panel-heading">
                <div>
                  <h3>Threat Detection Records</h3>
                  <p>Search and filter illustrative threat records.</p>
                </div>
                <span className="record-count">{threats.length} records</span>
              </div>

              <div className="filter-toolbar">
                <div className="search-box">
                  <Search size={18} />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search threats, IDs, organizations..."
                    aria-label="Search threats"
                  />
                </div>

                <select
                  className="filter-select"
                  value={severityFilter}
                  onChange={(event) => setSeverityFilter(event.target.value)}
                  aria-label="Filter by severity"
                >
                  <option value="All">All severities</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                </select>

                <select
                  className="filter-select"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  aria-label="Filter by status"
                >
                  <option value="All">All statuses</option>
                  <option value="Detected">Detected</option>
                  <option value="Matched">Matched</option>
                  <option value="Shared">Shared</option>
                </select>

                <button type="button" className="reset-button" onClick={resetFilters}>
                  <RotateCcw size={15} />
                  Reset
                </button>
              </div>

              <ThreatTable threats={threats} />
            </section>
          )}

          {activePage === "Privacy & Sharing" && (
            <section className="panel page-panel">
              <div className="panel-heading">
                <div>
                  <h3>Privacy & Sharing</h3>
                  <p>Illustrative data-handling policy for TRUSTNET.</p>
                </div>
                <LockKeyhole size={22} className="muted-icon" />
              </div>
              <div className="privacy-grid">
                <PrivacyItem title="Original security logs" status="Stay local" desc="Raw logs should remain with their source organization." />
                <PrivacyItem title="Direct identifiers" status="Remove or transform" desc="Exclude identities and sensitive internal details." />
                <PrivacyItem title="Threat representation" status="Review before sharing" desc="Share only approved fields needed for collaboration." />
                <PrivacyItem title="Privacy verification" status="Test required" desc="Inspect outgoing payloads for prohibited fields and leakage." />
              </div>
              <div className="notice">
                <ShieldAlert size={19} />
                <p>This is a frontend demonstration. These labels do not mean that privacy controls have been technically verified.</p>
              </div>
            </section>
          )}

          {activePage === "Threat Matches" && (
            <section className="panel page-panel">
              <div className="panel-heading">
                <div>
                  <h3>Cross-Organization Threat Matches</h3>
                  <p>Illustrative matching results for the prototype.</p>
                </div>
                <Fingerprint size={23} className="muted-icon" />
              </div>
              <div className="match-card">
                <div className="match-icon"><Fingerprint size={25} /></div>
                <div className="match-content">
                  <span className="match-label">EXAMPLE MATCH · TH-002</span>
                  <h3>Related malicious traffic pattern</h3>
                  <p>Organization B has a sample threat record. Connect your matching module to determine real cross-organization matches.</p>
                  <div className="match-organizations">
                    <span>Organization A</span>
                    <ArrowUpRight size={17} />
                    <span>Organization B</span>
                  </div>
                </div>
                <span className="severity critical">Critical</span>
              </div>
              <div className="notice">
                <Activity size={19} />
                <p>Matching is illustrative until connected to the team's backend.</p>
              </div>
            </section>
          )}

          <footer className="page-footer">
            <span>TRUSTNET <span className="footer-dot">•</span> Privacy-preserving threat intelligence</span>
            <span>Datathon prototype · Demo data</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

function Organization({ name, purple = false }) {
  return (
    <div className="organization">
      <div className={`org-icon ${purple ? "purple" : ""}`}><Network size={20} /></div>
      <div className="org-details">
        <strong>{name}</strong>
        <span>Local analysis node</span>
      </div>
      <span className="connected">DEMO</span>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, note, color }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}><Icon size={21} /></div>
      <span className="stat-label">{label}</span>
      <div className="stat-value">{value}</div>
      <span className="stat-note">{note}</span>
    </div>
  );
}

function ThreatTable({ threats }) {
  if (!threats.length) {
    return <p className="empty-state">No matching records found. Try changing the filters or click Reset.</p>;
  }

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>THREAT ID</th>
            <th>THREAT TYPE</th>
            <th>ORGANIZATION</th>
            <th>SEVERITY</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {threats.map((threat) => (
            <tr key={threat.id}>
              <td className="threat-id">{threat.id}</td>
              <td>{threat.type}</td>
              <td>{threat.organization}</td>
              <td><span className={`severity ${threat.severity.toLowerCase()}`}>{threat.severity}</span></td>
              <td><span className="status-label">{threat.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PrivacyItem({ title, status, desc }) {
  return (
    <div className="privacy-item">
      <div className="privacy-item-icon"><CheckCircle2 size={19} /></div>
      <div>
        <h4>{title}</h4>
        <span>{status}</span>
        <p>{desc}</p>
      </div>
    </div>
  );
}
