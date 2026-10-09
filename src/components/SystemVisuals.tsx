import type { PointerEvent } from 'react';

const pointerLight = (event: PointerEvent<HTMLDivElement>) => {
  if (event.pointerType === 'touch') return;
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    '--pointer-x',
    ((event.clientX - bounds.left) / bounds.width) * 100 + '%',
  );
  event.currentTarget.style.setProperty(
    '--pointer-y',
    ((event.clientY - bounds.top) / bounds.height) * 100 + '%',
  );
};

export function NetworkVisual() {
  return (
    <div
      className="network-visual"
      onPointerMove={pointerLight}
      aria-label="Diagram of a client connected to sync, API, data, and infrastructure services"
      role="img"
    >
      <div className="network-label top">
        SYSTEM MAP <span>LIVE ARCHITECTURE</span>
      </div>
      <svg
        className="network-lines"
        viewBox="0 0 600 600"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="network-stroke">
            <stop stopColor="#48d4be" />
            <stop offset="1" stopColor="#7083e8" />
          </linearGradient>
        </defs>
        <circle cx="300" cy="300" r="212" fill="none" stroke="#254942" strokeDasharray="2 9" />
        <circle cx="300" cy="300" r="137" fill="none" stroke="#254942" strokeDasharray="2 9" />
        <path
          className="network-path"
          d="M300 300 L154 188 M300 300 L445 161 M300 300 L452 407 M300 300 L160 421 M154 188 L445 161 M452 407 L160 421"
          fill="none"
          stroke="url(#network-stroke)"
          strokeWidth="1.4"
        />
        <circle
          className="pulse-core"
          cx="300"
          cy="300"
          r="71"
          fill="#0e2424"
          stroke="#4adac6"
          strokeWidth="1.5"
        />
        <circle cx="300" cy="300" r="52" fill="#102e2d" stroke="#416861" />
        <circle cx="154" cy="188" r="6" fill="#52dbc5" />
        <circle cx="445" cy="161" r="6" fill="#7e91ec" />
        <circle cx="452" cy="407" r="6" fill="#52dbc5" />
        <circle cx="160" cy="421" r="6" fill="#7e91ec" />
      </svg>
      <div className="network-center">
        <span>CORE</span>
        <strong>
          G<span>.</span>
        </strong>
        <small>SYSTEMS / 01</small>
      </div>
      <span className="network-node node-api">
        <b>01</b> API
      </span>
      <span className="network-node node-realtime">
        <b>02</b> REALTIME
      </span>
      <span className="network-node node-data">
        <b>03</b> DATA
      </span>
      <span className="network-node node-infra">
        <b>04</b> INFRA
      </span>
      <div className="network-label bottom">
        <span>DESIGNED TO CONNECT</span> ◉ 4 SERVICES ONLINE
      </div>
    </div>
  );
}

export function CodeVisual() {
  return (
    <div
      className="visual-frame code-visual"
      role="img"
      aria-label="CodeCollab architecture: Monaco editor and Yjs connect to sync service, Redis, Spring Boot, and MongoDB"
    >
      <div className="visual-topbar">
        <span>
          <i />
          <i />
          <i />
        </span>
        <span>ARCHITECTURE ILLUSTRATION</span>
        <span>⌘</span>
      </div>
      <div className="editor-layout">
        <div className="editor-files">
          <span>EXPLORER</span>
          <p>⌄ workspace</p>
          <p className="selected">◈ collaboration.ts</p>
          <p>◈ presence.ts</p>
          <p>◈ service.ts</p>
        </div>
        <div className="editor-code">
          <div className="editor-tab">
            collaboration.ts <span>×</span>
          </div>
          <div className="code-lines">
            <p>
              <b>01</b> <span className="syntax-violet">const</span> workspace ={' '}
              <span className="syntax-teal">createRoom</span>({'{'}
            </p>
            <p>
              <b>02</b> &nbsp; editor: <span className="syntax-gold">Monaco</span>,
            </p>
            <p>
              <b>03</b> &nbsp; sync: <span className="syntax-gold">Yjs</span>,
            </p>
            <p>
              <b>04</b> &nbsp; transport: <span className="syntax-gold">WebSocket</span>,
            </p>
            <p>
              <b>05</b> {'}'});
            </p>
            <p>
              <b>06</b>
            </p>
            <p>
              <b>07</b> <span className="syntax-violet">await</span> workspace.
              <span className="syntax-teal">connect</span>(); <span className="cursor-mark" />
            </p>
          </div>
          <div className="editor-avatars">
            <span>G</span>
            <span>A</span>
            <span>R</span>
            <small>presence layer</small>
          </div>
        </div>
      </div>
      <div className="visual-flow">
        <span>MONACO + YJS</span>
        <i>→</i>
        <span>SYNC SERVICE</span>
        <i>→</i>
        <span>REDIS</span>
        <i>↔</i>
        <span>SPRING + MONGO</span>
      </div>
    </div>
  );
}

export function FluxVisual() {
  return (
    <div
      className="visual-frame flux-visual"
      role="img"
      aria-label="Flux flow: passenger request, available riders, bids, selection, and tracking"
    >
      <div className="visual-topbar">
        <span>FLUX / RIDE FLOW</span>
        <span>DEMO SYSTEM</span>
      </div>
      <div className="flux-map">
        <div className="map-road road-one" />
        <div className="map-road road-two" />
        <div className="map-road road-three" />
        <div className="map-route" />
        <span className="map-pin pin-a">A</span>
        <span className="map-pin pin-b">B</span>
        <span className="map-rider rider-a">↗</span>
        <span className="map-rider rider-b">↗</span>
        <div className="map-card">
          <span>RIDE REQUEST</span>
          <strong>Passenger → Rider</strong>
          <small>Bid selection in progress</small>
          <div>
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <div className="flux-flow">
        <span>01 REQUEST</span>
        <b>→</b>
        <span>02 RIDERS</span>
        <b>→</b>
        <span>03 BIDS</span>
        <b>→</b>
        <span>04 TRACK</span>
      </div>
    </div>
  );
}

export function FlashVisual() {
  return (
    <div
      className="visual-frame flash-visual"
      role="img"
      aria-label="FlashFlow architecture: clients enter an API gateway, then auth and order services; order service calls stock service backed by Redis and saves to MongoDB"
    >
      <div className="visual-topbar">
        <span>FLASHFLOW / SERVICE TOPOLOGY</span>
        <span>4 SERVICES</span>
      </div>
      <div className="flash-diagram">
        <div className="flash-node incoming">
          <small>01 / INGRESS</small>
          <strong>API Gateway</strong>
          <span>Express</span>
        </div>
        <div className="flash-connect vertical" />
        <div className="flash-middle">
          <div className="flash-node">
            <small>02 / IDENTITY</small>
            <strong>Auth Service</strong>
            <span>MongoDB users</span>
          </div>
          <div className="flash-node">
            <small>03 / PURCHASE</small>
            <strong>Order Service</strong>
            <span>MongoDB orders</span>
          </div>
        </div>
        <div className="flash-connect vertical" />
        <div className="flash-node stock">
          <small>04 / INVENTORY</small>
          <strong>Stock Service</strong>
          <span>Redis counter · DECRBY</span>
        </div>
        <div className="flash-pulse">REQUESTS → RESERVE → PERSIST</div>
      </div>
    </div>
  );
}
