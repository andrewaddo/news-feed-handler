from aws_cdk import (
    core,
    aws_dynamodb,
    aws_cognito
)


class NfhCdkStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        # The code that defines your stack goes here
        ## SKIP! let amplify do this too!
        # create dynamo tables
        # nfhProfileConfig = aws_dynamodb.Table(
        #     self, "nfh_ProfileConfig", table_name="nfh_ProfileConfig",
        #     partition_key=aws_dynamodb.Attribute(
        #         name="Profile",
        #         type=aws_dynamodb.AttributeType.STRING
        #     )
        # )
        # nfhSearchConfig = aws_dynamodb.Table(
        #     self, "nfh_SearchConfig", table_name="nfh_SearchConfig",
        #     partition_key=aws_dynamodb.Attribute(
        #         name="Profile",
        #         type=aws_dynamodb.AttributeType.STRING
        #     ),
        #     sort_key=aws_dynamodb.Attribute(
        #         name="SearchItem",
        #         type=aws_dynamodb.AttributeType.STRING
        #     )
        # )
        # nfhNews = aws_dynamodb.Table(
        #     self, "nfh_News", table_name="nfh_News",
        #     partition_key=aws_dynamodb.Attribute(
        #         name="Profile_SearchItem",
        #         type=aws_dynamodb.AttributeType.STRING
        #     ),
        #     sort_key=aws_dynamodb.Attribute(
        #         name="Title",
        #         type=aws_dynamodb.AttributeType.STRING
        #     )
        # )
        # nfhNews.add_global_secondary_index(
        #     index_name="Profile-SearchItem-index",
        #     partition_key=aws_dynamodb.Attribute(
        #         name="Profile",
        #         type=aws_dynamodb.AttributeType.STRING
        #     ),
        #     sort_key=aws_dynamodb.Attribute(
        #         name="SearchItem",
        #         type=aws_dynamodb.AttributeType.STRING
        #     )
        # )

        # appsync for Cognito userpool
        ## SKIP! let amplify do this
        # mainUserPool = aws_cognito.CfnUserPool(
        #     self, 'nfhUserPool', user_pool_name = 'nfhUserPool'
        # )
