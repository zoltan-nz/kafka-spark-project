# Notes about finding financial data stream

* Option 1: crypto currency data stream: https://min-api.cryptocompare.com/
* Option 2: Deutsche Borse Public Dataset: https://aws.amazon.com/public-datasets/deutsche-boerse-pds/

**Crypto currency data streaming**

* Examples: https://github.com/cryptoqween/cryptoqween.github.io

Streaming data:

```
* Market (Bitfinex, Coinbase, ...)
* Type (BUY / SELL / UNKNOWN)
* ID
* Price
* Quantity
* Total
```

Schema example 2:

```
24h Change: $ 89.73 (1.13%)
Last Market: Bitfinex 
Trade ID: 218755598
Open Hour: Ƀ 7,808.48
High Hour: Ƀ 8,117.79
Low Hour: Ƀ 7,752.6
Open Day: Ƀ 7,960.33
High Day: Ƀ 8,163.11
Low Day: Ƀ 7,751.01
Last Trade Volume: Ƀ 0.1000
Last Trade Volume To: $ 803.2
24h Volume: Ƀ 93,824.02
24h VolumeTo: 
```



**Deutsche Borse Dataset Schema:**

* https://github.com/Deutsche-Boerse/dbg-pds/blob/master/docs/data_dictionary.md

* [Raw data](https://s3.eu-central-1.amazonaws.com/deutsche-boerse-xetra-pds)
* [csv](https://s3.eu-central-1.amazonaws.com/deutsche-boerse-eurex-pds/2018-02-01/2018-02-01_BINS_XEUR07.csv)

The dataset contains the following fields:

| Column Name | Data Description | Data Dictionary |
|-------------|------------------|-----------------|
|ISIN|ISIN of the security|string|
|Mnemonic|Stock exchange ticker symbol |string|
|SecurityDesc|Description of the security|string|
|SecurityType|Type of security|string|
|SecurityID|Unique identifier for each contract|int|
|Date |Date of trading period |date |
|Time |Hour and Minute of Trading Activity |time |
|Currency|Currency in which the product is traded|string - GBP (British Pounds Sterling); USD (US Dollar) TWD (Taiwan Dollar); CHF (Swiss franc); GBX (British Pence Sterling); EUR (Euro); KRW (Korean Won)|
|StartPrice|Trading price at the start of period|float|
|MaxPrice|Maximum price over the period|float|
|MinPrice|Minimum price over the period|float|
|EndPrice|Trading price at the end of the period|float|
|TradedVolume|Total value traded|float|
|NumberOfTrades|Number of distinct transactions during the period|int|

More links:

* https://chasing-coins.com/api/

Meeting notes with supervisors:
 
* Let's go with Deutsche Borse data
* Container 1: Load the cvs => HDFS, KAFKA
* Container 2: Spark streamer
* Analytics 