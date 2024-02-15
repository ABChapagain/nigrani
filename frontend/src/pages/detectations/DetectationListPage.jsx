import { useEffect } from 'react';
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

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-secondary',
    cancelButton: 'btn btn-dark ltr:mr-3 rtl:ml-3',
    popup: 'sweet-alerts',
  },
  buttonsStyling: false,
});

const DetectationListPage = () => {
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
                          <img src={detectation?.image} alt={detectation?.image} className="w-16 h-16" />
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
    </div>
  );
};

export default DetectationListPage;
