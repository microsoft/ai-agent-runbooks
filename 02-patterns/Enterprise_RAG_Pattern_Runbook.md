# Enterprise RAG (Multi-Source, Governed) - Implementation Runbook

## Overview

This runbook provides step-by-step guidance for implementing the Enterprise RAG (Retrieval-Augmented Generation) pattern. This pattern is the most widely deployed approach for grounding AI agent responses in organizational data while maintaining document-level access control and full citation trails.

## Pattern Characteristics

### Applicable Industries
- Insurance
- Healthcare
- Public Sector
- Finance
- Legal
- Human Resources
- Information Technology
- Sales Operations

### Supported Data Sources
- SharePoint Online
- OneDrive for Business
- Microsoft Dataverse
- Azure SQL Database
- Microsoft Fabric
- Dynamics 365 CRM

### Primary Use Cases
- Question and Answer systems
- Document summarization
- Policy interpretation
- Compliance verification
- Knowledge base access

### Key Performance Indicator
This pattern delivers 36% improvement in response relevance compared to traditional RAG implementations when combined with Foundry IQ.

---

## Architecture Overview

The Enterprise RAG pattern consists of the following components:

1. **User Interface**: Copilot Studio Agent
2. **Orchestration Layer**: Foundry IQ Agentic Orchestrator (optional)
3. **Search Infrastructure**: Azure AI Search
4. **Data Sources**: SharePoint, OneDrive, Dataverse, SQL, Fabric, Dynamics 365
5. **AI Processing**: Azure OpenAI GPT-4o

### Data Flow
1. User submits natural language query to Copilot Studio Agent
2. Query is processed by orchestration layer
3. Relevant documents retrieved from Azure AI Search
4. Structured data queried from Dataverse, SQL, or other sources
5. Retrieved context sent to Azure OpenAI for grounded response generation
6. Response with citations returned to user

---

## Implementation Procedure

### Prerequisites
- Azure subscription with appropriate permissions
- Microsoft 365 tenant with SharePoint/OneDrive access
- Copilot Studio license
- Azure OpenAI Service access

### Step 1: Inventory Knowledge Sources

**Objective**: Identify and catalog all data sources containing relevant content.

**Procedure**:
1. List all SharePoint sites containing relevant documentation
2. Identify SQL databases with business-critical data
3. Document Dataverse tables used by business processes
4. Locate PDF libraries and file repositories
5. Identify Dynamics 365 entities containing customer/operational data
6. Classify sources as either:
   - Unstructured (documents, PDFs, files)
   - Structured (database records, tables)

**Deliverable**: Complete inventory spreadsheet with source names, types, and locations.

---

### Step 2: Configure Azure AI Search Indexes

**Objective**: Create and configure search indexes for document retrieval.

**Procedure**:

**2.1 Create Indexes by Domain**
- Create one index per logical business domain
- Recommended naming convention: `[department]-[content-type]`
- Examples: `hr-policies`, `product-catalog`, `legal-contracts`

**2.2 Enable Semantic Ranking**
- Navigate to Azure AI Search resource in Azure Portal
- Select "Semantic configurations" under Settings
- Create new semantic configuration
- Assign priority to title and content fields

**2.3 Configure Vector Fields**
- Add field: `content_vector` (type: Collection(Edm.Single))
- Select embedding model: `text-embedding-3-large` (recommended for quality)
- Alternative: `text-embedding-3-small` (for cost optimization)
- Set dimensions: 1536 or 3072 based on model choice

**2.4 Set Up Indexers**
- For SharePoint: Configure SharePoint Online indexer
- For Blob Storage: Configure blob storage indexer
- Set refresh schedule based on data update frequency
- Enable automatic change detection

---

### Step 3: Implement Permission Trimming

**Objective**: Ensure users only retrieve documents they have permission to access.

**Procedure**:

