import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({
  welcomeText,
  showConfirm = false,
  submitLabel,
  children,
  linkText,
  linkHref,
  linkLabel
}) => {

  const navigate = useNavigate();
const authSchema = z.object({
  login: z.string()
    .min(3, "Login require minimum 3 symbols")
    .max(20, "Login too long")
    .regex(/^[a-zA-Z0-9_]+$/, "Login can have only letter and numbers"),

  ...(showConfirm && {
    username: z.string()
      .min(2, "Username require minimum 2 symbols")
      .max(30, "Name too long")
      .regex(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, "Name can have only letters")
  }),

  password: z.string()
    .min(6, "Password require minimum 6 symbols")
    .max(40, "Password too long")
    .regex(/[A-Z]/, "The password must contain at least one capital letter")
    .regex(/[0-9]/, "The password must contain at least one number")
});


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(authSchema),
    mode: 'onTouched',
    defaultValues: {
      login: '',
      username: '',
      password: ''
    }
  });

  const onSubmit =  async (data) => {
    console.log('Form was send:', data);
    alert('Validation success!');
    reset();
    navigate('/dreams');
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <p className="login-welcome">{welcomeText}</p>
      
      <div className="login-input-group">
        <input
          type="text"
          placeholder="Type your login"
          {...register("login")}
          className={errors.login ? 'error' : ''}
          aria-invalid={!!errors.login}
        />
        {errors.login && (
          <p className="error-message">{errors.login.message}</p>
        )}
      </div>

      {showConfirm && (
        <div className="login-input-group">
          <input
            type="text"
            placeholder="Type your username"
            {...register("username")}
            className={errors.username ? 'error' : ''}
            aria-invalid={!!errors.username}
          />
          {errors.username && (
            <p className="error-message">{errors.username.message}</p>
          )}
        </div>
      )}

      <div className="login-input-group">
        <input
          type="password"
          placeholder="Type your password"
          {...register("password")}
          className={errors.password ? 'error' : ''}
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
      </div>

      {children}
      
      <button 
        type="submit" 
        className="login-submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : submitLabel}
      </button>
      
      <p className="login-register-text">{linkText}</p>
      <a href={linkHref} className="login-register-link">{linkLabel}</a>
    </form>
  );
};

export default AuthForm;