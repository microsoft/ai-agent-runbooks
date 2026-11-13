# Runbook - Install the ServiceNow HR Plugin

## Overview

Install **Human Resources Scoped App: Core** with demo data in an isolated ServiceNow
developer instance, then verify that the HR knowledge bases are available.

This runbook prepares the sample content. Authentication and ingestion are covered in
[Configure the ServiceNow Knowledge Copilot Connector](ServiceNow-Copilot-Connector-Configuration-Runbook.md).

---

## Prerequisites

| Requirement | Details |
|---|---|
| ServiceNow developer instance | An approved isolated instance; create one with the [developer tenant setup runbook](ServiceNow-Developer-Tenant-Setup-Runbook.md) if needed |
| ServiceNow administrator access | Authorized access to install the HR plugin and verify knowledge bases |

> Load demo data only in the isolated developer instance. Production needs HR-approved
> content and a supported governed environment.

---

## 1. Install HR Plugin

1. Select the **All** tab in the top navigation.
2. Search for **plugin** and select **Plugins**.

   ![Search for plugin and select Plugins](Images/023.png?v=6a8f4028cbd8&refresh=20260921T184148Z)

3. Search for **Human resources**.

   ![Search plugins for Human resources](Images/023-2.png?v=468a1e66eebb&refresh=20260921T184148Z)

4. Select **Human Resources Scoped App: Core** and click **Install**.

   ![Human Resources Scoped App Core with Install option](Images/023-3.png?v=821688900e06&refresh=20260921T184148Z)

5. Scroll all the way down in the installation dialog, select **Load demo data**, and then click **Install**.

   ![Installation dialog with Load demo data selected](Images/023-4.png?v=70d864e5bf1b&refresh=20260921T184148Z)

   > **Load demo data** only in this isolated developer instance, not a production environment.

6. Installation can take approximately **15–30 minutes**

   ![HR plugin installation in progress](Images/023-5.png)



## 2. Verify Knowledge Bases are Available

After Human Resources Scoped App: Core is installed verify that HR knowledge bases are available

1. Click the **"All"** tab in the top navigation
   
2. Type **"knowledge bases"** in the search field
   
3. Select **"Knowledge Bases"** under **Knowledge > Administration**

   ![Knowledge Bases selection screen](Images/024.png?v=0234a6217a04&refresh=20260921T184148Z)

4. Confirm that the **four default knowledge bases**, including **IT**, and **three HR knowledge bases** are listed.

   ![Knowledge Bases list showing four default bases and three HR bases](Images/025.png?v=4a40ad9d06c1&refresh=20260921T184148Z)

   > These are example default bases. Restrict connector ingestion to the approved HR test corpus rather than indexing all demo content. Confirm the actual base inventory, article/base user criteria and required REST/table ACLs.

---

## Summary Checklist

| Step | Task | Status |
|---|---|---|
| 1 | Human Resources Scoped App: Core installed with demo data in the developer instance | ☐ |
| 2 | HR plugin installation complete; four default knowledge bases, including IT, and three HR knowledge bases confirmed | ☐ |

---

## Related Resources

- [Create a ServiceNow Developer Tenant](ServiceNow-Developer-Tenant-Setup-Runbook.md)
- [Next: Configure the ServiceNow Knowledge Copilot Connector](ServiceNow-Copilot-Connector-Configuration-Runbook.md)
- [ServiceNow Integration pattern](ServiceNow-Integration.md)