**3.1 Enable Entra ID Security Trimming**
- In Azure AI Search, navigate to index configuration
- Enable "Security trimming" option
- Select authentication method: "Entra ID"

**3.2 Configure Access Control Lists**
- Map document-level permissions to Entra group IDs
- Verify SharePoint permission inheritance settings
- Test with users from different security groups

**3.3 Validation**
- Create test users with different permission levels
- Execute test queries and verify results match user permissions
- Document any permission exceptions or custom rules

---

### Step 4: Connect Azure AI Search to Copilot Studio

**Objective**: Integrate search capability into your Copilot Studio agent.

**Procedure**:

**Option A: Native Low-Code Connector**
1. Open Copilot Studio
2. Navigate to your agent
3. Select "Knowledge" section
4. Click "+ Add knowledge source"
5. Choose "Azure AI Search"
6. Enter Azure AI Search endpoint URL
7. Provide API key or configure managed identity
8. Select target index
9. Save configuration

**Option B: Foundry IQ Integration (Multi-Source)**
1. Deploy Foundry IQ orchestrator
2. Configure connection to multiple data sources
3. Register Foundry IQ as external agent in Copilot Studio
4. Configure routing rules based on query intent

---

### Step 5: Configure Response Generation

**Objective**: Ensure responses are grounded in retrieved source material.

**Procedure**:

**5.1 Set Grounding Parameters**
- Navigate to response node configuration
- Set strictness level: 4 (recommended for production)
- Higher values enforce stricter grounding to sources

**5.2 Configure System Prompt**
Add the following instruction to system prompt:
```
Answer only using the retrieved sources. If the answer is not found in the sources, state that explicitly. Do not generate answers based on general knowledge.
```

**5.3 Enable Safety Filters**
- Configure content filtering levels
- Set up fallback responses for filtered content
- Define escalation path for flagged queries

---

### Step 6: Implement Citation Display

**Objective**: Provide users with source attribution for all responses.

**Procedure**:

**6.1 Configure Metadata Fields**
Ensure the following metadata is captured from search results:
- `sourcefile`: Document filename
- `sourcepage`: Specific page number
- `url`: Direct link to source document
- `last_modified`: Document update timestamp
- `author`: Document owner/creator

**6.2 Design Citation UI**
In Copilot Studio response node:
1. Create adaptive card footer section
2. Add clickable links to source documents
3. Display page numbers and section references
4. Include last modified date for currency verification

**6.3 Citation Format Example**
```
Source: [Document Name] | Page: [X] | Section: [Y.Z] | Updated: [Date]
[Clickable URL]
```

---

### Step 7: Evaluation and Quality Assurance

**Objective**: Validate response quality before production deployment.

**Procedure**:

**7.1 Install Azure AI Evaluation SDK**
```bash
pip install azure-ai-evaluation
```

**7.2 Create Test Dataset**
- Compile 50-100 representative queries
- Include edge cases and ambiguous questions
- Document expected answers for validation

**7.3 Run Evaluation Metrics**
Execute evaluation for:
- **Groundedness**: Response supported by retrieved sources (target: ≥ 4.0/5.0)
- **Relevance**: Response addresses user query (target: ≥ 4.0/5.0)
- **Coherence**: Response is logically structured (target: ≥ 4.0/5.0)

**7.4 Iterate Based on Results**
- Identify low-scoring responses
- Adjust chunking strategy if needed
- Refine system prompts
- Update search configurations
- Re-run evaluation until targets met

**7.5 Production Readiness Criteria**
- All evaluation metrics ≥ 4.0/5.0
- Permission trimming validated across user groups
- Citation links functional for all document types
- Response time < 5 seconds for 95th percentile
- Zero hallucination instances in test set

---

## Implementation Examples

### Example 1: Insurance Policy Inquiry System

**Scenario**: Underwriters need quick access to policy coverage details.

**Query Example**: "Does our commercial property policy cover flood damage in Zone AE?"

