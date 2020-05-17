import boto3
import configparser
from datetime import datetime, timedelta
from dbManager import updateLastCheckTimestamp
from feedParser import getNewFeeds
from feedPublisher import publishToWebHook
from configHandler import ConfigHandler

AWSRegion = 'ap-southeast-1'
profile = 'FinTechAWSWhatsNew'

def getNews(event, context):

  # get last check timestamp
  config = ConfigHandler(profile)
  lastCheckTimestamp = config.getLastCheckTimestmap()
  print(lastCheckTimestamp)

  # save new feeds
  ## publish start statement
  publishToWebHook("{\"Content\":\"/md **Daily " + profile + " news**\"}")
  newFeeds = getNewFeeds(profile, lastCheckTimestamp)

  # mark new timestamp
  # now = datetime.now() - timedelta(days = 30)
  now = datetime.now()
  newLastCheckTimestmap = now.isoformat()
  # update last check timestamp
  # updateLastCheckTimestamp(newLastCheckTimestmap)
  
  # publish an end statement
  publishToWebHook("{\"Content\":\"/md *Stay classy " + profile + "!*\"}")

  return True