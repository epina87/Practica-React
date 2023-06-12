import { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import { Link, NavLink } from 'react-router-dom';
import Loading from '../shared/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { areAdvertsLoaded, getIsAdverts, getIsTags, getUi } from '../../store/selectors';
import { advertsLoaded, tagsLoaded } from '../../store/actions';
import Filters from './Filters';

function AdvertsPage() {


  const dispatch = useDispatch();

  const [query, setQuery] = useState('');
  const [saleType, setSaleType] = useState();
  const [saleName, setSaleName] = useState('todos');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(Infinity);

  const [tagsSave, setTagsSave] = useState([]);

  let adverts = useSelector(getIsAdverts);
  let tags    = useSelector(getIsTags);
  let isLoading = useSelector(areAdvertsLoaded)
 

  
  useEffect(() => {
    
      dispatch(advertsLoaded(adverts));
      dispatch(tagsLoaded(tags));
   
  }, [dispatch,adverts,tags]);

  

  let filterTags = tags;
  let filterAdvert = adverts;

  if (priceMax === '') {
    setPriceMax(Infinity);
  }

  filterAdvert = Filters(
    filterAdvert,
    query,
    saleName,
    priceMax,
    priceMin,
    tagsSave,
    saleType,
  );

  const handleSearchTipeChange = event => {
    setSaleName(event.target.value !== 'todos' ? 'filtro' : 'todos');
    setSaleType(event.target.value === 'compra' ? false : true);
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


  return (
    <Layout title="Adverts Page">
      {!isLoading ? (
        <Loading />
      ) : (
        <div className="Adverts-Page-Container">
          {!!adverts.length ? (
            <div>
              <div className="Search-Container">
                <p>
                  <label htmlFor="name"> Name Search: </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                  />

                  <label htmlFor="tipe"> Type Search: </label>
                  <input
                    type="text"
                    multiple
                    name="tipe"
                    id="tipe"
                    list="listTipe"
                    placeholder="todos"
                    onChange={handleSearchTipeChange}
                  />

                  <datalist id="listTipe">
                    <option value="compra">compra</option>
                    <option value="venta">venta</option>
                    <option value="todos">todos</option>
                  </datalist>
                </p>
                <p>
                  <label htmlFor="priceMin"> Price Min: </label>

                  <input
                    type="number"
                    step=".01"
                    name="priceMin"
                    id="priceMin"
                    placeholder="0"
                    onChange={event => setPriceMin(event.target.value)}
                  />

                  <label htmlFor="priceMax"> Price Max: </label>

                  <input
                    type="number"
                    step=".01"
                    name="priceMax"
                    id="priceMax"
                    placeholder={Infinity}
                    onChange={event => setPriceMax(event.target.value)}
                  />
                </p>

                <fieldset>
                  <legend>Tags:</legend>

                  {!!filterTags?.length ? (
                    <ul>
                      {filterTags.map(tag => (
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
              </div>
              <div>
                {filterAdvert.map(advert => (
                  <ul>
                    <li key={advert.id}>
                      <Link to={`/adverts/${advert.id}`}>
                        Name: {advert.name}
                        <br />
                        Price: {advert.price}
                        <br />
                        Type:
                        {!advert.sale ? (
                          <span> compra</span>
                        ) : (
                          <span> venta</span>
                        )}
                        <br />
                        Tags:{' '}
                        <ul className="listAdverts">
                          {advert.tags.map(tag => (
                            <li key={tag}>
                              {tag.charAt(0).toUpperCase() + tag.slice(1)}
                            </li>
                          ))}
                        </ul>
                      </Link>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          ) : (
            <p>
              <NavLink to="/adverts/new">
                <p className="firdt-ad">click here to create the first ad!!</p>
              </NavLink>
            </p>
          )}
        </div>
      )}
    </Layout>
  );
}

export default AdvertsPage;
