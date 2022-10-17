import { WaypointItem } from "../WaypointItem/WaypointItem";

const WaypointsPanel = (props) => {
  return (
    <>
      {props.places.map((place, idx) => {
        return (
          <WaypointItem onRemove={props.onRemove} place={place} key={idx} />
        );
      })}
    </>
  );
};

export { WaypointsPanel };
