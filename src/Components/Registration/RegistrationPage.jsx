import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { isCapitalLetterPresentInPassword, isPasswordLengthEnough, isSpecialCharacterPresentInPassword } from '../../Utilities/Utilities'
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


function RegistrationPage() {
    const { createNewUser, signInWithGoogleAccount } = useContext(AuthenticationContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosHook = useAxiosSecure();

    const handleGoogleSignIn = (event) => {
        signInWithGoogleAccount()
            .then((result) => {
                toast.success(`Registration successfully completed. Welcome ${result.email}`, {
                    position: 'bottom-right',
                    autoClose: '2000',
                    hideProgressBar: false,
                    newestOnTop: true,
                    closeOnClick: true,
                    draggable: false,
                    pauseOnHover: false,
                    theme: 'light'
                });
                if (location.state === null) {
                    navigate('/');
                } else {
                    navigate(`${location.state}`);
                }
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }

    const handleRegistration = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const password = formData.get('password');
        const mail = formData.get('mail');

        if (isSpecialCharacterPresentInPassword(password)) {
            if (isCapitalLetterPresentInPassword(password)) {
                if (isPasswordLengthEnough(password)) {
                    createNewUser(mail, password)
                        .then((user) => {
                            console.log(user);
                            toast.success(`Registration successfully completed. Welcome ${user.email}`, {
                                position: 'bottom-right',
                                autoClose: '2000',
                                hideProgressBar: false,
                                newestOnTop: true,
                                closeOnClick: true,
                                draggable: false,
                                pauseOnHover: false,
                                theme: 'light'
                            });
                            if (location.state === null) {
                                navigate('/');
                            } else {
                                console.log(location.state);
                                navigate(`${location.state}`);
                            }
                        })
                        .catch((error) => {
                            toast.error(error.message, {
                                position: 'bottom-right',
                                autoClose: '2000',
                                hideProgressBar: false,
                                newestOnTop: true,
                                closeOnClick: true,
                                draggable: false,
                                pauseOnHover: false,
                                theme: 'light'
                            });
                        })
                } else {
                    toast.error('Password length should be at least 6 character', {
                        position: 'bottom-right',
                        autoClose: '2000',
                        hideProgressBar: false,
                        newestOnTop: true,
                        closeOnClick: true,
                        draggable: false,
                        pauseOnHover: false,
                        theme: 'light'
                    });
                }
            } else {
                toast.error('Password should contain at least 1 capital character', {
                    position: 'bottom-right',
                    autoClose: '2000',
                    hideProgressBar: false,
                    newestOnTop: true,
                    closeOnClick: true,
                    draggable: false,
                    pauseOnHover: false,
                    theme: 'light'
                });
            }
        } else {
            toast.error('Password should contain at least 1 special character', {
                position: 'bottom-right',
                autoClose: '2000',
                hideProgressBar: false,
                newestOnTop: true,
                closeOnClick: true,
                draggable: false,
                pauseOnHover: false,
                theme: 'light'
            });
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleRegistration}>
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
                    <div className='flex flex-col justify-center items-center p-4'>
                        <h1 className='text-white font-semibold pb-4'>Sign in by Google instead?</h1>
                        <FcGoogle size={'64'} onClick={handleGoogleSignIn}></FcGoogle>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">REGISTER</button>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h1>Allready have account?</h1>
                        <Link to={'/signin'}><h1 className='text-green-600'>Login</h1></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegistrationPage