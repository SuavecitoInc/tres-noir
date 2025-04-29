# CHANGELOG

## v.0.12 - 2025-04-29

**Features**

- Initial new Dealer Application

## v.0.11 - 2025-01-06

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

## v.0.10 - 2024-12-06

**Breaking Changes**

- Updated all dependencies except for Algolia, ESLint and Prettier.
- The Gatsby Source Shopify plugin had breaking changes in v7 due to Shopify updating their API. See migration [here](https://www.gatsbyjs.com/plugins/gatsby-source-shopify/#shopifyproduct-imagesmedia).
- Styled Components also had breaking changes. Pseudo selectors that do not start with & will no longer get the ampersand implicitly added anymore. This was done to correctly mirror browser behavior. See updated nested syntax handling [here](https://styled-components.com/docs/faqs#nested-syntax-handling).

## v.0.10 - 2024-11-21

**Features**

- Updated product discount swap to work on both product pages and colleciton pages

## v.01.10 - 2024-05-20

**Features**

- Added ShipInsure shipping insurance functionality to cart, based on cart attribute

## v.01.10 - 2024-05-20

**Features**

- TN's and TN's X have Progressive and Bifocal options disabled
- Polarized SKU will now change pricing depending on whether the lens is prescription or not
- Added new Reader's prescription

**Fixes**

- Fixed issue where Non-Prescription would trigger an RX error, repro by editing a frame and going immediately to step 1
- Fixed image for lens type product in /customize, was previously showing random variant image or featuredImage
