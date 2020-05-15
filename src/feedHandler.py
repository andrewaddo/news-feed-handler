import boto3
from datetime import datetime, timedelta
from dbManager import getLastCheckTimestamp, updateLastCheckTimestamp
from feedParser import getNewFeeds
from feedPublisher import publishToWebHook

AWSRegion = 'ap-southeast-1'
profile = 'FinTech'

def getNews(event, context):
  # get last check timestamp
  lastCheckTimestamp = getLastCheckTimestamp()
  print(lastCheckTimestamp)

  # save new feeds
  ## publish start statement
  publishToWebHook("{\"Content\":\"/md **Daily " + profile + " news**\"}")
  newFeeds = getNewFeeds(lastCheckTimestamp)

  # mark new timestamp
  # now = datetime.now() - timedelta(days = 30)
  now = datetime.now()
  newLastCheckTimestmap = now.isoformat()
  # update last check timestamp
  updateLastCheckTimestamp(newLastCheckTimestmap)
  
  # publish an end statement
  publishToWebHook("{\"Content\":\"/md *Stay classy " + profile + "!*\"}")

  return True