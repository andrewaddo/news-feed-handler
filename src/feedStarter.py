import boto3
import json
from configHandler import ConfigHandler
# local test! there must be a better way

client = boto3.client('lambda')

# triggered by schedulers, get all profiles, invoke another
# lambda to handle each profile (to avoid run time limit)


def getNews(event, context):

    # get all profiles
    config = ConfigHandler()
    profiles = config.getProfileConfigs()
    for profile in profiles:
        print("running profiles", profiles)
        client.invoke(FunctionName='getNewsPerProfile',
                      InvocationType='Event',
                      Payload=json.dumps({'profileID': profile['id'], 'isTest': False}))

    return True
