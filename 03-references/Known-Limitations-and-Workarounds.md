# Known Limitations & Workarounds

Constraints observed repeatedly across Microsoft 365 Copilot and Copilot Studio agent
deliveries, with the design responses that work. Use this during **design and qualification**,
not during firefighting — most of these are cheap to design around and expensive to discover
late.

> ⚠️ **This is a field guide, not a product statement.** Behaviour changes frequently. Verify
> anything that materially affects a customer commitment before relying on it, and update this
> file when you find something has changed.
>
> **Legend:** 🔴 Frequently blocks delivery · 🟠 Causes rework · 🟡 Manageable with expectation setting

---

## 1. Governance and Access

| # | Limitation | Impact | Design response |
|---|---|---|---|
| G1 | 🔴 Agent **creation** and agent **consumption** rights are closely coupled across several build surfaces | Organizations that want everyone to use approved agents but only a nominated group to build them stall at the last step of rollout | Phase the rollout: publish approved agents through the store route with named owners; restrict the maker community; re-check current platform capability every quarter |
| G2 | 🔴 Sharing scope controls vary by build surface | User-created agents shared organization-wide with no inventory | Inventory first, then policy, then an amnesty. See the governance runbook |
| G3 | 🟠 "Block agents" means different settings in different portals | A control applied in one place leaves other doors open | Always name the build surface a control applies to |
| G4 | 🟠 Reporting is not unified across all agent types and surfaces | Chargeback and inventory models built on one report are incomplete | Combine sources; treat the agent registry as the inventory source of truth, not usage reports |
| G5 | 🟠 Agent identifiers are not always consistent between usage reports and audit logs | Per-agent cost attribution breaks | Validate identifier consistency before designing chargeback; prefer environment-level attribution |
| G6 | 🟡 A blocked agent may still be visible in some surfaces | Users report a "blocked" agent as still present | Verify the end-user experience after blocking; communicate accordingly |
| G7 | 🟠 Scoped administration is limited — many controls are tenant-admin only | Decentralised enterprises with many environments cannot delegate | Consolidate agent-hosting environments; define a lightweight central request process |
| G8 | 🟡 Agents with no owner accumulate | Governance debt, and nobody to fix quality issues | Make a named owner a mandatory field in the approval route |

---

## 2. Licensing and Cost

| # | Limitation | Impact | Design response |
|---|---|---|---|
| L1 | 🔴 A Copilot licence check can apply when adding or opening a shared agent, even with pay-as-you-go configured | Unlicensed users blocked from agents they were told they could use | Validate the exact path with a real least-privileged user **before** designing the audience |
| L2 | 🔴 Knowledge sources can introduce a licensing dependency — people and graph-grounded knowledge in particular | An otherwise instruction-only agent becomes licence-gated | Check what knowledge is enabled by default; remove what you do not need |
| L3 | 🔴 Budget thresholds alert; they do not enforce a hard stop | Cost overrun despite a configured limit | If a hard ceiling is required, use prepaid capacity with overage enforcement and do not enable pay-as-you-go on that environment |
| L4 | 🟠 Overage enforcement disables agents at 125% of prepaid capacity, at tenant scope | Business interruption, or none at all — depending on configuration | Allocate capacity per environment; environments with their own allocation are insulated while it lasts |
| L5 | 🟠 Testing consumes credits at production rates | Thousands of credits consumed before go-live | Bounded capacity for the development environment; brief makers that the test canvas bills |
| L6 | 🟠 Publishing to the SharePoint channel requires a Copilot licence or pay-as-you-go plus environment billing | Adoption blocked where customers refuse pay-as-you-go on cost-control grounds | Resolve in design; fixing the cost-control story usually unblocks this |
| L7 | 🟠 Admin-center policies and Power Platform billing policies must agree | Users fall between the two and get confusing blocks | Design both together, in one document |
| L8 | 🟡 Per-agent consumption limits are set by tenant-level admins | Environment owners cannot self-manage budgets | Consolidate environments; define a request process |
| L9 | 🟡 Reasoning models add a premium token charge on top of the feature rate | Unit economics change materially when a model is switched | Re-estimate after any model change |

