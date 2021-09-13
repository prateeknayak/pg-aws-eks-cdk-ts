import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";

export class VpcStack extends cdk.Construct {

  public vpc: ec2.Vpc

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    this.vpc = new ec2.Vpc(this, "vpc", {
      maxAzs: 99,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "Ingress",
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: "Private",
          subnetType: ec2.SubnetType.PRIVATE,
        },
        {
          cidrMask: 24,
          name: "Isolated",
          subnetType: ec2.SubnetType.ISOLATED,
        }
      ]
    });
  }
}
