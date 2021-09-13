## AWS CDK and CDK8s

Idea is to be able to create constructs as packages that will allow teams to directly invoke them from code and provision infra which complies with company policy


The [packages/](packages/) directory holds all the constructs
- eks - cdk based construct which creates clusters
- vpc - cdk based construct which create a 3*3*3 VPC 
- namespaces - cdk8s based construct which creates ns + resourcequotas

The [banana-cluster](banana-cluster/) directory holds stacks and charts which
- cfn - a singular stack which uses all the aws constructs from packages directory
- k8s - a singular chart which will use all the k8s constructs from the packages directory

## Issue

Unfortunately, when building the k8s chart I get the following error

```
/Users/prateek/Development/prateeknayak/pg-aws-cdk-ts/packages/namespaces/node_modules/cdk8s/lib/chart.js:34
            throw new Error('cannot find a parent chart (directly or indirectly)');
            ^

Error: cannot find a parent chart (directly or indirectly)
    at Function.of (/Users/prateek/Development/prateeknayak/pg-aws-cdk-ts/packages/namespaces/node_modules/cdk8s/lib/chart.js:34:19)
    at Function.of (/Users/prateek/Development/prateeknayak/pg-aws-cdk-ts/packages/namespaces/node_modules/cdk8s/lib/chart.js:36:22)
    at Function.of (/Users/prateek/Development/prateeknayak/pg-aws-cdk-ts/packages/namespaces/node_modules/cdk8s/lib/chart.js:36:22)
    at Function.of (/Users/prateek/Development/prateeknayak/pg-aws-cdk-ts/packages/namespaces/node_modules/cdk8s/lib/chart.js:36:22)
    at new ApiObject (/Users/prateek/Development/prateeknayak/pg-aws-cdk-ts/packages/namespaces/node_modules/cdk8s/lib/api-object.js:29:36)
    at new KubeNamespace (/Users/prateek/Development/prateeknayak/pg-aws-cdk-ts/packages/namespaces/imports/k8s.js:3085:9)
    at new Namespaces (/Users/prateek/Development/prateeknayak/pg-aws-cdk-ts/packages/namespaces/namespaces.js:9:18)
    at new NamespaceChart (/Users/prateek/Development/prateeknayak/pg-aws-cdk-ts/banana-cluster/k8s/index.js:8:9)
    at Object.<anonymous> (/Users/prateek/Development/prateeknayak/pg-aws-cdk-ts/banana-cluster/k8s/index.js:15:1)
```

- If I move the namespaces.ts in the k8s directory and update the import path in the index.ts this works
- If I convert the namespaces construct to a chart and invoke it from index it works ( check out the main branch )
