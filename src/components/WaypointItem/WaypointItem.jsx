import s from "./WaypointItem.module.css";

const WaypointItem = (props) => {
  return (
    <div className={s.waypointitem}>
      {props.place.place}
      <div
        title="Delete"
        onClick={() => {
          props.onRemove(props.place.id);
        }}
        className={s.waypointitemdelete}
      >
        &times;
      </div>
    </div>
  );
};

export { WaypointItem };
