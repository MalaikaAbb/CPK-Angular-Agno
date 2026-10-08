import { Component } from '@angular/core';

import { RouteHeader } from '../components/route-header';
import { Callout, DocSample, Panel, SourceCode, TryIt } from '../components/ui';

@Component({
  selector: 'app-ag-ui-page',
  imports: [RouteHeader, Panel, Callout, TryIt, SourceCode, DocSample],
  template: `
    <app-route-header path="/ag-ui" />

    <div class="space-y-6">
      <ui-try-it>
        <p class="mt-1 text-slate-700">
          Open the demo and the browser's developer console, then ask
          <em>What's the weather in Tokyo?</em>
        </p>
        <p class="mt-2 text-slate-700">
          <strong>Pass:</strong> the message count above the chat goes up and
          "Agent is running…" shows during the run. The console logs
          <code>Streaming text:</code> with a growing buffer,
          <code>Tool called: getWeather</code> with its arguments, and
          <code>State changed:</code>.
          <strong>Fail:</strong> the count stays at 0 or nothing is logged,
          meaning the store did not resolve <code>research-agent</code>.
        </p>
      </ui-try-it>

      <ui-callout title="Which agent this is">
        The snippets read <code>research-agent</code>. The runtime registers
        that id as an alias of the default Agno agent, like
        <code>support</code>, so the snippets run without edits.
      </ui-callout>

      <ui-panel heading="Reading the agent through injectAgentStore">
        <ui-source path="src/app/features/ag-ui/agent-status.component.ts" />
      </ui-panel>

      <ui-panel heading="Subscribing to AG-UI events">
        <p class="mb-3 text-sm text-slate-700">
          The guide shows only the class body. The component shell around it
          is this repo's own.
        </p>
        <ui-source path="src/app/features/ag-ui/agent-events.component.ts" />
      </ui-panel>

      <ui-panel heading="Both, against one chat">
        <ui-source path="src/app/features/ag-ui/ag-ui-demo.component.ts" />
      </ui-panel>

      <ui-panel heading="The proxy pattern">
        <p class="mb-3 text-sm text-slate-700">
          The browser never talks to Agno directly. The store resolves each
          agent id against the runtime's <code>/info</code> endpoint and hands
          back a proxy with the same <code>AbstractAgent</code> interface. These
          two samples illustrate that and are not mounted.
        </p>
        <ui-doc-sample caption="What your component sees" [code]="seesSample" />
        <ui-doc-sample
          caption="What happens underneath"
          [code]="underneathSample"
        />
      </ui-panel>
    </div>
  `,
})
export default class AgUiPage {
  protected readonly seesSample = `const store = injectAgentStore("default");
const agent = store().agent;
store().messages();
store().state();
agent.subscribe({ /* … */ });`;

  protected readonly underneathSample = `// injectAgentStore() → registry checks /info → resolves a proxy agent
// core.runAgent({ agent }) → runtime POST → agent execution → SSE events`;
}
