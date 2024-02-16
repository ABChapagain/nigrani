import { useEffect } from 'react';
import Tippy from '@tippyjs/react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconPlus from '../../components/icons/IconPlus';
import IconPencil from '../../components/icons/IconPencil';
import IconTrashLines from '../../components/icons/IconTrashLines';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getCameraList } from '../../store/features/cameras/cameraListSlice';
import { deleteCamera } from '../../store/features/cameras/cameraDeleteSlice';
import moment from 'moment';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-secondary',
    cancelButton: 'btn btn-dark ltr:mr-3 rtl:ml-3',
    popup: 'sweet-alerts',
  },
  buttonsStyling: false,
});

const CameraListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setPageTitle('Cameras'));
  });

  useEffect(() => {
    dispatch(getCameraList());
  }, [dispatch]);

  const { cameras, loading } = useSelector((state) => state.cameraList);
  const { message, error } = useSelector((state) => state.cameraDelete);

  useEffect(() => {
    if (message) {
      swalWithBootstrapButtons.fire('Deleted!', message, 'success');
      dispatch(getCameraList());
      dispatch({
        type: 'cameraDelete/reset',
      });
    }
    if (error) {
      swalWithBootstrapButtons.fire('Error!', error, 'error');
      dispatch({
        type: 'cameraDelete/reset',
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
          dispatch(deleteCamera(id));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Cancelled', 'Your item is safe :)', 'error');
        }
      });
  };
  return (
    <div className="grid  gap-6 grid-cols-1">
      <div className="panel">
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Cameras</h5>
          <Link to={'/cameras/add'} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
            <span className="flex items-center">
              <IconPlus className="me-2" />
              Add Camera
            </span>
          </Link>
        </div>
        {!loading && cameras?.length !== 0 && (
          <div className="table-responsive mb-5">
            <table className="table-hover">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Name</th>
                  <th>IP</th>
                  <th>Location</th>
                  <th>Lat | Lng</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cameras?.map((camera) => {
                  return (
                    <tr key={camera?._id}>
                      <td>{cameras?.indexOf(camera) + 1}</td>
                      <td>
                        <div className="whitespace-nowrap">{camera?.name || 'N/A'}</div>
                      </td>
                      <td>
                        <a href={camera?.ip} target="_blank" referrerPolicy="no-referrer" className="whitespace-nowrap">
                          {camera?.ip || 'N/A'}
                        </a>
                      </td>
                      <td>{camera?.location || 'N/A'}</td>
                      <td>
                        <a className="text-blue-600" href={`https://www.google.com/maps/@${camera?.coordinates?.lat},${camera?.coordinates?.lng},21z?entry=ttu`}>
                          {camera?.coordinates?.lat + ', ' + camera?.coordinates?.lng}
                        </a>
                      </td>
                      <td>
                        .<span className={`badge ${camera?.status ? 'bg-success' : 'bg-danger'}`}>{camera?.status ? 'Active' : 'Non Active'}</span>
                      </td>
                      <td>{moment(camera?.createdAt).format('LL') + ', ' + moment(camera?.createdAt).format('LT')}</td>

                      <td className="text-center">
                        <ul className="flex items-center justify-center gap-2">
                          <li>
                            <Link to={`/cameras/edit/${camera?._id}`}>
                              <Tippy content="Edit">
                                <button type="button">
                                  <IconPencil className="text-success" />
                                </button>
                              </Tippy>
                            </Link>
                          </li>
                          <li>
                            <Tippy content="Delete">
                              <button type="button" onClick={() => deleteItem(camera?._id)}>
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

export default CameraListPage;
