import { FC } from "react";
import { Controller } from "./Controller";
import { Information } from "./Information";
import { generateGridTemplateValues } from "../../../utils/generateGridTemplateValues";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";

import styled from "styled-components";
import Grid from "@/components/Grid";

const InterfaceContainer = styled.div`
  .interface-grid {
    padding: 0.5rem 10px;
  }
`;

export const Interface: FC = () => {
  const { interfacePlacement, activeUI, playListPlacement } =
    useNonNullableContext(audioPlayerStateContext);
  const { gridAreas, gridColumns } = generateGridTemplateValues(
    activeUI,
    interfacePlacement?.templateArea
  );

  return (
    <InterfaceContainer className="interface-container">
      {playListPlacement === "top" && <div className="sortable-play-list" />}
      <Grid
        alignItems={"center"}
        justifyContent={"center"}
        areas={gridAreas}
        minHeight={"30px"}
        columns={gridColumns}
        UNSAFE_className="interface-grid"
      >
        <Information />
        <Controller />
      </Grid>
      {playListPlacement === "bottom" && <div className="sortable-play-list" />}
    </InterfaceContainer>
  );
};
