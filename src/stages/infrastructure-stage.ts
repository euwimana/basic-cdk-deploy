import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DeploymentStack } from '../stacks/deployment-stack';
import { LambdaStack } from '../stacks/lambda-stack';
import { WebsiteBucketStack } from '../stacks/website-bucket-stack';

export class InfrastructureStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const website = new WebsiteBucketStack(this, 'WebsiteBucketStack');

    const lambda = new LambdaStack(this, 'LambdaStack');

    new DeploymentStack(this, 'DeploymentStack', {
      bucket: website.bucket,
      apiId: lambda.apiId
    })
  }
}