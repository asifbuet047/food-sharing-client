import { React, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider';
import ThreeCircleLoading from '../Loading/BeatLoading';


function SignInPage() {
  const { userLoading, signInUser } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosHook = useAxiosSecure();

  const handleSignIn = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get('password');
    const mail = formData.get('mail');
    signInUser(mail, password)
      .then((user) => {
        const mail = user.user.email;
        const uid = user.user.uid;
        console.log(user);
        axiosHook.post('/api/v1/token', { mail, uid })
          .then((response) => {
            toast.success(`Successfully Logged In. Welcome`, {
              position: 'bottom-center',
              autoClose: 2000,
            });
          }).catch((error) => {
            toast.error(`Something wrong`, {
              position: 'bottom-center',
              autoClose: 2000,
            });
          })

        if (location.state === null) {
          navigate('/');
        } else {
          navigate(`${location.state}`);
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: 'bottom-center',
          autoClose: 5000,
        });
      })

  };



  return (
    <div>
      {userLoading ?
        <div className="hero min-h-screen bg-base-200">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSignIn}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='mail' placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' placeholder="password" className="input input-bordered" required />

              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <h1>Dont have account?</h1>
                <Link to={'/register'} state={location.state}><h1 className='text-red-600'>Register</h1></Link>
              </div>
            </form>
          </div>
        </div>
        : <ThreeCircleLoading circleSize={55}></ThreeCircleLoading>
      }
    </div >
  )
}

export default SignInPage