import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as BananaCluster from '../lib/banana-cluster-stack';

test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new BananaCluster.BananaClusterStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(matchTemplate({
    "Resources": {}
  }, MatchStyle.EXACT))
});
