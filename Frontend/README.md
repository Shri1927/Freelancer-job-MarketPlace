
**URL**:https://freelancer-job-market-place.vercel.app/


## Escrow demo

A simple client-side escrow demo was added to the frontend using a mock API at `src/lib/escrowService.js`.

How to try it:

1. Open a job and click **Hire & Fund** on a bid — this navigates to `/contract` with demo query params and pre-creates a draft contract.
2. On the **Create Contract** page you will see an **Escrow Agreement** card; choose a **Demo Agreement** template from the selector, read the terms and **Sign** the agreement (required for demo protection).
3. You can **View Terms** for the selected template before signing. After signing the agreement the **Fund Escrow** button is enabled — click it to open the demo payment modal and simulate funding.
4. After funding you'll see contract status and can **Release Funds** or **Refund** to test flows.

Notes:
- The demo service stores contracts in `localStorage` under the key `demo_escrow_contracts_v1`.
- This is a frontend-only mock for demo/testing only; replace with a real payment provider and backend for production.

