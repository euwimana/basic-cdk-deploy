import { Stack, StackProps } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';


export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new Function(this, 'Lambda', {
      runtime: Runtime.NODEJS_16_X,
      code: Code.fromAsset('./assets/lambda'),
      handler: 'index.handler',
      environment: { API_URL: 'https://api.quotable.io' },
    });
  }
}