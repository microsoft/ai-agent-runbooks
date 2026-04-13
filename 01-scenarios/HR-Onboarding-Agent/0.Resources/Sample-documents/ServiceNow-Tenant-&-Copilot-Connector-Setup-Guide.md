# ServiceNow Tenant & Copilot Connector Setup Guide

> **Referenced from**: [HR-Onboarding-Agent>3.Runbook>Phase 1: ServiceNow Knowledge Base Setup>Step 1-1. Create ServiceNow Tenant & Configure Copilot Connector](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/3.Runbook.md#step-1-1-create-servicenow-tenant--configure-copilot-connector)  
> **Purpose**: Set up a free ServiceNow Developer Instance and configure the
> ServiceNow Knowledge Copilot Connector in M365 Admin Center  
> **Target Readers**: Delivery engineer  
> **Last Updated**: April 13, 2026

---

## Overview

This guide walks through two main tasks:

1. **Create a free ServiceNow Developer Instance** — required as the external
   knowledge source for the HROnboardingAutoAgent
2. **Install and configure the ServiceNow Knowledge Copilot Connector** — indexes
   ServiceNow knowledge base articles into M365 so they can be used as agent knowledge

> ⚠️ **Before You Start**  
> - The ServiceNow Copilot Connector is currently in **public preview**  
> - This capability is **enabled by default** in all Microsoft 365 Copilot licensed tenants  
> - Admins can disable this on a user/group basis via **Integrated Apps** in M365 Admin Center  
> - Reference: [Manage Plugins for Copilot in Integrated Apps](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-plugins-for-copilot-in-integrated-apps)

---

## Prerequisites

| Requirement | Details |
|---|---|
| Email address | Required to sign up for a ServiceNow Developer account |
| M365 Admin access | Required to install and configure the Copilot Connector |
| Microsoft 365 Copilot license | Required for the tenant where the connector will be installed |

---

## Part 1: Create a Free ServiceNow Developer Instance

### Step 1-1-1. Sign Up for a ServiceNow Developer Account

1. Open your browser and go to https://developer.servicenow.com

> ![ServiceNow Developer Program home page](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/009.png)

2. Click **"Sign In"** in the top right corner
3. Click **"New user? Get a ServiceNow ID"**

> ![Get a ServiceNow ID button](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/010.png)

4. Fill out the registration form with the following details:
   - Email
   - First Name
   - Last Name
   - Country
   - Password
   - Confirm Password
   - Check the reCAPTCHA box
   - Accept the Terms of Use
     
5. Click **Sign Up**

> ![ServiceNow ID registration](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/011.png)
>

---

### Step 1-1-2. Verify Your Email

1. Check your inbox for a verification email from `signon@service-now.com`
2. Click **"Verify Email"** in the email

> ![Verification email](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/012.png)

3. After verification, log in to your ServiceNow account
4. On first login, MFA setup will appear on the next screen.

> ![MFA setup screen](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/013.png)
>

   > 💡 **Note**: For simplicity, click **"Skip"** to proceed without MFA.

---

### Step 1-1-3. Complete Initial Setup

1. In the **"Getting Started"** dialog, click **"No"** (I need a guided experience)

> ![Getting Started screen](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/014.png)
>

2. In the next window, select your preferred options, check the **Terms of Use** checkbox, and click **"Finish Setup"**

> ![Set-up screen](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/015.png)
>


---

### Step 1-1-4. Request a ServiceNow Instance

1. You should now be in your **ServiceNow Developer Dashboard**
2. Click **"Request Instance"** in the top right corner

> ![Request Instance screen](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/016.png)
>

3. Choose **"Zurich release"** and click **"Request"**  
 
> ![Request an Instance screen](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/017.png)
>

   > 💡 This process typically takes less than a minute.

4. Once the instance is ready, a Manage my instance screen will appear with your instance details:
   - **Instance URL**: `https://dev[XXXXXX].service-now.com`
   - **Username**: `admin`
   - **Current password**: *(auto-generated)*

> ![Manage my instance screen](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/018.png)
>

   > 💡 You are expected to have the 'Admin' user role assigned. 

---

### Step 1-1-5. Switch to Admin Role (Skip this step if you have the 'Admin' user role assigned.)

1. Click **"Actions"** in the top right corner and **"Change User Role"** from the dropdown.

> ![Change user role screen](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/019.png)

2. In the **"Change User Role"** dialog, select **"Admin"**

>![Change user role - admin selection screen](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/020.png)

   > ⚠️ **Important**: Admin access is required to configure the ServiceNow instance for the Copilot Connector.

3. Click **"Change"** to confirm
4. Click **"Done"** once the change is confirmed

>![Role change screen](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/021.png)
 
5. Click **"Cancel"** to exit the dialog

---

### Step 1-1-6. Retrieve Admin Credentials

1. On the **"Manage my instance"** page, note down the following credentials — you will need them in Part 2:

>![Manage my instance page](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/022.png)

   - **Instance URL**: `https://dev[XXXXXX].service-now.com`
   - **Username**: `admin`
   - **Password**: *(shown in the manage password screen)*  
     
   > ⚠️ **Important Notes on Instance Availability**:  
   > - ServiceNow instances will **hibernate** after a period of inactivity  
   > - Attempts to access the instance via Graph or Power Platform connectors will **fail** when the instance is hibernating  
   > - Always validate the instance is **awake** before starting your demo  
   > - If an instance is **dormant for more than 10 days**, it will be reclaimed by ServiceNow — logging in via the Copilot connector alone is **not sufficient** to keep it active  

---

## Part 2: Configure Admin Access in ServiceNow Instance

### Step 1-1-7. Log In to Your ServiceNow Instance as Admin

1. Open your browser and go to your **Instance URL** from Step 1-1-6  
   `https://dev[XXXXXX].service-now.com`
2. Log in with:
   - **Username**: `admin`
   - **Password**: *(from Step 1-1-6)*

> ![ServiceNow instance login page](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/023.png)

---

### Step 1-1-8. Verify Knowledge Bases are Available

1. Click the **"All"** tab in the top navigation
2. Type **"knowledge bases"** in the search field
3. Select **"Knowledge Bases"** under **Knowledge > Administration**

> ![Knowledge Bases selection screen](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/024.png)

4. Confirm the following four default Knowledge Bases are listed:

   | Knowledge Base | Description |
   |---|---|
   | KCS Knowledge Base (demo data) | KCS Demo KB |
   | Known Error | Default knowledge base for Known Errors |
   | IT | The ACME North America IT Service Desk Knowledge Base |
   | Knowledge | Knowledge Base for general Knowledge users |

> ![Knowledge Bases list](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/025.png)

   > 💡 These four knowledge bases will be imported and indexed into M365 using the ServiceNow Copilot Connector.

---

## Part 3: Install the ServiceNow Knowledge Copilot Connector

> ⚠️ **You will need your ServiceNow admin credentials from Step 1-1-6 for this part.**

### Step 1-1-9. Add a New Connection in M365 Admin Center

1. Log in to **M365 Admin Center** → https://admin.microsoft.com
2. Navigate to **Copilot** → **Connectors** → **Your Connections**
3. Click **"+ Add Connection"**

> ![M365 Admin Center - Copilot Connectors page](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/026.png)

4. In the connector list, select **"Add"** of **"ServiceNow Knowledge"**
5. Click **"Next"**

> ![ServiceNow Knowledge - Add screen](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/027.png)

---

### Step 1-1-10. Configure the Connection Settings

1. Click **"Custom setup"** in the upper right of the screen

> ![Custom setup screen](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/028.png)

2. Fill in the following fields in the **Setup** tab:

   | Required Field | Value |
   |---|---|
   | Display name | `ServiceNow` *(or a unique name, e.g., `ServiceNowKB5`)* |
   | ServiceNow URL | `https://dev[XXXXXX].service-now.com` *(your instance URL from Step 1-1-6)* |
   | Authentication type | `Basic` |
   | Username | `admin` |
   | Password | *(your admin password from Step 1-1-6)* |
   | Notice | `✅` |

   > ⚠️ **Security Note**: `Basic` authentication is used for **demo/dev purposes only**.  
   > For **customer deployments**, always use **ServiceNow OAuth** or **Azure AD OIDC**.

> ![Custom setup screen](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/029.png)

---

### Step 1-1-11. Authenticate the Connection

1. Click **"Authorize"** and wait for authentication to complete

> ![Authentication screen](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/030.png)

2. After successful authentication, confirm that **green check marks** appear next to the username and password fields

> ![Green Check Marks](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/031.png)


---

### Step 1-1-12. Configure User Access Permissions

1. Click the **"Users"** tab at the top of the setup panel

2. Under **"Access Permissions"**, select **"Everyone"**

> ![Users - Access Permissions screen](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/032.png)

   > ⚠️ **Security Note**: **"Everyone"** is selected for demo/dev convenience only.  
   > For **customer deployments**, always select **"Only people with access to this data source"**  
   > to preserve the access controls configured in ServiceNow.

---

### Step 1-1-13. Create the Connection

1. Go back to the **"Setup"** tab
2. Check all the required values are populated
3. Click **"Create"**

> ![Connection creation screen](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/033.png)
>

4. The button will display **"Creating connection"** while the process runs

---

### Step 1-1-14. Add a Connector Description

1. Once the connection is created, a success screen will appear:  
   **"Created connection — ServiceNow (ServiceNowKB[X])"**

> ![Created connection screen](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/034.png)

2. Click **"Auto suggestion"** to have Copilot generate a description automatically

> ![Auto suggestion screen](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/035.png)

   > 💡 **If "Auto suggestion" does not work**, you can add the description later:  
   > - Wait until the connection status shows **"Ready"**  
   > - Click the connection in the list → Click **"Edit description"**  
   > - Paste the following sample description:

   ```
   I want to use this connection to provide solutions, best practices,
   troubleshooting guides, and other relevant content. It serves as a
   valuable resource for users, IT professionals, and support teams within
   organizations. The data source contains articles, documents, and FAQs
   related to various topics, including software applications, hardware,
   processes, and policies.
   ```

3. Click **"Save"** and **"Done"**

   > ⚠️ **Important**: The **first sync can take up to 2 hours** to complete.  
   > Wait for the sync to finish before proceeding to the next step.

> ![Save and Done screen](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/036.png)

---

## Part 4: Verify the Connection

### Step 1-1-15. Verify Indexed Content via Microsoft Search

1. Navigate to https://microsoft365.com and log in as a user in your tenant
2. After clicking **`Search*`** on the navigation, type **`KB0*`** in the search, and press **Enter**

> ![Microsoft 365 search results showing KB articles from ServiceNow](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/037.png)

3. Click **"All Sources"** filter → Select your ServiceNow connector (e.g., `ServiceNow-KB`)
4. Confirm that KB articles from ServiceNow are listed in the results

>![Search results filtered by ServiceNow-KB showing knowledge articles](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/0.Resources/Images/038.png)

---

### Step 1-1-16. Verify via M365 Copilot Prompts (Optional)

Use the following prompts in **M365 Copilot (Teams)** to verify the connector is working:

> 💡 Before testing, disable **"Web content"** in the Copilot plugin settings to ensure responses come only from the ServiceNow connector.

| Scenario | Prompt |
|---|---|
| Test basic retrieval | `List the articles regarding Outlook 2010. Place the results in a table with the article title in one column and a brief summary in the other.` |
| Test thematic analysis | `What are the main themes in the ServiceNow IT knowledge base regarding Windows?` |
| Test content drafting | `Draft an email to inform employees about necessary precautions to prevent phishing attacks and remind them of their data protection responsibilities. Include a brief summary of each KB article.` |

---

## Summary Checklist

| Step | Task | Status |
|---|---|---|
| 1-1-1 | ServiceNow Developer account created | ☐ |
| 1-1-2 | Email verified and account activated | ☐ |
| 1-1-3 | Initial setup completed | ☐ |
| 1-1-4 | ServiceNow Dev instance requested and ready | ☐ |
| 1-1-5 | User role changed to Admin | ☐ |
| 1-1-6 | Admin credentials noted | ☐ |
| 1-1-7 | Logged in to ServiceNow instance as Admin | ☐ |
| 1-1-8 | Four default Knowledge Bases confirmed | ☐ |
| 1-1-9 | New connection added in M365 Admin Center | ☐ |
| 1-1-10 | Connection settings configured | ☐ |
| 1-1-11 | Authentication completed (green check marks visible) | ☐ |
| 1-1-12 | User access permissions set to "Everyone" | ☐ |
| 1-1-13 | Connection created successfully | ☐ |
| 1-1-14 | Connector description added | ☐ |
| 1-1-15 | Indexed content verified via Microsoft Search | ☐ |
| 1-1-16 | M365 Copilot prompts tested (optional) | ☐ |

---

## Troubleshooting

| Issue | Solution |
|---|---|
| "Sign in" button not appearing | Wait a moment — this is a known UI bug. The button will appear shortly. |
| "Create" button remains disabled | Click to the Users tab and back to trigger button activation. |
| "Auto suggestion" does nothing | Add description manually after connection reaches "Ready" state. |
| Connector returns errors when querying | Verify the ServiceNow instance is not hibernating — log in directly first. |
| Instance reclaimed by ServiceNow | Re-request a new instance and reconfigure the connector. |
| Items indexed count is 0 after sync | Wait up to 2 hours for first sync. Run a full crawl if still 0 after that. |

For additional troubleshooting, refer to:  
[Troubleshooting the ServiceNow Knowledge Microsoft Copilot connector — Microsoft Learn](https://learn.microsoft.com/en-us/microsoftsearch/troubleshoot-servicenow-knowledge-connector)

---

## Related Resources

- Step-by-Step deployment guide → [`3.Runbook.md`](01-scenarios/HR-Onboarding-Agent/3.Runbook.md)
- Phase 1 — Add HR Documents to ServiceNow KB → [`3.Runbook.md#step-1-1`](https://github.com/microsoft/cloud-accelerate-factory/blob/a6ff27ebddf3ec4b4e7197bac66c273007e3f1a0/01-scenarios/HR-Onboarding-Agent/3.Runbook.md#step-1-1-create-servicenow-tenant--configure-copilot-connector)
- https://developer.servicenow.com
- https://admin.microsoft.com
- https://learn.microsoft.com/en-us/microsoftsearch/troubleshoot-servicenow-knowledge-connector