---

## 3. Knowledge and Grounding

| # | Limitation | Impact | Design response |
|---|---|---|---|
| K1 | 🔴 Scanned and image-only PDFs contribute nothing to grounding | Policy libraries built from scans produce an agent that knows nothing | Re-publish as text. There is no configuration workaround |
| K2 | 🔴 Tables inside PDFs ground unreliably | Entitlement and rate questions return wrong or missing values | Restate tables in text, or move them to a structured source |
| K3 | 🟠 Content inside images and diagrams is not retrievable | Diagram-heavy documentation is invisible | Add text descriptions |
| K4 | 🟠 Long documents are effectively truncated for retrieval purposes | Answers to questions covered late in a document fail | Split into focused documents |
| K5 | 🟠 Duplicate and superseded documents produce contradictory answers | The agent is "inconsistent" when the content is | Archive old versions. The highest-return, lowest-effort fix available |
| K6 | 🟠 Synonyms and domain terminology are not automatically understood | "upload documents" fails where "scan documents" succeeds | Add a glossary to the content or a synonyms section to the instructions |
| K7 | 🟠 Cross-language retrieval is weaker than cross-language generation | A question in language A finds nothing; the same question in the knowledge base language works | Provide high-traffic topics in the question language; do not rely on translation alone |
| K8 | 🟠 Structured lists as knowledge may only be partially queried | Part of the knowledge base is silently unused | Consolidate; verify how many list sources are actually queried |
| K9 | 🟠 Custom connector relevance relies on a limited set of semantic labels | Rich custom metadata does not drive retrieval as designed | Map the most important field to the title label; do not depend on many custom properties |
| K10 | 🟡 Filenames with special characters break filename-referencing queries | Users referencing documents by name get failures | Normalise naming conventions |
| K11 | 🟡 Container-level permission changes only apply after a full crawl | Access changes appear delayed | Document the lag before content owners raise it as an incident |
| K12 | 🟠 Different agent types use different retrieval stacks | A rebuilt agent performs worse than the original on the same content | Compare like with like; enable graph grounding where applicable; consider a purpose-built knowledge store |

---

## 4. Response Quality

| # | Limitation | Impact | Design response |
|---|---|---|---|
| Q1 | 🔴 Answers without an in-text citation are withheld when ungrounded responses are disallowed | Intermittent "I couldn't find that" for questions that worked minutes earlier | Instruct the model to always cite; avoid rigid output formats that suppress citation markers |
| Q2 | 🟠 Custom-rendered responses do not get citations added automatically | Citations disappear when you render the answer yourself | Render citations explicitly |
| Q3 | 🟠 Disallowing ungrounded responses is not an absolute guarantee | General knowledge can still blend in when a source was also used | Set the expectation; do not present the setting as a hallucination guarantee |
| Q4 | 🟠 Follow-up questions answered from conversation history can be blocked | Multi-turn conversations break unexpectedly | Explain the behaviour; weigh strict grounding against conversational usability |
| Q5 | 🟠 Answer quality can differ by licence type | Licensed and unlicensed users get different experiences of the same agent | Define the target population early; test as that population |
| Q6 | 🟠 Model or platform changes cause quality regressions with no change on your side | "It got worse and we changed nothing" | Keep a stored evaluation baseline from day one; re-run after any model change |
| Q7 | 🟠 The same prompt behaves differently across Copilot Chat, Agent Builder, and Copilot Studio | Customers compare surfaces and lose confidence | Standardise where possible; document where not |
| Q8 | 🟡 Agent instructions have a length limit | Complex behavioural requirements do not fit | Move content into knowledge; keep instructions to behaviour |
| Q9 | 🟠 Relative date reasoning ("yesterday", "last week") over indexed metadata is unreliable | Confidently wrong date-filtered lists | Instruct the agent to require explicit date ranges |

---

## 5. Multi-Agent and Interoperability

