import boto3
import os

def convertCFCustomersToNFHSearchConfig(item):
  print("item", item)
  return {
    'Profile': item['Profile'],
    'SearchItem': item['Customer'],
    'SearchString': item['SearchString'],
    'Strict': item['Strict']
  }

dynamoclient = boto3.client('dynamodb', region_name='ap-southeast-1',
	aws_access_key_id='c',
	aws_secret_access_key='c')

dynamotargetclient = boto3.client('dynamodb', region_name='ap-southeast-1',
	aws_access_key_id='c',
	aws_secret_access_key='c')

dynamopaginator = dynamoclient.get_paginator('scan')
tabname='cf_customers'
targettabname='nfh_SearchConfig'
dynamoresponse = dynamopaginator.paginate(
	TableName=tabname,
	Select='ALL_ATTRIBUTES',
	ReturnConsumedCapacity='NONE',
	ConsistentRead=True
)
# copy whole table
for page in dynamoresponse:
	for item in page['Items']:
		dynamotargetclient.put_item(
			TableName=targettabname,
			# Item=item
      Item = convertCFCustomersToNFHSearchConfig(item)
		)


