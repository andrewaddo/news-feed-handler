import boto3
import os

dynamoclient = boto3.client('dynamodb', region_name='ap-southeast-1',
    aws_access_key_id='FIXME',
    aws_secret_access_key='FIXME')

dynamotargetclient = boto3.client('dynamodb', region_name='ap-southeast-1',
    aws_access_key_id='FIXME',
    aws_secret_access_key='FIXME')

dynamopaginator = dynamoclient.get_paginator('scan')
tabname='cf_feeds'
targettabname='cf_feeds'
dynamoresponse = dynamopaginator.paginate(
    TableName=tabname,
    Select='ALL_ATTRIBUTES',
    ReturnConsumedCapacity='NONE',
    ConsistentRead=True
)
for page in dynamoresponse:
    for item in page['Items']:
        dynamotargetclient.put_item(
            TableName=targettabname,
            Item=item
        )