| # | Limitation | Impact | Design response |
|---|---|---|---|
| M1 | 🔴 Multi-agent output can lose depth and be truncated in downstream channels | A solution that works in authoring is unusable in Teams and the Copilot channel | Validate multi-agent designs **in the target channel** from the first sprint |
| M2 | 🔴 Every orchestration hop adds latency | End-to-end response times unacceptable for interactive use | Minimise hops; use child agents rather than connected agents where separate lifecycles are not needed |
| M3 | 🟠 Authentication context does not always propagate cleanly through agent chains | Sign-in prompts appear mid-flow, or in contexts with no user to respond | Prototype auth across the chain before building |
| M4 | 🟠 Connections to downstream agents can require re-connection | Reconnect loops and failed connection screens | Monitor; keep the number of connected agents minimal |
| M5 | 🟠 An agent that already has connected agents cannot itself be used as a connected agent elsewhere | Reuse plans break late | Design the agent graph before building; keep reusable agents leaf-level |
| M6 | 🟠 Tool selection degrades past roughly 30–40 choices in one agent | Wrong tool selected, inconsistent behaviour | Split into connected agents, or improve tool descriptions to differentiate |
| M7 | 🟠 Citations are not always preserved when passing output back to a calling agent | Traceability lost in multi-agent answers | Pass citation data explicitly, or accept the loss and document it |
| M8 | 🟠 Inbound invocation of Copilot Studio agents by external systems is constrained | Customers building bidirectional multi-vendor agent estates hit a wall | Establish the direction of travel early; be straightforward about what is supported today |
| M9 | 🟡 Some connected agent types are not supported when the main agent is deployed to Microsoft 365 Copilot | Works in test, fails when published | Check per-agent-type support against your target channel |

---

## 6. Publishing and Channels

| # | Limitation | Impact | Design response |
|---|---|---|---|
| P1 | 🟠 Teams limits the number of citations and truncates titles and snippets | Sources disappear or become unreadable | Reduce source count; shorten titles |
| P2 | 🟠 Agent metadata (description, branding, starter prompts) does not always survive publishing | Agents appear unbranded or without descriptions | Verify after each publish |
| P3 | 🟠 Version propagation is not instantaneous | Some users run an old version | Communicate the lag; verify before declaring go-live |
| P4 | 🟠 Adaptive cards, charts, and images render differently by channel | Visible failures in front of users | Test the exact card in the exact channel |
| P5 | 🟠 File upload and download support varies by channel | File-based flows fail in some surfaces | Confirm support before designing a file-dependent flow |
| P6 | 🟠 Long-running actions can time out at the channel boundary | Actions fail intermittently under load | Design asynchronously: acknowledge, then follow up |
| P7 | 🟠 Session and conversation-history behaviour differs by channel | Users report "it forgot" in one surface | Test one-to-one, group chat, channel, and mobile separately |
| P8 | 🟠 Third-party channels can require re-authentication per invocation | Adoption failure, and a losing position in competitive evaluations | Prototype the sign-in experience before committing |
| P9 | 🟠 Publishing pro-code and Foundry agents into Microsoft 365 surfaces is its own integration problem | Late-stage delays after the agent is built | Treat it as a separate workstream with its own spike |

---

## 7. Authentication and Identity

| # | Limitation | Impact | Design response |
|---|---|---|---|
| A1 | 🔴 Actions can execute under the creator's credentials rather than the invoking user's | Source-system ACLs bypassed and audit trails wrong — a security finding | Configure end-user authentication; **prove** attribution by inspecting the source system's audit record |
| A2 | 🟠 On-behalf-of connection experiences can produce repeated consent prompts and connection loops | Poor user experience; adoption resistance | Prototype early; validate with a federated identity provider if one is in the path |
| A3 | 🟠 Programmatic or SDK invocation can trigger interactive sign-in prompts | Backend and orchestrated scenarios break | Establish a non-interactive pattern before designing the architecture |
| A4 | 🟠 Guest and external user experiences differ | Agents fail for partners and contractors | Test explicitly if they are in scope |
| A5 | 🟡 Identity mapping between the source system and Entra defaults to email | Users without a matching attribute get no results at all | Configure a custom mapping formula at connection creation |