**Implementation**:
1. Created `policy-documents` index from SharePoint PDF repository
2. Configured hybrid search (vector + keyword)
3. Implemented section-level citation with clause numbers
4. Set response time SLA: < 5 seconds

**Results**:
- 70% reduction in policy lookup calls to legal department
- Average response time: 3.2 seconds
- User satisfaction score: 4.6/5.0

---

### Example 2: Clinical Protocol Retrieval

**Scenario**: Nurses require immediate access to ICU care protocols.

**Query Example**: "What is the ICU sedation protocol for patients on CRRT?"

**Implementation**:
1. Created `clinical-protocols` index with ward-based permission filtering
2. Cross-referenced `drug-formulary` table in Dataverse
3. Configured multi-source response combining protocol documents and formulary data
4. Implemented verification workflow requiring source citation review

**Results**:
- Protocol lookup time: 8 minutes → 30 seconds
- 100% citation accuracy in verification audits
- Zero medication errors attributed to information retrieval

---

### Example 3: HR Benefits Self-Service

**Scenario**: Employees need answers to policy questions without HR intervention.

**Query Example**: "How many days of parental leave am I entitled to in India?"

**Implementation**:
1. Created `hr-global-policies` index from SharePoint
2. Configured metadata filters: `region`, `policy_type`, `effective_date`
3. Set indexer refresh: 30 minutes (ensures policy updates reflected quickly)
4. Implemented automatic routing based on employee profile (region, role)

**Results**:
- HR ticket volume reduction: 45%
- Employee satisfaction increase: 23%
- Average resolution time: 2 minutes vs. 2 days

---

### Example 4: Legal Contract Analysis

**Scenario**: Lawyers need to search contracts for specific clauses.

**Query Example**: "Find all NDAs with non-compete clauses longer than 24 months."

**Implementation**:
1. Created `legal-contracts` index with document type classification
2. Configured structured filter: `doc_type:NDA`
3. Implemented semantic search on clause duration
4. Added clause extraction with highlighting in results

**Results**:
- Contract review time: 3 hours → 3 minutes
- 90% time reduction for standard clause searches
- Enhanced clause identification accuracy

---

## Decision Matrix: When to Implement This Pattern

### Recommended Scenarios

| Criterion | Threshold |
|-----------|-----------|
| Document repository size | 500+ files |
| Number of data sources | 2 or more |
| Access control requirement | Yes - role-based or document-level |
| Citation requirement | Yes - audit trail needed |
| Hallucination risk tolerance | Low - accuracy critical |
| User base size | Department-wide or enterprise-wide |

### Alternative Patterns to Consider

| Scenario | Recommended Alternative |
|----------|------------------------|
| Knowledge base contains < 50 documents | Simple FAQ bot with hardcoded responses |
| All users have identical data access | Simplified RAG without permission trimming |
| Speed critical, citations unnecessary | Direct LLM query without retrieval |
| Single structured database | Direct database connector without search layer |
| Real-time computation required | API integration pattern |

---

## SharePoint and OneDrive Integration Guide

### Integration Tier Selection

Choose your integration approach based on scale, control requirements, and data freshness needs.

### Tier 1: Native Direct Connection

**Description**: Direct connection from Copilot Studio to SharePoint/OneDrive via Microsoft Graph API. No Azure AI Search required.

**Characteristics**:
- Setup time: 15-30 minutes
- Azure AI Search: Not required
- Maximum documents: ~1,000 per source
- Chunking control: Automatic only
- Permission model: Entra ID automatic
- Search type: Semantic only
- Cross-library capability: Limited to specified URLs
- Supported file types: DOCX, PDF (text), PPTX, XLSX, TXT, OneNote
- Index refresh: Near real-time via Graph
- Citation detail: Filename + URL
- Best for: Departmental agents, proof-of-concept

