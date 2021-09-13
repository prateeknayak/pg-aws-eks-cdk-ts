
import * as cdk from "@aws-cdk/core";
import ec2 = require("@aws-cdk/aws-ec2");
import iam = require("@aws-cdk/aws-iam");
import eks = require("@aws-cdk/aws-eks");
import { Vpc } from "@aws-cdk/aws-ec2";

export interface EKSClusterProps {
  /**
   * Name of the bucket that will be used as the origin of the distribution
   */
  clusterName: string;
  /**
   * Optional cors configuration for the origin bucket
   * 
   */
  vpc: Vpc
  /**
   * The bucket that holds the source artifacts we want to deploy with the distribution
   */
  subnetMasts: string

}

export class EksStack extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props?: EKSClusterProps) {
    super(scope, id);

    // // A VPC, including NAT GWs, IGWs, where we will run our cluster
    // const vpc = new ec2.Vpc(this, "VPC", {});

    // The IAM role that will be used by EKS
    const clusterRole = new iam.Role(this, "ClusterRole", {
      assumedBy: new iam.ServicePrincipal("eks.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonEKSClusterPolicy"),
        iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonEKSVPCResourceController")
      ]
    });

    // The EKS cluster, without worker nodes as we"ll add them later
    const cluster = new eks.Cluster(this, "Cluster", {
      vpc: props?.vpc,
      role: clusterRole,
      version: eks.KubernetesVersion.V1_19,
      defaultCapacity: 0
    });

    // Worker node IAM role
    const workerRole = new iam.Role(this, "WorkerRole", {
      assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonEKSWorkerNodePolicy"),
        iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonEC2ContainerRegistryReadOnly"),
        iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonEKS_CNI_Policy"),
        iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonEKSVPCResourceController") // Allows us to use Security Groups for pods
      ]
    });

    // Select the private subnets created in our VPC and place our worker nodes there
    const privateSubnets = props?.vpc.selectSubnets({
      subnetType: ec2.SubnetType.PRIVATE
    });

    cluster.addNodegroupCapacity("WorkerNodeGroup", {
      subnets: privateSubnets,
      nodeRole: workerRole,
      minSize: 1,
      maxSize: 20
    });
  }
}
