import boto3
import json
from datetime import datetime
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr
from helperFunctions import genNewsIDHash
from propertiesHandler import PropertiesHandler
import uuid

dynamodb = boto3.resource('dynamodb')
properties = PropertiesHandler()
profileConfigTableName = properties.getProfileConfigTable()
searchConfigTableName = properties.getSearchConfigTable()
newsTableName = properties.getNewsTable()
# TODO refactor this with wrappers such as configHandler

# get search config list
def getDBSearchConfig(profileID):
  table = dynamodb.Table(searchConfigTableName)
  result = table.scan(
    Select= 'ALL_ATTRIBUTES',
    FilterExpression = Attr('profileID').eq(profileID)
  )
  # print(result)
  return result['Items'] if 'Items' in result else None

# get profile config
def getDBProfileConfigs():
  table = dynamodb.Table(profileConfigTableName)
  result = table.scan()
  # print("getProfileConfig", result)
  return result['Items'] if 'Items' in result else None

# get profile config
def getDBProfileConfig(id):
  table = dynamodb.Table(profileConfigTableName)
  result = table.query(
    KeyConditionExpression = Key("id").eq(id)
  )
  # print("getProfileConfig", result)
  return result['Items'] if 'Items' in result else None

# update last check timestamp
def updateLastCheckTimestamp(id, newCheckTimestamp):
  table = dynamodb.Table(profileConfigTableName)
  table.update_item(
    Key = {
      'id': id
    },
    UpdateExpression = "set #attr = :val",
    ExpressionAttributeNames = {
      '#attr': 'lastCheckTimestamp'
    },
    ExpressionAttributeValues = {
        ':val': newCheckTimestamp
    }
  )
  return newCheckTimestamp

def recordNewFeeds(profile, searchItem, feed):
  # currentDate = datetime.now();
  # graphql needs that Z
  currentDate = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'
  table = dynamodb.Table(newsTableName)
  # print(customer["Customer"],":", feed)
  try: 
    table.put_item(
      Item={
        'id': str(uuid.uuid4()),
        'searchConfigID': searchItem['id'],
        'searchItem':searchItem['searchItem'],         
        'date': feed.published,
        'timestamp': currentDate.isoformat(),
        'title': feed.title,
        'source': json.dumps(feed.source) if hasattr(feed, 'source') else None,
        'feed': json.dumps(feed),
        'createdAt': currentDate.isoformat(),
        'updatedAt': currentDate.isoformat()
      },
      ConditionExpression='attribute_not_exists(searchConfigID) or attribute_not_exists(title)'
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
