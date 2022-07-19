import {
  audioPlayerStateContext,
  audioPlayerDispatchContext,
} from "@/components/AudioPlayer/Context";
import { CssTransition } from "@/components/CssTransition";
import SortableList from "@/components/SortableList";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { FC, useCallback, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { PlayListItem } from "./PlayListItem";

export interface SortablePlayListProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const PlayList: FC<SortablePlayListProps> = ({ isOpen, setIsOpen }) => {
  const { playList } = useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  const [dragStartIdx, setDragStartIdx] = useState<number>(0);

  const onClickItem = useCallback(
    (e: React.MouseEvent<HTMLLIElement>, index: number) => {
      audioPlayerDispatch({
        type: "SET_CURRENT_INDEX",
        currentIndex: index,
        currentAudioId: playList[index].id,
      });
    },
    [audioPlayerDispatch, playList]
  );

  return playList.length !== 0 ? (
    ReactDOM.createPortal(
      <CssTransition
        visible={isOpen}
        name={"playlist-content"}
        enterTime={20}
        leaveTime={20}
        clearTime={300}
        onExited={() => setIsOpen(false)}
        onEntered={() => setIsOpen(true)}
      >
        <PlayListContainer className="play-list-container">
          <SortableList>
            {playList.map((data, index) => (
              <SortableList.Item
                key={`sortable-item-${index}`}
                index={index}
                draggable
                dragStartIdx={dragStartIdx}
                listData={playList}
                onDragStart={() => setDragStartIdx(index)}
                onDrop={(e, newPlayList) =>
                  audioPlayerDispatch({
                    type: "UPDATE_PLAY_LIST",
                    playList: newPlayList,
                  })
                }
                onClick={(e) => onClickItem(e, index)}
              >
                <PlayListItem data={data} />
              </SortableList.Item>
            ))}
          </SortableList>
        </PlayListContainer>
      </CssTransition>,
      document.querySelector(".sortable-play-list") as HTMLDivElement
    )
  ) : (
    <></>
  );
};

const PlayListContainer = styled.div`
  height: 20vh;
  transition-property: max-height, opacity;
  overflow-x: hidden;
  overflow-y: auto;

  &.playlist-content-enter {
    opacity: 0;
    max-height: 0;
  }
  &.playlist-content-enter-active {
    opacity: 1;
    max-height: 20vh;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(0, 0, 0, 1.2);
  }
  &.playlist-content-leave {
    opacity: 1;
    max-height: 20vh;
  }
  &.playlist-content-leave-active {
    opacity: 0;
    max-height: 0;
    transition-duration: 0.25s;
    transition-timing-function: 0.2s cubic-bezier(0.66, -0.41, 1, 1);
  }
`;
