/**
 * Copyright 2020, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// TODO: move this to API service and add a fetchSpec method to the main interface.
export interface APIConfig {
  name: string;
  route: string;
}

export interface HostedAPIConfig extends APIConfig {
  url: string;
}

export interface GitHubAPIConfig extends APIConfig {
  repo: string;
  path: string;
}

export function isGitHubAPIConfig(
  config: APIConfig,
): config is GitHubAPIConfig {
  return (config as GitHubAPIConfig).repo !== undefined;
}

export function isHostedAPIConfig(
  config: APIConfig,
): config is HostedAPIConfig {
  return (config as HostedAPIConfig).url !== undefined;
}

export type APIConfigDict = {
  [key: string]: APIConfig;
};

export type HostedAPIConfigDict = {
  [key: string]: HostedAPIConfig;
};

export type GitHubAPIConfigDict = {
  [key: string]: GitHubAPIConfig;
};

/**
 * Add your APIs in one of the two maps below.
 */

export const hostedAPIConfigs: HostedAPIConfigDict = {
  // KEY_FOR_YOUR_API: {
  //  name: "Label for the Select",
  //  route: "your-route-in-this-app",
  //  url: "https://url.to/your/open-api-schema.json",
  // },

  // ######################
  // Merchant Acquisition
  // ######################
  LOGISTICS: {
    name: 'Logistics',
    route: 'logistics',
    url:
      'https://logistics-api.k8s-eu-central-1-theta.internal.sam-app.ro/logistics-api.json',
  },

  // ######################
  // Payments
  // ######################
  ACQUIRER_API: {
    name: 'Acquirer API',
    route: 'acquirer-api',
    url:
      'https://acquirer-server.k8s-eu-central-1-theta.internal.sam-app.ro/openapi',
  },

  // ######################
  // Debitoor
  // ######################
  DEBITOOR_WEBHOOKS: {
    name: 'Debitoor Webhooks',
    route: 'debitoor-webhooks',
    url: 'https://beta.debitoor.dev/docs/apis/webhooks/openapi',
  },
  DEBITOOR_BRAND: {
    name: 'Debitoor Brand',
    route: 'debitoor-brand',
    url: 'https://beta.debitoor.dev/docs/apis/brand/openapi',
  },

  ONLINE_PAYMENTS: {
    name: 'Online Payments',
    route: 'online-payments',
    url:
      'https://online-payments.k8s-eu-central-1-theta.internal.sam-app.ro/api-docs/openapi',
  },
};

export const githubAPIConfigs: GitHubAPIConfigDict = {
  // KEY_FOR_YOUR_API: {
  //  name: 'Label for the Select',
  //  route: 'your-route-in-this-app',
  //  repo: 'name-of-your-github-repo',
  //  path: 'path/to/spec/in/repo.json'
  // }
  PARTNERS_NOTIFICATIONS: {
    name: 'Partners Notifications',
    route: 'partners-notifications',
    repo: 'partners-api',
    path: 'specs/partners-notifications-api.json',
  },

  POS_CHECKOUT_API: {
    name: 'POS Sales Checkout API',
    route: 'pos-sales-checkout',
    repo: 'pos-api',
    path: 'sumup/pos/sales_checkout_api/v1beta/salesCheckoutApi.yaml',
  },

  POS_MERCHANT_API: {
    name: 'POS Merchant API',
    route: 'pos-merchant-api',
    repo: 'pos-api',
    path: 'sumup/pos/pos_merchant_api/v1beta/posMerchantApi.yaml',
  },

  POS_SALES_RECEIPTS_API: {
    name: 'POS Sales Receipts API',
    route: 'pos-sales-receipts-api',
    repo: 'pos-api',
    path: 'sumup/pos/sales_receipts_api/v1beta/salesReceiptsApi.yaml',
  },
};
