/**
 * Mounts both AG-UI page snippets against one chat. The guide shows no chat of
 * its own; `<copilot-chat agentId="research-agent" />` is here only so there is
 * a run to observe — the same agent id the snippets read.
 * https://docs.copilotkit.ai/angular/agno/ag-ui
 */
import { Component } from '@angular/core';
import { CopilotChat } from '@copilotkit/angular';

import { AgentEventsComponent } from './agent-events.component';
import { AgentStatusComponent } from './agent-status.component';

@Component({
  selector: 'app-ag-ui-demo',
  imports: [AgentStatusComponent, AgentEventsComponent, CopilotChat],
  template: `
    <div class="flex h-full flex-col">
      <div class="shrink-0 border-b border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
        <app-agent-status />
        <app-agent-events />
      </div>
      <div class="min-h-0 flex-1">
        <copilot-chat agentId="research-agent" />
      </div>
    </div>
  `,
})
export class AgUiDemoComponent {}
