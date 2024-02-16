import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconPencil from '../../components/icons/IconPencil';
import IconTrashLines from '../../components/icons/IconTrashLines';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getDetectationList } from '../../store/features/detectations/detectationListSlice';
import { deleteDetectation } from '../../store/features/detectations/detectationDeleteSlice';
import moment from 'moment';
import { IoEyeOutline } from 'react-icons/io5';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-secondary',
    cancelButton: 'btn btn-dark ltr:mr-3 rtl:ml-3',
    popup: 'sweet-alerts',
  },
  buttonsStyling: false,
});

const DetectationListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [detectationModal, setdetectationModel] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setPageTitle('Detectations'));
  });

  useEffect(() => {
    dispatch(getDetectationList());
  }, [dispatch]);

  const { detectations, loading } = useSelector((state) => state.detectationList);
  const { message, error } = useSelector((state) => state.detectationDelete);

  useEffect(() => {
    if (message) {
      swalWithBootstrapButtons.fire('Deleted!', message, 'success');
      dispatch(getDetectationList());
      dispatch({
        type: 'detectationDelete/reset',
      });
    }
    if (error) {
      swalWithBootstrapButtons.fire('Error!', error, 'error');
      dispatch({
        type: 'detectationDelete/reset',
      });
    }
  }, [message, error, navigate, dispatch]);

  const deleteItem = async (id) => {
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
        padding: '2em',
      })
      .then((result) => {
        if (result.value) {
          dispatch(deleteDetectation(id));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Cancelled', 'Your item is safe :)', 'error');
        }
      });
  };
  return (
    <div className="grid  gap-6 grid-cols-1">
      <div className="panel">
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Detectations</h5>
        </div>
        {!loading && detectations?.length !== 0 && (
          <div className="table-responsive mb-5">
            <table className="table-hover">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Image</th>
                  <th>Number of Elephant</th>
                  <th>Camera</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Lat | Lng</th>
                  <th>Detected At</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {detectations?.map((detectation) => {
                  return (
                    <tr key={detectation?._id}>
                      <td>{detectations?.indexOf(detectation) + 1}</td>
                      <td>
                        <div className="whitespace-nowrap">
                          <a href={detectation?.image} target="_blank">
                            <img src={detectation?.image} alt={detectation?.image} className="w-16 h-16" />
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="whitespace-nowrap">{detectation?.numberOfElephant + ' (approx)' || 'N/A'}</div>
                      </td>
                      <td>
                        <a href={detectation?.cameraId?.ip} target="_blank" referrerPolicy="no-referrer" className="whitespace-nowrap">
                          {detectation?.cameraId?.ip || 'N/A'}
                        </a>
                      </td>
                      <td>
                        <div className="whitespace-nowrap">{detectation?.cameraId?.name || 'N/A'}</div>
                      </td>
                      <td>{detectation?.cameraId?.location || 'N/A'}</td>
                      <td>
                        <a className="text-blue-600" href={`https://www.google.com/maps/@${detectation?.cameraId?.coordinates?.lat},${detectation?.cameraId?.coordinates?.lng},21z?entry=ttu`}>
                          {detectation?.cameraId?.coordinates?.lat + ', ' + detectation?.cameraId?.coordinates?.lng}
                        </a>
                      </td>
                      {/* <td>{detectation?.createdAt || 'N/A'}</td> */}
                      <td>{moment(detectation?.createdAt).format('LL') + ', ' + moment(detectation?.createdAt).format('LT')}</td>

                      <td className="text-center">
                        <ul className="flex items-center justify-center gap-2">
                          <li>
                            <Tippy content="Delete">
                              <button
                                type="button"
                                onClick={() => {
                                  setShowModal(true);
                                  setdetectationModel(detectation);
                                }}
                              >
                                <IoEyeOutline size={18} className="text-primary" />
                              </button>
                            </Tippy>
                          </li>
                          <li>
                            <Link to={`/detectations/edit/${detectation?._id}`}>
                              <Tippy content="Edit">
                                <button type="button">
                                  <IconPencil className="text-success" />
                                </button>
                              </Tippy>
                            </Link>
                          </li>

                          <li>
                            <Tippy content="Delete">
                              <button type="button" onClick={() => deleteItem(detectation?._id)}>
                                <IconTrashLines className="text-danger" />
                              </button>
                            </Tippy>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full  ${
          showModal ? 'flex bg-black bg-opacity-70' : 'hidden'
        }`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-xl font-semibold text-gray-900 ">{detectationModal?.numberOfElephant} (approx) Elephant Detected!!</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed">
                {detectationModal?.numberOfElephant} (approx) Elephant Detected in the <strong>{detectationModal?.cameraId?.name} </strong> at <strong>{detectationModal?.cameraId?.location}. </strong>{' '}
                Please take necessary action.
              </p>

              <img src={detectationModal?.image} alt="Elephant" className="w-full h-96 object-cover rounded-lg" />
              <p>
                <strong>Camera IP:</strong>{' '}
                <a href={detectationModal?.cameraId?.ip} target="_blank" referrerPolicy="no-referrer">
                  {' '}
                  {detectationModal?.cameraId?.ip}
                </a>
              </p>
              <p>{detectationModal?.additionalInfo}</p>
            </div>
            <div className="flex justify-between   p-4 items-center md:p-5 border-t">
              <div className="flex items-center  border-gray-200 rounded-b ">
                <Link
                  to={`/detectations/edit/${detectationModal?._id}`}
                  onClick={() => setShowModal(false)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Add Additional Information
                </Link>
              </div>
              <p>
                {moment(detectationModal?.createdAt).format('LL')} , {moment(detectationModal?.createdAt).format('LT')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectationListPage;
