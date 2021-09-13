import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Vpc from '../lib/vpc-stack';

test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Vpc.VpcStack(app, 'MyTestStack', { env: { account: '111111111', region: 'ap-southeast-2' } });
  // THEN
  expectCDK(stack).to(matchTemplate({
    "Resources": {
      "MyTestStackFB7ADC2B": {}
    }
  }, MatchStyle.EXACT))
});
