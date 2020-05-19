#!/usr/bin/env python3

from aws_cdk import core

from nfh_cdk.nfh_cdk_stack import NfhCdkStack


app = core.App()
NfhCdkStack(app, "nfh-cdk")

app.synth()
