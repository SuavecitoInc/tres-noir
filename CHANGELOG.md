# CHANGELOG

## v1.13.0 - 2025-12-29

**Breaking Changes**

- Gatsby dependencies have been updated to the latest major versions.
- The customizer has been updated to improve user experience and performance. Key changes include:
  - Refactored the state management to use React Context API for better scalability.
  - Improved loading times by optimizing image assets and lazy loading components.
  - Updated the UI to enhance accessibility and responsiveness across devices.
  - Fixed several bugs related to variant selection and pricing updates.
  - Separate templates for Glasses and Safety Glasses are no longer necessary; a unified template now handles both product types.
  - See the updated documentation for more details on how to setup and use the new customizer features.
- A new Prescription Upload feature has been added to the customizer, allowing users to upload their prescription documents directly during the customization process.
  - The uploaded prescriptions are uploaded directly to Shopify Files and linked to the corresponding order via a custom line item attribute / property.
  - This feature enhances user convenience and streamlines the order fulfillment workflow.
  - Enable / disable this feature using the `ENABLE_PRESCRIPTION_FILE_UPLOADS` flag in `src/flags.ts`.
- Customer Accounts, have been updated to use the new Shopify Customer Accounts API, which provides a more secure and streamlined experience for users.
  - New environmental variables required:
    - GATSBY_CUSTOMER_ACCOUNTS_CLIENT_ID: example - `1abcd234-56ef-78gh-90ij-123klmno4567`
    - GATSBY_CUSTOMER_ACCOUNTS_SHOP_ID: example - `12345678910`
    - GATSBY_CUSTOMER_ACCOUNTS_SHOP_URL: example - `https://tresnoir.com`
    - GATSBY_CUSTOMER_ACCOUNTS_SHOPIFY_URL: example - `https://shopify.com/12345678910/account`
  - Theres 2 new flags (src/flags) to enable this feature in production and staging environments, new Shopify Accounts must also be enabled in the Shopify admin.
    - ENABLE_NEW_CUSTOMER_ACCOUNTS: Enables the new customer accounts feature.
    - FORWARD_TO_NEW_CUSTOMER_ACCOUNTS: If enabled, this forwards customers to the new Shopify hosted customer accounts pages. When disabled the custom account pages within the site are used. These pages are powered by the new Customer Accounts API.
- All React Context has been updated to use the same directory structure for readability, consistency and maintainability.
  ```
  contexts/
  └── some-context/
      ├── context.tsx
      ├── Provider.tsx
      ├── hooks.ts
      ├── index.ts
      └── types.ts
  ```

## v.1.12.1 - 2025-08-05

**Breaking Changes**

- Fixed the spelling of the Lens Customization product type. The previous misspelling "Lense Customization" has been corrected to "Lens Customization". This will require updates in any related code or configurations that referenced the old spelling.

## v1.12 - 2025-05-05

**Features**

- I have added a New Dealer Application page located at `/pages/dealer-application`.
- The form posts to the new api route `/api/newDealerApplication`.
  - This api route generates an hmac digest from the form data and performs a simple post request to an AWS Lambda that serves as the backend.
  - The header `X-Tres-Noir-Hmac-Sha256` with the digest, is used to verify the request.
  - The AWS Lambda function is responsible for generating a New Dealer Application PDF, uploading it to Google Drive, and sending an email notification.

## v1.11.0 - 2025-01-06

**Breaking Changes**

- Shopify JS-Buy SDK migration to Shopify Storefront API Client.
  - The Cart Context was refactored and migrated to use GraphQL and the Storefront API Client.
  - Typegen was added.
  - Features updated and now using the new context:
    - cart
    - cart drawer
    - customized items (glasses)
    - shipinsure
    - discounts

## v1.10.3 - 2024-12-06

**Breaking Changes**

- Updated all dependencies except for Algolia, ESLint and Prettier.
- The Gatsby Source Shopify plugin had breaking changes in v7 due to Shopify updating their API. See migration [here](https://www.gatsbyjs.com/plugins/gatsby-source-shopify/#shopifyproduct-imagesmedia).
- Styled Components also had breaking changes. Pseudo selectors that do not start with & will no longer get the ampersand implicitly added anymore. This was done to correctly mirror browser behavior. See updated nested syntax handling [here](https://styled-components.com/docs/faqs#nested-syntax-handling).

## v1.10.2 - 2024-11-21

**Features**

- Updated product discount swap to work on both product pages and colleciton pages

## v1.10.1 - 2024-05-20

**Features**

- Added ShipInsure shipping insurance functionality to cart, based on cart attribute

## v1.10.0 - 2024-05-20

**Features**

- TN's and TN's X have Progressive and Bifocal options disabled
- Polarized SKU will now change pricing depending on whether the lens is prescription or not
- Added new Reader's prescription

**Fixes**

- Fixed issue where Non-Prescription would trigger an RX error, repro by editing a frame and going immediately to step 1
- Fixed image for lens type product in /customize, was previously showing random variant image or featuredImage
