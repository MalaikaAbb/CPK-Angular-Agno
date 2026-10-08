/**
 * "Accessing your agent with injectAgentStore", verbatim.
 * https://docs.copilotkit.ai/angular/agno/ag-ui
 *
 * `research-agent` resolves because `server.ts` registers it as an alias of
 * the default Agno agent.
 */
import { Component, computed } from "@angular/core";
import { injectAgentStore } from "@copilotkit/angular";

@Component({
  selector: "app-agent-status",
  template: `
    <p>{{ messageCount() }} messages</p>
    @if (store().isRunning()) {
      <p>Agent is running…</p>
    }
  `,
})
export class AgentStatusComponent {
  readonly store = injectAgentStore("research-agent");
  readonly messageCount = computed(() => this.store().messages().length);
}
