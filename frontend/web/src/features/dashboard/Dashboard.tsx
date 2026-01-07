import "./Dashboard.css";
import { HeaderWidget } from "../widgets/HeaderWidget";
import { AudioRecordingWidget } from "../widgets/AudioRecordingWidget";
import { MusicWidget } from "../widgets/MusicWidget";
import { PlayerStatsWidget } from "../widgets/PlayerStatsWidget";
import { RulesWidget } from "../widgets/RulesWidget";
import { PuzzlesWidget } from "../widgets/PuzzlesWidget";
import { EncountersWidget } from "../widgets/EncountersWidget";
import { EncounterMakerWidget } from "../widgets/EncounterMakerWidget";
import { StoryWidget } from "../widgets/StoryWidget";
import { StoryGraphWidget } from "../widgets/StoryGraphWidget";
import { ViewSwitcherWidget } from "../widgets/ViewSwitcherWidget";

export const Dashboard = () => {
  return (
    <div className="dashboard-grid">
      {/* Row 1 */}
      <div className="cell cell-header">
        <HeaderWidget />
      </div>
      <div className="cell cell-view-label">
        <div className="view-label">(Default View)</div>
      </div>
      <div className="cell cell-audio">
        <AudioRecordingWidget />
      </div>

      {/* Row 2 */}
      <div className="cell cell-music">
        <MusicWidget />
      </div>
      <div className="cell cell-player-stats">
        <PlayerStatsWidget />
      </div>
      <div className="cell cell-rules">
        <RulesWidget />
      </div>

      {/* Row 3 */}
      <div className="cell cell-puzzles">
        <PuzzlesWidget />
      </div>
      <div className="cell cell-encounters">
        <EncountersWidget />
      </div>
      <div className="cell cell-encounter-maker">
        <EncounterMakerWidget />
      </div>

      {/* Row 4 */}
      <div className="cell cell-view-switcher">
        <ViewSwitcherWidget />
      </div>
      <div className="cell cell-story">
        <StoryWidget />
      </div>
      <div className="cell cell-story-graph">
        <StoryGraphWidget />
      </div>
    </div>
  );
};