**Setup Procedure**:
1. Open Copilot Studio
2. Navigate to agent configuration
3. Select "Knowledge" tab
4. Click "+ Add knowledge"
5. Select "SharePoint" or "OneDrive"
6. Enter URL:
   - Site level: `https://[tenant].sharepoint.com/sites/[sitename]`
   - Library level: `https://[tenant].sharepoint.com/sites/[sitename]/[library]`
   - OneDrive: Shared folder URL
7. Click "Add"
8. Repeat for additional sources (maximum 10)
9. Test using test panel

**Supported File Types**:

| Format | Extension | Extraction Capability |
|--------|-----------|----------------------|
| Microsoft Word | .docx | Text and tables |
| PDF | .pdf | Native text only (scanned PDFs require Tier 2) |
| PowerPoint | .pptx | Slide text and speaker notes |
| Excel | .xlsx | Cell values and sheet data |
| Plain Text | .txt, .md | Complete content |
| OneNote | .one | Section and page content |

**Limitations**:
- Scanned/image PDFs not supported (require OCR)
- No custom chunking strategies
- Limited to 1,000 documents per source
- Cannot combine multiple site collections in single search
- No metadata-based filtering

---

### Tier 2: Azure AI Search-Backed

**Description**: Enterprise-scale indexing using Azure AI Search SharePoint Online Indexer with full control over chunking, metadata, and hybrid search.

**Characteristics**:
- Setup time: 4-8 hours
- Azure AI Search: Required (Standard S1 or higher)
- Maximum documents: Millions
- Chunking control: Full customization
- Permission model: Entra ID configurable
- Search type: Hybrid (vector + BM25)
- Cross-library capability: Multi-site indexing
- Supported file types: All document types + OCR for scanned PDFs
- Index refresh: Scheduled (15 min to 1 hour)
- Citation detail: Page + section + URL
- Best for: Enterprise production deployments

**Setup Procedure**:

**Step 1: Create Azure AI Search Resource**
1. Navigate to Azure Portal
2. Create new "Azure AI Search" resource
3. Select pricing tier: Standard S1 (minimum for production)
4. Configure region (same as data sources for optimal performance)
5. Complete creation and note endpoint URL

**Step 2: Configure Data Source**
1. In Azure AI Search resource, select "Data sources"
2. Click "+ Add data source"
3. Select type: "SharePoint Online"
4. Enter SharePoint site URL
5. Configure authentication:
   - Option A: Service principal with permissions
   - Option B: Managed identity
6. Save data source configuration

**Step 3: Grant Permissions**
1. Navigate to SharePoint Admin Center
2. Locate target site collection
3. Grant AI Search service principal or managed identity:
   - Site Collection Administrator (for full access)
   - OR Site Collection App Catalog read permissions (restricted)
4. Verify permissions propagated

**Step 4: Create Search Index**
1. In Azure AI Search, select "Indexes"
2. Click "+ Add index"
3. Define schema with minimum fields:
   - `id` (Edm.String, key, filterable)
   - `content` (Edm.String, searchable)
   - `content_vector` (Collection(Edm.Single), searchable, dimensions: 1536 or 3072)
   - `title` (Edm.String, searchable, filterable)
   - `url` (Edm.String, retrievable)
   - `last_modified` (Edm.DateTimeOffset, filterable, sortable)
   - `author` (Edm.String, filterable)
   - `doc_type` (Edm.String, filterable)
   - `site_name` (Edm.String, filterable)
   - `page_number` (Edm.Int32, filterable)
   - `permissions` (Collection(Edm.String), filterable)

4. Configure field attributes as indicated
5. Save index

**Step 5: Configure Semantic Ranking**
1. In index configuration, navigate to "Semantic configurations"
2. Click "+ Add semantic configuration"
3. Set configuration name (e.g., "default-semantic")
4. Configure fields:
   - Title field: `title`
   - Content fields: `content`
   - Keyword fields: `doc_type`, `site_name`
5. Save configuration

