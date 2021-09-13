import { Construct } from 'constructs';
import { KubeNamespace, KubeResourceQuotaList, Quantity } from './imports/k8s';

export interface NamespaceOptions {

  readonly prefix: string | "namespace"

  /** namespace name */
  readonly name: string;

  /** Labels to be set */
  readonly labels?: string[]

  /** annotations */
  readonly annotations?: string[]
}

export class Namespaces extends Construct {
  constructor(scope: Construct, id: string, options: NamespaceOptions) {
    super(scope, id);

    let ns = new KubeNamespace(this, 'namespaces', {
      metadata: {
        name: options.name
      },
    });

    new KubeResourceQuotaList(this, 'rlist', {
      items: [
        {
          metadata: {
            name: "pods-high",
            namespace: ns.name
          },
          spec: {
            hard: {
              cpu: Quantity.fromString("1000"),
              memory: Quantity.fromString("200Gi"),
              pods: Quantity.fromString("10")
            },
            scopeSelector: {
              matchExpressions: [
                {
                  operator: "In",
                  scopeName: "PriorityClass",
                  values: [
                    "high"
                  ]
                }
              ]
            }
          }
        },
        {
          metadata: {
            name: "pods-medium"
          },
          spec: {
            hard: {
              cpu: Quantity.fromString("10"),
              memory: Quantity.fromString("20Gi"),
              pods: Quantity.fromString("10")
            },
            scopeSelector: {
              matchExpressions: [
                {
                  operator: "In",
                  scopeName: "PriorityClass",
                  values: [
                    "medium"
                  ]
                }
              ]
            }
          }
        },
        {
          metadata: {
            name: "pods-low"
          },
          spec: {
            hard: {
              cpu: Quantity.fromString("5"),
              memory: Quantity.fromString("10Gi"),
              pods: Quantity.fromString("10")
            },
            scopeSelector: {
              matchExpressions: [
                {
                  operator: "In",
                  scopeName: "PriorityClass",
                  values: [
                    "low"
                  ]
                }
              ]
            }
          }
        }

      ]
    })
  }
}

