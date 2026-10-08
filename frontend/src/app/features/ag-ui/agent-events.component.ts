/**
 * "Subscribing to AG-UI events". The class body is the guide's snippet,
 * verbatim; the guide shows it without a surrounding class, so the component
 * shell (decorator, selector, a one-line template, imports) is this repo's.
 * Events are logged to the browser console, as in the guide.
 * https://docs.copilotkit.ai/angular/agno/ag-ui
 */
import { Component, DestroyRef, inject } from "@angular/core";
import { injectAgentStore } from "@copilotkit/angular";

@Component({
  selector: "app-agent-events",
  template: `<p>AG-UI events are logged to the browser console.</p>`,
})
export class AgentEventsComponent {
  private readonly destroyRef = inject(DestroyRef);
  readonly store = injectAgentStore("research-agent");

  constructor() {
    const subscription = this.store().agent.subscribe({
      onTextMessageContentEvent({ textMessageBuffer }) {
        console.log("Streaming text:", textMessageBuffer);
      },
      onToolCallEndEvent({ toolCallName, toolCallArgs }) {
        console.log("Tool called:", toolCallName, toolCallArgs);
      },
      onStateChanged({ agent }) {
        console.log("State changed:", agent.state);
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
