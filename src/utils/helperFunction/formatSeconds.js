export const FormatSeconds = secs => {
  let minutes = Math.floor(secs / 60);
  let seconds = secs % 60;
  if (minutes > 0) {
    if (seconds == 0) {
      if (minutes == 1) {
        return `${minutes} minute`;
      }
      return `${minutes} minutes`;
    }
    if (minutes == 1) {
      return `${minutes} minute ${seconds} seconds`;
    }
    return `${minutes} minutes ${seconds} seconds`;
  } else {
    if (seconds == 1) {
      return `${seconds} second`;
    }
    return `${seconds} seconds`;
  }
};
