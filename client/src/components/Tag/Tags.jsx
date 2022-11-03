import s from "../Tag/Tag.module.css";

export default function Tags({ value, deleteTag }) {
  return (
    <div className={s.tag}>
      <span onClick={() => deleteTag(value)}>X </span>
      {value}
    </div>
  );
}
