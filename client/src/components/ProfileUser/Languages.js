import { useSelector } from "react-redux";

const Languages = ({ setInfoUser, infoUser }) => {
  const { languages } = useSelector((state) => state);

  const handleSelectLanguages = (lang) => {

    setInfoUser((r) => {
      if (!r.languages.length === 0) return { ...r, languages: [lang] };
      if (!r.languages.includes(lang)) {
        return { ...r, languages: [...r.languages, lang] };
      } else {
        const filter = r.languages.filter((c) => c._id !== lang._id);
        return { ...r, languages: filter };
      }
    });
  };
  console.log(infoUser.languages,'infoUser');
  return (
    <>
      {languages.map((lang, i) => {
        // console.log(infoUser.languages, lang , '//');
        // console.log(infoUser.languages.find(e=>e._id===lang._id)&&'hola');
        // console.log(infoUser.languages.name===lang.name);
      return (
        <span key={i}>
          <input
            style={{ focus: "none" }}
            type="checkbox"
            className="btn-check btn-checkbox-focus"
            id={lang._id}
            checked={infoUser.languages.find(e=>e._id===lang._id)?true:false}
          />
          <label
            className="btn btn-outline-dark m-1 btn-checkbox-focus"
            htmlFor={lang._id}
            style={{ padding: "1px 5px" }}
            onClick={() => handleSelectLanguages(lang)}
          >
            {lang.name}
          </label>
        </span>
      )})}
    </>
  )
};

export default Languages;