**Step 6: Create and Schedule Indexer**
1. Select "Indexers" in Azure AI Search
2. Click "+ Add indexer"
3. Select data source created in Step 2
4. Select index created in Step 4
5. Configure schedule:
   - Recommended: `PT15M` (every 15 minutes)
   - For large libraries: `PT1H` (every hour)
6. Enable "Track deletions" to remove deleted documents
7. Configure field mappings (if needed)
8. Submit and run indexer

**Step 7: Enable OCR for Scanned Documents** (Optional)
1. Create Azure Document Intelligence resource
2. In indexer configuration, add "Image Analysis" skillset
3. Configure OCR skill to process PDF pages
4. Update index to include OCR-extracted text
5. Re-run indexer

**Step 8: Connect to Copilot Studio**
1. Open Copilot Studio
2. Navigate to agent configuration
3. Select "Knowledge" → "+ Add knowledge"
4. Choose "Azure AI Search"
5. Enter Azure AI Search endpoint
6. Provide API key or configure managed identity authentication
7. Select index name
8. Map fields:
   - Content field: `content`
   - Citation field: `url`
   - Title field: `title`
9. Save configuration

**Advanced Configuration Options**:
- Custom metadata fields from SharePoint columns
- Incremental crawl optimization
- Field-level boosting (boost title vs. content)
- Custom embedding models
- Hybrid search weight tuning (vector vs. keyword ratio)

---

### Tier 3: Foundry IQ Multi-Source Orchestration

**Description**: Intelligent orchestration layer that queries multiple data sources simultaneously and synthesizes unified responses with cross-source citations.

**Characteristics**:
- Setup time: 3-5 days
- Azure AI Search: Required for unstructured content
- Maximum documents: Millions across all sources
- Chunking control: Intelligent semantic chunking
- Permission model: Entra ID + row-level security
- Search type: Agentic (adaptive strategy)
- Cross-source capability: Unified search across SharePoint, Dataverse, SQL, Fabric
- Supported data types: All document types + structured data
- Index refresh: Scheduled + on-demand
- Citation detail: Source system + passage + URL
- Best for: Multi-source environments, regulated industries

**Architecture Components**:
1. Foundry IQ Orchestrator
2. Multiple Azure AI Search indexes (one per content domain)
3. Dataverse connector
4. Microsoft Fabric connector
5. Azure SQL connector
6. Cross-encoder re-ranking service

**Setup Procedure**:

**Phase 1: Deploy Foundry IQ**
1. Contact Microsoft representative for Foundry IQ access
2. Deploy Foundry IQ orchestrator to Azure subscription
3. Configure authentication and governance policies
4. Set up monitoring and logging

**Phase 2: Configure Search Indexes**
1. Create Azure AI Search indexes for each content domain:
   - `sharepoint-hr-policies`
   - `onedrive-project-files`
   - `sharepoint-legal-contracts`
2. Configure indexers as per Tier 2 guidance
3. Verify all indexes operational

**Phase 3: Connect Structured Data Sources**
1. Configure Dataverse connection:
   - Register Foundry IQ app in Entra ID
   - Grant Dataverse table read permissions
   - Configure table selection and field mapping
2. Configure SQL connection:
   - Create read-only SQL user for Foundry IQ
   - Configure connection string
   - Define allowed tables and views
3. Configure Fabric connection:
   - Grant Fabric workspace read permissions
   - Configure dataset and report access
   - Set up refresh schedule alignment

**Phase 4: Configure Query Routing**
1. Define intent classification rules:
   - HR queries → hr-policies index + Dataverse hr-employees table
   - Legal queries → legal-contracts index
   - Analytics queries → Fabric datasets + relevant documents
2. Configure source priority and fallback logic
3. Set timeout thresholds for each source

**Phase 5: Implement Cross-Source Synthesis**
1. Configure result deduplication logic
2. Set up cross-encoder re-ranking:
   - Install re-ranking model
   - Configure relevance threshold
   - Set maximum results per source
