---
taxonomy:
    tags: [Blog, Learn Bitcoin, Wallets]
routes:
    default: '/bitcoin-address-formats'
date: 2023-12-11 16:20
dateformat: 'Y-m-d H:i'
summary: What are the different Bitcoin address formats from Legacy to SegWit to Bech32 bc1q and Taproot bc1p with their impact on efficiency and privacy.
thumbnail: _Thumbnail_Understanding-The-Different-Bitcoin-Address-Formats.jpeg
template: article 
---

# Understanding The Different Bitcoin Address Formats

Bitcoin, an ever-evolving technology, has brought about various types of addresses over time. Often, exchanges and wallet manufacturers are lagging behind in the adoption of new address formats, that’s why you can find different address types being used. 

Despite these variations, Bitcoin addresses are generally cross-compatible, meaning you can send from any one type to another. Problems encountered during transfers are typically due to the wallet client or service used, rather than the address itself.

In general, it’s preferable to use wallets that implement the new standards as they contribute to the network's efficiency. Newer address formats reduce transaction size, leading to lower transaction fees and the inclusion of more transactions in a block. Currently (December 2023), over 4,000 transactions can fit into a block compared to around 2,500 a few years ago.

Let’s take a closer look into the different Bitcoin address formats to understand their differences. 

## Legacy Addresses
First, there are the now called  “Legacy” addresses. They were available from the beginning of Bitcoin and start with the prefix “1”. Interesting is that despite their age, they still play a significant role, [securing 43% of the mined Bitcoin supply](https://unchained.com/blog/bitcoin-address-types-compared/) (more than any other address type).

Example: **1**MbeQFmHo9b69kCfFa6yBr7BQX4NzJFQq9


## (Legacy) SegWit Addresses

Introduced in August 2017, Segregated Witness (SegWit) addresses reduced transaction data size, enhancing transaction speed, scalability, and lowering fees. These addresses typically start with the prefix "3". 

Example: **3**EmUH8Uh9EXE7axgyAeBsCc2vdUdKkDqWK


## Native SegWit (Bech32) Addresses

Native SegWit (Bech32) addresses, starting with the prefix "bc1q", represent an even more enhanced version, with a very efficient use of data for transactions and even lower fees compared to older formats. 

Example: **bc1q**j89046x7zv6pm4n00qgqp505nvljnfp6xfznyw.


## Taproot Addresses

In November 2021, a major upgrade (a soft fork) happened which introduced Taproot and the P2TR (Pay-to-Taproot) address format. These addresses, recognizable by their "bc1p" prefix, enhance transaction efficiency, reduce fees, and improve privacy. This is because Taproot enables many different smart contract transactions (e.g. multi-sigs, closing and opening Lightning Network channels, etc.) to appear on the blockchain as simple transactions. By obfuscating the true nature of the transaction, it [makes it possible for those smart contract transactions to hide amongst the “regular” ones](https://braiins.com/blog/explain-like-im-not-a-developer-taproot-privacy).
The adoption of Taproot addresses with only 0.1% of all UTXOs is low at the time of writing, and many Bitcoin softwares and services are still working on integration.

Example: **bc1p**8denc9m4sqe9hluasrvxkkdqgkydrk5ctxre5nkk4qwdvefn0sdsc6eqxe


> Stay updated!

> As Bitcoin continues to evolve, staying informed about these developments is crucial for users to optimize their experience and contribute to the network's overall efficiency. So, 
> * Subscribe to my weekly newsletter: [The Orange Journal](https://anita.link/news) &
> * Join my Bitcoin learning platform [Crack The Orange](https://cracktheorange.com)
