import React, { ProfilerOnRenderCallback } from "react";

type ProfilerProps = { metadata?: any; phases?: ("mount" | "update")[] } & Omit<
  React.ProfilerProps,
  "onRender"
>;

let _queue: unknown[] = [];
// console.count("Profiler.tsx");

export const Profiler = ({ metadata, phases, ...restProps }: ProfilerProps) => {
  const reportProfile: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) => {
    if (!phases || phases.includes(phase)) {
      _queue.push({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
        metadata,
      });
    }
  };

  return <React.Profiler onRender={reportProfile} {...restProps} />;
};

const _sendProfilerQueue = () => {
  if (!_queue.length) {
    return;
  }
  console.count("_sendProfilerQueue");

  const _queueToSend = [..._queue];
  _queue = [];
  console.log(_queueToSend);
};

setInterval(_sendProfilerQueue, 5000);
