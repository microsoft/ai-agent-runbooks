# Runbook - Create a ServiceNow Developer Tenant

## Overview

Create a free ServiceNow Personal Developer Instance to use as the external knowledge
source for the HR Onboarding Agent. This runbook covers account registration, initial
setup, and instance provisioning.

After creating the instance, continue with
[Install the ServiceNow HR Plugin](ServiceNow-HR-Plugin-Installation-Runbook.md).

> **Before You Start**
> - Use an approved isolated developer instance for sample articles; production needs HR-approved content and a supported governed environment.

---

## Prerequisites

| Requirement | Details |
|---|---|
| Email address | Required to sign up for a ServiceNow Developer account |

---

## 1. Sign Up for a ServiceNow Developer Account

1. Open your browser and go to https://developer.servicenow.com and click **"Sign In"** in the top right corner

   ![ServiceNow Developer Program home page](Images/009.png?v=983ec1a44fb7&refresh=20260921T184148Z)

2. Click **"New user? Get a ServiceNow ID"**

   ![Get a ServiceNow ID button](Images/010.png?v=f037ca47690b&refresh=20260921T184148Z)

3. Fill out the registration form with the following details:
   - Email
   - First Name
   - Last Name
   - Country
   - Password
   - Confirm Password
   - Check the reCAPTCHA box
   - Accept the Terms of Use

4. Click **Sign Up**

   ![ServiceNow ID registration](Images/011.png?v=a765ebb28698&refresh=20260921T184148Z)

---

## 2. Verify Your Email

1. Check your inbox for a verification email from `signon@service-now.com`

2. Click **"Verify Email"** in the email

   ![Verification email](Images/012.png?v=5a2ef66136d3&refresh=20260921T184148Z)

3. After verification, log in to your ServiceNow account

4. Skip the MFA setup for now

   ![MFA setup screen](Images/013.png?v=ec16e44e275c&refresh=20260921T184148Z)

   > **Security requirement:** In production environments complete the organization's required MFA enrollment; do not skip MFA for convenience.

---

## 3. Complete Initial Setup

1. In the **"Getting Started"** dialog, click **"No"** (I need a guided experience)

   ![Getting Started screen](Images/014.png?v=b290150de46a&refresh=20260921T184148Z)

2. In the next window, select your preferred options, check the **Terms of Use** checkbox, and click **"Finish Setup"**

   ![Set-up screen](Images/015.png?v=eb104e23f2fc&refresh=20260921T184148Z)

---

## 4. Request a ServiceNow Instance

1. You should now be in your **ServiceNow Developer Dashboard**
2. Click **"Request Instance"** in the top right corner

   ![Request Instance screen](Images/016.png?v=07d6ce9601d1&refresh=20260921T184148Z)

3. Select the latest available instance version, such as **Australia** shown in this example, and click **Setup Australia instance**.

   ![Request an Instance screen with Australia selected](Images/017.png?v=516b20615a0d&refresh=20260921T184148Z)

4. Click **Run in background** and wait until the instance is ready. This usually takes a short time, but provisioning time can vary.

   ![Instance provisioning with Run in background option](Images/017-2.png?v=dcd647a3d70c&refresh=20260921T184148Z)

5. When the instance is ready, click **Manage my instance**.

   ![Instance ready with Manage my instance option](Images/017-3.png?v=f7ba520b477d&refresh=20260921T184148Z)

6. The **Manage my instance** screen shows your instance details:
   - **Instance URL**: `https://dev[XXXXXX].service-now.com`
   - **Username**: `admin`
   - **Current password**: *(auto-generated)*

   ![Manage my instance screen](Images/018.png?v=894db1a02445&refresh=20260921T184148Z)

7. Click the **instance link** to open the instance.

   ![Click the instance link to open the ServiceNow instance](Images/022.png?v=82e8fb2375c2&refresh=20260921T184148Z)

   > Use admin access only for authorized instance setup. Keep credentials in an approved secret manager, never in documentation or screenshots. The connector must use its own scoped integration identity. Developer instances can hibernate; confirm the instance is awake before connector testing.

---

## Summary Checklist

| Step | Task | Status |
|---|---|---|
| 1 | ServiceNow Developer account created | ☐ |
| 2 | Email verified and account activated | ☐ |
| 3 | Initial setup completed | ☐ |
| 4 | ServiceNow Dev instance requested, ready and opened | ☐ |

---

## Troubleshooting

| Issue | Solution |
|---|---|
| "Sign in" button not appearing | Check the current authentication flow, browser/session state and service status; report a persistent issue to the administrator. |
| Instance reclaimed by ServiceNow | Re-request a new instance and reconfigure the connector if one was already configured. |

---

## Related Resources

- [Next: Install the ServiceNow HR Plugin](ServiceNow-HR-Plugin-Installation-Runbook.md)
- [Configure the ServiceNow Knowledge Copilot Connector](ServiceNow-Copilot-Connector-Configuration-Runbook.md)
- [ServiceNow Integration pattern](ServiceNow-Integration.md)
- [ServiceNow Developer Program](https://developer.servicenow.com)
