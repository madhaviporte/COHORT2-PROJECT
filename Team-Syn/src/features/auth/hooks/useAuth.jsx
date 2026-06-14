import { useForm } from 'react-hook-form';


export let useAuth = () => {
      const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: 'onChange'
      });
    
      const onRegisterSubmit = (data) => {
        console.log('Register Data:', data);
      };
      const onLoginSubmit = (data) => {
        console.log('Login Data:', data);
      };

      return{
        register,
        handleSubmit,
        errors,
        isValid,
        onRegisterSubmit,
        onLoginSubmit
      }
}