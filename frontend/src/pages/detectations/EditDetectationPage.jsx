import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import { updateCamera } from '../../store/features/cameras/cameraUpdateSlice';
import { getDetectationDetail } from '../../store/features/detectations/detectationDetailSlice';
import { updateDetectation } from '../../store/features/detectations/detectationUpdateSlice';

const EditDetectationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const { message, error } = useSelector((state) => state.detectationUpdate);

  const { detectation, loading } = useSelector((state) => state.detectationDetail);

  useEffect(() => {
    if (detectation?._id !== params.id && !loading) {
      dispatch(getDetectationDetail(params.id));
    }
  }, [dispatch, params.id, detectation?._id, loading]);

  useEffect(() => {
    dispatch(setPageTitle('Edit Detectation'));
  });

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
      navigate('/detectations/list');
      dispatch({
        type: 'detectationUpdate/reset',
      });
      dispatch({
        type: 'detectationDetail/reset',
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
        type: 'detectationUpdate/reset',
      });
      dispatch({
        type: 'detectationDetail/reset',
      });
    }
  }, [message, error, navigate, dispatch]);

  const submitForm = async (values) => {
    dispatch(
      updateDetectation({
        values: {
          additionalInfo: values.additionalInfo,
        },
        id: params.id,
      })
    );
  };

  const submittedForm = Yup.object().shape({
    additionalInfo: Yup.string().required('Additional Info is required'),
  });

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link to="/detectations/list" className="text-primary hover:underline">
            Detectations
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Edit Detectation</span>
        </li>
      </ul>
      <div className="pt-5 space-y-8">
        <div className="grid grid-cols-1 gap-6">
          <div className="panel" id="custom_styles">
            <div className="flex items-center justify-between mb-5">
              <h5 className="font-semibold text-lg dark:text-white-light">Edit Detectation</h5>
            </div>
            {!loading && detectation?._id && (
              <div className="mb-5">
                <Formik
                  initialValues={{
                    additionalInfo: detectation.additionalInfo || '',
                  }}
                  validationSchema={submittedForm}
                >
                  {({ errors, submitCount, touched, values }) => (
                    <Form className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className={submitCount ? (errors.additionalInfo ? 'has-error' : 'has-success') : ''}>
                          <label htmlFor="additionalInfo">Additional Info</label>
                          <Field
                            as="textarea"
                            type="textarea"
                            className="form-textarea h-24 resize-none"
                            name="additionalInfo"
                            id="additionalInfo"
                            placeholder="Eg: Additional Information for detectation"
                          />
                          {submitCount ? errors.additionalInfo ? <div className="text-danger mt-1">{errors.additionalInfo}</div> : '' : ''}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDetectationPage;
