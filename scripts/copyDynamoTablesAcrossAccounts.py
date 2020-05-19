import boto3
import os

def convertCFCustomersToNFHSearchConfig(item):
  print("item", item)
  return {
    'Profile': item['Profile'],
    'SearchItem': item['Customer'],
    'SearchString': item['SearchString'],
    'Strict': item['Strict']
		# TODO more fields if you really want to copy
  }

def convertCFFeesToNFHNews(item):
  print("item", item['Customer'], "type", type(item['Customer']))
  return {
    'Profile_SearchItem': {'S': 'FinTech_' + str(item['Customer']['S'])},
    'Title': item['Title'],
		'Profile': {'S': 'FinTech'},
    'SearchItem': item['Customer']
  }

def convertNFHNewsToNFHNews2(item):
  print("item", item['Customer'], "type", type(item['Customer']))
  return {
    'Profile_SearchItem': {'S': 'FinTech_' + str(item['Customer']['S'])},
    'Title': item['Title'],
		'Profile': item['Profile'],
    'SearchItem': item['SearchItem']
  }

dynamoclient = boto3.client('dynamodb', region_name='ap-southeast-1',
	aws_access_key_id='changeme',
	aws_secret_access_key='changeme')

dynamotargetclient = boto3.client('dynamodb', region_name='ap-southeast-1',
	aws_access_key_id='changeme',
	aws_secret_access_key='changeme')

dynamopaginator = dynamoclient.get_paginator('scan')
tabname='nfh_News'
targettabname='nfh_News_new'
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
      Item = convertCFFeesToNFHNews(item)
		)


