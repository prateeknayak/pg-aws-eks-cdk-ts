
import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';
import { Namespaces } from '../../packages/namespaces/namespaces';

class NamespaceChart extends Chart {
  constructor(scope: Construct, ns: string) {
    super(scope, ns);

    new Namespaces(this, 'hello', {
      name: "potato-ns",
      prefix: "blah"
    });
  }
}

const app = new App();
new NamespaceChart(app, "test");
app.synth();
