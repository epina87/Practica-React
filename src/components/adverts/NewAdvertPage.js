import { useEffect, useRef, useState } from 'react';
import Layout from '../layout/Layout';
//import { getTags } from './service';
import '../layout/style/Button.css';
import { useNavigate } from 'react-router-dom';
import Loading from '../shared/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { advertCreated, tagsLoaded } from '../../store/actions';
import { getIsTags, getUi } from '../../store/selectors';

function NewAdvertPage() {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(getUi)
  let tags    = useSelector(getIsTags);

  const navigate = useNavigate();

  //const [tags, setTags] = useState();
  const [tagsSave, setTagsSave] = useState([]);
  const [saleSave, setSaleSave] = useState('');
  const [saleName, setSaleName] = useState('');
  const [nameSave, setNameSave] = useState();
  const [priceSave, setPriceSave] = useState();

  const [buttonDisabled, setButtonDisabled] = useState(true);
  

  const file = useRef();

//   useEffect(() => {
//     //dispatch(tagsLoaded(tags))
//     // getTags().then(tags => {
//     //   setTags(tags);
//     // });
//   }, [dispatch,tags]);

  const handleSubmit =  event => {
    event.preventDefault();

    const data = {
      name: nameSave,
      sale: saleSave,
      price: priceSave,
      tags: tagsSave,
      photo: file.current,
    };


       
     dispatch(advertCreated(data))


  };

  const handleTagChange = event => {
    const tagCheked = event.target.name;
    const newTagSvae = [];
    newTagSvae.push(tagCheked);

    const newArray = [];

    if (tagsSave.indexOf(tagCheked) === -1) {
      setTagsSave(newArray.concat(tagsSave, newTagSvae));
    } else if (tagsSave.indexOf(tagCheked) > -1) {
      setTagsSave(tagsSave?.filter(tagSave => tagSave !== tagCheked));
    }
  };

  const handleNameChange = event => {
    setNameSave(event.target.value);
  };
  const handlePriceChange = event => {
    setPriceSave(event.target.value);
  };

  const handleTipeChange = event => {
    setSaleName(event.target.value);
    if (event.target.value === 'compra') {
      setSaleSave(false);
    }
    if (event.target.value === 'venta') {
      setSaleSave(true);
    }
  };

  useEffect(() => {
    dispatch(tagsLoaded(tags))
    if (
      !!nameSave?.length === true &&
      !!priceSave > 0 === true &&
      tagsSave?.length &&
      !!saleName?.length &&
      !isLoading
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [nameSave, priceSave, tagsSave, saleName,dispatch,tags,isLoading]);

  const btnClass = !buttonDisabled ? 'btn' : 'btnDisabled';

  return (
    <Layout
      title="
    Page To New Advert"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <div className="newAdvert">
          <form id="createUser" onSubmit={handleSubmit}>
            <p>
              <label htmlFor="name">Name</label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                required
                onChange={handleNameChange}
              />
            </p>
            <p>
              <label htmlFor="price">Price</label>
              <br />
              <input
                type="number"
                step=".01"
                name="price"
                id="price"
                required
                onChange={handlePriceChange}
              />
            </p>
            <p>
              <label htmlFor="tipe">Type</label>
              <br />
              <input
                type="text"
                multiple
                name="tipe"
                id="tipe"
                list="listTipe"
                required
                onChange={handleTipeChange}
              />

              <datalist id="listTipe">
                <option value="compra">compra</option>
                <option value="venta">venta</option>
              </datalist>
            </p>

            <fieldset>
              <legend>Tags:</legend>

              {!!tags?.length ? (
                <ul>
                  {tags.map(tag => (
                    <li key={tag}>
                      <input
                        type="checkbox"
                        id={tag}
                        name={tag}
                        onChange={handleTagChange}
                      />
                      <label htmlFor={tag}>
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </label>
                    </li>
                  ))}
                </ul>
              ) : (
                <p></p>
              )}
            </fieldset>

            <p>
              <input
                type="file"
                name="photo"
                onChange={event => {
                  file.current = event.target.files[0];
                }}
              ></input>
            </p>
            <p>
              <button
                type="submit"
                className={btnClass}
                disabled={buttonDisabled}
              >
                Create New Advert
              </button>
            </p>
          </form>
        </div>
      )}
    </Layout>
  );
}

export default NewAdvertPage;
