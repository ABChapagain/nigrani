import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCamera } from '../../store/features/cameras/cameraAddSlice';

const AddCameraPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setPageTitle('Add Camera'));
  });

  const { message, error } = useSelector((state) => state.cameraAdd);

  useEffect(() => {
    if (message) {
      const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
      });
      toast.fire({
        icon: 'success',
        title: message,
        padding: '10px 20px',
      });
      navigate('/cameras/list');
      dispatch({
        type: 'cameraAdd/reset',
      });
    }
    if (error) {
      const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
      });
      toast.fire({
        icon: 'error',
        title: error,
        padding: '10px 20px',
      });
      dispatch({
        type: 'cameraAdd/reset',
      });
    }
  }, [message, error, navigate, dispatch]);

  const submitForm = async (values) => {
    dispatch(
      addNewCamera({
        name: values.name,
        coordinates: {
          lat: values.lat,
          lng: values.lng,
        },
        location: values.location,
        ip: values.ip,
        status: values.status,
      })
    );
  };

  const submittedForm = Yup.object().shape({
    name: Yup.string().required('Please fill the name'),
    lat: Yup.string().required('Please fill the latitude'),
    lng: Yup.string().required('Please fill the longitude'),
    location: Yup.string().required('Please fill the location'),
    ip: Yup.string().required('Please fill the ip address'),
    status: Yup.boolean(),
  });

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link to="/cameras/list" className="text-primary hover:underline">
            Cameras
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Add Camera</span>
        </li>
      </ul>
      <div className="pt-5 space-y-8">
        <div className="grid grid-cols-1 gap-6">
          <div className="panel" id="custom_styles">
            <div className="flex items-center justify-between mb-5">
              <h5 className="font-semibold text-lg dark:text-white-light">Add Camera</h5>
            </div>
            <div className="mb-5">
              <Formik
                initialValues={{
                  name: '',
                  lat: '',
                  lng: '',
                  location: '',
                  ip: '',
                  status: true,
                }}
                validationSchema={submittedForm}
              >
                {({ errors, submitCount, touched, values }) => (
                  <Form className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className={submitCount ? (errors.name ? 'has-error' : 'has-success') : ''}>
                        <label htmlFor="name">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <Field name="name" type="text" id="name" placeholder="Eg: Kachankawal East" className="form-input" />
                        {submitCount ? errors.name ? <div className="text-danger mt-1">{errors.name}</div> : '' : ''}
                      </div>
                      <div className={submitCount ? (errors.lat ? 'has-error' : 'has-success') : ''}>
                        <label htmlFor="lat">
                          Latitude <span className="text-red-500">*</span>
                        </label>
                        <Field name="lat" type="number" id="lat" placeholder="Eg: 27.016902" className="form-input" />
                        {submitCount ? errors.lat ? <div className="text-danger mt-1">{errors.lat}</div> : '' : ''}
                      </div>
                      <div className={submitCount ? (errors.lat ? 'has-error' : 'has-success') : ''}>
                        <label htmlFor="lng">
                          Longitude <span className="text-red-500">*</span>
                        </label>
                        <Field name="lng" type="number" id="lng" placeholder="Eg: 84.885817" className="form-input" />
                        {submitCount ? errors.lng ? <div className="text-danger mt-1">{errors.lng}</div> : '' : ''}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className={`${submitCount ? (errors.location ? 'has-error' : 'has-success') : ''}`}>
                        <label htmlFor="location">
                          Location <span className="text-red-500">*</span>
                        </label>
                        <Field name="location" type="text" id="location" placeholder="Eg: Kachankawal Municipality" className="form-input" />
                        {submitCount ? errors.location ? <div className="text-danger mt-1">{errors.location}</div> : '' : ''}
                      </div>
                      <div className={`${submitCount ? (errors.ip ? 'has-error' : 'has-success') : ''}`}>
                        <label htmlFor="ip">
                          IP Address <span className="text-red-500">*</span>
                        </label>
                        <Field name="ip" type="text" id="ip" placeholder="Eg: http://192.168.100.40" className="form-input" />
                        {submitCount ? errors.ip ? <div className="text-danger mt-1">{errors.ip}</div> : '' : ''}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className={submitCount ? (errors.status ? 'has-error' : 'has-success') : ''}>
                        <div className="flex">
                          <Field name="status" id="status" type="checkbox" className="form-checkbox" />
                          {values.status}
                          <label htmlFor="status" className="text-white-dark font-semibold">
                            Active
                          </label>
                        </div>
                        {submitCount ? errors.status ? <div className="text-danger mt-1">{errors.status}</div> : '' : ''}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary !mt-6"
                      onClick={() => {
                        if (Object.keys(touched).length !== 0 && Object.keys(errors).length === 0) {
                          submitForm(values);
                        }
                      }}
                    >
                      Submit Form
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCameraPage;
