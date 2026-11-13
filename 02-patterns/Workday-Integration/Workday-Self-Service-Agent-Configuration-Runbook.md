# Connect Workday agent with Copilot Studio agent using A2A

Use this when you want to integrate Copilot Studio agent with Workday Self-Service agent using A2A protocol. 

## Prerequisites

- Workday tenant and single sign-on configured between Entra ID and Workday > [Runbook - Workday Integration with Microsoft Entra ID](Workday-Developer-Tenant-and-Entra-ID-SSO-Runbook.md)
- REST API client like Visual Studio Code with REST Client extension installed

## Workday tenant regions

`{REGION}` is referenced is several steps and it is the lowercase host prefix for the data center that hosts the tenant. You can see the list of available regions from [Concept: Workday Agent Gateway](https://doc.workday.com/admin-guide/en-us/workday-ai/agents/workday-agent-gateway-for-partner-agents.html?toc=0.4). A tenant on the wrong regional host is rejected.

Build the **Workday** URLs from the region and tenant alias. **NOTE!** Workday developer tenants are always using `odp` prefix

| Region | Prefix |
| --- | --- |
| **Dev Tenants** | `odp`|
| US | `us` |
| EU | `eu` |
| UK | `uk` |
| CAN | `ca` |
| AU | `au` |
| SIN | `sg` |
| IND | `in` |
| JPN | `jp` |



## Set Up Agent System of Record (ASOR) in Workday

Configure the ASOR security domains in Workday > [Set Up Agent System of Record](https://doc.workday.com/admin-guide/en-us/workday-ai/agents/set-up-agent-system-of-record.html)

## Create Workday API client

1. Login to Workday and search and select **Register API Client** task

    ![Workday search results showing the Register API Client task](images/pp-wd-api-01.png)

2. Provide name for the client and configure it like below:
   - Client Grant Type: **Authorization Code Grant**
   - Access Token Type: **Bearer**
   - Redirection URI: `https://localhost`
   - Scope (Functional Areas): **Agent System of Record**
   - Include Workday Owned Scope: 
   
    ![Workday API client settings with Authorization Code Grant, Bearer tokens, and a localhost redirect URI](images/image-1.png)

    ![Workday API client scope set to Agent System of Record with Include Workday Owned Scope enabled](images/image-2.png)

3. Copy **Client ID** and **Client Secret** as you will need them in the API calls. Client Secret can't been seen anymore after you have clicked **Done** can be 

    ![Workday API client registration results showing the client ID and client secret](images/image-5.png)


## Generate auth code and token to call the APIs

Build first URL to request authorization code. Replace {REGION}, {WD-TENANT-ALIAS} and {CLIENT-ID} with you own values. Remember that if you are using Workday Developer tenant then {REGION} = `odp` and for other tenants see [Workday tenant regions](#workday-tenant-regions)

```
https://{REGION}.agent.workday.com/auth/authorize/{WD-TENANT-ALIAS}?response_type=code&client_id={CLIENT-ID}&redirect_uri=https://localhost
```
Open URL in browser, login with your Workday account and select **Allow**

![Workday authorization consent dialog with the Allow option](images/image-6.png)

Copy the authorization code from the redirect URL

![Browser redirect URL containing the Workday authorization code](images/image-7.png)

## Register External Agent in Workday

Visual Studio Code with REST Client extension is used here but you can use any REST client

1. Open Visual Studio Code and make sure that REST Client extension is installed
   
    ![REST Client extension installed in Visual Studio Code](images/reg-ext-agent-01.png)

&nbsp;
2. Open [WD-RegisterExternalAgent.http](./Resources/WD-RegisterExternalAgent.http) file to Visual Studio Code
   
3. Set these values and then save the file. Remember that if you are using Workday Developer tenant then {REGION} = `odp` and for other tenants see [Workday tenant regions](#workday-tenant-regions)
   
   - gateway: **`{REGION}`.agent.workday.com**
   - tenant: Your workday **Tenant name**
   - clientId: **Client ID** of the API you registered in the [Create Workday API Client](#create-workday-api-client) step
   - clientSecret: **Client Secret** of the API you registered in the [Create Workday API Client](#create-workday-api-client) step
   - code: **Authorization code** generated in the previous step

      &nbsp;

      ![Workday external agent registration HTTP file with gateway, tenant, client credentials, and authorization code variables](images/reg-ext-agent-02.png)

4. Click **Send Request** and if all values are correct for the API call then you should get HTTP 200 OK for successful call. Copy the **access token** value as that is needed in the next step. 
  
    **NOTE!** If you need to run this request again then first re-authorize to get new authorization code
   
   ![REST Client token request returning HTTP 200 OK with an access token](images/reg-ext-agent-03.png)

5. Paste the **access token** to @token variable value and click **Send Request**. You should get HTTP 201 Created response for successful call with body of registered agent 
   
   ![REST Client external agent registration request returning HTTP 201 Created with the registered agent details](images/reg-ext-agent-04.png)


## Configure agent in Workday

In Workday, open **Agent Management Hub** to finalize external agent's configuration which was just created

1. Select the registered agent **Copilot Studio - Sana A2A**
   
   ![Workday Agent Management Hub showing the registered Copilot Studio - Sana A2A agent](images/wd-agent-01.png)

2. Select **Credentials** and click **Edit**
   
   ![Workday external agent Credentials tab with the Edit option](images/wd-agent-02.png)

3. Set **Redirect URI** to `https://localhost` and click **OK**. **NOTE!** This is temporary URI which will be replaced later with actual Redirect URI
   
   ![Workday external agent credentials with the temporary redirect URI set to https://localhost](images/wd-agent-03.png)

4. Click **Generate New Client Secret** and in the opened dialog select **Confirm** and click **OK**
   
    ![Workday confirmation dialog for generating a new external agent client secret](images/wd-agent-04.png)

5. Copy **Client Secret** somewhere like notepad as we need that in the Power Platform side of the configuration and click **Done**

    ![Workday dialog displaying the newly generated external agent client secret](images/wd-agent-05.png)

6. Click **Configure Agent**

    ![Workday external agent page with the Configure Agent option](images/wd-agent-06.png)

7. Enable Workday Self-Service Agent skill and define which users should be able to use it using **Available To**. Then click **Save**

    ![Workday agent configuration with the Self-Service Agent skill enabled and Available To user access settings](images/wd-agent-07.png)


8. Activate the agent

    ![Inactive Copilot Studio - Sana A2A agent with the Activate Agent button highlighted](images/wd-agent-08.png)

    ![Copilot Studio - Sana A2A agent showing Active status after activation](images/wd-agent-09.png)

&nbsp;

## Values to collect

Collect following values which are needed in A2A configuration in Copilot Studio. That configuration will create Power Platform custom connector which we need to change in later steps

| Item | Where it comes from |
| --- | --- |
| Environment URL | The Power Platform environment that owns the connector |
| Tenant alias | Workday tenant name |
| Client ID | Workday registered external agent OAuth client ID |
| Client Secret | Workday registered external agent OAuth client Secret |
| Region | Host prefix from [Workday Tenant Regions](#workday-tenant-regions)  |
| Connector redirect URL | Generated by Power Platform when connector is created |

&nbsp;

#### Build the URLs like below using your region and tenant alias 

```text
Agent endpoint URL: https://{region}.agent.workday.com/v1/a2a/{tenant-alias}/self-service-agent
Authorize:  https://{region}.agent.workday.com/auth/authorize/{tenant-alias}
Token:      https://{region}.agent.workday.com/auth/oauth2/{tenant-alias}/token
Refresh:    https://{region}.agent.workday.com/auth/oauth2/{tenant-alias}/token
```

The connector redirect is not a URL you choose. After the connector is created it looks like this:

```text
https://global.consent.azure-apim.net/redirect/{connector-redirect-id}
```

Register that exact value on the Workday OAuth client. Each Power Platform custom connector gets its own Redirect URI. Do not reuse the Redirect URIs from another connector.


## Configure A2A in Copilot Studio

1. Open existing Copilot Studio agent or create new agent using **Microsoft Copilot Harness**
   
2. Select **Connected agents**. 
   
   ![Connected agents page in Copilot Studio](images/mcs-a2a-01.png)

3. Select Add > **Add A2A Agent**
   
   ![Copilot Studio Add menu with the Add A2A Agent option](images/mcs-a2a-02.png)

4. Paste agent endpoint URL defined [here](#build-the-urls-like-below-using-your-region-and-tenant-alias) and provide name and description
   
   - Name: `Workday-Self-Service-Agent`
   - Description: `Assist with employment-related tasks, including viewing and updating employee information, checking vacation balances, and submitting time-off requests.`

    ![Copilot Studio A2A agent setup with the Workday Self-Service Agent endpoint, name, and description](images/mcs-a2a-03.png)
      
5. Select **OAuth 2.0** authentication and define following values. Values needed here are your Workday registered external agent Client ID/Secret, Authorization and Token URLs

    ![A2A connector OAuth 2.0 settings for the client ID, client secret, authorization URL, token URL, and refresh token URL](images/mcs-a2a-04.png)

    &nbsp;

    ![Workday external agent Credentials tab showing the OAuth authorization and token endpoints and client ID](images/mcs-a2a-04-2.png)

6. Click **Next** to create the A2A connector
   
7. Copy generated **Redirect URI**
   
    ![Generated redirect URI for the Workday A2A connector in Copilot Studio](images/mcs-a2a-05.png)

8. Go to **Workday** external agent configuration and update the **Redirect URI**

    ![Workday external agent redirect URI updated to the generated Power Platform connector redirect URI](images/mcs-a2a-07.png)

9.  Then back to Copilot Studio to create connection for the Workday A2A agent
    
    ![Copilot Studio connection setup for the Workday A2A agent](images/mcs-a2a-08.png)

10. Test A2A in your agent for example by asking about `tell me about my employee information including home address and provide results as table`

    ![Copilot Studio test conversation retrieving employee information through the Workday A2A agent](images/mcs-a2a-09.png)

