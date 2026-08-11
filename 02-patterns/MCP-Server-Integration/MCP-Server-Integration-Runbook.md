# Runbook — MCP Server Integration

> **Use this when building or onboarding an MCP server for a Copilot experience.** Read
> [MCP-Server-Integration.md](MCP-Server-Integration.md) first to confirm MCP is the right
> choice.

---

## Prerequisites

| Requirement | Owner |
|---|---|
| Confirmed decision that a connector is insufficient (with evidence) | Delivery engineer |
| Admin access to the source system, including a sandbox | Source system admin |
| Hosting for the server (App Service, Container Apps, or equivalent) | Platform team |
| Network and gateway owner, if the backend is private or on-premises | Platform / network team |
| Named owner for the server after go-live | Customer |
| Microsoft 365 admin access for plugin deployment | M365 admin |
| Test users: one broad access, one restricted access | Delivery engineer |

---

## Step 1 — Evidence the Gap

Do not skip. This is what makes the MCP decision reviewable.

1. Configure the standard connector or first-party agent for the source system in a sandbox.
2. Run five real questions from the target scenario.
3. Record what was reachable and what was not.

| # | Question | Reachable | Blocked by | Category |
|---|---|---|---|---|

Categories to look for: standard-fields-only, no custom objects, no aggregation, no write,
result-count limits.

**Deliverable:** connector-gap evidence, one page.

---

## Step 2 — Select the Deployment Topology

Do this before the identity spike, because it determines *where* the spike is deployed.

### 2a. Establish reachability

| Question | Answer |
|---|---|
| Where does the backend live — cloud, private network, or on-premises? | |
| Is it reachable over HTTPS from the internet today? | |
| If not, what hybrid connectivity exists (ExpressRoute, VPN, self-hosted gateway)? | |
| Is there an existing API gateway or integration platform? Which? | |
| Is there an inspecting corporate proxy in the path? | |

> ⚠️ Copilot hosts call MCP servers **outbound over HTTPS**. There is no inbound relay into a
> private network. If the backend is on-premises, the answer is a mediation layer — not an
> exception request.

### 2b. Choose the topology

