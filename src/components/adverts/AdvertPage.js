import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import { useEffect, useState } from 'react';
import '../layout/style/Button.css';
import Loading from '../shared/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getAdvert, getUi } from '../../store/selectors';
import { advertDelete, advertLoad } from '../../store/actions';

function AdvertPage() {
  const { id:advertId } = useParams();
  const dispatch = useDispatch();
  const {isLoading} = useSelector(getUi)
  const advert = useSelector(getAdvert(advertId));
  const [delAd, setDelAd] = useState(false);

  useEffect(() => {

    dispatch(advertLoad(advertId)).catch(error => {      
    });

  }, [dispatch, advertId]);


  const handleDeleteAd =  event => {
    event.preventDefault();
    dispatch(advertDelete(advert.id))

  };

  const handleConfirmDelete = () => {
    setDelAd(true);
  };
  const handleCancelDelete = () => {
    setDelAd(false);
  };


  
  return (
    <Layout title="Adverts Detail">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="advertPage">
          {advert && (
            <>
              {delAd ? (
                <div className="Confirm-Delete">
                  <p>Confirm Delete Advert?</p>
                  <button
                    type="submit"
                    className="btn btn-Delete"
                    onClick={handleDeleteAd}
                  >
                    Confirm Delete Ad
                  </button>

                  <button
                    type="submit"
                    className="btn"
                    onClick={handleCancelDelete}
                  >
                    Cancelate Delete
                  </button>
                </div>
              ) : (
                <div className="advertPageView">
                  <div className="advertPageViewDate">
                    Name: {advert.name}
                    <br />
                    Price: {advert.price}
                    <br />
                    Type:
                    {!advert.sale ? <span> compra</span> : <span> venta</span>}
                    <br />
                    Tags:{' '}
                    <ul>
                      {advert.tags.map(tag => (
                        <li key={tag}>
                          {tag.charAt(0).toUpperCase() + tag.slice(1)}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="submit"
                      className="btn"
                      onClick={handleConfirmDelete}
                    >
                      Delete Ad
                    </button>
                  </div>
                  <div>
                    <img
                      src={
                        !!advert.photo
                          ? advert.photo
                          : 'https://as1.ftcdn.net/v2/jpg/01/17/72/36/1000_F_117723612_z7zQmUrrpG4IRGQLvgX5nwtwC18ke3qU.jpg'
                      }
                      alt={advert.name}
                      width="500"
                      height="600"
                    ></img>
                  </div>
                  <div></div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </Layout>
  );
}

export default AdvertPage;
