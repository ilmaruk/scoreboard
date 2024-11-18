#ifndef _SCORE
#define _SCORE

#define HOME_IDX 0
#define AWAY_IDX 1

unsigned int _score[2] = {0, 0};

void update_score(unsigned int who, int delta) {
  _score[who] += delta;
}

char *get_score_str(int who, const char *format) {
  char *buffer = (char*)malloc(3 * sizeof(char));
  sprintf(buffer, format, _score[who]);
  return buffer;
}

char *get_home_score_str() {
  return get_score_str(HOME_IDX, "%d |");
}

char *get_away_score_str() {
  return get_score_str(AWAY_IDX, "| %d");
}

#endif // _SCORE