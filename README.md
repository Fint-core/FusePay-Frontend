FusePay

Product Requirements & Technical Architecture

Document version: 1.0 Product stage: Concept / Pre-development Initial market: Nigeria Blockchain ecosystem: Stellar Smart contract platform: Soroban Product category: Fintech, Utility Exchange and Digital Asset Marketplace

Executive Summary

FusePay is a fintech utility exchange platform designed to reduce waste from unused telecommunications value while providing users with a unified marketplace for utility trading and digital financial transactions.

The platform lets individuals and vendors offer eligible airtime, mobile data, and gift cards to other users.

Through peer-to-peer trading, users can purchase available utility products, while individuals with transferable or giftable data plans can offer unused value to other subscribers.

FusePay combines a conventional fintech experience with blockchain-powered financial infrastructure.

The platform introduces a hybrid wallet supporting Nigerian Naira (NGN) and selected digital assets, initially USDC and XLM on Stellar.

Its financial architecture includes an internal double-entry ledger, escrow-supported P2P transactions, cryptocurrency exchange functionality and blockchain settlement.

FusePay aims to make digital utility value more accessible, tradable and useful across African markets, beginning with Nigeria.

Problem Statement

Telecommunications users across Africa regularly purchase airtime and mobile data subscriptions that are not completely consumed before their validity periods expire.

This creates unused utility value.

Existing telecom systems provide different forms of data sharing and gifting, but users lack a unified marketplace where eligible utility value can be offered to other consumers in exchange for payment.

Other challenges include:

Limited opportunities to exchange unused transferable data.
Fragmented utility marketplaces.
Difficulty discovering competitive data and airtime offers.
Limited transaction protection between individual buyers and sellers.
Fragmented access to local currency and digital assets.
Proposed Solution

FusePay introduces a unified marketplace where individuals and vendors can publish utility offers and trade with other users.

The platform combines:

P2P utility marketplace.
Airtime and data purchasing.
Gift card trading.
Escrow-supported transactions.
Multi-asset digital wallet.
Cryptocurrency and fiat exchange.
Stellar-powered financial settlement.
The initial telecom integration will use supported network data-sharing and gifting mechanisms.

FusePay will support different fulfilment methods depending on the capabilities of each telecommunications provider.

Target Users

Individual telecom subscribers.
Buyers seeking affordable utility products.
Individuals selling eligible transferable utility value.
Utility vendors and resellers.
Gift card traders.
Users interested in supported digital asset transactions.
Product Modules

Home Dashboard

The dashboard provides:

NGN wallet balance.
USD equivalent.
Bank transfer.
FusePay transfer.
Wallet address transfer and receiving.
Airtime, data and gift card shortcuts.
Buy and Sell actions.
Recent activities.
Marketplace

The marketplace contains:

Airtime listings.
Data listings.
Gift card listings.
Individual seller offers.
Vendor offers.
Search and filtering.
Listing creation.
Swap

The Swap module supports:

NGN and supported cryptocurrency conversions.
USDC and XLM conversions.
Supported crypto-to-crypto swaps.
Live exchange quotes.
Transaction fees.
Quote expiration.
Transaction history.
Additional blockchain networks will require suitable liquidity and bridging integrations.

5.4 Trade

The Trade module manages:

Pending orders.
Active trades.
Payment reservations.
Seller fulfilment.
Buyer confirmation.
Disputes.
Completed orders.
Cancelled and refunded trades.
Me

The account management section contains:

User profile.
Phone verification.
Security settings.
Transaction PIN.
Wallet management.
Payment methods.
Notifications.
Support.
Transaction history.
Authentication

Registration uses a mobile phone number and OTP verification.

The phone number becomes the user's primary account identifier for transfers and account discovery.

Phone numbers will be normalized to international E.164 format.

Each user receives an internal immutable user ID.

Authentication requirements include:

OTP verification.
Secure password storage.
Login and logout.
Session management.
Transaction PIN.
Account recovery.
Rate limiting.
Financial Architecture

FusePay uses a hybrid wallet architecture.

NGN Wallet

Managed through the backend financial ledger and supported payment infrastructure.

Stellar Wallet

Supports selected Stellar assets, initially:

USDC.
XLM.
Internal Ledger

The ledger is responsible for recording:

Available balances.
Reserved balances.
Escrow balances.
Deposits.
Withdrawals.
Transfers.
Fees.
Settlements.
Reversals.
The ledger must use double-entry accounting.

Every transaction must balance and have a unique reference.

Currency Selection

The buyer chooses the currency accepted for a trade.

