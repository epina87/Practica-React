import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import { useEffect, useState } from 'react';
//import { deleteAdvert } from './service';
import '../layout/style/Button.css';
import Loading from '../shared/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getAdvert, getUi } from '../../store/selectors';
import { advertDelete, advertLoad } from '../../store/actions';

function AdvertPage() {
  const { id:advertId } = useParams();

  const dispatch = useDispatch();
  const {isLoading} = useSelector(getUi)


  //const [isLoading, setIsLoading] = useState(true);
  //const [error, setError] = useState(null);

  const advert = useSelector(getAdvert(advertId));

  //const [advert, setAdvert] = useState(null);

  const [delAd, setDelAd] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    //setIsLoading(true);
    dispatch(advertLoad(advertId)).catch(error => {
      if (error.status === 404) {
        return navigate('/404');
      }      
    });
    //setIsLoading(false);
  }, [dispatch, navigate, advertId]);

//   console.log("Anuncion->",advert)

  



//     if (error?.status === 404) {
//       return <Navigate to="/404" />;
//    }

  const handleDeleteAd = async event => {
    event.preventDefault();
    try {
        await dispatch(advertDelete(advert.id))

      //setIsLoading(true);
      //      await deleteAdvert(advert.id);
      //setIsLoading(false);
      navigate('/adverts');
    } catch (error) {
      <Navigate to="/404" />;
    }
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
