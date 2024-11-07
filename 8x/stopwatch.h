#ifndef _STOPWATCH
#define _STOPWATCH

#include <stdbool.h>

unsigned int _sw_duration;
bool _sw_is_running;
double _sw_elapsed;
double _sw_started_at;
double _sw_offset;

void sw_reset() {
  _sw_elapsed = .0;
  _sw_offset = .0;
  _sw_is_running = false;
}

// A sort of constructor
void sw_init(unsigned int duration) {
  _sw_duration = duration*1000;
  sw_reset();
}

void sw_start() {
  _sw_started_at = millis();
  _sw_is_running = true;
}

void sw_pause() {
  _sw_offset = _sw_elapsed;
  _sw_is_running = false;
}

bool sw_is_running() {
  return _sw_is_running;
}

bool sw_is_over() {
  return !_sw_is_running && _sw_elapsed >= _sw_duration;
}

bool sw_update() {
  if (!_sw_is_running) {
    // Nothing to do
    return false;
  }
  _sw_elapsed = millis() - _sw_started_at + _sw_offset;

  if (_sw_elapsed >= _sw_duration) {
    _sw_elapsed = _sw_duration;
    _sw_is_running = false;
  }
  
  return true;
}

char *sw_display() {
  char *buffer = (char*)malloc(6 * sizeof(char));
  if (buffer == NULL) {
    return "ERROR";
  }

  int remaining = _sw_duration - _sw_elapsed;
  if (remaining < 60000) {
    // Under the minute, show seconds and decimnals
    remaining = ceil(remaining / 100.); // in decimals
    sprintf(buffer, "%02d.%d |", (int)remaining/10, remaining%10);
  } else {
    // above the minute, show minutes and seconds
    remaining = ceil(remaining / 1000.); // in seconds
    sprintf(buffer, "%d:%02d", (int)remaining/60, remaining%60);
  }

  return buffer;
}

#endif // _STOPWATCH