3. Define citation aggregation strategy
4. Configure response synthesis prompts

**Phase 6: Connect to Copilot Studio**
1. Register Foundry IQ as external agent
2. Configure webhook endpoint
3. Set up authentication (API key or managed identity)
4. Define conversation flow routing to Foundry IQ
5. Configure response formatting

**Phase 7: Testing and Validation**
1. Execute multi-source test queries
2. Verify citations include all relevant sources
3. Validate permission enforcement across all sources
4. Test failover scenarios (source unavailable)
5. Performance testing (target: < 7 seconds for multi-source queries)

---

### Tier Selection Decision Tree

**Question 1**: Does your data reside exclusively in SharePoint/OneDrive?
- **No** → Proceed to Tier 3 (Foundry IQ)
- **Yes** → Continue to Question 2

**Question 2**: How many documents are in scope?
- **More than 1,000** → Proceed to Tier 2 (AI Search)
- **Fewer than 1,000** → Continue to Question 3

**Question 3**: Do you need OCR for scanned PDFs or images?
- **Yes** → Proceed to Tier 2 (AI Search with OCR)
- **No** → Continue to Question 4

**Question 4**: Do you need cross-site search or custom metadata filtering?
- **Yes** → Proceed to Tier 2 (AI Search)
- **No** → Use Tier 1 (Native Direct)

---

### Tier-Specific Use Cases

**Tier 1 Implementation Scenarios**:
1. Team FAQ bot for single SharePoint site (< 500 documents)
2. Departmental onboarding agent with OneDrive shared folder
3. Project-specific knowledge base (limited scope)
4. Proof-of-concept or pilot deployment

**Tier 2 Implementation Scenarios**:
1. Company-wide HR policy agent (5+ SharePoint sites, 10,000+ documents)
2. Legal contract repository with scanned historical documents
3. Technical documentation portal with multiple product lines
4. Compliance knowledge base with strict audit requirements

**Tier 3 Implementation Scenarios**:
1. Sales intelligence agent combining CRM + contracts + market data
2. Financial reporting agent querying Fabric + policies + transaction records
3. Regulated industry deployment requiring complete data lineage across systems
4. Customer service agent with access to ticketing system + knowledge base + order history

---

## Operational Considerations

### Performance Targets

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Query response time (p95) | < 5 seconds | Application Insights |
| Index refresh lag | < 1 hour | Indexer monitoring |
| Citation accuracy | 100% | Manual audit sampling |
| Permission enforcement accuracy | 100% | Security audit |
| Groundedness score | ≥ 4.0/5.0 | Azure AI Evaluation SDK |
| User satisfaction | ≥ 4.0/5.0 | Post-interaction survey |

### Monitoring and Maintenance

**Daily Checks**:
- Verify indexer run status
- Review error logs
- Monitor query volume and patterns
- Check response time metrics

**Weekly Reviews**:
- Analyze low-confidence responses
- Review citation accuracy sample
- Update test query dataset
- Performance trend analysis

**Monthly Tasks**:
- Re-run evaluation metrics
- Review and update system prompts
- Audit permission mappings
- Capacity planning review
- Update documentation

**Quarterly Activities**:
- Comprehensive security audit
- User satisfaction survey
- Retraining or fine-tuning evaluation
- Architecture review and optimization

### Troubleshooting Guide

**Issue**: Indexer fails to connect to SharePoint
- **Diagnosis**: Permission or authentication error
- **Resolution**:
  1. Verify service principal has not expired
  2. Check SharePoint site permissions
  3. Review Azure AD app registration
  4. Validate credential configuration

**Issue**: Responses lack source citations
- **Diagnosis**: Metadata mapping or configuration issue
- **Resolution**:
  1. Verify index schema includes citation fields
  2. Check Copilot Studio field mapping configuration
  3. Confirm response template includes citation variables
  4. Review adaptive card configuration

