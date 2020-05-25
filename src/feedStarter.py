import boto3
import json
from configHandler import ConfigHandler
# local test! there must be a better way
from feedHandler import getNewsPerProfile

client = boto3.client('lambda')

# triggered by schedulers, get all profiles, invoke another
# lambda to handle each profile (to avoid run time limit)


def getNews(event, context):

    # get all profiles
    config = ConfigHandler()
    profiles = config.getProfileConfigs()
    print("running profiles", profiles)
    # getNewsPerProfile(event={'profileID': '3994c1d2-0a72-44e9-8b73-31ff6b401dc2', 'testBackDay':1, 'isTest': True}, context={})
    # return True
    for profile in profiles:
        client.invoke(FunctionName='getNewsPerProfile',
                      InvocationType='Event',
                      Payload=json.dumps({'profileID': profile['id'], 'isTest': False}))
        # local test! there must be a better way
        # getNewsPerProfile(event={'profileID': profile['id'], 'testBackDay':1, 'isTest': True}, context={})
        # getNewsPerProfile(event={'profileID': profile['id'], 'isTest': False}, context={})

    return True
