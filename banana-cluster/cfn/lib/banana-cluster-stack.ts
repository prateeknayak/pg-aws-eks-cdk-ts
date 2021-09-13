import * as cdk from '@aws-cdk/core';
import { EksStack } from '../../../packages/eks/lib/eks-stack'
import { VpcStack } from '../../../packages/vpc/lib/vpc-stack'

export class BananaClusterStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let v = new VpcStack(this, "PrateekTS")

    new EksStack(this, "Banana", {
      vpc: v.vpc,
      subnetMasts: "24",
      clusterName: "banana",
    })
  }
}
