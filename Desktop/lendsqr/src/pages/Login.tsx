
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './page.module.scss';
import './Login.scss';
import lendsqr from '../assets/lendsqr.svg';
import illustration from '../assets/illustration.svg';
export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email: string): string | undefined => {
        if (!email) {
            return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return undefined;
    };

    const validatePassword = (password: string): string | undefined => {
        if (!password) {
            return 'Password is required';
        }
        if (password.length < 6) {
            return 'Password must be at least 6 characters';
        }
        return undefined;
    };

    const handleBlur = (field: 'email' | 'password') => {
        setTouched({ ...touched, [field]: true });
        if (field === 'email') {
            setErrors({ ...errors, email: validateEmail(email) });
        } else {
            setErrors({ ...errors, password: validatePassword(password) });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        setErrors({
            email: emailError,
            password: passwordError,
        });

        setTouched({ email: true, password: true });

        if (!emailError && !passwordError) {
            setIsLoading(true);

            await new Promise(resolve => setTimeout(resolve, 2000));

            localStorage.setItem('isAuthenticated', 'true');
            navigate('/dashboard/users');
        }
    };

    return (
        <div className={styles.loginContainer}>
            {/* Left Side - Illustration */}
            <div className={styles.leftSide}>
                <div className={styles.leftContent}>
                    {/* Logo */}
                    <div className={styles.logoContainer}>
                        <img className={styles.logo} src={lendsqr} alt="Login Illustration" />
                    </div>

                    {/* Illustration - Stylized character with geometric shapes */}
                    <div className={styles.illustrationContainer}>
                        <div className={styles.illustrationWrapper}>
                            <img className={styles.illustration} src={illustration} alt="Login Illustration" width={500} height={500} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className={styles.rightSide}>
                <div className={styles.formContainer}>
                    {/* Welcome Message */}
                    <div className={styles.welcomeSection}>
                        <h1 className={styles.welcomeTitle}>Welcome!</h1>
                        <p className={styles.welcomeText}>Enter details to login.</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        <div className={styles.inputGroup}>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (touched.email) {
                                        setErrors({ ...errors, email: validateEmail(e.target.value) });
                                    }
                                }}
                                onBlur={() => handleBlur('email')}
                                placeholder="Email"
                                className={`${styles.input} ${errors.email && touched.email ? styles.error : ''}`}
                            />
                            {errors.email && touched.email && (
                                <p
                                    
                                >
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div className={styles.inputGroup}>
                            <div className={styles.passwordContainer}>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (touched.password) {
                                            setErrors({ ...errors, password: validatePassword(e.target.value) });
                                        }
                                    }}
                                    onBlur={() => handleBlur('password')}
                                    placeholder="Password"
                                    className={`${styles.input} ${styles.passwordInput} ${errors.password && touched.password ? styles.error : ''}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={styles.showPasswordButton}
                                >
                                    {showPassword ? 'HIDE' : 'SHOW'}
                                </button>
                            </div>
                            {errors.password && touched.password && (
                                <p
                                    className={styles.errorMessage}
                                >
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <a
                                href="#"
                                className={styles.forgotPasswordLink}
                            >
                                FORGOT PASSWORD?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={styles.submitButton}
                        >
                            {isLoading ? (
                                <>
                                    <svg className={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className={styles.spinnerPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>LOGGING IN...</span>
                                </>
                            ) : (
                                'LOG IN'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}


// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import './Login.scss'
// import illustration from '../assets/illustration.svg'
// import lendsqr from '../assets/lendsqr.svg';

// function Login() {
//   const navigate = useNavigate()
//   const [showPassword, setShowPassword] = useState(false)
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Handle login logic here
//     navigate('/dashboard')
//   }

//   return (
//     <div className="login-container">
//       {/* Left Section - Illustration */}
//       <div className="login-left">
//         <img src={lendsqr} alt="lendsqr" />
//         <div className="illustration-wrapper">
//           <div className="illustration">
//             {/* Illustration placeholder - you can replace with actual image */}
//             <img src={illustration} alt="illustration" />
//           </div>
//         </div>
//       </div>

//       {/* Right Section - Login Form */}
//       <div className="login-right">
//         <div className="login-form-wrapper">
//           <div className="welcome-header">
//             <h1>
//               Welcome.
//             </h1>
//             <p>Enter details to login.</p>
//           </div>

//           <form className="login-form" onSubmit={handleSubmit}>
//             <div className="form-group">
              
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//                 required
//               />
//             </div>

//             <div className="form-group">
             
//               <div className="password-input-wrapper">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="show-password-btn"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? 'HIDE' : 'SHOW'}
//                 </button>
//               </div>
//             </div>

//             <a href="#" className="forgot-password">
//               FORGOT PASSWORD?
//             </a>

//             <button type="submit" className="login-btn">
//               LOG IN
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default Login