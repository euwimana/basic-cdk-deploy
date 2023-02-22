#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SecretValue, Stack, StackProps } from 'aws-cdk-lib';
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { InfrastructureStage } from './stages/infrastructure-stage';

class BootstrapPipeline extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'CodePipeline', {
      crossAccountKeys: false,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('euwimana/basic-cdk-deploy', 'main', {
          authentication: SecretValue.secretsManager('github-lnl')
        }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      })
    });

    pipeline.addStage(new InfrastructureStage(this, 'InfrastructureStage'));
  }
}
 
const app = new cdk.App();

new BootstrapPipeline(app, 'BootstrapPipeline')

app.synth();
