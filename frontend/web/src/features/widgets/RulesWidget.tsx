// RulesWidget.tsx
import React from "react";

export const RulesWidget: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <h2 style={{ flex: "0 0 auto", margin: "0 0 0.4rem 0" }}>Rules Assistant</h2>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden" }}>
        <input
          type="text"
          placeholder="Ask about rules (e.g. 'How does damage work?')"
        />
        <button>Search Rules (dummy)</button>

        <div className="widget-content">
          <p><strong>AI output (placeholder)</strong></p>
          <p>
            Here the local LLM will summarize relevant rules from your books and explain them in plain language.
          </p>
          <p>
            For now, this is static text demonstrating where answers will appear.
          </p>
        </div>
      </div>
    </div>
  );
};