---

## 8. Regional, Sovereign, and Compliance

| # | Limitation | Impact | Design response |
|---|---|---|---|
| R1 | 🔴 Feature availability differs materially between Commercial, GCC, and GCCH | Designs that work in Commercial do not deploy in government clouds | Verify every feature against the target cloud during qualification |
| R2 | 🟠 Some capabilities are region-limited | Rollouts blocked in specific geographies | Check availability per region before committing dates |
| R3 | 🟠 Data residency and in-country processing requirements can constrain the architecture | Legal or regulatory objection late in the project | Raise residency in qualification; involve legal early |
| R4 | 🟠 Preview features are frequently unusable in regulated production environments | Designs that depend on preview capability cannot ship | Do not design production solutions on preview features unless the customer explicitly accepts it in writing |
| R5 | 🟡 Language support varies by capability | Multilingual expectations set too high | Confirm supported languages per capability, in writing, at qualification |

---

## 9. MCP Servers and Third-Party System Integration

| # | Limitation | Impact | Design response |
|---|---|---|---|
| X1 | 🔴 Out-of-the-box CRM and SaaS connectors often expose standard fields only — no custom objects, no custom fields, no aggregation, no write | The integration demos well and supports no real workflow | Evidence the gap in a sandbox, then build a purpose-built MCP server exposing task-shaped tools |
| X2 | 🔴 Identity passthrough is not guaranteed end to end | The MCP server receives a managed identity instead of the user; source-system ACLs and audit trails break | Run a `whoami` spike in the real host, as a real user, before designing anything |
| X3 | 🔴 MCP protocol version gates modern auth flows (3LO, URL elicitation) | Presents as an authentication failure with no version diagnostic | Reconcile protocol versions across host, server, and any gateway during design |
| X4 | 🟠 Beyond five plugins, selection is by semantic match on the **plugin description**, not on tool names | The right plugin is never chosen | Write the plugin description as a routing instruction naming systems, data, and tasks |
| X5 | 🟠 All tools of a matched plugin are returned; quality degrades beyond roughly 10 tools | Wrong tool selected, token budget consumed | Target 5–8 task-shaped tools; split by domain rather than adding an eleventh |
| X6 | 🟠 The token window truncates large content in both directions | Confidently incomplete artifacts and answers | Bound every payload: top N plus a total count, explicit field lists |
| X7 | 🟠 Dynamic tool discovery removes the release gate | A server deployment silently changes agent behaviour | Pin the tool set, or make every server deployment trigger an evaluation re-run |
| X8 | 🟠 Multi-step tool tasks complete partially with generic errors | Users cannot tell what failed; retries create duplicates | Structured step-level errors, idempotent writes keyed on a client identifier, tool-call tracing |
| X9 | 🟠 A documented MCP tool may not be resolved by a given host | Designs built on documentation fail in the host | Enumerate the tools the host actually resolves before designing around them |
| X10 | 🟠 MCP tool availability can differ between a main agent and a child agent | Works at the top level, fails in the sub-agent | Test at the exact agent level you intend to use |
| X11 | 🟠 Synchronous orchestration imposes timeout ceilings on long-running calls | Long backend work fails intermittently | Keep tool calls fast; return a job handle and design an asynchronous completion path |
| X12 | 🟡 MCP UI widget support is not uniform across hosts | Rich responses designed for one host do not render in another | Confirm widget support for the target host before designing around it |
| X13 | 🟡 Partner and ISV publishing of MCP-backed capability into Copilot surfaces has distribution constraints | Blocks marketplace and co-sell motions | Confirm the distribution path early if you are a partner |
| X14 | 🔴 Copilot hosts call MCP servers **outbound over HTTPS**. There is no inbound relay into a private network, and no on-premises agent equivalent for MCP | On-premises systems of record cannot be reached directly — a very common blocker in regulated sectors | Use a gateway-mediated topology (APIM, Apigee, Workato, MuleSoft) with hybrid backhaul. Never plan on direct access |
| X15 | 🟠 APIM exposes MCP **tools** only — not resources or prompts — and MCP is not supported in APIM workspaces | Designs relying on MCP resources or workspace deployment fail | Design tools only; verify the APIM tier and avoid workspaces for MCP |
| X16 | 🟠 Global response-body logging, or a policy touching `context.Response.Body`, breaks MCP streaming through APIM | Intermittent transport failures with no obvious cause | Set Frontend Response payload logging to `0` at the all-APIs scope; never access the response body in MCP server policies |
| X17 | 🔴 Power Platform VNet requires endpoint TLS certificates chained to a **well-known** root CA | A private or internal root CA — standard in many enterprises — will not work | Establish this at design time; re-issue certificates or choose a different topology |
| X18 | 🟠 DNS resolution failures through a delegated subnet surface as `502` errors rather than name-resolution errors | Days lost diagnosing the wrong layer | Verify custom DNS resolves the endpoint from inside the network path during the connectivity spike |
| X19 | 🟠 Inspecting corporate proxies can close long-lived streaming connections | Long-running agent operations time out only inside the corporate network | Test a long streaming request during the connectivity spike, not just a short one |
| X20 | 🟠 Power Platform VNet constraints: unsupported on Trial and Dataverse for Teams environments; region-pair specific; subnet IP range and VNet DNS immutable once delegated; GCC unsupported (GCC High and DoD supported) | Late-stage rework of the network design | Run the platform pre-checks before building |
| X21 | 🟡 On-premises data gateway updates are not automatic and ship monthly; the recovery key set at install is required to relocate or restore it | Drift and unrecoverable gateways | Make both explicit handover items with a named owner |

