/* Shared sidebar for "Basics in Mass Spectrometry".
   Maintained in ONE place. Each page includes this file and calls
   renderMsNav('<page-id>') to mark the active item.

   Add a new page = add one line to MS_NAV below. */

const MS_NAV = [
  {
    group: 'Ionization',
    items: [
      { id: 'esi',   title: 'ESI',   href: '1-1-esi.html' },
      { id: 'maldi', title: 'MALDI', href: '1-2-maldi.html' },
      { id: 'ei',    title: 'EI',    href: '1-3-ei.html' },
    ],
  },
  {
    group: 'Mass Analyzer',
    items: [
      { id: 'quadrupole', title: 'Quadrupole',       href: '2-1-quadrupole.html' },
      { id: 'tof',        title: 'Time-of-Flight',   href: '2-2-tof.html' },
      { id: 'ion-trap',   title: 'Ion Trap',         href: '2-3-ion-trap.html' },
      { id: 'sector',     title: 'Magnetic Sector',  href: '2-4-sector.html' },
      { id: 'ft-icr',     title: 'FT-ICR',           href: '2-5-ft-icr.html' },
      { id: 'orbitrap',   title: 'Orbitrap',         href: '2-6-orbitrap.html' },
    ],
  },
  {
    group: 'Detector',
    items: [
      { id: 'electron-multiplier', title: 'Electron Multiplier', href: '3-1-electron-multiplier.html' },
      { id: 'mcp',                 title: 'MCP',                 href: '3-2-mcp.html' },
      { id: 'faraday-cup',         title: 'Faraday Cup',         href: '3-3-faraday-cup.html' },
    ],
  },
];

function renderMsNav(activeId) {
  const groupsHtml = MS_NAV.map(g => {
    const items = g.items.map(it => {
      const active = it.id === activeId ? ' class="active"' : '';
      return `<li><a href="${it.href}"${active}>${it.title}</a></li>`;
    }).join('');
    return `<h3>${g.group}</h3><ul>${items}</ul>`;
  }).join('');

  const html = `
    <a href="0-ms-basics-index.html" style="font-family:var(--serif);font-weight:600;font-size:16px;color:var(--text);text-decoration:none;display:block;margin-bottom:1rem;">
      Basics in Mass Spectrometry
    </a>
    ${groupsHtml}
    <div class="ms-back">
      <a href="../../ns_index.html" style="color:var(--ms-accent);text-decoration:none;">← Back to NS Notes</a>
    </div>`;

  const el = document.getElementById('ms-sidebar');
  if (el) el.innerHTML = html;
}

/* mobile toggle */
function toggleMsNav() {
  const el = document.getElementById('ms-sidebar');
  if (el) el.classList.toggle('open');
}
