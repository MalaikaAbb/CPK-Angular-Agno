import { Component } from '@angular/core';

import { RouteHeader } from '../components/route-header';
import { Callout, Panel, SourceCode, TryIt } from '../components/ui';

@Component({
  selector: 'app-subagents-page',
  imports: [RouteHeader, Panel, Callout, TryIt, SourceCode],
  template: `
    <app-route-header path="/multi-agent/subagents" />

    <div class="space-y-6">
      <ui-try-it>
        <p class="mt-1 text-slate-700">
          Open the demo and ask
          <em>Write a short paragraph about the history of the bicycle.</em>
        </p>
        <p class="mt-2 text-slate-700">
          <strong>Pass:</strong> the chat shows a Researcher, then a Writer,
          then a Critic card, each going from "Working" to "Complete" with its
          result. As each one finishes, it appears in the delegation log on the
          left and the matching role pill highlights. The supervisor ends with a
          short summary.
          <strong>Fail:</strong> the supervisor answers by itself with no
          sub-agent cards, or the cards complete but the log stays at
          <code>0 calls</code> (state is not reaching the browser).
        </p>
      </ui-try-it>

      <ui-panel heading="Sub-agents and the supervisor (backend)">
        <p class="mb-3 text-sm text-slate-700">
          Each sub-agent is its own Agno <code>Agent</code> exposed to the
          supervisor as a tool. Every delegation is written to
          <code>session_state["delegations"]</code> under a stable
          <code>id</code>, first as <code>running</code> and then updated in
          place. This file is the page's demo code, unchanged.
        </p>
        <ui-source path="../backend/agents/subagents.py" />
      </ui-panel>

      <ui-callout tone="warn" title="Where the backend comes from">
        The guide's setup step is empty for Agno, and its snippets stop before
        the supervisor. The supervisor and its mounting come from the demo code
        on the same page. The demo mounts the supervisor with a custom route
        that adds a state snapshot, because older Agno did not send one. Agno
        3.x's built-in AG-UI interface does, so <code>main.py</code> uses the
        built-in <code>AGUI(agent=..., prefix="/subagents")</code> instead.
      </ui-callout>

      <ui-panel heading="Mounting it (backend)">
        <ui-source path="../backend/main.py" />
      </ui-panel>

      <ui-panel heading="Registering it with the runtime">
        <p class="mb-3 text-sm text-slate-700">
          The supervisor is registered as agent <code>subagents</code>, which
          points at <code>/subagents/agui</code> on the same Agno process.
        </p>
        <ui-source path="server.ts" />
      </ui-panel>

      <ui-panel heading="The live delegation log (frontend)">
        <p class="mb-3 text-sm text-slate-700">
          The guide's snippet sits inside the
          <code>subagent-delegation-state</code> region. The component around it
          is the Angular Showcase file the guide quotes, with the Showcase-only
          pieces swapped out; the header comment lists each change.
        </p>
        <ui-source
          path="src/app/features/subagents/agent-state-feature.component.ts"
        />
      </ui-panel>

      <ui-panel heading="Supporting Showcase files (unchanged)">
        <ui-source path="src/app/features/subagents/agent-state-model.ts" />
        <ui-source
          path="src/app/features/subagents/subagent-renderer-config.ts"
        />
        <ui-source path="src/app/features/subagents/agent-state-cards.ts" />
      </ui-panel>

      <ui-callout title="Running entries do not appear in the log">
        The backend records a <code>running</code> entry before each
        sub-agent starts, but the Showcase's <code>readDelegations</code> only
        keeps <code>completed</code> entries. In-flight work shows as a tool
        card in the chat, and joins the log once it completes.
      </ui-callout>
    </div>
  `,
})
export default class SubagentsPage {}