---

## 10. Copilot Cowork and Office Artifact Generation

| # | Limitation | Impact | Design response |
|---|---|---|---|
| C1 | 🔴 Cowork consumption is billed separately from the Microsoft 365 Copilot licence | Customers hold back broad enablement on cost-model grounds even when they like the capability | Agree the spend position and who pays at qualification, not after the pilot |
| C2 | 🔴 Template adherence is not uniform across Copilot entry points or models | The same organization gets branded output from one path and generic themes from another | Build and publish an entry-point × model test matrix; steer users to a verified path |
| C3 | 🔴 Agent Mode has overwritten document content and formatting without consent, with no in-context undo | Work destroyed; trust does not recover quickly | Default to producing a **new** file; reserve in-place editing for drafts; train users on version history |
| C4 | 🟠 Early-access agentic capability has shown session instability and inconsistent behaviour between identical runs | Pilots blocked on reliability rather than capability | Be explicit about programme maturity; build a re-run path; do not design a business process that assumes first-attempt success |
| C5 | 🟠 Agent and plugin discoverability has been inconsistent between users | Some pilot users cannot find or add the capability | Verify for the whole pilot group, not just the pilot lead |
| C6 | 🟠 Audit, hold, and eDiscovery coverage for autonomous agent actions may lag general availability | Compliance gap from day one of a broad rollout | Establish the audit and retention position with compliance **before** broad enablement, and constrain scope where a gap exists |
| C7 | 🟠 Some agent output formats fall outside sensitivity-labelling coverage | Artifacts leave the classification boundary | Constrain the agent to covered output formats, or document and accept the gap explicitly |
| C8 | 🟠 Rights-protected source documents are not consistently accessible across every Copilot surface | Protected content unusable in some experiences | Test with real protected content if it is in scope |
| C9 | 🟠 Generated logos and imagery can be altered in shape, colour, or sharpness, and text in generated images cropped | Unusable for anything customer-facing | Never let the model generate a logo — reference the approved asset from the image library; prefer template placeholders over generated graphics |
| C10 | 🟠 Document generation can simply fail for some formats or lengths | The reasoning works, the artifact never appears | Test artifact generation as a first-class capability with its own cases, not as an assumed final step |
| C11 | 🟠 Organization Asset Library has hard constraints: max 30 libraries, all on one site, up to 24 hours to appear, not available in some clouds | "The templates aren't working" during testing | Configure early, wait the propagation window, and verify as a normal user on desktop **and** web |
| C12 | 🟡 A mandatory theme-selection step can interrupt prompt-driven generation | Breaks the flow for organizations with strict identity rules | Generate first, apply the corporate template as an explicit step |
| C13 | 🟡 Cowork does not interoperate with every other agent or first-party sales experience | Users expect one assistant and find several | Set the expectation; do not promise cross-agent continuity that does not exist |

