import React from "react";
import { TimelineInfoInterface } from "../../App";

interface TimelineFormProps {
  onChangeTimelineForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  timelineInfo: TimelineInfoInterface;
}

export const TimelineForm = ({
  onChangeTimelineForm,
  timelineInfo,
}: TimelineFormProps) => {
  return (
    <div>
      <form className="timeline-form" action="">
        <label htmlFor="wakeUp">Wake Up</label>
        <input
          type="time"
          placeholder="Wake up"
          name="wakeUp"
          onChange={onChangeTimelineForm}
        />
        <label htmlFor="start">Start</label>
        <input
          type="time"
          placeholder="Start"
          name="start"
          onChange={onChangeTimelineForm}
          disabled={timelineInfo.wakeUp == null}
        />
        <label htmlFor="end">End</label>
        <input
          type="time"
          placeholder="End"
          name="end"
          onChange={onChangeTimelineForm}
          disabled={
            timelineInfo.start == null ||
            timelineInfo.start! <= timelineInfo.wakeUp!
          }
        />
        <label htmlFor="sleep">Sleep</label>
        <input
          type="time"
          placeholder="Sleep"
          name="sleep"
          onChange={onChangeTimelineForm}
          disabled={
            timelineInfo.end == null || timelineInfo.end! <= timelineInfo.start!
          }
        />
      </form>
    </div>
  );
};
