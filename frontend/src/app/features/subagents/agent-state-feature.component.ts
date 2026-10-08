/**
 * Sub-Agents delegation log, from the Angular Showcase source the guide quotes
 * (showcase/angular/src/app/features/agent-state/agent-state-feature.component.ts).
 * https://docs.copilotkit.ai/angular/agno/multi-agent/subagents
 *
 * The `@region[subagent-delegation-state]` block is the guide's snippet,
 * verbatim. Deviations from the Showcase file, all of them Showcase-shell
 * pieces this repo does not have:
 *
 * - `feature` is fixed to "subagents" instead of read from `ActivatedRoute`
 *   data, and the `gen-ui-agent` branch (AgentStateTranscriptChildrenComponent,
 *   `plannerTranscriptChildren`) is dropped — it belongs to a different demo.
 * - `agentId` is the literal "subagents" (the id `server.ts` registers) instead
 *   of `agentIdForCurrentIntegration(this.feature)`.
 * - `<showcase-feature-header />` is dropped, and `<showcase-chat-host>` is
 *   replaced by `<copilot-chat agentId="subagents" />`.
 *
 * Note: the Showcase's `readDelegations` keeps only `status: "completed"`
 * entries, so an in-flight delegation shows as a tool card in the chat, not
 * in the log.
 */
import { ChangeDetectionStrategy, Component, computed } from "@angular/core";
import {
  CopilotChat,
  injectAgentStore,
  registerRenderToolCall,
} from "@copilotkit/angular";

import { DelegationLogComponent } from "./agent-state-cards";
import type { SubAgentName } from "./agent-state-model";
import { readDelegations } from "./agent-state-model";
import { subAgentRendererConfig } from "./subagent-renderer-config";

@Component({
  selector: "showcase-agent-state-feature",
  imports: [DelegationLogComponent, CopilotChat],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "feature-page" },
  template: `
    <main class="agent-state-page" [class.subagents]="feature === 'subagents'">
      @if (feature === "subagents") {
        <aside aria-label="Live supervisor delegation state">
          <showcase-delegation-log [delegations]="delegations()" />
        </aside>
      }
      <section class="chat-surface" aria-label="CopilotKit assistant">
        <copilot-chat agentId="subagents" />
      </section>
    </main>
  `,
  styles: `
    .agent-state-page {
      min-height: 0;
      background: #eef3f7;
    }
    .chat-surface {
      min-width: 0;
      height: 100%;
      background: #fff;
    }
    .subagents {
      display: grid;
      grid-template-columns: minmax(18rem, 0.85fr) minmax(0, 1.35fr);
      gap: 1rem;
      padding: 1rem;
    }
    .subagents aside {
      min-width: 0;
      overflow: auto;
    }
    .subagents .chat-surface {
      overflow: hidden;
      border: 1px solid #d8e0ea;
      border-radius: 1rem;
    }
    @media (max-width: 52rem) {
      .subagents {
        grid-template-columns: 1fr;
        grid-template-rows: auto minmax(30rem, 55vh);
        overflow: auto;
      }
    }
  `,
})
export class AgentStateFeatureComponent {
  protected readonly feature = "subagents";
  private readonly agentId = "subagents";
  // @region[subagent-delegation-state]
  private readonly agentStore = injectAgentStore(this.agentId);
  protected readonly delegations = computed(() =>
    readDelegations(this.agentStore().state()),
  );

  constructor() {
    if (this.feature === "subagents") {
      this.registerSubAgent("research_agent");
      this.registerSubAgent("writing_agent");
      this.registerSubAgent("critique_agent");
    }
  }

  private registerSubAgent(name: SubAgentName): void {
    registerRenderToolCall(subAgentRendererConfig(name));
  }
  // @endregion[subagent-delegation-state]
}
