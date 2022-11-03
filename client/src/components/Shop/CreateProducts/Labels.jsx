import { useSelector } from "react-redux";

function Labels({ handleTags, tags, deleteTag }) {
  const allFilterTags = useSelector(
    (state) => state.productsReducer.filterTags
  );

  return (
    <>
      <div className="select_container">
        <select
          className="select_content"
          name="Tags"
          defaultValue="type"
          onChange={(e) => {
            handleTags(e);
          }}
        >
          <option value="type" disabled={true}>
            {" "}
            Selecciona etiquetas{" "}
          </option>
          {allFilterTags?.map((tag) => {
            return (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            );
          })}
        </select>
      </div>
      {tags.length > 0 ? (
        <ul>
          {tags?.map((tagId) => {
            return (
              <>
                <li
                  key={tagId}
                  value={tagId}
                  onClick={(e) => {
                    deleteTag(e);
                  }}
                >
                  {allFilterTags.find((t) => t.id === Number(tagId)).name} ❌
                </li>
              </>
            );
          })}
        </ul>
      ) : (
        <p>No has seleccionado ninguna etiqueta</p>
      )}
    </>
  );
}

export default Labels;
