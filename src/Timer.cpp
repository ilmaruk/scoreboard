#include "Timer.h"

#include <Arduino.h>

Timer::Timer(unsigned int duration) 
    : duration(duration * 1000) {
      reset();
    }

void Timer::reset() {
  elapsed = .0;
  offset = .0;
  is_running_ = false;
}

void Timer::start(unsigned long at) {
  started_at = at;
  is_running_ = true;
}

void Timer::pause() {
  offset = elapsed;
  is_running_ = false;
}

bool Timer::is_running() {
  return is_running_;
}

bool Timer::is_over() {
  return !is_running_ && elapsed >= duration;
}

bool Timer::update(unsigned long at) {
  if (!is_running_) {
    // Nothing to do
    return false;
  }
  elapsed = at - started_at + offset;

  if (elapsed >= duration) {
    elapsed = duration;
    is_running_ = false;
  }
  
  return true;
}

char *Timer::display() {
  char *buffer = (char*)malloc(6 * sizeof(char));
  if (buffer == NULL) {
    return "ERROR";
  }

  int remaining = duration - elapsed;
  if (remaining < 60000) {
    // Under the minute, show seconds and decimals
    float seconds = float(remaining) / 1000.;
    sprintf(buffer, "%02.1f", seconds);
  } else {
    // above the minute, show minutes and seconds
    remaining = ceil(remaining / 1000.); // in seconds
    sprintf(buffer, "%d:%02d", (int)remaining/60, remaining%60);
  }

  return buffer;
}