---

## 11. Regulated Advisory and Client-Facing Scenarios

| # | Limitation | Impact | Design response |
|---|---|---|---|
| F1 | 🔴 Information barriers are not consistently enforced for shared agents, particularly when a user changes segment | Regulatory breach risk; the most common reason a well-built agent does not go live in financial services | Enforce barriers at the data layer (source ACLs, connector trimming, per-user MCP identity), never in instructions. Test the segment-change case explicitly and measure propagation delay |
| F2 | 🔴 Responsible AI filters trigger more readily on personal-circumstance and financial content inside agents than in base Copilot chat | Legitimate adviser prompts blocked; intermittent behaviour reads as unreliability | Restructure prompts from characterisation to retrieval-and-citation. Keep a documented blocked-prompt / working-rewording list as enablement material |
| F3 | 🟠 Agents readily produce output that reads as advice, recommendation, or projection | In regulated advisory this is the line between a productivity tool and a regulated activity | Write hard boundary instructions first, signed by compliance. Disallow ungrounded responses. Never summarise approved disclosures — link to them |
| F4 | 🟠 Position and valuation data from indexed sources can be stale | An undated valuation quoted in a client meeting is a compliance problem | Require an "as at" date on every monetary value; state the refresh cadence to users |
| F5 | 🟠 Near-identical client folder structures cause the agent to cite the wrong client's document | Wrong-client disclosure | Disambiguate naming; enforce separation with permissions, not naming conventions |
| F6 | 🟡 Agent sharing scope is a control question even where retrieval is correctly trimmed | Broad sharing of an agent that reaches segmented data | Cap the sharing audience; publish through the approval route with a named owner |
| F7 | 🟡 Ambiguity over whether the agent transcript is a record | Retention scope creep | Decide explicitly: the filed note is the record, the conversation is not. Document it |

---

## How to Use This List

**At qualification.** Walk sections 1, 2, 8, 10, and 11 with the customer. These contain the
constraints that stop projects rather than slow them.

**At design.** Walk sections 3, 5, 6, 7, and 9 against your intended architecture. Anything
marked 🔴 that applies is a design input, not a risk to manage.

**At build.** Sections 3, 4, 9, and 10 tell you what to test for. Build the evaluation set around
them.

**At handover.** Give the customer the subset that applies to their solution, so operations
knows what is expected behaviour and what is a defect.

---

## Contributing

When you hit a constraint that is not listed here — or find that one listed has been resolved —
update this file. Include:

- What the symptom looked like from the user's side
- What the actual cause was
- What the design response is
- Which pattern or scenario it affects

Field-observed constraints are the highest-value content in this repository. Documentation tells
you what the platform does; this tells you what happens when you deploy it.

---

## Related

- [Agent Delivery Reference Library](./Agent-Delivery-Reference-Library.md)
- [Grounding & Response Quality Remediation](../02-patterns/Grounding-and-Response-Quality-Remediation/Grounding-and-Response-Quality-Remediation.md)
- [Agent Governance & Rollout Control Plane](../02-patterns/Agent-Governance-and-Rollout-Control-Plane/Agent-Governance-and-Rollout-Control-Plane.md)
- [Copilot Credits & Cost Control](../02-patterns/Copilot-Credits-Cost-Control/Copilot-Credits-Cost-Control.md)
- [Agent Publishing & Channel Deployment](../02-patterns/Agent-Publishing-and-Channel-Deployment/Agent-Publishing-and-Channel-Deployment.md)
- [MCP Server Integration](../02-patterns/MCP-Server-Integration/MCP-Server-Integration.md)
- [Branded Office Artifact Generation](../02-patterns/Branded-Office-Artifact-Generation/Branded-Office-Artifact-Generation.md)