Use the decision flow in
[MCP-Server-Integration.md](MCP-Server-Integration.md#deployment-topologies--cloud-gateway-mediated-and-on-premises).

| Topology | Selected? | Rationale |
|---|---|---|
| A — Cloud-native MCP server | | |
| B — Gateway-mediated | | |
| C — Private-network backend behind a gateway | | |
| D — Copilot Studio + VNet subnet delegation | | |

### 2c. Define what the mediation layer enforces

If you selected B, C, or D, write down what the layer is responsible for. This is the answer to
"why can't the agent just call the API directly?" and you will be asked.

| Control | In scope? | Notes |
|---|---|---|
| Curated operation subset (least privilege) | | |
| Field-level redaction or masking | | |
| Payload shaping and size bounds | | |
| Rate limiting / quota | | |
| Authentication translation (Entra in → backend credential out) | | |
| Central audit of tool calls | | |
| Write throttling / blast-radius cap | | |

### 2d. Platform-specific pre-checks

Run the checks for whichever platform you selected.

**Azure API Management**

- [ ] Tier supports MCP servers (Developer, Basic, Basic v2, Standard, Standard v2, Premium, Premium v2)
- [ ] The API is HTTP-compatible
- [ ] Not deployed in an APIM **workspace** (MCP is not supported there)
- [ ] Only **tools** required — not MCP resources or prompts
- [ ] Frontend Response *Number of payload bytes to log* set to `0` at the all-APIs scope
- [ ] No policy accesses `context.Response.Body` in the MCP server scope
- [ ] Backend authorization header forwarding confirmed (`set-header` if needed)

**Third-party gateway (Apigee, Workato, MuleSoft, Kong, AgentCore)**

- [ ] MCP protocol version supported, and reconciled with the Copilot host
- [ ] Streaming transport supported end to end
- [ ] Tool granularity controllable — you can expose 5–8 shaped tools, not the whole API
- [ ] Payloads can be trimmed and fields redacted
- [ ] OAuth flow through the organisation's identity provider validated

**Copilot Studio + VNet**

- [ ] Environment type supported (Production, Default, Sandbox, Developer — not Trial or Dataverse for Teams)
- [ ] VNet in the correct Azure region pair for the Power Platform region, both regions delegated
- [ ] Endpoint TLS certificate chains to a **well-known** root CA
- [ ] Custom DNS resolves the target endpoints from the delegated subnet
- [ ] Existing outbound dependencies on public endpoints audited
- [ ] Azure subscription linked to the Power Platform tenant

**On-premises data gateway** (connector path only, not MCP)

- [ ] Outbound ports open: TCP 443, 5671, 5672, 9350–9354
- [ ] Recovery key recorded and stored where other administrators can find it
- [ ] Monthly update process owned — updates are not automatic

### 2e. Connectivity spike

Before building tools, prove the path end to end with a trivial endpoint:

| Test | Pass criteria |
|---|---|
| Host reaches the gateway | 200 from a hello-world tool |
| Gateway reaches the backend | Real data returned |
| Long streaming request | Completes without premature closure — this is the proxy test |
| Latency through the full chain | Within budget at p95 |
| TLS chain validates | No certificate errors |
| DNS resolves from inside the network path | No `502`-class failures |

**Deliverable:** selected topology, mediation-control table, platform pre-checks completed, and
a green connectivity spike.

---

## Step 3 — The `whoami` Spike

The single highest-value hour in this runbook.

1. Build a minimal MCP server with one tool: `whoami`, returning whatever caller identity it
   observes (claims, subject, tenant, app id).
2. Deploy it.
3. Register it as a plugin in the **exact host** you will use — Cowork, declarative agent,
   Copilot Studio, or Foundry.
4. Invoke it as a **normal pilot user**, not as the developer.
5. Record the result.

| Host / surface | Identity received | Per-user? |
|---|---|---|

Then decide:

| Observation | Design |
|---|---|
| Per-user token present | OAuth on the server, exchange for a source-system token scoped to the user |
| Only a service or managed identity | Either accept a scoped service identity with a restricted plugin audience, or place the user consent at the MCP server and maintain a user-to-token mapping |
| Differs by surface | Pin the scenario to the surface that works and document the constraint |

**Deliverable:** identity evidence table and token-flow design, reviewed by the security
stakeholder.

---

## Step 4 — Reconcile Protocol Versions

| Component | MCP protocol version | Supports the auth flow you need? |
|---|---|---|
| Host (Cowork / Copilot / Copilot Studio / Foundry) | | |
| Your server framework | | |
| Gateway (if present) | | |

A mismatch presents as an authentication failure with no version diagnostic. Establishing this
now avoids days of misdirected debugging later.

**Deliverable:** version reconciliation table.

---

## Step 5 — Design the Tools

Work backwards from the questions users will ask, not forwards from the API.

### 5a. Draft the tool set

| Tool | Description (for the model) | Inputs | Output fields | Payload bound | Read/Write |
|---|---|---|---|---|---|

**Target 5–8 tools.** If you exceed 10, split into a second plugin on a clean domain boundary.

### 5b. Apply the anti-pattern check

| Check | Pass? |
|---|---|
| No generic query tool (`run_query`, `soql`, `execute`) | |
| No one-tool-per-object explosion | |
| No tool returning a raw, unbounded record | |
| No generic `crud(object, op, payload)` | |
| Every tool composes server-side rather than requiring the model to sequence calls | |
| Every write is narrow and specific | |

### 5c. Write the plugin description

If the tenant has more than five plugins, this string is what selection runs on. Write it as the
answer to "when should Copilot use this plugin?" — name the systems, the data, and the tasks.

**Deliverable:** tool design table and plugin description, reviewed.

---

## Step 6 — Build

### 6a. Implement the tools

- Compose server-side; one call should answer one user question.
- Bound every payload — top N plus a total count.
- Strongly type inputs; avoid free-text parameters that invite invented values.

### 6b. Implement identity

- Enforce the source system's own permissions per user.
- Never fall back to a broad service account silently. If per-user identity is unavailable,
  fail closed and say so.

### 6c. Implement observability

| Item | Requirement |
|---|---|
| Tool-call logging | Caller, tool, redacted inputs, duration, outcome |
| Structured errors | Specific and actionable: "Record not found or not visible to this user" |
| Idempotency | Writes keyed on a client-supplied identifier |
| Tracing | Application Insights or equivalent, retained |
| Health endpoint | For monitoring |

Idempotency is not optional. Retries after partial failure will happen, and duplicates are the
result.

**Deliverable:** deployed server with telemetry flowing.

---

## Step 7 — Test Standalone

Before it touches an agent.

| Test | Pass criteria |
|---|---|
| Each tool returns correct data for a known record | Verified against the source system UI |
| Per-user scoping | Restricted user cannot retrieve out-of-scope records |
| Payload bounds | Every response within budget |
| Error handling | Every failure mode returns a structured, readable error |
| Write idempotency | Same request twice produces one change |
| Latency | p95 within your budget, per tool |
| Concurrency | Behaves under parallel calls |

**Deliverable:** standalone test results.

---

## Step 8 — Register and Connect

1. Package the plugin manifest pointing at the server.
2. Deploy through the **admin path** so it is governed and inventoried, not user-installed.
3. Scope availability to the pilot group.
4. Verify visibility for a pilot user who is not you — plugin discoverability has been
   inconsistent in practice.
5. Enumerate the tools the host actually resolves. Compare against your design. If a tool is
   missing, that is a host behaviour to investigate now, not a mystery to hit in UAT.

| Tool designed | Resolved by host? |
|---|---|

**Deliverable:** deployment record and resolved-tool list.

---

## Step 9 — Decide Dynamic vs Pinned

| Choose | When | Consequence |
|---|---|---|
| Dynamic discovery (default) | Iterating quickly | Server changes alter agent behaviour immediately, with no release gate |
| Pinned tool set | Regulated workflow, or you need change control | Tool changes require repackaging and republishing |

If you keep dynamic discovery, write the rule into the release process now:
**every MCP server deployment triggers a re-run of the agent evaluation set.**

**Deliverable:** documented decision and release rule.

---

## Step 10 — Agent-Level Testing

Standalone tool tests do not tell you how the agent uses them.

| Test | What it reveals |
|---|---|
| A question that should hit exactly one tool | Tool selection quality |
| A question needing two tools in sequence | Orchestration and error propagation |
| A question with no matching tool | Does it decline, or improvise? |
| A multi-step write task | Partial completion behaviour |
| Repeat a failed multi-step task | Duplicates created? Idempotency working? |
| Same question three times | Consistency of tool selection |
| Run as a restricted user | Permission enforcement end to end |
| An input the tool will reject | Is the error surfaced usefully to the user? |

Log what the model *tried to call*, not just what succeeded. Most tool-selection problems are
invisible from the chat surface.

**Deliverable:** agent-level test matrix.

---

## Step 11 — Handover and Operations
| Item | Owner |
|---|---|
| Server availability, latency, error-rate monitoring | Platform team |
| Secret and certificate lifecycle | Platform team |
| Source-system integration account and its permissions | Source system admin |
| Tool catalogue and versioning discipline | Delivery engineer → customer engineering |
| Re-running the evaluation set on each deployment | Customer engineering |
| Vulnerability scanning and patching | Security team |
| Plugin availability and audience | M365 admin |

Versioning discipline in one line: **additive changes are safe; removing or renaming a tool is a
breaking agent change.**

---

## Troubleshooting Quick Reference

| Symptom | Likely cause | Action |
|---|---|---|
| Plugin never selected | Weak plugin description, or more than five plugins competing | Rewrite the description as a routing instruction |
| Wrong tool selected | Overlapping or vague tool descriptions | Differentiate; reduce tool count |
| Tools missing from the agent | Host did not resolve them | Enumerate resolved tools; check dynamic discovery and host support |
| Authentication failure with no detail | Protocol version mismatch, or gateway constraint | Reconcile versions across the whole chain |
| Server sees a managed identity, not the user | Identity passthrough limitation on that surface | Re-run the `whoami` spike; redesign the token flow or restrict scope |
| Multi-step task partially completes | Orchestration error handling | Structured step-level errors; idempotent writes |
| Duplicates after a retry | No idempotency key | Add one |
| Answers incomplete but confident | Payload truncated by the token window | Bound payloads; return counts |
| Long-running call times out | Synchronous orchestration limits | Return a job handle; design an async completion path |
| Agent behaviour changed with no agent change | Dynamic discovery picked up a server deployment | Re-run evaluation; consider pinning |
| `502` from a custom connector or gateway | DNS resolution failure through a delegated subnet or private path | Verify custom DNS resolves the endpoint from inside the network path |
| TLS handshake rejected | Endpoint certificate chains to a private root CA | Power Platform VNet requires a well-known root CA. Re-issue the certificate |
| MCP streaming fails intermittently through APIM | Global response-body logging, or a policy touching `context.Response.Body` | Set Frontend Response payload logging to `0` at the all-APIs scope; remove response-body access from MCP policies |
| `401` from the backend through a gateway | Authorization header not forwarded | Attach it with `set-header` |
| Works in the gateway console, fails from the agent | Wrong base URL or missing token | Verify the MCP endpoint path and the token the agent presents |
| Long-running requests time out only in the corporate network | Inspecting proxy closing long-lived streaming connections | Re-run the streaming test from Step 2e; engage the network team |

---

## Exit Criteria

- [ ] Connector-gap evidence documented
- [ ] Deployment topology selected, with the mediation-control table completed
- [ ] Platform pre-checks passed for the selected gateway or network path
- [ ] Connectivity spike green, including a long streaming request through any corporate proxy
- [ ] `whoami` spike run in the real host, by a real user, evidence retained
- [ ] Protocol versions reconciled across host, server, and gateway
- [ ] 5–8 task-shaped tools designed, anti-pattern check passed
- [ ] Plugin description written for semantic selection
- [ ] Per-user identity enforced, or a documented and accepted fallback
- [ ] Observability: tool-call logs, structured errors, idempotent writes, tracing
- [ ] Standalone test results, including restricted-user scoping
- [ ] Plugin admin-deployed and scoped; resolved-tool list verified
- [ ] Dynamic vs pinned decision recorded, with the release rule
- [ ] Agent-level test matrix completed
- [ ] Named owner for the server after go-live
