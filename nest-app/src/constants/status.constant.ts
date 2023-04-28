export enum AppStatus {
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  REQUIRE_VERIFY = 'REQUIRE_VERIFY',
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING',
  CLOSED = 'CLOSED',
  UPGRADED = 'UPGRADED',
  DOWNGRADED = 'DOWNGRADED',
  EXPIRED = 'EXPIRED',
  TRIAL = 'TRIAL',
  UNAUTHENTICATED = 'UNAUTHENTICATED'
}

/*
Here are some common status options that might be used for an account:

1. Active: The account is currently in use and all services or features are available.

2. Inactive: The account is not currently in use and all services or features are disabled.

3. Suspended: The account has been temporarily suspended due to non-payment or violation of terms of service.

4. Pending: The account has been created but is not yet activated. This status is typically used for new accounts that require verification or approval.

5. Closed: The account has been permanently closed and all services or features are disabled.

6. Upgraded: The account has been upgraded to a higher level of service or functionality.

7. Downgraded: The account has been downgraded to a lower level of service or functionality.

8. Expired: The account has reached the end of its contract term and all services or features are disabled until renewed.

9. Trial: The account is in a trial period, with limited access to services or features.

These are just a few examples of account status options, and the specific options used will depend on the needs of the business and the system being used.

The status of an account at the end of a trial period would depend on what action the account holder takes.

If the account holder decides to upgrade to a paid plan, the account status would be changed to "Active" or "Upgraded".

If the account holder chooses not to upgrade and does not take any further action, the account status would typically be changed to "Inactive" or "Expired" depending on the specific system being used.

Some systems may also offer a grace period after the trial ends, during which the account may still be considered "Active" but with limited functionality until the account holder either upgrades or lets the trial expire.
*/
