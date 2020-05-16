# news-feed-handler

Handle RSS feeds, dedup, filters and publish to messaging channels (e.g. Chime, Slack)

## Architecture

![architecture](./img/architecture.png "high-level architecture")

## CICD cross accounts

![cicd](./img/cross-account-cicd.png "cicd")

Notes: Management account does not sound like a good idea compared to using Master account. CFN stackset is only supporting Master account.

Following are not exact match, but it explains how cross account works with 

1. Cross account role (PassRole) and CFN role on the remote account

![cross-account](https://aws.amazon.com/blogs/devops/aws-building-a-secure-cross-account-continuous-delivery-pipeline/ "cross-account")

## Notes

### Google news RSS format

[https://news.google.com/rss/search?hl=en-SG&gl=SG&ceid=SG:en&q=%22search+word%22](https://news.google.com/rss/search?hl=en-SG&gl=SG&ceid=SG:en&q=%22search+word%22)

### AWS learning points

1. Setup different accounts for dev/prod
1. Copying dynamodb tables from an account to another is possible through DataPipeline

* Task running can be a bit slower than expected

3. Options for cross-account deployments

* CloudFormation stackset or CloudFormation cross account (through assume-role) 
  * CodePipeline can only deploy one artifact (eg CloudFormation template) per action
  * CodePipeline cannot directly deploy a StackSet, which would allow for deployment of templates across accounts. StackSets can be deployed by calling CodeBuild / Lambda.
  * CodePipeline can deploy to other accounts by specifying a role in that other account. This only deploys to one account at a time
  * CodeBuild started as part of a CodePipeline running in a container gives more flexibility, you can do whatever you like here really
  * CodePipeline can start Lambda, which is very flexible.

* Put artifacts to S3 and have separate pipelines on remote accounts (not ideal - I would want CICD centralized at one management account)
* Have another tool such as jenkins to do this job

4. Detailed notes on cross-account deployment with CodePipeline and CloudFormation
[ref](https://aws.amazon.com/premiumsupport/knowledge-center/codepipeline-deploy-cloudformation/)

* For Lambda CloudFormation, CodeBuild generate another template (i.e. .yml) which refers to a zip package with actual code. This zip package may be stored in an S3 bucket different from the CodePipeline's artifacts bucket. Since accountB's CloudFormation (which uses outputtemplate.yml) it needs permission to access to the S3 bucket that has the zip package.
* KMS key is used by CodeBuild to create encrypted artifacts. For Lambda CloudFormation build, artifacts only contains outputtemplate.yml

