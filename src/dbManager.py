import boto3
import json
from datetime import datetime
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr

AWSRegion = 'ap-southeast-1'

dynamodb = boto3.resource('dynamodb')

# get customer list
def getCustomerConfig(profile):
  table = dynamodb.Table('cf_customers')
  result = table.query(
    KeyConditionExpression = Key("Profile").eq(profile)
  )
  # print(result)
  return result['Items'] if 'Items' in result else None

# get last check timestamp
def getLastCheckTimestamp():
  table = dynamodb.Table('cf_config')
  lastCheckTimestamp = table.get_item(
    Key={'Key': 'lastCheckTimestamp'}
  )
  # print("lastCheckTimestamp is ", lastCheckTimestamp)
  return lastCheckTimestamp['Item']['Value'] if "Item" in lastCheckTimestamp else None

# update last check timestamp
def updateLastCheckTimestamp(newCheckTimestamp):
  table = dynamodb.Table('cf_config')
  if getLastCheckTimestamp() is None:
    table.put_item(Item = {
      'Key': 'lastCheckTimestamp', 
      'Value': newCheckTimestamp
    } )
  else:
    table.update_item(
      Key = {
        'Key': 'lastCheckTimestamp'
      },
      UpdateExpression = "set #attr = :val",
      ExpressionAttributeNames = {
        '#attr': 'Value'
      },
      ExpressionAttributeValues = {
          ':val': newCheckTimestamp
      }
    )
  return newCheckTimestamp

def recordNewFeeds(customer, feed):
  curr_date = datetime.now();
  table = dynamodb.Table('cf_feeds')
  # print(customer["Customer"],":", feed)
  try: 
    table.put_item(
      Item={
        'Customer': customer["Customer"],
        'Date': feed.published,
        'Timestamp': curr_date.isoformat(),
        'Title': feed.title,
        'Source': json.dumps(feed.source),
        'Feed': json.dumps(feed)
      },
      ConditionExpression='attribute_not_exists(Customer) or attribute_not_exists(Title)'
    )
    return True
  except ClientError as e:
    # Ignore the ConditionalCheckFailedException, bubble up other exceptions.
    if e.response['Error']['Code'] != 'ConditionalCheckFailedException':
      raise

# helper functions
# get last check timestamp
def getRecordCount(tableName, filterKey, filterValue):
  table = dynamodb.Table(tableName)
  result = table.query(
    KeyConditionExpression = Key(filterKey).eq(filterValue)
  )
  print(result)
  return result["Count"]
