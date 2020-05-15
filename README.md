# news-feed-handler

Handle RSS feeds, dedup, filters and publish to messaging channels (e.g. Chime, Slack)

## Architecture

![architecture](./img/architecture.png "high-level architecture")

## CICD cross accounts

![cicd](./img/cross-account-cicd.png "cicd")

## Notes

### Google news RSS format

[https://news.google.com/rss/search?hl=en-SG&gl=SG&ceid=SG:en&q=%22search+word%22](https://news.google.com/rss/search?hl=en-SG&gl=SG&ceid=SG:en&q=%22search+word%22)

### AWS learning points

1. Setup different accounts for dev/prod
1. Copying dynamodb tables from an account to another is possible througth DataPipeline

* Task running can be a bit slower than expected
