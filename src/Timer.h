#ifndef _TIMER
#define _TIMER

class Timer {
private:
  unsigned int duration;
  bool is_running_;
  double elapsed;
  double started_at;
  double offset;

public:
    Timer(unsigned int duration);

    void reset();
    void start(unsigned long at);
    void pause();
    bool is_running();
    bool is_over();
    bool update(unsigned long at);
    char *display();
};
#endif // _TIMER