The seller receives settlement in the same currency.

Supported trade currencies initially include NGN, USDC and XLM, subject to listing eligibility.

P2P Escrow Architecture

The escrow engine coordinates trade reservations and settlement.

Trade lifecycle

Buyer selects a listing.
Buyer selects the payment currency.
FusePay validates available funds.
The ledger reserves the required amount.
Seller receives an order notification.
Seller fulfils the order.
Seller marks the order as delivered.
Buyer receives a confirmation modal.
Buyer confirms receipt or raises a dispute.
Funds are released or handled through dispute resolution.
Transaction states

CREATED
PAYMENT_PENDING
FUNDS_SECURED
SELLER_PROCESSING
DELIVERED
BUYER_CONFIRMATION
COMPLETED
DISPUTED
EXPIRED
CANCELLED
REFUNDED
Settlement rules

The buyer's confirmation authorizes the next settlement step, subject to backend validation.

The backend must prevent duplicate settlement, unauthorized releases and spending of reserved funds.

For blockchain assets, the custody and settlement layer must be reconciled with actual Stellar balances.

Swap Architecture

Swap is a separate business module using the wallet ledger through controlled financial interfaces.

Its responsibilities include:

Exchange quotes.
Rate providers.
Liquidity providers.
Conversion fees.
Quote expiration.
Swap execution.
Settlement verification.
Transaction records.
Swaps must not directly edit wallet balances.

All funding and settlement operations must pass through the ledger service.

Stellar Integration

Stellar provides the blockchain infrastructure for supported asset operations.

FusePay intends to integrate:

Stellar accounts.
USDC on Stellar.
XLM.
Stellar payment operations.
Soroban smart contracts.
Blockchain transaction verification.
Soroban Escrow

A proposed Soroban escrow contract will support:

Trade identification.
Supported asset reservations.
Buyer and seller references.
Release conditions.
Refund conditions.
Expiry conditions.
Settlement events.
The contract will be developed in Rust.

Not every internal ledger transaction must be executed on-chain. The architecture will distinguish custodial internal escrow from direct smart-contract escrow.

System Architecture

The initial backend will use a modular monolith based on Clean Architecture and Domain-Driven Design.

Proposed stack

Web: Next.js and TypeScript.
Mobile: React Native and Expo.
Backend: Node.js and NestJS.
Database: PostgreSQL.
ORM: Prisma.
Cache: Redis.
Smart contracts: Rust and Soroban.
Infrastructure: Docker.
API documentation: OpenAPI.
Core modules

Identity.
Wallet.
Ledger.
Marketplace.
Trade.
Escrow.
Swap.
Payments.
Telecom integrations.
Notifications.
Vendor management.
Administration.
Security Requirements

Double-entry financial accounting.
Atomic ledger transactions.
Idempotency keys.
Role-based access control.
Secure authentication.
Transaction authorization.
Audit logs.
Blockchain confirmation verification.
Escrow state validation.
Rate limiting.
Fraud monitoring.
Database backups.
Financial reconciliation.
Business Model

Potential revenue streams include:

Marketplace transaction fees.
Vendor service fees.
Gift card trading margins.
Swap fees.
Supported financial transfer fees.
Premium vendor services.
Fees must be transparently displayed before transactions are confirmed.

Development Roadmap
Phase 1: Product foundation, authentication, and wallet ledger.

Phase 2: Marketplace, listings and vendor management.

Phase 3: P2P trading, escrow and dispute handling.

Phase 4: Stellar integration and Soroban escrow prototype.

Phase 5: Swap engine and supported digital asset conversions.

Phase 6: Security audits, testing and market expansion.

Expected Impact on Stellar

FusePay aims to connect Stellar infrastructure with everyday financial and utility commerce.

Expected ecosystem contributions include:

Real-world stablecoin payment applications.
Increased use of Stellar assets.
Soroban smart-contract development.
Blockchain-powered P2P settlement.
Financial access through a familiar fintech interface.
Potential adoption by utility vendors and African consumers.
Success Metrics

Initial metrics will include:

Number of registered users.
Active marketplace users.
Number of completed utility trades.
Total marketplace transaction volume.
Successful delivery rate.
Dispute rate.
Average trade completion time.
Number of active vendors.
Stellar transaction volume.
Number of successful Soroban escrow settlements.
Product Vision

FusePay aims to become a financial and utility exchange ecosystem where digital utility value can be exchanged, financial assets can move across supported payment networks, and individuals and businesses can participate in a more accessible digital economy.

The initial focus is Nigeria, with a technical architecture designed for expansion across African markets.
