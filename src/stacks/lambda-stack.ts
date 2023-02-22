import { Stack, StackProps } from 'aws-cdk-lib';
import { Cors, LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';


export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambda = new Function(this, 'Lambda', {
      runtime: Runtime.NODEJS_16_X,
      code: Code.fromAsset('./assets/lambda'),
      handler: 'index.handler',
    });

    const api = new LambdaRestApi(this, 'RestApi', {
      handler: lambda,
      proxy: false,
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
    });

    const quotes = api.root.addResource('quotes');

    quotes.addMethod('GET')
  }
}
