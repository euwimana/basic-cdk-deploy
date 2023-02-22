import { SecretValue, Stack, StackProps } from 'aws-cdk-lib';
import { BuildSpec, PipelineProject } from 'aws-cdk-lib/aws-codebuild';
import { Artifact, Pipeline } from 'aws-cdk-lib/aws-codepipeline';
import { CodeBuildAction, GitHubSourceAction, S3DeployAction } from 'aws-cdk-lib/aws-codepipeline-actions';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

interface DeploymentStackProps extends StackProps {
  readonly apiId: string;
  readonly bucket: Bucket;
}

export class DeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props: DeploymentStackProps) {
    super(scope, id, props);

    const pipeline = new Pipeline(this, 'WebsitePipeline');

    const source = new Artifact('SourceArtifact');

    pipeline.addStage({
      stageName: 'GitHubCheckout',
      actions: [
        new GitHubSourceAction({
          actionName: 'GitHubCheckout',
          oauthToken: SecretValue.secretsManager('github-lnl'),
          output: source,
          owner: 'euwimana',
          repo: 'basic-cdk-deploy-website',
          branch: 'main'
        }),
      ]
    });

    const build = new Artifact('BuildArtifact');

    pipeline.addStage({
      stageName: 'Build',
      actions: [
        new CodeBuildAction({
          actionName: 'Build',
          input: source,
          project: new PipelineProject(this, 'BuildStage', {
            buildSpec: BuildSpec.fromObject({
              version: '0.2',
              phases: {
                build: {
                  commands: [`echo "window.apiId='${props.apiId}'" > variables.js`],
                },
              },
              artifacts: { files: '**/*' },
            }),
          }),
          outputs: [build],
        })
      ]
    });

    pipeline.addStage({
      stageName: 'Deploy',
      actions: [
        new S3DeployAction({
          actionName: 'Deploy',
          bucket: props.bucket,
          input: build,
        })
      ]
    });
  }
}
