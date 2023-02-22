#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaStack } from './stacks/lambda-stack';
import { WebsiteBucketStack } from './stacks/website-bucket-stack'
 
const app = new cdk.App();

new WebsiteBucketStack(app, 'WebsiteBucketStack');

new LambdaStack(app, 'LambdaStack');

app.synth();