**Issue**: Users retrieve documents they shouldn't access
- **Diagnosis**: Permission trimming misconfiguration
- **Resolution**:
  1. Verify security trimming enabled in Azure AI Search
  2. Check Entra group mappings
  3. Review SharePoint permission inheritance
  4. Re-index with corrected permissions

**Issue**: Slow query response times
- **Diagnosis**: Performance bottleneck
- **Resolution**:
  1. Check Azure AI Search tier (upgrade if needed)
  2. Review index partitioning strategy
  3. Optimize chunking size
  4. Consider caching frequently accessed documents
  5. Analyze and optimize semantic ranking configuration

**Issue**: Hallucinated or incorrect responses
- **Diagnosis**: Insufficient grounding or low-quality retrieval
- **Resolution**:
  1. Increase strictness parameter
  2. Review and refine system prompt
  3. Adjust semantic ranking configuration
  4. Reduce chunk size for better precision
  5. Implement confidence threshold filtering

---

## Security and Compliance

### Data Protection Measures
- All data remains within tenant boundary
- Entra ID authentication for all access
- Document-level permission enforcement
- Audit logging for all queries and responses
- Encryption at rest and in transit

### Compliance Certifications
- Azure AI Search: SOC 2, ISO 27001, HIPAA-eligible
- Azure OpenAI: SOC 2, ISO 27001, responsible AI commitments
- Copilot Studio: Microsoft 365 compliance framework

### Data Residency
- Configure Azure AI Search region to match data residency requirements
- Ensure Azure OpenAI deployment in compliant region
- Verify SharePoint data location

### Audit Requirements
- Maintain query logs (minimum 90 days recommended)
- Log all permission checks and decisions
- Record source citations for all responses
- Track indexer operations and changes

---

## Cost Estimation

### Azure AI Search Costs
| Tier | Monthly Cost (USD) | Suitable For |
|------|-------------------|--------------|
| Basic | ~$75 | Development/testing only |
| Standard S1 | ~$250 | Up to 25M documents |
| Standard S2 | ~$1,000 | Up to 100M documents |
| Standard S3 | ~$4,000 | Enterprise scale, high query volume |

### Azure OpenAI Costs
- GPT-4o: $5.00 per 1M input tokens, $15.00 per 1M output tokens
- text-embedding-3-large: $0.13 per 1M tokens
- Estimated monthly cost (1,000 queries/day): $150-300

### Copilot Studio Costs
- Included in Microsoft 365 Copilot licensing
- Additional message capacity: $200 per 25,000 messages

### Total Cost of Ownership (Example)
Enterprise deployment (10,000 documents, 1,000 queries/day):
- Azure AI Search (S1): $250/month
- Azure OpenAI: $200/month
- Copilot Studio: Included or $200/month
- **Total**: $450-650/month

---

## Support and Resources

### Documentation References
- Lab 1.4: Azure AI Search in Copilot Studio (`/labs/lab-1.4`)
- Lab 2.1: Advanced Azure AI Search (`/labs/lab-2.1`)
- Lab 2.3: SharePoint AI Search Indexer (`/labs/lab-2.3`)
- Lab 2.4: Foundry IQ Agentic Retrieval (`/labs/lab-2.4`)

### Accelerators
- Content Flow Accelerator (`/accelerators/content-flow`)
- SharePoint Connector Accelerator (`/accelerators/sharepoint-connector`)

### Technical Support
- Azure AI Search: Azure Portal support request
- Copilot Studio: Microsoft 365 admin center
- Azure OpenAI: Azure support ticket

### Community Resources
- Microsoft Tech Community forums
- Azure AI Search GitHub samples
- Copilot Studio documentation portal

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026 | Technical Documentation Team | Initial runbook creation |

---

**End of Runbook**

This runbook should be reviewed and updated quarterly to reflect platform updates and lessons learned from implementation experience.
