# Notes about data sources

For a streaming experiment we need a dataset which are not static. A good dataflow is more likely a stream of transactional data, like log data, or frequently changing status data, moving objects geolocation data, etc.

In our experiment we focused on something which is related to financial data.

An option could be using crypto currency data streams. For example [CryptoCompare APIs](https://min-api.cryptocompare.com/). We can find example project how can you use it in your application: https://github.com/cryptoqween/cryptoqween.github.io. An other crypto currency API: https://chasing-coins.com/api/

Amazon maintains a nice list of open dataset also: https://registry.opendata.aws/

So an other great option to choose from this list. In this experiment we use the German Stock Exchange, Deutsche Börse Public Dataset: https://registry.opendata.aws/deutsche-boerse-pds/

**Important links**:

* DBG PDS Data Dictionary: https://github.com/Deutsche-Boerse/dbg-pds/blob/master/docs/data_dictionary.md
* S3 bucket with list of filenames (xml): https://s3.eu-central-1.amazonaws.com/deutsche-boerse-xetra-pds
* The link format to one individual CSV file: https://s3.eu-central-1.amazonaws.com/deutsche-boerse-eurex-pds/2018-02-01/2018-02-01_BINS_XEUR07.csv

As we can see on the Data Dictonary website, the Deutsche Börse Public Dataset contains XETRA and EUREX datasets with the following fields.

### XETRA

| Column Name | Data Description | Data Dictionary |
|-------------|------------------|-----------------|
|ISIN|ISIN of the security|string|
|Mnemonic|Stock exchange ticker symbol |string|
|SecurityDesc|Description of the security|string|
|SecurityType|Type of security|string|
|Currency|Currency in which the product is traded|ISO 4217 string (see https://en.wikipedia.org/wiki/ISO_4217)|
|SecurityID|Unique identifier for each contract|int|
|Date |Date of trading period |date |
|Time|Minute of trading to which this entry relates|time (hh:mm)|
|StartPrice|Trading price at the start of period|float|
|MaxPrice|Maximum price over the period|float|
|MinPrice|Minimum price over the period|float|
|EndPrice|Trading price at the end of the period|float|
|TradedVolume|Total value traded|float|
|NumberOfTrades|Number of distinct trades during the period|int|

### EUREX

| Column Name | Data Description | Data Dictionary |
|-------------|------------------|-----------------|
|ISIN|ISIN of the security|string|
|MarketSegment|The product market segment, following the convention on http://www.eurexchange.com|string|
|UnderlyingSymbol|The underlying security|string|
|UnderlyingISIN|ISIN of any underlying security|string|
|Currency|Currency in which the product is traded|ISO 4217 string (see https://en.wikipedia.org/wiki/ISO_4217)|
|SecurityType|Type of instrument|string - OPT (option), FUT (future)|
|MaturityDate|Maturity date of the security|date|
|StrikePrice|Strike price|float|
|PutOrCall|Type of option|string - PUT, CALL|
|MLEG|Identifies multi-leg options|string|
|ContractGenerationNumber|The generation number for options contracts|int|
|SecurityID|Unique identifier for each contract|int|
|Date|Date of trading period|date |
|Time|Minute of trading to which this entry relates|time (hh:mm)|
|StartPrice|Trading price at the start of period|float|
|MaxPrice|Maximum price over the period|float|
|MinPrice|Minimum price over the period|float|
|EndPrice|Trading price at the end of the period|float|
|NumberOfContracts|Number of contracts traded during the period|int|
|NumberOfTrades|Number of distinct trades during the period|int|
 
Source: https://github.com/Deutsche-Boerse/dbg-pds/blob/master/docs/data_dictionary.md

For a simple experiment, it is enough to download only one or two csv files manually and using them in our application, so it can be a quick solution. However in this project, we build a simple user interface to pick a date in our frontend application, and the backend app downloads all the available csv files from that date, concatenate them to one file. Using an other frontend interface we can choose a downloaded, concatenated csv file for streaming.
