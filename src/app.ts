#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { WebsiteBucketStack } from './stacks/website-bucket-stack'
 
const app = new cdk.App();

new WebsiteBucketStack(app, 'WebsiteBucketStack')

app.synth()
