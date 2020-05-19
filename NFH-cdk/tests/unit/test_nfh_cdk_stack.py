import json
import pytest

from aws_cdk import core
from nfh-cdk.nfh_cdk_stack import NfhCdkStack


def get_template():
    app = core.App()
    NfhCdkStack(app, "nfh-cdk")
    return json.dumps(app.synth().get_stack("nfh-cdk").template)


def test_sqs_queue_created():
    assert("AWS::SQS::Queue" in get_template())


def test_sns_topic_created():
    assert("AWS::SNS::Topic" in get_template())
