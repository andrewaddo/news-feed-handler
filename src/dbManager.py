import boto3
import json
from datetime import datetime
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr
from helperFunctions import genNewsIDHash

dynamodb = boto3.resource('dynamodb')

# TODO refactor this with wrappers such as configHandler

# get customer list
def getCustomerConfig(profile):
  table = dynamodb.Table('nfh_SearchConfig')
  result = table.query(
    KeyConditionExpression = Key("Profile").eq(profile)
  )
  # print(result)
  return result['Items'] if 'Items' in result else None

# get profile config
def getProfileConfig(profile):
  table = dynamodb.Table('nfh_ProfileConfig')
  result = table.query(
    KeyConditionExpression = Key("Profile").eq(profile)
  )
  # print("getProfileConfig", result)
  return result['Items'] if 'Items' in result else None

# get search config
def getSearchConfig(profile):
  table = dynamodb.Table('nfh_SearchConfig')
  result = table.query(
    KeyConditionExpression = Key("Profile").eq(profile)
  )
  # print("getSearchConfig", result)
  return result['Items'] if 'Items' in result else None

# update last check timestamp
def updateLastCheckTimestamp(newCheckTimestamp):
  table = dynamodb.Table('nfh_ProfileConfig')
  table.update_item(
    Key = {
      'Profile': 'Profile'
    },
    UpdateExpression = "set #attr = :val",
    ExpressionAttributeNames = {
      '#attr': 'LastCheckTimestamp'
    },
    ExpressionAttributeValues = {
        ':val': newCheckTimestamp
    }
  )
  return newCheckTimestamp

def recordNewFeeds(profile, searchItem, feed):
  currentDate = datetime.now();
  table = dynamodb.Table('nfh_News')
  # print(customer["Customer"],":", feed)
  try: 
    table.put_item(
      Item={
        'Profile_SearchItem': genNewsIDHash(profile, searchItem['SearchItem']),
        'Customer': searchItem['SearchItem'],
        'Profile': profile,
        'SearchItem':searchItem['SearchItem'],         
        'Date': feed.published,
        'Timestamp': currentDate.isoformat(),
        'Title': feed.title,
        'Source': json.dumps(feed.source) if hasattr(feed, 'source') else None,
        'Feed': json.dumps(feed)
      },
      ConditionExpression='attribute_not_exists(Profile_SearchItem) or attribute_not_exists(Title)'
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
