// TODO : 프로세스 파이프라인 , reference - react-h5-audio-player

## Override Style

### Icon Imgs
use icon module - `react-icons`
- pass by props `iconImgs`

### ID
- rs-audio-player-audio 

### classnames
- playlist classnames
  - play-list-trigger-container
  - sortable-play-list-content-container (root)
    - sortable-list
      - list-item-root
        - list-item-container
          - album-cover-wrapper
          - album-info-wrapper
      - list-item-root dragstart
      - list-item-root dragover

- interface classnames
  - interface-container
    - interface-grid

### color variables
- --rs-audio-player-volume-fill
- --rs-audio-player-volume-track
- --rs-audio-player-volume-thumb
- --rs-audio-player-volume-background
- --rs-audio-player-volume-panel-background
- --rs-audio-player-volume-panel-border
- --rs-audio-player-track-current-time-color
- --rs-audio-player-track-duration-color
- --rs-audio-player-progress-color
- --rs-audio-player-selected-list-item-background

## UI Placement

## flexible and customable UI
it can offer variant UI and you can also place each component easily

// TODO : 프로그레스가 아래에 있을때 (스포티파이)
## grid item custom area
progress = 2-4
playBtn = 2-4
repeatBtn = row1-4 / 2 / row1-4 / 10