import boto3
import json
client = boto3.client('lambda')


def handler(event, context):
    print('received event:', event)
    print('received context', context)
    profileID = event['pathParameters']['id']

    # TODO clean up
    body = event['body']
    # print(body)
    bodyJson = json.loads(body)
    print(bodyJson['testBackDay'])
    testBackDay = bodyJson['testBackDay'] if 'testBackDay' in bodyJson else 5
    print("testBackDay", testBackDay)

    result = client.invoke(FunctionName='getNewsPerProfile',
                           InvocationType='RequestResponse',
                           Payload=json.dumps({'profileID': profileID, 'testBackDay': testBackDay, 'isTest': True}))
    return {
        "statusCode": 200,
        'headers':
        {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        },
        "body": "OK"
    }
